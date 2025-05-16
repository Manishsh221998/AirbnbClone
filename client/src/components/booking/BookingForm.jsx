// --- frontend/src/components/BookingForm.js ---
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
  InputLabel,
  Collapse,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { Add, Remove, ExpandMore, ExpandLess } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { createBooking } from '../../api/apiHandler';

export default function BookingForm({price,title}) {
  const { register, handleSubmit, reset, watch } = useForm();
  const queryClient = useQueryClient();

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [guestOpen, setGuestOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(price);
  const [nights, setNights] = useState(1);

  const BASE_PRICE = price;

  const checkIn = watch('check_in');
  const checkOut = watch('check_out');

  useEffect(() => {
    const totalGuests = adults + children;

    let calculatedNights = 1;
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diffTime = outDate.getTime() - inDate.getTime();
      calculatedNights = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
    }
    setNights(calculatedNights);

    const calculatedPrice = BASE_PRICE * totalGuests * calculatedNights;
    setTotalPrice(totalGuests > 0 ? calculatedPrice : BASE_PRICE);
  }, [adults, children, checkIn, checkOut]);

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['bookings'] });
      alert("Booking completed")
      console.log("after mutation data",data);
      
      // reset();
    },
  });

  const handleGuestChange = (type, action) => {
    const stateMap = {
      adults: [adults, setAdults],
      children: [children, setChildren],
      infants: [infants, setInfants],
      pets: [pets, setPets]
    };
    const [value, setValueFn] = stateMap[type];
    if (action === 'inc') setValueFn(value + 1);
    if (action === 'dec' && value > 0) setValueFn(value - 1);
  };

  const onSubmit = (data) => {
    console.log("before",data);
   let userId= window.localStorage.getItem("userId");
   let userName= window.localStorage.getItem("userName");
    data.guests = {
      adults,
      children,
      infants,
      pets
    };
    data.totalPrice = totalPrice;
    data.userId=userId;
    data.title=title;
    data.userName=userName
    console.log("data", data);
    mutation.mutate(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 2,
        border: '1px solid #ddd',
        borderRadius: 4,
        boxShadow: 2,
        maxWidth: 400,
        mx: 'auto',
        bgcolor: '#fff'
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        ₹{totalPrice.toLocaleString()} <Typography variant="body2" component="span">for {nights} night{nights > 1 ? 's' : ''}</Typography>
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <InputLabel shrink>CHECK-IN</InputLabel>
          <TextField
            {...register('check_in')}
            type="date"
            size="small"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel shrink>CHECKOUT</InputLabel>
          <TextField
            {...register('check_out')}
            type="date"
            size="small"
            fullWidth
            required
          />
        </Grid>

        {/* Guests dropdown */}
        <Grid item xs={12}>
          <Box
            onClick={() => setGuestOpen(!guestOpen)}
            sx={{ border: '1px solid #ccc', borderRadius: 2, px: 2, py: 1, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography>Guests: {adults + children + infants + pets} guest(s)</Typography>
            {guestOpen ? <ExpandLess /> : <ExpandMore />}
          </Box>

          <Collapse in={guestOpen} timeout="auto" unmountOnExit>
            <Box mt={1}>
              {[{
                label: 'Adults',
                sublabel: 'Age 13+',
                value: adults,
                set: () => handleGuestChange('adults', 'inc'),
                unset: () => handleGuestChange('adults', 'dec')
              }, {
                label: 'Children',
                sublabel: 'Ages 2–12',
                value: children,
                set: () => handleGuestChange('children', 'inc'),
                unset: () => handleGuestChange('children', 'dec')
              }, {
                label: 'Infants',
                sublabel: 'Under 2',
                value: infants,
                set: () => handleGuestChange('infants', 'inc'),
                unset: () => handleGuestChange('infants', 'dec')
              }, {
                label: 'Pets',
                sublabel: 'Bringing a service animal?',
                value: pets,
                set: () => handleGuestChange('pets', 'inc'),
                unset: () => handleGuestChange('pets', 'dec')
              }].map((guest, i) => (
                <Grid key={i} container alignItems="center" justifyContent="space-between" sx={{ py: 1 }}>
                  <Grid item>
                    <Typography>{guest.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{guest.sublabel}</Typography>
                  </Grid>
                  <Grid item>
                    <IconButton size="small" onClick={guest.unset}>
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography variant="body1" component="span" mx={1}>{guest.value}</Typography>
                    <IconButton size="small" onClick={guest.set}>
                      <Add fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Collapse>
        </Grid>
      </Grid>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2, borderRadius: 9999, bgcolor: '#ff385c', '&:hover': { bgcolor: '#e11d48' } }}
      >
        Reserve
      </Button>

      <Typography variant="body2" color="text.secondary" align="center" mt={1}>
        You won't be charged yet
      </Typography>
    </Box>
  );
}
