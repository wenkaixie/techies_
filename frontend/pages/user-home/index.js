import ResponsiveAppBar from "../../components/user-navbar/navbar";
import React from 'react';
import './page.css';
import EventIcon from '@mui/icons-material/Event';
import CreateIcon from '@mui/icons-material/Create';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box } from "@mui/material";


export default function Page() {
  const Card1 = () => {
    return (
    <div className="card">
        <h2>Singapore Night Festival 2024</h2>
        <Box display="flex" alignItems="center" gap="15px">
          <CalendarMonthIcon />
          <p>23 Aug 24 - 7 Sep 24</p>
        </Box>
        <Box display="flex" alignItems="center" gap="15px">
          <LocationOnIcon />
          <p>Bras Basah/Bugis</p>
        </Box>
        <button className="card-button">View Event</button>
    </div>
    );
};

const Card2 = () => {
    return (
    <div className="card">
        <h2>Halloween Horror Nights 2024</h2>
        <Box display="flex" alignItems="center" gap="15px">
          <CalendarMonthIcon />
          <p>30 Aug 24 - 3 Nov 24</p>
        </Box>
        <Box display="flex" alignItems="center" gap="15px">
          <LocationOnIcon />
          <p>Universal Studios Singapore</p>
        </Box>
        <button className="card-button">View Event</button>
    </div>
    );
};

const Card3 = () => {
    return (
    <div className="card">
        <h2>Christmas Wonderland 2024</h2>
        <Box display="flex" alignItems="center" gap="15px">
          <CalendarMonthIcon />
          <p>1 Dec 24 - 1 Jan 25</p>
        </Box>
        <Box display="flex" alignItems="center" gap="15px">
          <LocationOnIcon />
          <p>Gardens By The Bay</p>
        </Box>
        <button className="card-button">View Event</button>
    </div>
    );
};


    const Dashboard = () => {
        return (
          <div className="dashboard">
            <div className="dashboard-container">
              <Box display="flex" alignItems="center" gap="15px">
                <EventIcon fontSize="large"/>
                <h2>Ongoing Events</h2>
              </Box>
              <p>Popular events currently in Singapore</p>
              <div className="dashboard-cards">
                <Card1 />
                <Card2 />
                <Card3 />
              </div>
              
              <Box display="flex" alignItems="center" gap="15px">
                <CreateIcon fontSize="large"/>
                <h2>Join an Event</h2>
              </Box>
              <p>Search for an event to join</p>
              <div className="dashboard-details">
                
              </div>
              <button className="dashboard-button">Book Now</button>
            </div>
          </div>
        );
      };

    return (
        <main>
            <ResponsiveAppBar />
            <Dashboard />
        </main>
    )
}