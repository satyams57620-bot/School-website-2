import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, hasSupabaseConfig } from '@/lib/supabase';
import {
  FALLBACK_MESSAGES,
  FALLBACK_NEWS,
  FALLBACK_TEACHERS,
  FALLBACK_FACILITIES
} from '@/lib/fallback-data';

// --- NEWS & EVENTS ---
export function useNews() {
  return useQuery({
    queryKey: ['news_events'],
    queryFn: async () => {
      if (!hasSupabaseConfig()) return FALLBACK_NEWS;
      const { data, error } = await supabase.from('news_events').select('*').order('event_date', { ascending: false });
      if (error || !data || data.length === 0) return FALLBACK_NEWS;
      return data;
    }
  });
}

export function useAddNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: { title: string; content: string; event_date: string; category: string }) => {
      const { error } = await supabase.from('news_events').insert([item]);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['news_events'] })
  });
}

export function useUpdateNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...fields }: { id: string; title: string; content: string; event_date: string; category: string }) => {
      const { error } = await supabase.from('news_events').update(fields).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['news_events'] })
  });
}

export function useDeleteNews() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('news_events').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['news_events'] })
  });
}

// --- TEACHERS ---
export function useTeachers() {
  return useQuery({
    queryKey: ['teachers'],
    queryFn: async () => {
      if (!hasSupabaseConfig()) return FALLBACK_TEACHERS;
      const { data, error } = await supabase.from('teachers').select('*').order('sort_order', { ascending: true });
      if (error || !data || data.length === 0) return FALLBACK_TEACHERS;
      return data;
    }
  });
}

export function useAddTeacher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: { name: string; subject: string; designation: string; image_name: string; sort_order: number }) => {
      const { error } = await supabase.from('teachers').insert([item]);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['teachers'] })
  });
}

export function useUpdateTeacher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...fields }: { id: string; name: string; subject: string; designation: string; image_name: string }) => {
      const { error } = await supabase.from('teachers').update(fields).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['teachers'] })
  });
}

export function useDeleteTeacher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('teachers').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['teachers'] })
  });
}

// --- FACILITIES ---
export function useFacilities() {
  return useQuery({
    queryKey: ['facilities'],
    queryFn: async () => {
      if (!hasSupabaseConfig()) return FALLBACK_FACILITIES;
      const { data, error } = await supabase.from('facilities').select('*').order('sort_order', { ascending: true });
      if (error || !data || data.length === 0) return FALLBACK_FACILITIES;
      return data;
    }
  });
}

export function useUpdateFacility() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...fields }: { id: string; name: string; description: string; image_name: string }) => {
      const { error } = await supabase.from('facilities').update(fields).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['facilities'] })
  });
}

export function useAddFacility() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: { name: string; description: string; image_name: string; sort_order: number }) => {
      const { error } = await supabase.from('facilities').insert([item]);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['facilities'] })
  });
}

export function useDeleteFacility() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('facilities').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['facilities'] })
  });
}

// --- MESSAGES ---
export function useMessages() {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      if (!hasSupabaseConfig()) return Object.values(FALLBACK_MESSAGES);
      const { data, error } = await supabase.from('messages').select('*');
      if (error || !data || data.length === 0) return Object.values(FALLBACK_MESSAGES);
      return data;
    }
  });
}

export function useUpsertMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: { role: string; name: string; message: string }) => {
      const { error } = await supabase.from('messages').upsert([{ ...item, updated_at: new Date().toISOString() }], { onConflict: 'role' });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['messages'] })
  });
}

// --- GALLERY ---
export const FALLBACK_GALLERY = [
  { id: '1', title: 'Campus View', image_url: 'gallery_1.jpg' },
  { id: '2', title: 'Annual Day', image_url: 'gallery_2.jpg' },
  { id: '3', title: 'Sports Meet', image_url: 'gallery_3.jpg' },
  { id: '4', title: 'Science Exhibition', image_url: 'gallery_4.jpg' },
  { id: '5', title: 'Classroom', image_url: 'gallery_5.jpg' },
];

export function useGallery() {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: async () => {
      if (!hasSupabaseConfig()) return FALLBACK_GALLERY;
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) return FALLBACK_GALLERY;
      return data;
    }
  });
}

export function useAddGallery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: { title: string; image_url: string }) => {
      const { error } = await supabase.from('gallery').insert([item]);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] })
  });
}

export function useDeleteGallery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['gallery'] })
  });
}

// --- TOPPERS ---
const FALLBACK_TOPPERS_10 = [
  { id: 'f1', name: 'Priya Sharma',   percentage: '96.8', class_level: 10, rank: 1, image_url: '', year: '2024' },
  { id: 'f2', name: 'Rohit Verma',    percentage: '95.2', class_level: 10, rank: 2, image_url: '', year: '2024' },
  { id: 'f3', name: 'Ananya Singh',   percentage: '94.6', class_level: 10, rank: 3, image_url: '', year: '2024' },
  { id: 'f4', name: 'Arjun Gupta',    percentage: '93.4', class_level: 10, rank: 4, image_url: '', year: '2024' },
  { id: 'f5', name: 'Neha Patel',     percentage: '92.0', class_level: 10, rank: 5, image_url: '', year: '2024' },
];
const FALLBACK_TOPPERS_12 = [
  { id: 'g1', name: 'Aditya Kumar',   percentage: '97.2', class_level: 12, rank: 1, image_url: '', year: '2024' },
  { id: 'g2', name: 'Sneha Mishra',   percentage: '95.8', class_level: 12, rank: 2, image_url: '', year: '2024' },
  { id: 'g3', name: 'Vivek Yadav',    percentage: '94.4', class_level: 12, rank: 3, image_url: '', year: '2024' },
  { id: 'g4', name: 'Pooja Tiwari',   percentage: '93.0', class_level: 12, rank: 4, image_url: '', year: '2024' },
  { id: 'g5', name: 'Manish Dubey',   percentage: '91.6', class_level: 12, rank: 5, image_url: '', year: '2024' },
];

export function useToppers(classLevel: 10 | 12) {
  return useQuery({
    queryKey: ['toppers', classLevel],
    queryFn: async () => {
      if (!hasSupabaseConfig()) return classLevel === 10 ? FALLBACK_TOPPERS_10 : FALLBACK_TOPPERS_12;
      const { data, error } = await supabase
        .from('toppers')
        .select('*')
        .eq('class_level', classLevel)
        .order('rank', { ascending: true });
      if (error || !data || data.length === 0) return classLevel === 10 ? FALLBACK_TOPPERS_10 : FALLBACK_TOPPERS_12;
      return data;
    }
  });
}

export function useAddTopper() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (item: { name: string; percentage: string; image_url: string; year: string; rank: number; class_level: 10 | 12 }) => {
      const { error } = await supabase.from('toppers').insert([item]);
      if (error) throw error;
    },
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ['toppers', v.class_level] })
  });
}

export function useUpdateTopper() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...fields }: { id: string; name: string; percentage: string; image_url: string; year: string; rank: number; class_level: 10 | 12 }) => {
      const { error } = await supabase.from('toppers').update(fields).eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, v) => { qc.invalidateQueries({ queryKey: ['toppers', 10] }); qc.invalidateQueries({ queryKey: ['toppers', 12] }); }
  });
}

export function useDeleteTopper() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('toppers').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['toppers', 10] }); qc.invalidateQueries({ queryKey: ['toppers', 12] }); }
  });
}
