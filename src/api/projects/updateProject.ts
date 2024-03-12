import {supabaseClient} from "../../../supabaseClient.ts";
import {ProjectDetails} from "./createProject.ts";

export async function updateProject(id:number, orgId:string, token:string, projectDetails : ProjectDetails) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from('projects')
        .update({
            org_id: orgId,
            ... projectDetails
        })
        .eq('id', id);

    if (error) throw error;

    return data;
}
