
import { Link as RouterLink } from "react-router-dom";
import { AppBar,Toolbar,Link,Typography } from "@mui/material";
import SignInSignOutButton from "./SignInSignOutButton";

const NavBar = () => {
    // const classes = useStyles();

    return (
        <div >
            <SignInSignOutButton />
        </div>
    );
};

export default NavBar;