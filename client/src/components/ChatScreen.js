import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppBar, Avatar, Box, Button, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MessageCard from './MessageCard';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_MSG } from '../graphql/queries';
import SendIcon from '@mui/icons-material/Send';
import { Stack } from '@mui/system';
import { SEND_MSG } from '../graphql/mutations';
import { MSG_SUB } from '../graphql/subscriptions';
const URL = 'http://localhost:5000/';

const ChatScreen = () => {
    const { id, name } = useParams();
    const [text, setText] = useState();
    const [messages, setMessages] = useState([]);
    const { data, loading, error, refetch } = useQuery(GET_MSG, {
        variables: {
            receiverId: +id,
        },
        onCompleted(data) {
            setMessages(data.messagesByUser);
        },
        fetchPolicy: 'network-only', // Used for first execution
        // nextFetchPolicy: 'cache-first', // Used for subsequent executions
    });

    const [sendMessage] = useMutation(SEND_MSG, {
        onCompleted(data) {
            setMessages((prv) => [...prv, data.createMessage]);
        },
    });

    const { data: subData } = useSubscription(MSG_SUB);
    if (subData) console.log(subData);
    // const [messages, setMessages] = useState([]);

    // const getAllMessages = () => {
    //     fetch(URL, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization:
    //                 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiaHVuZ0BnbWFpbC5jb20iLCJpYXQiOjE2NjIyNzIyMjEsImV4cCI6MTY2MjI3NTgyMX0.BeAilxPZ0hg6G7M2NJkOhl0PjGmKhbUt6_yv-IaOyho',
    //         },
    //         body: JSON.stringify({
    //             query: `
    //                 query MessagesByUser($receiverId: Int!) {
    //                     messagesByUser(receiverId: $receiverId) {
    //                     id
    //                     text
    //                     receiverId
    //                     senderId
    //                     createdAt
    //                     }
    //                 }
    //             `,
    //             variables: {
    //                 receiverId: 1,
    //             },
    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data);
    //         });
    // };
    // useEffect(() => {
    //     getAllMessages();
    // }, []);
    // if (loading) return <Typography variant="h6">Loangding chats</Typography>;

    return (
        <Box flexGrow={1}>
            <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 0 }}>
                <Toolbar>
                    <Avatar
                        src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
                        sx={{ width: '32px', height: '32px', mr: 2 }}
                    />
                    <Typography varinat="h6" color="black">
                        {name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box backgroundColor="#f5f5f5" height="80vh" sx={{ overflowY: 'auto' }}>
                {/* <MessageCard text="hi hieu" date="just now" direction="start" />
                <MessageCard text="hi hieu" date="just now" direction="end" /> */}
                {loading ? (
                    <Typography variant="h6">Loangding chats</Typography>
                ) : (
                    messages.map((msg) => {
                        return (
                            <MessageCard
                                key={msg.createdAt}
                                text={msg.text}
                                date={msg.createdAt}
                                direction={msg.receiverId == id ? 'end' : 'start'}
                            />
                        );
                    })
                )}
            </Box>
            <Stack direction="row" alignItems="center">
                <TextField
                    fullWidth
                    multiline
                    placeholder="Enter a message"
                    size="small"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />
                <SendIcon
                    sx={{ padding: '5px', cursor: 'pointer' }}
                    onClick={() => {
                        sendMessage({
                            variables: {
                                receiverId: +id,
                                text: text,
                            },
                        });
                    }}
                />
            </Stack>
        </Box>
    );
};

export default ChatScreen;
