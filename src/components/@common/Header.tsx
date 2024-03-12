import {ActionIcon, Flex, Title, Text} from "@mantine/core";
import {UserButton, useUser} from "@clerk/clerk-react";
import { Settings, HelpCircle } from "react-feather";

const Header = () => {

    const { user } = useUser();

    const firstName = user.firstName;

    return (
        <Flex justify="space-between" align="center" w="100%">
            {/* Left side content */}
            <Flex>
               <Title order={3}>Renewly</Title>
            </Flex>
            {/* Right side content */}
            <Flex ml="auto" align="center" gap="md">
                <Flex gap="sm" mr="md">
                    <ActionIcon variant="transparent" c="black">
                        <HelpCircle />
                    </ActionIcon>
                    <ActionIcon variant="transparent" c="black">
                        <Settings />
                    </ActionIcon>
                </Flex>
                <Text fz={12} fw={500}>Hi, {firstName}</Text>
                <UserButton />
            </Flex>

        </Flex>
    );
};

export default Header;
