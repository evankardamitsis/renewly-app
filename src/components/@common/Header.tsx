import {ActionIcon, Flex, Title, Text} from "@mantine/core";
import {UserButton, useUser} from "@clerk/clerk-react";
import { Settings, HelpCircle } from "react-feather";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const firstName = user?.firstName

    const handleGoHome = () => {
        navigate('/');
    }

    return (
        <Flex justify="space-between" align="center" w="100%">
            {/* Left side content */}
            <Flex className={"cursor-pointer"}>
               <Title order={3} onClick={handleGoHome}>Renewly</Title>
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
