import Routes from "./routes";
import {useUser} from "@clerk/clerk-react";
import SignInPage from "./pages/sign-in/SignIn.tsx";

export default function App() {

    const { isSignedIn } = useUser();

    if (!isSignedIn) {
        return <SignInPage />;
    }

    return (
        <Routes />
    );
}
