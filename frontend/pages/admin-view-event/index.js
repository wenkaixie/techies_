import ResponsiveAppBar from "../../components/admin-navbar/navbar";
import React, { useState, useEffect } from 'react';
import './page.css';
import Link from "next/link";
import EventIcon from '@mui/icons-material/Event';
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupsIcon from '@mui/icons-material/Groups';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import DescriptionIcon from '@mui/icons-material/Description';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CallIcon from '@mui/icons-material/Call';
import { Box } from "@mui/material";
import { useRouter } from 'next/router';
import axios from "axios";
import dynamic from 'next/dynamic';
import { url } from '../../src/app/firebase/firebase_config';

// Dynamic import for MapLabeling
const MapLabeling = dynamic(() => import('./MapLabeling'), { ssr: false });

export default function Page() {
  const [mapURL, setMapURL] = useState("");
  const [eventDetails, setEventDetails] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { eventDocID } = router.query;
  console.log("EVENT ID ", eventDocID);

  const fetchMapURL = async () => {
    try {
      if (!eventDocID) {
        throw new Error('Event document ID not found in localStorage');
      }
      const response = await axios.get(`${url}/map?id=${eventDocID}`);
      console.log('API Response:', response.data.eventMapURL);
      setMapURL(response.data.eventMapURL);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchEventDetails = async () => {
    try {
      if (!eventDocID) {
        throw new Error('Event document ID not found in localStorage');
      }
      const response = await axios.get(`${url}/event/detail?eventID=${eventDocID}`);
      setEventDetails(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(`Error fetching eventID ${eventDocID}:`, err);
      return null;
    }
  };

  useEffect(() => {
    fetchMapURL();
    fetchEventDetails();
  }, [eventDocID]);

  const Dashboard = () => {
    if (!eventDetails) {
      return <div>Loading event details...</div>;
    }

    const startDateTime = new Date(eventDetails.startDateTime);
    const endDateTime = new Date(eventDetails.endDateTime);

    const formattedStartDate = startDateTime.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedEndDate = endDateTime.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedStartTime = startDateTime.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const formattedEndTime = endDateTime.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <h2>{eventDetails.eventName}</h2>
          <Box display="flex" alignItems="center" gap="15px">
            <MapIcon fontSize="large" />
            <h2>Event Map</h2>
          </Box>
          <MapLabeling eventDocID={eventDocID} imgURL={mapURL} />
          <br></br>
          <br></br>
          <Box display="flex" alignItems="center" gap="15px">
            <EventIcon fontSize="large"/>
            <h2>Event Details</h2>
          </Box>

          <Box display="flex" alignItems="center" gap="10px">
            <DescriptionIcon />
            <p>{eventDetails.eventDescription}</p>
          </Box>
          <Box display="flex" alignItems="center" gap="10px">
            <CalendarMonthIcon />
            <p>{formattedStartDate} - {formattedEndDate}</p>
          </Box>
          <Box display="flex" alignItems="center" gap="10px">
            <AccessTimeIcon />
            <p>{formattedStartTime} - {formattedEndTime}</p>
          </Box>
          <Box display="flex" alignItems="center" gap="10px">
            <LocationOnIcon />
            <p>{eventDetails.eventLocation}</p>
          </Box>
          <Box display="flex" alignItems="center" gap="10px">
            <AttachMoneyIcon />
            <p>{eventDetails.eventPrice}</p>
          </Box>
          <Box display="flex" alignItems="center" gap="10px">
            <GroupsIcon />
            <p>{eventDetails.eventCapacity}</p>
          </Box>
          <Box display="flex" alignItems="center" gap="10px">
            <FamilyRestroomIcon />
            <p>{eventDetails.eventAgeLimit || "0"} years and above</p>
          </Box>
          <Box display="flex" alignItems="center" gap="10px">
            <CorporateFareIcon />
            <p>{eventDetails.eventOrganiser}</p>
          </Box>
          <Box display="flex" alignItems="center" gap="10px">
            <CallIcon />
            <p>{eventDetails.eventOrganiserContact}</p>
          </Box>

          <br>
          </br>
          <Box display="flex" alignItems="center" gap="10px">
            <Link href="/admin-home" className='dashboard-button'>
              Go Back
            </Link>
          </Box>
        </div>
      </div>
    );
  };

  return (
    <main>
      <ResponsiveAppBar />
      <Dashboard />
    </main>
  );
}
