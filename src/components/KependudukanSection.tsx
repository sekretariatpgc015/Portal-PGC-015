import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, ShieldCheck, Calendar, Bookmark, Download, Copy, Printer, Search, ArrowUpDown, ChevronUp, ChevronDown, Sparkles, Filter
} from 'lucide-react';
import { useDemografi, Resident } from '../hooks/useDemografi';

export default function KependudukanSection({ hideHeader = false }: { hideHeader?: boolean }) {
  const { residents: rawResidents, loading, error } = useDemografi();
  const [selectedRT, setSelectedRT] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<'rt' | 'kk' | 'total' | 'males' | 'females'>('rt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  // Extract list of existing RTs for bar charts
  const availableRTs = useMemo(() => {
    const rts = new Set<string>();
    rawResidents.forEach(r => {
      const rtNum = r.RT ? r.RT.padStart(3, '0') : '';
      if (rtNum) rts.add(rtNum);
    });
    return Array.from(rts).sort();
  }, [rawResidents]);

  // Dynamic Demographics Statistics Computed Instantly
  const stats = useMemo(() => {
    const total = rawResidents.length;
    if (total === 0) {
      return {
        total: 0,
        males: 0,
        females: 0,
        kepalaKeluarga: 0,
        averageAge: 0,
        ageGroups: { balita: 0, anak: 0, remaja: 0, dewasa: 0, lansia: 0 },
        rtDistribution: {} as Record<string, number>,
        religionDistribution: {} as Record<string, number>,
        educationDistribution: {} as Record<string, number>
      };
    }

    let males = 0;
    let females = 0;
    let kepalaKeluarga = 0;
    let totalAge = 0;
    let ageCount = 0;

    const ageGroups = { balita: 0, anak: 0, remaja: 0, dewasa: 0, lansia: 0 };
    const rtDistribution: Record<string, number> = {};
    const religionDistribution: Record<string, number> = {};
    const educationDistribution: Record<string, number> = {};

    rawResidents.forEach(r => {
      // Gender calculation
      const jk = (r['JENIS KELAMIN'] || '').toUpperCase();
      if (jk.includes('LAKI')) males++;
      else if (jk.includes('PEREMP') || jk.includes('WANITA')) females++;

      // Hubungan Keluarga calculation
      const hub = (r['HUB. KELUARGA'] || '').toUpperCase();
      if (hub === 'KEPALA KELUARGA' || hub === 'KEPALA') kepalaKeluarga++;

      // Age calculation & grouping
      const ageNum = parseInt(r.USIA, 10);
      if (!isNaN(ageNum)) {
        totalAge += ageNum;
        ageCount++;

        if (ageNum <= 5) ageGroups.balita++;
        else if (ageNum <= 12) ageGroups.anak++;
        else if (ageNum <= 17) ageGroups.remaja++;
        else if (ageNum <= 59) ageGroups.dewasa++;
        else ageGroups.lansia++;
      }

      // RT count
      const rt = r.RT ? r.RT.padStart(3, '0') : 'Lainnya';
      rtDistribution[rt] = (rtDistribution[rt] || 0) + 1;

      // Religion Count
      const religion = r.AGAMA ? r.AGAMA.trim().toUpperCase() : 'BELUM DIISI';
      if (religion) {
        religionDistribution[religion] = (religionDistribution[religion] || 0) + 1;
      }

      // Education Count
      const edu = r['PENDIDIKAN TERAKHIR'] ? r['PENDIDIKAN TERAKHIR'].trim().toUpperCase() : 'BELUM DIISI';
      if (edu) {
        educationDistribution[edu] = (educationDistribution[edu] || 0) + 1;
      }
    });

    return {
      total,
      males,
      females,
      kepalaKeluarga,
      averageAge: ageCount > 0 ? Math.round(totalAge / ageCount) : 0,
      ageGroups,
      rtDistribution,
      religionDistribution,
      educationDistribution
    };
  }, [rawResidents]);

  // Dynamic RT Statistics Data Table
  const rtStatsTable = useMemo(() => {
    const dataMap: Record<string, { rt: string; kk: number; total: number; males: number; females: number }> = {};
    
    // Initialize for all available RTs
    availableRTs.forEach(rt => {
      dataMap[rt] = {
        rt,
        kk: 0,
        total: 0,
        males: 0,
        females: 0
      };
    });

    rawResidents.forEach(r => {
      const rtNum = r.RT ? r.RT.padStart(3, '0') : '';
      if (!rtNum) return;

      if (!dataMap[rtNum]) {
        dataMap[rtNum] = {
          rt: rtNum,
          kk: 0,
          total: 0,
          males: 0,
          females: 0
        };
      }

      const item = dataMap[rtNum];
      item.total++;

      // KK validation
      const hub = (r['HUB. KELUARGA'] || '').toUpperCase();
      if (hub === 'KEPALA KELUARGA' || hub === 'KEPALA') {
        item.kk++;
      }

      // Gender check
      const jk = (r['JENIS KELAMIN'] || '').toUpperCase();
      if (jk.includes('LAKI')) {
        item.males++;
      } else if (jk.includes('PEREMP') || jk.includes('WANITA')) {
        item.females++;
      }
    });

    return Object.values(dataMap).sort((a, b) => a.rt.localeCompare(b.rt));
  }, [rawResidents, availableRTs]);

  // Sum totals of columns for the table footer
  const rtStatsTotals = useMemo(() => {
    return rtStatsTable.reduce(
      (acc, curr) => {
        acc.kk += curr.kk;
        acc.total += curr.total;
        acc.males += curr.males;
        acc.females += curr.females;
        return acc;
      },
      { kk: 0, total: 0, males: 0, females: 0 }
    );
  }, [rtStatsTable]);

  // Integrated Sorting & Search Logic for demographic table
  const processedTableData = useMemo(() => {
    let result = [...rtStatsTable];

    // 1. Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(row => {
        const rtLabel = `rt ${parseInt(row.rt, 10)}`;
        const rtLabel2 = `rt ${parseInt(row.rt, 10).toString().padStart(2, '0')}`;
        return (
          rtLabel.includes(term) || 
          rtLabel2.includes(term) || 
          row.rt.includes(term) ||
          `rukun tetangga ${parseInt(row.rt, 10)}`.includes(term)
        );
      });
    }

    // 2. Sort by sortKey
    result.sort((a, b) => {
      let valA: any = a[sortKey];
      let valB: any = b[sortKey];

      // Custom numeric RT sorting
      if (sortKey === 'rt') {
        const numA = parseInt(valA, 10);
        const numB = parseInt(valB, 10);
        return sortDirection === 'asc' ? numA - numB : numB - numA;
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      valA = String(valA);
      valB = String(valB);
      return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    return result;
  }, [rtStatsTable, sortKey, sortDirection, searchTerm]);

  // Sorting handler
  const handleSort = (key: 'rt' | 'kk' | 'total' | 'males' | 'females') => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc'); // Default to descending order for numbers
    }
  };

  // Sort arrow render helper
  const renderSortIcon = (key: 'rt' | 'kk' | 'total' | 'males' | 'females') => {
    if (sortKey !== key) {
      return <ArrowUpDown className="h-3 w-3 ml-1.5 text-slate-400 inline-block transition-opacity group-hover:opacity-100 opacity-50" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-3 w-3 ml-1.5 text-indigo-600 inline-block" />
    ) : (
      <ChevronDown className="h-3 w-3 ml-1.5 text-indigo-600 inline-block" />
    );
  };

  // Export to standard CSV handler
  const handleExportCSV = () => {
    // Generate simple standard text headers and rows for compatibility
    const headers = ['RT', 'Jumlah Kepala Keluarga', 'Jumlah Penduduk', 'Laki-Laki', 'Perempuan'];
    const rows = rtStatsTable.map(row => [
      `RT ${row.rt}`,
      row.kk,
      row.total,
      row.males,
      row.females
    ]);
    
    // Total row
    rows.push([
      'TOTAL KESELURUHAN',
      rtStatsTotals.kk,
      rtStatsTotals.total,
      rtStatsTotals.males,
      rtStatsTotals.females
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `demografi_rw015_cibitung_${new Date().getFullYear()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy data markdown snapshot to Clipboard
  const handleCopyData = () => {
    let text = "=== LAPORAN RINCIAN DEMOGRAFI RW 015 ===\n\n";
    text += "| RT (Rukun Tetangga) | Jumlah KK | Jumlah Penduduk | Laki-Laki | Perempuan |\n";
    text += "|---|---|---|---|---|\n";
    rtStatsTable.forEach(row => {
      text += `| RT ${parseInt(row.rt, 10).toString().padStart(2, '0')} | ${row.kk} KK | ${row.total} Jiwa | ${row.males} L | ${row.females} P |\n`;
    });
    text += `| TOTAL KESELURUHAN | ${rtStatsTotals.kk} KK | ${rtStatsTotals.total} Jiwa | ${rtStatsTotals.males} L | ${rtStatsTotals.females} P |\n`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in font-sans">
      {/* Visual Title Banner */}
      {!hideHeader && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-blue-900 p-5 sm:p-8 md:p-10 text-white shadow-md">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="relative z-10 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                <span>Transparansi Sensus Terkini</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">Data Demografi RW 015</h1>
              <p className="text-slate-300 text-xs sm:text-sm sm:text-base max-w-xl font-light leading-relaxed">
                Analisis statistik dan visualisasi data demografi warga RW 015 Desa Wanajaya secara interaktif, akurat, dan transparan.
              </p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 space-y-4 bg-white rounded-3xl border border-slate-100 shadow-xs">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-xs sm:text-sm font-medium text-slate-500 animate-pulse text-center">Memuat data demografi RW 015 dari cloud...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-250 rounded-2xl p-6 text-center space-y-3">
          <p className="text-sm font-semibold text-red-800">{error}</p>
          <p className="text-xs text-red-600 max-w-md mx-auto">
            Terjadi kendala saat menghubungi database eksternal Google Sheets. Silakan muat ulang halaman ini.
          </p>
          <div className="flex justify-center pt-2">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Key Community Metric Statistics Dashboard Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center space-x-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 animate-scale-in">
                <Users className="h-5 sm:h-5.5 w-5 sm:w-5.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-slate-400 font-medium text-[10px] uppercase tracking-wider block truncate">Total Penduduk</span>
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 font-mono block leading-tight">
                  {stats.total.toLocaleString('id-ID')}
                </span>
                <span className="text-slate-400 text-[10px] block truncate">Jiwa terverifikasi</span>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center space-x-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 animate-scale-in">
                <Bookmark className="h-5 sm:h-5.5 w-5 sm:w-5.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-slate-400 font-medium text-[10px] uppercase tracking-wider block truncate">Kepala Keluarga</span>
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 font-mono block leading-tight">
                  {stats.kepalaKeluarga.toLocaleString('id-ID')}
                </span>
                <span className="text-slate-400 text-[10px] block truncate">KK terdaftar</span>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between min-w-0">
                <span className="text-slate-400 font-medium text-[10px] uppercase tracking-wider truncate">Komposisi Gender</span>
                <span className="text-[9px] font-mono text-slate-500 font-bold bg-slate-50 px-1.5 py-0.5 rounded flex-shrink-0">Rasio L/P</span>
              </div>
              <div className="space-y-1.5 mt-2">
                <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                  <span>Laki ({stats.total > 0 ? Math.round(stats.males / stats.total * 100) : 0}%)</span>
                  <span>Perempuan ({stats.total > 0 ? Math.round(stats.females / stats.total * 100) : 0}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full flex overflow-hidden">
                  <div style={{ width: stats.total > 0 ? `${(stats.males / stats.total) * 100}%` : '0%' }} className="h-full bg-blue-500" />
                  <div style={{ width: stats.total > 0 ? `${(stats.females / stats.total) * 100}%` : '0%' }} className="h-full bg-pink-500" />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center space-x-4">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 animate-scale-in">
                <Calendar className="h-5 sm:h-5.5 w-5 sm:w-5.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-slate-400 font-medium text-[10px] uppercase tracking-wider block truncate">Rata-Rata Usia</span>
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 font-mono block leading-tight">
                  {stats.averageAge}
                </span>
                <span className="text-slate-400 text-[10px] block truncate">Tahun (Produktif)</span>
              </div>
            </div>
          </div>

          {/* Demographic Visualizer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Demographics Panel */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2.5">Distribusi Kelompok Usia</h3>
              <div className="space-y-3">
                {[
                  { label: '0 - 5 Tahun (Balita)', value: stats.ageGroups.balita, color: 'bg-teal-500' },
                  { label: '6 - 12 Tahun (Anak-Anak)', value: stats.ageGroups.anak, color: 'bg-sky-500' },
                  { label: '13 - 17 Tahun (Remaja)', value: stats.ageGroups.remaja, color: 'bg-indigo-500' },
                  { label: '18 - 59 Tahun (Dewasa)', value: stats.ageGroups.dewasa, color: 'bg-blue-600' },
                  { label: '60+ Tahun (Lansia)', value: stats.ageGroups.lansia, color: 'bg-amber-600' }
                ].map((grp, idx) => {
                  const percent = stats.total > 0 ? Math.round((grp.value / stats.total) * 100) : 0;
                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] sm:text-xs font-semibold text-slate-600">
                        <span>{grp.label}</span>
                        <span className="font-mono">{grp.value} Jiwa ({percent}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div style={{ width: `${percent}%` }} className={`h-full ${grp.color}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RT Distribution Panel */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-800 text-sm border-b border-slate-50 pb-2.5">Kepadatan Penduduk per RT</h3>
              <div className="w-full">
                <div className="flex items-end justify-between gap-1 xs:gap-1.5 sm:gap-3 h-44 pt-6 w-full">
                  {availableRTs.map((rt) => {
                    const count = stats.rtDistribution[rt] || 0;
                    const maxCount = Math.max(...(Object.values(stats.rtDistribution) as number[]), 1);
                    const barHeight = (count / maxCount) * 100;
                    const isSelected = selectedRT === rt;
                    return (
                      <div 
                        key={rt} 
                        onClick={() => setSelectedRT(rt === selectedRT ? null : rt)}
                        className="flex-1 flex flex-col items-center space-y-1.5 h-full justify-end group cursor-pointer min-w-0 max-w-[48px]"
                      >
                        <span className={`text-[8px] xs:text-[9px] font-mono font-bold text-white px-1 py-0.5 rounded leading-none select-none whitespace-nowrap z-10 transition-all ${
                          isSelected 
                            ? 'opacity-100 bg-blue-600 scale-110 shadow-xs' 
                            : 'opacity-0 group-hover:opacity-100 bg-slate-800'
                        }`}>
                          {count}
                        </span>
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${barHeight || 4}%`,
                            scale: isSelected ? 1.08 : 1,
                          }}
                          transition={{ 
                            type: "spring", 
                            stiffness: 150, 
                            damping: 15,
                            mass: 0.5
                          }}
                          className={`w-full rounded-t-md origin-bottom relative transition-all ${
                            isSelected 
                              ? 'bg-gradient-to-t from-blue-600 to-sky-400 shadow-md ring-2 ring-blue-400/30' 
                              : 'bg-slate-300 group-hover:bg-indigo-400'
                          }`}
                        />
                        <span className={`text-[8px] xs:text-[9px] sm:text-xs font-mono font-bold uppercase whitespace-nowrap transition-colors ${
                          isSelected ? 'text-blue-600 font-black' : 'text-slate-500'
                        }`}>RT {parseInt(rt, 10)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* RT Demographic Summary Table */}
          <div className="bg-white rounded-3xl border border-slate-120 shadow-xs overflow-hidden transition-all duration-300">
            {/* Header Area with Meta and Action Buttons */}
            <div className="p-6 border-b border-slate-100 bg-linear-to-b from-slate-50 to-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <span className="text-[10px] text-indigo-600 font-extrabold uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Sparkles className="h-3 w-3 text-indigo-500 animate-pulse" />
                  Rincian Tabulasi Dinamis
                </span>
                <h3 className="font-extrabold text-slate-900 text-base">Tabel Rincian Demografi per RT</h3>
                <p className="text-xxs sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Agregasi kepala keluarga, total jiwa, serta distribusi gender per masing-masing Rukun Tetangga (RT). Klik baris untuk menyorot di grafik atau urutkan kolom dengan mengklik kepala tabel.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                  title="Unduh data demografi dalam format Excel CSV"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Unduh Excel (CSV)</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyData}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                  title="Salin tabel sebagai format markdown teks"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                  title="Cetak lembar laporan rincian sensor"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Cetak</span>
                </button>
              </div>
            </div>

            {/* Filter, Search, and Interactive Controls */}
            <div className="p-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari RT... (misal: 01, rukun tetangga 2)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50/55 border border-slate-250 hover:border-slate-350 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 rounded-xl text-xs transition-all text-slate-800 font-semibold"
                />
              </div>

              {/* Quick Preset Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Filter className="h-3 w-3 text-slate-400" />
                  Akses Cepat:
                </span>
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    searchTerm === '' 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-650'
                  }`}
                >
                  Semua
                </button>
                {availableRTs.map(rt => {
                  const numLabel = parseInt(rt, 10).toString().padStart(2, '0');
                  const isMatch = searchTerm === numLabel;
                  return (
                    <button
                      key={rt}
                      type="button"
                      onClick={() => setSearchTerm(isMatch ? '' : numLabel)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        isMatch 
                          ? 'bg-indigo-600 text-white shadow-xs' 
                          : 'bg-slate-100/80 hover:bg-slate-200 text-slate-650'
                      }`}
                    >
                      RT {parseInt(rt, 10)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-150 bg-slate-50/50 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider">
                    {/* Header: RT */}
                    <th 
                      onClick={() => handleSort('rt')} 
                      className="py-4 px-5 pl-6 whitespace-nowrap cursor-pointer hover:bg-slate-100/50 transition-colors group select-none text-left"
                    >
                      <div className="flex items-center">
                        <span>Lingkungan Wilayah</span>
                        {renderSortIcon('rt')}
                      </div>
                    </th>

                    {/* Header: KK */}
                    <th 
                      onClick={() => handleSort('kk')} 
                      className="py-4 px-4 whitespace-nowrap cursor-pointer hover:bg-slate-100/50 transition-colors group select-none text-right"
                    >
                      <div className="flex items-center justify-end">
                        <span>Pencatatan KK</span>
                        {renderSortIcon('kk')}
                      </div>
                    </th>

                    {/* Header: Total Penduduk */}
                    <th 
                      onClick={() => handleSort('total')} 
                      className="py-4 px-6 whitespace-nowrap cursor-pointer hover:bg-slate-100/50 transition-colors group select-none text-right"
                    >
                      <div className="flex items-center justify-end">
                        <span>Jumlah Penduduk (Jiwa)</span>
                        {renderSortIcon('total')}
                      </div>
                    </th>

                    {/* Header: Laki-Laki */}
                    <th 
                      onClick={() => handleSort('males')} 
                      className="py-4 px-4 whitespace-nowrap cursor-pointer hover:bg-slate-100/50 transition-colors group select-none text-right"
                    >
                      <div className="flex items-center justify-end">
                        <span className="text-blue-600">Laki-Laki</span>
                        {renderSortIcon('males')}
                      </div>
                    </th>

                    {/* Header: Perempuan */}
                    <th 
                      onClick={() => handleSort('females')} 
                      className="py-4 px-4 whitespace-nowrap cursor-pointer hover:bg-slate-100/50 transition-colors group select-none text-right font-semibold"
                    >
                      <div className="flex items-center justify-end">
                        <span className="text-pink-600">Perempuan</span>
                        {renderSortIcon('females')}
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-xs text-slate-700 bg-white">
                  {processedTableData.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400 font-medium font-sans">
                        Tidak ada data rukun tetangga yang cocok dengan pencarian "{searchTerm}"
                      </td>
                    </tr>
                  ) : (
                    processedTableData.map((row) => {
                      const isSelected = selectedRT === row.rt;
                      const sharePct = stats.total > 0 ? ((row.total / stats.total) * 100).toFixed(1) : '0.0';
                      const maleSharePct = row.total > 0 ? Math.round((row.males / row.total) * 100) : 0;
                      const femaleSharePct = row.total > 0 ? Math.round((row.females / row.total) * 100) : 0;

                      return (
                        <tr 
                          key={row.rt} 
                          onClick={() => setSelectedRT(isSelected ? null : row.rt)}
                          className={`group cursor-pointer transition-all border-l-4 ${
                            isSelected 
                              ? 'bg-blue-50/30 border-l-indigo-600' 
                              : 'hover:bg-slate-50/65 border-l-transparent'
                          }`}
                        >
                          {/* RT cell */}
                          <td className="py-4 px-5 pl-6">
                            <div className="flex items-center space-x-3">
                              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs font-black transition-all ${
                                isSelected 
                                  ? 'bg-indigo-600 text-white shadow-xs' 
                                  : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                              }`}>
                                {parseInt(row.rt, 10).toString().padStart(2, '0')}
                              </div>
                              <div className="min-w-0">
                                <span className={`font-extrabold block transition-colors ${
                                  isSelected ? 'text-indigo-700' : 'text-slate-800'
                                }`}>
                                  Rukun Tetangga {parseInt(row.rt, 10)}
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium block">RW 015 Wanajaya</span>
                              </div>
                            </div>
                          </td>

                          {/* KK cell */}
                          <td className="py-4 px-4 text-right overflow-hidden">
                            <div className="font-mono font-extrabold text-slate-800 text-xs sm:text-sm">
                              {row.kk.toLocaleString('id-ID')}
                            </div>
                            <div className="text-[9px] text-slate-400 font-medium uppercase tracking-wide">KK Terdaftar</div>
                          </td>

                          {/* Total Penduduk share bar cell */}
                          <td className="py-4 px-6">
                            <div className="flex flex-col items-end">
                              <div className="flex items-baseline space-x-1">
                                <span className="font-mono text-xs sm:text-sm font-black text-slate-900">
                                  {row.total.toLocaleString('id-ID')}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">Jiwa</span>
                              </div>
                              <div className="w-24 sm:w-28 mt-2 space-y-1">
                                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    style={{ width: `${sharePct}%` }} 
                                    className="h-full bg-linear-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500" 
                                  />
                                </div>
                                <div className="text-[9px] text-slate-400 font-medium font-sans flex justify-between">
                                  <span>Porsi RW:</span>
                                  <span className="font-extrabold text-slate-600 font-mono">{sharePct}%</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Male distribution */}
                          <td className="py-4 px-4 text-right">
                            <div className="font-mono text-xs sm:text-sm font-bold text-blue-600">
                              {row.males.toLocaleString('id-ID')}
                            </div>
                            <span className="text-[9px] font-extrabold text-blue-500 bg-blue-50/80 px-1.5 py-0.5 rounded mt-1.5 inline-block font-sans">
                              {maleSharePct}% L
                            </span>
                          </td>

                          {/* Female distribution */}
                          <td className="py-4 px-4 text-right">
                            <div className="font-mono text-xs sm:text-sm font-bold text-pink-600">
                              {row.females.toLocaleString('id-ID')}
                            </div>
                            <span className="text-[9px] font-extrabold text-pink-500 bg-pink-50/80 px-1.5 py-0.5 rounded mt-1.5 inline-block font-sans">
                              {femaleSharePct}% P
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>

                {/* Highly structured summary status footer */}
                <tfoot>
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 text-slate-900 text-xs sm:text-sm">
                    <td className="py-5 px-5 pl-6 uppercase whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                        <span className="font-black text-slate-800">Total Keseluruhan</span>
                      </div>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <span className="font-mono font-black text-slate-900 text-xs sm:text-sm">
                        {rtStatsTotals.kk.toLocaleString('id-ID')}
                      </span>
                      <div className="text-[8px] font-bold text-slate-450 uppercase mt-0.5 tracking-wider">Total KK</div>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <span className="font-mono font-black text-slate-900 text-xs sm:text-sm">
                        {rtStatsTotals.total.toLocaleString('id-ID')}
                      </span>
                      <div className="text-[8px] font-bold text-slate-450 uppercase mt-0.5 tracking-wider">Total Jiwa</div>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <span className="font-mono font-black text-blue-700 text-xs sm:text-sm">
                        {rtStatsTotals.males.toLocaleString('id-ID')}
                      </span>
                      <div className="text-[8px] font-bold text-blue-500 uppercase mt-0.5 tracking-wider">Total Laki-Laki</div>
                    </td>
                    <td className="py-5 px-4 text-right">
                      <span className="font-mono font-black text-pink-750 text-xs sm:text-sm">
                        {rtStatsTotals.females.toLocaleString('id-ID')}
                      </span>
                      <div className="text-[8px] font-bold text-pink-500 uppercase mt-0.5 tracking-wider">Total Perempuan</div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            {/* Table Bottom Hint Info */}
            <div className="p-4 bg-slate-50/40 border-t border-slate-100 text-xxs text-slate-450 text-center font-medium font-sans">
              Data sensus RW 015 disinkronkan secara periodik dengan basis data kelurahan untuk menjamin akurasi informasi warga.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
