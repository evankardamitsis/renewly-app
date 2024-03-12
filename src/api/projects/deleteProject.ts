import {supabase} from "../../../supabaseClient.ts";

export async function deleteProject(projectId:string) {
    const { data, error } = await supabase
        .from('Projects')
        .delete()
        .match({ id: projectId });
    if (error) throw error;
    return data;
}
