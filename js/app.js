/* ============================================================
   App bootstrap: nav tree, routing, theme, global search
   ============================================================ */

const NAV = [
  { group: 'Dashboard', icon: 'dashboard-line', items: [
    { id: 'overview', label: 'Overview', icon: 'layout-grid-line' },
    { id: 'bi',       label: 'BI Analytics', icon: 'bar-chart-box-line' },
  ] },
  { group: 'Nasabah & Polis', icon: 'user-star-line', items: [
    { id: 'nasabah',          label: 'Data Nasabah',    icon: 'user-3-line' },
    { id: 'polis',            label: 'Master Polis',    icon: 'file-shield-2-line' },
    { id: 'polis-kendaraan',  label: 'Polis Kendaraan', icon: 'car-line' },
    { id: 'polis-kesehatan',  label: 'Polis Kesehatan', icon: 'heart-pulse-line' },
    { id: 'polis-properti',   label: 'Polis Properti',  icon: 'home-4-line' },
    { id: 'polis-bisnis',     label: 'Polis Bisnis',    icon: 'briefcase-line' },
    { id: 'polis-korporat',   label: 'Polis Korporat',  icon: 'building-4-line' },
  ] },
  { group: 'Klaim', icon: 'alert-line', items: [
    { id: 'klaim',       label: 'Data Klaim',       icon: 'file-damage-line' },
    { id: 'penyaluran',  label: 'Penyaluran Dana',  icon: 'bank-transfer-line' },
    { id: 'pengambilan', label: 'Pengambilan Dana', icon: 'hand-coin-line' },
  ] },
  { group: 'Keuangan', icon: 'wallet-3-line', items: [
    { id: 'tagihan',     label: 'Tagihan & Pembayaran', icon: 'bill-line' },
    { id: 'uang-masuk',  label: 'Uang Masuk',           icon: 'arrow-down-circle-line' },
    { id: 'uang-keluar', label: 'Uang Keluar',          icon: 'arrow-up-circle-line' },
    { id: 'alokasi',     label: 'Alokasi Dana',         icon: 'pie-chart-2-line' },
  ] },
  { group: 'Sales & Marketing', icon: 'megaphone-line', items: [
    { id: 'leads',      label: 'Data Leads',        icon: 'fire-line' },
    { id: 'target',     label: 'Target Sales',      icon: 'target-line' },
    { id: 'monitoring', label: 'Monitoring Sales',  icon: 'radar-line' },
  ] },
  { group: 'SDM & Agen', icon: 'team-line', items: [
    { id: 'karyawan', label: 'Data Karyawan', icon: 'id-card-line' },
    { id: 'agen',     label: 'Data Agen',     icon: 'user-voice-line' },
    { id: 'komisi',   label: 'Komisi Agen',   icon: 'money-dollar-box-line' },
  ] },
  { group: 'Produk', icon: 'shield-check-line', items: [
    { id: 'produk', label: 'Produk Asuransi', icon: 'shield-star-line' },
  ] },
  { group: 'Kemitraan', icon: 'links-line', items: [
    { id: 'rumah-sakit', label: 'Rumah Sakit',   icon: 'hospital-line' },
    { id: 'bengkel',     label: 'Bengkel',       icon: 'tools-line' },
    { id: 'bank',        label: 'Bank Rekanan',  icon: 'bank-line' },
    { id: 'pks',         label: 'Kerjasama (PKS)', icon: 'file-paper-2-line' },
    { id: 'sponsor',     label: 'Sponsor',       icon: 'medal-line' },
  ] },
  { group: 'Perusahaan', icon: 'building-line', items: [
    { id: 'perusahaan', label: 'Profil Perusahaan', icon: 'community-line' },
    { id: 'departemen', label: 'Departemen',        icon: 'group-2-line' },
    { id: 'aset',       label: 'Aset Perusahaan',   icon: 'briefcase-4-line' },
  ] },
  { group: 'Risiko & Kepatuhan', icon: 'shield-keyhole-line', items: [
    { id: 'risiko',  label: 'Manajemen Risiko', icon: 'alert-line' },
    { id: 'anomali', label: 'Anomali & Fraud',  icon: 'bug-line' },
  ] },
  { group: 'Sistem', icon: 'computer-line', items: [
    { id: 'email',    label: 'Email & Komunikasi', icon: 'mail-line' },
    { id: 'dokumen',  label: 'Dokumen',            icon: 'folder-3-line' },
    { id: 'forecast', label: 'Forecast',           icon: 'line-chart-line' },
  ] },
  { group: 'Denah Kantor', icon: 'map-2-line', items: [
    { id: 'floor', label: 'Floor Plan', icon: 'building-2-line' },
  ] },
];

const App = {
  currentPage: null,
  renderedPages: {},

  init() {
    this.buildNav();
    this.bindTheme();
    this.bindCollapse();
    this.bindSearch();
    this.bindBackToTop();
    this.bindResponsive();
    const hash = location.hash.replace('#', '');
    this.go(hash || 'overview');
    window.addEventListener('hashchange', () => {
      const h = location.hash.replace('#', '');
      if (h && h !== this.currentPage) this.go(h);
    });
  },

  buildNav() {
    const nav = document.getElementById('sidebarNav');
    NAV.forEach(grp => {
      const g = U.el('div', { class: 'nav-group' });
      const header = U.el('div', { class: 'nav-group-header' });
      header.innerHTML = `<i class="ri-${grp.icon} group-icon"></i><span class="nav-group-title">${grp.group}</span><i class="ri-arrow-down-s-line nav-group-caret"></i>`;
      header.addEventListener('click', () => g.classList.toggle('collapsed'));
      g.appendChild(header);
      const items = U.el('div', { class: 'nav-group-items' });
      grp.items.forEach(it => {
        const a = U.el('div', { class: 'nav-item', 'data-id': it.id });
        a.innerHTML = `<i class="ri-${it.icon}"></i><span class="nav-label">${it.label}</span>`;
        a.addEventListener('click', () => this.go(it.id));
        items.appendChild(a);
      });
      g.appendChild(items);
      nav.appendChild(g);
    });
    // Collapse groups except Dashboard on mobile
  },

  go(pageId) {
    if (!P[pageId]) pageId = 'overview';
    this.currentPage = pageId;
    location.hash = pageId;

    // Active state
    document.querySelectorAll('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.id === pageId));

    // Breadcrumb
    let grpName = 'Dashboard', pageName = pageId;
    NAV.forEach(g => g.items.forEach(i => { if (i.id === pageId) { grpName = g.group; pageName = i.label; } }));
    U.setBreadcrumb(grpName, pageName);
    document.title = `${pageName} — PT Rezeki Assurance`;

    // Render (lazy, cached)
    const content = document.getElementById('content');
    content.innerHTML = '';
    const section = U.el('section', { class: 'page active', id: 'page-' + pageId });
    content.appendChild(section);
    // Show skeleton briefly then render
    section.innerHTML = '<div class="card"><div class="skeleton" style="height:20px;width:200px;margin-bottom:12px"></div><div class="skeleton" style="height:12px;margin-bottom:8px"></div><div class="skeleton" style="height:12px;margin-bottom:8px;width:80%"></div><div class="skeleton" style="height:12px;width:60%"></div></div>';
    setTimeout(() => {
      section.innerHTML = '';
      try { P[pageId](section); }
      catch (err) { console.error(err); section.innerHTML = '<div class="card"><h3>Error rendering page</h3><pre>' + (err && err.stack || err) + '</pre></div>'; }
    }, 120);

    // Scroll to top
    document.querySelector('.content').scrollTo?.({ top: 0, behavior: 'smooth' });
    window.scrollTo?.({ top: 0, behavior: 'smooth' });
  },

  bindTheme() {
    const btn = document.getElementById('themeBtn');
    const apply = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      btn.querySelector('i').className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
      localStorage.setItem('theme', theme);
      C.applyTheme(theme === 'dark');
    };
    const saved = localStorage.getItem('theme') || 'light';
    apply(saved);
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      apply(cur === 'dark' ? 'light' : 'dark');
    });
  },

  bindCollapse() {
    const btn = document.getElementById('collapseBtn');
    const sidebar = document.getElementById('sidebar');
    btn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      sidebar.classList.toggle('force-open', !sidebar.classList.contains('collapsed'));
    });
  },

  bindSearch() {
    // Sidebar menu search
    const sideInput = document.getElementById('sidebarSearch');
    sideInput.addEventListener('input', () => {
      const q = sideInput.value.toLowerCase();
      document.querySelectorAll('.nav-item').forEach(el => {
        const match = el.textContent.toLowerCase().includes(q);
        el.style.display = match ? '' : 'none';
      });
      document.querySelectorAll('.nav-group').forEach(g => {
        const any = [...g.querySelectorAll('.nav-item')].some(el => el.style.display !== 'none');
        g.style.display = any ? '' : 'none';
      });
    });
    // Global search -> apply to active table
    const globalInput = document.getElementById('globalSearch');
    globalInput.addEventListener('input', () => {
      const q = globalInput.value;
      const wrap = document.querySelector('.page.active .table-wrapper');
      if (wrap && wrap.__applyGlobalFilter) wrap.__applyGlobalFilter(q);
    });
  },

  bindBackToTop() {
    const btn = document.getElementById('backToTop');
    const scroller = document.querySelector('.content');
    scroller.addEventListener('scroll', () => {
      btn.classList.toggle('show', scroller.scrollTop > 300);
    });
    btn.addEventListener('click', () => scroller.scrollTo({ top: 0, behavior: 'smooth' }));
  },

  bindResponsive() {
    const sidebar = document.getElementById('sidebar');
    const check = () => {
      if (window.innerWidth < 1100) sidebar.classList.remove('force-open');
    };
    window.addEventListener('resize', check);
    check();
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
