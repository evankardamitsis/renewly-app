import {supabaseClient} from "../../../supabaseClient.ts";

export async function getProjects({userId, token}) {
    const supabase = await supabaseClient(token);

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId);

    if (error) throw error;

    return projects;
}
