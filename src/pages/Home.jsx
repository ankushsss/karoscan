// import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import { AuthenticatedTemplate,UnauthenticatedTemplate } from "@azure/msal-react";
import { Button,Typography } from "@mui/material";
import { Link as RouterLink, Navigate } from "react-router-dom";
// import { PageLayout } from "src/ui-components/PageLayout";
import { PageLayout } from "../ui-components/PageLayout";
// import NavBar from "src/NavBar";

export function Home({pca}) {
	return (
		<>
			<AuthenticatedTemplate>
				<Navigate to="/dashboard"/>
			</AuthenticatedTemplate>

			<UnauthenticatedTemplate>
				<PageLayout/>
				
			</UnauthenticatedTemplate>
		</>
	);
}