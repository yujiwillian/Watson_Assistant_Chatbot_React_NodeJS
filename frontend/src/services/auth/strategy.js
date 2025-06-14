const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: process.env.REACT_APP_AUTHORITY,
        knownAuthorities: [],
        redirectUri: process.env.REACT_APP_REDIRECT_URL,
        postLogoutRedirectUri: `${process.env.REACT_APP_REDIRECT_URL}/logout`,
        navigateToLoginRequestUrl: true,
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true,
    },
    system: {
        windowHashTimeout: 60000,
        iframeHashTimeout: 6000,
        loadFrameTimeout: 0,
    },
};

export default msalConfig;
