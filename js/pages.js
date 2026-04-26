/* ============================================================
   Page render functions (37 pages)
   Each page builds DOM under a root element for its section.
   ============================================================ */

const P = {};

/* ---------- PAGE 1: Dashboard Overview ---------- */
P['overview'] = (root) => {
  root.innerHTML = `
    <div class="page-header">
      <div><h1>Dashboard Overview</h1><div class="subtitle">Ringkasan operasional PT Rezeki Assurance</div></div>
      <div class="actions">
        <button class="btn btn-outline btn-sm"><i class="ri-download-line"></i> Export Laporan</button>
        <button class="btn btn-primary btn-sm"><i class="ri-refresh-line"></i> Refresh</button>
      </div>
    </div>
    <div id="kpis" class="grid grid-6" style="margin-bottom:16px"></div>
    <div class="grid grid-3" style="margin-bottom:16px">
      <div class="card chart-card">
        <div class="card-header"><div class="card-title"><i class="ri-bar-chart-2-line"></i>Premi per Produk</div></div>
        <div class="chart-wrap"><canvas id="c1"></canvas></div>
      </div>
      <div class="card chart-card">
        <div class="card-header"><div class="card-title"><i class="ri-donut-chart-line"></i>Status Klaim</div></div>
        <div class="chart-wrap"><canvas id="c2"></canvas></div>
      </div>
      <div class="card chart-card">
        <div class="card-header"><div class="card-title"><i class="ri-line-chart-line"></i>Aktivitas Sales 7 Hari</div></div>
        <div class="chart-wrap"><canvas id="c3"></canvas></div>
      </div>
    </div>
    <div class="grid grid-2">
      <div id="recentKlaim"></div>
      <div id="recentBayar"></div>
    </div>
  `;

  const kpis = root.querySelector('#kpis');
  const totalPolis = DATA.polis.length;
  const totalPremi = DATA.polis.reduce((s, p) => s + p.premi_tahunan, 0) + 1_230_000_000_000;
  const klaimProses = DATA.klaim.filter(k => k.status === 'Proses').length;
  const totalNasabah = DATA.nasabah.length;
  const investasi = 15_300_000_000;
  const anomaliAktif = DATA.anomali.length;

  kpis.appendChild(U.kpi('Total Polis Aktif', totalPolis, 'file-shield-2-line', { numeric: totalPolis }));
  kpis.appendChild(U.kpi('Total Premi YTD', U.fmtIDRShort(totalPremi), 'money-dollar-circle-line', { numeric: totalPremi, formatter: U.fmtIDRShort }));
  kpis.appendChild(U.kpi('Total Klaim Proses', klaimProses, 'alert-line', { numeric: klaimProses }));
  kpis.appendChild(U.kpi('Total Nasabah', totalNasabah, 'group-line', { numeric: totalNasabah }));
  kpis.appendChild(U.kpi('Aset Investasi', U.fmtIDRShort(investasi), 'bank-line', { numeric: investasi, formatter: U.fmtIDRShort }));
  kpis.appendChild(U.kpi('Anomali Aktif', anomaliAktif, 'bug-line', { numeric: anomaliAktif, danger: true, alert: true }));

  // Chart 1: premi per produk
  const prodMap = {};
  DATA.polis.forEach(p => { const k = DATA.lookup.produk(p.id_produk).nama; prodMap[k] = (prodMap[k] || 0) + p.premi_tahunan; });
  const prodLabels = Object.keys(prodMap);
  C.bar(root.querySelector('#c1'), prodLabels, prodLabels.map(l => prodMap[l]), {
    horizontal: true,
    callbacks: { label: (ctx) => ' ' + U.fmtIDRShort(ctx.raw) },
  });

  // Chart 2: status klaim
  const ss = { Selesai: 0, Proses: 0, Ditolak: 0 };
  DATA.klaim.forEach(k => { ss[k.status]++; });
  C.doughnut(root.querySelector('#c2'), Object.keys(ss), Object.values(ss), {
    colors: ['#22c55e', '#f59e0b', '#ef4444'],
  });

  // Chart 3: aktivitas 7 hari
  const last7 = DATA.monitoring_sales.reduce((acc, m) => {
    const d = m.tanggal;
    if (!acc[d]) acc[d] = { call: 0, meeting: 0, closing: 0 };
    acc[d].call += m.call; acc[d].meeting += m.meeting; acc[d].closing += m.closing;
    return acc;
  }, {});
  const dates = Object.keys(last7).sort().slice(-7);
  C.line(root.querySelector('#c3'), dates.map(d => d.slice(5)), [
    { label: 'Call',    data: dates.map(d => last7[d].call),    color: '#07beb8' },
    { label: 'Meeting', data: dates.map(d => last7[d].meeting), color: '#3b82f6' },
    { label: 'Closing', data: dates.map(d => last7[d].closing), color: '#22c55e' },
  ]);

  // Recent klaim
  const klaimEl = root.querySelector('#recentKlaim');
  klaimEl.innerHTML = `<div class="card">
    <div class="card-header"><div class="card-title"><i class="ri-alert-line"></i>Klaim Terbaru</div></div>
    <div>${DATA.klaim.slice(0, 5).map(k => `
      <div class="flex-between" style="padding:10px 0; border-bottom:1px solid var(--border)">
        <div>
          <div style="font-weight:700">${k.nomor}</div>
          <div class="text-small muted">${k.jenis} — ${U.fmtDate(k.tanggal_kejadian)}</div>
        </div>
        <div style="text-align:right">
          <div>${U.fmtIDRShort(k.estimasi)}</div>
          <div class="text-xs">${U.statusBadge(k.status)}</div>
        </div>
      </div>`).join('')}</div>
  </div>`;

  const bayarEl = root.querySelector('#recentBayar');
  bayarEl.innerHTML = `<div class="card">
    <div class="card-header"><div class="card-title"><i class="ri-bank-card-line"></i>Pembayaran Premi Terbaru</div></div>
    <div>${DATA.pembayaran.slice(0, 5).map(p => `
      <div class="flex-between" style="padding:10px 0; border-bottom:1px solid var(--border)">
        <div>
          <div style="font-weight:700">${p.polis}</div>
          <div class="text-small muted">${p.metode} • ${p.bank} — ${U.fmtDate(p.tanggal)}</div>
        </div>
        <div style="text-align:right">
          <div>${U.fmtIDRShort(p.jumlah)}</div>
          <div class="text-xs">${U.statusBadge(p.status)}</div>
        </div>
      </div>`).join('')}</div>
  </div>`;
};

/* ---------- PAGE 2: BI Analytics ---------- */
P['bi'] = (root) => {
  root.innerHTML = `
    <div class="page-header">
      <div><h1>Business Intelligence</h1><div class="subtitle">Analitik mendalam untuk pengambilan keputusan</div></div>
      <div class="actions">
        <div class="period-selector" id="biPeriod">
          <button class="active" data-p="Q1">Q1</button>
          <button data-p="Q2">Q2</button>
          <button data-p="Q3">Q3</button>
          <button data-p="FY">Full Year</button>
        </div>
      </div>
    </div>
    <div class="grid grid-3" id="biGrid"></div>
  `;
  const grid = root.querySelector('#biGrid');
  const card = (id, title, icon, tall = false) => {
    const d = U.el('div', { class: 'card chart-card ' + (tall ? 'tall' : '') });
    d.innerHTML = `<div class="card-header"><div class="card-title"><i class="ri-${icon}"></i>${title}</div></div><div class="chart-wrap"><canvas id="${id}"></canvas></div>`;
    grid.appendChild(d);
    return d.querySelector('canvas');
  };

  // 1. Premi bulanan trend (multi-line)
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const seedSeries = (base, spike = 1) => months.map((_, i) => Math.round(base + base * Math.sin(i / 1.2) * 0.25 * spike + (i * base * 0.04)));
  C.line(card('b1', 'Premi Bulanan per Kategori', 'line-chart-line'), months, [
    { label: 'Kendaraan', data: seedSeries(42_000_000_000) },
    { label: 'Kesehatan', data: seedSeries(54_000_000_000, 1.1) },
    { label: 'Properti',  data: seedSeries(22_000_000_000) },
    { label: 'Bisnis',    data: seedSeries(28_000_000_000) },
    { label: 'Korporat',  data: seedSeries(82_000_000_000, 0.9) },
  ]);

  // 2. Loss ratio per produk
  const lrLabels = DATA.produk.map(p => p.nama);
  const lr = DATA.produk.map(p => {
    const polis = DATA.polis.filter(po => po.id_produk === p.id);
    const premi = polis.reduce((s, po) => s + po.premi_tahunan, 0);
    const klaim = DATA.klaim.filter(k => polis.some(po => po.nomor === k.polis)).reduce((s, k) => s + (k.disetujui || 0), 0);
    return premi > 0 ? Math.round(klaim / premi * 100) : 0;
  });
  C.bar(card('b2', 'Loss Ratio per Produk (%)', 'bar-chart-horizontal-line'), lrLabels, lr, {
    callbacks: { label: (ctx) => ' ' + ctx.raw + ' %' },
  });

  // 3. Komposisi polis per kategori
  const cat = {};
  DATA.polis.forEach(p => { const k = DATA.lookup.produk(p.id_produk).kategori; cat[k] = (cat[k] || 0) + 1; });
  C.doughnut(card('b3', 'Komposisi Polis per Kategori', 'pie-chart-line'), Object.keys(cat), Object.values(cat), { pie: true });

  // 4. Target vs realisasi sales
  const ag = DATA.target_sales.map(t => DATA.lookup.agen(t.id_agen).kode);
  C.grouped(card('b4', 'Target vs Realisasi Sales', 'target-line'), ag, [
    { label: 'Target',    data: DATA.target_sales.map(t => t.target / 1e6),    color: '#9ceaef' },
    { label: 'Realisasi', data: DATA.target_sales.map(t => t.realisasi / 1e6), color: '#07beb8' },
  ]);

  // 5. Arus kas masuk vs keluar
  const kas = months.slice(0, 6).map((m, i) => ({
    m, masuk: 85_000_000_000 + i * 6_000_000_000, keluar: 60_000_000_000 + i * 4_000_000_000,
  }));
  C.grouped(card('b5', 'Arus Kas Masuk vs Keluar', 'exchange-funds-line'), kas.map(k => k.m), [
    { label: 'Masuk',  data: kas.map(k => k.masuk / 1e9),  color: '#22c55e' },
    { label: 'Keluar', data: kas.map(k => k.keluar / 1e9), color: '#ef4444' },
  ], { stacked: true });

  // 6. Top 5 agen by closing value
  const closingByAgen = {};
  DATA.monitoring_sales.forEach(m => { closingByAgen[m.id_agen] = (closingByAgen[m.id_agen] || 0) + m.nilai_closing; });
  const top5 = Object.entries(closingByAgen).sort((a, b) => b[1] - a[1]).slice(0, 5);
  C.bar(card('b6', 'Top 5 Agen by Closing Value', 'trophy-line'),
    top5.map(t => DATA.lookup.agen(t[0]).kode),
    top5.map(t => Math.round(t[1] / 1e6)),
    { callbacks: { label: (ctx) => ' Rp ' + ctx.raw + ' jt' }, horizontal: true });

  // 7. Alokasi dana
  C.doughnut(card('b7', 'Alokasi Dana 2024', 'pie-chart-2-line'),
    DATA.alokasi.map(a => a.jenis),
    DATA.alokasi.map(a => a.dialokasikan / 1e12));

  // 8. Forecast 2024
  const fc = DATA.forecast.filter(f => f.periode === 'Q1 2024');
  C.line(card('b8', 'Forecast Q1 2024: Premi vs Klaim', 'funds-line'),
    fc.map(f => f.produk), [
      { label: 'Est. Premi', data: fc.map(f => f.est_premi / 1e9), color: '#07beb8' },
      { label: 'Est. Klaim', data: fc.map(f => f.est_klaim / 1e9), color: '#ef4444' },
    ]);

  // 9. Radar risiko
  C.radar(card('b9', 'Skor Risiko Register', 'shield-check-line'),
    DATA.risiko.map(r => r.nama.slice(0, 24)),
    { label: 'Skor / 25', data: DATA.risiko.map(r => r.skor / 5) });

  // 10. Anomali by tipe
  const tipeAnom = {};
  DATA.anomali.forEach(a => { tipeAnom[a.tipe] = (tipeAnom[a.tipe] || 0) + 1; });
  C.bar(card('b10', 'Anomali per Tipe', 'bug-line'),
    Object.keys(tipeAnom), Object.values(tipeAnom),
    { colors: ['#ef4444', '#f59e0b', '#eab308'] });

  // 11. Aset komposisi
  const asetCat = {};
  DATA.aset.forEach(a => { asetCat[a.kategori] = (asetCat[a.kategori] || 0) + a.nilai_buku; });
  C.doughnut(card('b11', 'Komposisi Aset', 'briefcase-4-line'),
    Object.keys(asetCat), Object.values(asetCat).map(v => v / 1e9), { pie: true });

  // 12. Sponsorship revenue
  C.bar(card('b12', 'Sponsorship Revenue', 'hand-coin-line'),
    DATA.sponsor.map(s => s.nama),
    DATA.sponsor.map(s => s.nilai / 1e6),
    { horizontal: true, callbacks: { label: (ctx) => ' Rp ' + ctx.raw + ' jt' } });

  // period selector stub
  root.querySelectorAll('#biPeriod button').forEach(b => b.addEventListener('click', () => {
    root.querySelectorAll('#biPeriod button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
  }));
};

/* ---------- PAGE 3: Data Nasabah ---------- */
P['nasabah'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Data Nasabah</h1><div class="subtitle">Individu & korporasi</div></div></div><div id="tbl"></div>`;
  const polisCountByNasabah = (id) => DATA.polis.filter(p => p.id_nasabah === id).length;
  const premiByNasabah = (id) => DATA.polis.filter(p => p.id_nasabah === id).reduce((s, p) => s + p.premi_tahunan, 0);
  const tbl = U.buildTable({
    title: `Data Nasabah (${DATA.nasabah.length})`,
    rows: DATA.nasabah,
    cols: [
      { key: 'nama', label: 'Nama', render: r => `<div class="cell-name"><img src="${U.avatar(r.nama)}" alt=""><div><div>${r.nama}</div><div class="sub">${r.id}</div></div></div>` },
      { key: 'tipe', label: 'Tipe', render: r => U.badge(r.tipe, r.tipe === 'Perusahaan' ? 'info' : 'primary') },
      { key: 'nik_npwp', label: 'NIK / NPWP', render: r => `<span class="mono">${r.nik_npwp}</span>` },
      { key: 'kota', label: 'Kota' },
      { key: 'provinsi', label: 'Provinsi' },
      { key: 'pekerjaan', label: 'Pekerjaan' },
      { key: 'sumber', label: 'Sumber' },
      { key: 'id_agen', label: 'Agen', render: r => DATA.lookup.agen(r.id_agen).kode },
      { key: '_act', label: 'Aksi', sortable: false, render: r => `<div class="flex"><i class="ri-eye-line" style="cursor:pointer"></i><i class="ri-edit-line" style="cursor:pointer"></i><i class="ri-file-shield-2-line" style="cursor:pointer;color:var(--color-primary)"></i></div>` },
    ],
    tooltip: (r) => `<h4>${r.nama}</h4>${U.tooltipRows([
      ['Telepon', r.no_hp], ['Email', r.email], ['Tgl Lahir', U.fmtDate(r.tanggal_lahir)],
      ['Jumlah Polis', polisCountByNasabah(r.id)],
      ['Total Premi', U.fmtIDR(premiByNasabah(r.id))],
    ])}`,
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 4: Master Polis ---------- */
P['polis'] = (root) => {
  const active = DATA.polis.filter(p => p.status === 'Aktif').length;
  const byCat = {};
  DATA.polis.forEach(p => { const k = DATA.lookup.produk(p.id_produk).kategori; byCat[k] = (byCat[k] || 0) + 1; });
  root.innerHTML = `
    <div class="page-header"><div><h1>Master Polis</h1><div class="subtitle">Semua polis aktif & riwayat</div></div></div>
    <div class="grid grid-4" style="margin-bottom:16px">
      <div class="kpi"><div class="kpi-icon"><i class="ri-file-shield-2-line"></i></div><div class="kpi-body"><div class="kpi-label">Polis Aktif</div><div class="kpi-value">${active}</div></div></div>
      <div class="kpi"><div class="kpi-icon"><i class="ri-file-history-line"></i></div><div class="kpi-body"><div class="kpi-label">Total Polis</div><div class="kpi-value">${DATA.polis.length}</div></div></div>
      <div class="kpi"><div class="kpi-icon"><i class="ri-money-dollar-circle-line"></i></div><div class="kpi-body"><div class="kpi-label">Total Premi</div><div class="kpi-value">${U.fmtIDRShort(DATA.polis.reduce((s, p) => s + p.premi_tahunan, 0))}</div></div></div>
      <div class="kpi"><div class="kpi-icon"><i class="ri-stack-line"></i></div><div class="kpi-body"><div class="kpi-label">Kategori Produk</div><div class="kpi-value">${Object.keys(byCat).length}</div></div></div>
    </div>
    <div id="tbl"></div>
  `;
  const tbl = U.buildTable({
    title: 'Daftar Polis',
    rows: DATA.polis,
    cols: [
      { key: 'nomor', label: 'Nomor Polis', render: r => `<strong>${r.nomor}</strong>` },
      { key: 'id_nasabah', label: 'Nasabah', render: r => { const n = DATA.lookup.nasabah(r.id_nasabah); return `<div class="cell-name"><img src="${U.avatar(n.nama)}" alt=""><div>${n.nama}</div></div>`; } },
      { key: 'id_produk', label: 'Produk', render: r => DATA.lookup.produk(r.id_produk).nama },
      { key: 'id_agen', label: 'Agen', render: r => DATA.lookup.agen(r.id_agen).kode },
      { key: 'periode', label: 'Periode', render: r => `<span class="text-small">${r.periode}</span>` },
      { key: 'nilai_pertanggungan', label: 'Pertanggungan', class: 'cell-num', render: r => U.fmtIDRShort(r.nilai_pertanggungan) },
      { key: 'premi_tahunan', label: 'Premi/Thn', class: 'cell-num', render: r => U.fmtIDRShort(r.premi_tahunan) },
      { key: 'status', label: 'Status', render: r => U.statusBadge(r.status) },
    ],
    tooltip: (r) => {
      const n = DATA.lookup.nasabah(r.id_nasabah);
      const prod = DATA.lookup.produk(r.id_produk);
      const agKar = DATA.lookup.karyawan(DATA.lookup.agen(r.id_agen).id_karyawan);
      return `<h4>${r.nomor}</h4>${U.tooltipRows([
        ['Tgl Terbit', U.fmtDate(r.terbit)], ['Produk', prod.nama], ['Kategori', prod.kategori],
        ['Nasabah', n.nama], ['Agen', agKar.nama],
      ])}`;
    },
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 5: Polis Kendaraan ---------- */
P['polis-kendaraan'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Polis Kendaraan</h1><div class="subtitle">Mobil & motor all-risk / TLO</div></div></div><div id="tbl"></div>`;
  const tbl = U.buildTable({
    title: 'Polis Kendaraan',
    rows: DATA.polis_kendaraan,
    cols: [
      { key: 'nomor', label: 'Polis', render: r => `<strong>${r.nomor}</strong>` },
      { key: 'kategori', label: 'Kategori', render: r => U.badge(r.kategori, 'primary', r.kategori === 'Mobil' ? 'car-line' : 'motorbike-line') },
      { key: 'merk', label: 'Merk' },
      { key: 'tipe', label: 'Tipe' },
      { key: 'tahun', label: 'Tahun' },
      { key: 'plat', label: 'Plat', render: r => `<span class="mono">${r.plat}</span>` },
      { key: 'jenis', label: 'Jenis Pertanggungan' },
      { key: 'nilai', label: 'Nilai', class: 'cell-num', render: r => U.fmtIDRShort(r.nilai) },
      { key: 'workshop', label: 'Workshop' },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 6: Polis Kesehatan ---------- */
P['polis-kesehatan'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Polis Kesehatan</h1><div class="subtitle">Rawat inap & rawat jalan</div></div></div><div id="tbl"></div>`;
  const tbl = U.buildTable({
    title: 'Polis Kesehatan',
    rows: DATA.polis_kesehatan,
    cols: [
      { key: 'nomor', label: 'Polis', render: r => `<strong>${r.nomor}</strong>` },
      { key: 'nama_tertanggung', label: 'Tertanggung', render: r => `<div class="cell-name"><img src="${U.avatar(r.nama_tertanggung, 30)}" alt="">${r.nama_tertanggung}</div>` },
      { key: 'gender', label: 'Gender', render: r => U.badge(r.gender === 'M' ? 'Pria' : 'Wanita', r.gender === 'M' ? 'info' : 'primary', r.gender === 'M' ? 'men-line' : 'women-line') },
      { key: 'tanggal_lahir', label: 'Lahir', render: r => U.fmtDate(r.tanggal_lahir) },
      { key: 'plan_inap', label: 'Plan', render: r => U.badge(r.plan_inap, 'primary') },
      { key: 'limit', label: 'Limit', class: 'cell-num', render: r => U.fmtIDRShort(r.limit) },
      { key: 'dikecualikan', label: 'Dikecualikan' },
      { key: 'rs_rekanan', label: 'RS Rekanan' },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 7: Polis Properti ---------- */
P['polis-properti'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Polis Properti</h1><div class="subtitle">Residensial & komersial</div></div></div><div id="tbl"></div>`;
  const risikoColor = (r) => r === 'Tinggi' ? 'danger' : r === 'Menengah' ? 'warning' : 'success';
  const tbl = U.buildTable({
    title: 'Polis Properti',
    rows: DATA.polis_properti,
    cols: [
      { key: 'nomor', label: 'Polis', render: r => `<strong>${r.nomor}</strong>` },
      { key: 'jenis', label: 'Jenis' },
      { key: 'alamat', label: 'Alamat' },
      { key: 'luas', label: 'Luas (m²)', class: 'cell-num' },
      { key: 'nilai_bangunan', label: 'Nilai Bangunan', class: 'cell-num', render: r => U.fmtIDRShort(r.nilai_bangunan) },
      { key: 'nilai_isi', label: 'Nilai Isi', class: 'cell-num', render: r => U.fmtIDRShort(r.nilai_isi) },
      { key: 'konstruksi', label: 'Konstruksi' },
      { key: 'sertifikat', label: 'Sertifikat', render: r => U.badge(r.sertifikat, 'info') },
      { key: 'risiko_banjir', label: 'Risiko Banjir', render: r => U.badge(r.risiko_banjir, risikoColor(r.risiko_banjir)) },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 8: Polis Bisnis ---------- */
P['polis-bisnis'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Polis Bisnis</h1><div class="subtitle">Usaha UMKM & menengah</div></div></div><div id="tbl"></div>`;
  const tbl = U.buildTable({
    title: 'Polis Bisnis',
    rows: DATA.polis_bisnis,
    cols: [
      { key: 'nomor', label: 'Polis', render: r => `<strong>${r.nomor}</strong>` },
      { key: 'nama_usaha', label: 'Nama Usaha' },
      { key: 'jenis', label: 'Jenis Usaha', render: r => U.badge(r.jenis, 'primary') },
      { key: 'omzet', label: 'Omzet/Thn', class: 'cell-num', render: r => U.fmtIDRShort(r.omzet) },
      { key: 'karyawan', label: 'Karyawan', class: 'cell-num' },
      { key: 'aset_usaha', label: 'Aset Usaha', class: 'cell-num', render: r => U.fmtIDRShort(r.aset_usaha) },
      { key: 'jenis_risiko', label: 'Jenis Risiko' },
      { key: 'limit_gangguan', label: 'Limit Gangguan', class: 'cell-num', render: r => U.fmtIDRShort(r.limit_gangguan) },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 9: Polis Korporat (card grid) ---------- */
P['polis-korporat'] = (root) => {
  root.innerHTML = `
    <div class="page-header"><div><h1>Polis Korporat</h1><div class="subtitle">Klien enterprise dengan multi-risk coverage</div></div></div>
    <div class="grid grid-2" id="corpGrid"></div>
  `;
  const grid = root.querySelector('#corpGrid');
  DATA.polis_korporat.forEach(c => {
    const am = DATA.lookup.karyawan(c.account_manager);
    const d = U.el('div', { class: 'card' });
    d.innerHTML = `
      <div class="flex" style="gap:14px">
        <img src="${U.logo(c.domain)}" onerror="this.src='${U.avatar(c.nama_perusahaan, 60, '1a2332')}'" style="width:60px;height:60px;border-radius:10px;background:var(--bg-page);padding:6px" alt="">
        <div style="flex:1">
          <div style="font-size:16px;font-weight:700">${c.nama_perusahaan}</div>
          <div class="text-small muted">${c.nomor} • ${c.sektor}</div>
        </div>
        ${U.badge('AKTIF', 'success', 'checkbox-circle-line')}
      </div>
      <div class="grid grid-2" style="gap:8px;margin-top:14px">
        <div><div class="text-xs muted">Jumlah Karyawan</div><div><strong>${U.fmtNum(c.karyawan)}</strong></div></div>
        <div><div class="text-xs muted">Total Aset</div><div><strong>${U.fmtIDRShort(c.total_aset)}</strong></div></div>
        <div style="grid-column:span 2"><div class="text-xs muted">Jenis Pertanggungan</div><div style="font-size:13px">${c.jenis_pertanggungan}</div></div>
        <div style="grid-column:span 2"><div class="text-xs muted">Account Manager</div><div class="cell-name" style="margin-top:2px"><img src="${U.avatar(am.nama, 30)}" alt="">${am.nama}</div></div>
      </div>
    `;
    grid.appendChild(d);
  });
};

/* ---------- PAGE 10: Data Klaim ---------- */
P['klaim'] = (root) => {
  const count = { Selesai: 0, Proses: 0, Ditolak: 0 };
  DATA.klaim.forEach(k => count[k.status]++);
  root.innerHTML = `
    <div class="page-header"><div><h1>Data Klaim</h1><div class="subtitle">Pipeline status & investigasi</div></div></div>
    <div class="pipeline">
      <div class="pipe selesai"><i class="ri-checkbox-circle-line" style="font-size:30px;color:var(--success)"></i><div><div class="num">${count.Selesai}</div><div class="lbl">Selesai</div></div></div>
      <div class="pipe proses"><i class="ri-loader-2-line" style="font-size:30px;color:var(--warning)"></i><div><div class="num">${count.Proses}</div><div class="lbl">Proses</div></div></div>
      <div class="pipe ditolak"><i class="ri-close-circle-line" style="font-size:30px;color:var(--danger)"></i><div><div class="num">${count.Ditolak}</div><div class="lbl">Ditolak</div></div></div>
    </div>
    <div id="tbl"></div>
  `;
  const tbl = U.buildTable({
    title: 'Daftar Klaim',
    rows: DATA.klaim,
    cols: [
      { key: 'nomor', label: 'No. Klaim', render: r => `<strong>${r.nomor}</strong>` },
      { key: 'polis', label: 'Polis' },
      { key: 'id_nasabah', label: 'Nasabah', render: r => DATA.lookup.nasabah(r.id_nasabah).nama },
      { key: 'jenis', label: 'Jenis' },
      { key: 'tanggal_kejadian', label: 'Tgl Kejadian', render: r => U.fmtDate(r.tanggal_kejadian) },
      { key: 'estimasi', label: 'Estimasi', class: 'cell-num', render: r => U.fmtIDRShort(r.estimasi) },
      { key: 'disetujui', label: 'Disetujui', class: 'cell-num', render: r => r.disetujui ? U.fmtIDRShort(r.disetujui) : '-' },
      { key: 'status', label: 'Status', render: r => {
        const b = U.statusBadge(r.status);
        return r.status === 'Proses' ? b.replace('badge-warning', 'badge-warning badge-alert') : b;
      } },
      { key: 'investigator', label: 'Investigator', render: r => DATA.lookup.karyawan(r.investigator).nama },
    ],
    tooltip: (r) => `<h4>${r.nomor}</h4>
      <div style="font-size:11px;color:var(--text-secondary);margin-bottom:8px">${r.deskripsi}</div>
      ${U.tooltipRows([
        ['Lapor', U.fmtDate(r.tanggal_lapor)],
        ['Selesai', U.fmtDate(r.tanggal_selesai)],
        ['Status', r.status],
      ])}
      <div class="mt-1 text-xs" style="display:flex;gap:4px;align-items:center">
        <span style="width:8px;height:8px;border-radius:50%;background:var(--success)"></span>Lapor
        <span style="flex:1;height:1px;background:var(--border)"></span>
        <span style="width:8px;height:8px;border-radius:50%;background:${r.status==='Ditolak'?'var(--danger)':'var(--warning)'}"></span>Investigasi
        <span style="flex:1;height:1px;background:var(--border)"></span>
        <span style="width:8px;height:8px;border-radius:50%;background:${r.status==='Selesai'?'var(--success)':'var(--border)'}"></span>${r.status==='Ditolak'?'Ditolak':'Selesai'}
      </div>
    `,
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 11: Penyaluran Dana ---------- */
P['penyaluran'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Penyaluran Dana Klaim</h1><div class="subtitle">Transfer ke nasabah atau mitra rekanan</div></div></div><div id="tbl"></div>`;
  const tbl = U.buildTable({
    title: 'Penyaluran Dana',
    rows: DATA.penyaluran,
    cols: [
      { key: 'id', label: 'ID', render: r => `<strong>${r.id}</strong>` },
      { key: 'klaim', label: 'Klaim' },
      { key: 'id_nasabah', label: 'Nasabah', render: r => { const n = DATA.lookup.nasabah(r.id_nasabah); return `<div class="cell-name"><img src="${U.avatar(n.nama)}" alt="">${n.nama}</div>`; } },
      { key: 'tanggal', label: 'Tanggal', render: r => U.fmtDate(r.tanggal) },
      { key: 'metode', label: 'Metode', render: r => U.badge(r.metode, 'info', r.metode === 'Direct RS' ? 'hospital-line' : r.metode === 'RTGS' ? 'send-plane-line' : 'bank-transfer-line') },
      { key: 'bank', label: 'Bank / Tujuan' },
      { key: 'jumlah', label: 'Jumlah', class: 'cell-num', render: r => U.fmtIDRShort(r.jumlah) },
      { key: 'status', label: 'Status', render: r => U.statusBadge(r.status) },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 12: Pengambilan Dana (high alert) ---------- */
P['pengambilan'] = (root) => {
  const anom = DATA.pengambilan.filter(p => p.anomali);
  root.innerHTML = `
    <div class="page-header"><div><h1>Pengambilan Dana</h1><div class="subtitle">Pengambilan cadangan teknis & operasional</div></div></div>
    ${anom.length ? `<div class="alert-banner"><i class="ri-alarm-warning-line"></i>
      <div><strong>${anom.length} transaksi pengambilan memerlukan perhatian segera.</strong>
      Referensi: ${anom.map(a => a.id).join(', ')} — cek tab Anomali untuk detail.</div>
      <span class="close" onclick="this.parentElement.remove()"><i class="ri-close-line"></i></span>
    </div>` : ''}
    <div id="tbl"></div>
  `;
  const tbl = U.buildTable({
    title: 'Pengambilan Dana',
    rows: DATA.pengambilan,
    cols: [
      { key: 'id', label: 'ID', render: r => `${r.anomali ? '<i class="ri-error-warning-line" style="color:var(--danger)"></i> ' : ''}<strong>${r.id}</strong>` },
      { key: 'tanggal', label: 'Tanggal', render: r => U.fmtDate(r.tanggal) },
      { key: 'jenis', label: 'Jenis', render: r => U.badge(r.jenis, 'primary') },
      { key: 'jumlah', label: 'Jumlah', class: 'cell-num', render: r => U.fmtIDRShort(r.jumlah) },
      { key: 'bank_sumber', label: 'Bank Sumber' },
      { key: 'tujuan', label: 'Tujuan' },
      { key: 'otorisasi', label: 'Otorisasi', render: r => U.badge(r.otorisasi, r.otorisasi === 'Direktur' ? 'success' : r.otorisasi === 'Manager' ? 'info' : 'warning') },
      { key: 'status', label: 'Status', render: r => U.statusBadge(r.status) },
    ],
    rowClass: (r) => r.anomali ? 'flag-anomali' : '',
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 13: Tagihan & Pembayaran (tabs) ---------- */
P['tagihan'] = (root) => {
  root.innerHTML = `
    <div class="page-header"><div><h1>Tagihan & Pembayaran</h1><div class="subtitle">Invoice premi dan riwayat bayar</div></div></div>
    <div class="tabs" id="tabs">
      <button class="active" data-tab="tagihan">Tagihan</button>
      <button data-tab="bayar">Pembayaran</button>
    </div>
    <div id="tagihanTbl"></div>
    <div id="bayarTbl" style="display:none"></div>
  `;
  const tbl1 = U.buildTable({
    title: 'Tagihan',
    rows: DATA.tagihan,
    cols: [
      { key: 'invoice', label: 'Invoice', render: r => `<strong>${r.invoice}</strong>` },
      { key: 'polis', label: 'Polis' },
      { key: 'periode', label: 'Periode' },
      { key: 'total_premi', label: 'Premi', class: 'cell-num', render: r => U.fmtIDRShort(r.total_premi) },
      { key: 'ppn', label: 'PPN', class: 'cell-num', render: r => U.fmtIDRShort(r.ppn) },
      { key: 'admin', label: 'Admin', class: 'cell-num', render: r => U.fmtIDRShort(r.admin) },
      { key: 'total', label: 'Total', class: 'cell-num', render: r => `<strong>${U.fmtIDRShort(r.total)}</strong>` },
      { key: 'status', label: 'Status', render: r => U.statusBadge(r.status) },
    ],
  });
  const metodeBadge = (m) => {
    const icon = m === 'RTGS' ? 'send-plane-line' : m === 'Virtual Account' ? 'qr-code-line' : 'bank-transfer-line';
    return U.badge(m, 'info', icon);
  };
  const tbl2 = U.buildTable({
    title: 'Pembayaran',
    rows: DATA.pembayaran,
    cols: [
      { key: 'polis', label: 'Polis', render: r => `<strong>${r.polis}</strong>` },
      { key: 'tanggal', label: 'Tanggal', render: r => U.fmtDate(r.tanggal) },
      { key: 'jumlah', label: 'Jumlah', class: 'cell-num', render: r => U.fmtIDRShort(r.jumlah) },
      { key: 'metode', label: 'Metode', render: r => metodeBadge(r.metode) },
      { key: 'bank', label: 'Bank' },
      { key: 'ref', label: 'Ref', render: r => `<span class="mono">${r.ref}</span>` },
      { key: 'status', label: 'Status', render: r => U.statusBadge(r.status) },
      { key: 'denda', label: 'Denda', class: 'cell-num', render: r => r.denda ? U.fmtIDR(r.denda) : '-' },
    ],
  });
  root.querySelector('#tagihanTbl').appendChild(tbl1);
  root.querySelector('#bayarTbl').appendChild(tbl2);
  root.querySelectorAll('#tabs button').forEach(b => b.addEventListener('click', () => {
    root.querySelectorAll('#tabs button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const show = b.dataset.tab;
    root.querySelector('#tagihanTbl').style.display = show === 'tagihan' ? 'block' : 'none';
    root.querySelector('#bayarTbl').style.display   = show === 'bayar'   ? 'block' : 'none';
  }));
};

/* ---------- PAGE 14: Uang Masuk ---------- */
P['uang-masuk'] = (root) => {
  const anom = DATA.uang_masuk.filter(u => u.anomali);
  root.innerHTML = `<div class="page-header"><div><h1>Uang Masuk</h1><div class="subtitle">Kas & bank inflow</div></div></div>
    ${anom.length ? `<div class="alert-banner"><i class="ri-alarm-warning-fill"></i><div><strong>${anom.length} transaksi flagged sebagai anomali.</strong> Ref: ${anom.map(a => a.id).join(', ')}</div></div>` : ''}
    <div id="tbl"></div>`;
  const tbl = U.buildTable({
    title: 'Uang Masuk',
    rows: DATA.uang_masuk,
    cols: [
      { key: 'id', label: 'ID', render: r => `${r.anomali?'<i class="ri-alarm-warning-fill" style="color:var(--danger)"></i> ':''}<strong>${r.id}</strong>` },
      { key: 'tanggal', label: 'Tanggal', render: r => U.fmtDate(r.tanggal) },
      { key: 'jenis', label: 'Jenis', render: r => U.badge(r.jenis, 'primary') },
      { key: 'referensi', label: 'Referensi' },
      { key: 'jumlah', label: 'Jumlah', class: 'cell-num', render: r => U.fmtIDRShort(r.jumlah) },
      { key: 'bank', label: 'Bank' },
      { key: 'keterangan', label: 'Keterangan' },
      { key: 'pencatat', label: 'Dicatat Oleh', render: r => DATA.lookup.karyawan(r.pencatat).nama },
    ],
    rowClass: r => r.anomali ? 'flag-anomali' : '',
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 15: Uang Keluar ---------- */
P['uang-keluar'] = (root) => {
  const anom = DATA.uang_keluar.filter(u => u.anomali);
  root.innerHTML = `<div class="page-header"><div><h1>Uang Keluar</h1><div class="subtitle">Kas & bank outflow</div></div></div>
    ${anom.length ? `<div class="alert-banner"><i class="ri-alarm-warning-fill"></i><div><strong>${anom.length} transaksi flagged sebagai anomali.</strong> Ref: ${anom.map(a => a.id).join(', ')}</div></div>` : ''}
    <div id="tbl"></div>`;
  const tbl = U.buildTable({
    title: 'Uang Keluar',
    rows: DATA.uang_keluar,
    cols: [
      { key: 'id', label: 'ID', render: r => `${r.anomali?'<i class="ri-alarm-warning-fill" style="color:var(--danger)"></i> ':''}<strong>${r.id}</strong>` },
      { key: 'tanggal', label: 'Tanggal', render: r => U.fmtDate(r.tanggal) },
      { key: 'jenis', label: 'Jenis', render: r => U.badge(r.jenis, 'primary') },
      { key: 'referensi', label: 'Referensi' },
      { key: 'jumlah', label: 'Jumlah', class: 'cell-num', render: r => U.fmtIDRShort(r.jumlah) },
      { key: 'bank', label: 'Bank' },
      { key: 'keterangan', label: 'Keterangan' },
      { key: 'pencatat', label: 'Dicatat Oleh', render: r => DATA.lookup.karyawan(r.pencatat).nama },
    ],
    rowClass: r => r.anomali ? 'flag-anomali' : '',
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 16: Alokasi Dana ---------- */
P['alokasi'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Alokasi Dana</h1><div class="subtitle">Breakdown alokasi dana perusahaan 2024</div></div></div>
    <div class="card" style="margin-bottom:16px">
      <div class="card-header"><div class="card-title"><i class="ri-pie-chart-2-line"></i>Progress Penggunaan per Alokasi</div></div>
      <div id="bars"></div>
    </div>
    <div id="tbl"></div>`;
  const bars = root.querySelector('#bars');
  DATA.alokasi.forEach(a => {
    const pct = Math.round(a.terpakai / a.dialokasikan * 100);
    const cls = pct >= 85 ? 'danger' : pct >= 60 ? 'warn' : 'success';
    const row = U.el('div', { style: 'margin-bottom:14px' });
    row.innerHTML = `
      <div class="progress-label"><span><strong>${a.jenis}</strong> — ${U.fmtIDRShort(a.terpakai)} / ${U.fmtIDRShort(a.dialokasikan)}</span><span>${pct}%</span></div>
      <div class="progress"><div class="progress-fill ${cls}" style="width:0"></div></div>`;
    bars.appendChild(row);
    setTimeout(() => row.querySelector('.progress-fill').style.width = pct + '%', 40);
  });
  const tbl = U.buildTable({
    title: 'Alokasi Dana',
    rows: DATA.alokasi,
    cols: [
      { key: 'id', label: 'ID' },
      { key: 'periode', label: 'Periode' },
      { key: 'produk', label: 'Produk' },
      { key: 'jenis', label: 'Jenis Alokasi', render: r => U.badge(r.jenis, 'primary') },
      { key: 'dialokasikan', label: 'Dialokasikan', class: 'cell-num', render: r => U.fmtIDRShort(r.dialokasikan) },
      { key: 'terpakai', label: 'Terpakai', class: 'cell-num', render: r => U.fmtIDRShort(r.terpakai) },
      { key: 'sisa', label: 'Sisa', class: 'cell-num', render: r => U.fmtIDRShort(r.dialokasikan - r.terpakai) },
      { key: 'pct_premi', label: '% Premi', class: 'cell-num', render: r => r.pct_premi + ' %' },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 17: Leads (Kanban) ---------- */
P['leads'] = (root) => {
  root.innerHTML = `
    <div class="page-header">
      <div><h1>Data Leads</h1><div class="subtitle">Pipeline prospek hot / warm / cold</div></div>
      <div class="actions"><div class="period-selector" id="viewToggle"><button class="active" data-v="k"><i class="ri-layout-column-line"></i> Kanban</button><button data-v="t"><i class="ri-list-check-2"></i> List</button></div></div>
    </div>
    <div id="kanbanView"><div class="kanban" id="kanban"></div></div>
    <div id="listView" style="display:none"><div id="listTbl"></div></div>
  `;
  const kanban = root.querySelector('#kanban');
  const tahaps = [['Hot','fire-line','hot'],['Warm','temp-hot-line','warm'],['Cold','snowy-line','cold']];
  const bytahap = {};
  DATA.leads.forEach(l => { (bytahap[l.tahap] = bytahap[l.tahap] || []).push(l); });
  tahaps.forEach(([t, icon, cls]) => {
    const col = U.el('div', { class: 'kanban-col ' + cls, 'data-tahap': t });
    col.innerHTML = `<h3><span><i class="ri-${icon}"></i> ${t}</span><span class="cnt">${(bytahap[t]||[]).length}</span></h3>`;
    (bytahap[t] || []).forEach(l => {
      const ag = DATA.lookup.agen(l.id_agen);
      const card = U.el('div', { class: 'lead-card', draggable: 'true', 'data-id': l.id });
      card.innerHTML = `
        <div class="lead-name">${l.nama}</div>
        <div class="lead-meta">${U.badge(l.tipe, l.tipe === 'Perusahaan' ? 'info' : 'primary')} · ${l.produk}</div>
        <div class="lead-foot">
          <span class="mono">${U.fmtIDRShort(l.estimasi_premi)}</span>
          <span class="muted">${ag.kode} · ${U.fmtDate(l.followup)}</span>
        </div>`;
      card.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/plain', l.id); });
      col.appendChild(card);
    });
    col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('drag-over'); });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', (e) => {
      e.preventDefault(); col.classList.remove('drag-over');
      const id = e.dataTransfer.getData('text/plain');
      const c = document.querySelector(`.lead-card[data-id="${id}"]`);
      if (c) col.appendChild(c);
    });
    kanban.appendChild(col);
  });

  const listTbl = U.buildTable({
    title: 'List Leads',
    rows: DATA.leads,
    cols: [
      { key: 'id', label: 'ID', render: r => `<strong>${r.id}</strong>` },
      { key: 'nama', label: 'Nama' },
      { key: 'tipe', label: 'Tipe', render: r => U.badge(r.tipe, r.tipe === 'Perusahaan' ? 'info' : 'primary') },
      { key: 'produk', label: 'Produk' },
      { key: 'estimasi_premi', label: 'Est. Premi', class: 'cell-num', render: r => U.fmtIDRShort(r.estimasi_premi) },
      { key: 'id_agen', label: 'Agen', render: r => DATA.lookup.agen(r.id_agen).kode },
      { key: 'followup', label: 'Follow-up', render: r => U.fmtDate(r.followup) },
      { key: 'tahap', label: 'Tahap', render: r => U.badge(r.tahap, r.tahap === 'Hot' ? 'danger' : r.tahap === 'Warm' ? 'warning' : 'info') },
    ],
  });
  root.querySelector('#listTbl').appendChild(listTbl);
  root.querySelectorAll('#viewToggle button').forEach(b => b.addEventListener('click', () => {
    root.querySelectorAll('#viewToggle button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    root.querySelector('#kanbanView').style.display = b.dataset.v === 'k' ? 'block' : 'none';
    root.querySelector('#listView').style.display = b.dataset.v === 't' ? 'block' : 'none';
  }));
};

/* ---------- PAGE 18: Target Sales ---------- */
P['target'] = (root) => {
  root.innerHTML = `
    <div class="page-header"><div><h1>Target Sales</h1><div class="subtitle">Progres pencapaian agen Q1 2024</div></div></div>
    <div class="grid grid-3" id="agentCards" style="margin-bottom:16px"></div>
    <div class="card chart-card">
      <div class="card-header"><div class="card-title"><i class="ri-bar-chart-grouped-line"></i>Target vs Realisasi</div></div>
      <div class="chart-wrap"><canvas id="tgtChart"></canvas></div>
    </div>
  `;
  const grid = root.querySelector('#agentCards');
  DATA.target_sales.forEach(t => {
    const ag = DATA.lookup.agen(t.id_agen);
    const kar = DATA.lookup.karyawan(ag.id_karyawan);
    const cls = t.pct >= 100 ? 'success' : t.pct >= 80 ? 'warn' : 'danger';
    const c = U.el('div', { class: 'card' });
    c.innerHTML = `
      <div class="flex" style="gap:12px;margin-bottom:10px">
        <img src="${U.avatar(kar.nama, 48)}" class="avatar-md" alt="">
        <div style="flex:1"><div style="font-weight:700">${kar.nama}</div><div class="text-xs muted">${ag.kode} • ${ag.wilayah}</div></div>
        ${U.statusBadge(t.status)}
      </div>
      <div class="progress-label"><span>${U.fmtIDRShort(t.realisasi)} / ${U.fmtIDRShort(t.target)}</span><span><strong>${t.pct}%</strong></span></div>
      <div class="progress"><div class="progress-fill ${cls}" style="width:${Math.min(t.pct, 100)}%"></div></div>`;
    grid.appendChild(c);
  });
  const labels = DATA.target_sales.map(t => DATA.lookup.agen(t.id_agen).kode);
  C.grouped(root.querySelector('#tgtChart'), labels, [
    { label: 'Target', data: DATA.target_sales.map(t => t.target / 1e6), color: '#9ceaef' },
    { label: 'Realisasi', data: DATA.target_sales.map(t => t.realisasi / 1e6), color: '#07beb8' },
  ]);
};

/* ---------- PAGE 19: Monitoring Sales (heatmap) ---------- */
P['monitoring'] = (root) => {
  root.innerHTML = `
    <div class="page-header"><div><h1>Monitoring Sales</h1><div class="subtitle">Aktivitas harian 30 hari (April 2024)</div></div></div>
    <div class="card" style="margin-bottom:16px">
      <div class="card-header"><div class="card-title"><i class="ri-grid-line"></i>Heatmap Aktivitas</div><div class="text-xs muted">Intensitas = total aktivitas</div></div>
      <div id="heatmap" class="heatmap"></div>
    </div>
    <div id="tbl"></div>
  `;
  const hm = root.querySelector('#heatmap');
  // header row: blank + 30 days
  hm.appendChild(U.el('div', { class: 'agent-label' }, 'Agen \\ Tgl'));
  for (let i = 1; i <= 30; i++) hm.appendChild(U.el('div', { class: 'day-label' }, String(i)));
  DATA.agen.forEach(a => {
    hm.appendChild(U.el('div', { class: 'agent-label' }, a.kode));
    const rows = DATA.monitoring_sales.filter(m => m.id_agen === a.id).sort((a1, b1) => a1.tanggal.localeCompare(b1.tanggal));
    rows.forEach(r => {
      const total = r.call + r.meeting + r.closing * 3;
      const lvl = total > 25 ? 'l4' : total > 18 ? 'l3' : total > 10 ? 'l2' : total > 3 ? 'l1' : '';
      hm.appendChild(U.el('div', { class: 'cell ' + lvl, title: `${a.kode} ${r.tanggal}: ${r.call}c ${r.meeting}m ${r.closing}cl` }));
    });
  });

  const spark = (vals) => {
    const max = Math.max(...vals, 1);
    return `<span class="sparkline">${vals.map(v => `<span style="height:${Math.round(v / max * 18)}px"></span>`).join('')}</span>`;
  };
  const tbl = U.buildTable({
    title: 'Aktivitas Agen Harian',
    rows: DATA.monitoring_sales.slice(0, 40),
    pageSize: 15,
    cols: [
      { key: 'tanggal', label: 'Tanggal', render: r => U.fmtDate(r.tanggal) },
      { key: 'id_agen', label: 'Agen', render: r => { const k = DATA.lookup.karyawan(DATA.lookup.agen(r.id_agen).id_karyawan); return `<div class="cell-name"><img src="${U.avatar(k.nama, 28)}" alt="">${k.nama}</div>`; } },
      { key: 'call', label: 'Call', class: 'cell-num' },
      { key: 'meeting', label: 'Meeting', class: 'cell-num' },
      { key: 'presentasi', label: 'Presentasi', class: 'cell-num' },
      { key: 'closing', label: 'Closing', class: 'cell-num', render: r => `${r.closing} ${spark([r.call, r.meeting, r.presentasi, r.closing].map(v => v || 0.2))}` },
      { key: 'nilai_closing', label: 'Nilai Closing', class: 'cell-num', render: r => U.fmtIDRShort(r.nilai_closing) },
      { key: 'leads_baru', label: 'Leads Baru', class: 'cell-num' },
      { key: 'catatan', label: 'Catatan' },
    ],
    rowClass: r => r.closing >= 2 ? 'row-success' : r.closing === 0 ? 'row-muted' : '',
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 20: Data Karyawan (org chart) ---------- */
P['karyawan'] = (root) => {
  root.innerHTML = `
    <div class="page-header"><div><h1>Data Karyawan</h1><div class="subtitle">Struktur organisasi & detail HRD</div></div></div>
    <div class="card" style="margin-bottom:16px">
      <div class="card-header"><div class="card-title"><i class="ri-organization-chart"></i>Struktur Kepala Departemen</div></div>
      <div class="orgchart" id="org"></div>
    </div>
    <div id="tbl"></div>
  `;
  const direktur = DATA.karyawan.find(k => k.id === 'KAR-001');
  const bawahan = DATA.karyawan.filter(k => ['KAR-002','KAR-003','KAR-004','KAR-005','KAR-006','KAR-007'].includes(k.id));
  const nodeHTML = (k) => `<div class="node"><img src="${U.avatar(k.nama)}" alt=""><div><div><strong>${k.nama}</strong></div><div class="role">${k.jabatan}</div></div></div>`;
  const org = root.querySelector('#org');
  org.innerHTML = `<ul><li>${nodeHTML(direktur)}<ul>${bawahan.map(b => `<li>${nodeHTML(b)}</li>`).join('')}</ul></li></ul>`;

  const maskGaji = (g) => {
    // show first two digits only
    const s = String(g);
    return 'Rp ' + s.slice(0, 2) + '.***.***';
  };
  const tbl = U.buildTable({
    title: 'Karyawan',
    rows: DATA.karyawan,
    cols: [
      { key: 'nik', label: 'NIK', render: r => `<span class="mono">${r.nik}</span>` },
      { key: 'nama', label: 'Nama', render: r => `<div class="cell-name"><img src="${U.avatar(r.nama)}" alt=""><div>${r.nama}<div class="sub">${r.id}</div></div></div>` },
      { key: 'dep', label: 'Departemen', render: r => U.badge(DATA.lookup.departemen(r.dep).kode, 'primary') },
      { key: 'jabatan', label: 'Jabatan' },
      { key: 'email', label: 'Email', render: r => `<i class="ri-mail-line muted"></i> ${r.email}` },
      { key: 'no_hp', label: 'No HP' },
      { key: 'tanggal_masuk', label: 'Masuk', render: r => U.fmtDate(r.tanggal_masuk) },
      { key: 'gaji', label: 'Gaji Pokok', class: 'cell-num', render: r => maskGaji(r.gaji) },
      { key: 'status', label: 'Kontrak', render: r => U.badge(r.status, r.status === 'Tetap' ? 'success' : 'warning') },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 21: Data Agen (cards) ---------- */
P['agen'] = (root) => {
  root.innerHTML = `
    <div class="page-header"><div><h1>Data Agen</h1><div class="subtitle">Profil agen & validitas lisensi OJK</div></div></div>
    <div class="grid grid-2" id="agenGrid"></div>
  `;
  const grid = root.querySelector('#agenGrid');
  DATA.agen.forEach(a => {
    const k = DATA.lookup.karyawan(a.id_karyawan);
    const expired = new Date(a.expired) > new Date('2024-04-26');
    const ratingColor = a.rating.startsWith('A+') ? 'success' : a.rating.startsWith('A') ? 'info' : a.rating.startsWith('B+') ? 'primary' : 'muted';
    const c = U.el('div', { class: 'card' });
    c.innerHTML = `
      <div class="flex" style="gap:14px">
        <img src="${U.avatar(k.nama, 60)}" class="avatar-lg" alt="">
        <div style="flex:1">
          <div style="font-weight:700;font-size:16px">${k.nama}</div>
          <div class="text-small muted">${a.kode} • ${a.wilayah}</div>
          <div class="mt-1">${U.badge('Rating ' + a.rating, ratingColor, 'star-line')}
          ${expired ? U.badge('Lisensi Valid', 'success', 'shield-check-line') : U.badge('Lisensi Expired', 'danger', 'shield-cross-line')}</div>
        </div>
      </div>
      <div class="grid grid-2" style="margin-top:14px;font-size:12px">
        <div><div class="text-xs muted">Lisensi OJK</div><div class="mono">${a.lisensi_ojk}</div></div>
        <div><div class="text-xs muted">Expired</div><div>${U.fmtDate(a.expired)}</div></div>
        <div><div class="text-xs muted">Target Bulanan</div><div><strong>${U.fmtIDRShort(a.target_bulanan)}</strong></div></div>
        <div><div class="text-xs muted">Polis Aktif</div><div><strong>${a.polis_aktif}</strong></div></div>
      </div>`;
    grid.appendChild(c);
  });
};

/* ---------- PAGE 22: Komisi Agen ---------- */
P['komisi'] = (root) => {
  const totalKomisi = DATA.komisi.reduce((s, k) => s + k.komisi, 0);
  const totalPph = DATA.komisi.reduce((s, k) => s + k.pph21, 0);
  root.innerHTML = `
    <div class="page-header"><div><h1>Komisi Agen</h1><div class="subtitle">Breakdown komisi & potongan PPh 21</div></div></div>
    <div class="grid grid-3" style="margin-bottom:16px">
      <div class="kpi"><div class="kpi-icon"><i class="ri-money-dollar-circle-line"></i></div><div class="kpi-body"><div class="kpi-label">Total Komisi</div><div class="kpi-value">${U.fmtIDRShort(totalKomisi)}</div></div></div>
      <div class="kpi"><div class="kpi-icon"><i class="ri-scales-line"></i></div><div class="kpi-body"><div class="kpi-label">PPh 21 Dipotong</div><div class="kpi-value">${U.fmtIDRShort(totalPph)}</div></div></div>
      <div class="kpi"><div class="kpi-icon"><i class="ri-bank-card-line"></i></div><div class="kpi-body"><div class="kpi-label">Komisi Bersih</div><div class="kpi-value">${U.fmtIDRShort(totalKomisi - totalPph)}</div></div></div>
    </div>
    <div id="tbl"></div>`;
  const tbl = U.buildTable({
    title: 'Komisi Agen',
    rows: DATA.komisi,
    cols: [
      { key: 'id_agen', label: 'Agen', render: r => { const k = DATA.lookup.karyawan(DATA.lookup.agen(r.id_agen).id_karyawan); return `<div class="cell-name"><img src="${U.avatar(k.nama, 28)}" alt="">${k.nama}</div>`; } },
      { key: 'id_polis', label: 'Polis' },
      { key: 'periode', label: 'Periode' },
      { key: 'jenis', label: 'Jenis', render: r => U.badge(r.jenis, r.jenis === 'Tahun Pertama' ? 'primary' : 'info') },
      { key: 'persen', label: '%', class: 'cell-num' },
      { key: 'nilai_premi', label: 'Nilai Premi', class: 'cell-num', render: r => U.fmtIDRShort(r.nilai_premi) },
      { key: 'komisi', label: 'Komisi', class: 'cell-num', render: r => U.fmtIDRShort(r.komisi) },
      { key: 'pph21', label: 'PPh 21', class: 'cell-num', render: r => U.fmtIDRShort(r.pph21) },
      { key: 'bersih', label: 'Bersih', class: 'cell-num', render: r => `<strong>${U.fmtIDRShort(r.bersih)}</strong>` },
      { key: 'status', label: 'Status', render: r => U.statusBadge(r.status) },
      { key: 'tanggal_bayar', label: 'Tgl Bayar', render: r => U.fmtDate(r.tanggal_bayar) },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 23: Produk Asuransi ---------- */
P['produk'] = (root) => {
  const icons = { Kendaraan: 'car-line', Kesehatan: 'heart-pulse-line', Properti: 'home-4-line', Bisnis: 'briefcase-line', Korporat: 'building-4-line' };
  root.innerHTML = `
    <div class="page-header"><div><h1>Produk Asuransi</h1><div class="subtitle">Katalog produk & ketentuan</div></div></div>
    <div class="grid grid-3" id="pGrid"></div>`;
  const grid = root.querySelector('#pGrid');
  DATA.produk.forEach(p => {
    const c = U.el('div', { class: 'card' });
    c.innerHTML = `
      <div class="flex" style="gap:12px">
        <div style="width:56px;height:56px;border-radius:12px;background:var(--color-primary-5);color:var(--color-primary);display:flex;align-items:center;justify-content:center"><i class="ri-${icons[p.kategori]||'shield-line'}" style="font-size:28px"></i></div>
        <div style="flex:1"><div style="font-weight:700;font-size:15px">${p.nama}</div><div class="text-small muted">${p.kode}</div><div class="mt-1">${U.badge(p.kategori, 'primary')} ${p.ojk ? U.badge('OJK Approved', 'success', 'verified-badge-line') : ''}</div></div>
      </div>
      <div class="mt-2 text-small">
        <div><span class="muted">Premi:</span> <strong>${U.fmtIDRShort(p.premi_min)} – ${U.fmtIDRShort(p.premi_max)}</strong></div>
        <div><span class="muted">Masa Pertanggungan:</span> ${p.masa}</div>
        <div><span class="muted">Loading Rate:</span> ${p.loading}%</div>
        <div><span class="muted">Launch:</span> ${U.fmtDate(p.launch)}</div>
        <div class="mt-1" style="display:flex;flex-wrap:wrap;gap:4px">${p.manfaat.map(m => U.badge(m, 'muted')).join('')}</div>
      </div>`;
    grid.appendChild(c);
  });
};

/* ---------- PAGE 24: Rumah Sakit ---------- */
P['rumah-sakit'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Rumah Sakit Rekanan</h1><div class="subtitle">RS yang bekerja sama untuk rawat inap/jalan</div></div></div><div id="tbl"></div>`;
  const akColor = (a) => a === 'Paripurna' ? 'primary' : a === 'Utama' ? 'warning' : 'muted';
  const tbl = U.buildTable({
    title: 'Rumah Sakit',
    rows: DATA.rumah_sakit,
    cols: [
      { key: 'nama', label: 'Rumah Sakit', render: r => `<div class="cell-name"><img src="${U.avatar(r.nama, 32, 'ef4444')}" alt="">${r.nama}</div>` },
      { key: 'tipe', label: 'Tipe', render: r => U.badge(r.tipe, r.tipe === 'Swasta' ? 'info' : 'primary') },
      { key: 'kota', label: 'Kota' },
      { key: 'akreditasi', label: 'Akreditasi', render: r => U.badge(r.akreditasi, akColor(r.akreditasi)) },
      { key: 'kapasitas', label: 'Kapasitas', class: 'cell-num' },
      { key: 'status', label: 'Status', render: r => U.statusBadge(r.status) },
      { key: 'pic', label: 'PIC' },
    ],
    tooltip: (r) => `<h4>${r.nama}</h4>${U.tooltipRows([['Alamat', r.alamat], ['Telepon', r.telp], ['PKS', r.pks]])}`,
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 25: Bengkel ---------- */
P['bengkel'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Bengkel Rekanan</h1><div class="subtitle">Workshop untuk klaim kendaraan</div></div></div><div id="tbl"></div>`;
  const tbl = U.buildTable({
    title: 'Bengkel',
    rows: DATA.bengkel,
    cols: [
      { key: 'nama', label: 'Bengkel', render: r => `<div class="cell-name"><i class="ri-tools-line" style="color:var(--color-primary);font-size:18px"></i>${r.nama}</div>` },
      { key: 'tipe', label: 'Tipe', render: r => U.badge(r.tipe, r.tipe === 'Resmi Dealer' ? 'primary' : 'info') },
      { key: 'merk', label: 'Merk', render: r => U.badge(r.merk, 'muted') },
      { key: 'kota', label: 'Kota' },
      { key: 'kapasitas', label: 'Kapasitas/Hari', class: 'cell-num' },
      { key: 'status', label: 'Status', render: r => U.statusBadge(r.status) },
      { key: 'pic', label: 'PIC' },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 26: Bank Rekanan ---------- */
P['bank'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Bank Rekanan</h1><div class="subtitle">Rekanan pembayaran & operasional</div></div></div><div class="grid grid-2" id="bankGrid"></div>`;
  const tipeColor = (t) => t === 'BUMN' ? 'info' : t === 'Syariah' ? 'warning' : 'primary';
  const g = root.querySelector('#bankGrid');
  DATA.bank.forEach(b => {
    const c = U.el('div', { class: 'card' });
    c.innerHTML = `
      <div class="flex" style="gap:14px">
        <img src="${U.logo(b.domain)}" onerror="this.src='${U.avatar(b.nama, 60)}'" style="width:60px;height:60px;border-radius:12px;background:var(--bg-page);padding:8px" alt="">
        <div style="flex:1">
          <div style="font-weight:700;font-size:16px">${b.nama}</div>
          <div class="text-small muted">Kode ${b.kode} • ${U.badge(b.tipe, tipeColor(b.tipe))}</div>
        </div>
      </div>
      <div class="grid grid-2" style="margin-top:14px;font-size:12px">
        <div><div class="text-xs muted">No. Rekening</div><div class="mono">${b.rekening}</div></div>
        <div><div class="text-xs muted">Cabang</div><div>${b.cabang}</div></div>
        <div><div class="text-xs muted">SWIFT</div><div class="mono">${b.swift}</div></div>
        <div><div class="text-xs muted">Tujuan</div><div>${b.tujuan}</div></div>
      </div>`;
    g.appendChild(c);
  });
};

/* ---------- PAGE 27: PKS ---------- */
P['pks'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Kerjasama (PKS)</h1><div class="subtitle">Dokumen perjanjian dengan mitra</div></div></div><div id="tbl"></div>`;
  const tbl = U.buildTable({
    title: 'PKS',
    rows: DATA.pks,
    cols: [
      { key: 'nomor', label: 'Nomor PKS', render: r => `<strong>${r.nomor}</strong>` },
      { key: 'mitra', label: 'Mitra' },
      { key: 'tipe', label: 'Tipe', render: r => U.badge(r.tipe, 'primary') },
      { key: 'mulai', label: 'Mulai', render: r => U.fmtDate(r.mulai) },
      { key: 'berakhir', label: 'Berakhir', render: r => U.fmtDate(r.berakhir) },
      { key: 'nilai', label: 'Nilai', class: 'cell-num', render: r => U.fmtIDRShort(r.nilai) },
      { key: 'syarat', label: 'Syarat Bayar' },
      { key: 'status', label: 'Status', render: r => U.statusBadge(r.status) },
      { key: 'pic_int', label: 'PIC Internal', render: r => DATA.lookup.karyawan(r.pic_int).nama },
      { key: 'pic_ext', label: 'PIC Eksternal' },
      { key: '_dok', label: 'Dokumen', sortable: false, render: r => `<a href="#" style="color:var(--danger)"><i class="ri-file-pdf-line"></i> PKS.pdf</a>` },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 28: Sponsor ---------- */
P['sponsor'] = (root) => {
  const tierColor = (t) => t === 'Platinum' ? 'dark' : t === 'Gold' ? 'gold' : 'silver';
  root.innerHTML = `
    <div class="page-header"><div><h1>Sponsor</h1><div class="subtitle">Program sponsorship & kontraprestasi</div></div></div>
    <div class="card" style="margin-bottom:16px">
      <div class="card-header"><div class="card-title"><i class="ri-medal-line"></i>Tier Ranking</div></div>
      <ol style="padding-left:20px;font-size:13px">${[...DATA.sponsor].sort((a, b) => b.nilai - a.nilai).map(s => `<li style="margin-bottom:6px">${U.badge(s.tier, tierColor(s.tier))} <strong>${s.nama}</strong> — ${U.fmtIDRShort(s.nilai)}</li>`).join('')}</ol>
    </div>
    <div id="tbl"></div>`;
  const tbl = U.buildTable({
    title: 'Sponsor',
    rows: DATA.sponsor,
    cols: [
      { key: 'nama', label: 'Sponsor', render: r => `<div class="cell-name"><img src="${U.avatar(r.nama, 32, 'f59e0b')}" alt="">${r.nama}</div>` },
      { key: 'tier', label: 'Tier', render: r => U.badge(r.tier, tierColor(r.tier), 'medal-line') },
      { key: 'nilai', label: 'Nilai', class: 'cell-num', render: r => U.fmtIDRShort(r.nilai) },
      { key: 'periode', label: 'Periode' },
      { key: 'bentuk', label: 'Bentuk Kontribusi' },
      { key: 'kontra', label: 'Kontra Prestasi' },
      { key: 'status_bayar', label: 'Status', render: r => U.statusBadge(r.status_bayar) },
      { key: 'pic', label: 'PIC', render: r => DATA.lookup.karyawan(r.pic).nama },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 29: Profil Perusahaan ---------- */
P['perusahaan'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Profil Perusahaan</h1><div class="subtitle">Induk & cabang PT Rezeki Assurance</div></div></div><div class="grid grid-2" id="persGrid"></div>`;
  const g = root.querySelector('#persGrid');
  DATA.perusahaan.forEach(p => {
    const dir = DATA.lookup.karyawan(p.direktur);
    const c = U.el('div', { class: 'card' });
    c.innerHTML = `
      <div class="flex" style="gap:12px">
        <div style="width:56px;height:56px;border-radius:12px;background:var(--color-primary);color:#fff;display:flex;align-items:center;justify-content:center"><i class="ri-building-line" style="font-size:28px"></i></div>
        <div style="flex:1"><div style="font-weight:700;font-size:15px">${p.nama}</div><div class="text-small muted">${p.id} • ${p.kota}, ${p.provinsi}</div></div>
        ${U.badge(p.jenis, p.jenis === 'Induk' ? 'primary' : 'info')}
      </div>
      <div class="grid grid-2 mt-2" style="font-size:12px">
        <div><div class="text-xs muted">NPWP</div><div class="mono">${p.npwp}</div></div>
        <div><div class="text-xs muted">Modal Dasar</div><div><strong>${U.fmtIDRShort(p.modal_dasar)}</strong></div></div>
        <div><div class="text-xs muted">Berdiri</div><div>${U.fmtDate(p.tanggal_berdiri)}</div></div>
        <div><div class="text-xs muted">Status</div>${U.statusBadge(p.status)}</div>
        <div style="grid-column:span 2"><div class="text-xs muted">Direktur Utama</div><div class="cell-name"><img src="${U.avatar(dir.nama, 30)}" alt="">${dir.nama}</div></div>
      </div>`;
    g.appendChild(c);
  });
};

/* ---------- PAGE 30: Departemen ---------- */
P['departemen'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Departemen</h1><div class="subtitle">7 departemen operasional</div></div></div><div id="tbl"></div>`;
  const maxKar = Math.max(...DATA.departemen.map(d => d.jumlah_karyawan));
  const tbl = U.buildTable({
    title: 'Departemen',
    rows: DATA.departemen,
    cols: [
      { key: 'nama', label: 'Nama Departemen', render: r => `<strong>${r.nama}</strong>` },
      { key: 'kode', label: 'Kode', render: r => U.badge(r.kode, 'primary') },
      { key: 'kepala', label: 'Kepala', render: r => { const k = DATA.lookup.karyawan(r.kepala); return `<div class="cell-name"><img src="${U.avatar(k.nama, 30)}" alt="">${k.nama}</div>`; } },
      { key: 'jumlah_karyawan', label: 'Karyawan', render: r => `
        <div class="flex" style="gap:8px">${r.jumlah_karyawan}
        <div class="progress" style="flex:1;max-width:100px"><div class="progress-fill" style="width:${r.jumlah_karyawan/maxKar*100}%"></div></div></div>` },
      { key: 'anggaran', label: 'Anggaran', class: 'cell-num', render: r => U.fmtIDRShort(r.anggaran) },
      { key: 'lokasi', label: 'Lokasi' },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 31: Aset (split chart + table) ---------- */
P['aset'] = (root) => {
  root.innerHTML = `
    <div class="page-header"><div><h1>Aset Perusahaan</h1><div class="subtitle">Portofolio aset & depresiasi</div></div></div>
    <div class="grid grid-2" style="margin-bottom:16px">
      <div class="card chart-card"><div class="card-header"><div class="card-title"><i class="ri-pie-chart-line"></i>Komposisi Aset per Kategori</div></div><div class="chart-wrap"><canvas id="aChart"></canvas></div></div>
      <div class="card"><div class="card-header"><div class="card-title"><i class="ri-information-line"></i>Ringkasan</div></div>
        <div style="font-size:13px;line-height:1.8">
          <div class="flex-between"><span class="muted">Total Nilai Buku</span><strong>${U.fmtIDRShort(DATA.aset.reduce((s, a) => s + a.nilai_buku, 0))}</strong></div>
          <div class="flex-between"><span class="muted">Total Nilai Perolehan</span><strong>${U.fmtIDRShort(DATA.aset.reduce((s, a) => s + a.nilai_perolehan, 0))}</strong></div>
          <div class="flex-between"><span class="muted">Jumlah Aset</span><strong>${DATA.aset.length} item</strong></div>
          <div class="flex-between"><span class="muted">Kategori</span><strong>${new Set(DATA.aset.map(a => a.kategori)).size}</strong></div>
        </div>
      </div>
    </div>
    <div id="tbl"></div>`;
  const cat = {};
  DATA.aset.forEach(a => { cat[a.kategori] = (cat[a.kategori] || 0) + a.nilai_buku; });
  C.doughnut(root.querySelector('#aChart'), Object.keys(cat), Object.values(cat).map(v => v / 1e9), { pie: true });
  const tbl = U.buildTable({
    title: 'Aset',
    rows: DATA.aset,
    cols: [
      { key: 'kode', label: 'Kode', render: r => `<span class="mono">${r.kode}</span>` },
      { key: 'nama', label: 'Nama Aset', render: r => `<strong>${r.nama}</strong>` },
      { key: 'kategori', label: 'Kategori', render: r => U.badge(r.kategori, 'primary') },
      { key: 'nilai_perolehan', label: 'Nilai Perolehan', class: 'cell-num', render: r => U.fmtIDRShort(r.nilai_perolehan) },
      { key: 'nilai_buku', label: 'Nilai Buku', class: 'cell-num', render: r => U.fmtIDRShort(r.nilai_buku) },
      { key: 'depr', label: 'Depresiasi', render: r => `<div class="flex" style="gap:8px">${r.depr}% <div class="progress" style="width:60px"><div class="progress-fill ${r.depr > 50 ? 'warn' : ''}" style="width:${r.depr}%"></div></div></div>` },
      { key: 'lokasi', label: 'Lokasi' },
      { key: 'kondisi', label: 'Kondisi', render: r => U.statusBadge(r.kondisi === 'Baik' ? 'Aktif' : r.kondisi) },
      { key: 'umur', label: 'Umur (Thn)', class: 'cell-num' },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 32: Risiko ---------- */
P['risiko'] = (root) => {
  root.innerHTML = `
    <div class="page-header"><div><h1>Manajemen Risiko</h1><div class="subtitle">Register risiko & matriks probabilitas × dampak</div></div></div>
    <div class="card" style="margin-bottom:16px">
      <div class="card-header"><div class="card-title"><i class="ri-grid-fill"></i>Risk Matrix (Probabilitas × Dampak)</div></div>
      <div style="display:flex;gap:8px">
        <div style="display:flex;flex-direction:column;justify-content:space-between;font-size:10px;color:var(--text-muted);text-align:center;padding:20px 0;writing-mode:vertical-rl;transform:rotate(180deg)">Dampak →</div>
        <div style="flex:1"><div class="risk-matrix" id="matrix"></div>
          <div style="display:grid;grid-template-columns:60px repeat(5, 1fr);gap:4px;margin-top:6px;font-size:11px;color:var(--text-muted);text-align:center">
            <div></div><div>P1</div><div>P2</div><div>P3</div><div>P4</div><div>P5</div>
          </div>
          <div class="center text-xs muted mt-1">Probabilitas →</div>
        </div>
      </div>
    </div>
    <div id="tbl"></div>`;
  const m = root.querySelector('#matrix');
  // Build 5 rows (dampak 5 down to 1), 5 cols (prob 1..5). First col is axis
  for (let d = 5; d >= 1; d--) {
    m.appendChild(U.el('div', { class: 'axis' }, `D${d}`));
    for (let p = 1; p <= 5; p++) {
      const score = d * p;
      const cls = score >= 15 ? 'l-high' : score >= 8 ? 'l-med' : 'l-low';
      const cell = U.el('div', { class: 'cell ' + cls });
      DATA.risiko.filter(r => r.probabilitas === p && r.dampak === d).forEach(r => {
        const dotCls = r.skor >= 20 ? 'crit' : r.skor >= 12 ? 'high' : r.skor >= 8 ? 'med' : 'low';
        const dot = U.el('div', { class: 'dot ' + dotCls, title: `${r.nama} (skor ${r.skor})` }, r.skor.toString());
        cell.appendChild(dot);
      });
      m.appendChild(cell);
    }
  }
  const skorColor = (s) => s >= 25 ? 'danger' : s >= 15 ? 'warning' : 'success';
  const tbl = U.buildTable({
    title: 'Register Risiko',
    rows: DATA.risiko,
    cols: [
      { key: 'kategori', label: 'Kategori', render: r => U.badge(r.kategori, 'primary') },
      { key: 'nama', label: 'Nama Risiko' },
      { key: 'probabilitas', label: 'Prob', class: 'cell-num' },
      { key: 'dampak', label: 'Dampak', class: 'cell-num' },
      { key: 'dampak_finansial', label: 'Dampak Finansial', class: 'cell-num', render: r => U.fmtIDRShort(r.dampak_finansial) },
      { key: 'skor', label: 'Skor', render: r => U.badge(r.skor, skorColor(r.skor)) },
      { key: 'strategi', label: 'Strategi Mitigasi' },
      { key: 'status', label: 'Status', render: r => U.statusBadge(r.status) },
      { key: 'level', label: 'Level', render: r => U.badge(r.level, r.level === 'Kritis' ? 'danger' : r.level === 'Tinggi' ? 'warning' : 'info') },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 33: Anomali & Fraud ---------- */
P['anomali'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Anomali &amp; Fraud</h1><div class="subtitle">Deteksi penyimpangan & eskalasi</div></div></div>
    <div id="cards" style="margin-bottom:16px"></div>
    <div id="tbl"></div>`;
  const cards = root.querySelector('#cards');
  DATA.anomali.forEach(a => {
    const cls = a.skor >= 80 ? 'high' : a.skor >= 60 ? 'medium' : 'low';
    const c = U.el('div', { class: 'anomali-card ' + cls });
    c.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;min-width:70px">
        <i class="ri-alarm-warning-fill" style="font-size:32px;color:var(--danger)"></i>
        <div class="skor">${a.skor}</div>
        <div class="text-xs muted">skor</div>
      </div>
      <div class="info">
        <h3>${a.tipe} <span class="text-xs muted">[${a.id}]</span></h3>
        <p>${a.deskripsi}</p>
        <div class="meta">
          ${U.badge('Terdampak: ' + U.fmtIDR(a.jumlah_terdampak), 'danger')}
          ${U.statusBadge(a.status)}
          ${U.badge('Ref: ' + a.ref, 'muted')}
          ${a.eskalasi ? '<span class="badge badge-danger badge-alert"><i class="ri-shield-cross-line"></i> ESKALASI OJK</span>' : ''}
        </div>
      </div>`;
    cards.appendChild(c);
  });
  const tbl = U.buildTable({
    title: 'Log Anomali',
    rows: DATA.anomali,
    cols: [
      { key: 'id', label: 'ID', render: r => `<strong>${r.id}</strong>` },
      { key: 'tipe', label: 'Tipe' },
      { key: 'skor', label: 'Skor', render: r => U.badge(r.skor, r.skor >= 80 ? 'danger' : r.skor >= 60 ? 'warning' : 'info') },
      { key: 'deskripsi', label: 'Deskripsi' },
      { key: 'jumlah_terdampak', label: 'Terdampak', class: 'cell-num', render: r => U.fmtIDRShort(r.jumlah_terdampak) },
      { key: 'status', label: 'Status', render: r => U.statusBadge(r.status) },
      { key: 'eskalasi', label: 'Eskalasi', render: r => r.eskalasi ? U.badge('OJK', 'danger', 'shield-cross-line') : U.badge('Internal', 'info') },
      { key: 'ref', label: 'Referensi' },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 34: Email ---------- */
P['email'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Email &amp; Komunikasi</h1><div class="subtitle">Inbox korespondensi masuk</div></div></div>
    <div class="inbox">
      <div class="inbox-list" id="mailList"></div>
      <div class="inbox-detail" id="mailDetail"><div class="muted">Pilih email dari daftar di kiri.</div></div>
    </div>`;
  const list = root.querySelector('#mailList');
  const detail = root.querySelector('#mailDetail');
  const select = (em) => {
    list.querySelectorAll('.inbox-item').forEach(x => x.classList.remove('active'));
    const el = list.querySelector(`[data-id="${em.id}"]`);
    if (el) { el.classList.add('active'); el.classList.add('read'); }
    const priClass = em.prioritas === 'Kritis' ? 'danger' : em.prioritas === 'Tinggi' ? 'warning' : 'info';
    detail.innerHTML = `
      <h2>${em.subjek}</h2>
      <div class="from-row"><div>${em.dari}</div><div>${U.fmtDate(em.tanggal)}</div></div>
      <div class="mb-2">${U.badge(em.prioritas, priClass)} ${U.badge(em.tipe, 'primary')} ${U.badge('Ref: ' + em.referensi, 'muted')}</div>
      <div class="body">${em.isi}</div>`;
  };
  DATA.email.forEach(em => {
    const priClass = em.prioritas === 'Kritis' ? 'danger' : em.prioritas === 'Tinggi' ? 'warning' : 'info';
    const item = U.el('div', { class: 'inbox-item ' + (em.baca ? 'read' : ''), 'data-id': em.id });
    item.innerHTML = `
      <div class="from"><span><span class="dot"></span>${em.dari.split('<')[0].trim()}</span><span>${em.tanggal.slice(5)}</span></div>
      <div class="subj">${em.subjek}</div>
      <div class="text-xs">${U.badge(em.prioritas, priClass)}</div>`;
    item.addEventListener('click', () => select(em));
    list.appendChild(item);
  });
  select(DATA.email[0]);
};

/* ---------- PAGE 35: Dokumen ---------- */
P['dokumen'] = (root) => {
  root.innerHTML = `<div class="page-header"><div><h1>Dokumen</h1><div class="subtitle">Repository dokumen internal & regulator</div></div></div><div id="tbl"></div>`;
  const fmtIcon = (f) => f === 'pdf' ? '<i class="ri-file-pdf-line" style="color:var(--danger)"></i>' : f === 'xlsx' ? '<i class="ri-file-excel-2-line" style="color:var(--success)"></i>' : '<i class="ri-file-line"></i>';
  const tbl = U.buildTable({
    title: 'Dokumen',
    rows: DATA.dokumen,
    cols: [
      { key: 'nama', label: 'Nama File', render: r => `${fmtIcon(r.format)} <a href="#" style="margin-left:6px">${r.nama}</a>` },
      { key: 'tipe_dok', label: 'Tipe', render: r => U.badge(r.tipe_dok, 'primary') },
      { key: 'referensi', label: 'Referensi' },
      { key: 'ukuran_kb', label: 'Ukuran', class: 'cell-num', render: r => r.ukuran_kb >= 1024 ? (r.ukuran_kb / 1024).toFixed(1) + ' MB' : r.ukuran_kb + ' KB' },
      { key: 'tanggal', label: 'Upload', render: r => U.fmtDate(r.tanggal) },
      { key: 'uploader', label: 'Diupload', render: r => { const k = DATA.lookup.karyawan(r.uploader); return `<div class="cell-name"><img src="${U.avatar(k.nama, 28)}" alt="">${k.nama}</div>`; } },
      { key: 'verif', label: 'Verifikasi', render: r => U.statusBadge(r.verif) },
      { key: 'retensi', label: 'Retensi (Thn)', class: 'cell-num' },
      { key: '_act', label: 'Aksi', sortable: false, render: r => `<button class="btn btn-outline btn-sm"><i class="ri-download-line"></i></button>` },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 36: Forecast ---------- */
P['forecast'] = (root) => {
  const fy = DATA.forecast.find(f => f.id === 'FCS-004');
  root.innerHTML = `
    <div class="page-header"><div><h1>Forecast</h1><div class="subtitle">Proyeksi premi, klaim & laba 2024</div></div></div>
    <div class="grid grid-4" style="margin-bottom:16px">
      <div class="kpi"><div class="kpi-icon"><i class="ri-file-shield-2-line"></i></div><div class="kpi-body"><div class="kpi-label">Est. Polis Baru</div><div class="kpi-value">${U.fmtNum(fy.est_polis)}</div></div></div>
      <div class="kpi"><div class="kpi-icon"><i class="ri-money-dollar-circle-line"></i></div><div class="kpi-body"><div class="kpi-label">Est. Premi</div><div class="kpi-value">${U.fmtIDRShort(fy.est_premi)}</div></div></div>
      <div class="kpi"><div class="kpi-icon"><i class="ri-alert-line"></i></div><div class="kpi-body"><div class="kpi-label">Est. Klaim</div><div class="kpi-value">${U.fmtIDRShort(fy.est_klaim)}</div></div></div>
      <div class="kpi"><div class="kpi-icon"><i class="ri-line-chart-line"></i></div><div class="kpi-body"><div class="kpi-label">Est. Laba</div><div class="kpi-value">${U.fmtIDRShort(fy.est_laba)}</div></div></div>
    </div>
    <div class="grid grid-2" style="margin-bottom:16px">
      <div class="card chart-card"><div class="card-header"><div class="card-title"><i class="ri-line-chart-line"></i>Forecast Q1 2024: Premi vs Klaim</div></div><div class="chart-wrap"><canvas id="fc1"></canvas></div></div>
      <div class="card chart-card"><div class="card-header"><div class="card-title"><i class="ri-bar-chart-2-line"></i>Est. Laba per Produk</div></div><div class="chart-wrap"><canvas id="fc2"></canvas></div></div>
    </div>
    <div id="tbl"></div>`;
  const q1 = DATA.forecast.filter(f => f.periode === 'Q1 2024');
  C.line(root.querySelector('#fc1'), q1.map(f => f.produk), [
    { label: 'Est. Premi (Miliar)', data: q1.map(f => f.est_premi / 1e9), color: '#07beb8' },
    { label: 'Est. Klaim (Miliar)', data: q1.map(f => f.est_klaim / 1e9), color: '#ef4444' },
  ]);
  C.bar(root.querySelector('#fc2'), q1.map(f => f.produk), q1.map(f => f.est_laba / 1e9), {
    callbacks: { label: (ctx) => ' Rp ' + ctx.raw.toFixed(1) + ' M' },
  });
  const tbl = U.buildTable({
    title: 'Forecast Records',
    rows: DATA.forecast,
    cols: [
      { key: 'id', label: 'ID' },
      { key: 'periode', label: 'Periode' },
      { key: 'metode', label: 'Metode', render: r => U.badge(r.metode, 'primary') },
      { key: 'produk', label: 'Produk' },
      { key: 'est_polis', label: 'Est. Polis', class: 'cell-num' },
      { key: 'est_premi', label: 'Est. Premi', class: 'cell-num', render: r => U.fmtIDRShort(r.est_premi) },
      { key: 'est_klaim', label: 'Est. Klaim', class: 'cell-num', render: r => U.fmtIDRShort(r.est_klaim) },
      { key: 'est_laba', label: 'Est. Laba', class: 'cell-num', render: r => `<strong>${U.fmtIDRShort(r.est_laba)}</strong>` },
      { key: 'asumsi_growth', label: 'Growth', render: r => `<div class="flex" style="gap:8px">${r.asumsi_growth}% <div class="progress" style="width:60px"><div class="progress-fill" style="width:${Math.min(r.asumsi_growth * 5, 100)}%"></div></div></div>` },
      { key: 'pembuat', label: 'Pembuat', render: r => { const k = DATA.lookup.karyawan(r.pembuat); return `<div class="cell-name"><img src="${U.avatar(k.nama, 28)}" alt="">${k.nama}</div>`; } },
    ],
  });
  root.querySelector('#tbl').appendChild(tbl);
};

/* ---------- PAGE 37: Floor Plan ---------- */
P['floor'] = (root) => {
  const floors = {
    G: { name: 'Lantai G — Lobby', rooms: [
      { x: 40, y: 40, w: 280, h: 180, label: 'Lobby Utama', type: 'common' },
      { x: 340, y: 40, w: 220, h: 180, label: 'Reception', type: 'common' },
      { x: 580, y: 40, w: 180, h: 180, label: 'Ruang Meeting A', type: 'common' },
      { x: 40, y: 240, w: 180, h: 140, label: 'Security', type: 'common' },
      { x: 240, y: 240, w: 320, h: 140, label: 'Cafe & Waiting Area', type: 'common' },
      { x: 580, y: 240, w: 180, h: 140, label: 'Ruang Meeting B', type: 'common' },
    ] },
    '2': { name: 'Lantai 2 — TI', dep: 'DEP-005', rooms: [
      { x: 40, y: 40, w: 320, h: 160, label: 'Data Center (AST-005)', type: 'primary', aset: 'AST-005' },
      { x: 380, y: 40, w: 380, h: 160, label: 'Ruang Server & NOC', type: 'primary' },
      { x: 40, y: 220, w: 360, h: 160, label: 'TI — Open Space', type: 'dep', dep: 'DEP-005' },
      { x: 420, y: 220, w: 340, h: 160, label: 'Lab Pengembangan', type: 'dep', dep: 'DEP-005' },
    ] },
    '3': { name: 'Lantai 3 — Sales & Marketing', dep: 'DEP-003', rooms: [
      { x: 40, y: 40, w: 720, h: 140, label: 'Sales & Marketing — Bullpen', type: 'dep', dep: 'DEP-003' },
      { x: 40, y: 200, w: 340, h: 180, label: 'Ruang Manager Sales', type: 'dep', dep: 'DEP-003' },
      { x: 400, y: 200, w: 360, h: 180, label: 'Training Room', type: 'common' },
    ] },
    '4': { name: 'Lantai 4 — Keuangan', dep: 'DEP-004', rooms: [
      { x: 40, y: 40, w: 340, h: 160, label: 'Akuntansi', type: 'dep', dep: 'DEP-004' },
      { x: 400, y: 40, w: 360, h: 160, label: 'Treasury', type: 'dep', dep: 'DEP-004' },
      { x: 40, y: 220, w: 720, h: 160, label: 'Ruang Verifikasi & Pelaporan', type: 'dep', dep: 'DEP-004' },
    ] },
    '5': { name: 'Lantai 5 — Underwriting', dep: 'DEP-001', rooms: [
      { x: 40, y: 40, w: 360, h: 160, label: 'Underwriter Team', type: 'dep', dep: 'DEP-001' },
      { x: 420, y: 40, w: 340, h: 160, label: 'Aktuaria', type: 'dep', dep: 'DEP-001' },
      { x: 40, y: 220, w: 720, h: 160, label: 'Review Board Room', type: 'common' },
    ] },
    '6': { name: 'Lantai 6 — Klaim', dep: 'DEP-002', rooms: [
      { x: 40, y: 40, w: 360, h: 160, label: 'Klaim — Processing', type: 'dep', dep: 'DEP-002' },
      { x: 420, y: 40, w: 340, h: 160, label: 'Investigasi', type: 'dep', dep: 'DEP-002' },
      { x: 40, y: 220, w: 360, h: 160, label: 'Ruang Dokumentasi', type: 'dep', dep: 'DEP-002' },
      { x: 420, y: 220, w: 340, h: 160, label: 'Meeting Klaim', type: 'common' },
    ] },
    '7': { name: 'Lantai 7 — Hukum & Risiko', dep: 'DEP-006', rooms: [
      { x: 40, y: 40, w: 360, h: 160, label: 'Hukum & Kepatuhan (DEP-006)', type: 'dep', dep: 'DEP-006' },
      { x: 420, y: 40, w: 340, h: 160, label: 'Manajemen Risiko (DEP-007)', type: 'dep', dep: 'DEP-007' },
      { x: 40, y: 220, w: 720, h: 160, label: 'Ruang Direksi', type: 'common' },
    ] },
  };
  root.innerHTML = `
    <div class="page-header"><div><h1>Denah Kantor</h1><div class="subtitle">Layout multi-lantai kantor pusat — arahkan kursor ke ruangan</div></div></div>
    <div class="floor-tabs" id="floorTabs"></div>
    <div class="floor-plan" id="floorPlan"></div>
  `;
  const tabs = root.querySelector('#floorTabs');
  const plan = root.querySelector('#floorPlan');
  const tip = U.el('div', { class: 'floor-tooltip' });
  plan.appendChild(tip);

  const order = ['G', '2', '3', '4', '5', '6', '7'];
  order.forEach(n => {
    const b = U.el('button', { 'data-floor': n, class: n === 'G' ? 'active' : '' }, 'Lantai ' + n);
    tabs.appendChild(b);
    b.addEventListener('click', () => {
      tabs.querySelectorAll('button').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      renderFloor(n);
    });
  });

  function renderFloor(n) {
    const floor = floors[n];
    const rooms = floor.rooms;
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 800 420');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    // floor title
    const title = document.createElementNS(svgNS, 'text');
    title.setAttribute('x', 12); title.setAttribute('y', 22); title.setAttribute('fill', 'currentColor'); title.setAttribute('font-size', '13'); title.setAttribute('font-weight', '700');
    title.textContent = floor.name;
    svg.appendChild(title);
    // Corridor
    const corr = document.createElementNS(svgNS, 'rect');
    corr.setAttribute('x', 0); corr.setAttribute('y', 0); corr.setAttribute('width', 800); corr.setAttribute('height', 420);
    corr.setAttribute('fill', 'var(--bg-page)'); corr.setAttribute('rx', 12);
    svg.insertBefore(corr, title);
    // Stairs icon
    const stairs = document.createElementNS(svgNS, 'g');
    stairs.innerHTML = `<circle cx="775" cy="22" r="14" fill="var(--color-primary)"/><text x="775" y="27" fill="#fff" font-size="14" text-anchor="middle" font-weight="700">↕</text>`;
    svg.appendChild(stairs);

    rooms.forEach(r => {
      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', r.x); rect.setAttribute('y', r.y + 30); rect.setAttribute('width', r.w); rect.setAttribute('height', r.h);
      rect.setAttribute('rx', 8);
      rect.setAttribute('class', 'room');
      const fill = r.type === 'primary' ? 'var(--color-primary)' : r.type === 'dep' ? 'var(--color-primary-5)' : 'var(--bg-card)';
      const stroke = r.type === 'primary' ? 'var(--color-primary)' : 'var(--color-primary-3)';
      rect.setAttribute('fill', fill);
      rect.setAttribute('stroke', stroke); rect.setAttribute('stroke-width', 2);
      const txt = document.createElementNS(svgNS, 'text');
      txt.setAttribute('x', r.x + r.w / 2); txt.setAttribute('y', r.y + 30 + r.h / 2);
      txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('dominant-baseline', 'middle');
      txt.setAttribute('font-size', '12'); txt.setAttribute('font-weight', '600');
      txt.setAttribute('fill', r.type === 'primary' ? '#ffffff' : 'var(--text-primary)');
      txt.style.pointerEvents = 'none';
      txt.textContent = r.label;

      rect.addEventListener('mouseenter', (e) => {
        if (r.dep) {
          const d = DATA.lookup.departemen(r.dep);
          const k = DATA.lookup.karyawan(d.kepala);
          tip.innerHTML = `<h4>${d.nama}</h4>${U.tooltipRows([
            ['Kepala', k.nama],
            ['Karyawan', d.jumlah_karyawan],
            ['Anggaran', U.fmtIDRShort(d.anggaran)],
            ['Lokasi', d.lokasi],
          ])}`;
        } else {
          tip.innerHTML = `<h4>${r.label}</h4><div class="text-xs muted">${floor.name}</div>`;
        }
      });
      rect.addEventListener('mousemove', (e) => {
        const rect2 = plan.getBoundingClientRect();
        let x = e.clientX - rect2.left + 14, y = e.clientY - rect2.top + 14;
        if (x + 260 > rect2.width) x = e.clientX - rect2.left - 270;
        tip.style.left = x + 'px'; tip.style.top = y + 'px';
        tip.classList.add('show');
      });
      rect.addEventListener('mouseleave', () => tip.classList.remove('show'));

      svg.appendChild(rect);
      svg.appendChild(txt);
    });
    plan.innerHTML = '';
    plan.appendChild(svg);
    plan.appendChild(tip);
  }
  renderFloor('G');
};
