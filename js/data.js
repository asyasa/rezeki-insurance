/* ============================================================
   PT Rezeki Assurance — Mock Data (client-side only)
   All tables below are hardcoded arrays that power the pages.
   ============================================================ */

const DATA = {};

/* ---------- Perusahaan / Entitas ---------- */
DATA.perusahaan = [
  { id: 'PRS-001', nama: 'PT Rezeki Assurance Tbk', jenis: 'Induk', npwp: '01.234.567.8-901.000', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', direktur: 'KAR-001', modal_dasar: 1_500_000_000_000, tanggal_berdiri: '1998-06-12', status: 'Aktif' },
  { id: 'PRS-002', nama: 'PT Rezeki Assurance Cabang Surabaya', jenis: 'Cabang', npwp: '01.234.567.8-601.000', kota: 'Surabaya', provinsi: 'Jawa Timur', direktur: 'KAR-004', modal_dasar: 250_000_000_000, tanggal_berdiri: '2005-03-21', status: 'Aktif' },
  { id: 'PRS-003', nama: 'PT Rezeki Assurance Cabang Medan', jenis: 'Cabang', npwp: '01.234.567.8-701.000', kota: 'Medan', provinsi: 'Sumatera Utara', direktur: 'KAR-003', modal_dasar: 180_000_000_000, tanggal_berdiri: '2008-11-04', status: 'Aktif' },
  { id: 'PRS-004', nama: 'PT Rezeki Assurance Cabang Bali', jenis: 'Cabang', npwp: '01.234.567.8-811.000', kota: 'Denpasar', provinsi: 'Bali', direktur: 'KAR-005', modal_dasar: 120_000_000_000, tanggal_berdiri: '2012-09-17', status: 'Aktif' },
];

/* ---------- Departemen ---------- */
DATA.departemen = [
  { id: 'DEP-001', kode: 'UND', nama: 'Underwriting & Aktuaria', kepala: 'KAR-002', jumlah_karyawan: 24, anggaran: 8_500_000_000, lokasi: 'Lantai 5' },
  { id: 'DEP-002', kode: 'KLM', nama: 'Klaim & Investigasi', kepala: 'KAR-003', jumlah_karyawan: 31, anggaran: 12_200_000_000, lokasi: 'Lantai 6' },
  { id: 'DEP-003', kode: 'SLS', nama: 'Sales & Marketing', kepala: 'KAR-004', jumlah_karyawan: 42, anggaran: 15_800_000_000, lokasi: 'Lantai 3' },
  { id: 'DEP-004', kode: 'KEU', nama: 'Keuangan & Akuntansi', kepala: 'KAR-005', jumlah_karyawan: 18, anggaran: 6_400_000_000, lokasi: 'Lantai 4' },
  { id: 'DEP-005', kode: 'TI',  nama: 'Teknologi Informasi', kepala: 'KAR-001', jumlah_karyawan: 22, anggaran: 9_900_000_000, lokasi: 'Lantai 2' },
  { id: 'DEP-006', kode: 'HUK', nama: 'Hukum & Kepatuhan', kepala: 'KAR-006', jumlah_karyawan: 9,  anggaran: 3_200_000_000, lokasi: 'Lantai 7' },
  { id: 'DEP-007', kode: 'RSK', nama: 'Manajemen Risiko', kepala: 'KAR-007', jumlah_karyawan: 7,  anggaran: 2_800_000_000, lokasi: 'Lantai 7' },
];

/* ---------- Karyawan ---------- */
DATA.karyawan = [
  { id: 'KAR-001', nik: '1001', nama: 'Rizal Fadhilah', dep: 'DEP-005', jabatan: 'Direktur TI', email: 'rizal.fadhilah@rezeki.co.id', no_hp: '0812-1000-0001', tanggal_masuk: '2012-04-01', gaji: 72_000_000, status: 'Tetap' },
  { id: 'KAR-002', nik: '1002', nama: 'Budi Santoso', dep: 'DEP-001', jabatan: 'Kepala Underwriting', email: 'budi.santoso@rezeki.co.id', no_hp: '0812-1000-0002', tanggal_masuk: '2014-08-12', gaji: 48_000_000, status: 'Tetap' },
  { id: 'KAR-003', nik: '1003', nama: 'Siti Rahayu', dep: 'DEP-002', jabatan: 'Kepala Klaim', email: 'siti.rahayu@rezeki.co.id', no_hp: '0812-1000-0003', tanggal_masuk: '2013-11-03', gaji: 49_500_000, status: 'Tetap' },
  { id: 'KAR-004', nik: '1004', nama: 'Agus Hermawan', dep: 'DEP-003', jabatan: 'Kepala Sales', email: 'agus.hermawan@rezeki.co.id', no_hp: '0812-1000-0004', tanggal_masuk: '2015-02-17', gaji: 47_000_000, status: 'Tetap' },
  { id: 'KAR-005', nik: '1005', nama: 'Fajar Nugroho', dep: 'DEP-004', jabatan: 'Kepala Keuangan', email: 'fajar.nugroho@rezeki.co.id', no_hp: '0812-1000-0005', tanggal_masuk: '2016-06-09', gaji: 46_500_000, status: 'Tetap' },
  { id: 'KAR-006', nik: '1006', nama: 'Anisa Putri', dep: 'DEP-006', jabatan: 'Kepala Hukum', email: 'anisa.putri@rezeki.co.id', no_hp: '0812-1000-0006', tanggal_masuk: '2017-09-22', gaji: 44_000_000, status: 'Tetap' },
  { id: 'KAR-007', nik: '1007', nama: 'Lestari Handayani', dep: 'DEP-007', jabatan: 'Kepala Risiko', email: 'lestari.h@rezeki.co.id', no_hp: '0812-1000-0007', tanggal_masuk: '2018-01-15', gaji: 43_500_000, status: 'Tetap' },
  { id: 'KAR-008', nik: '1008', nama: 'Dedi Kurniawan', dep: 'DEP-003', jabatan: 'Agen Senior',     email: 'dedi.k@rezeki.co.id',    no_hp: '0812-1000-0008', tanggal_masuk: '2019-03-04', gaji: 22_000_000, status: 'Tetap' },
  { id: 'KAR-009', nik: '1009', nama: 'Rina Maharani',  dep: 'DEP-003', jabatan: 'Agen Senior',     email: 'rina.m@rezeki.co.id',    no_hp: '0812-1000-0009', tanggal_masuk: '2019-05-18', gaji: 21_000_000, status: 'Tetap' },
  { id: 'KAR-010', nik: '1010', nama: 'Yusuf Maulana',  dep: 'DEP-003', jabatan: 'Agen',            email: 'yusuf.m@rezeki.co.id',   no_hp: '0812-1000-0010', tanggal_masuk: '2020-07-22', gaji: 18_000_000, status: 'Tetap' },
  { id: 'KAR-011', nik: '1011', nama: 'Dewi Anggraini', dep: 'DEP-003', jabatan: 'Agen',            email: 'dewi.a@rezeki.co.id',    no_hp: '0812-1000-0011', tanggal_masuk: '2021-01-11', gaji: 17_500_000, status: 'Tetap' },
  { id: 'KAR-012', nik: '1012', nama: 'Bayu Saputra',   dep: 'DEP-003', jabatan: 'Agen',            email: 'bayu.s@rezeki.co.id',    no_hp: '0812-1000-0012', tanggal_masuk: '2021-04-05', gaji: 17_000_000, status: 'Tetap' },
  { id: 'KAR-013', nik: '1013', nama: 'Maya Permata',   dep: 'DEP-003', jabatan: 'Agen',            email: 'maya.p@rezeki.co.id',    no_hp: '0812-1000-0013', tanggal_masuk: '2022-02-20', gaji: 15_500_000, status: 'Kontrak' },
];

/* ---------- Agen ---------- */
DATA.agen = [
  { id: 'AGN-001', kode: 'AG-001', id_karyawan: 'KAR-008', lisensi_ojk: 'OJK-AAJI-2020-0001', expired: '2025-03-01', target_bulanan: 150_000_000, polis_aktif: 22, rating: 'A+', wilayah: 'Jakarta Selatan' },
  { id: 'AGN-002', kode: 'AG-002', id_karyawan: 'KAR-009', lisensi_ojk: 'OJK-AAJI-2020-0002', expired: '2025-06-10', target_bulanan: 140_000_000, polis_aktif: 19, rating: 'A',  wilayah: 'Jakarta Pusat' },
  { id: 'AGN-003', kode: 'AG-003', id_karyawan: 'KAR-010', lisensi_ojk: 'OJK-AAJI-2021-0018', expired: '2024-12-12', target_bulanan: 110_000_000, polis_aktif: 14, rating: 'A',  wilayah: 'Surabaya' },
  { id: 'AGN-004', kode: 'AG-004', id_karyawan: 'KAR-011', lisensi_ojk: 'OJK-AAJI-2021-0025', expired: '2025-01-18', target_bulanan: 100_000_000, polis_aktif: 11, rating: 'B+', wilayah: 'Bandung' },
  { id: 'AGN-005', kode: 'AG-005', id_karyawan: 'KAR-012', lisensi_ojk: 'OJK-AAJI-2022-0007', expired: '2024-08-30', target_bulanan:  90_000_000, polis_aktif:  8, rating: 'B+', wilayah: 'Medan' },
  { id: 'AGN-006', kode: 'AG-006', id_karyawan: 'KAR-013', lisensi_ojk: 'OJK-AAJI-2023-0003', expired: '2025-11-03', target_bulanan:  80_000_000, polis_aktif:  6, rating: 'B',  wilayah: 'Denpasar' },
];

/* ---------- Produk Asuransi ---------- */
DATA.produk = [
  { id: 'PRD-001', kode: 'KEND-STD', nama: 'Kendaraan Standard', kategori: 'Kendaraan', premi_min: 2_500_000, premi_max: 18_000_000, masa: '12 bulan', loading: 2.5, ojk: true, launch: '2018-04-01', manfaat: ['All Risk', 'TLO', 'Pihak Ketiga'] },
  { id: 'PRD-002', kode: 'KEND-PRM', nama: 'Kendaraan Premium',  kategori: 'Kendaraan', premi_min: 8_000_000, premi_max: 42_000_000, masa: '12 bulan', loading: 3.0, ojk: true, launch: '2019-07-15', manfaat: ['All Risk', 'Ekstensi Bencana', 'Mobil Pengganti'] },
  { id: 'PRD-003', kode: 'KSH-FAM',  nama: 'Kesehatan Keluarga', kategori: 'Kesehatan', premi_min: 6_500_000, premi_max: 55_000_000, masa: '12 bulan', loading: 4.0, ojk: true, launch: '2017-01-20', manfaat: ['Rawat Inap', 'Rawat Jalan', 'Melahirkan'] },
  { id: 'PRD-004', kode: 'KSH-EXE',  nama: 'Kesehatan Eksekutif', kategori: 'Kesehatan', premi_min: 15_000_000, premi_max: 120_000_000, masa: '12 bulan', loading: 5.0, ojk: true, launch: '2020-02-10', manfaat: ['Rawat Inap VIP', 'Medical Evacuation', 'Critical Illness'] },
  { id: 'PRD-005', kode: 'PROP-RES', nama: 'Properti Residensial', kategori: 'Properti', premi_min: 3_200_000, premi_max: 28_000_000, masa: '12 bulan', loading: 2.0, ojk: true, launch: '2016-08-05', manfaat: ['Kebakaran', 'Gempa Bumi', 'Banjir'] },
  { id: 'PRD-006', kode: 'BIS-UMK',  nama: 'Bisnis UMKM',         kategori: 'Bisnis',    premi_min: 4_800_000, premi_max: 35_000_000, masa: '12 bulan', loading: 2.8, ojk: true, launch: '2019-11-11', manfaat: ['Gangguan Usaha', 'Kebakaran', 'Pencurian'] },
  { id: 'PRD-007', kode: 'KORP-ALL', nama: 'Korporat All-in-One', kategori: 'Korporat',   premi_min: 180_000_000, premi_max: 2_500_000_000, masa: '12 bulan', loading: 3.5, ojk: true, launch: '2015-05-12', manfaat: ['Property', 'Liability', 'D&O', 'Cyber'] },
];

/* ---------- Nasabah ---------- */
DATA.nasabah = [
  { id: 'NSB-001', nama: 'Arief Wicaksono', tipe: 'Individu',   nik_npwp: '3174...0012', kota: 'Jakarta Selatan', provinsi: 'DKI Jakarta', pekerjaan: 'Konsultan', sumber: 'Referral Agen', id_agen: 'AGN-001', no_hp: '0812-2000-0001', email: 'arief.w@mail.com', tanggal_lahir: '1981-03-14' },
  { id: 'NSB-002', nama: 'Dian Permatasari', tipe: 'Individu',  nik_npwp: '3173...0145', kota: 'Jakarta Pusat',   provinsi: 'DKI Jakarta', pekerjaan: 'Dokter',     sumber: 'Website',        id_agen: 'AGN-002', no_hp: '0812-2000-0002', email: 'dian.p@mail.com',  tanggal_lahir: '1987-07-22' },
  { id: 'NSB-003', nama: 'PT Mitra Sejahtera', tipe: 'Perusahaan', nik_npwp: '01.111.222.3-451.000', kota: 'Tangerang', provinsi: 'Banten', pekerjaan: 'Distributor', sumber: 'Corporate Acc.', id_agen: 'AGN-001', no_hp: '021-5500-1122', email: 'corp@mitrasejahtera.id', tanggal_lahir: '2008-01-12' },
  { id: 'NSB-004', nama: 'Hendra Gunawan',   tipe: 'Individu',  nik_npwp: '3578...0067', kota: 'Surabaya',        provinsi: 'Jawa Timur',  pekerjaan: 'Pengusaha',   sumber: 'Pameran',        id_agen: 'AGN-003', no_hp: '0812-2000-0004', email: 'hendra.g@mail.com', tanggal_lahir: '1975-11-30' },
  { id: 'NSB-005', nama: 'Sari Widyastuti', tipe: 'Individu',   nik_npwp: '3273...0081', kota: 'Bandung',         provinsi: 'Jawa Barat',  pekerjaan: 'Arsitek',     sumber: 'Referral',       id_agen: 'AGN-004', no_hp: '0812-2000-0005', email: 'sari.w@mail.com',   tanggal_lahir: '1990-02-05' },
  { id: 'NSB-006', nama: 'PT Sinar Baru',    tipe: 'Perusahaan', nik_npwp: '02.345.678.9-012.000', kota: 'Medan',   provinsi: 'Sumut',       pekerjaan: 'Manufaktur',  sumber: 'Telemarketing',  id_agen: 'AGN-005', no_hp: '061-8844-2211', email: 'admin@sinarbaru.co.id', tanggal_lahir: '2011-05-19' },
  { id: 'NSB-007', nama: 'I Made Suartha',  tipe: 'Individu',   nik_npwp: '5171...0033', kota: 'Denpasar',        provinsi: 'Bali',         pekerjaan: 'Hotelier',    sumber: 'Referral',       id_agen: 'AGN-006', no_hp: '0812-2000-0007', email: 'made.s@mail.com',   tanggal_lahir: '1983-09-09' },
  { id: 'NSB-008', nama: 'PT Global Prima',  tipe: 'Perusahaan', nik_npwp: '03.456.789.0-123.000', kota: 'Jakarta Barat', provinsi: 'DKI Jakarta', pekerjaan: 'Logistik',  sumber: 'Corporate Acc.', id_agen: 'AGN-002', no_hp: '021-5566-7788', email: 'corp@globalprima.co.id', tanggal_lahir: '2005-12-01' },
];

/* ---------- Polis Master ---------- */
DATA.polis = [
  { nomor: 'POL-2024-0001', id_nasabah: 'NSB-001', id_produk: 'PRD-002', id_agen: 'AGN-001', periode: '2024-01-15 s/d 2025-01-14', nilai_pertanggungan: 850_000_000, premi_tahunan: 24_500_000, status: 'Aktif', terbit: '2024-01-10' },
  { nomor: 'POL-2024-0002', id_nasabah: 'NSB-002', id_produk: 'PRD-003', id_agen: 'AGN-002', periode: '2024-02-01 s/d 2025-01-31', nilai_pertanggungan: 500_000_000, premi_tahunan: 18_200_000, status: 'Aktif', terbit: '2024-01-28' },
  { nomor: 'POL-2024-0003', id_nasabah: 'NSB-003', id_produk: 'PRD-007', id_agen: 'AGN-001', periode: '2024-01-01 s/d 2024-12-31', nilai_pertanggungan: 25_000_000_000, premi_tahunan: 520_000_000, status: 'Aktif', terbit: '2023-12-18' },
  { nomor: 'POL-2024-0004', id_nasabah: 'NSB-004', id_produk: 'PRD-005', id_agen: 'AGN-003', periode: '2024-03-10 s/d 2025-03-09', nilai_pertanggungan: 3_500_000_000, premi_tahunan: 45_000_000, status: 'Aktif', terbit: '2024-03-05' },
  { nomor: 'POL-2024-0005', id_nasabah: 'NSB-005', id_produk: 'PRD-001', id_agen: 'AGN-004', periode: '2024-02-20 s/d 2025-02-19', nilai_pertanggungan: 320_000_000, premi_tahunan: 7_800_000, status: 'Aktif', terbit: '2024-02-15' },
  { nomor: 'POL-2024-0006', id_nasabah: 'NSB-006', id_produk: 'PRD-006', id_agen: 'AGN-005', periode: '2024-01-05 s/d 2024-12-31', nilai_pertanggungan: 1_200_000_000, premi_tahunan: 28_500_000, status: 'Aktif', terbit: '2024-01-03' },
  { nomor: 'POL-2024-0007', id_nasabah: 'NSB-008', id_produk: 'PRD-007', id_agen: 'AGN-002', periode: '2024-04-01 s/d 2025-03-31', nilai_pertanggungan: 18_000_000_000, premi_tahunan: 395_000_000, status: 'Aktif', terbit: '2024-03-27' },
];

/* ---------- Polis Kendaraan ---------- */
DATA.polis_kendaraan = [
  { nomor: 'POL-2024-0001', kategori: 'Mobil', merk: 'Toyota', tipe: 'Land Cruiser 300', tahun: 2022, plat: 'B 1234 XY',  jenis: 'All Risk',    nilai: 850_000_000, workshop: 'Auto2000 Pondok Indah' },
  { nomor: 'POL-2024-0005', kategori: 'Mobil', merk: 'Honda',  tipe: 'CR-V Turbo',       tahun: 2021, plat: 'D 5678 AB',  jenis: 'All Risk',    nilai: 320_000_000, workshop: 'Honda Pasteur' },
  { nomor: 'POL-2024-0010', kategori: 'Motor', merk: 'Yamaha', tipe: 'NMAX 155',         tahun: 2023, plat: 'B 4422 KLM', jenis: 'TLO',         nilai:  32_000_000, workshop: 'Yamaha Sentral Motor' },
];

/* ---------- Polis Kesehatan ---------- */
DATA.polis_kesehatan = [
  { nomor: 'POL-2024-0002', nama_tertanggung: 'Dian Permatasari', gender: 'F', tanggal_lahir: '1987-07-22', plan_inap: 'Executive',   limit: 500_000_000, dikecualikan: 'Kongenital', rs_rekanan: 'RS Pondok Indah, Siloam Kebon Jeruk' },
  { nomor: 'POL-2024-0002b', nama_tertanggung: 'Rahmat Permata', gender: 'M', tanggal_lahir: '2015-04-11', plan_inap: 'Executive', limit: 300_000_000, dikecualikan: 'Tidak ada', rs_rekanan: 'RS Pondok Indah, Siloam Kebon Jeruk' },
  { nomor: 'POL-2024-0011', nama_tertanggung: 'Sari Widyastuti', gender: 'F', tanggal_lahir: '1990-02-05', plan_inap: 'Premium', limit: 250_000_000, dikecualikan: 'Estetika', rs_rekanan: 'RS Hermina Pasteur' },
];

/* ---------- Polis Properti ---------- */
DATA.polis_properti = [
  { nomor: 'POL-2024-0004', jenis: 'Rumah Tinggal', alamat: 'Jl. Darmo Indah 45, Surabaya', luas: 450, nilai_bangunan: 2_800_000_000, nilai_isi: 700_000_000, konstruksi: 'Beton Kelas A', sertifikat: 'SHM', risiko_banjir: 'Rendah' },
  { nomor: 'POL-2024-0012', jenis: 'Ruko', alamat: 'Jl. Gatot Subroto 12, Medan', luas: 180, nilai_bangunan: 1_500_000_000, nilai_isi: 300_000_000, konstruksi: 'Beton Kelas A', sertifikat: 'SHGB', risiko_banjir: 'Menengah' },
];

/* ---------- Polis Bisnis ---------- */
DATA.polis_bisnis = [
  { nomor: 'POL-2024-0006', nama_usaha: 'Pabrik Kemasan Sinar Baru', jenis: 'Manufaktur', omzet: 12_000_000_000, karyawan: 85, aset_usaha: 4_500_000_000, jenis_risiko: 'Kebakaran / Gangguan Usaha', limit_gangguan: 1_500_000_000 },
  { nomor: 'POL-2024-0013', nama_usaha: 'Resto Nusantara',           jenis: 'F&B',        omzet:  2_800_000_000, karyawan: 18, aset_usaha:   650_000_000, jenis_risiko: 'Kebakaran / Pencurian',     limit_gangguan:   300_000_000 },
];

/* ---------- Polis Korporat ---------- */
DATA.polis_korporat = [
  { nomor: 'POL-2024-0003', nama_perusahaan: 'PT Mitra Sejahtera', domain: 'mitrasejahtera.id', sektor: 'Distribusi FMCG', karyawan: 420, total_aset: 180_000_000_000, jenis_pertanggungan: 'Property, Liability, D&O', account_manager: 'KAR-008' },
  { nomor: 'POL-2024-0007', nama_perusahaan: 'PT Global Prima',    domain: 'globalprima.co.id', sektor: 'Logistik',        karyawan: 680, total_aset: 240_000_000_000, jenis_pertanggungan: 'Property, Cargo, Cyber',   account_manager: 'KAR-009' },
];

/* ---------- Klaim ---------- */
DATA.klaim = [
  { nomor: 'KLM-2024-0001', polis: 'POL-2024-0001', id_nasabah: 'NSB-001', jenis: 'Kendaraan - Tabrakan', tanggal_kejadian: '2024-02-15', tanggal_lapor: '2024-02-16', tanggal_selesai: '2024-03-10', estimasi: 180_000_000, disetujui: 155_000_000, status: 'Selesai',  investigator: 'KAR-003', deskripsi: 'Tabrakan di ruas tol Jagorawi KM 12, klaim disetujui sebagian.' },
  { nomor: 'KLM-2024-0002', polis: 'POL-2024-0002', id_nasabah: 'NSB-002', jenis: 'Kesehatan - Rawat Inap', tanggal_kejadian: '2024-03-02', tanggal_lapor: '2024-03-03', tanggal_selesai: null,         estimasi:  45_000_000, disetujui: 0,           status: 'Proses',   investigator: 'KAR-003', deskripsi: 'Rawat inap RS Pondok Indah, dokumen pelengkap sedang diverifikasi.' },
  { nomor: 'KLM-2024-0003', polis: 'POL-2024-0004', id_nasabah: 'NSB-004', jenis: 'Properti - Banjir',     tanggal_kejadian: '2024-01-28', tanggal_lapor: '2024-01-29', tanggal_selesai: '2024-02-25', estimasi: 240_000_000, disetujui: 0,           status: 'Ditolak',  investigator: 'KAR-003', deskripsi: 'Banjir Surabaya; Polis tidak mencakup risiko banjir pada lokasi tersebut.' },
  { nomor: 'KLM-2024-0004', polis: 'POL-2024-0006', id_nasabah: 'NSB-006', jenis: 'Bisnis - Gangguan Usaha', tanggal_kejadian: '2024-03-18', tanggal_lapor: '2024-03-19', tanggal_selesai: null,       estimasi: 950_000_000, disetujui: 0,           status: 'Proses',   investigator: 'KAR-003', deskripsi: 'Kebakaran minor di gudang, investigasi lapangan berjalan.' },
  { nomor: 'KLM-2024-0005', polis: 'POL-2024-0005', id_nasabah: 'NSB-005', jenis: 'Kendaraan - Pencurian',  tanggal_kejadian: '2024-03-22', tanggal_lapor: '2024-03-23', tanggal_selesai: '2024-04-15', estimasi: 280_000_000, disetujui: 230_000_000, status: 'Selesai',  investigator: 'KAR-003', deskripsi: 'Pencurian kendaraan Honda CR-V di area parkir kantor.' },
  { nomor: 'KLM-2024-0006', polis: 'POL-2024-0007', id_nasabah: 'NSB-008', jenis: 'Korporat - Cyber',      tanggal_kejadian: '2024-04-02', tanggal_lapor: '2024-04-03', tanggal_selesai: '2024-04-20', estimasi: 1_200_000_000, disetujui: 950_000_000, status: 'Selesai',  investigator: 'KAR-003', deskripsi: 'Insiden ransomware pada server logistik, pemulihan data & biaya IR.' },
];

/* ---------- Penyaluran Dana ---------- */
DATA.penyaluran = [
  { id: 'PNY-001', klaim: 'KLM-2024-0001', id_nasabah: 'NSB-001', tanggal: '2024-03-11', metode: 'Transfer Bank',      bank: 'BCA',   jumlah: 155_000_000, status: 'Selesai' },
  { id: 'PNY-002', klaim: 'KLM-2024-0005', id_nasabah: 'NSB-005', tanggal: '2024-04-16', metode: 'Transfer Bank',      bank: 'Mandiri', jumlah: 230_000_000, status: 'Selesai' },
  { id: 'PNY-003', klaim: 'KLM-2024-0006', id_nasabah: 'NSB-008', tanggal: '2024-04-21', metode: 'RTGS',               bank: 'BCA',   jumlah: 950_000_000, status: 'Selesai' },
  { id: 'PNY-004', klaim: 'KLM-2024-0002', id_nasabah: 'NSB-002', tanggal: '2024-04-02', metode: 'Direct RS',          bank: 'RS Pondok Indah', jumlah: 22_500_000, status: 'Parsial' },
];

/* ---------- Pengambilan Dana (anomali flagged) ---------- */
DATA.pengambilan = [
  { id: 'PGM-001', tanggal: '2024-01-12', jenis: 'Cadangan Klaim',  jumlah: 2_500_000_000, bank_sumber: 'BCA 0011', tujuan: 'Cadangan teknis 2024', otorisasi: 'Direktur',   status: 'Disetujui', anomali: false },
  { id: 'PGM-002', tanggal: '2024-02-05', jenis: 'Biaya Operasional', jumlah: 450_000_000, bank_sumber: 'Mandiri 0022', tujuan: 'Opex Februari',      otorisasi: 'Manager',    status: 'Disetujui', anomali: false },
  { id: 'PGM-003', tanggal: '2024-03-18', jenis: 'Investasi',       jumlah: 1_800_000_000, bank_sumber: 'BNI 0033',  tujuan: 'Penempatan deposito',  otorisasi: 'Direktur',   status: 'Disetujui', anomali: false },
  { id: 'PGM-004', tanggal: '2024-04-03', jenis: 'Lain-lain',       jumlah: 3_250_000_000, bank_sumber: 'BCA 0011', tujuan: 'Transfer ke rekening pribadi (?)', otorisasi: 'Staff',      status: 'Ditahan',   anomali: true, anomali_id: 'ANM-003' },
];

/* ---------- Tagihan ---------- */
DATA.tagihan = [
  { invoice: 'INV-2024-0001', polis: 'POL-2024-0001', periode: 'Jan 2024', total_premi: 24_500_000, ppn:  2_695_000, admin: 100_000, total: 27_295_000, status: 'Lunas' },
  { invoice: 'INV-2024-0002', polis: 'POL-2024-0002', periode: 'Feb 2024', total_premi: 18_200_000, ppn:  2_002_000, admin: 100_000, total: 20_302_000, status: 'Lunas' },
  { invoice: 'INV-2024-0003', polis: 'POL-2024-0003', periode: 'Q1 2024',  total_premi: 130_000_000, ppn: 14_300_000, admin: 250_000, total: 144_550_000, status: 'Lunas' },
  { invoice: 'INV-2024-0004', polis: 'POL-2024-0004', periode: 'Mar 2024', total_premi: 45_000_000, ppn:  4_950_000, admin: 100_000, total: 50_050_000, status: 'Lunas' },
  { invoice: 'INV-2024-0005', polis: 'POL-2024-0005', periode: 'Feb 2024', total_premi:  7_800_000, ppn:    858_000, admin: 100_000, total:  8_758_000, status: 'Lunas' },
  { invoice: 'INV-2024-0006', polis: 'POL-2024-0006', periode: 'Jan 2024', total_premi: 28_500_000, ppn:  3_135_000, admin: 100_000, total: 31_735_000, status: 'Tertunggak' },
  { invoice: 'INV-2024-0007', polis: 'POL-2024-0007', periode: 'Apr 2024', total_premi: 98_750_000, ppn: 10_862_500, admin: 200_000, total: 109_812_500, status: 'Outstanding' },
];

DATA.pembayaran = [
  { polis: 'POL-2024-0001', tanggal: '2024-01-12', jumlah: 27_295_000, metode: 'Transfer Bank',   bank: 'BCA',     ref: 'TRX-001', status: 'Sukses', denda: 0 },
  { polis: 'POL-2024-0002', tanggal: '2024-01-29', jumlah: 20_302_000, metode: 'Virtual Account', bank: 'BCA',     ref: 'TRX-002', status: 'Sukses', denda: 0 },
  { polis: 'POL-2024-0003', tanggal: '2023-12-20', jumlah: 144_550_000, metode: 'RTGS',           bank: 'Mandiri', ref: 'TRX-003', status: 'Sukses', denda: 0 },
  { polis: 'POL-2024-0004', tanggal: '2024-03-06', jumlah: 50_050_000, metode: 'Transfer Bank',   bank: 'Mandiri', ref: 'TRX-004', status: 'Sukses', denda: 0 },
  { polis: 'POL-2024-0005', tanggal: '2024-02-18', jumlah: 8_758_000,  metode: 'Virtual Account', bank: 'BCA',     ref: 'TRX-005', status: 'Sukses', denda: 0 },
  { polis: 'POL-2024-0006', tanggal: '2024-02-10', jumlah: 31_735_000, metode: 'Transfer Bank',   bank: 'BNI',     ref: 'TRX-006', status: 'Terlambat', denda: 150_000 },
];

/* ---------- Uang Masuk ---------- */
DATA.uang_masuk = [
  { id: 'UMK-001', tanggal: '2024-01-12', jenis: 'Premi',        referensi: 'INV-2024-0001', jumlah: 27_295_000, bank: 'BCA',     keterangan: 'Pembayaran polis Arief W.',          pencatat: 'KAR-005', anomali: false },
  { id: 'UMK-002', tanggal: '2024-01-29', jenis: 'Premi',        referensi: 'INV-2024-0002', jumlah: 20_302_000, bank: 'BCA',     keterangan: 'Pembayaran polis Dian P.',           pencatat: 'KAR-005', anomali: false },
  { id: 'UMK-003', tanggal: '2023-12-20', jenis: 'Premi',        referensi: 'INV-2024-0003', jumlah: 144_550_000, bank: 'Mandiri', keterangan: 'Pembayaran polis Mitra Sejahtera',  pencatat: 'KAR-005', anomali: false },
  { id: 'UMK-004', tanggal: '2024-02-18', jenis: 'Premi',        referensi: 'INV-2024-0005', jumlah: 8_758_000,  bank: 'BCA',     keterangan: 'Pembayaran polis Sari W.',           pencatat: 'KAR-005', anomali: false },
  { id: 'UMK-005', tanggal: '2024-03-06', jenis: 'Premi',        referensi: 'INV-2024-0004', jumlah: 50_050_000, bank: 'Mandiri', keterangan: 'Pembayaran polis Hendra G.',          pencatat: 'KAR-005', anomali: false },
  { id: 'UMK-006', tanggal: '2024-03-15', jenis: 'Investasi',    referensi: 'INV-INV-001',   jumlah: 320_000_000, bank: 'BNI',     keterangan: 'Return deposito Q1',                 pencatat: 'KAR-005', anomali: false },
  { id: 'UMK-007', tanggal: '2024-03-29', jenis: 'Lain-lain',    referensi: '-',             jumlah: 780_000_000, bank: 'BCA',     keterangan: 'Transfer tanpa referensi invoice (?)', pencatat: 'KAR-005', anomali: true, anomali_id: 'ANM-002' },
  { id: 'UMK-008', tanggal: '2024-04-05', jenis: 'Premi',        referensi: 'INV-2024-0007', jumlah: 109_812_500, bank: 'Mandiri', keterangan: 'Pembayaran polis Global Prima (parsial)', pencatat: 'KAR-005', anomali: false },
];

/* ---------- Uang Keluar ---------- */
DATA.uang_keluar = [
  { id: 'UKL-001', tanggal: '2024-01-15', jenis: 'Penyaluran Klaim',  referensi: 'KLM-2024-0001', jumlah: 155_000_000, bank: 'BCA',     keterangan: 'Penyaluran klaim Arief W.',              pencatat: 'KAR-005', anomali: false },
  { id: 'UKL-002', tanggal: '2024-02-05', jenis: 'Opex',              referensi: 'PGM-002',       jumlah: 450_000_000, bank: 'Mandiri', keterangan: 'Biaya operasional Februari',             pencatat: 'KAR-005', anomali: false },
  { id: 'UKL-003', tanggal: '2024-02-28', jenis: 'Komisi Agen',       referensi: 'KOM-Q1',        jumlah: 85_000_000,  bank: 'BCA',     keterangan: 'Pembayaran komisi agen Q1',              pencatat: 'KAR-005', anomali: false },
  { id: 'UKL-004', tanggal: '2024-03-18', jenis: 'Penempatan',        referensi: 'PGM-003',       jumlah: 1_800_000_000, bank: 'BNI',   keterangan: 'Penempatan deposito jangka panjang',     pencatat: 'KAR-005', anomali: false },
  { id: 'UKL-005', tanggal: '2024-04-16', jenis: 'Penyaluran Klaim',  referensi: 'KLM-2024-0005', jumlah: 230_000_000, bank: 'Mandiri', keterangan: 'Penyaluran klaim Sari W.',               pencatat: 'KAR-005', anomali: false },
  { id: 'UKL-006', tanggal: '2024-04-03', jenis: 'Lain-lain',         referensi: 'PGM-004',       jumlah: 3_250_000_000, bank: 'BCA',   keterangan: 'Pengambilan tanpa otorisasi lengkap (?)', pencatat: 'KAR-005', anomali: true, anomali_id: 'ANM-003' },
  { id: 'UKL-007', tanggal: '2024-04-21', jenis: 'Penyaluran Klaim',  referensi: 'KLM-2024-0006', jumlah: 950_000_000, bank: 'BCA',     keterangan: 'Penyaluran klaim Global Prima',          pencatat: 'KAR-005', anomali: false },
];

/* ---------- Alokasi Dana ---------- */
DATA.alokasi = [
  { id: 'ALK-001', periode: '2024', produk: 'Semua', jenis: 'Cadangan Klaim',  dialokasikan: 4_500_000_000_000, terpakai: 2_800_000_000_000, pct_premi: 36 },
  { id: 'ALK-002', periode: '2024', produk: 'Semua', jenis: 'Biaya Akuisisi',  dialokasikan: 1_200_000_000_000, terpakai:   780_000_000_000, pct_premi: 9.7 },
  { id: 'ALK-003', periode: '2024', produk: 'Semua', jenis: 'Re-asuransi',     dialokasikan: 1_800_000_000_000, terpakai: 1_500_000_000_000, pct_premi: 14.6 },
  { id: 'ALK-004', periode: '2024', produk: 'Semua', jenis: 'Investasi',       dialokasikan: 3_500_000_000_000, terpakai: 3_200_000_000_000, pct_premi: 28.4 },
  { id: 'ALK-005', periode: '2024', produk: 'Semua', jenis: 'Opex & Admin',    dialokasikan: 1_300_000_000_000, terpakai:   920_000_000_000, pct_premi: 10.6 },
];

/* ---------- Leads ---------- */
DATA.leads = [
  { id: 'LDS-001', nama: 'Andika Rahmadhan', tipe: 'Individu',  produk: 'Kesehatan Keluarga',  estimasi_premi: 12_000_000, id_agen: 'AGN-001', followup: '2024-04-18', tahap: 'Hot' },
  { id: 'LDS-002', nama: 'Lestari Amanda',   tipe: 'Individu',  produk: 'Kendaraan Premium',   estimasi_premi:  8_500_000, id_agen: 'AGN-002', followup: '2024-04-17', tahap: 'Hot' },
  { id: 'LDS-003', nama: 'PT Sari Kencana', tipe: 'Perusahaan', produk: 'Bisnis UMKM',          estimasi_premi: 45_000_000, id_agen: 'AGN-003', followup: '2024-04-16', tahap: 'Warm' },
  { id: 'LDS-004', nama: 'Rio Pratama',      tipe: 'Individu',  produk: 'Kendaraan Standard',  estimasi_premi:  4_200_000, id_agen: 'AGN-004', followup: '2024-04-15', tahap: 'Warm' },
  { id: 'LDS-005', nama: 'Nurul Aini',       tipe: 'Individu',  produk: 'Kesehatan Keluarga',  estimasi_premi:  9_800_000, id_agen: 'AGN-005', followup: '2024-04-10', tahap: 'Cold' },
  { id: 'LDS-006', nama: 'PT Bali Sukses',  tipe: 'Perusahaan', produk: 'Property',             estimasi_premi: 68_000_000, id_agen: 'AGN-006', followup: '2024-04-12', tahap: 'Cold' },
  { id: 'LDS-007', nama: 'Taufik Hidayat',   tipe: 'Individu',  produk: 'Kesehatan Eksekutif', estimasi_premi: 22_000_000, id_agen: 'AGN-001', followup: '2024-04-19', tahap: 'Hot' },
  { id: 'LDS-008', nama: 'Ratna Sari',       tipe: 'Individu',  produk: 'Kendaraan Standard',  estimasi_premi:  5_100_000, id_agen: 'AGN-002', followup: '2024-04-14', tahap: 'Warm' },
];

/* ---------- Target Sales ---------- */
DATA.target_sales = DATA.agen.map((a, i) => {
  const target = a.target_bulanan * 3; /* Q1 target */
  const pct = [118, 96, 87, 72, 63, 105][i];
  return { id: `TRG-${a.kode}`, id_agen: a.id, periode: 'Q1 2024', target, realisasi: Math.round(target * pct / 100), pct, status: pct >= 100 ? 'Tercapai' : pct >= 80 ? 'Mendekati' : 'Tertinggal' };
});

/* ---------- Monitoring Sales (30 days) ---------- */
DATA.monitoring_sales = (() => {
  const out = [];
  const agens = DATA.agen.map(a => a.id);
  const start = new Date('2024-04-01');
  for (let d = 0; d < 30; d++) {
    for (let ai = 0; ai < agens.length; ai++) {
      const dt = new Date(start); dt.setDate(start.getDate() + d);
      const seed = (d * 7 + ai * 3) % 11;
      const closings = Math.max(0, seed - 6);
      out.push({
        tanggal: dt.toISOString().slice(0, 10),
        id_agen: agens[ai],
        call: (seed * 2 + ai) % 15,
        meeting: (seed + ai) % 6,
        presentasi: (seed + ai * 2) % 4,
        closing: closings,
        nilai_closing: closings * 18_000_000 + (seed * 1_500_000),
        leads_baru: (seed + ai * 3) % 7,
        catatan: closings > 0 ? 'Closing polis ' + ['Kendaraan', 'Kesehatan', 'Properti'][seed % 3] : '—',
      });
    }
  }
  return out;
})();

/* ---------- Komisi Agen ---------- */
DATA.komisi = DATA.polis.map((p, i) => {
  const persen = [18, 15, 8, 12, 16, 10, 8][i] || 10;
  const jumlah = Math.round(p.premi_tahunan * persen / 100);
  const pph = Math.round(jumlah * 0.05);
  return { id_agen: p.id_agen, id_polis: p.nomor, periode: 'Q1 2024', jenis: i % 2 ? 'Tahun Pertama' : 'Renewal', persen, nilai_premi: p.premi_tahunan, komisi: jumlah, pph21: pph, bersih: jumlah - pph, status: i < 5 ? 'Dibayar' : 'Proses', tanggal_bayar: i < 5 ? '2024-04-05' : null };
});

/* ---------- Rumah Sakit ---------- */
DATA.rumah_sakit = [
  { id: 'RS-001', nama: 'RS Pondok Indah', tipe: 'Swasta',     kota: 'Jakarta Selatan', akreditasi: 'Paripurna', kapasitas: 320, status: 'Aktif',   pic: 'dr. Andi Wijaya', alamat: 'Jl. Metro Duta Kav UE, Pondok Indah', telp: '021-7657525', pks: 'PKS-RS-001' },
  { id: 'RS-002', nama: 'RS Siloam Kebon Jeruk', tipe: 'Swasta', kota: 'Jakarta Barat',  akreditasi: 'Paripurna', kapasitas: 280, status: 'Aktif',   pic: 'dr. Rina Saputra', alamat: 'Jl. Perjuangan Kav 8', telp: '021-25677888', pks: 'PKS-RS-002' },
  { id: 'RS-003', nama: 'RSUP Hasan Sadikin', tipe: 'Pemerintah', kota: 'Bandung',       akreditasi: 'Paripurna', kapasitas: 450, status: 'Aktif',   pic: 'dr. Maman Suherman', alamat: 'Jl. Pasteur 38', telp: '022-2034953', pks: 'PKS-RS-003' },
  { id: 'RS-004', nama: 'RS Hermina Pasteur', tipe: 'Swasta',    kota: 'Bandung',        akreditasi: 'Utama',     kapasitas: 210, status: 'Aktif',   pic: 'dr. Lina Kartika', alamat: 'Jl. Terusan Pasteur', telp: '022-6080505', pks: 'PKS-RS-004' },
  { id: 'RS-005', nama: 'RS Mitra Keluarga Surabaya', tipe: 'Swasta', kota: 'Surabaya',   akreditasi: 'Paripurna', kapasitas: 240, status: 'Aktif',   pic: 'dr. Heri Nugraha', alamat: 'Jl. Satelit Indah II', telp: '031-7345333', pks: 'PKS-RS-005' },
  { id: 'RS-006', nama: 'RS Bali Mandara',   tipe: 'Pemerintah', kota: 'Denpasar',        akreditasi: 'Utama',     kapasitas: 180, status: 'Review',  pic: 'dr. Made Arya', alamat: 'Jl. Bypass Ngurah Rai', telp: '0361-7470000', pks: 'PKS-RS-006' },
];

/* ---------- Bengkel ---------- */
DATA.bengkel = [
  { id: 'BGK-001', nama: 'Auto2000 Pondok Indah',  tipe: 'Resmi Dealer', merk: 'Toyota', kota: 'Jakarta Selatan', kapasitas: 18, status: 'Aktif', pic: 'Bpk. Riyan' },
  { id: 'BGK-002', nama: 'Honda Pasteur',          tipe: 'Resmi Dealer', merk: 'Honda',  kota: 'Bandung',         kapasitas: 14, status: 'Aktif', pic: 'Bpk. Iwan' },
  { id: 'BGK-003', nama: 'Yamaha Sentral Motor',   tipe: 'Resmi Dealer', merk: 'Yamaha', kota: 'Jakarta Timur',   kapasitas: 22, status: 'Aktif', pic: 'Bpk. Hendri' },
  { id: 'BGK-004', nama: 'Bengkel Sinar Surabaya', tipe: 'Umum',         merk: 'Semua',  kota: 'Surabaya',        kapasitas:  9, status: 'Aktif', pic: 'Bpk. Rahmat' },
  { id: 'BGK-005', nama: 'Bengkel Denpasar Utama', tipe: 'Umum',         merk: 'Semua',  kota: 'Denpasar',        kapasitas:  7, status: 'Review', pic: 'Bpk. Wayan' },
];

/* ---------- Bank Rekanan ---------- */
DATA.bank = [
  { id: 'BNK-001', nama: 'Bank Central Asia', domain: 'bca.co.id',     kode: '014', tipe: 'Swasta', rekening: '****0011', cabang: 'Jakarta Pusat', swift: 'CENAIDJA', tujuan: 'Penerimaan Premi' },
  { id: 'BNK-002', nama: 'Bank Mandiri',      domain: 'bankmandiri.co.id', kode: '008', tipe: 'BUMN',  rekening: '****0022', cabang: 'Jakarta Pusat', swift: 'BMRIIDJA', tujuan: 'Operasional' },
  { id: 'BNK-003', nama: 'Bank Negara Indonesia', domain: 'bni.co.id', kode: '009', tipe: 'BUMN',  rekening: '****0033', cabang: 'Jakarta Selatan', swift: 'BNINIDJA', tujuan: 'Investasi' },
  { id: 'BNK-004', nama: 'Bank Syariah Indonesia', domain: 'bankbsi.co.id', kode: '451', tipe: 'Syariah', rekening: '****0044', cabang: 'Jakarta Pusat', swift: 'BSMDIDJA', tujuan: 'Penerimaan Syariah' },
];

/* ---------- Kerjasama (PKS) ---------- */
DATA.pks = [
  { nomor: 'PKS-2024-001', mitra: 'RS Pondok Indah',     tipe: 'Rumah Sakit',  mulai: '2022-01-01', berakhir: '2025-12-31', nilai: 15_000_000_000, syarat: '30 hari', status: 'Aktif',    pic_int: 'KAR-003', pic_ext: 'dr. Andi Wijaya' },
  { nomor: 'PKS-2024-002', mitra: 'Auto2000',            tipe: 'Bengkel',      mulai: '2021-03-15', berakhir: '2024-12-31', nilai:  8_500_000_000, syarat: '14 hari', status: 'Aktif',    pic_int: 'KAR-003', pic_ext: 'Bpk. Riyan' },
  { nomor: 'PKS-2024-003', mitra: 'Bank Mandiri',        tipe: 'Bank',         mulai: '2020-06-01', berakhir: '2025-05-31', nilai: 12_000_000_000, syarat: 'RTGS',     status: 'Aktif',    pic_int: 'KAR-005', pic_ext: 'Bpk. Prayoga' },
  { nomor: 'PKS-2024-004', mitra: 'Sponsor Garuda Run',  tipe: 'Sponsor',      mulai: '2024-01-01', berakhir: '2024-12-31', nilai:  1_200_000_000, syarat: 'Termin 3', status: 'Aktif',    pic_int: 'KAR-004', pic_ext: 'Bpk. Galuh' },
  { nomor: 'PKS-2024-005', mitra: 'RS Hermina Pasteur',  tipe: 'Rumah Sakit',  mulai: '2023-01-01', berakhir: '2024-06-30', nilai:  4_500_000_000, syarat: '30 hari', status: 'Perpanjangan', pic_int: 'KAR-003', pic_ext: 'dr. Lina Kartika' },
];

/* ---------- Sponsor ---------- */
DATA.sponsor = [
  { id: 'SPR-001', nama: 'Garuda Run 2024',          tier: 'Platinum', nilai: 1_200_000_000, periode: '2024', bentuk: 'Sponsorship Utama', kontra: 'Brand di stage & kaos event',          status_bayar: 'Lunas',       pic: 'KAR-004' },
  { id: 'SPR-002', nama: 'Indonesia Insurance Expo', tier: 'Gold',     nilai:   650_000_000, periode: '2024', bentuk: 'Booth Premium',     kontra: 'Booth 8x8 + keynote slot 30 mnt',       status_bayar: 'Lunas',       pic: 'KAR-004' },
  { id: 'SPR-003', nama: 'Webinar Literasi OJK',     tier: 'Silver',   nilai:   180_000_000, periode: '2024', bentuk: 'Co-Sponsor',        kontra: 'Logo di materi & email campaign',       status_bayar: 'Proses',      pic: 'KAR-004' },
  { id: 'SPR-004', nama: 'Jakarta Marathon 2024',    tier: 'Gold',     nilai:   420_000_000, periode: '2024', bentuk: 'Water Station',     kontra: 'Branded water station + kaos panitia',  status_bayar: 'Lunas',       pic: 'KAR-004' },
];

/* ---------- Aset Perusahaan ---------- */
DATA.aset = [
  { kode: 'AST-001', nama: 'Gedung HO Jakarta',      kategori: 'Properti',    nilai_perolehan: 180_000_000_000, nilai_buku:  128_000_000_000, depr: 29, lokasi: 'Jakarta Pusat',     kondisi: 'Baik',       umur: 30 },
  { kode: 'AST-002', nama: 'Kendaraan Dinas (fleet 12 unit)', kategori: 'Kendaraan', nilai_perolehan: 6_800_000_000, nilai_buku: 3_900_000_000, depr: 42, lokasi: 'Jakarta & Cabang', kondisi: 'Baik',       umur:  8 },
  { kode: 'AST-003', nama: 'Portofolio Deposito',    kategori: 'Investasi',   nilai_perolehan: 9_200_000_000_000, nilai_buku: 9_400_000_000_000, depr: 0, lokasi: 'BNI / Mandiri',   kondisi: 'Aktif',     umur:  1 },
  { kode: 'AST-004', nama: 'Portofolio Saham',       kategori: 'Investasi',   nilai_perolehan: 5_400_000_000_000, nilai_buku: 5_900_000_000_000, depr: 0, lokasi: 'BEI',              kondisi: 'Aktif',     umur:  3 },
  { kode: 'AST-005', nama: 'Data Center Primary',    kategori: 'Teknologi',   nilai_perolehan:    45_000_000_000, nilai_buku:    28_000_000_000, depr: 38, lokasi: 'Lantai 2 HO',     kondisi: 'Baik',       umur:  6 },
  { kode: 'AST-006', nama: 'Software ERP Lisensi',   kategori: 'Teknologi',   nilai_perolehan:    12_500_000_000, nilai_buku:     7_800_000_000, depr: 37, lokasi: 'Cloud',            kondisi: 'Aktif',     umur:  5 },
  { kode: 'AST-007', nama: 'Gedung Cabang Surabaya', kategori: 'Properti',    nilai_perolehan:    48_000_000_000, nilai_buku:    38_500_000_000, depr: 20, lokasi: 'Surabaya',        kondisi: 'Baik',       umur: 15 },
];

/* ---------- Risiko ---------- */
DATA.risiko = [
  { id: 'RSK-001', kategori: 'Operasional', nama: 'Kegagalan sistem core insurance', probabilitas: 3, dampak: 4, dampak_finansial: 5_000_000_000, skor: 12, strategi: 'Redundansi DC + DR drill kuartalan', status: 'Termitigasi', level: 'Tinggi' },
  { id: 'RSK-002', kategori: 'Finansial',   nama: 'Penurunan yield investasi',       probabilitas: 4, dampak: 3, dampak_finansial: 8_000_000_000, skor: 12, strategi: 'Diversifikasi portofolio',            status: 'Monitoring',   level: 'Tinggi' },
  { id: 'RSK-003', kategori: 'Reputasi',    nama: 'Eskalasi klaim viral di media',   probabilitas: 2, dampak: 5, dampak_finansial: 3_000_000_000, skor: 10, strategi: 'Protokol komunikasi krisis',          status: 'Termitigasi', level: 'Menengah' },
  { id: 'RSK-004', kategori: 'Kepatuhan',   nama: 'Ketidakpatuhan laporan OJK',      probabilitas: 2, dampak: 4, dampak_finansial: 2_500_000_000, skor:  8, strategi: 'Checklist compliance bulanan',        status: 'Termitigasi', level: 'Menengah' },
  { id: 'RSK-005', kategori: 'Fraud',       nama: 'Fraud internal keuangan',         probabilitas: 5, dampak: 5, dampak_finansial: 12_000_000_000, skor: 25, strategi: 'Segregation of duties + audit forensik', status: 'Investigasi', level: 'Kritis' },
  { id: 'RSK-006', kategori: 'Pasar',       nama: 'Kenaikan rate re-asuransi',       probabilitas: 3, dampak: 3, dampak_finansial: 4_000_000_000, skor:  9, strategi: 'Negosiasi ulang treaty',              status: 'Monitoring',   level: 'Menengah' },
];

/* ---------- Anomali ---------- */
DATA.anomali = [
  { id: 'ANM-001', tipe: 'Transaksi Besar Tanpa Referensi', skor: 72, deskripsi: 'Pemasukan Rp 780 jt di UMK-007 tanpa referensi invoice', jumlah_terdampak: 780_000_000, status: 'Investigasi', eskalasi: false, ref: 'UMK-007' },
  { id: 'ANM-002', tipe: 'Anomali Pemasukan',               skor: 68, deskripsi: 'Pola pemasukan di luar kebiasaan pada minggu 13',        jumlah_terdampak: 780_000_000, status: 'Investigasi', eskalasi: false, ref: 'UMK-007' },
  { id: 'ANM-003', tipe: 'Fraud Indicator (Pengambilan)',   skor: 95, deskripsi: 'Pengambilan Rp 3,25 M ke rekening pribadi dgn otorisasi staff', jumlah_terdampak: 3_250_000_000, status: 'Eskalasi OJK', eskalasi: true, ref: 'PGM-004 / UKL-006' },
];

/* ---------- Email ---------- */
DATA.email = [
  { id: 'EML-001', dari: 'OJK Pengawas <reg@ojk.go.id>',                 subjek: 'Permintaan klarifikasi laporan bulanan Maret 2024',          tanggal: '2024-04-12', prioritas: 'Kritis', tipe: 'Regulator', referensi: 'LAP-2024-03', isi: 'Mohon dilengkapi data penyaluran klaim dan bukti pendukung. Balasan paling lambat 2x24 jam.', baca: false },
  { id: 'EML-002', dari: 'Legal Dept <anisa.putri@rezeki.co.id>',        subjek: 'Review PKS Bank Mandiri 2025',                               tanggal: '2024-04-18', prioritas: 'Tinggi', tipe: 'Internal', referensi: 'PKS-2024-003', isi: 'Draft final review PKS terlampir. Mohon approval sebelum Jumat.', baca: false },
  { id: 'EML-003', dari: 'Arief Wicaksono <arief.w@mail.com>',           subjek: 'Konfirmasi penyelesaian klaim KLM-2024-0001',                tanggal: '2024-03-15', prioritas: 'Normal', tipe: 'Nasabah',   referensi: 'KLM-2024-0001', isi: 'Terima kasih, dana sudah masuk. Appresiasi untuk tim klaim.', baca: true },
  { id: 'EML-004', dari: 'IT Ops <ops@rezeki.co.id>',                    subjek: 'Scheduled maintenance data center Lantai 2',                 tanggal: '2024-04-20', prioritas: 'Tinggi', tipe: 'Internal', referensi: 'AST-005',       isi: 'Maintenance 24 April 2024 pkl 22.00 - 02.00. Sistem akan standby.', baca: false },
  { id: 'EML-005', dari: 'Sponsor Garuda <info@garudarun.id>',           subjek: 'Invoice penyelesaian sponsorship',                           tanggal: '2024-04-08', prioritas: 'Normal', tipe: 'Mitra',     referensi: 'SPR-001',       isi: 'Invoice akhir sponsorship 2024, mohon diproses pembayaran termin 3.', baca: true },
  { id: 'EML-006', dari: 'Audit Internal <audit@rezeki.co.id>',          subjek: 'Hasil audit transaksi UMK-007 & UKL-006',                    tanggal: '2024-04-19', prioritas: 'Kritis', tipe: 'Internal', referensi: 'ANM-003',       isi: 'Tiga temuan signifikan. Rekomendasi eskalasi ke Direksi & OJK.', baca: false },
];

/* ---------- Dokumen ---------- */
DATA.dokumen = [
  { id: 'DOK-001', nama: 'Polis-POL-2024-0001.pdf',      format: 'pdf',  tipe_dok: 'Polis',      referensi: 'POL-2024-0001',  ukuran_kb: 420, tanggal: '2024-01-10', uploader: 'KAR-002', verif: 'Terverifikasi', retensi: 10 },
  { id: 'DOK-002', nama: 'LAP-OJK-2024-Q1.xlsx',         format: 'xlsx', tipe_dok: 'Regulator',  referensi: 'LAP-2024-03',    ukuran_kb: 1800, tanggal: '2024-04-10', uploader: 'KAR-006', verif: 'Terverifikasi', retensi: 15 },
  { id: 'DOK-003', nama: 'Investigasi-KLM-0002.pdf',     format: 'pdf',  tipe_dok: 'Klaim',      referensi: 'KLM-2024-0002',  ukuran_kb: 980, tanggal: '2024-03-25', uploader: 'KAR-003', verif: 'Pending',       retensi:  7 },
  { id: 'DOK-004', nama: 'PKS-Mandiri-2024.pdf',         format: 'pdf',  tipe_dok: 'Kontrak',    referensi: 'PKS-2024-003',   ukuran_kb: 1400, tanggal: '2024-01-22', uploader: 'KAR-006', verif: 'Terverifikasi', retensi: 10 },
  { id: 'DOK-005', nama: 'Audit-ANM-003-Report.pdf',     format: 'pdf',  tipe_dok: 'Audit',      referensi: 'ANM-003',        ukuran_kb: 2400, tanggal: '2024-04-19', uploader: 'KAR-006', verif: 'Terverifikasi', retensi: 15 },
  { id: 'DOK-006', nama: 'Forecast-Q2-2024.xlsx',        format: 'xlsx', tipe_dok: 'Forecast',   referensi: 'FCS-004',        ukuran_kb: 620, tanggal: '2024-04-05', uploader: 'KAR-005', verif: 'Terverifikasi', retensi:  3 },
];

/* ---------- Forecast ---------- */
DATA.forecast = [
  { id: 'FCS-001', periode: 'Q1 2024', metode: 'Regresi Linear', produk: 'Kendaraan', est_polis: 420, est_premi: 120_000_000_000, est_klaim: 45_000_000_000, est_laba: 35_000_000_000, asumsi_growth: 8, pembuat: 'KAR-005' },
  { id: 'FCS-002', periode: 'Q1 2024', metode: 'Time Series',    produk: 'Kesehatan', est_polis: 380, est_premi: 180_000_000_000, est_klaim: 95_000_000_000, est_laba: 42_000_000_000, asumsi_growth: 12, pembuat: 'KAR-005' },
  { id: 'FCS-003', periode: 'Q1 2024', metode: 'Time Series',    produk: 'Properti',  est_polis: 140, est_premi:  65_000_000_000, est_klaim: 18_000_000_000, est_laba: 22_000_000_000, asumsi_growth:  6, pembuat: 'KAR-005' },
  { id: 'FCS-004', periode: 'Full Year 2024', metode: 'Ensemble', produk: 'Semua',   est_polis: 2_400, est_premi: 1_350_000_000_000, est_klaim: 520_000_000_000, est_laba: 340_000_000_000, asumsi_growth: 9, pembuat: 'KAR-005' },
  { id: 'FCS-005', periode: 'Q2 2024', metode: 'Regresi Linear', produk: 'Korporat',  est_polis:  85, est_premi: 420_000_000_000, est_klaim: 140_000_000_000, est_laba: 98_000_000_000, asumsi_growth:  5, pembuat: 'KAR-005' },
];

/* ---------- Helpers (fetched by app.js) ---------- */
DATA.lookup = {
  karyawan: (id) => DATA.karyawan.find(k => k.id === id) || { nama: id },
  departemen: (id) => DATA.departemen.find(d => d.id === id) || { nama: id },
  nasabah: (id) => DATA.nasabah.find(n => n.id === id) || { nama: id },
  produk: (id) => DATA.produk.find(p => p.id === id) || { nama: id },
  agen: (id) => DATA.agen.find(a => a.id === id) || { kode: id },
  polis: (nomor) => DATA.polis.find(p => p.nomor === nomor) || { nomor },
};
