import { useState, MouseEvent } from 'react';
import { Eye, ChevronLeft, ChevronRight, X, Calendar, MapPin, Layers } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { getGoogleDriveImageUrl } from '../utils/googleDrive';
import { GalleryItem } from '../types';

interface GalleryCardProps {
  key?: string;
  item: GalleryItem;
  onView: (nestedIndex: number) => void;
}

function GalleryCard({ item, onView }: GalleryCardProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const hasSubImages = !!(item.images && item.images.length > 0);
  const currentImage = hasSubImages ? item.images![currentSlide].image : item.image;
  const currentTitle = hasSubImages ? `${item.title}: ${item.images![currentSlide].title}` : item.title;
  const currentDesc = hasSubImages ? item.images![currentSlide].description : item.description;

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (hasSubImages) {
      setCurrentSlide((prev) => (prev === 0 ? item.images!.length - 1 : prev - 1));
    }
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (hasSubImages) {
      setCurrentSlide((prev) => (prev === item.images!.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div 
      onClick={() => onView(currentSlide)}
      className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:border-blue-150 hover:shadow-md transition-all cursor-pointer aspect-[4/3]"
    >
      <img 
        src={getGoogleDriveImageUrl(currentImage)} 
        alt={currentTitle} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Dark overlay showing on hover */}
      <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="p-3 bg-white/20 backdrop-blur-xs rounded-full text-white scale-90 group-hover:scale-100 transition-transform">
          <Eye className="h-6 w-6" />
        </div>
      </div>

      {/* Float category & count tag */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
        <span className="text-xxs font-black uppercase text-white bg-blue-600 px-2.5 py-1 rounded-md tracking-wider">
          {item.category}
        </span>
        {hasSubImages && (
          <span className="text-xxs font-black uppercase text-white bg-slate-900/85 backdrop-blur-xs px-2 py-1 rounded-md tracking-wider flex items-center gap-1">
            <Layers className="h-3 w-3 text-blue-400" />
            {item.images!.length} Foto
          </span>
        )}
      </div>

      {/* Slide Navigation inside card */}
      {hasSubImages && (
        <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-full bg-white/95 text-slate-800 hover:bg-white shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-full bg-white/95 text-slate-800 hover:bg-white shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Slide dots indicators */}
      {hasSubImages && (
        <div className="absolute top-3 right-3 flex gap-1 bg-slate-950/40 backdrop-blur-xs px-2.5 py-1.5 rounded-full z-10">
          {item.images!.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-blue-400 w-3' : 'bg-white/60'}`}
            />
          ))}
        </div>
      )}

      {/* Bottom descriptions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 sm:p-5 text-white z-10 pt-12">
        <h4 className="font-extrabold text-xs sm:text-sm tracking-wide line-clamp-1">{currentTitle}</h4>
        <p className="text-xxs text-slate-300 mt-1 line-clamp-1 font-light">{currentDesc}</p>
      </div>
    </div>
  );
}

export default function GaleriSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [nestedIndex, setNestedIndex] = useState<number>(0);

  const categories = ['Semua', 'Kegiatan', 'Sosial', 'Keagamaan', 'Lainnya'];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    return selectedCategory === 'Semua' || item.category === selectedCategory;
  });

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;
  const hasSubImages = !!(currentItem?.images && currentItem.images.length > 0);

  const activeImage = currentItem 
    ? (hasSubImages ? currentItem.images![nestedIndex].image : currentItem.image)
    : '';
  const activeTitle = currentItem 
    ? (hasSubImages ? `${currentItem.title} - ${currentItem.images![nestedIndex].title}` : currentItem.title)
    : '';
  const activeDesc = currentItem 
    ? (hasSubImages ? currentItem.images![nestedIndex].description : currentItem.description)
    : '';

  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null || !currentItem) return;

    if (hasSubImages) {
      setNestedIndex((prev) => 
        prev === 0 ? currentItem.images!.length - 1 : prev - 1
      );
    } else {
      setLightboxIndex((prevIndex) => 
        prevIndex === 0 ? filteredItems.length - 1 : prevIndex! - 1
      );
      setNestedIndex(0);
    }
  };

  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null || !currentItem) return;

    if (hasSubImages) {
      setNestedIndex((prev) => 
        prev === currentItem.images!.length - 1 ? 0 : prev + 1
      );
    } else {
      setLightboxIndex((prevIndex) => 
        prevIndex === filteredItems.length - 1 ? 0 : prevIndex! + 1
      );
      setNestedIndex(0);
    }
  };

  const handleOpenLightbox = (index: number, startSlide: number = 0) => {
    setLightboxIndex(index);
    setNestedIndex(startSlide);
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
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
                setNestedIndex(0);
              }}
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

      {/* Bento grid of gallery files with slider support */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <GalleryCard 
            key={item.id}
            item={item}
            onView={(startSlide) => handleOpenLightbox(index, startSlide)}
          />
        ))}
      </div>

      {/* Load more button */}
      <div className="text-center pt-4">
        <button className="px-6 py-2.5 border border-slate-200 text-slate-605 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
          Lihat Galeri Lainnya
        </button>
      </div>

      {/* Full lightbox overlay slider */}
      {lightboxIndex !== null && currentItem && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xs flex flex-col justify-between p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top layout inside lightbox */}
          <div className="flex justify-between items-center text-white px-2 py-1">
            <div className="text-xs font-semibold text-slate-350">
              {hasSubImages ? (
                <>
                  Foto {nestedIndex + 1} dari {currentItem.images!.length} (Album: {currentItem.title})
                </>
              ) : (
                <>
                  Dokumentasi {lightboxIndex + 1} dari {filteredItems.length}
                </>
              )}
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

            <div className="relative max-h-[65vh] w-full flex flex-col items-center justify-center p-4">
              <img 
                src={getGoogleDriveImageUrl(activeImage)} 
                alt={activeTitle} 
                className="max-h-[60vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
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

          {/* Lightbox bottom text cards with thumbnails */}
          <div className="max-w-3xl mx-auto w-full text-center text-white pb-4 space-y-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center items-center gap-2">
              <span className="text-xxs font-black uppercase text-blue-400 bg-blue-900/40 border border-blue-500/30 px-3 py-1 rounded-full">
                {currentItem.category}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold tracking-wide mt-2">{activeTitle}</h3>
            <p className="text-slate-350 text-xxs sm:text-xs font-light max-w-2xl mx-auto min-h-[2.5rem] line-clamp-2">
              {activeDesc}
            </p>
            
            {/* Horizontal thumbnail selector for sub-images */}
            {hasSubImages && (
              <div className="flex justify-center gap-2 mt-4 overflow-x-auto max-w-full py-2 scrollbar-none">
                {currentItem.images!.map((sub, i) => (
                  <button
                    key={i}
                    onClick={() => setNestedIndex(i)}
                    className={`relative w-12 sm:w-16 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                      i === nestedIndex ? 'border-blue-500 scale-105 shadow-md' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={getGoogleDriveImageUrl(sub.image)} 
                      alt={sub.title} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-center items-center gap-6 text-[10px] text-slate-400 pt-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-blue-400" />
                30 Juni 2026
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
