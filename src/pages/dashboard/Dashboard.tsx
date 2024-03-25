import {Button, Flex, Stack, Title} from "@mantine/core";
import {useAuth} from "@clerk/clerk-react";
import { useState} from "react";
import {getProjects} from "../../api/projects/getProjects.ts";
import {deleteProject} from "../../api/projects/deleteProject.ts";
import CreateProjectModal from "../../components/projects/CreateProjectModal/CreateProjectModal.tsx";
import {toast} from "sonner";
import {useProjects} from "../../context/ProjectsContext.tsx";

export default function DashboardPage() {
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
    const { projects, setProjects } = useProjects();
    const { orgId, getToken } = useAuth();
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
        <Stack w={"100%"}>
            <Flex justify={"space-between"} align={"center"}>
            <Title order={2}>Overview</Title>
            <Button radius={"sm"} onClick={() => setCreateProjectModalOpen(true)}>Create Project</Button>
            </Flex>
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
        </Stack>
    );
}
