import {Button} from "@mantine/core";
import {createProject} from "../../api/projects/createProject.ts";
import {useAuth} from "@clerk/clerk-react";
import {useEffect, useState} from "react";
import {getProjects} from "../../api/projects/getProjects.ts";

export default function DashboardPage() {
    const [projects, setProjects] = useState([]);
    const { userId, getToken } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
           const token = await getToken({template:'supabase'})

            const projects = await getProjects({userId, token});

            setProjects(projects);
        };
        fetchProjects();
    }, [getToken, userId]);

    const handleCreateProject = async () => {
        const token = await getToken({template:'supabase'})
        const addProject = await createProject(userId, token, {
            name: "New Project",
            description: "This is a new project"
        });
        const projects = await getProjects({userId, token});

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
                </div>
            ))}
        </>
    );
}
