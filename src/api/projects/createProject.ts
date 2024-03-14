import {supabaseClient} from "../../../supabaseClient.ts";

export type ProjectDetails = {
    name: string;
    description: string;
    color?: string;
    created_at?: Date;
    members?: string[];
};

export async function createProject(orgId:string | null, token:string  , projectDetails : ProjectDetails) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from('projects')
        .insert({
            org_id: orgId,
            name: projectDetails.name,
            description: projectDetails.description,
            color: projectDetails.color,
            created_at: new Date().toISOString(),

        })

    if (error) throw new Error(error.message);

    return data;
}
