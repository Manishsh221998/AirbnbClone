import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";


const fetchBookings = async () => {
  // Replace this URL with your actual API endpoint
  const res = await fetch("http://localhost:6001/booked/booking/get");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return isNaN(date) ? dateStr : date.toLocaleDateString();
};

const BookingCard = ({ booking }) => {
  const { guests, check_in, check_out, totalPrice, title, userName } = booking;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title || "Booking ID: " + booking._id}
        </Typography>
        {userName && (
          <Typography variant="subtitle2" color="text.secondary">
            Guest: {userName}
          </Typography>
        )}
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">Check-in: {formatDate(check_in)}</Typography>
        <Typography variant="body2">Check-out: {formatDate(check_out)}</Typography>
        <Typography variant="body2" sx={{ my: 1 }}>
          Guests:
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip label={`Adults: ${guests.adults}`} />
          <Chip label={`Children: ${guests.children}`} />
          <Chip label={`Infants: ${guests.infants}`} />
          <Chip label={`Pets: ${guests.pets}`} />
        </Box>
        {totalPrice && (
          <Typography variant="body2" sx={{ mt: 1, color:"brown",fontWeight: 'bold'  }}>
            Total Price: ₹{parseInt(totalPrice).toLocaleString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};




const Bookings = () => {
    const [loggedInUserName, setLoggedInUserName] = useState(null);
    useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setLoggedInUserName(storedUserName);
    }
  }, []);
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });
  const filteredData = data?.filter(
  (booking) => booking.userName === loggedInUserName
);

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography>Error loading bookings</Typography>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Booking Records
      </Typography>
      <Grid container spacing={3}>
        {filteredData.map((booking) => (
          <Grid item xs={12} sm={6} md={4} key={booking._id}>
            <BookingCard booking={booking} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Bookings;
