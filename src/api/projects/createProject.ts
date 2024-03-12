import {supabaseClient} from "../../../supabaseClient.ts";

export type ProjectDetails = {
    name: string;
    description: string;
};

export async function createProject(orgId:string | null, token:string | null, projectDetails : ProjectDetails) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from('projects')
        .insert({
            org_id: orgId,
            ... projectDetails

        })

    if (error) throw new Error(error.message);

    return data;
}
