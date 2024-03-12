import { useAuth } from "@clerk/clerk-react"
import { Outlet,  } from "react-router-dom"
import {useDisclosure} from "@mantine/hooks";
import {AppShell, Burger, Flex} from "@mantine/core";
import Header from "../components/@common/Header.tsx";
import Sidebar from "../components/@common/Sidebar.tsx";

export default function DashboardLayout() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const {  isLoaded } = useAuth()

    if (!isLoaded) return "Loading..."

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: "xl",
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Flex mt="sm" gap="md" align="center" px="md">
                    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                    <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                    <Header />
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Sidebar />
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}
