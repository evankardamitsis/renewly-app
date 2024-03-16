import {Button} from "@mantine/core";
import {useAuth} from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import {getProjects} from "../../api/projects/getProjects.ts";
import {deleteProject} from "../../api/projects/deleteProject.ts";
import CreateProjectModal from "../../components/projects/CreateProjectModal/CreateProjectModal.tsx";
import {toast} from "sonner";

interface Project {
    id: number;
    name: string;
    description: string;
    color?: string;
}

export default function DashboardPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
    const { orgId, getToken } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            const token = await getToken({ template: 'supabase' });
            // Check for token validity and presence of either orgId or userId
            if (token) {
                // Pass the orgId and userId to the getProjects function
                const projects = await getProjects({ orgId, token });
                setProjects(projects);
            }
        };
        fetchProjects();
    }, [getToken, orgId]);

    const handleDeleteProject = async (id: number) => {
        const token = await getToken({ template: 'supabase' });
        if (token) {
            await deleteProject(id, token);
            toast('Project deleted successfully', { position: 'bottom-right', type: 'success' });
            // Optional: Re-fetch projects list after deletion
            const updatedProjects = await getProjects({ orgId: orgId || '', token });
            setProjects(updatedProjects);
        }
    };

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
                setProjects={setProjects}
            />
        </>
    );
}
