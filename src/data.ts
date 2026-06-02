import { CommitteeMember, ServiceItem, NewsItem, Announcement, GalleryItem, StatItem } from './types';

export const COMMUNITY_STATS: StatItem[] = [
  { id: '1', label: 'RT', value: '9', icon: 'Home' },
  { id: '2', label: 'Kepala Keluarga', value: '432', icon: 'Users' },
  { id: '3', label: 'Jiwa', value: '1.842', icon: 'UserCheck' },
  { id: '4', label: 'Luas Wilayah', value: '2,1 km²', icon: 'TrendingUp' }
];

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: 'm1',
    name: 'Wardiyanto',
    role: 'Ketua RW 015',
    image: 'https://drive.google.com/thumbnail?id=18pQFlGyCoefhuV_x_nS7yU6-e8bF2P2l'
  },
  {
    id: 'm2',
    name: 'Aji Arja Yuda',
    role: 'Sekretaris',
    image: 'https://drive.google.com/thumbnail?id=1F7Hn2A8936FByRUQDXdfw0NOKnpJbWsj'
  },
  {
    id: 'm3',
    name: 'Usep Suyandi',
    role: 'Bendahara',
    image: 'https://drive.google.com/thumbnail?id=1DJWZNe1WqBoHBdmncq7GPfH0025DV2Mp'
  },
  {
    id: 'm4',
    name: 'Sigit Budi Prasetyo',
    role: 'Sekretariat',
    image: 'https://drive.google.com/thumbnail?id=1CNYN08E71xCqFLgv_yawdEqxCUpYYLFz'
  },
  {
    id: 'm5',
    name: 'Yayan Permana',
    role: 'Sekretariat',
    image: 'https://drive.google.com/thumbnail?id=1UGsQVx5LC0UUuubSPcXHa2HaqzjYM7XN'
  },
  {
    id: 'm6',
    name: 'Tri Wahyudi',
    role: 'Humas',
    image: 'https://drive.google.com/thumbnail?id=1HALNlNTjStilM7sA4np1-ODSBY_Rji9h',
    section: 'Humas'
  },
  {
    id: 'm7',
    name: 'Suparman',
    role: 'Humas',
    image: 'https://drive.google.com/thumbnail?id=1O3gy2CKqMoaB4Y-J56LFNdL5YZUKRRLX',
    section: 'Humas'
  },
  {
    id: 'm8',
    name: 'Tukardi Eko',
    role: 'Seksi Rohani',
    image: 'https://drive.google.com/thumbnail?id=1m-bzxyyFs6R_3Acczsaoc-m9zgGfyQ7X',
    section: 'Rohani'
  },
  {
    id: 'm9',
    name: 'Harwiyanto',
    role: 'Seksi Rohani',
    image: 'https://drive.google.com/thumbnail?id=1plnNmTrr_ijbgUeT5Hewm8h_fByCGC_c',
    section: 'Rohani'
  },
  {
    id: 'm10',
    name: 'Berlin Wahyu Hardinta',
    role: 'Seksi Olahraga',
    image: 'https://drive.google.com/thumbnail?id=10Dds07jSRk3v8ILjLipR_cClruEXOK5u',
    section: 'Olahraga'
  },
  {
    id: 'm11',
    name: 'Joni',
    role: 'Seksi Olahraga',
    image: 'https://drive.google.com/thumbnail?id=10wyA1lN5440VaJDCXlJH05RgLdZYOsOH',
    section: 'Olahraga'
  },
  {
    id: 'm12',
    name: 'Yayan Permana',
    role: 'Seksi Olahraga',
    image: 'https://drive.google.com/thumbnail?id=1YrMDsbzKanWZoK08QIgNfTnxNCXu-nea',
    section: 'Olahraga'
  },
  {
    id: 'm13',
    name: 'Bayu',
    role: 'Seksi Olahraga',
    image: 'https://drive.google.com/thumbnail?id=12pFRMfbgBEAdweqgFwI_iZ1q9rNYHbXg',
    section: 'Olahraga'
  },
  {
    id: 'm14',
    name: 'Supardi',
    role: 'Seksi Pemberdayaan Masyarakat',
    image: 'https://drive.google.com/thumbnail?id=180ZIWwKBDYM2MU1KVTTfVlTWfB0XdCik',
    section: 'Pemberdayaan Masyarakat'
  },
  {
    id: 'm15',
    name: 'Usman Jarwanto',
    role: 'Seksi Perlengkapan',
    image: 'https://drive.google.com/thumbnail?id=1_LBRyBgF0L6vCBMDHo6UIKQuK0ZqVh6D',
    section: 'Perlengkapan'
  },
  {
    id: 'm16',
    name: 'Rusdianto',
    role: 'Seksi Perlengkapan',
    image: 'https://drive.google.com/thumbnail?id=1hzYIfbqi7EwnaXkI_bZ5jAD7e4WfxpFy',
    section: 'Perlengkapan'
  },
  {
    id: 'm17',
    name: 'Hendra Somantri',
    role: 'Seksi Keamanan',
    image: 'https://drive.google.com/thumbnail?id=1km56icn-UIYFMj2fE5SB7tpFo-AIIbrV',
    section: 'Keamanan'
  },
  {
    id: 'm18',
    name: 'Sojo',
    role: 'Seksi Keamanan',
    image: 'https://drive.google.com/thumbnail?id=1AKltg0_6APCS8Ets2CwnJilLhm0Cc_ql',
    section: 'Keamanan'
  },
  {
    id: 'm19',
    name: 'Yayan Permana',
    role: 'Seksi Keamanan',
    image: 'https://drive.google.com/thumbnail?id=1pZu59uIUXLlhkWDXM8CMttffd1uiMzQM',
    section: 'Keamanan'
  },
  {
    id: 'm20',
    name: 'Triyono',
    role: 'Seksi K3',
    image: 'https://drive.google.com/thumbnail?id=1GknLo3OmrSQBZisCDtCZx0l86kZA-fQf',
    section: 'K3'
  },
  {
    id: 'm21',
    name: 'Ali Rachmadi',
    role: 'Seksi K3',
    image: 'https://drive.google.com/thumbnail?id=1Ikcam2-87biJa-seAa-8TLbFUv9l_CXW',
    section: 'K3'
  },
  {
    id: 'm22',
    name: 'Andi Sulasmono',
    role: 'Seksi K3',
    image: 'https://drive.google.com/thumbnail?id=171bjjczbJ_GW_GB1_7C4AAz5UtuI1-zu',
    section: 'K3'
  },
  {
    id: 'm23',
    name: 'Saptadi',
    role: 'Seksi K3',
    image: 'https://drive.google.com/thumbnail?id=1L8MLOCcKKSyhuG4-uw3H3XP4axKDfZYO',
    section: 'K3'
  },
  {
    id: 'm24',
    name: 'Supriadi',
    role: 'Seksi K3',
    image: 'https://drive.google.com/thumbnail?id=1cUOJDBCQp6JIi0Hc6E9gSZXNbe6TxK47',
    section: 'K3'
  }
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'sp',
    name: 'Surat Pengantar',
    description: 'Surat pengatar warga untuk keperluan administrasi kependudukan di berbagai instansi pemerintahan dari Kelurahan hingga instansi vertikal lainnya.',
    icon: 'FileText',
    requirements: ['Kartu Tanda Penduduk (KTP) Asli & Fotokopi', 'Kartu Keluarga (KK) Asli', 'Surat pengantar RT setempat']
  },
  {
    id: 'skd',
    name: 'Surat Keterangan Domisili',
    description: 'Surat yang menyatakan kebenaran bahwa yang bersangkutan tinggal atau berdomisili di wilayah RW 015 Desa Wanajaya untuk berbagai urusan resmi.',
    icon: 'MapPin',
    requirements: ['Kartu Keluarga (KK) Asli dan Fotokopi', 'KTP Asli', 'Surat pernyataan bermaterai jika menyewa rumah']
  },
  {
    id: 'sku',
    name: 'Surat Keterangan Usaha',
    description: 'Surat keterangan resmi bagi warga yang memiliki usaha produktif di lingkungan RW 015 untuk kelengkapan administrasi perbankan atau kemitraan.',
    icon: 'Briefcase',
    requirements: ['KTP & Kartu Keluarga (KK)', 'Foto lokasi tempat usaha', 'Surat rekomendasi RT setempat']
  },
  {
    id: 'sr',
    name: 'Surat Rekomendasi',
    description: 'Surat rekomendasi tertulis dari pengurus RW 015 untuk mendukung kelancaran kegiatan warga, pendaftaran institusi, maupun perizinan tertentu.',
    icon: 'Award',
    requirements: ['KTP & KK pemohon', 'Proposal kegiatan atau dokumen pendukung', 'Persetujuan lisan dari perwakilan RT']
  },
  {
    id: 'sktm',
    name: 'Surat Keterangan Tidak Mampu',
    description: 'Surat keterangan untuk membantu warga kurang mampu guna pengurusan bantuan sosial, keringanan biaya rumah sakit, maupun keringanan biaya sekolah anak.',
    icon: 'Heart',
    requirements: ['Kartu Indonesia Pintar (KIP) / PKH jika ada', 'Slip Gaji / Surat Pernyataan Pendapatan', 'Surat Pengantar RT', 'Fotokopi KK & KTP']
  },
  {
    id: 'lainnya',
    name: 'Layanan Lainnya',
    description: 'Layanan administrasi kependudukan dan persuratan lainnya sesuai dengan kebutuhan khusus dari warga RW 015 Desa Wanajaya.',
    icon: 'MoreHorizontal',
    requirements: ['Persyaratan akan disesuaikan dengan jenis surat yang diajukan. Hubungi pengurus RW untuk konsultasi lebih lanjut.']
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: 'Pengecoran Jembatan & Normalisasi Saluran',
    date: '30 Juni 2026',
    tag: 'Pembangunan',
    image: '/src/assets/images/drainage_repair_1780393395281.png',
    description: 'Kegiatan swadaya warga RW 015 untuk mengecor jembatan penghubung plat duiker sela-sela jalan serta menormalisasi saluran air/pembuangan luar.',
    content: 'Sebagai komitmen peningkatan infrastruktur lingkungan dan pencegahan banjir, warga RW 015 Desa Wanajaya melangsungkan kegiatan gotong-royong swadaya. Fokus utama mencakup pengecoran jembatan penghubung (plat duiker) menggunakan tulangan besi beton cor, serta pengerukan endapan lumpur (normalisasi pembuangan) untuk memaksimalkan kapasitas aliran debit air saat hujan lebat.'
  },
  {
    id: '2',
    title: 'Rapat Pengurus RW 015 Desa Wanajaya',
    date: '10 Mei 2026',
    tag: 'Informasi',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    description: 'Rapat rutin bulanan pengurus RW 015 untuk membahas program kerja tahunan dan masukan warga.',
    content: 'Pengurus RW 015 mengadakan rapat koordinasi bersama para Ketua RT dari RT 001 hingga RT 009 bertempat di Balai Pertemuan RW. Rapat membahas laporan bulanan kas warga, evaluasi program kerja kebersihan, pembenahan sistem keamanan lingkungan (Siskamling), serta persiapan peringatan HUT Kemerdekaan RI ke-81 yang akan datang.'
  },
  {
    id: '3',
    title: 'Posyandu Balita Bulan Mei',
    date: '08 Mei 2026',
    tag: 'Kesehatan',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80',
    description: 'Kegiatan posyandu balita bulanan untuk pemantauan tumbuh kembang anak dan imunisasi gratis.',
    content: 'Kegiatan posyandu dilaksanakan bekerja sama dengan tim medis dari Puskesmas Wanajaya. Program mencakup penimbangan berat badan balita, pengukuran tinggi badan, pemberian vitamin A, imunisasi dasar lengkap, serta konsultasi nutrisi ibu dan anak. Ibu-ibu diimbau hadir membawa buku KIA demi kesehatan masa depan putra-putri tercinta.'
  },
  {
    id: '4',
    title: 'Perbaikan Jalan Lingkungan RT 002',
    date: '05 Mei 2026',
    tag: 'Pembangunan',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=80',
    description: 'Perbaikan jalan lingkungan RT 002 menggunakan dana swadaya masyarakat dan bantuan kelurahan.',
    content: 'Bahu-membahu bersama warga RT 002 secara swadaya melakukan penutupan dan pengerjaan pengerasan aspal jalan gang yang sebelumnya berlubang. Langkah taktis ini penting demi memastikan akses pejalan kaki dan kendaraan bermotor warga tetap aman dan mengantisipasi genangan saat hujan tiba.'
  },
  {
    id: '5',
    title: 'Santunan Anak Yatim & Dhuafa',
    date: '03 Mei 2026',
    tag: 'Sosial',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
    description: 'Penyaluran santunan sosial kepada anak yatim dan keluarga dhuafa di lingkungan RW 015.',
    content: 'Secara khidmat, jajaran pengurus RW 015 and donatur menggalang penyaluran santunan beras serta paket sembako kepada dhuafa dan beasiswa kecil bagi anak-anak yatim piatu di wilayah RW. Semoga ikhtiar mulia ini meringankan beban sosial dan mempererat silaturahmi kebajikan antarwarga.'
  },
  {
    id: '6',
    title: 'Patroli Keamanan Lingkungan Terpadu',
    date: '01 Mei 2026',
    tag: 'Keamanan',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop&q=80',
    description: 'Kegiatan patroli bersama malam hari untuk mengantisipasi gangguan kamtibmas di RW 015.',
    content: 'Berdasarkan kesepakatan jajaran RT, giat siskamling diperketat dengan jadwal ronda bergilir seluruh warga pria dibantu oleh petugas sekuriti RW. Patroli melintasi titik rawan masuk, gerbang penghubung, serta gang-gang sempi guna memastikan kenyamanan warga beristirahat pada malam hari.'
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'p5',
    title: 'Pengecoran Jembatan & Normalisasi Saluran',
    date: '30 Juni 2026',
    time: 'Selama Pengerjaan Berlangsung',
    location: 'Sekretariat RW 015 & Jl. Cempaka II',
    description: 'Sehubungan dengan adanya kegiatan pembangunan jembatan plat duiker dan normalisasi saluran air, diberitahukan bahwa akan dilakukan penutupan jalan sementara di depan Sekretariat RW 015 dan jalur arah Jl. Cempaka II dari tanggal 30 Juni 2026 s/d 6 Juli 2026.\n\nAkses jalan utama dialihkan melalui SUTET (PORTAL RT. 001) DAN PORTAL RT. 004.\n\nMohon maaf atas ketidaknyamanan yang ditimbulkan bagi segenap warga dan pengguna jalan. Terima kasih atas pengertian dan kerja samanya.',
    category: 'Keamanan'
  },
  {
    id: 'p1',
    title: 'Kerja Bakti Serentak RW 015',
    date: 'Minggu, 19 Mei 2026',
    time: '07.00 WIB',
    location: 'Seluruh Wilayah RT 001 s.d RT 009',
    description: 'Diharapkan seluruh warga RW 015 Desa Wanajaya untuk ikut serta dalam kerja bakti massal membersihkan saluran pembuangan, memotong dahan pohon yang rimbun menghalangi jalan, serta mengantisipasi sarang nyamuk DBD menjelang musim pancaroba.',
    category: 'Kegiatan'
  },
  {
    id: 'p2',
    title: 'Pembayaran Iuran Kas Bulanan',
    date: '13 Mei 2026',
    description: 'Batas akhir pembayaran iuran bulanan ketertiban, kebersihan, dan sosial untuk periode Mei 2026 paling lambat adalah tanggal 31 Mei 2026 melalui bendahara RT masing-masing untuk dilanjutkan ke kas pengurus RW.',
    category: 'Keuangan'
  },
  {
    id: 'p3',
    title: 'Waspada Keamanan & Curanmor',
    date: '11 Mei 2026',
    description: 'Sehubungan dengan maraknya laporang tindak kriminalitas pencurian kendaraan bermotor, masyarakat RW 015 diimbau agar selalu mengunci ganda motor, menjaga portal tetap tertutup sejak pukul 23:00 WIB, dan memastikan rumah terkunci rapat sebelum ditinggal.',
    category: 'Keamanan'
  },
  {
    id: 'p4',
    title: 'Rapat Rutin Pengurus RW & RT',
    date: 'Sabtu, 18 Mei 2026',
    time: '19.30 WIB',
    location: 'Balai Pertemuan (Kantor RW 015)',
    description: 'Undangan rapat kerja bulanan koordinasi penting jajaran kordes, Ketua RT 001-009, and pengurus RW untuk pelaporan kerja, pembagian insentif petugas kebersihan, serta pembahasan pembangunan gapura utama.',
    category: 'Kegiatan'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Giat Kerja Bakti RT 004',
    category: 'Kegiatan',
    image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=600&auto=format&fit=crop&q=80',
    description: 'Warga RT 004 bergotong-royong membersihkan gorong-gorong penyumbatan air.'
  },
  {
    id: 'g2',
    title: 'Buka Bersama & Pengajian Bulanan',
    category: 'Keagamaan',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80',
    description: 'Silaturahmi keagamaan warga dan siraman rohani di Masjid Al-Ikhlas RW 015.'
  },
  {
    id: 'g3',
    title: 'Gotong Royong Perbaikan Balai RW',
    category: 'Kegiatan',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80',
    description: 'Pengerjaan atap bocor and pengecatan kembali Balai Pertemuan RW 015.'
  },
  {
    id: 'g4',
    title: 'Pemeriksaan Kesehatan Lansia Posyandu',
    category: 'Sosial',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&auto=format&fit=crop&q=80',
    description: 'Pemeriksaan tensi darah serta gula darah gratis bagi lansia RW 015.'
  },
  {
    id: 'g5',
    title: 'Pertemuan Rutin Kader PKK',
    category: 'Lainnya',
    image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=600&auto=format&fit=crop&q=80',
    description: 'Ibu-ibu PKK RW 015 berdiskusi program ketahanan pangan keluarga.'
  },
  {
    id: 'g6',
    title: 'Penyaluran Zakat & Sembako',
    category: 'Sosial',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80',
    description: 'Penyaluran beras dan santunan kebajikan menjelang lebaran idul fitri.'
  }
];
