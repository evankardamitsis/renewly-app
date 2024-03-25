import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { useProjects } from '../../../../context/ProjectsContext.tsx';
import { Flex, Title } from '@mantine/core';

const ProjectHeader = () => {
    const { projectId } = useParams();
    const { projects } = useProjects();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const foundProject = projects.find((p) => p.id.toString() === projectId);
        setProject(foundProject);
    }, [projects, projectId]);

    if (!project) return null;

    return (
        <Flex p={"sm"} justify={"space-between"}>
            <Title order={3} c={project.color || "black"}>{project.name}</Title>
            <Flex gap={"sm"}>
                <Title order={5}>See all</Title>
                {/*//Todo: add projects members here*/}
                project members here
            </Flex>
        </Flex>
    );
};

export default ProjectHeader;
