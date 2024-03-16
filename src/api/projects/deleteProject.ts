import { supabaseClient } from "../../../supabaseClient.ts";

export async function deleteProject(id:number, token:string) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

    if (error) throw error;

    return data;
}
