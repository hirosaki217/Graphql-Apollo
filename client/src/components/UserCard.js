import { Avatar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

const UserCard = ({ item: { firstName, lastName, id } }) => {
    return (
        <Stack direction="row" spacing={8} sx={{ py: 1 }}>
            <Avatar
                src={`https://avatars.dicebear.com/api/initials/${firstName} ${lastName}.svg`}
                sx={{ width: '32px', height: '32px' }}
            />
            <Typography varinat="subtitle2">
                {firstName} {lastName}
            </Typography>
        </Stack>
    );
};

export default UserCard;
