import {Flex, NavLink, Stack, Title, Text} from "@mantine/core";
import {OrganizationSwitcher, useAuth} from "@clerk/clerk-react";
import { UserPlus, Plus } from "react-feather";
import {useEffect, useState} from "react";
import CreateProjectModal from "../projects/CreateProjectModal/CreateProjectModal.tsx";
import {Link} from "react-router-dom";
import {getProjects} from "../../api/projects/getProjects.ts";

type SidebarProps = {
    setProjects?: (projects: Project[]) => void
}

const Sidebar = ({setProjects}: SidebarProps) => {
    const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
    const [projects, setLocalProjects] = useState([]);

    const { orgId, getToken } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            const token = await getToken({ template: 'supabase' });
            // Check for token validity and presence of either orgId or userId
            if (token) {
                // Pass the orgId and userId to the getProjects function
                const projects = await getProjects({ orgId, token });
                setLocalProjects(projects);
            }
        };
        fetchProjects();
    }, [getToken, orgId]);

    return (
        <Stack>
            <Flex>
                <OrganizationSwitcher
                    hidePersonal={true}
                />
            </Flex>
            <Stack gap={0}>
                <NavLink
                    component={Link}
                    to="/projects"
                    label={
                        <Text fz={"sm"} fw={500} c={"#6A696A"}>PROJECTS</Text>
                    }
                    fw={600}
                    rightSection={<Plus color={"#6A696A"} onClick={() => setCreateProjectModalOpen(true)} />}
                />
                {projects.map((project) => (
                    <NavLink
                        key={project.id}
                        component={Link}
                        to={`/projects/${project.id}`}
                        label={
                            <Text fz={"sm"} bg={project.color || "lightGray"} p={"xs"} fw={500} c={"#6A696A"}>{project.name}</Text>
                        }
                    />
                ))}
            </Stack>
            {/* Invite members button*/}
            {/*//todo:fix this correctly*/}
            <Flex mt={"59dvh"} justify={"center"} align={"center"} gap={"sm"} className={"border-t-2 cursor-pointer"} pt={"sm"}>
                <UserPlus />
                <Title fz={12} order={5}>Invite</Title>
            </Flex>
            <CreateProjectModal
                isOpen={createProjectModalOpen}
                onClose={() => setCreateProjectModalOpen(false)}
                setProjects={setProjects}
            />
        </Stack>
    );
};

export default Sidebar;
