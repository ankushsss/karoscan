import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Button,MenuItem,Menu } from "@mui/material";
import Login from "../pages/Login";
import { loginRequest } from "../authConfig";

export const SignInButton = () => {
    const { instance } = useMsal();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleLogin = (loginType) => {
        setAnchorEl(null);

        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest);
        }
    }

    return (
        <div>
        
                {/* <Button onClick={() => handleLogin("redirect")} key="loginRedirect">Sign in using Redirect</Button> */}
                <Login handleLogin={handleLogin}/>
        </div>
    )
};