import { useState, useEffect } from 'react';

export interface Resident {
  NO: string;
  RT: string;
  NAMA: string;
  ALAMAT: string;
  'NO KK': string;
  NIK: string;
  'JENIS KELAMIN': string;
  'TEMPAT LAHIR': string;
  'TGL. LAHIR': string;
  USIA: string;
  AGAMA: string;
  'HUB. KELUARGA': string;
  'STATUS KAWIN': string;
  'PENDIDIKAN TERAKHIR': string;
  PEKERJAAN: string;
  'STTS TINGGAL': string;
  'NAMA AYAH': string;
  'NAMA IBU': string;
  KETERANGAN: string;
}

export interface DemografiStats {
  rt: number;
  kepalaKeluarga: number;
  jiwa: number;
  luasWilayah: string;
}

const DEFAULT_STATS: DemografiStats = {
  rt: 9,
  kepalaKeluarga: 432,
  jiwa: 1842,
  luasWilayah: '2,1 km²'
};

let cachedStats: DemografiStats | null = null;
let cachedResidents: Resident[] | null = null;
let fetchPromise: Promise<{ stats: DemografiStats; residents: Resident[] }> | null = null;

export function useDemografi() {
  const [stats, setStats] = useState<DemografiStats>(cachedStats || DEFAULT_STATS);
  const [residents, setResidents] = useState<Resident[]>(cachedResidents || []);
  const [loading, setLoading] = useState(!cachedStats);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedStats) {
      setStats(cachedStats);
      setResidents(cachedResidents || []);
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = (async () => {
        const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRh_ePcQk6dlMg-n35ZQEyp_PGDJKFR0Jyf-dVMTKFdVYwZ7MReVZ8xww_1pIMNqUEWE_087gZd26nR/pub?gid=1135930185&single=true&output=csv';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Gagal menghubungkan ke server Google Sheets. Silakan coba lagi.');
        }
        const text = await response.text();
        
        // Custom parser to handle quotes and commas safely
        const lines = text.split('\r\n').join('\n').split('\n');
        if (lines.length < 2) {
          throw new Error('Format database kosong atau tidak valid.');
        }

        const rawHeaders = lines[0].split(',').map(h => h.trim());
        const parsedResidents: Resident[] = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const values: string[] = [];
          let current = '';
          let inQuotes = false;
          
          for (let charIndex = 0; charIndex < line.length; charIndex++) {
            const char = line[charIndex];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              values.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          values.push(current.trim());

          const residentObj: Record<string, string> = {};
          rawHeaders.forEach((header, idx) => {
            residentObj[header] = values[idx] || '';
          });

          if (residentObj['NAMA'] || residentObj['NO']) {
            parsedResidents.push(residentObj as unknown as Resident);
          }
        }

        const uniqueRTs = new Set<string>();
        let kkCount = 0;

        parsedResidents.forEach(r => {
          const rtNum = r.RT ? r.RT.padStart(3, '0') : '';
          if (rtNum) uniqueRTs.add(rtNum);

          const hub = (r['HUB. KELUARGA'] || '').toUpperCase();
          if (hub === 'KEPALA KELUARGA' || hub === 'KEPALA') {
            kkCount++;
          }
        });

        const computedStats: DemografiStats = {
          rt: uniqueRTs.size > 0 ? uniqueRTs.size : 9,
          kepalaKeluarga: kkCount > 0 ? kkCount : 432,
          jiwa: parsedResidents.length > 0 ? parsedResidents.length : 1842,
          luasWilayah: '2,1 km²'
        };

        cachedStats = computedStats;
        cachedResidents = parsedResidents;

        return { stats: computedStats, residents: parsedResidents };
      })();
    }

    let isMounted = true;
    fetchPromise
      .then(res => {
        if (isMounted) {
          setStats(res.stats);
          setResidents(res.residents);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err?.message || 'Gagal membaca data demografi.');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, residents, loading, error };
}
