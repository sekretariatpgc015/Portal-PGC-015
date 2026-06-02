import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BerandaSection from './components/BerandaSection';
import ProfilSection from './components/ProfilSection';
import SeksiLembagaSection from './components/SeksiLembagaSection';
import LayananSection from './components/LayananSection';
import BeritaSection from './components/BeritaSection';
import GaleriSection from './components/GaleriSection';
import { ActiveTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');

  const renderSection = () => {
    switch (activeTab) {
      case 'beranda':
        return <BerandaSection setActiveTab={setActiveTab} />;
      case 'profil':
        return <ProfilSection />;
      case 'seksilembaga':
        return <SeksiLembagaSection />;
      case 'layanan':
        return <LayananSection />;
      case 'berita':
        return <BeritaSection key="berita" initialSubTab="berita" />;
      case 'pengumuman':
        return <BeritaSection key="pengumuman" initialSubTab="pengumuman" />;
      case 'galeri':
        return <GaleriSection />;
      case 'kontak':
        // Contacts are integrated at the bottom of the page, let's scroll to it and show Beranda
        setTimeout(() => {
          document.getElementById('kontak-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return <BerandaSection setActiveTab={setActiveTab} />;
      default:
        return <BerandaSection setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <div>
        {/* Responsive Sticky Header */}
        <Header activeTab={activeTab === 'kontak' ? 'beranda' : activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {renderSection()}
        </main>
      </div>

      {/* Global Contact & Info Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
