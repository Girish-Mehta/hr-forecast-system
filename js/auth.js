const auth = {
    showLogin: function(){
        $(`${config.mainView}`).load("./views/login.html");
        window.history.pushState({}, "Login", "login");
    },
    showRegister: function(){
        $(`${config.mainView}`).load("./views/register.html");
        window.history.pushState({}, "Register", "register");
    }
}