import React from "react";
import googleLogo from "../img/google.png"
import { GOOGLE_AUTH_URL } from "../utils/Oauth2";

const SocialLogin = () => {
    return(
        <div>
            <a  href={GOOGLE_AUTH_URL}>
                <img src={googleLogo} alt="Google" />
            </a>
        </div>
    ); 
}

export default SocialLogin;