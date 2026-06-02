import { 
  ArrowRight, Landmark, Megaphone, FileText, Calendar, 
  MapPin, CheckCircle, Eye, Users, ChevronRight 
} from 'lucide-react';
import { NEWS_ITEMS, ANNOUNCEMENTS } from '../data';
import { ActiveTab } from '../types';
import { useDemografi } from '../hooks/useDemografi';
import { getGoogleDriveImageUrl } from '../utils/googleDrive';

interface BerandaSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function BerandaSection({ setActiveTab }: BerandaSectionProps) {
  const { stats, loading } = useDemografi();
  
  // Take latest 3 news items
  const recentNews = NEWS_ITEMS.slice(0, 3);
  
  // Take latest 2 announcements
  const recentAnnouncements = ANNOUNCEMENTS.slice(0, 2);

  const dynamicStats = [
    { id: '1', label: 'RT', value: loading ? '...' : stats.rt.toString() },
    { id: '2', label: 'Kepala Keluarga', value: loading ? '...' : stats.kepalaKeluarga.toLocaleString('id-ID') },
    { id: '3', label: 'Jiwa', value: loading ? '...' : stats.jiwa.toLocaleString('id-ID') },
    { id: '4', label: 'Luas Wilayah', value: stats.luasWilayah }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      
      {/* 1. Immersive Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white py-16 px-6 sm:px-12 lg:px-16 shadow-lg border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/35 via-slate-950 to-slate-950" />
        
        {/* Dynamic mesh graphic background */}
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="flex items-center space-x-2.5 w-fit px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full">
            <img 
              src={getGoogleDriveImageUrl("https://drive.google.com/thumbnail?id=17G7evIeHShfqn7aSm7L1mfgjlb1hStya")} 
              alt="Logo RW 015"
              className="h-4 w-4 object-contain bg-white rounded-md p-0.5" 
              referrerPolicy="no-referrer"
            />
            <span className="text-xxs font-extrabold uppercase tracking-widest">Portal Warga Pesona Gading Cibitung</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight sm:leading-none">
            <span className="block">Selamat Datang di</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 mt-1 sm:mt-2">Portal RW 015</span>
          </h1>
          
          <p className="text-slate-350 text-sm sm:text-base leading-relaxed font-light">
            Solusi integrasi administrasi warga, informasi pembangunan kedaerahan, update berita gotong royong, pemberitahuan pengumuman resmi, kemitraan sosial, dan keterbukaan layanan kependudukan secara digital mandiri.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => setActiveTab('layanan')}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Ajukan Surat Mandiri</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveTab('profil')}
              className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              Kenali RW 015
            </button>
          </div>
        </div>
      </section>

      {/* 2. Demographic Statistics Highlights - Bento Style */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Sekilas Wilayah RW 015</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Metrik pokok kependudukan dan ruang lingkup geografis administratif.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {dynamicStats.map((stat) => (
            <div 
              key={stat.id} 
              className="p-5 rounded-2xl bg-blue-50/45 hover:bg-blue-50 border border-blue-100/50 transition-all text-center"
            >
              <span className="text-2xl sm:text-3.5xl font-black text-blue-600 block">{stat.value}</span>
              <span className="text-slate-500 text-xxs sm:text-xs font-bold uppercase tracking-wider block mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Two columns: Latest Announcements & Quick Service links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Latest Announcements list (span 7) */}
        <section className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-105 shadow-xs space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-50">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">Pengumuman Terbaru</h2>
              <p className="text-xxs sm:text-xs text-slate-450">Imbauan resmi teraktual pengurus RW 015.</p>
            </div>
            <button 
              onClick={() => setActiveTab('pengumuman')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
            >
              <span>Semua</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {recentAnnouncements.map((item) => (
              <div 
                key={item.id}
                onClick={() => setActiveTab('pengumuman')}
                className="p-4 rounded-xl border border-slate-50 hover:border-blue-100 bg-slate-50/50 hover:bg-white transition-all cursor-pointer flex gap-4"
              >
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg h-fit">
                  <Megaphone className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center justify-between text-xxs text-slate-400 font-semibold gap-2">
                    <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider text-[10px] border border-blue-100/50">{item.category}</span>
                    <span className="text-sm font-semibold">{item.date}</span>
                  </div>
                  <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm line-clamp-1">{item.title}</h4>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Menu shortcuts (span 5) */}
        <section className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-105 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">Layanan Mandiri</h2>
            <p className="text-xxs sm:text-xs text-slate-450">Tautan cepat pengurusan izin kependudukan.</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {[
              { label: 'Surat Pengantar', tab: 'layanan' as const },
              { label: 'Surat Keterangan Domisili', tab: 'layanan' as const },
              { label: 'Surat Keterangan Usaha', tab: 'layanan' as const }
            ].map((srv, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(srv.tab)}
                className="w-full p-4 rounded-xl border border-slate-50 hover:border-blue-100/70 hover:bg-blue-50/20 text-left flex items-center justify-between transition-all cursor-pointer group"
              >
                <div className="flex items-center space-x-3 text-slate-700">
                  <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold group-hover:text-blue-600 transition-colors">{srv.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
              </button>
            ))}
          </div>

          {/* Quick call help center banner */}
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl text-center">
            <p className="text-xs text-blue-800 font-semibold leading-relaxed">
              Semua pelayanan reguler di website ini gratis tanpa dipungut biaya sepeser pun.
            </p>
          </div>
        </section>

      </div>

      {/* 4. Latest News Grid highlights */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Kilas Berita RW 015</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Dokumentasi liputan kegiatan gotong-royong dan kemajuan wilayah.</p>
          </div>
          <button 
            onClick={() => setActiveTab('berita')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
          >
            <span>Semua Berita</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentNews.map((news) => (
            <article 
              key={news.id}
              onClick={() => setActiveTab('berita')}
              className="bg-white rounded-2xl border border-slate-100 hover:border-blue-100 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="aspect-video relative overflow-hidden">
                  <img src={getGoogleDriveImageUrl(news.image)} alt={news.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {news.tag}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-semibold uppercase">
                    <Calendar className="h-3 w-3" />
                    <span>{news.date}</span>
                  </div>
                  <h4 className="font-extrabold text-slate-850 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-light">{news.description}</p>
                </div>
              </div>
              <div className="p-4 pt-0 mt-1 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Selengkapnya</span>
                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
