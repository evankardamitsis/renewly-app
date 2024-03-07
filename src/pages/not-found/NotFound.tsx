import {Stack, Title} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {IconHome} from "@tabler/icons-react";

const NotFound = () =>{

    const navigate = useNavigate()

    return <Stack justify={'center'} align={'center'} h={'80dvh'} gap={40}>
        {/*//Todo: CHANGE THIS WITH THE LOGO*/}
        <IconHome onClick={()=>navigate('/')} style={{cursor:'pointer'}}/>
        <Title order={1}>404</Title>
        <Title order={4}>Not Found</Title>
    </Stack>
}

export default NotFound
