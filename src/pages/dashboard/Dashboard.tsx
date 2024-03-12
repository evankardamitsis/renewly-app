import {Button} from "@mantine/core";
import {createProject} from "../../api/projects/createProject.ts";
import {useAuth} from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import {getProjects} from "../../api/projects/getProjects.ts";
import {deleteProject} from "../../api/projects/deleteProject.ts";

interface Project {
    id: number;
    name: string;
    description: string;
}

export default function DashboardPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const { userId, orgId, getToken } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
           const token = await getToken({template:'supabase'})

            const projects = await getProjects({orgId, userId, token});

            setProjects(projects);
        };
        fetchProjects();
    }, [getToken, orgId, userId]);

    const handleCreateProject = async () => {
        const token = await getToken({template:'supabase'})

       await createProject(orgId, token, {
            name: "BTF Project",
            description: "This is a new project"
        });

        const projects = await getProjects({orgId, userId, token});
        setProjects(projects);
    }

    const handleDeleteProject = async (id:number) => {
        const token = await getToken({ template: 'supabase' });

        await deleteProject(id, userId, token);

        const projects = await getProjects({userId, orgId, token});
        setProjects(projects);
    }


    return (
        <>
            <h1>Dashboard page</h1>
            <p>This is a protected page.</p>
            <Button onClick={handleCreateProject}>Create Project</Button>
            {projects.map((project) => (
                <div key={project.id}>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                    <Button onClick={() => handleDeleteProject(project.id)}>Delete Project</Button>
                </div>
            ))}
        </>
    );
}
