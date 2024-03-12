import {supabase} from "../../../supabaseClient.ts";
import {ProjectDetails} from "./createProject.ts";

export async function updateProject(orgId:string | null, token:string | null, projectDetails : ProjectDetails, projectId:number) {
    const { data, error } = await supabase
        .from('projects')
        .update({
            ... projectDetails
        })
        .eq('id', projectId)
        .eq('org_id', orgId)

    if (error) throw new Error(error.message);

    return data;

}
