function validarinicio() {
    var user = document.getElementById("user").value;
    var pwd = document.getElementById("password").value;
    var erroruser = document.getElementById("erroruser");
    var errorpwd = document.getElementById("errorpwd");
    erroruser.style.color = "red";
    errorpwd.style.color = "red";
    var noEspacios = /\s/;
    var letrasYNumeros = /^(?=.*[a-zA-Z])(?=.*\d)/; // Comprobación Username
    if (user.trim() === "" && pwd.trim() === "") {
        erroruser.innerHTML = "Los campos son obligatorios.";
        return false;
    } else if (noEspacios.test(user)) {
        erroruser.innerHTML = "El username o email no puede contener espacios.";
        return false;
    } else if (pwd.trim() === "" && user !== "") {
        if (user.includes("@")) {
            var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailFormat.test(user)) {
                erroruser.innerHTML = "Formato de correo electrónico inválido.";
                return false;
            } else {
                erroruser.innerHTML = "";
                return false;
            }
        } else {
            errorpwd.innerHTML = "Introduce el password";
            erroruser.innerHTML = "";
            return false;
        }
    }

    // Comprobar email
    else if (user.includes("@")) {
        var emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormat.test(user)) {
            erroruser.innerHTML = "Formato de correo electrónico inválido.";
            return false;
        }

        // Comprobación password
        else if (noEspacios.test(pwd)) {
            errorpwd.innerHTML = "La contraseña no puede contener espacios";
            return false;
        } else if (pwd.length < 9) {
            errorpwd.innerHTML = "La contraseña debe contener al menos 9 caracteres";
            return false;
        } else if (!letrasYNumeros.test(pwd)) {
            errorpwd.innerHTML = "La contraseña debe contener letras y números";
            return false;
        } else {
            erroruser.innerHTML = "";
            errorpwd.innerHTML = "";
            return false;
        }
    }
    // Comprobación password
    else if (noEspacios.test(pwd)) {
        errorpwd.innerHTML = "La contraseña no puede contener espacios";
        return false;
    } else if (pwd.length < 9) {
        errorpwd.innerHTML = "La contraseña debe contener al menos 9 caracteres";
        return false;
    } else if (!letrasYNumeros.test(pwd)) {
        errorpwd.innerHTML = "La contraseña debe contener letras y números";
        return false;
    }

    erroruser.innerHTML = "";
    errorpwd.innerHTML = "";
    return true;
}