import React from 'react';
import {Modal, Stack, Title, Text, Flex, Badge, TextInput, MultiSelect, Button} from "@mantine/core";
import {useForm} from "@mantine/form";
import {ProjectColorPicker} from "../../../models/ProjectColorPicker.ts";
import {useOrganization} from "@clerk/clerk-react";

type CreateProjectModalProps = {
    isOpen: boolean
    onClose: () => void
}

const CreateProjectModal = ({  isOpen, onClose }: CreateProjectModalProps) => {

    const { memberships } = useOrganization({
        memberships: {
            infinite: true,
            keepPreviousData: true,
        },
    });


    const members = memberships.data?.map((membership) => ({
        value: membership.publicUserData.identifier,
        label: `${membership.publicUserData.firstName} ${membership.publicUserData.lastName}`,
    }));

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
    }

    // const handleSubmit = () => {
    //     // Submit form data to backend
    //     console.log(form.values);
    //
    //     handleClose();
    // }

    const handleClose = () => {
        onClose()
        form.reset()
    }

    return (
        <Modal
            opened={isOpen}
            onClose={handleClose}
            rounded="md"
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
                                    borderRadius: 0,
                                    cursor: 'pointer',
                                    border: '1px solid #000',
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
                </Stack>
                <Button mt="xl">Create Project</Button>
            </Stack>
        </Modal>
    );
};

export default CreateProjectModal;
