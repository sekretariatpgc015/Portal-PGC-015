import { useState } from 'react';
import { 
  Shield, Leaf, HelpCircle, Users, Activity, Heart, 
  Calendar, MapPin, Phone, CheckCircle2, Star, BookOpen, AlertCircle, Info, HeartHandshake,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getGoogleDriveImageUrl } from '../utils/googleDrive';

type SubTab = 'posyandu' | 'posbindu' | 'majelis-talim' | 'kjs';
type MainTab = 'keamanan' | 'k3' | 'pkk' | 'pemuda-olahraga';

export default function SeksiLembagaSection() {
  const [activeTab, setActiveTab] = useState<MainTab>('keamanan');
  const [activePKKSubTab, setActivePKKSubTab] = useState<SubTab>('posyandu');

  const subTabs = [
    { id: 'keamanan', label: 'Sie Keamanan', icon: Shield },
    { id: 'k3', label: 'Sie K3 (Kebersihan & Keindahan)', icon: Leaf },
    { id: 'pemuda-olahraga', label: 'Sie Pemuda & Olahraga', icon: Trophy },
    { id: 'pkk', label: 'PKK RW 015', icon: Users },
  ] as const;

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Banner / Page Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-8 sm:p-10 text-white shadow-md">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10 space-y-2">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-100">Sektor Organisasi Lingkungan</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Seksi & Lembaga RW 015</h1>
          <p className="text-slate-100 text-sm sm:text-base max-w-xl font-light">
            Struktur unit organisasi taktis, seksi pembinaan, serta lembaga kemasyarakatan di bawah naungan kepengurusan RW 015 Desa Wanajaya untuk menopang ketertiban, kebersihan, kesehatan, keagamaan, dan kelancaran kegiatan warga.
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar sub-navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-1.5">
            <h3 className="px-3.5 pt-2 pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Navigasi Seksi & Lembaga</h3>
            {subTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center text-left space-x-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Detail Content Card */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === 'keamanan' && (
              <motion.div
                key="keamanan"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 xl:grid-cols-3 gap-8"
              >
                {/* Left Content Card */}
                <div className="xl:col-span-2 space-y-6">
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span>Seksi Keamanan & Ketertiban Linkungan</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Tugas pokok, koordinasi, dan pengamanan pemukiman</p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Seksi Keamanan RW 015 bertugas penuh dalam mengoordinasikan jajaran petugas patroli, merawat fasilitas pos-pos kamling/ronda, serta memantau kondisi ketertiban lingkungan tempat tinggal warga selama 24 jam penuh di wilayah sebaran RT 001 sampai dengan RT 014.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Fungsi dan Tanggung Jawab Utama:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Patroli Rutin Malam Hari & Siskamling',
                      'Pengawasan Integrasi Kamera CCTV Wilayah',
                      'Manajemen Portal & Akses Keluar Masuk Kompleks',
                      'Penanganan Darurat, Mediasi, & Kamtibmas',
                      'Koordinasi Eksternal dengan Babinsa & Polsek',
                      'Penyuluhan Kewaspadaan Kebakaran & Sosial'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-slate-600 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Board */}
                <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-slate-600">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-700 block">Aturan Tamu Wajib Lapor:</span>
                    <p className="mt-0.5">Setiap tamu non-warga yang berkunjung dan bermalam lebih dari 1x24 jam diwajibkan melakukan pelaporan identitas melalui Ketua RT masing-masing atau pos jaga utama untuk menjaga ketertiban kolektif.</p>
                  </div>
                </div>
              </div>

              {/* Agenda Ronda */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2">Program Operasional & Patroli</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100/75 transition-colors">
                    <div>
                      <h4 className="font-semibold text-slate-700 text-sm">Patroli Jaga Regu Malam</h4>
                      <p className="text-xs text-slate-400">Pengamanan terpusat di seluruh klaster RT 001 - RT 014</p>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 font-mono font-bold text-xxs uppercase rounded-full">Pukul 22.00 - 05.00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl hover:bg-slate-100/75 transition-colors">
                    <div>
                      <h4 className="font-semibold text-slate-700 text-sm">Pengecekan Rutin Portal Utama</h4>
                      <p className="text-xs text-slate-400">Penutupan satu pintu akses sekunder (One Gate System)</p>
                    </div>
                    <span className="px-2.5 py-1 bg-slate-200 text-slate-700 font-mono font-bold text-xxs uppercase rounded-full">Pukul 23.00 WIB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Card */}
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden space-y-6">
                <div className="absolute inset-0 bg-radial-gradient from-blue-900/40 via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
                    <Activity className="h-4 w-4 animate-pulse" />
                    <span>Layanan Darurat Jaga</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">Butuh Bantuan Keamanan?</h3>
                    <p className="text-xs text-slate-350 leading-relaxed mt-1">Kami bersiaga penuh membantu penanganan insiden, pencurigaan, kemalingan, kebakaran, maupun mediasi warga.</p>
                  </div>

                  <div className="pt-2 space-y-3">
                    <div className="flex items-start space-x-3 p-3 bg-slate-800/80 rounded-xl border border-slate-750">
                      <Phone className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">Hotline Pos Utama RW 015</span>
                        <strong className="text-sm font-mono text-emerald-300">0812-3456-7890</strong>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-slate-800/80 rounded-xl border border-slate-750">
                      <MapPin className="h-4 w-4 text-sky-400 mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">Pos Jaga Gerbang Barat</span>
                        <p className="text-xs text-slate-300">Dekat Gerbang Masuk Sektor Lapangan Tengah</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Team Quick Stats */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                <h4 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Aset Keamanan RW 015</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50/50 rounded-xl text-center">
                    <span className="text-xs text-slate-400 block">Kamera CCTV</span>
                    <strong className="text-xl font-bold font-mono text-blue-600">32 Unit</strong>
                  </div>
                  <div className="p-3 bg-blue-50/50 rounded-xl text-center">
                    <span className="text-xs text-slate-400 block">Pos Satpam</span>
                    <strong className="text-xl font-bold font-mono text-blue-600">3 Titik</strong>
                  </div>
                  <div className="p-3 bg-blue-50/50 rounded-xl text-center col-span-2">
                    <span className="text-xs text-slate-400 block">Personel Piket Aktif</span>
                    <strong className="text-sm font-bold text-slate-755">6 Anggota Jaga Profesional</strong>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'k3' && (
          <motion.div
            key="k3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* Left Content Card */}
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-emerald-600" />
                    <span>Seksi K3 (Kebersihan, Keindahan, & Ketertiban)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Pengelolaan lingkungan hidup dan ketertiban tata kota</p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Seksi K3 RW 015 mengemban tanggung jawab penting untuk melestarikan lingkungan yang ramah kesehatan, asri dipandang, serta tertib dalam aspek pemanfaatan tata ruang publik seputar kompleks perumahan Pesona Gading Cibitung.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Fokus Program Penataan Lingkungan:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Sistem Pengangkutan Sampah Mandiri Terjadwal',
                      'Pembersihan Got & Saluran Air Antisipasi Banjir',
                      'Penghijauan Jalan Utama & Taman Bermain Sehat',
                      'Pembersihan rumput liar dan penebangan dahan rapuh',
                      'Sosialisasi Ketertiban Lahan Parkir Depan Rumah',
                      'Edukasi Pemanfaatan TOGA (Tanaman Obat Keluarga)'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-slate-600 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips Go Green */}
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-slate-650">
                  <Info className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-800 block">Ajakan Memilah Sampah Sederhana:</span>
                    <p className="mt-0.5">Warga dihargai jika dapat memilah terlebih dahulu sampah kering (plastik/kertas) dan sampah basah sebelum ditaruh di wadah penampungan depan pagar rumah luar demi meringankan kerja kader dan pemulung lingkungan.</p>
                  </div>
                </div>
              </div>

              {/* Kegiatan Kerja Bakti */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2">Jadwal Rutin Kebersihan & Fogging</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start sm:items-center p-3.5 bg-slate-50 rounded-xl hover:bg-slate-150/40 transition-colors gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 text-sm">Kerja Bakti Akbar Triwulan</h4>
                      <p className="text-xs text-slate-400">Pembersihan sarang nyamuk, gorong-gorong, & pemangkasan tanaman pengganggu.</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-mono font-bold text-xxs uppercase rounded-full shrink-0">Bulan Ganjil, Minggu Ke-2</span>
                  </div>
                  <div className="flex justify-between items-start sm:items-center p-3.5 bg-slate-50 rounded-xl hover:bg-slate-150/40 transition-colors gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 text-sm">Agenda Fogging DB Berkala</h4>
                      <p className="text-xs text-slate-400 font-normal">Penyemprotan insektisida di area endemis jentik demam berdarah.</p>
                    </div>
                    <span className="px-2.5 py-1 bg-slate-200 text-slate-700 font-mono font-bold text-xxs uppercase rounded-full shrink-0">Kondisional (per 6 bulan)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side data for K3 */}
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-850 p-6 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                <div className="flex items-center space-x-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                  <Star className="h-4 w-4" />
                  <span>Penghargaan Kampung Hebat</span>
                </div>
                <h3 className="text-base font-bold text-emerald-900 leading-snug">Kampoeng Go-Green Berprestasi Cibitung</h3>
                <p className="text-xs text-emerald-800 font-normal leading-relaxed">
                  Melalui kepatuhan penyediaan tong sampah pilah, optimalisasi Bank Sampah RW, dan pelarangan pembakaran sampah di pekarangan, RW 015 senantiasa bersiap menjadi percontohan pemukiman asri di tingkat Kabupaten Bekasi.
                </p>
                <div className="pt-2 text-xxs font-mono font-semibold text-emerald-600 uppercase">Evaluasi Triwulan Dinas Kebersihan</div>
              </div>

              {/* Sarpras K3 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                <h4 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Sarana Pengelolaan K3</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-600">
                    <span>Motor Pengangkut Sampah</span>
                    <strong className="text-slate-800 font-mono">2 Unit</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-600">
                    <span>Gudang Penyimpanan Alat K3</span>
                    <strong className="text-slate-800 font-mono">1 Titik</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-600">
                    <span>Bank Sampah Induk Mitra</span>
                    <strong className="text-slate-800 font-mono font-semibold">Bank Sampah Melati 15</strong>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'pkk' && (
          <motion.div
            key="pkk"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Intro PKK */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-pink-50 rounded-xl border border-pink-100 text-pink-600">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Pemberdayaan Kesejahteraan Keluarga (PKK) RW 015</h2>
                  <p className="text-xs text-slate-450">Menggerakkan peranan wanita, keluarga sehat, bimbingan gizi serta keagamaan di RT 001 - RT 014</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kader Tim Penggerak PKK RW 015 merupakan pilar utama akselerasi program kesehatan dasar, peningkatan ilmu keagamaan, serta pembinaan pola hidup aktif, sehat, dan bugar bagi ibu, anak, remaja, hingga lansia. Tim Penggerak PKK mengoordinasikan empat pilar sayap lembaga kemasyarakatan berikut:
              </p>
            </div>

            {/* Struktur Pengurus PKK Periode 2026-2031 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-base font-extrabold text-slate-800">Struktur Pengurus PKK RW 015</h3>
                <p className="text-xs text-slate-400 mt-0.5 uppercase font-semibold tracking-wider">Masa Bakti Kabinet Pengurus Periode 2026 - 2031</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Ketua */}
                <div className="sm:col-span-3">
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50/50 p-5 rounded-2xl border border-pink-100 shadow-2xs hover:shadow-xs transition-shadow flex items-center space-x-4 max-w-xs sm:max-w-sm mx-auto w-full">
                    <img 
                      src="https://drive.google.com/thumbnail?id=1NJ42kWTNOAl8CVjtLTSMHaBGLiuEURsI"
                      alt="Alinda"
                      referrerPolicy="no-referrer"
                      className="w-[60px] h-[80px] rounded-xl object-cover border-2 border-pink-200 shadow-sm select-none flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-pink-600 block">Ketua PKK RW 015</span>
                      <h4 className="text-base sm:text-lg font-black text-slate-800 leading-tight">Alinda</h4>
                    </div>
                  </div>
                </div>

                {/* Sekretaris */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-2xs flex items-center space-x-3.5 hover:bg-slate-100/50 transition-colors">
                  <img 
                    src="https://drive.google.com/thumbnail?id=1ypD-Fdk55E5ndyPuKZqzlP5KN0wxvt5z"
                    alt="Rohita"
                    referrerPolicy="no-referrer"
                    className="w-[48px] h-[64px] rounded-lg object-cover border border-slate-200 shadow-2xs select-none flex-shrink-0"
                  />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block pb-0.5">Sekretaris</span>
                    <h4 className="text-sm font-extrabold text-slate-800 leading-tight">Rohita</h4>
                    <p className="text-[10px] text-slate-450 leading-normal">Administrasi & Persuratan</p>
                  </div>
                </div>

                {/* Bendahara 1 */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-2xs flex items-center space-x-3.5 hover:bg-slate-100/50 transition-colors">
                  <img 
                    src="https://drive.google.com/thumbnail?id=12N_5_42jHzCKvQk_-1R9Pr6DrKAGr4xL"
                    alt="Suhaidah"
                    referrerPolicy="no-referrer"
                    className="w-[48px] h-[64px] rounded-lg object-cover border border-slate-200 shadow-2xs select-none flex-shrink-0"
                  />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block pb-0.5">Bendahara 1</span>
                    <h4 className="text-sm font-extrabold text-slate-800 leading-tight">Suhaidah</h4>
                    <p className="text-[10px] text-slate-450 leading-normal">Keuangan Umum & Kas</p>
                  </div>
                </div>

                {/* Bendahara 2 */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-2xs flex items-center space-x-3.5 hover:bg-slate-100/50 transition-colors">
                  <img 
                    src="https://drive.google.com/thumbnail?id=1mk6AN5BNXrdGuy8vXbFiVcKWB9qIrxp3"
                    alt="Sugiarti"
                    referrerPolicy="no-referrer"
                    className="w-[48px] h-[64px] rounded-lg object-cover border border-slate-200 shadow-2xs select-none flex-shrink-0"
                  />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block pb-0.5">Bendahara 2</span>
                    <h4 className="text-sm font-extrabold text-slate-800 leading-tight">Sugiarti</h4>
                    <p className="text-[10px] text-slate-450 leading-normal">Verifikasi & Laporan Kas</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-pink-50/40 border border-pink-100/60 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-slate-600">
                <CheckCircle2 className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-700 block">Sinergi PKK Sehat & Berdaya:</span>
                  <p className="mt-0.5">Tim Penggerak PKK berkomitmen melaksanakan pembinaan berkelanjutan, monitoring gizi tumbuh kembang, serta pemberdayaan ekonomi perempuan demi membina rumah tangga tangguh di rukun warga 015.</p>
                </div>
              </div>
            </div>

            {/* Sub Tabs Selection inside PKK */}
            <div className="flex space-x-1 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar max-w-full">
              {[
                { id: 'posyandu', label: 'Posyandu Balita/Ibu' },
                { id: 'posbindu', label: 'Posbindu Lansia/Dewasa' },
                { id: 'majelis-talim', label: 'Majelis Ta\'lim' },
                { id: 'kjs', label: 'KJS (Klub Jantung Sehat)' },
              ].map((subItem) => (
                <button
                  key={subItem.id}
                  onClick={() => setActivePKKSubTab(subItem.id as SubTab)}
                  className={`flex-1 min-w-[140px] px-3.5 py-2 text-xs font-bold rounded-lg transition-all text-center whitespace-nowrap cursor-pointer ${
                    activePKKSubTab === subItem.id
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {subItem.label}
                </button>
              ))}
            </div>

            {/* Display PKK Subtab contents dynamically */}
            <AnimatePresence mode="wait">
              {activePKKSubTab === 'posyandu' && (
                <motion.div
                  key="posyandu"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-pink-500" />
                        <h3 className="font-bold text-slate-800 text-base">Posyandu Balita RW 015</h3>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Pos Pelayanan Terpadu yang berfokus memitigasi stunting, menyediakan pemantauan berat badan balita, imunisasi dasar dasar lengkap nasional, pemberian Vitamin A, tablet tambah darah bagi ibu hamil, bimbingan Air Susu Ibu (ASI) eksklusif, serta Pemberian Makanan Tambahan (PMT) bergizi tinggi secara periodik.
                      </p>

                      <div className="pt-2 space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Fokus Layanan & Kegiatan:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Penimbangan Berat & Tinggi Balita</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Penyaluran Imunisasi Balita</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Distribusi Vitamin A & PMT Hangat</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Konseling Gizi & Tumbuh Kembang</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] text-pink-600 font-bold uppercase tracking-wider block">Pelaksanaan Rutin</span>
                        <h4 className="font-bold text-slate-800 text-sm">Minggu Kedua Setiap Bulan</h4>
                        <p className="text-xxs text-slate-450 leading-relaxed">Pukul 08.30 s.d 11.30 WIB di Balai Unit PKK RW 015</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200 space-y-2">
                        <div className="flex items-center space-x-2.5 text-xs text-slate-655">
                          <Calendar className="h-4 w-4 text-slate-450" />
                          <span>Selasa, Pekan Ke-2 Bulan Depan</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-xs text-slate-655">
                          <MapPin className="h-4 w-4 text-slate-450" />
                          <span>Gedung Sekretariat / Balai RW</span>
                        </div>
                      </div>
                      <div className="p-3 bg-pink-100/55 rounded-xl border border-pink-150 text-xxs text-pink-850 leading-normal font-medium">
                        Bawa buku KIA (Kesehatan Ibu dan Anak) / Kartu Menuju Sehat (KMS) balita Anda setiap pelaksanaan penimbangan.
                      </div>
                    </div>
                  </div>

                  {/* Struktur Pengurus Posyandu RW 015 */}
                  <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-12">
                    <div className="text-center max-w-md mx-auto">
                      <h3 className="text-2xl font-black text-slate-800 leading-tight">Bagan Struktur Organisasi Posyandu</h3>
                      <div className="text-xs font-semibold px-3 py-1 bg-pink-50 text-pink-600 rounded-full inline-block mt-2">Kader Pelaksana Pos Pelayanan Terpadu</div>
                    </div>

                    {/* Tree flow hierarchy */}
                    <div className="space-y-12">
                      {/* Level 1: Ketua Posyandu */}
                      <div className="flex flex-col items-center">
                        <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 shadow-md">
                          <img 
                            src="https://drive.google.com/thumbnail?id=182zgQGiUTkGmh4Xq3wEX9cHn8vTUMNND"
                            alt="Haniatul Masruroh"
                            referrerPolicy="no-referrer"
                            className="w-24 aspect-[3/4] sm:w-28 rounded-xl object-cover border-4 border-white"
                          />
                        </div>
                        <div className="mt-3 text-center">
                          <h4 className="font-extrabold text-slate-800 text-lg leading-snug">Haniatul Masruroh</h4>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-pink-600 text-white mt-1 inline-block uppercase tracking-wider">
                            Ketua Posyandu
                          </span>
                        </div>
                      </div>

                      {/* Connective Line to Level 2 (Desktop only helper) */}
                      <div className="hidden md:block w-px h-8 bg-pink-200 mx-auto -my-8" />

                      {/* Level 2: Sekretaris & Bendahara */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto pt-6 relative font-sans">
                        {/* Horizontal bridge line for desktop */}
                        <div className="hidden md:block absolute top-0 left-[25%] right-[25%] h-px bg-pink-200" />
                        
                        {/* Sekretaris */}
                        <div className="flex flex-col items-center relative">
                          <div className="hidden md:block absolute -top-6 w-px h-6 bg-pink-200" />
                          <img 
                            src="https://drive.google.com/thumbnail?id=1iwTiraNyJQ-E2FpnrxprZXb02_oKL1jm"
                            alt="Eva Wahyuningsih"
                            referrerPolicy="no-referrer"
                            className="w-18 aspect-[3/4] sm:w-20 rounded-xl object-cover border-2 border-pink-100 shadow-xs"
                          />
                          <div className="mt-3 text-center">
                            <h4 className="font-bold text-slate-800 text-sm">Eva Wahyuningsih</h4>
                            <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                              Sekretaris
                            </span>
                            <p className="text-[10px] text-slate-400 mt-1 leading-normal">Administrasi & Pelaporan</p>
                          </div>
                        </div>

                        {/* Bendahara */}
                        <div className="flex flex-col items-center relative">
                          <div className="hidden md:block absolute -top-6 w-px h-6 bg-pink-200" />
                          <img 
                            src="https://drive.google.com/thumbnail?id=1D39xFCxB4Xfwrl_Bywl-AOAUzk0IEFLt"
                            alt="Sri Sukatni"
                            referrerPolicy="no-referrer"
                            className="w-18 aspect-[3/4] sm:w-20 rounded-xl object-cover border-2 border-pink-100 shadow-xs"
                          />
                          <div className="mt-3 text-center">
                            <h4 className="font-bold text-slate-800 text-sm">Sri Sukatni</h4>
                            <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                              Bendahara
                            </span>
                            <p className="text-[10px] text-slate-400 mt-1 leading-normal">Keuangan & Anggaran</p>
                          </div>
                        </div>
                      </div>

                      {/* Level 3: Kader Pelaksana Posyandu */}
                      <div className="border-t border-slate-100 pt-8">
                        <h4 className="text-center font-bold text-slate-400 uppercase tracking-widest text-xs mb-8">Kader Pelaksana Posyandu</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                          {[
                            { name: "Atik Wahyuni", img: "https://drive.google.com/thumbnail?id=1JdCYXo7eaa2E4mf15hMdGL3KIz12g-kJ" },
                            { name: "Desmawati", img: "https://drive.google.com/thumbnail?id=1BsswWgBCWjBaCS-RHky5vCM8Z4ZSStlt" },
                            { name: "Novri Suryanti", img: "https://drive.google.com/thumbnail?id=1ZfonC64aN0rdn1ayVe98WarWY1UdGDu0" },
                            { name: "Nur Azizah", img: "https://drive.google.com/thumbnail?id=1xvQeJ7MTs8n3iNUAVqibyUUtl0xGBZ9r" },
                            { name: "Rani Soraya", img: "https://drive.google.com/thumbnail?id=1NU8oXoklSImthYq4YLBtInEYLFplS1ka" },
                            { name: "Sumarni", img: "https://drive.google.com/thumbnail?id=1OIIxf4qHOe1YcsuCRNq-8MWTo3lwrtyn" },
                            { name: "Yuli Herniawati", img: "https://drive.google.com/thumbnail?id=12JupNcIF5LxahuZ3fmq_Ez0pTHkl2IA-" }
                          ].map((kader, idx) => (
                            <div 
                              key={idx} 
                              className="bg-pink-50/20 border border-pink-100/50 p-4 rounded-xl flex flex-col items-center text-center hover:bg-pink-50/75 transition-all hover:-translate-y-1"
                            >
                              <img 
                                src={kader.img}
                                alt={kader.name}
                                referrerPolicy="no-referrer"
                                className="w-18 aspect-[3/4] sm:w-20 rounded-xl object-cover border-2 border-pink-100 shadow-xs mb-2"
                              />
                              <h5 className="font-extrabold text-slate-800 text-xs line-clamp-2 leading-tight min-h-[32px] flex items-center justify-center font-sans">{kader.name}</h5>
                              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100/85 px-2 py-0.5 rounded mt-1.5 inline-block font-sans">
                                Kader
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-pink-50/40 border border-pink-100/60 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-slate-600 font-sans">
                      <CheckCircle2 className="h-5 w-5 text-pink-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-700 block">Sinergi Pembinaan Kesehatan Balita:</span>
                        <p className="mt-0.5">Pengurus Posyandu berkomitmen tinggi membina tumbuh kembang, kecukupan gizi gizi, imunisasi dasar, serta kesehatan ibu-anak demi melahirkan generasi emas penerus bangsa yang sehat, cerdas, dan tangguh di lingkungan RW 015.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePKKSubTab === 'posbindu' && (
                <motion.div
                  key="posbindu"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-sky-500" />
                        <h3 className="font-bold text-slate-800 text-base">Posbindu PTM Lansia & Dewasa</h3>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Pos Pembinaan Terpadu Penyakit Tidak Menular yang memfokuskan deteksi dini pencegahan, monitoring intensif, serta pembimbingan pola hidup bagi warga dewasa rentang usia produktif dan lanjut usia. Kami membantu mengawasi masalah tekanan darah tinggi, risiko diabetes mellitus, obesitas buncit, dan ketahanan fisik umum.
                      </p>

                      <div className="pt-2 space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Pemeriksaan Rutin Yang Tersedia:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Pemeriksaan Tekanan Darah (Tensi)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Cek Gula Darah Puasa / Sewaktu</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Cek Kolesterol & Asam Urat Sederhana</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Pengukuran Lemak Tubuh & Lingkar Perut</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] text-sky-600 font-bold uppercase tracking-wider block">Pelaksanaan Rutin</span>
                        <h4 className="font-bold text-slate-800 text-sm">Minggu Ketiga Setiap Bulan</h4>
                        <p className="text-xxs text-slate-450 leading-relaxed">Pukul 09.00 s.d 12.00 WIB didampingi bidan puskesmas pembantu.</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200 space-y-2">
                        <div className="flex items-center space-x-2.5 text-xs text-slate-655">
                          <Calendar className="h-4 w-4 text-slate-450" />
                          <span>Kamis, Pekan Ke-3 Bulan Depan</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-xs text-slate-655">
                          <MapPin className="h-4 w-4 text-slate-450" />
                          <span>Halaman Gedung Serbaguna RW</span>
                        </div>
                      </div>
                      <div className="p-3 bg-sky-100/55 rounded-xl border border-sky-150 text-xxs text-sky-850 leading-normal font-medium">
                        Pemeriksaan ini bersubsidi (bebas biaya jasa cek tensi, pendaftaran, dan konsultasi, tarif strip gula-kolesterol murah meriah).
                      </div>
                    </div>
                  </div>

                  {/* Struktur Pengurus Posbindu RW 015 */}
                  <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-12">
                    <div className="text-center max-w-md mx-auto">
                      <h3 className="text-2xl font-black text-slate-800 leading-tight">Bagan Struktur Organisasi Posbindu</h3>
                      <div className="text-xs font-semibold px-3 py-1 bg-sky-50 text-sky-600 rounded-full inline-block mt-2">Kader Pelaksana Pos Pembinaan Terpadu</div>
                    </div>

                    {/* Tree flow hierarchy */}
                    <div className="space-y-12">
                      {/* Level 1: Ketua Posbindu */}
                      <div className="flex flex-col items-center">
                        <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 shadow-md">
                          <img 
                            src="https://drive.google.com/thumbnail?id=1fCpYQeYeotor5ES2F4MIuKlLS9i-tJjl"
                            alt="Dewi Tri P."
                            referrerPolicy="no-referrer"
                            className="w-24 aspect-[3/4] sm:w-28 rounded-xl object-cover border-4 border-white"
                          />
                        </div>
                        <div className="mt-3 text-center">
                          <h4 className="font-extrabold text-slate-800 text-lg leading-snug">Dewi Tri P.</h4>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-sky-600 text-white mt-1 inline-block uppercase tracking-wider">
                            Ketua Posbindu
                          </span>
                        </div>
                      </div>

                      {/* Connective Line to Level 2 (Desktop only helper) */}
                      <div className="hidden md:block w-px h-8 bg-sky-200 mx-auto -my-8" />

                      {/* Level 2: Sekretaris & Bendahara */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-6 relative font-sans">
                        {/* Horizontal bridge line for desktop */}
                        <div className="hidden md:block absolute top-0 left-[16.6%] right-[16.6%] h-px bg-sky-200" />
                        
                        {/* Sekretaris */}
                        <div className="flex flex-col items-center relative">
                          <div className="hidden md:block absolute -top-6 w-px h-6 bg-sky-200" />
                          <img 
                            src="https://drive.google.com/thumbnail?id=1uPf_oC31s-b3_gIIs2R6IWVhY0mbJ6JP"
                            alt="Eny Suciati"
                            referrerPolicy="no-referrer"
                            className="w-18 aspect-[3/4] sm:w-20 rounded-xl object-cover border-2 border-sky-100 shadow-xs"
                          />
                          <div className="mt-3 text-center">
                            <h4 className="font-bold text-slate-800 text-sm">Eny Suciati</h4>
                            <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                              Sekretaris
                            </span>
                            <p className="text-[10px] text-slate-400 mt-1 leading-normal">Administrasi & Pencatatan</p>
                          </div>
                        </div>

                        {/* Bendahara 1 */}
                        <div className="flex flex-col items-center relative">
                          <div className="hidden md:block absolute -top-6 w-px h-6 bg-sky-200" />
                          <img 
                            src="https://drive.google.com/thumbnail?id=1ac8aqWGzgG0aZUd5I-OnKKK1rK8c3_g3"
                            alt="Sumarni"
                            referrerPolicy="no-referrer"
                            className="w-18 aspect-[3/4] sm:w-20 rounded-xl object-cover border-2 border-sky-100 shadow-xs"
                          />
                          <div className="mt-3 text-center">
                            <h4 className="font-bold text-slate-800 text-sm">Sumarni</h4>
                            <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                              Bendahara 1
                            </span>
                            <p className="text-[10px] text-slate-400 mt-1 leading-normal">Keuangan & Kas 1</p>
                          </div>
                        </div>

                        {/* Bendahara 2 */}
                        <div className="flex flex-col items-center relative">
                          <div className="hidden md:block absolute -top-6 w-px h-6 bg-sky-200" />
                          <img 
                            src="https://drive.google.com/thumbnail?id=1sGlLXZ_Ua4S37Cz4gW1W398s_UrbK_3C"
                            alt="Uun Yuningsih"
                            referrerPolicy="no-referrer"
                            className="w-18 aspect-[3/4] sm:w-20 rounded-xl object-cover border-2 border-sky-100 shadow-xs"
                          />
                          <div className="mt-3 text-center">
                            <h4 className="font-bold text-slate-800 text-sm">Uun Yuningsih</h4>
                            <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                              Bendahara 2
                            </span>
                            <p className="text-[10px] text-slate-400 mt-1 leading-normal">Keuangan & Kas 2</p>
                          </div>
                        </div>
                      </div>

                      {/* Level 3: Kader Pelaksana Posbindu */}
                      <div className="border-t border-slate-100 pt-8">
                        <h4 className="text-center font-bold text-slate-400 uppercase tracking-widest text-xs mb-8">Kader Pelaksana Posbindu</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                          {[
                            { name: "Ernawati", img: "https://drive.google.com/thumbnail?id=1SjHe3io-odF2UswZU4PbZlV50M_TLHnX" },
                            { name: "Erni Suprapti", img: "https://drive.google.com/thumbnail?id=1MhOPzYC4tlmMKnxKmJr2H1S29mBgufD1" },
                            { name: "Puspa Ningsih", img: "https://drive.google.com/thumbnail?id=1d6ActG-hKcaiGXl4-_NzRXNkK1XoseZO" },
                            { name: "Sanni Noviati", img: "https://drive.google.com/thumbnail?id=1ZL-751cgNN5Hxe4K7k6QZiVPeMXEG1Tz" },
                            { name: "Sri Astuti", img: "https://drive.google.com/thumbnail?id=1GP6PBpAW3sCgs0ioy_Ouiz8OINpxJMV6" },
                            { name: "Sri Nunung", img: "https://drive.google.com/thumbnail?id=11VDogVPDNQ2jwuTAtqRgQvEfafeiLdO7" },
                            { name: "Uum Sari", img: "https://drive.google.com/thumbnail?id=15q8zdimFVRPZZdEly93vqk06tsX_HT14" }
                          ].map((kader, idx) => (
                            <div 
                              key={idx} 
                              className="bg-sky-50/20 border border-sky-100/50 p-4 rounded-xl flex flex-col items-center text-center hover:bg-sky-50/75 transition-all hover:-translate-y-1"
                            >
                              <img 
                                src={kader.img}
                                alt={kader.name}
                                referrerPolicy="no-referrer"
                                className="w-18 aspect-[3/4] sm:w-20 rounded-xl object-cover border-2 border-sky-100 shadow-xs mb-2"
                              />
                              <h5 className="font-extrabold text-slate-800 text-xs line-clamp-2 leading-tight min-h-[32px] flex items-center justify-center font-sans">{kader.name}</h5>
                              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100/85 px-2 py-0.5 rounded mt-1.5 inline-block font-sans">
                                Kader
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-sky-50/40 border border-sky-100/60 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-slate-600 font-sans">
                      <CheckCircle2 className="h-5 w-5 text-sky-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-700 block">Sinergi Pelayanan Posbindu:</span>
                        <p className="mt-0.5">Kader Posbindu berkomitmen tinggi menyelenggarakan skrining faktor risiko penyakit tidak menular guna mewujudkan kualitas hidup warga usia dewasa dan lansia di lingkungan RW 015 yang bugar, produktif, dan bahagia.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePKKSubTab === 'majelis-talim' && (
                <motion.div
                  key="majelis-talim"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-indigo-500" />
                        <h3 className="font-bold text-slate-800 text-base">Majelis Ta'lim Al-Muhajirin RW 015</h3>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Wadah silaturahmi keagamaan sekaligus pembelajaran ilmu spiritual Islam bagi warga Muslimah RW 015. Agenda menitikberatkan pada kajian akhlak, fiqih ibadah sehari-hari, latihan seni hadroh/shalawat, bakti sosial santunan yatim piatu, pembagian paket Sembako Ramadhan, serta pengajian akbar bulanan mengundang ustadz/ustadzah tamu.
                      </p>

                      <div className="pt-2 space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Agenda Rutin Pembelajaran & Sosial:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Pengajian Mingguan & Yasinan Bersama</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Kelas Tafsir Juz Amma & Belajar Tajwid</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Latihan Rutin Tim Hadroh Pengajian</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Sinergi Tabungan Kematian & Bakti Sosial</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">Pelaksanaan Rutin</span>
                        <h4 className="font-bold text-slate-800 text-sm">Setiap Sabtu Sore</h4>
                        <p className="text-xxs text-slate-450 leading-relaxed">Ba'da Ashar pukul 16.00 s.d 17.30 WIB secara bergulir atau di Musholla / Masjid setempat.</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200 space-y-2">
                        <div className="flex items-center space-x-2.5 text-xs text-slate-655">
                          <Calendar className="h-4 w-4 text-slate-450" />
                          <span>Sabtu Sore (Mingguan)</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-xs text-slate-655">
                          <MapPin className="h-4 w-4 text-slate-450" />
                          <span>Masjid Jami' Sektor Cluster Barat</span>
                        </div>
                      </div>
                      <div className="p-3 bg-indigo-100/55 rounded-xl border border-indigo-150 text-xxs text-indigo-850 leading-normal font-medium">
                        Terbuka untuk semua saudari muslimah warga RW 015 untuk mempererat ukhuwah islamiyah dalam bertetangga.
                      </div>
                    </div>
                  </div>

                  {/* Struktur Pengurus Majelis Ta'lim RW 015 */}
                  <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-12">
                    <div className="text-center max-w-md mx-auto">
                      <h3 className="text-2xl font-black text-slate-800 leading-tight">Bagan Struktur Organisasi Majelis Ta'lim</h3>
                      <div className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full inline-block mt-2">Daftar Pengurus Majelis Ta'lim Al-Muhajirin</div>
                    </div>

                    {/* Tree flow hierarchy */}
                    <div className="space-y-12">
                      {/* Level 1: Ketua Majelis Ta'lim */}
                      <div className="flex flex-col items-center">
                        <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-md">
                          <img 
                            src="https://drive.google.com/thumbnail?id=1mCGlrJC0Ok7V1jpWQtw7-wlbtecIzyI8"
                            alt="Siti Nurrohmah"
                            referrerPolicy="no-referrer"
                            className="w-24 aspect-[3/4] sm:w-28 rounded-xl object-cover border-4 border-white"
                          />
                        </div>
                        <div className="mt-3 text-center">
                          <h4 className="font-extrabold text-slate-800 text-lg leading-snug">Siti Nurrohmah</h4>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-indigo-600 text-white mt-1 inline-block uppercase tracking-wider">
                            Ketua Majelis Ta'lim
                          </span>
                        </div>
                      </div>

                      {/* Connective Line to Level 2 (Desktop only helper) */}
                      <div className="hidden md:block w-px h-8 bg-indigo-200 mx-auto -my-8" />

                      {/* Level 2: Sekretaris & Bendahara */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto pt-6 relative font-sans">
                        {/* Horizontal bridge line for desktop */}
                        <div className="hidden md:block absolute top-0 left-[25%] right-[25%] h-px bg-indigo-200" />
                        
                        {/* Sekretaris */}
                        <div className="flex flex-col items-center relative">
                          <div className="hidden md:block absolute -top-6 w-px h-6 bg-indigo-200" />
                          <img 
                            src="https://drive.google.com/thumbnail?id=1zN2giObeET5EfzIWs53RswV9fhyviCr-"
                            alt="Pipit Riyahapita"
                            referrerPolicy="no-referrer"
                            className="w-18 aspect-[3/4] sm:w-20 rounded-xl object-cover border-2 border-indigo-100 shadow-xs"
                          />
                          <div className="mt-3 text-center">
                            <h4 className="font-bold text-slate-800 text-sm">Pipit Riyahapita</h4>
                            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                              Sekretaris
                            </span>
                            <p className="text-[10px] text-slate-400 mt-1 leading-normal">Administrasi & Pencatatan</p>
                          </div>
                        </div>

                        {/* Bendahara */}
                        <div className="flex flex-col items-center relative">
                          <div className="hidden md:block absolute -top-6 w-px h-6 bg-indigo-200" />
                          <img 
                            src="https://drive.google.com/thumbnail?id=1tmPEwxOrkpN2hD1NUhfL14PVQMXDLL0N"
                            alt="Rosmaria"
                            referrerPolicy="no-referrer"
                            className="w-18 aspect-[3/4] sm:w-20 rounded-xl object-cover border-2 border-indigo-100 shadow-xs"
                          />
                          <div className="mt-3 text-center">
                            <h4 className="font-bold text-slate-800 text-sm">Rosmaria</h4>
                            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                              Bendahara
                            </span>
                            <p className="text-[10px] text-slate-400 mt-1 leading-normal">Keuangan & Kas Utama</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-50/40 border border-indigo-100/60 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-slate-600 font-sans">
                      <CheckCircle2 className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-700 block">Sinergi Pembinaan Spiritual:</span>
                        <p className="mt-0.5">Pengurus Majelis Ta'lim berkomitmen tinggi membina keimanan, ketaqwaan, serta ukhuwah islamiyah demi meningkatkan kualitas kehidupan beragama yang toleran, damai, dan harmonis di lingkungan RW 015.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activePKKSubTab === 'kjs' && (
                <motion.div
                  key="kjs"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                      <div className="flex items-center space-x-2">
                        <HeartHandshake className="h-4 w-4 text-rose-500" />
                        <h3 className="font-bold text-slate-800 text-base">KJS (Klub Jantung Sehat) PG-015</h3>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Klub Jantung Sehat (KJS) adalah cabang olahraga kemasyarakatan yang mewadahi senam aerobik, senam bugar, dan senam jantung sehat bersama demi melancarkan peredaran darah, mereduksi stres perkotaan, menjaga kebugaran lansia, serta memupuk kerukunan sosial di antara para tetangga.
                      </p>

                      <div className="pt-2 space-y-3">
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">Aktivitas & Fasilitas Senam:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Senam Jantung Sehat Seri I, II, III</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Senam Aerobik Segar & Pendinginan Musik</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Instruktur Senam Berlisensi Ramah</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            <span>Pojok Edukasi Hidup Sehat & Air Hangat</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-150 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] text-rose-600 font-bold uppercase tracking-wider block">Pelaksanaan Rutin</span>
                        <h4 className="font-bold text-slate-800 text-sm">Setiap Minggu Pagi</h4>
                        <p className="text-xxs text-slate-450 leading-relaxed">Pukul 06.00 s.d 07.15 WIB bertempat di Lapangan Olahraga / Lapangan Utama RT 008.</p>
                      </div>
                      <div className="pt-2 border-t border-slate-200 space-y-2">
                        <div className="flex items-center space-x-2.5 text-xs text-slate-655">
                          <Calendar className="h-4 w-4 text-slate-450" />
                          <span>Masing-masing Hari Minggu Pagi</span>
                        </div>
                        <div className="flex items-center space-x-2.5 text-xs text-slate-655">
                          <MapPin className="h-4 w-4 text-slate-450" />
                          <span>Lapangan Utama Fasum RT 008 / RT 015</span>
                        </div>
                      </div>
                      <div className="p-3 bg-rose-100/55 rounded-xl border border-rose-150 text-xxs text-rose-850 leading-normal font-medium">
                        Direkomendasikan menggunakan sepatu olahraga dan berpakaian olahraga sopan. Terbuka gratis untuk umum segala usia!
                      </div>
                    </div>
                  </div>

                  {/* Struktur Pengurus KJS RW 015 */}
                  <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-12">
                    <div className="text-center max-w-md mx-auto">
                      <h3 className="text-2xl font-black text-slate-800 leading-tight">Bagan Struktur Organisasi KJS</h3>
                      <div className="text-xs font-semibold px-3 py-1 bg-rose-50 text-rose-600 rounded-full inline-block mt-2">Daftar Pengurus Klub Jantung Sehat (KJS)</div>
                    </div>

                    {/* Tree flow hierarchy */}
                    <div className="space-y-12">
                      {/* Level 1: Ketua KJS */}
                      <div className="flex flex-col items-center">
                        <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 shadow-md">
                          <img 
                            src="https://drive.google.com/thumbnail?id=1G5ytxnM56NUZoDPmGlfcF9pTFs16xG4h"
                            alt="Uum Sari"
                            referrerPolicy="no-referrer"
                            className="w-24 aspect-[3/4] sm:w-28 rounded-xl object-cover border-4 border-white"
                          />
                        </div>
                        <div className="mt-3 text-center">
                          <h4 className="font-extrabold text-slate-800 text-lg leading-snug">Uum Sari</h4>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-rose-600 text-white mt-1 inline-block uppercase tracking-wider">
                            Ketua KJS
                          </span>
                        </div>
                      </div>

                      {/* Connective Line to Level 2 (Desktop only helper) */}
                      <div className="hidden md:block w-px h-8 bg-rose-200 mx-auto -my-8" />

                      {/* Level 2: Sekretaris */}
                      <div className="flex flex-col items-center relative font-sans">
                        <div className="hidden md:block absolute -top-8 w-px h-8 bg-rose-200" />
                        <img 
                          src="https://drive.google.com/thumbnail?id=1MisIRXirwcTS4VLAPg7G67Pwh2cyTNyL"
                          alt="Erry Yuliana"
                          referrerPolicy="no-referrer"
                          className="w-18 aspect-[3/4] sm:w-20 rounded-xl object-cover border-2 border-rose-100 shadow-xs"
                        />
                        <div className="mt-3 text-center">
                          <h4 className="font-bold text-slate-800 text-sm">Erry Yuliana</h4>
                          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                            Sekretaris
                          </span>
                          <p className="text-[10px] text-slate-400 mt-1 leading-normal">Administrasi & Kegiatan Operasional</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-rose-50/40 border border-rose-100/60 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-slate-600 font-sans">
                      <CheckCircle2 className="h-5 w-5 text-rose-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-slate-700 block">Sinergi Hidup Sehat & Bugar:</span>
                        <p className="mt-0.5">Pengurus KJS berkomitmen penuh untuk mengampanyekan gaya hidup aktif secara berkala demi kebugaran kardiovaskular serta menggalang kebersamaan hangat antarwarga di lingkungan RW 015 Pesona Gading Cibitung.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {activeTab === 'pemuda-olahraga' && (
          <motion.div
            key="pemuda-olahraga"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* Left Content Card */}
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-blue-600" />
                    <span>Seksi Pemuda & Olahraga (Karang Taruna)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Pengembangan Potensi, Kreativitas, & Kebugaran Generasi Muda</p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Seksi Pemuda & Olahraga RW 015 mengoordinasikan wadah organisasi kepemudaan (Karang Taruna Unit RW 015) untuk menyalurkan minat bakat positif, membiasakan pola hidup bugar aktif melalui sarana olahraga ramah warga, serta melatih kepemimpinan kolektif demi masa depan lingkungan yang harmonis dan unggul.
                </p>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Fokus Program Kerja & Peran Strategis:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Pembinaan Pemuda Lewat Karang Taruna RW 015',
                      'Pengelolaan & Pemeliharaan Sarana Lapangan Olahraga',
                      'Penyelenggaraan Turnamen Tahunan (RW 015 Cup & HUT RI)',
                      'Latihan Olahraga Terjadwal (Voli, Bulutangkis, Tenis Meja)',
                      'Pemberdayaan Kreativitas Seni, Musik, & Konten Digital',
                      'Aksi Tanggap Gotong-Royong Lindungi Lingkungan'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-slate-600 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info Board */}
                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-start space-x-3 text-xs leading-relaxed text-slate-600">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-slate-700 block">Terbuka Untuk Seluruh Pemuda:</span>
                    <p className="mt-0.5">Seluruh pemuda-pemudi usia sekolah hingga pekerja mandiri di wilayah RT 001 - RT 014 secara otomatis terhitung sebagai keluarga besar Karang Taruna RW 015 dan sangat dipersilakan bergabung dalam kegiatan kepemudaan.</p>
                  </div>
                </div>
              </div>

              {/* Agenda Kegiatan */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2">Jadwal Latihan & Kegiatan Rutin</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-start sm:items-center p-3.5 bg-slate-50 rounded-xl hover:bg-slate-150/40 transition-colors gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 text-sm">Latihan Rutin Bola Voli</h4>
                      <p className="text-xs text-slate-450">Buka bersama bagi seluruh warga RW 015 tanpa batasan usia.</p>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 font-mono font-bold text-xxs uppercase rounded-full shrink-0">Sabtu & Minggu Sore</span>
                  </div>
                  <div className="flex justify-between items-start sm:items-center p-3.5 bg-slate-50 rounded-xl hover:bg-slate-150/40 transition-colors gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 text-sm">Latihan Bulutangkis & Tenis Meja</h4>
                      <p className="text-xs text-slate-455 font-normal">Sparing latihan internal antar RT di lingkungan klaster RW.</p>
                    </div>
                    <span className="px-2.5 py-1 bg-slate-200 text-slate-700 font-mono font-bold text-xxs uppercase rounded-full shrink-0">Minggu Pagi</span>
                  </div>
                  <div className="flex justify-between items-start sm:items-center p-3.5 bg-slate-50 rounded-xl hover:bg-slate-150/40 transition-colors gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-700 text-sm">Rapat Kerja Karang Taruna</h4>
                      <p className="text-xs text-slate-455 font-normal">Koordinasi bulanan pengurus unit, penyusunan agenda lingkungan dan sosial.</p>
                    </div>
                    <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 font-mono font-bold text-xxs uppercase rounded-full shrink-0">Minggu Ke-1, Sabtu Malam</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side data for Youth/Sports */}
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-100 text-blue-900 p-6 rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                <div className="flex items-center space-x-2 text-blue-600 text-xs font-bold uppercase tracking-wider">
                  <Star className="h-4 w-4" />
                  <span>Sinergi Prestasi</span>
                </div>
                <h3 className="text-base font-bold text-blue-900 leading-snug">Aktif, Berprestasi & Tangguh</h3>
                <p className="text-xs text-blue-800 font-normal leading-relaxed">
                  Selain menyelenggarakan turnamen akbar Agustusan, tim bola voli dan futsal pemuda RW 015 secara aktif mewakili kontingen RW dalam perlombaan persahabatan tingkat Desa Wanajaya & Kecamatan Cibitung.
                </p>
                <div className="pt-2 text-xxs font-mono font-semibold text-blue-600 uppercase">Sekretariat Karang Taruna PG-015</div>
              </div>

              {/* Sarpras Olahraga */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-4">
                <h4 className="text-xs font-bold text-slate-655 uppercase tracking-wider">Inventaris & Sarana Olahraga</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-600">
                    <span>Lapangan Voli Utama</span>
                    <strong className="text-slate-800 font-mono">1 Titik (RT 008)</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-600">
                    <span>Lapangan Bulutangkis</span>
                    <strong className="text-slate-800 font-mono">2 Lokasi (RT 005, RT 011)</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-600">
                    <span>Tenis Meja & Sound System Jaga</span>
                    <strong className="text-slate-800 font-mono">2 Set (Aula Balai RW)</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-50 text-slate-600">
                    <span>Karang Taruna Aktif</span>
                    <strong className="text-slate-800 font-mono font-semibold">55+ Personel</strong>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Simple Helper mock for missing icon in header mapping context
function Landmark({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="9" y1="21" x2="9" y2="11" />
      <line x1="15" y1="21" x2="15" y2="11" />
      <path d="M19 21V10a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v11" />
      <path d="M12 2L2 7h20L12 2z" />
    </svg>
  );
}
