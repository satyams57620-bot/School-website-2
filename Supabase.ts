import { createClient } from '@supabase/supabase-js';

function cleanSupabaseUrl(raw: string): string {
  try {
    const trimmed = raw.trim().replace(/\/$/, '');
    const parsed = new URL(trimmed);
    return parsed.origin;
  } catch {
    return 'https://placeholder.supabase.co';
  }
}

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabaseUrl = rawUrl ? cleanSupabaseUrl(rawUrl) : 'https://placeholder.supabase.co';
const supabaseAnonKey = rawKey.trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const hasSupabaseConfig = () => {
  return !!rawUrl && !!rawKey && !supabaseUrl.includes('placeholder');
};
