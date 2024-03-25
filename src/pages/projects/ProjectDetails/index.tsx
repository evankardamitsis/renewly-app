import {Stack} from "@mantine/core";
import ProjectNavigation from "./ProjectNavigation/ProjectNavigation.tsx";
import ProjectHeader from "./ProjectHeader/ProjectHeader.tsx";

const ProjectPage = () => {
    return (
        <Stack>
            {/*Project Header*/}
            <ProjectHeader />
            {/*Project Navigation*/}
            <ProjectNavigation />
            {/*Project Tabs Content*/}
        </Stack>
    );
};

export default ProjectPage;
