import React from "react";
import SignUpForm from "../components/SignUpForm";
import { signUp } from "../utils/Api";

const EmailSignUp = () => {

    const trySignup = (user) => {
        signUp(user)
        .then(response => {
            signUpSuccess(response);
        }).catch(error => {
            signUpFailure(error);
        })
        
    };

    const signUpSuccess = (response) => {
        console.log(response);
    };

    const signUpFailure = (error) => {
        console.log(error);
    };
    
    return(
        <SignUpForm signup={trySignup} />
    );

}

export default EmailSignUp;