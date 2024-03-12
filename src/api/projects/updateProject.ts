// import {supabase} from "../../../supabaseClient.ts";
//
// export async function updateProject(projectId: string, updates: never) {
//     const { data, error } = await supabase
//         .from('Projects')
//         .update(updates)
//         .match({ id: projectId });
//     if (error) throw error;
//     return data;
// }
