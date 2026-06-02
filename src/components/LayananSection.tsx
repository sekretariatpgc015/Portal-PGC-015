import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { 
  FileText, MapPin, Briefcase, Award, Heart, MoreHorizontal, 
  Calendar, Clock, Coffee, Landmark, ChevronRight, Info, 
  Upload, X, Printer, Download, CheckCircle, MessageSquare
} from 'lucide-react';
import { SERVICE_ITEMS } from '../data';
import { ServiceItem } from '../types';

export default function LayananSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    birthPlaceDate: '',
    nik: '',
    rtNumber: '001',
    address: '',
    purpose: '',
    attachmentName: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenWizard = (service: ServiceItem) => {
    setSelectedService(service);
    setShowWizard(true);
    setWizardStep(1);
    setFormData({
      fullName: '',
      birthPlaceDate: '',
      nik: '',
      rtNumber: '001',
      address: '',
      purpose: '',
      attachmentName: ''
    });
    setFormErrors({});
  };

  const handleCloseWizard = () => {
    setShowWizard(false);
    setSelectedService(null);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Drag and Drop files upload handlers
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({
        ...formData,
        attachmentName: e.dataTransfer.files[0].name
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        attachmentName: e.target.files[0].name
      });
    }
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi';
    if (!formData.birthPlaceDate.trim()) {
      errors.birthPlaceDate = 'Tempat & tanggal lahir wajib diisi';
    }
    if (!formData.nik.trim()) {
      errors.nik = 'NIK wajib diisi';
    } else if (formData.nik.length !== 16) {
      errors.nik = 'NIK harus tepat 16 digit';
    }
    if (!formData.address.trim()) {
      errors.address = 'Alamat rumah wajib diisi';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formData.purpose.trim()) {
      errors.purpose = 'Maksud / keperluan pembuatan surat wajib dijelaskan';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (wizardStep === 1) {
      if (validateStep1()) setWizardStep(2);
    } else if (wizardStep === 2) {
      if (validateStep2()) setWizardStep(3);
    }
  };

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return FileText;
      case 'MapPin': return MapPin;
      case 'Briefcase': return Briefcase;
      case 'Award': return Award;
      case 'Heart': return Heart;
      default: return MoreHorizontal;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Banner / Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-8 sm:p-10 text-white shadow-md">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10 space-y-2">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-100">Portal Pelayanan Publik</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Layanan Warga</h1>
          <p className="text-slate-100 text-sm sm:text-base max-w-2xl font-light">
            Pengajuan permohonan surat pengantar, rekomendasi, domisili, dan berkas kependudukan lainnya secara mandiri, praktis, dan instan.
          </p>
        </div>
      </div>

      {/* Two Column Layout: Cards Catalog on left, Sidebar Info on right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: List of Services */}
        <div className="lg:col-span-3 space-y-6">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-slate-800">Daftar Dokumen Pelayanan</h2>
            <p className="text-sm text-slate-500 mt-1">Silakan pilih jenis dokumen pelayanan mandiri surat warga di bawah ini.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICE_ITEMS.map((service) => {
              const Icon = getServiceIcon(service.icon);
              return (
                <div 
                  key={service.id}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between hover:border-blue-100 hover:shadow-md transition-all group"
                >
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base group-hover:text-blue-600 transition-colors">{service.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50/50 px-2.5 py-1 rounded-md">Proses 1 Hari Kerja</span>
                    <button
                      onClick={() => handleOpenWizard(service)}
                      className="flex items-center space-x-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Ajukan Sekarang</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sidebar info panel */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Operations timing checklist */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-4">
            <h3 className="font-extrabold text-slate-800 text-sm border-b border-slate-50 pb-3 flex items-center space-x-2">
              <Landmark className="h-4 w-4 text-blue-600" />
              <span>Informasi Pelayanan</span>
            </h3>
            
            <div className="space-y-3.5">
              <div className="flex space-x-3 text-xs sm:text-sm">
                <Calendar className="h-4 w-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-700">Hari Kerja</span>
                  <span className="text-slate-500 text-xs">Senin hingga Jumat</span>
                </div>
              </div>

              <div className="flex space-x-3 text-xs sm:text-sm">
                <Clock className="h-4 w-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-700">Waktu Pelayanan</span>
                  <span className="text-slate-500 text-xs">08.00 - 15.00 WIB</span>
                </div>
              </div>

              <div className="flex space-x-3 text-xs sm:text-sm">
                <Coffee className="h-4 w-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-700">Jam Istirahat</span>
                  <span className="text-slate-500 text-xs">12.00 - 13.00 WIB</span>
                </div>
              </div>

              <div className="flex space-x-3 text-xs sm:text-sm border-t border-slate-50 pt-3">
                <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="block font-bold text-slate-700">Lokasi Penyerahan</span>
                  <span className="text-slate-500 text-xs">Kantor Sekretariat RW 015 Desa Wanajaya</span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Assistance widget */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 shadow-xs space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-blue-900 text-sm">Butuh Bantuan?</h4>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed">
              Hubungi layanan admin warga RW 015 via WhatsApp untuk membantu kendala syarat pengurusan dan pengajuan dokumen tertunda.
            </p>
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noreferrer"
              className="w-full text-center block bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Hubungi WhatsApp
            </a>
          </div>

        </div>
      </div>

      {/* Dynamic Multi-step Form Wizard Modal */}
      {showWizard && selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl border border-slate-100 overflow-hidden my-8">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base">Pengajuan {selectedService.name}</h3>
                <p className="text-xs text-blue-100">Layanan Mandiri Administrasi RW 015</p>
              </div>
              <button 
                onClick={handleCloseWizard}
                className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Stepper Progress bar */}
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-3.5 flex justify-between items-center text-xs">
              <div className="flex items-center space-x-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                  wizardStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>1</span>
                <span className={`font-semibold ${wizardStep === 1 ? 'text-blue-600' : 'text-slate-500'}`}>Identitas Diri</span>
              </div>
              <div className="h-px bg-slate-200 flex-1 mx-3" />
              <div className="flex items-center space-x-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                  wizardStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>2</span>
                <span className={`font-semibold ${wizardStep === 2 ? 'text-blue-600' : 'text-slate-500'}`}>Maksud & Lampiran</span>
              </div>
              <div className="h-px bg-slate-200 flex-1 mx-3" />
              <div className="flex items-center space-x-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${
                  wizardStep >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>3</span>
                <span className={`font-semibold ${wizardStep === 3 ? 'text-blue-600' : 'text-slate-500'}`}>Pratinjau & Cetak</span>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6">
              
              {/* STEP 1: Basic personal detail schema */}
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <div className="text-xs p-3.5 bg-blue-50/70 text-blue-700 border border-blue-100 rounded-xl flex items-start space-x-2.5">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Pastikan data diisi sesuai dengan data Kartu Keluarga Anda untuk memperlancar proses verifikasi.</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase">Nama Lengkap Pemohon</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Contoh: Kadek Bagus"
                        className={`w-full px-3.5 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.fullName ? 'border-red-400 focus:ring-red-400' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.fullName && <p className="text-red-500 text-xxs font-medium mt-0.5">{formErrors.fullName}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 uppercase">Rukun Tetangga (RT)</label>
                      <select 
                        name="rtNumber"
                        value={formData.rtNumber}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {Array.from({ length: 9 }, (_, i) => {
                          const num = String(i + 1).padStart(3, '0');
                          return (
                            <option key={num} value={num}>RT {num}</option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Tempat & Tanggal Lahir</label>
                    <input 
                      type="text" 
                      name="birthPlaceDate"
                      value={formData.birthPlaceDate}
                      onChange={handleInputChange}
                      placeholder="Contoh: Bekasi, 17 Agustus 1990"
                      className={`w-full px-3.5 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.birthPlaceDate ? 'border-red-400 focus:ring-red-400' : 'border-slate-200'
                      }`}
                    />
                    {formErrors.birthPlaceDate && <p className="text-red-500 text-xxs font-medium mt-0.5">{formErrors.birthPlaceDate}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Nomor Induk Kependudukan (NIK)</label>
                    <input 
                      type="text" 
                      name="nik"
                      maxLength={16}
                      value={formData.nik}
                      onChange={handleInputChange}
                      placeholder="Masukkan 16 digit angka NIK"
                      className={`w-full px-3.5 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.nik ? 'border-red-400 focus:ring-red-400' : 'border-slate-200'
                      }`}
                    />
                    {formErrors.nik && <p className="text-red-500 text-xxs font-medium mt-0.5">{formErrors.nik}</p>}
                  </div>



                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Alamat Rumah (Nama Jalan, No. Rumah/Blok)</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Contoh: Jl. Melati V No. 15, Blok C2"
                      className={`w-full px-3.5 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.address ? 'border-red-400 focus:ring-red-400' : 'border-slate-200'
                      }`}
                    />
                    {formErrors.address && <p className="text-red-500 text-xxs font-medium mt-0.5">{formErrors.address}</p>}
                  </div>
                </div>
              )}

              {/* STEP 2: Purpose and supported requirements uploads */}
              {wizardStep === 2 && (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase">Tujuan / Keperluan Administrasi</label>
                    <textarea 
                      name="purpose"
                      rows={3}
                      value={formData.purpose}
                      onChange={handleInputChange}
                      placeholder="Contoh: Mengurus pendaftaran jaminan kesehatan BPJS / Pengantar pendaftaran sekolah anak / Persyaratan administrasi KPR"
                      className={`w-full px-3.5 py-2.5 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.purpose ? 'border-red-400 focus:ring-red-400' : 'border-slate-200'
                      }`}
                    />
                    {formErrors.purpose && <p className="text-red-500 text-xxs font-medium mt-0.5">{formErrors.purpose}</p>}
                  </div>

                  <div className="space-y-3.5">
                    <div className="text-xs font-bold text-slate-600 uppercase">Berkas Pendukung Yang Diperlukan:</div>
                    <ul className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {selectedService.requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Drag and Drop and File selection Zone */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Lampirkan Berkas Pendukung (Format PDF/JPG, Maks 5MB)</label>
                      <div 
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                          dragActive ? 'border-blue-500 bg-blue-55/10' : 'border-slate-350 bg-slate-20/50 hover:bg-slate-50'
                        }`}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden" 
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <Upload className="h-8 w-8 text-slate-400 mb-2" />
                        <p className="text-sm font-semibold text-slate-700">Tarik berkas ke sini atau klik untuk mengunggah</p>
                        <p className="text-slate-400 text-xxs mt-1">Satu berkas utama yang relevan (KTP/KK scan)</p>
                      </div>

                      {formData.attachmentName && (
                        <div className="mt-3 flex items-center justify-between p-2.5 bg-blue-50/70 border border-blue-100 rounded-xl text-blue-700 text-xs">
                          <span className="font-semibold truncate">{formData.attachmentName}</span>
                          <button 
                            type="button" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormData({ ...formData, attachmentName: '' });
                            }} 
                            className="p-1 rounded hover:bg-blue-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Beautiful Live preview ready for print */}
              {wizardStep === 3 && (
                <div className="space-y-6">
                  {/* Mock success notification before preview */}
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-4 flex items-start space-x-3 text-xs leading-relaxed">
                    <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-emerald-900">Validasi Identitas Berhasil</span>
                      Draf surat kependudukan mandiri Anda telah sukses dipersiapkan. Anda dapat langsung mencetak (print) berkas draf ini untuk dibawa mendapatkan tanda tangan pengurus atau menyimpannya sebagai salinan digital.
                    </div>
                  </div>

                  {/* Document Live preview panel: styled as Kop Surat (Standard Indonesian letterhead) */}
                  <div className="bg-white border-2 border-slate-300 shadow-md p-6 sm:p-10 font-serif text-slate-900 rounded-xl select-all select-none space-y-6 max-h-[400px] overflow-y-auto">
                    
                    {/* Kop Surat Header */}
                    <div className="text-center border-b-4 border-double border-slate-900 pb-4 relative leading-tight space-y-1">
                      <h4 className="font-bold text-sm tracking-wide">PENGURUS RUKUN WARGA 015</h4>
                      <h3 className="font-bold text-lg tracking-wide uppercase">DESA WANAJAYA</h3>
                      <h4 className="font-bold text-sm tracking-wide">KECAMATAN CIBITUNG, KABUPATEN BEKASI</h4>
                      <p className="text-xxs font-sans font-medium text-slate-500 italic mt-0.5">Alamat: Jl. Melati No. 12, Desa Wanajaya, Kec. Cibitung, Kab. Bekasi, Jawa Barat 17520</p>
                    </div>

                    {/* Title inside document */}
                    <div className="text-center">
                      <h4 className="font-bold text-sm underline tracking-wide uppercase">SURAT KETERANGAN PENGANTAR</h4>
                      <span className="text-xs font-sans">Nomor: 015 / RW015 / XI / 2026</span>
                    </div>

                    {/* Sender explanation paragraph */}
                    <div className="text-xs leading-relaxed text-justify space-y-3">
                      <p>Yang bertanda tangan di bawah ini Ketua Rukun Warga (RW) 015 Desa Wanajaya, Kecamatan Cibitung, Kabupaten Bekasi dengan ini menerangkan bahwa:</p>
                      
                      {/* Grid lists inside document representing user details */}
                      <div className="grid grid-cols-[100px_10px_1fr] gap-x-2 gap-y-1.5 pl-4 font-sans text-xs">
                        <span className="font-semibold text-slate-600">Nama Lengkap</span><span>:</span><span className="font-extrabold text-slate-800">{formData.fullName}</span>
                        <span className="font-semibold text-slate-600">Tempat/Tgl Lahir</span><span>:</span><span>{formData.birthPlaceDate}</span>
                        <span className="font-semibold text-slate-600">NIK (KTP)</span><span>:</span><span>{formData.nik}</span>
                        <span className="font-semibold text-slate-600">Alamat Rumah</span><span>:</span><span>{formData.address}, RT {formData.rtNumber} / RW 015 Desa Wanajaya, Kecamatan Cibitung</span>
                        <span className="font-semibold text-slate-600">Maksud / Tujuan</span><span>:</span><span className="font-bold">{formData.purpose}</span>
                      </div>

                      <p>Berdasarkan keterangan yang ada pada kami, yang bersangkutan benar merupakan warga tetap yang berdomisili baik di lingkungan Rukun Warga 015 Desa Wanajaya.</p>
                      <p>Demikian Surat Keterangan Pengantar ini diberikan kepada pemohon untuk dapat dipergunakan sebagaimana mestinya.</p>
                    </div>

                    {/* Dates & Signature lines */}
                    <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-serif leading-tight">
                      <div className="text-center space-y-14">
                        <div>
                          <p>Mengetahui,</p>
                          <p className="font-bold">Ketua RT {formData.rtNumber}</p>
                        </div>
                        <p className="underline font-bold">( ........................................ )</p>
                      </div>

                      <div className="text-center space-y-14">
                        <div>
                          <p>Bekasi, 28 Mei 2026</p>
                          <p className="font-bold">Ketua RW 015</p>
                        </div>
                        <div>
                          <p className="underline font-bold">AHMAD SUBAGJA</p>
                          <p className="text-xxs font-sans text-slate-500 font-medium">NIP. Penduduk RW.015.1965</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Actions Footer */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex justify-between">
              <div>
                {wizardStep > 1 && (
                  <button
                    onClick={() => setWizardStep((prev) => (prev - 1) as any)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 text-sm font-semibold hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                  >
                    Kembali
                  </button>
                )}
              </div>

              <div className="flex space-x-3">
                {wizardStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-xs transition-all cursor-pointer"
                  >
                    Lanjutkan
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handlePrint}
                      className="flex items-center space-x-1.5 px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                    >
                      <Printer className="h-4 w-4" />
                      <span>Cetak Surat</span>
                    </button>
                    <button
                      onClick={handleCloseWizard}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      Selesai
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
