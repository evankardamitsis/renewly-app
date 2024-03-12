import { supabaseClient } from "../../../supabaseClient.ts";

export async function deleteProject(id, userId, token) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

    if (error) throw error;

    return data;
}
