import { supabaseClient } from "../../../supabaseClient.ts";

export async function deleteProject(id:number, userId:string, token:string) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

    if (error) throw error;

    return data;
}
