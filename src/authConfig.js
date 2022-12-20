// Config object to be passed to Msal on creation
console.log(process.env.React_App_CLIENT_ID )

export const msalConfig = {
    auth: {
        clientId: process.env.React_App_CLIENT_ID ,
        authority:  process.env.React_App_AUTHORITY,
        knownAuthorities: [process.env.React_App_KNOWNAUTHORITIES],
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin
    }
};

// Scopes you add here will be prompted for consent during login
export const loginRequest = {
    scopes: [process.env.React_App_Scopes]
};
