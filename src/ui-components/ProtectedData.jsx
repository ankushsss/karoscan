import React from "react";
import { Avatar,List,ListItem,ListItemText,ListItemAvatar } from "@mui/material";
import { Person,Schedule,Mail,LockOpenOutlined } from "@mui/icons-material";

export const ProtectedData = ({responseData}) => {
    return (
        <List className="protectedData">
            <NameListItem name={responseData.account.name} />
            <MailListItem mail={responseData.account.username} />
            <AccessTokenExpiresListItem expiresOn={responseData.expiresOn} />
            <ScopesListItem scopes={responseData.scopes} />
        </List>
    );
};

const NameListItem = ({name}) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <Person />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Name" secondary={name}/>
    </ListItem>
);

const AccessTokenExpiresListItem = ({expiresOn}) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <Schedule />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Access Token Expires At" secondary={expiresOn.toString()}/>
    </ListItem>
);

const MailListItem = ({mail}) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <Mail />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Username" secondary={mail}/>
    </ListItem>
);

const ScopesListItem = ({scopes}) => (
    <ListItem>
        <ListItemAvatar>
            <Avatar>
                <LockOpenOutlined />
            </Avatar>
        </ListItemAvatar>
        <List>
            {scopes.map((scope, index) => (
                index === 0 ? <ListItemText primary="Scopes" secondary={scope} key={scope}/> : <ListItemText secondary={scope} />
            ))}
        </List>
    </ListItem>
);
