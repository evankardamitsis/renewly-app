import { supabaseClient } from "../../../supabaseClient.ts";

type Props =  {
    orgId: string | null
    token: string
}

export async function getProjects({ orgId, token }:Props) {
    const supabase = await supabaseClient(token);

    let query = supabase.from('projects').select('id, name, description, color, created_at, members')

    if (orgId) {
        query = query.eq('org_id', orgId);
    }

    const { data: projects, error } = await query;

    if (error) console.error('Error fetching projects:', error);


    return projects;
}
