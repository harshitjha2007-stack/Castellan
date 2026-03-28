/**
 * Supabase Client Configuration
 * Replace the placeholder values with your actual Supabase project credentials.
 * Get them from: https://app.supabase.com → Project Settings → API
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
