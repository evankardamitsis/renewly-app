import { Stack, Loader as MantineLoader } from "@mantine/core";

export default function LoadingComponent() {
    return (
        <Stack w="100%" h="100%" align="center" justify="center">
            <MantineLoader size="xl" opacity={0.5} />
        </Stack>
    )
}
