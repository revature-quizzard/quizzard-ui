import React from "react";
import { LoginModel } from "../models/login-model";
import { RegisterModel } from "../models/register-model";
import { quizzardApiClient } from "./api-client";
import { authState, logoutUserReducer } from "../state-slices/auth/auth-slice";
import {RegisterUserRequest} from "../dtos/register-user-request";
import {Auth} from "aws-amplify";
import {Credentials} from "../dtos/credentials";
import {Principal} from "../dtos/principal";
import { useDispatch, useSelector } from "react-redux";

export const getCurrentUser = () => {
    return Auth.currentAuthenticatedUser();
}

export const resendVerificationCode = async (username: string) => {
    let response = await Auth.resendSignUp(username);
    console.log(response);
}

export const confirmUserAccount = async (username: string, code: string) => {
    let response = await Auth.confirmSignUp(username, code);
    console.log(response);
}

export const registerUserAccount = async (newUser: RegisterUserRequest) => {

    let result = await Auth.signUp({
        username: newUser.username,
        password: newUser.password,
        attributes: {
            email: newUser.email,
            name: newUser.firstName + ' ' + newUser.lastName
        }
    });

    console.log(result);

}

export const authenticate = async (credentials: Credentials) => {

    try {
        let response = await Auth.signIn(credentials.username, credentials.password);
        return response;
    } catch (err: any) {
        if (err.name == "UserNotConfirmedException")
        {
            return "Not confirmed";
        }
    };
}

export const logout = () => {
    Auth.signOut();
}