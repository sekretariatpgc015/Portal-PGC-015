import { useMemo } from 'react';
import { Users, Shield, Award, UsersRound, HelpCircle, Briefcase, HeartCrack, ClipboardList, Lightbulb } from 'lucide-react';
import { COMMITTEE_MEMBERS } from '../data';
import { getGoogleDriveImageUrl } from '../utils/googleDrive';

interface KepengurusanSectionProps {
  hideHeader?: boolean;
}

export default function KepengurusanSection({ hideHeader = false }: KepengurusanSectionProps) {
  // Find top level members
  const ketua = COMMITTEE_MEMBERS.find((m) => m.role === 'Ketua RW 015');
  const sekretaris = COMMITTEE_MEMBERS.find((m) => m.role === 'Sekretaris');
  const bendahara = COMMITTEE_MEMBERS.find((m) => m.role === 'Bendahara');
  const sekretariatList = COMMITTEE_MEMBERS.filter((m) => m.role === 'Sekretariat');
  
  // Find sections
  const seksiList = COMMITTEE_MEMBERS.filter((m) => m.section);

  // Group seksi members by section
  const groupedSections = useMemo(() => {
    const groups: { [key: string]: typeof COMMITTEE_MEMBERS } = {};
    seksiList.forEach((m) => {
      const sec = m.section || 'Lainnya';
      if (!groups[sec]) {
        groups[sec] = [];
      }
      groups[sec].push(m);
    });
    return groups;
  }, [seksiList]);

  // Helper to map section icons for visual appeal
  const getSectionIcon = (sectionName: string) => {
    switch (sectionName.toLowerCase()) {
      case 'humas':
        return <UsersRound className="h-4.5 w-4.5 text-blue-500" />;
      case 'rohani':
        return <ClipboardList className="h-4.5 w-4.5 text-indigo-500" />;
      case 'olahraga':
        return <Award className="h-4.5 w-4.5 text-emerald-500" />;
      case 'pemberdayaan masyarakat':
        return <Lightbulb className="h-4.5 w-4.5 text-amber-500" />;
      case 'perlengkapan':
        return <Briefcase className="h-4.5 w-4.5 text-slate-500" />;
      case 'keamanan':
        return <Shield className="h-4.5 w-4.5 text-rose-500" />;
      case 'k3':
        return <HeartCrack className="h-4.5 w-4.5 text-cyan-500" />;
      default:
        return <HelpCircle className="h-4.5 w-4.5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-12 animate-fade-in font-sans">
      {/* Banner Header */}
      {!hideHeader && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-8 sm:p-10 text-white shadow-md">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="relative z-10 space-y-2">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-100">Kepengurusan Organisasi</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Kepengurusan RW 015</h1>
            <p className="text-slate-100 text-sm sm:text-base max-w-xl font-light">
              Sinergi kolaboratif pengurus RW 015 periode 2026 - 2031 dalam melayani warga Desa Wanajaya, Kecamatan Cibitung secara transparan dan akuntabel.
            </p>
          </div>
        </div>
      )}

      {/* Main Structural Layout */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs space-y-12">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Bagan Struktur Organisasi</h2>
          <div className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full inline-block mt-2 tracking-wider">Periode Bakti 2026 - 2031</div>
        </div>

        {/* Tree flow hierarchy */}
        <div className="space-y-12">
          
          {/* Level 1: Ketua RW */}
          {ketua && (
            <div className="flex flex-col items-center">
              <div className="relative p-1.5 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg hover:scale-102 transition-transform duration-300">
                <img 
                  src={getGoogleDriveImageUrl(ketua.image)} 
                  alt={ketua.name} 
                  className="w-24 aspect-[3/4] sm:w-28 rounded-2xl object-cover border-4 border-white"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-3.5 text-center">
                <h3 className="font-extrabold text-slate-900 text-xl leading-snug tracking-tight">{ketua.name}</h3>
                <span className="text-xs font-bold px-4 py-1 rounded-full bg-blue-600 text-white mt-1.5 inline-block uppercase tracking-wider shadow-xs">
                  {ketua.role}
                </span>
              </div>
            </div>
          )}

          {/* Connective Line to Level 2 (Desktop only helper) */}
          <div className="hidden lg:block w-px h-8 bg-blue-200 mx-auto -my-8" />

          {/* Level 2: Sekretaris, Bendahara, Sekretariat */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto pt-6 relative">
            {/* Horizontal bridge line for desktop */}
            <div className="hidden lg:block absolute top-0 left-[16.6%] right-[16.6%] h-px bg-blue-200" />
            
            {/* Sekretaris & Bendahara (parallel/sejajar di semua device) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-2 relative">
              {/* Sekretaris */}
              {sekretaris && (
                <div className="flex flex-col items-center relative">
                  <div className="hidden lg:block absolute -top-6 w-px h-6 bg-blue-200" />
                  <div className="p-1 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 transition-colors">
                    <img 
                      src={getGoogleDriveImageUrl(sekretaris.image)} 
                      alt={sekretaris.name} 
                      className="w-20 aspect-[3/4] rounded-xl object-cover shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <h4 className="font-extrabold text-slate-800 text-sm">{sekretaris.name}</h4>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                      {sekretaris.role}
                    </span>
                  </div>
                </div>
              )}

              {/* Bendahara */}
              {bendahara && (
                <div className="flex flex-col items-center relative">
                  <div className="hidden lg:block absolute -top-6 w-px h-6 bg-blue-200" />
                  <div className="p-1 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 transition-colors">
                    <img 
                      src={getGoogleDriveImageUrl(bendahara.image)} 
                      alt={bendahara.name} 
                      className="w-20 aspect-[3/4] rounded-xl object-cover shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <h4 className="font-extrabold text-slate-800 text-sm">{bendahara.name}</h4>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                      {bendahara.role}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Sekretariat */}
            <div className="flex flex-col items-center relative col-span-1 mt-4 lg:mt-0">
              <div className="hidden lg:block absolute -top-6 w-px h-6 bg-blue-200" />
              <div className="flex flex-row justify-center items-start gap-4 sm:gap-6">
                {sekretariatList.map((m) => (
                  <div key={m.id} className="flex flex-col items-center">
                    <div className="p-1 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 transition-colors">
                       <img 
                        src={getGoogleDriveImageUrl(m.image)} 
                        alt={m.name} 
                        className="w-18 aspect-[3/4] rounded-xl object-cover shadow-xs"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">{m.name}</h4>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mt-1.5 inline-block uppercase tracking-wider">
                        {m.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Level 3: Sections & Humas (Seksi-seksi Kerja) */}
          <div className="pt-10 border-t border-slate-100 space-y-12">
            <div className="text-center">
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-1.5 rounded-full text-slate-650 transition-colors">
                <Users className="h-3.5 w-3.5 text-blue-600" />
                Seksi - Seksi Kerja & Humas
              </h3>
              <p className="text-xxs sm:text-xs text-slate-500 mt-2 font-medium">Bagan terpadu perangkat kerja operasional RW 015</p>
            </div>

            {/* Render grouped sections */}
            <div className="space-y-8 max-w-6xl mx-auto">
              {(Object.entries(groupedSections) as [string, typeof COMMITTEE_MEMBERS][]).map(([sectionName, members]) => (
                <div 
                  key={sectionName} 
                  className="bg-slate-50/45 border border-slate-150/70 p-5 sm:p-6 rounded-3xl space-y-5 transition-all hover:bg-slate-50 duration-300"
                >
                  {/* Category Title Heading */}
                  <div className="flex items-center justify-between border-b border-slate-200/50 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-1.5 bg-white rounded-lg shadow-xxs border border-slate-100">
                        {getSectionIcon(sectionName)}
                      </div>
                      <h4 className="font-black text-slate-900 text-sm sm:text-base tracking-tight">
                        {sectionName === 'Humas' ? 'Seksi Humas' : `Seksi ${sectionName}`}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-150/80 px-2.5 py-0.5 rounded-full select-none">
                      {members.length} Personel
                    </span>
                  </div>

                  {/* Members inside Category */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {members.map((m) => (
                      <div 
                        key={m.id} 
                        className="bg-white border border-slate-200 hover:border-blue-400 p-3 sm:p-4 rounded-2xl flex flex-col items-center text-center hover:shadow-xs transition-all hover:-translate-y-1 duration-200"
                      >
                        <div className="relative mb-3 group">
                          <img 
                            src={getGoogleDriveImageUrl(m.image)} 
                            alt={m.name} 
                            className="w-16 aspect-[3/4] sm:w-20 rounded-2xl object-cover border-2 border-slate-100 shadow-xxs group-hover:scale-105 transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm line-clamp-2 min-h-[32px] flex items-center justify-center leading-relaxed">
                          {m.name}
                        </h5>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Inspiring quote box at bottom of section */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center max-w-2xl mx-auto flex items-center justify-center space-x-3 text-blue-800 font-semibold text-sm sm:text-base shadow-xxs">
        <Users className="h-5 w-5 text-blue-600 flex-shrink-0" />
        <span>"Bersama kita wujudkan lingkungan RW 015 yang Tertib, Elok, Rapi, Sehat, Nyaman untuk masyarakat"</span>
      </div>
    </div>
  );
}
