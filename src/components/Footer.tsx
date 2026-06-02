import { useState, ChangeEvent, FormEvent } from 'react';
import { 
  Phone, Mail, Clock, MapPin, Landmark, Send, CheckCircle2, 
  AlertCircle, ExternalLink, HelpCircle, Facebook, Instagram, Youtube 
} from 'lucide-react';
import { ActiveTab } from '../types';
import { getGoogleDriveImageUrl } from '../utils/googleDrive';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Saran',
    message: ''
  });

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Core clients validations
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        text: 'Mohon isi nama lengkap, nomor WhatsApp, dan pesan Anda!'
      });
      return;
    }

    if (formData.phone.length < 10) {
      setStatus({
        type: 'error',
        text: 'Format nomor WhatsApp tidak valid (minimal 10 digit)!'
      });
      return;
    }

    // Success response trigger
    setStatus({
      type: 'success',
      text: 'Pesan Anda telah sukses terkirim ke admin pengurus RW 015! Kami akan segera menindaklanjuti.'
    });

    // Reset Form
    setFormData({
      name: '',
      phone: '',
      email: '',
      type: 'Saran',
      message: ''
    });

    // Clear alert banner after timeout
    setTimeout(() => {
      setStatus({ type: null, text: '' });
    }, 6000);
  };

  return (
    <footer id="kontak-section" className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 3 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Info & Contact directory (span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg overflow-hidden border border-slate-700 flex-shrink-0 flex items-center justify-center">
                <img 
                  src={getGoogleDriveImageUrl("https://drive.google.com/thumbnail?id=17G7evIeHShfqn7aSm7L1mfgjlb1hStya")} 
                  alt="Logo RW 015" 
                  className="w-full h-full object-contain p-1"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">RW 015 Pesona Gading Cibitung</h3>
                <p className="text-sm text-slate-400 font-semibold uppercase tracking-wider">Desa Wanajaya • Kecamatan Cibitung</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Sekretariat RW 015 berfungsi sebagai pusat koordinasi pelayanan administratif, kesejahteraan warga, dan kegiatan sosial kemasyarakatan di Desa Wanajaya.
            </p>

            <div className="space-y-3.5 pt-2 text-xs sm:text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="block text-slate-400 font-light leading-relaxed">
                    Jl. Cempaka Blok C2 RT. 001 / RW. 015, Desa Wanajaya, Kecamatan Cibitung, Kabupaten Bekasi, Jawa Barat 17520
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span className="text-slate-400 font-light">+62 812-3456-7890 (WhatsApp)</span>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span className="text-slate-400 font-light">sekretariat.pgc015@gmail.com</span>
              </div>

              <div className="flex items-start space-x-3 border-t border-slate-800 pt-3.5">
                <Clock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-300">Jam Operasional Pelayanan</span>
                  <span className="text-slate-550 text-xs font-light">Senin - Jumat | 08.00 - 15.00 WIB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Send Message Form (span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-extrabold text-white text-base">Kirim Pesan Layanan</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Punya pengaduan, saran pembangunan, atau kendala administratif? Kirimkan pesan langsung kepada pengurus RW.
            </p>

            {/* Submission alert notifications */}
            {status.type && (
              <div className={`p-3.5 rounded-xl text-xs flex items-start space-x-2.5 leading-relaxed ${
                status.type === 'success' 
                  ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-400' 
                  : 'bg-red-950/60 border border-red-800 text-red-400'
              }`}>
                {status.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <span>{status.text}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nama Lengkap"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl outline-none text-xs text-white focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
                />
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="No. WhatsApp"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl outline-none text-xs text-white focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email (Opsional)"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl outline-none text-xs text-white focus:ring-1 focus:ring-blue-500 placeholder-slate-500"
                />
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl outline-none text-xs text-slate-300 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Saran">Saran</option>
                  <option value="Pengaduan">Pengaduan</option>
                  <option value="Pengajuan Surat">Pengajuan Surat</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <textarea 
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Pesan, aduan, atau masukan Anda..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl outline-none text-xs text-white focus:ring-1 focus:ring-blue-500 placeholder-slate-500 leading-relaxed"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Kirim Pesan Sekarang</span>
              </button>
            </form>
          </div>

          {/* Column 3: Custom map panel & location markers (span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-extrabold text-white text-base">Lokasi Kantor RW 015</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Sekretariat RW 015 terbuka bagi pelayanan tatap muka yang tidak dapat diproses secara mandiri di website ini.
            </p>

            {/* Immersive static map panel mockup */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 aspect-16/10 group shadow-md">
              <iframe 
                src="https://maps.google.com/maps?q=-6.249624,107.104704&z=17&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(0.6) contrast(1.2) brightness(0.95)' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-white text-sm font-bold flex items-center bg-blue-600 px-2.5 py-1 rounded-md">
                  <MapPin className="h-3 w-3 mr-1" />
                  Kantor Sekretariat RW 015
                </span>
              </div>
            </div>

            <a 
              href="https://www.google.com/maps/place/-6.249624,107.104704" 
              target="_blank" 
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center space-x-2 border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-350 hover:text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>Buka di Google Maps</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

        </div>

        {/* Footer Base bar: Links, Social Media, and copyright info */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-6">
          <div className="space-y-3 text-center md:text-left">
            <p>© 2026 RW 015 Desa Wanajaya, Kecamatan Cibitung. Hak Cipta Dilindungi.</p>
            <div className="flex justify-center md:justify-start space-x-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-1.5 bg-slate-800/80 hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg transition-all border border-slate-750 hover:border-blue-500 cursor-pointer" 
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-1.5 bg-slate-800/80 hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg transition-all border border-slate-750 hover:border-blue-500 cursor-pointer" 
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-1.5 bg-slate-800/80 hover:bg-blue-600 text-slate-400 hover:text-white rounded-lg transition-all border border-slate-750 hover:border-blue-500 cursor-pointer" 
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <button onClick={() => setActiveTab('profil')} className="hover:text-blue-500 transition-colors cursor-pointer">Profil Wilayah</button>
            <button onClick={() => setActiveTab('seksilembaga')} className="hover:text-blue-500 transition-colors cursor-pointer">Seksi & Lembaga</button>
            <button onClick={() => setActiveTab('layanan')} className="hover:text-blue-500 transition-colors cursor-pointer">Daftar Layanan</button>
            <button onClick={() => setActiveTab('berita')} className="hover:text-blue-500 transition-colors cursor-pointer">Berita & Pengumuman</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
