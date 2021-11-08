const isLoggedIn = function () {
    const axios = require("axios");
    var loggedIn = false;

    axios.post("http://localhost:8080/validate", {}, {withCredentials: true})
        .then(function (response) {
            console.log(response.status)
            if (response.status === 200) {
                loggedIn = true;
            }

        }).catch(function (error) {
        console.log(error.response.data.message)
        loggedIn = false;
    })
    return loggedIn;
}

export default isLoggedIn();