var lock = new Auth0Lock(config.loginSocial.auth0.clientId, config.loginSocial.auth0.domain, {
    auth: {
        redirect: false,
        params: {
            scope: 'openid'
        }
    }
});

lock.on("authenticated", function (authResult) {
    console.log("login Auth0");
    addToken(authResult.idToken);
});

var btn_login = document.getElementById('loginAuth0');

btn_login.addEventListener('click', function () {
    lock.show();
});