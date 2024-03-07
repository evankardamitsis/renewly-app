import {Stack} from "@mantine/core";
import {OrganizationSwitcher} from "@clerk/clerk-react";

const Sidebar = () => {
    return (
        <Stack>
            <OrganizationSwitcher />
        </Stack>
    );
};

export default Sidebar;
