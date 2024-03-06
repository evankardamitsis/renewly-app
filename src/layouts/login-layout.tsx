import { useNavigate} from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import {ReactNode, useEffect} from "react";

interface LoginLayoutProps {
    children: ReactNode
}

export default function LoginLayout({children}: LoginLayoutProps) {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignedIn) {
            navigate("/dashboard");
        }
    }, [isSignedIn, navigate]);



    return <>{children}</>
}
