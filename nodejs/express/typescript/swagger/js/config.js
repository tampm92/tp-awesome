var domain = location.protocol + "//" + location.host;

var configDebug = {

    token: {
        active: true
    },

    usernamePassword: {
        active: true,
        url: domain + "/api/users/login"
    },

    externalLogin: {
        active: true,
        url: domain + "/api/users/registerOrLoginExternal",
        options: [
            {
                name: "facebook",
                providerName: "facebook"
            }
        ]
    },

    loginSocial: {
        active: true,
        facebookAppId: "224763074594660"
    }
};

function getConfig() {
    return configDebug;
};

var config = getConfig();