import { useState } from 'react';
import { BookOpen, Target, Map, Users, Building2, Landmark, CheckCircle2, History, Award, TrendingUp } from 'lucide-react';
import KependudukanSection from './KependudukanSection';
import KepengurusanSection from './KepengurusanSection';
import { useDemografi } from '../hooks/useDemografi';
import { getGoogleDriveImageUrl } from '../utils/googleDrive';

interface FormerChairperson {
  id: string;
  name: string;
  period: string;
  achievements: string[];
  image: string;
  notes?: string;
}

const FORMER_CHAIRPERSONS: FormerChairperson[] = [
  {
    id: 'f1',
    name: 'H. Mohamad Yusuf, S.E.',
    period: '2021 - 2024',
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=300&auto=format&fit=crop&q=80',
    achievements: [
      'Digitalisasi administrasi persuratan warga (RW Digital)',
      'Normalisasi drainase utama pencegah genangan air hujan',
      'Penyediaan unit ambulance RW mandiri dan tanggap darurat'
    ],
    notes: 'Ketua RW ke-7'
  },
  {
    id: 'f2',
    name: 'Drs. H. Bambang Hermawan',
    period: '2017 - 2021',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    achievements: [
      'Pembangunan Gedung Balai Pertemuan RW Utama',
      'Pembentukan tim penanggulangan sampah terintegrasi',
      'Inisiasi kas RW transparan berbasis pelaporan online'
    ],
    notes: 'Ketua RW ke-6'
  },
  {
    id: 'f3',
    name: 'H. Sutopo, S.E.',
    period: '2012 - 2017',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    achievements: [
      'Pemasangan jaringan CCTV pemantau siskamling di 24 titik',
      'Juara 1 Lomba Kebersihan Lingkungan tingkat Kecamatan',
      'Penyelenggaraan turnamen olahraga tahunan Piala RW 015'
    ],
    notes: 'Ketua RW ke-5'
  },
  {
    id: 'f4',
    name: 'H. Rachmat Hidayat',
    period: '2006 - 2012',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    achievements: [
      'Pengadaan armada roda tiga bak sampah untuk tiap-tiap RT',
      'Pembangunan Taman Ramah Anak dan Ruang Terbuka Hijau',
      'Peremajaan pos keamanan ronda di setiap gerbang masuk'
    ],
    notes: 'Ketua RW ke-4'
  },
  {
    id: 'f5',
    name: 'Ir. H. Joko Santoso',
    period: '2000 - 2006',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300&auto=format&fit=crop&q=80',
    achievements: [
       'Pavingisasi jalan lingkungan pemukiman secara menyeluruh',
      'Penanaman 1.000 pohon pelindung di sepanjang jalan utama',
      'Pembentukan koperasi warga RW 015 peduli ekonomi mikro'
    ],
    notes: 'Ketua RW ke-3'
  },
  {
    id: 'f6',
    name: 'H. M. Soleh',
    period: '1994 - 2000',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    achievements: [
      'Pembentukan Posyandu Mandiri Terpadu Ibu dan Anak',
      'Pendataan kependudukan pertama berbasis database kartu keluarga',
      'Penyusunan peta batas administratif resmi RT 001 - RT 009'
    ],
    notes: 'Ketua RW ke-2'
  },
  {
    id: 'f7',
    name: 'H. Syamsuddin',
    period: '1988 - 1994',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
    achievements: [
      'Ketua RW Pertama hasil kepengurusan swadaya mandiri',
      'Pembangunan gapura masuk utama dan papan nama gang',
      'Pemberdayaan gotong royong siskamling ronda malam perdana'
    ],
    notes: 'Ketua RW ke-1 (Mata Rukun Perdana)'
  }
];

export default function ProfilSection() {
  const [activeSubTab, setActiveSubTab] = useState<'sejarah' | 'visi' | 'kepengurusan' | 'wilayah' | 'demografi' | 'fasilitas'>('sejarah');
  const { stats, loading } = useDemografi();

  const dynamicStats = [
    { id: '1', label: 'RT', value: loading ? '...' : stats.rt.toString() },
    { id: '2', label: 'Kepala Keluarga', value: loading ? '...' : stats.kepalaKeluarga.toLocaleString('id-ID') },
    { id: '3', label: 'Jiwa', value: loading ? '...' : stats.jiwa.toLocaleString('id-ID') },
    { id: '4', label: 'Luas Wilayah', value: stats.luasWilayah }
  ];

  const subTabs = [
    { id: 'sejarah', label: 'Sejarah RW', icon: BookOpen },
    { id: 'visi', label: 'Visi & Misi', icon: Target },
    { id: 'kepengurusan', label: 'Kepengurusan RW', icon: Users },
    { id: 'wilayah', label: 'Wilayah', icon: Map },
    { id: 'demografi', label: 'Data Demografi', icon: TrendingUp },
    { id: 'fasilitas', label: 'Fasilitas Umum', icon: Building2 },
  ] as const;

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Banner / Page Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-8 sm:p-10 text-white shadow-md">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10 space-y-2">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-100">Informasi Wilayah</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Profil RW 015</h1>
          <p className="text-slate-100 text-sm sm:text-base max-w-xl font-light">
            Mengenal lebih dekat sejarah, visi misi, potensi daerah, dan fasilitas warga RW 015 Pesona Gading Cibitung.
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar sub-navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-1.5">
            <h3 className="px-3.5 pt-2 pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Navigasi Profil</h3>
            {subTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`w-full flex items-center text-left space-x-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeSubTab === tab.id
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${activeSubTab === tab.id ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Content Card */}
        <div className="lg:col-span-3">
          {activeSubTab === 'demografi' ? (
            <KependudukanSection hideHeader={true} />
          ) : activeSubTab === 'kepengurusan' ? (
            <KepengurusanSection hideHeader={true} />
          ) : (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs min-h-[420px] flex flex-col justify-between">
              <div>
                {activeSubTab === 'sejarah' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Sejarah RW 015</h2>
                      <p className="text-xs text-slate-400">Desa Wanajaya • Sejak Tahun 1965</p>
                    </div>
                    <div className="prose text-slate-600 space-y-4 text-sm sm:text-base leading-relaxed">
                      <p>
                        Rukun Warga 015 Pesona Gading Cibitung dibentuk pada tahun 1965 berdasarkan semangat kebersamaan dan gotong royong warga untuk menciptakan lingkungan yang aman, nyaman, bersih, sehat, dan harmonis. 
                      </p>
                      <p>
                        Seiring berjalannya dekade, wilayah RW 015 terus berkembang pesat dari kawasan agraris menjadi wilayah pemukiman yang modern, tertib, dan aktif secara sosial ekonomi. Pengelolaan tata kelola lingkungan didukung partisipasi aktif para tetua adat, tokoh agama, serta generasi muda yang kompak bersinergi menjaga kerukunan antar warga.
                      </p>
                      <p>
                        Saat ini, RW 015 Pesona Gading Cibitung menjadi salah satu contoh Rukun Warga berprestasi di tingkat desa dengan berbagai inisiatif teknologi pelayanan mandiri, pemilahan sampah mandiri, ketahanan pangan lokal (Urban Farming), dan sistem siskamling digital terintegrasi.
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-100 pt-6 my-6" />

                    {/* Mantan Ketua RW Section */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <History className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-bold text-slate-800">Mantan Ketua RW 015</h3>
                      </div>
                      <p className="text-slate-500 text-xs sm:text-sm">
                        Jajaran Pemimpin dan Pejuang Lingkungan yang Pernah Mengabdi:
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                        {FORMER_CHAIRPERSONS.map((former) => (
                          <div 
                            key={former.id}
                            className="group relative flex flex-col justify-between overflow-hidden bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 h-full"
                          >
                            {/* Photo with Aspect Ratio 3:4 */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 rounded-t-xl">
                              <img
                                src={getGoogleDriveImageUrl(former.image)}
                                alt={former.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              {/* Overlay for Name / Period */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-2.5 sm:p-3">
                                <span className="text-[10px] sm:text-[11px] font-black text-blue-300 tracking-wide">
                                  {former.period}
                                </span>
                                <h4 className="font-extrabold text-white text-xs sm:text-sm leading-snug line-clamp-2 mt-0.5">
                                  {former.name}
                                </h4>
                                <p className="text-[9px] sm:text-[10px] text-slate-300 font-medium mt-0.5">
                                  {former.notes}
                                </p>
                              </div>
                            </div>
                            {/* Accent bottom bar */}
                            <div className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 w-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeSubTab === 'visi' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Visi & Misi</h2>
                      <p className="text-xs text-slate-400">Landasan Kebijakan & Tujuan Pembangunan Bersama</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5 sm:p-6">
                        <h3 className="text-lg font-bold text-blue-800 flex items-center space-x-2 mb-3">
                          <Target className="h-5 w-5 text-blue-600" />
                          <span>Visi Kami</span>
                        </h3>
                        <p className="text-slate-700 text-sm leading-relaxed font-medium italic">
                          "Terwujudnya lingkungan RW 015 yang aman, nyaman, bersih, sehat, and berdaya saing dengan semangat gotong royong dan kebersamaan."
                        </p>
                      </div>
                      <div className="md:col-span-3 space-y-4">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                          <CheckCircle2 className="h-5 w-5 text-blue-600" />
                          <span>Misi Kami</span>
                        </h3>
                        <ul className="space-y-3.5">
                          {[
                            'Meningkatkan kerukunan hidup beragama dan bergotong royong antar warga.',
                            'Mewujudkan tata kelola lingkungan yang aman, bersih, asri, dan kondusif.',
                            'Meningkatkan kualitas pelayanan administrasi dan kepedulian sosial kepada warga.',
                            'Mendorong partisipasi aktif pemuda dan warga dalam pengembangan program pembangunan lokal.',
                          ].map((misi, idx) => (
                            <li key={idx} className="flex items-start space-x-2.5 text-slate-600 text-sm">
                              <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                {idx + 1}
                              </span>
                              <span>{misi}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeSubTab === 'wilayah' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Batas dan Kondisi Wilayah</h2>
                      <p className="text-xs text-slate-400">Letak Geografis • Batas Administratif</p>
                    </div>
                    <div className="prose text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
                      <p>
                        Secara geografis, wilayah RW 015 terletak di kawasan strategis Desa Wanajaya, Kecamatan Cibitung, memiliki luas wilayah kurang lebih 2,1 km² dengan kontur tanah datar yang dihuni oleh pemukiman padat asri.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase">Batas Utara</span>
                          <p className="font-semibold text-slate-700 text-sm mt-0.5">Berbatasan dengan wilayah RW 02 Desa Wanajaya</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase">Batas Timur</span>
                          <p className="font-semibold text-slate-705 text-sm mt-0.5">Berbatasan langsung dengan aliran Kali Baru / Sungai</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase">Batas Selatan</span>
                          <p className="font-semibold text-slate-700 text-sm mt-0.5">Berbatasan dengan wilayah Desa Wanasari</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase">Batas Barat</span>
                          <p className="font-semibold text-slate-700 text-sm mt-0.5">Berbatasan dengan Kompleks Perumahan Wanajaya</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSubTab === 'fasilitas' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 mb-2">Sarana & Prasarana Umum</h2>
                      <p className="text-xs text-slate-400">Fasilitas Penunjang Kehidupan Sosial Warga</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { icon: Landmark, name: 'Satu Gedung Balai RW Pertemuan Utama', desc: 'Digunakan untuk rapat kepengurusan, pelatihan PKK, pertunjukan lokal, dan hajatan warga.' },
                        { icon: Building2, name: 'Posyandu Ibu & Anak Mandiri', desc: 'Fasilitas tim pemantau kesehatan warga yang beroperasi rutin bulanan bekerja sama dengan Puskesmas.' },
                        { icon: Users, name: 'Taman Bermain Anak & Urban Farming', desc: 'Lokasi rekreasi keluarga yang hijau serta area penanaman sayur hidroponik warga.' },
                        { icon: CheckCircle2, name: '6 Titik Pos Ronda Keamanan Siskamling', desc: 'Tersebar strategis dilengkapi tombol darurat (panic button) nirkabel.' }
                      ].map((f, i) => {
                        const Icon = f.icon;
                        return (
                          <div key={i} className="flex space-x-3.5 p-4 border border-slate-100 rounded-xl hover:border-blue-100 hover:bg-blue-50/20 transition-all">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg h-fit">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-800 text-sm">{f.name}</h4>
                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{f.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Stat Highlights */}
              <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/50 p-4 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs font-medium text-slate-400">Provinsi</span>
                  <p className="font-semibold text-slate-800 text-sm">Jawa Barat</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-400">Kabupaten/Kecamatan</span>
                  <p className="font-semibold text-slate-800 text-sm">Bekasi / Cibitung</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-400">Desa</span>
                  <p className="font-semibold text-slate-800 text-sm">Wanajaya</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-slate-400">Kode Pos</span>
                  <p className="font-semibold text-slate-800 text-sm">17520</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Numerical Stats Highlights Footer */}
      {activeSubTab !== 'demografi' && activeSubTab !== 'kepengurusan' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs">
          <h3 className="text-center font-bold text-slate-800 mb-8 text-lg">Struktur Demografi Wilayah RW 015</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {dynamicStats.map((stat) => (
              <div 
                key={stat.id} 
                className="text-center space-y-2 p-5 rounded-2xl bg-blue-50/50 border border-blue-100/50 hover:bg-blue-50 transition-all hover:scale-[1.02]"
              >
                <div className="text-3xl sm:text-4.5xl font-black text-blue-600 tracking-tight">{stat.value}</div>
                <div className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
