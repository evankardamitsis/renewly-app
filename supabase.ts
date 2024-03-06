
import { createClient } from "@supabase/supabase-js";

//@ts-expect-error troll supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
//@ts-expect-error troll supabase
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

