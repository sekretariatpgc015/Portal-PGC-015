import { useState, MouseEvent } from 'react';
import { Eye, ChevronLeft, ChevronRight, X, Calendar, MapPin, Download } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { getGoogleDriveImageUrl } from '../utils/googleDrive';

export default function GaleriSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['Semua', 'Kegiatan', 'Sosial', 'Keagamaan', 'Lainnya'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    return selectedCategory === 'Semua' || item.category === selectedCategory;
  });

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIndex) => 
        prevIndex === 0 ? filteredItems.length - 1 : prevIndex! - 1
      );
    }
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prevIndex) => 
        prevIndex === filteredItems.length - 1 ? 0 : prevIndex! + 1
      );
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Banner / Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-8 sm:p-10 text-white shadow-md">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10 space-y-2">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-100">Dokumentasi Visual</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Galeri Kegiatan</h1>
          <p className="text-slate-100 text-sm sm:text-base max-w-xl font-light">
            Lembar dokumentasi visual berbagai momentum gotong-royong, aksi sosial, hari raya, dan rapat pengambilan keputusan besar di RW 015 Pesona Gading Cibitung.
          </p>
        </div>
      </div>

      {/* Styled filter tabs centered */}
      <div className="flex justify-center">
        <div className="bg-white px-2 py-1.5 rounded-2xl border border-slate-100 shadow-xs flex gap-1 sm:gap-2 overflow-x-auto max-w-full scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-805'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Bento grid of gallery files */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div 
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:border-blue-100 hover:shadow-md transition-all cursor-pointer aspect-4/3"
          >
            <img 
              src={getGoogleDriveImageUrl(item.image)} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark overlay showing on hover */}
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="p-3 bg-white/20 backdrop-blur-xs rounded-full text-white scale-90 group-hover:scale-100 transition-transform">
                <Eye className="h-6 w-6" />
              </div>
            </div>

            {/* Float category tag */}
            <span className="absolute top-3 left-3 text-sm font-black uppercase text-white bg-blue-600 px-2.5 py-1 rounded-md tracking-wider">
              {item.category}
            </span>

            {/* Bottom descriptions */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent p-4 sm:p-5 text-white">
              <h4 className="font-extrabold text-xs sm:text-sm tracking-wide line-clamp-1">{item.title}</h4>
              <p className="text-xxs text-slate-300 mt-1 line-clamp-1 font-light">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center pt-4">
        <button className="px-6 py-2.5 border border-slate-200 text-slate-605 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
          Lihat Galeri Lainnya
        </button>
      </div>

      {/* Full lightbox overlay slider */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xs flex flex-col justify-between p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top layout inside lightbox */}
          <div className="flex justify-between items-center text-white px-2 py-1">
            <div className="text-xs font-semibold text-slate-350">
              Dokumentasi {lightboxIndex + 1} dari {filteredItems.length}
            </div>
            <button 
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Core slider layout with slide buttons */}
          <div className="flex-1 flex items-center justify-between relative max-w-5xl mx-auto w-full">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white shadow-md z-10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="relative max-h-[75vh] w-full flex items-center justify-center p-4">
              <img 
                src={getGoogleDriveImageUrl(filteredItems[lightboxIndex].image)} 
                alt={filteredItems[lightboxIndex].title} 
                className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <button 
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white shadow-md z-10 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Lightbox bottom text cards */}
          <div className="max-w-3xl mx-auto w-full text-center text-white pb-6 space-y-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-xxs font-black uppercase text-blue-400 bg-blue-900/40 border border-blue-500/30 px-3 py-1 rounded-full">
              {filteredItems[lightboxIndex].category}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-wide mt-2">{filteredItems[lightboxIndex].title}</h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light max-w-xl mx-auto">{filteredItems[lightboxIndex].description}</p>
            
            <div className="flex justify-center items-center gap-6 text-xxs text-slate-400 pt-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-blue-400" />
                28 Mei 2026
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-blue-400" />
                RW 015 Pesona Gading Cibitung
              </span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
