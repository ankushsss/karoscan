import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

const SignInSignOutButton = () => {
    const { inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    return(<>
    <SignInButton />
    </>)
}

export default SignInSignOutButton;