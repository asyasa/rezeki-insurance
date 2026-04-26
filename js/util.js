/* ============================================================
   Utilities — formatters, DOM helpers, tooltip, table builder
   ============================================================ */

const U = {};

U.fmtIDR = (amt) => new Intl.NumberFormat('id-ID', {
  style: 'currency', currency: 'IDR',
  minimumFractionDigits: 0, maximumFractionDigits: 0,
}).format(amt);

U.fmtIDRShort = (amt) => {
  if (amt == null) return '-';
  const abs = Math.abs(amt);
  if (abs >= 1e12) return 'Rp ' + (amt / 1e12).toFixed(2).replace('.', ',') + ' T';
  if (abs >= 1e9)  return 'Rp ' + (amt / 1e9).toFixed(2).replace('.', ',') + ' M';
  if (abs >= 1e6)  return 'Rp ' + (amt / 1e6).toFixed(1).replace('.', ',') + ' jt';
  if (abs >= 1e3)  return 'Rp ' + (amt / 1e3).toFixed(0) + ' rb';
  return U.fmtIDR(amt);
};

U.fmtNum = (n) => new Intl.NumberFormat('id-ID').format(n);

U.fmtDate = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

U.avatar = (name, size = 40, bg = '07beb8') => {
  const clean = encodeURIComponent(name || 'User');
  return `https://ui-avatars.com/api/?name=${clean}&size=${size * 2}&background=${bg}&color=fff&bold=true`;
};

U.logo = (domain) => `https://logo.clearbit.com/${domain}`;

U.el = (tag, attrs = {}, children = []) => {
  const e = document.createElement(tag);
  for (const k in attrs) {
    if (k === 'class') e.className = attrs[k];
    else if (k === 'html') e.innerHTML = attrs[k];
    else if (k.startsWith('on')) e[k] = attrs[k];
    else if (k === 'style' && typeof attrs[k] === 'object') Object.assign(e.style, attrs[k]);
    else e.setAttribute(k, attrs[k]);
  }
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c == null) return;
    e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return e;
};

/* ---------- Badge markup ---------- */
U.badge = (text, type = 'muted', icon = null) => {
  const i = icon ? `<i class="ri-${icon}"></i>` : '';
  return `<span class="badge badge-${type}">${i}${text}</span>`;
};

U.statusBadge = (status) => {
  const s = (status || '').toLowerCase();
  if (s.includes('selesai') || s === 'lunas' || s === 'aktif' || s === 'sukses' || s.includes('disetujui') || s === 'tercapai' || s === 'terverifikasi' || s === 'dibayar' || s === 'termitigasi') return U.badge(status, 'success', 'checkbox-circle-line');
  if (s.includes('proses') || s === 'outstanding' || s === 'mendekati' || s === 'review' || s === 'investigasi' || s === 'perpanjangan' || s === 'monitoring' || s === 'terlambat' || s === 'parsial' || s === 'pending') return U.badge(status, 'warning', 'loader-2-line');
  if (s.includes('ditolak') || s === 'tertunggak' || s === 'tertinggal' || s === 'ditahan' || s.includes('eskalasi')) return U.badge(status, 'danger', 'close-circle-line');
  return U.badge(status, 'muted');
};

/* ---------- Number animation ---------- */
U.animateNum = (el, to, duration = 1200, formatter = U.fmtNum) => {
  const from = 0, start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const v = from + (to - from) * eased;
    el.textContent = formatter(Math.round(v));
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = formatter(to);
  };
  requestAnimationFrame(step);
};

/* ---------- Row tooltip ---------- */
U.tooltipEl = null;
U.bindRowTooltip = (tr, htmlBuilder) => {
  tr.addEventListener('mouseenter', (e) => {
    const t = document.getElementById('rowTooltip');
    t.innerHTML = htmlBuilder();
    t.classList.add('show');
  });
  tr.addEventListener('mousemove', (e) => {
    const t = document.getElementById('rowTooltip');
    const w = 300, h = t.offsetHeight || 180;
    let x = e.clientX + 14; let y = e.clientY + 14;
    if (x + w + 20 > window.innerWidth) x = e.clientX - w - 14;
    if (y + h + 20 > window.innerHeight) y = e.clientY - h - 14;
    t.style.left = x + 'px'; t.style.top = y + 'px';
  });
  tr.addEventListener('mouseleave', () => {
    document.getElementById('rowTooltip').classList.remove('show');
  });
};

U.tooltipRows = (pairs) => pairs.map(([k, v]) => `<div class="row"><span>${k}</span><span>${v}</span></div>`).join('');

/* ---------- Table builder ---------- */
/* cols: [{ key, label, render(row), class, sortable=true }] */
U.buildTable = (config) => {
  const { title, cols, rows, tooltip, actions = [], pageSize = 10, rowClass = null } = config;
  const wrap = U.el('div', { class: 'table-wrapper' });
  const state = { sort: null, dir: 1, page: 0, q: '', size: pageSize };

  // Header
  const header = U.el('div', { class: 'table-header' });
  header.innerHTML = `
    <h3>${title}</h3>
    <div class="table-actions">
      <div class="search-input"><i class="ri-search-line"></i><input type="text" placeholder="Cari..."></div>
      <button class="btn btn-outline btn-sm"><i class="ri-filter-3-line"></i> Filter</button>
      <button class="btn btn-outline btn-sm"><i class="ri-download-line"></i> Export</button>
      ${actions.map(a => `<button class="btn btn-primary btn-sm">${a}</button>`).join('')}
    </div>
  `;
  wrap.appendChild(header);

  const scroll = U.el('div', { class: 'table-scroll' });
  const table = U.el('table');
  const thead = U.el('thead');
  const trh = U.el('tr');
  cols.forEach((c, idx) => {
    const th = U.el('th', { 'data-idx': idx });
    th.innerHTML = `${c.label} <i class="ri-arrow-up-down-line sort-icon"></i>`;
    if (c.sortable !== false) {
      th.addEventListener('click', () => {
        if (state.sort === idx) state.dir *= -1; else { state.sort = idx; state.dir = 1; }
        render();
      });
    }
    trh.appendChild(th);
  });
  thead.appendChild(trh);
  table.appendChild(thead);

  const tbody = U.el('tbody');
  table.appendChild(tbody);
  scroll.appendChild(table);
  wrap.appendChild(scroll);

  const footer = U.el('div', { class: 'table-footer' });
  wrap.appendChild(footer);

  // filter input
  header.querySelector('input').addEventListener('input', (e) => {
    state.q = e.target.value.toLowerCase();
    state.page = 0;
    render();
  });

  function getFiltered() {
    let data = rows;
    if (state.q) {
      data = data.filter(r => JSON.stringify(r).toLowerCase().includes(state.q));
    }
    if (state.sort != null) {
      const c = cols[state.sort];
      data = [...data].sort((a, b) => {
        const av = a[c.key], bv = b[c.key];
        if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * state.dir;
        return String(av || '').localeCompare(String(bv || '')) * state.dir;
      });
    }
    return data;
  }

  function render() {
    // update sort icons
    trh.querySelectorAll('th').forEach((th, idx) => {
      th.classList.remove('sort-asc', 'sort-desc');
      const ic = th.querySelector('.sort-icon');
      if (ic) ic.className = 'ri-arrow-up-down-line sort-icon';
      if (state.sort === idx) {
        th.classList.add(state.dir > 0 ? 'sort-asc' : 'sort-desc');
        ic.className = `ri-arrow-${state.dir > 0 ? 'up' : 'down'}-line sort-icon`;
      }
    });

    const filtered = getFiltered();
    const total = filtered.length;
    const pages = Math.max(1, Math.ceil(total / state.size));
    if (state.page >= pages) state.page = 0;
    const start = state.page * state.size;
    const slice = filtered.slice(start, start + state.size);

    tbody.innerHTML = '';
    slice.forEach(r => {
      const tr = U.el('tr');
      if (rowClass) {
        const cls = rowClass(r);
        if (cls) tr.className = cls;
      }
      cols.forEach(c => {
        const td = U.el('td');
        if (c.class) td.className = c.class;
        const val = c.render ? c.render(r) : r[c.key];
        if (val instanceof Node) td.appendChild(val);
        else td.innerHTML = val == null ? '' : val;
        tr.appendChild(td);
      });
      if (tooltip) U.bindRowTooltip(tr, () => tooltip(r));
      tbody.appendChild(tr);
    });
    if (!slice.length) {
      tbody.innerHTML = `<tr><td colspan="${cols.length}" class="center muted" style="padding:30px">Tidak ada data</td></tr>`;
    }
    footer.innerHTML = `
      <div>Menampilkan ${total ? start + 1 : 0}–${Math.min(start + state.size, total)} dari ${total}</div>
      <div class="pagination">
        <button ${state.page === 0 ? 'disabled' : ''} data-p="prev"><i class="ri-arrow-left-s-line"></i></button>
        ${Array.from({ length: pages }).map((_, i) => `<button class="${i === state.page ? 'active' : ''}" data-p="${i}">${i + 1}</button>`).join('')}
        <button ${state.page === pages - 1 ? 'disabled' : ''} data-p="next"><i class="ri-arrow-right-s-line"></i></button>
      </div>
    `;
    footer.querySelectorAll('button[data-p]').forEach(b => {
      b.addEventListener('click', () => {
        const p = b.getAttribute('data-p');
        if (p === 'prev') state.page = Math.max(0, state.page - 1);
        else if (p === 'next') state.page = Math.min(pages - 1, state.page + 1);
        else state.page = +p;
        render();
      });
    });
  }
  render();

  // expose global filter for navbar
  wrap.__applyGlobalFilter = (q) => {
    const input = header.querySelector('input');
    input.value = q; state.q = (q || '').toLowerCase(); state.page = 0; render();
  };
  return wrap;
};

/* ---------- Simple card stat ---------- */
U.kpi = (label, value, icon, opts = {}) => {
  const danger = opts.danger ? 'danger' : '';
  const alert = opts.alert ? `<span class="badge badge-danger badge-alert" style="margin-left:6px;vertical-align:middle"><i class="ri-alarm-warning-fill"></i> ALERT</span>` : '';
  const animate = opts.animate !== false;
  const el = U.el('div', { class: `kpi ${danger}` });
  el.innerHTML = `
    <div class="kpi-icon"><i class="ri-${icon}"></i></div>
    <div class="kpi-body">
      <div class="kpi-label">${label}</div>
      <div class="kpi-value"><span class="kpi-num">${animate ? '0' : value}</span>${alert}</div>
    </div>
  `;
  if (animate && opts.numeric != null) {
    const vEl = el.querySelector('.kpi-num');
    const fmt = opts.formatter || U.fmtNum;
    U.animateNum(vEl, opts.numeric, 1200, fmt);
  }
  return el;
};

/* ---------- Breadcrumb update ---------- */
U.setBreadcrumb = (group, page) => {
  const bc = document.getElementById('breadcrumb');
  bc.innerHTML = `<span>${group}</span><span class="sep">/</span><span class="current">${page}</span>`;
};
