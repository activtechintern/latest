import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xmjilmoccohmqiwtvnwh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtamlsbW9jY29obXFpd3R2bndoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTEzOTYsImV4cCI6MjA2MDg4NzM5Nn0.0WfPHs15w_UBnQJd9kslJS1yP3mVMbkKH7n3_KOTiVY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);