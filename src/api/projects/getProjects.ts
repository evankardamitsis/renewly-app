import { supabaseClient } from "../../../supabaseClient.ts";

type Props =  {
    orgId: string | null
    token: string | null
}

export async function getProjects({ orgId, token }:Props) {
    const supabase = await supabaseClient(token);

    let query = supabase.from('projects').select('*');
    if (orgId) {
        query = query.eq('org_id', orgId);
    } else {
        // Fetch projects with no org_id associated
        query = query.is('org_id', null);
    }

    const { data: projects, error } = await query;

    if (error) throw error;

    return projects;
}
