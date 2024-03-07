import {Flex, Title} from "@mantine/core";
import {UserButton} from "@clerk/clerk-react";

const Header = () => {

    return (
        <Flex justify="space-between" align="center" w="100%">
            {/* Left side content */}
            <Flex>
               <Title order={3}>Renewly</Title>
            </Flex>
            {/* Right side content */}
            <Flex ml="auto">
                <UserButton />
            </Flex>

        </Flex>
    );
};

export default Header;
