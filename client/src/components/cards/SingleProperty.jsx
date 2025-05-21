import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSinglePropertyQuery } from "../../hooks/useProperty";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardMedia,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  IconButton,
  Stack,
  Rating,
  Paper,
  useTheme,
  useMediaQuery,
  Button,
  Avatar,
  Tabs,
  Tab,
  Breadcrumbs,
 } from "@mui/material";
import { getImageUrl } from "../../api/endpoints";
import {
  KingBed,
  Bathtub,
  Groups,
  AcUnit,
  Wifi,
  Kitchen,
  LocalLaundryService,
  Tv,
  Pool,
  HotTub,
  FitnessCenter,
  Iron,
  Pets,
  SmokingRooms,
  Nightlife,
  FamilyRestroom,
  Star,
  Share,
  FavoriteBorder,
  ArrowBack,
  ArrowForward,
  Map,
  CalendarToday,
  EmojiPeople,
  Home,
  Apartment,
  Hotel,
} from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookingForm from "../booking/BookingForm";
import LocationPinIcon from '@mui/icons-material/LocationPin';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
const amenityIcons = {
  wifi: <Wifi fontSize="small" />,
  kitchen: <Kitchen fontSize="small" />,
  washer: <LocalLaundryService fontSize="small" />,
  dryer: <LocalLaundryService fontSize="small" />,
  ac: <AcUnit fontSize="small" />,
  heating: <AcUnit fontSize="small" />,
  tv: <Tv fontSize="small" />,
  pool: <Pool fontSize="small" />,
  hot_tub: <HotTub fontSize="small" />,
  gym: <FitnessCenter fontSize="small" />,
  iron: <Iron fontSize="small" />,
};

const propertyTypeIcons = {
  house: <Home fontSize="small" />,
  apartment: <Apartment fontSize="small" />,
  hotel: <Hotel fontSize="small" />,
};

export const SingleProperty = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const { data, isLoading, isError, error } = useSinglePropertyQuery(id);
  const [value, setValue] = React.useState(0);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % property.images.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + property.images.length) % property.images.length
    );
  };

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" color="error">
          Error loading property
        </Typography>
        <Typography color="text.secondary">{error.message}</Typography>
      </Box>
    );

  const property = data?.data || data;

  if (!property)
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5">Property not found</Typography>
      </Box>
    );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
      
        <Link color="inherit" to="/">
          Home
        </Link>
        <Link color="inherit" to="/properties">
          Properties
        </Link>
        <Typography color="text.primary">{property.title}</Typography>
      </Breadcrumbs>

      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {property.title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
           
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <LocationPinIcon fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {property.location}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Image Gallery */}
      <Box sx={{ position: 'relative', mb: 4, borderRadius: 3, overflow: 'hidden' }}>
     <CardMedia
  component="img"
  image={getImageUrl(property.images?.[currentImageIndex])}
  alt={property.title}
  sx={{ 
    height: isMobile ? '40vh' : '60vh', // Using viewport height units for better responsiveness
    width: '100%',
    objectFit: 'contain', // Changed from 'cover' to 'contain' to ensure full image is visible
    backgroundColor: 'rgba(0, 0, 0, 0.08)', // Fallback background if image has transparency
    transition: 'opacity 0.5s ease-in-out',
    maxHeight: '100%', // Ensure it doesn't overflow container
    maxWidth: '100%', // Ensure it doesn't overflow container
    display: 'block', // Remove any potential inline spacing
    margin: '0 auto' // Center the image if there's extra space
  }}
/>
        
        {/* Navigation arrows */}
        {property.images?.length > 1 && (
          <>
            <IconButton 
              onClick={handlePrevImage}
              sx={{ 
                position: 'absolute', 
                left: 16, 
                top: '50%', 
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              <ArrowBack />
            </IconButton>
            <IconButton 
              onClick={handleNextImage}
              sx={{ 
                position: 'absolute', 
                right: 16, 
                top: '50%', 
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(255,255,255,0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }
              }}
            >
              <ArrowForward />
            </IconButton>
          </>
        )}
        
        {/* Image counter */}
        {property.images?.length > 1 && (
          <Box sx={{ 
            position: 'absolute', 
            bottom: 16, 
            right: 16,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 2
          }}>
            <Typography variant="caption">
              {currentImageIndex + 1} / {property.images.length}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Thumbnail images */}
      {property.images?.length > 1 && (
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          overflowX: 'auto',
          pb: 1,
          mb: 4,
          '&::-webkit-scrollbar': {
            height: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[400],
            borderRadius: 2
          }
        }}>
          {property.images?.map((img, index) => (
            <Box 
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              sx={{
                minWidth: 80,
                height: 80,
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                border: currentImageIndex === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                opacity: currentImageIndex === index ? 1 : 0.7,
                transition: 'all 0.2s ease'
              }}
            >
              <CardMedia
                component="img"
                image={getImageUrl(img)}
                alt={`${property.title} thumbnail ${index + 1}`}
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Highlights */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3, border: `1px solid ${theme.palette.grey[200]}` }}>
            <Grid container spacing={3}>
              {/* Bedrooms */}
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ 
                    backgroundColor: "#ff385c", 
                    color:'white',
                    p: 1.5, 
                    borderRadius: 2,
                  }}>
                    <MeetingRoomIcon fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                       Bedrooms
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
{property.capacity?.bedrooms || 0}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              {/* Beds */}
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ 
                    backgroundColor: "#ff385c", 
                    color:'white',
                    p: 1.5, 
                    borderRadius: 2,
                  }}>
                    <KingBed fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Beds
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.capacity?.beds || 0}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              {/* Bathrooms */}
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ 
                     backgroundColor: "#ff385c", 
                    color:'white',
                    p: 1.5, 
                    borderRadius: 2,
                  }}>
                    <Bathtub fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Bathrooms
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       {property.capacity?.bathrooms || 0}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              {/* Guests */}
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ 
                     backgroundColor: "#ff385c", 
                    color:'white',
                    p: 1.5, 
                    borderRadius: 2,
                  }}>
                    <Bathtub fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Guests
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       {property.capacity?.guests || 0}  
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ 
                    backgroundColor: "#ff385c", 
                    color:'white',
                    p: 1.5, 
                    borderRadius: 2,
                  }}>
                    {propertyTypeIcons[property.propertyType?.toLowerCase()] || <Home fontSize="medium" />}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Property type
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.propertyType}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              
            </Grid>
          </Paper>

          {/* Divider */}
          <Divider sx={{ my: 4 }} />

          {/* Description */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              About this place
            </Typography>
            <Typography variant="body1" paragraph>
              {property.description}
            </Typography>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 4 }} />

          {/* Amenities */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              What this place offers
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {property.amenities?.map((amenity, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ color:"#ff385c" }}>
                      {amenityIcons[amenity] || <Wifi fontSize="small" />}
                    </Box>
                    <Typography variant="body1">
                      {amenity.replace(/_/g, " ")}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 4 }} />
 

         
        </Grid>

        {/* Right Column - Booking Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            p: 3, 
            borderRadius: 3, 
            position: "sticky", 
            top: 20,
            border: `1px solid ${theme.palette.grey[200]}`,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)'
          }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: 'flex-start',
                mb: 2,
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  ₹{property.price.toLocaleString()}
                  <Typography component="span" color="text.secondary">
                    {" "}/ night
                  </Typography>
                </Typography>
                {/* <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Star color="primary" fontSize="small" />
                  <Typography variant="body2">4.92</Typography>
                  <Typography variant="body2" color="text.secondary">
                    (128 reviews)
                  </Typography>
                </Stack> */}
              </Box>
            </Box>
              
            <Divider sx={{ my: 3 }} />

            <BookingForm price={property.price} title={property.title} />

            <Divider sx={{ my: 3 }} />

            

 
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Cancellation policy
              </Typography>
              <Typography variant="body1">
                Free cancellation for 48 hours. After that, cancel before check-in and get a partial refund.
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Things to know
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {property.rules?.petsAllowed ? (
                      <Pets color="success" fontSize="small" />
                    ) : (
                      <Pets color="error" fontSize="small" />
                    )}
                    <Typography>
                      {property.rules?.petsAllowed ? "Pets allowed" : "No pets"}
                    </Typography>
                  </Stack>
                </Box>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {property.rules?.smokingAllowed ? (
                      <SmokingRooms color="success" fontSize="small" />
                    ) : (
                      <SmokingRooms color="error" fontSize="small" />
                    )}
                    <Typography>
                      {property.rules?.smokingAllowed
                        ? "Smoking allowed"
                        : "No smoking"}
                    </Typography>
                  </Stack>
                </Box>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {property.rules?.partiesAllowed ? (
                      <Nightlife color="success" fontSize="small" />
                    ) : (
                      <Nightlife color="error" fontSize="small" />
                    )}
                    <Typography>
                      {property.rules?.partiesAllowed
                        ? "Parties allowed"
                        : "No parties"}
                    </Typography>
                  </Stack>
                </Box>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {property.rules?.childrenAllowed ? (
                      <FamilyRestroom color="success" fontSize="small" />
                    ) : (
                      <FamilyRestroom color="error" fontSize="small" />
                    )}
                    <Typography>
                      {property.rules?.childrenAllowed
                        ? "Children allowed"
                        : "No children"}
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon color="primary" fontSize="small" />
                <Typography variant="body2">{property.location}</Typography>
              </Stack>
            </Box>
          </Card>
        </Grid>
        
      </Grid>

      
    </Container>
  );
};