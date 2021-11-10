const isLoggedIn = function () {
    const axios = require("axios");
    var loggedIn = false;

    axios.post("https://locus-g3gtexqeba-uc.a.run.app/validate", {}, {withCredentials: true})
        .then(function (response) {
            console.log(response.status)
            if (response.status === 200) {
                loggedIn = true;
            }

        }).catch(function (error) {
        console.log(error)
        loggedIn = false;
    })
    return loggedIn;
}

export default isLoggedIn();