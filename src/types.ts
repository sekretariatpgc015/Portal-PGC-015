export interface StatItem {
  id: string;
  label: string;
  value: string;
  icon: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  image: string;
  section?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirements: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  tag: 'Kegiatan' | 'Informasi' | 'Kesehatan' | 'Pembangunan' | 'Sosial' | 'Keamanan';
  image: string;
  description: string;
  content: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description: string;
  category: 'Kegiatan' | 'Informasi' | 'Keamanan' | 'Keuangan' | 'Umum';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Kegiatan' | 'Sosial' | 'Keagamaan' | 'Lainnya';
  image: string;
  description: string;
  images?: {
    image: string;
    title: string;
    description: string;
  }[];
}

export type ActiveTab = 'beranda' | 'profil' | 'seksilembaga' | 'layanan' | 'berita' | 'pengumuman' | 'galeri' | 'kontak';
