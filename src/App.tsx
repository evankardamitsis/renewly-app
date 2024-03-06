import Routes from "./routes";
import {useAuth} from "@clerk/clerk-react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function App() {
    const { isSignedIn, isLoaded } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded) {
            if (isSignedIn) {
                navigate("/");
            } else {
                navigate("/sign-in");
            }
        }
    }, [isLoaded, isSignedIn, navigate]);

    return <Routes />
}
