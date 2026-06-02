import { useState, useEffect } from 'react';
import { Search, Calendar, ChevronRight, X, Clock, User, Share2, Megaphone, MapPin, Bell, MessageSquare, Newspaper } from 'lucide-react';
import { NEWS_ITEMS, ANNOUNCEMENTS } from '../data';
import { NewsItem } from '../types';
import { getGoogleDriveImageUrl } from '../utils/googleDrive';

interface BeritaSectionProps {
  key?: string;
  initialSubTab?: 'berita' | 'pengumuman';
}

export default function BeritaSection({ initialSubTab = 'berita' }: BeritaSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<'berita' | 'pengumuman'>(initialSubTab);

  // Sync state with prop if prop changes or when component mounts/is rendered
  useEffect(() => {
    setActiveSubTab(initialSubTab);
  }, [initialSubTab]);

  // Berita State & Logic
  const [newsSearchQuery, setNewsSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('Semua');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const newsCategories = ['Semua', 'Kegiatan', 'Informasi', 'Kesehatan', 'Pembangunan', 'Sosial', 'Keamanan'];

  const filteredNews = NEWS_ITEMS.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(newsSearchQuery.toLowerCase()) || 
                          news.description.toLowerCase().includes(newsSearchQuery.toLowerCase());
    const matchesTag = selectedTag === 'Semua' || news.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  // Pengumuman State & Logic
  const [announcementSearchQuery, setAnnouncementSearchQuery] = useState('');
  const [selectedAnnCategory, setSelectedAnnCategory] = useState<string>('Semua');
  const [expandedAnnId, setExpandedAnnId] = useState<string | null>(null);

  const annCategories = ['Semua', 'Kegiatan', 'Informasi', 'Keamanan', 'Keuangan', 'Lainnya'];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Keamanan':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'Keuangan':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Kegiatan':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const filteredAnnouncements = ANNOUNCEMENTS.filter((item) => {
    const matchesCategory = selectedAnnCategory === 'Semua' || 
                            item.category === selectedAnnCategory || 
                            (selectedAnnCategory === 'Lainnya' && item.category === 'Umum');
    const matchesSearch = item.title.toLowerCase().includes(announcementSearchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(announcementSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 animate-fade-in animate-duration-300">
      {/* Banner / Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-8 sm:p-10 text-white shadow-md">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10 space-y-2">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-100 font-sans">Pusat Informasi Warga</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Berita & Pengumuman</h1>
          <p className="text-slate-100 text-sm sm:text-base max-w-xl font-light font-sans">
            Informasi resmi, dokumen kebijakan, pelaporan kegiatan pembangunan, dan berita rukun tetangga terbaru di lingkungan RW 015.
          </p>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveSubTab('berita')}
          className={`flex items-center space-x-2 px-6 py-3.5 border-b-2 text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === 'berita'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Newspaper className="h-4.5 w-4.5" />
          <span>Berita Kegiatan</span>
        </button>
        <button
          onClick={() => setActiveSubTab('pengumuman')}
          className={`flex items-center space-x-2 px-6 py-3.5 border-b-2 text-sm font-bold transition-all cursor-pointer ${
            activeSubTab === 'pengumuman'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Megaphone className="h-4.5 w-4.5" />
          <span>Pengumuman Resmi</span>
        </button>
      </div>

      {/* Content Rendering based on Active Sub-Tab */}
      {activeSubTab === 'berita' ? (
        <div className="space-y-8 animate-fade-in">
          {/* Search and Category Filters */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Custom search bar */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
                <input 
                  type="text"
                  value={newsSearchQuery}
                  onChange={(e) => setNewsSearchQuery(e.target.value)}
                  placeholder="Cari berita..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
              </div>

              {/* Quick list of Tags */}
              <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                {newsCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedTag(cat)}
                    className={`text-xs px-3 py-2 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      selectedTag === cat 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid of news articles */}
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news) => (
                <article 
                  key={news.id}
                  onClick={() => setSelectedNews(news)}
                  className="bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md hover:border-blue-100/70 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={getGoogleDriveImageUrl(news.image)} 
                        alt={news.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-sm font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                        {news.tag}
                      </span>
                    </div>
                    
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center space-x-2 text-xxs text-slate-500 font-semibold uppercase tracking-wider">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{news.date}</span>
                      </div>
                      <h3 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                        {news.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {news.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 mt-2 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span>Baca Selengkapnya</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-3">
              <p className="text-slate-500 font-medium">Maaf, berita yang Anda cari tidak ditemukan.</p>
              <button 
                onClick={() => { setNewsSearchQuery(''); setSelectedTag('Semua'); }}
                className="text-xs px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-bold transition-colors cursor-pointer"
              >
                Reset Pencarian
              </button>
            </div>
          )}

          {/* View More Button */}
          <div className="text-center pt-4">
            <button className="px-6 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
              Lihat Berita Lainnya
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fade-in">
          {/* Left Sidebar filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-1.5">
              <h3 className="px-3 pb-3 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-50">Kategori</h3>
              {annCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedAnnCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    selectedAnnCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedAnnCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              ))}
            </div>

            {/* Dapatkan Update: Join WhatsApp */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs text-center space-y-4">
              <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Bell className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-800 text-sm">Dapatkan Update</h4>
                <p className="text-slate-500 text-xxs leading-relaxed">Ikuti informasi resmi langsung dari RW 015 Pesona Gading Cibitung via WhatsApp Group.</p>
              </div>
              <a 
                href="https://chat.whatsapp.com/mock-link-rw015"
                target="_blank"
                rel="noreferrer"
                className="w-full justify-center inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Gabung Sekarang</span>
              </a>
            </div>
          </div>

          {/* Right content list */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top layout search bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5" />
                <input 
                  type="text"
                  value={announcementSearchQuery}
                  onChange={(e) => setAnnouncementSearchQuery(e.target.value)}
                  placeholder="Cari kata kunci pengumuman..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((item) => {
                  const isExpanded = expandedAnnId === item.id;
                  return (
                    <div 
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden hover:border-blue-100 hover:shadow-md transition-all"
                    >
                      {/* Collapsed top bar */}
                      <div 
                        onClick={() => setExpandedAnnId(isExpanded ? null : item.id)}
                        className="p-5 flex items-start gap-4 cursor-pointer select-none"
                      >
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl flex-shrink-0">
                          <Megaphone className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`text-xxs px-2.5 py-0.5 rounded-md font-bold border ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                            <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">{item.date}</span>
                          </div>
                          <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-snug truncate">
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      {/* Expanded details below */}
                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 border-t border-slate-50 space-y-4 animate-slide-down">
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100 font-light font-sans">
                            {item.description}
                          </p>

                          {/* Schedule detail boxes if present */}
                          {(item.time || item.location) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                              {item.time && (
                                <div className="flex items-center space-x-2.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                  <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                  <div>
                                    <span className="block font-bold text-slate-400 uppercase text-[10px]">Waktu Mulai</span>
                                    <span className="font-semibold text-slate-700">{item.time}</span>
                                  </div>
                                </div>
                              )}
                              {item.location && (
                                <div className="flex items-center space-x-2.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                  <MapPin className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                  <div>
                                    <span className="block font-bold text-slate-400 uppercase text-[10px]">Tempat Pelaksanaan</span>
                                    <span className="font-semibold text-slate-700">{item.location}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-500">
                  Belum ada pengumuman untuk kriteria pencarian ini.
                </div>
              )}
            </div>

            {/* Load more button */}
            <div className="text-center pt-4">
              <button className="px-6 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                Lihat Pengumuman Lainnya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Reader Modal overlay */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-3xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-xl border border-slate-100 overflow-hidden my-8 leading-relaxed">
            
            {/* Header banner image inside panel */}
            <div className="relative aspect-video">
              <img 
                src={getGoogleDriveImageUrl(selectedNews.image)} 
                alt={selectedNews.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-5">
                <span className="bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wide">
                  {selectedNews.tag}
                </span>
              </div>
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors cursor-pointer animate-fade-in"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Read content details */}
            <div className="p-6 space-y-5">
              <div className="flex flex-wrap gap-4 items-center text-xs text-slate-500 font-semibold border-b border-slate-50 pb-4">
                <div className="flex items-center space-x-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedNews.date}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="h-4 w-4" />
                  <span>Ditinjau 3 Menit Lalu</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <User className="h-4 w-4" />
                  <span>Admin RW 015</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight">
                  {selectedNews.title}
                </h2>
                <p className="text-slate-750 text-sm sm:text-base leading-relaxed text-justify whitespace-pre-line font-light font-sans">
                  {selectedNews.content}
                </p>
              </div>

              {/* Share actions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 text-xs text-slate-500 font-medium font-sans">
                <span>Desa Wanajaya • Kecamatan Cibitung</span>
                <button 
                  onClick={() => alert('Pranala berita disalin ke papan klip!')}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg cursor-pointer font-bold font-sans"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Bagikan Berita</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
