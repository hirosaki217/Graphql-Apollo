import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
    query {
        users: getUsers {
            id
            email
            firstName
            lastName
        }
    }
`;

export const GET_MSG = gql`
    query MessagesByUser($receiverId: Int!) {
        messagesByUser(receiverId: $receiverId) {
            id
            text
            receiverId
            senderId
            createdAt
        }
    }
`;
