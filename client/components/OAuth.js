import { GoogleLogin } from 'react-google-login';

export function OAuth() {
    // Response logger
    const responseGoogle = (response) => {
        console.log(response);
    }

    // Redirect to log in page using client id and set redirect url after login
    function googleoauth() {
        var axios = require('axios');
        var client_id = '708272012943-r3u3p0psi63eus1ish044fnbd48k4ajq.apps.googleusercontent.com';
        var redirect_uri = 'http://localhost:3000/main';

        // Separate scopes with space
        var scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
        var response_type = 'code'

        return window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' + client_id  + '&redirect_uri=' + redirect_uri + '&scope=' + scope + '&response_type=' + response_type;
    }

    return (
        <GoogleLogin
                    clientId="708272012943-r3u3p0psi63eus1ish044fnbd48k4ajq.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
    //    <button onClick={googleoauth} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">Log in</button>
    )
}