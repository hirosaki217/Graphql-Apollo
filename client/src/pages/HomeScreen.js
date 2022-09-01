import React from 'react';
import { Box } from '@mui/material';
import SideBar from '../components/SideBar';
import Wellcome from '../components/Wellcome';
import { Routes, Route } from 'react-router-dom';
import ChatScreen from '../components/ChatScreen';
const AllRouters = () => {
    return (
        <Routes>
            <Route path="/" element={<Wellcome />} />
            <Route path="/:id/:name" element={<ChatScreen />} />
        </Routes>
    );
};

const HomeScreen = () => {
    return (
        <Box display="flex">
            <SideBar />
            <AllRouters />
        </Box>
    );
};

export default HomeScreen;
