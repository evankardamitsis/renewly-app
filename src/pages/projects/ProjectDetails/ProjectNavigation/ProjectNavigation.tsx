import {IconMessageCircle, IconPhoto, IconSettings} from "@tabler/icons-react";
import {Tabs} from "@mantine/core";
import ProjectOverview from "../../../../components/projects/ProjectOverview/ProjectOverview.tsx";
import ProjectTasks from "../../../../components/projects/ProjectTasks/ProjectTasks.tsx";
import ProjectRiskAssessment from "../../../../components/projects/ProjectRiskAssessment/ProjectRiskAssessment.tsx";
import ProjectFiles from "../../../../components/projects/ProjectFiles/ProjectFiles.tsx";

const ProjectNavigation = () => {
    return (
        <Tabs defaultValue="gallery">
            <Tabs.List>
                <Tabs.Tab value="overview" leftSection={<IconPhoto />}>
                    Overview
                </Tabs.Tab>
                <Tabs.Tab value="tasks" leftSection={<IconMessageCircle />}>
                    Tasks
                </Tabs.Tab>
                <Tabs.Tab value="risk" leftSection={<IconSettings />}>
                    Risk Assessment
                </Tabs.Tab>
                <Tabs.Tab value="files" leftSection={<IconSettings />}>
                    Files
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overview">
                <ProjectOverview />
            </Tabs.Panel>

            <Tabs.Panel value="tasks">
                <ProjectTasks />
            </Tabs.Panel>

            <Tabs.Panel value="risk">
                <ProjectRiskAssessment />
            </Tabs.Panel>

            <Tabs.Panel value="files">
                <ProjectFiles />
            </Tabs.Panel>
        </Tabs>
    );
};

export default ProjectNavigation;
