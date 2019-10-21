var startApp = function () {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: config.loginSocial.googleClientId,
            cookiepolicy: 'single_host_origin',
            scope: 'profile email'
        });
        attachSignin(document.getElementById('loginGoogleAuth2'));
    });
};

function attachSignin(element) {
    auth2.attachClickHandler(element, {},
        function (googleUser) {
            console.log("login google: " + googleUser.getBasicProfile().getName());

            var provider = "google-oauth2";
            var externalAccessToken = googleUser.Zi.id_token;

            loginExternalFunc(provider, externalAccessToken);
        }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

window.onbeforeunload = function (e) {
    signOut();
};

startApp();