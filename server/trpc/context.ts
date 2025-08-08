import { initTRPC } from '@trpc/server';
import { supabase } from '../db/supabase';

const t = initTRPC.context<{
  supabase: typeof supabase;
}>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const createContext = () => ({
  supabase,
});
