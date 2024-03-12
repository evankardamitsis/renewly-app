import {supabaseClient} from "../../../supabaseClient.ts";

export type ProjectDetails = {
    name: string;
    description: string;
};

export async function createProject(userId, token, projectDetails : ProjectDetails) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from('projects')
        .insert({
            user_id: userId,
            ... projectDetails

        })

    if (error) throw new Error(error.message);

    return data;
}
