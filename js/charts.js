/* ============================================================
   Chart.js helpers — global config + factory functions
   ============================================================ */

const CHART_COLORS = [
  '#07beb8', '#3dccc7', '#68d8d6', '#9ceaef',
  '#3b82f6', '#f59e0b', '#22c55e', '#ef4444',
  '#8b5cf6', '#f97316',
];

Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
Chart.defaults.font.size = 12;
Chart.defaults.color = '#4a5568';
Chart.defaults.plugins.legend.position = 'bottom';
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.boxWidth = 8;
Chart.defaults.plugins.legend.labels.padding = 14;
Chart.defaults.plugins.tooltip.backgroundColor = '#1a2332';
Chart.defaults.plugins.tooltip.titleColor = '#e8edf3';
Chart.defaults.plugins.tooltip.bodyColor = '#94a3b8';
Chart.defaults.plugins.tooltip.padding = 12;
Chart.defaults.plugins.tooltip.cornerRadius = 8;
Chart.defaults.plugins.tooltip.displayColors = true;
Chart.defaults.plugins.tooltip.boxPadding = 4;
Chart.defaults.animation.duration = 600;
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.responsive = true;

const C = { instances: [] };

C.register = (chart) => { C.instances.push(chart); return chart; };

C.applyTheme = (isDark) => {
  const txt = isDark ? '#e8edf3' : '#4a5568';
  const txtMuted = isDark ? '#94a3b8' : '#4a5568';
  const grid = isDark ? '#2a3a4f' : '#e2e8f0';
  Chart.defaults.color = txt;
  C.instances.forEach(ch => {
    if (!ch || !ch.options) return;
    if (ch.options.plugins?.legend?.labels) ch.options.plugins.legend.labels.color = txt;
    if (ch.options.scales) {
      for (const k in ch.options.scales) {
        const s = ch.options.scales[k];
        if (s?.ticks) s.ticks.color = txtMuted;
        if (s?.grid)  s.grid.color  = grid;
        if (s?.angleLines) s.angleLines.color = grid;
        if (s?.pointLabels) s.pointLabels.color = txtMuted;
      }
    }
    ch.update('none');
  });
};

/* ---------- Factories ---------- */

C.bar = (canvas, labels, data, opts = {}) => {
  const horizontal = !!opts.horizontal;
  return C.register(new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: opts.label || '',
        data,
        backgroundColor: opts.colors || CHART_COLORS,
        borderRadius: 6,
        maxBarThickness: 38,
      }],
    },
    options: {
      indexAxis: horizontal ? 'y' : 'x',
      plugins: {
        legend: { display: !!opts.showLegend },
        tooltip: { callbacks: opts.callbacks || {} },
      },
      scales: {
        x: { grid: { display: !horizontal, color: '#e2e8f0' }, ticks: { color: '#4a5568' } },
        y: { grid: { display: horizontal,  color: '#e2e8f0' }, ticks: { color: '#4a5568' }, beginAtZero: true },
      },
    },
  }));
};

C.grouped = (canvas, labels, datasets, opts = {}) => {
  return C.register(new Chart(canvas, {
    type: 'bar',
    data: { labels, datasets: datasets.map((d, i) => ({
      label: d.label, data: d.data,
      backgroundColor: d.color || CHART_COLORS[i % CHART_COLORS.length],
      borderRadius: 4, maxBarThickness: 24,
    })) },
    options: {
      plugins: { legend: { display: true } },
      scales: {
        x: { stacked: !!opts.stacked, grid: { display: false }, ticks: { color: '#4a5568' } },
        y: { stacked: !!opts.stacked, grid: { color: '#e2e8f0' }, ticks: { color: '#4a5568' }, beginAtZero: true },
      },
    },
  }));
};

C.doughnut = (canvas, labels, data, opts = {}) => {
  return C.register(new Chart(canvas, {
    type: opts.pie ? 'pie' : 'doughnut',
    data: {
      labels,
      datasets: [{
        data, backgroundColor: opts.colors || CHART_COLORS,
        borderWidth: 2, borderColor: opts.border || '#ffffff',
      }],
    },
    options: {
      cutout: opts.pie ? 0 : '60%',
      plugins: { legend: { position: opts.legend || 'bottom' } },
    },
  }));
};

C.line = (canvas, labels, datasets, opts = {}) => {
  return C.register(new Chart(canvas, {
    type: 'line',
    data: { labels, datasets: datasets.map((d, i) => ({
      label: d.label, data: d.data,
      borderColor: d.color || CHART_COLORS[i % CHART_COLORS.length],
      backgroundColor: d.color || CHART_COLORS[i % CHART_COLORS.length],
      fill: !!d.fill,
      tension: 0.35,
      pointRadius: 3, pointHoverRadius: 6,
      borderWidth: 2,
    })) },
    options: {
      plugins: { legend: { display: datasets.length > 1 } },
      scales: {
        x: { grid: { color: '#e2e8f0', display: false }, ticks: { color: '#4a5568' } },
        y: { grid: { color: '#e2e8f0' }, ticks: { color: '#4a5568' }, beginAtZero: opts.zero !== false },
      },
    },
  }));
};

C.radar = (canvas, labels, dataset) => {
  return C.register(new Chart(canvas, {
    type: 'radar',
    data: { labels, datasets: [{
      label: dataset.label, data: dataset.data,
      backgroundColor: 'rgba(7, 190, 184, 0.2)',
      borderColor: '#07beb8', borderWidth: 2,
      pointBackgroundColor: '#07beb8',
    }] },
    options: {
      scales: {
        r: { beginAtZero: true, suggestedMax: 5,
          grid: { color: '#e2e8f0' }, angleLines: { color: '#e2e8f0' },
          pointLabels: { color: '#4a5568', font: { size: 11 } },
          ticks: { backdropColor: 'transparent' },
        },
      },
      plugins: { legend: { display: false } },
    },
  }));
};
