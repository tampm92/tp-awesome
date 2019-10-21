var url = window.location.search.match(/url=([^&]+)/);
if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
} else {
    url = window.location.origin + "/swagger/swagger.json";
}

// Pre load translate...
if (window.SwaggerTranslator) {
    window.SwaggerTranslator.translate();
}
window.swaggerUi = new SwaggerUi({
    url: url,
    dom_id: "swagger-ui-container",
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
    onComplete: function(swaggerApi, swaggerUi) {
        if (typeof initOAuth == "function") {
            initOAuth({
                clientId: "your-client-id",
                clientSecret: "your-client-secret-if-required",
                realm: "your-realms",
                appName: "your-app-name",
                scopeSeparator: ",",
                additionalQueryStringParams: {}
            });
        }

        if (window.SwaggerTranslator) {
            window.SwaggerTranslator.translate();
        }

        $('pre code').each(function(i, e) {
            hljs.highlightBlock(e)
        });

        addApiKeyAuthorization();
    },
    onFailure: function(data) {
        log("Unable to Load SwaggerUI");
    },
    docExpansion: "none",
    jsonEditor: false,
    apisSorter: "alpha",
    defaultModelRendering: 'schema',
    showRequestHeaders: false
});

function addToken(accessToken) {
    var bearerToken = 'Bearer ' + accessToken;

    window.swaggerUi.api.clientAuthorizations.add("api_key", new SwaggerClient.ApiKeyAuthorization("api_key", accessToken, "query"));
    window.swaggerUi.api.clientAuthorizations.add("Authorization", new SwaggerClient.ApiKeyAuthorization("Authorization", bearerToken, "header"));
    //window.swaggerUi.headerView.showCustom();
}

function addApiKeyAuthorization() {
    var key = encodeURIComponent($('#input_apiKey')[0].value);
    if (key && key.trim() !== "") {

        addToken(key);
        log("added key " + key);
    }
}

$('#input_apiKey').change(addApiKeyAuthorization);

$("#login").click(function() {
    var username = $('#username').val();
    var password = $('#password').val();

    loginFunc(username, password);
});

$("#username").keypress(function(e) {
    if (e.which === 13) {
        var username = $('#username').val();
        var password = $('#password').val();

        loginFunc(username, password);
    }
});

$("#password").keypress(function(e) {
    if (e.which === 13) {
        var username = $('#username').val();
        var password = $('#password').val();

        loginFunc(username, password);
    }
});

function loginFunc(username, password) {
    $('#spinner-1').show();

    $.ajax({
        url: config.usernamePassword.url,
        type: "post",
        contenttype: 'x-www-form-urlencoded',
        data: "grant_type=password&username=" + username + "&password=" + password,
        success: function(response) {
            var token = response.data.access_token;
            log("added key " + token);
            addToken(token);
            $('#spinner-1').hide();
            $('.login-success').fadeIn(400).delay(3000).fadeOut(400); //fade out after 3 seconds
        },
        error: function(xhr, ajaxoptions, thrownerror) {
            $('#spinner-1').hide();
            $('.login-error').fadeIn(400).delay(3000).fadeOut(400); //fade out after 3 seconds
        }
    });
};

$("#loginExternal").click(function() {
    var provider = $("#providerOption").val();
    var externalAccessToken = $('#externalAccessToken').val();

    loginExternalFunc(provider, externalAccessToken);
});

$("#externalAccessToken").keypress(function(e) {
    if (e.which === 13) {
        var provider = $("#providerOption").val();
        var externalAccessToken = $('#externalAccessToken').val();

        loginExternalFunc(provider, externalAccessToken);
    }
});

function loginExternalFunc(provider, externalAccessToken) {
    $('#spinner-1').show();

    var dataPost = {
        provider: provider,
        externalAccessToken: externalAccessToken
    };

    $.ajax({
        url: config.externalLogin.url,
        type: "post",
        contenttype: 'application/json',
        data: dataPost,
        success: function(response) {
            //var token = response.data.access_token;
            var token = response.data.access_token;

            log("added key " + token);
            addToken(token);
            $('#spinner-1').hide();
            $('.login-success').fadeIn(400).delay(3000).fadeOut(400); //fade out after 3 seconds
        },
        error: function(xhr, ajaxoptions, thrownerror) {
            $('#spinner-1').hide();
            $('.login-error').fadeIn(400).delay(3000).fadeOut(400); //fade out after 3 seconds
        }
    });
};

$("#loginOption").change(function() {
    var idNeedShow = $(this).val();

    $("#api_selector").hide();
    $("#loginOptionUsernamePassword").hide();
    $("#loginOptionExternal").hide();
    $("#loginSocial").hide();

    $("#" + idNeedShow).show();
});

$("#providerOption").change(function() {
    //alert($(this).val());
});

function init() {
    var selectHtml = "";

    if (config.token.active) {
        selectHtml += "<option value='api_selector'>Token</option>";
    }

    if (config.usernamePassword.active) {
        selectHtml += "<option value='loginOptionUsernamePassword' selected='selected'>Username & Password</option>";
    }

    if (config.externalLogin.active) {
        selectHtml += "<option value='loginOptionExternal'>External login</option>";

        var providerOptionHtml = "";

        for (var i = 0; i < config.externalLogin.options.length; i++) {
            providerOptionHtml += "<option value='" + config.externalLogin.options[i].providerName + "'>" + config.externalLogin.options[i].name + "</option>";
        }

        $("#providerOption").html(providerOptionHtml);
    }

    if (config.loginSocial.active) {
        selectHtml += "<option value='loginSocial'>Login Social</option>";
    }

    $("#loginOption").html(selectHtml);
    $("#api_selector").hide();
    $("#loginOptionUsernamePassword").show();
    $("#loginOptionExternal").hide();
    $("#loginSocial").hide();

};
init();

window.swaggerUi.load();

function log() {
    if ('console' in window) {
        console.log.apply(console, arguments);
    }
}