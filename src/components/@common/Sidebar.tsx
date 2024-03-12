import {Stack} from "@mantine/core";
import {OrganizationSwitcher} from "@clerk/clerk-react";

const Sidebar = () => {
    return (
        <Stack w="100%">
            <OrganizationSwitcher />
        </Stack>
    );
};

export default Sidebar;
