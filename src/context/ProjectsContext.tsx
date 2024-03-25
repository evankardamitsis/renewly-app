import React, {createContext, useContext, useEffect, useState} from 'react';
import {useAuth} from "@clerk/clerk-react";
import {getProjects} from "../api/projects/getProjects.ts";

const ProjectsContext = createContext();

export const useProjects = () => useContext(ProjectsContext);

export const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    const { getToken, isLoaded, orgId } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            if (isLoaded) {
                const token = await getToken({ template: 'supabase' });
                if (token) {
                    const fetchedProjects = await getProjects({ orgId, token });
                    setProjects(fetchedProjects);
                }
            }
        };

        fetchProjects();
    }, [getToken, isLoaded, orgId]);

    if (!isLoaded) return "Loading..."

    return (
        <ProjectsContext.Provider value={{ projects, setProjects }}>
    {children}
    </ProjectsContext.Provider>
);
};
