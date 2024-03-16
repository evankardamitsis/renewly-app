import {Modal, Stack, Title, Text, Flex, Badge, TextInput, MultiSelect, Button} from "@mantine/core";
import {useForm} from "@mantine/form";
import {ProjectColorPicker} from "../../../types/ProjectColorPicker.ts";
import {useAuth, useOrganization} from "@clerk/clerk-react";
import {createProject} from "../../../api/projects/createProject.ts";
import {useState} from "react";
import {toast} from "sonner";
import {getProjects} from "../../../api/projects/getProjects.ts";

type CreateProjectModalProps = {
    isOpen: boolean
    onClose: () => void
    setProjects: (projects: Project[]) => void
}

const CreateProjectModal = ({  isOpen, onClose, setProjects }: CreateProjectModalProps) => {
    const {orgId, getToken} = useAuth()
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const { memberships } = useOrganization({
        memberships: {
            infinite: true,
            keepPreviousData: true,
        },
    });

    const members = memberships?.data?.map((membership) => ({
        value: membership.publicUserData.identifier,
        label: `${membership.publicUserData.firstName} ${membership.publicUserData.lastName}`,
    })) || [];

    const handleCreateProject = async () => {
        const token = await getToken({template:'supabase'})

       await createProject(orgId, token, {
            name: form.values.projectName,
            description: form.values.projectDescription,
            color: form.values.projectColor,
        });
        const updatedProjects = await getProjects({ orgId: orgId || '', token });
        setProjects(updatedProjects);
        toast("Project created successfully", { position: 'bottom-right', autoClose: 3000, type: 'success' });
        handleClose();
    }

    const form = useForm({
        initialValues: {
            projectName: '',
            projectColor: '',
            projectDescription: '',
        },
        validate: {
            projectName: (value) => (value.trim() ? null : 'Project name is required'),
        },
    });

    const handleColorSelect = (color: keyof typeof ProjectColorPicker) => {
        form.setFieldValue('projectColor', ProjectColorPicker[color]);
        setSelectedColor(ProjectColorPicker[color]);
    }

    const handleClose = () => {
        onClose()
        form.reset()
        setSelectedColor(null)
    }

    return (
        <Modal
            opened={isOpen}
            onClose={handleClose}
            radius="md"
            overlayProps={{
                backgroundOpacity: 0.15,
                blur: 0,
            }}
            styles={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 128, 0.05)',
                },
            }}
        >
            <Stack p="lg">
                <Title className="text-center" order={2} mb="xl">Create New Project</Title>
                <Stack gap="lg">
                    <Text fw={500}>Select project color</Text>
                    <Flex gap="xs">
                        {(Object.keys(ProjectColorPicker) as (keyof typeof ProjectColorPicker)[]).map((color) => (
                            <Badge
                                key={color}
                                style={{
                                    backgroundColor: ProjectColorPicker[color],
                                    width: 10,
                                    height: 20,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    border: selectedColor === ProjectColorPicker[color] ? '2px solid black' : '1px solid #000',
                                    boxShadow: selectedColor === ProjectColorPicker[color] ? '0px 0px 1px black' : 'none',
                                }}
                                onClick={() => handleColorSelect(color)}
                                aria-label={color}
                            />
                        ))}
                    </Flex>
                    <TextInput
                        size="md"
                        variant="unstyled"
                        label="Project name"
                        placeholder="Enter project name"
                        required
                        {...form.getInputProps('projectName')}
                        style={{ borderBottom: '1px solid #000'}}
                    />
                    <TextInput
                        size="md"
                        variant="unstyled"
                        label="Project description"
                        placeholder="Enter project description (optional)"
                        {...form.getInputProps('projectDescription')}
                        style={{ borderBottom: '1px solid #000' }}
                    />
                    {orgId && (
                    <Stack mt="lg">
                        <Text fw={500}>Assign Members to your project (optional)</Text>

                        <MultiSelect
                            searchable
                            clearable
                            hidePickedOptions
                            nothingFoundMessage="No members found..."
                            data={members}
                            variant='unstyled'
                            placeholder="Select members"
                            style={{borderBottom: '1px solid #000'}}
                        />
                    </Stack>
                    )}
                </Stack>
                <Button mt="xl" onClick={handleCreateProject}>Create Project</Button>
            </Stack>
        </Modal>
    );
};

export default CreateProjectModal;
