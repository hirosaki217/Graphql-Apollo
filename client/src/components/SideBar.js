import { Typography, Box, Divider } from '@mui/material';
import React from 'react';
import UserCard from './UserCard';

const SideBar = () => {
    const users = [
        {
            id: 1,
            firstName: 'tran',
            lastName: 'hieu',
        },
        {
            id: 2,
            firstName: 'tran',
            lastName: 'hieu',
        },
        {
            id: 3,
            firstName: 'tran',
            lastName: 'hieu',
        },
    ];
    return (
        <Box backgroundColor="#f7f7f7" height="100vh" width="250px" padding="10px">
            <Typography variant="h6">Chat</Typography>
            <Divider />
            {users.map((item) => {
                return <UserCard key={item.id} item={item} />;
            })}
        </Box>
    );
};

export default SideBar;
