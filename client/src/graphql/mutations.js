import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
    mutation SignupUser($newUser: UserInput!) {
        signupUser(newUser: $newUser) {
            id
            email
            firstName
            lastName
        }
    }
`;

export const LOGIN_USER = gql`
    mutation ($userSignin: UserSigninInput!) {
        signinUser(userSignin: $userSignin) {
            token
        }
    }
`;

export const SEND_MSG = gql`
    mutation ($receiverId: Int!, $text: String) {
        createMessage(receiverId: $receiverId, text: $text) {
            id
            createdAt
            receiverId
            senderId
            text
        }
    }
`;
