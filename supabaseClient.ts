import {createClient} from "@supabase/supabase-js";

export const supabaseClient = async(supabaseToken) => {
    const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY,
        {
            global: {headers: { Authorization: `Bearer ${supabaseToken}` } },
        }
    );

    return supabase;
}
