import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://gnlxeobbknqrwwgpcwzh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdubHhlb2Jia25xcnd3Z3Bjd3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NTIxMjcsImV4cCI6MjA3MDIyODEyN30.lP2taC6EIY2AJ84Ot6Lei3MqCybqBGxXgzVZHbaGUnc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Message {
  id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface NewMessage {
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
}
