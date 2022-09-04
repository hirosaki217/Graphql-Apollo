import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppBar, Avatar, Box, Button, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MessageCard from './MessageCard';

const URL = 'http://localhost:5000/';

const ChatScreen = () => {
    const { id, name } = useParams();
    const [messages, setMessages] = useState([]);

    const getAllMessages = () => {
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiaHVuZ0BnbWFpbC5jb20iLCJpYXQiOjE2NjIyNzIyMjEsImV4cCI6MTY2MjI3NTgyMX0.BeAilxPZ0hg6G7M2NJkOhl0PjGmKhbUt6_yv-IaOyho',
            },
            body: JSON.stringify({
                query: `
                    query MessagesByUser($receiverId: Int!) {
                        messagesByUser(receiverId: $receiverId) {
                        id
                        text
                        receiverId
                        senderId
                        createdAt
                        }
                    }
                `,
                variables: {
                    receiverId: 1,
                },
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    };
    useEffect(() => {
        getAllMessages();
    }, []);
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
                <MessageCard text="hi hieu" date="just now" direction="start" />
                <MessageCard text="hi hieu" date="just now" direction="end" />
            </Box>
            <TextField fullWidth multiline placeholder="Enter a message" size="small" />
        </Box>
    );
};

export default ChatScreen;
