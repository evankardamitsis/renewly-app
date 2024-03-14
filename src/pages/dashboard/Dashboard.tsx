import {Button} from "@mantine/core";
import {useAuth} from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import {getProjects} from "../../api/projects/getProjects.ts";
import {deleteProject} from "../../api/projects/deleteProject.ts";
import CreateProjectModal from "../../components/projects/CreateProjectModal/CreateProjectModal.tsx";

interface Project {
    id: number;
    name: string;
    description: string;
    color?: string;
}

export default function DashboardPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
    const { userId, orgId, getToken } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
           const token = await getToken({template:'supabase'})

            if (token && (orgId || userId)) {
                // Ensure orgId is a string when passed to getProjects
                const projects = await getProjects({ orgId: orgId || '', token });
                setProjects(projects);
            }
        };
        fetchProjects();
    }, [getToken, orgId, userId]);

    // const handleCreateProject = async () => {
    //     const token = await getToken({template:'supabase'})
    //
    //    await createProject(orgId, token, {
    //         name: "new btf Project",
    //         description: "This is a new project",
    //         color: "#FF5733"
    //     });
    //
    //     const projects = await getProjects({orgId, userId, token});
    //     setProjects(projects);
    // }

    const handleDeleteProject = async (id: number) => {
        // Ensure token is a string
        const token = await getToken({ template: 'supabase' });
        if (token) {
            await deleteProject(id, userId || '', token);

            // Ensure orgId is a string when passed to getProjects
            const updatedProjects = await getProjects({ orgId: orgId || '', token });
            setProjects(updatedProjects);
        }
    }


    return (
        <>
            <h1>Dashboard page</h1>
            <p>This is a protected page.</p>
            <Button onClick={() => setCreateProjectModalOpen(true)}>Create Project</Button>
            {projects.map((project) => (
                <div key={project.id}>
                    <h2 style={{ color: project.color }}>{project.name}</h2>
                    <p>{project.description}</p>
                    <Button onClick={() => handleDeleteProject(project.id)}>Delete Project</Button>
                </div>
            ))}
            <CreateProjectModal
                isOpen={createProjectModalOpen}
                onClose={() => setCreateProjectModalOpen(false)}
            />
        </>
    );
}
