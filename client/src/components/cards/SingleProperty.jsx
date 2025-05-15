import React from "react";
import { useParams } from "react-router-dom";
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
  Button
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
} from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BookingForm from "../booking/BookingForm";

const amenityIcons = {
  wifi: <Wifi />,
  kitchen: <Kitchen />,
  washer: <LocalLaundryService />,
  dryer: <LocalLaundryService />,
  ac: <AcUnit />,
  heating: <AcUnit />,
  tv: <Tv />,
  pool: <Pool />,
  hot_tub: <HotTub />,
  gym: <FitnessCenter />,
  iron: <Iron />,
};

export const SingleProperty = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const { data, isLoading, isError, error } = useSinglePropertyQuery(id);

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
      {/* Header Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {property.title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating value={4.5} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            · {property.location}
          </Typography>
          <IconButton size="small" sx={{ ml: "auto" }}>
            <ShareIcon />
          </IconButton>
          <IconButton size="small">
            <FavoriteBorderIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* Image Gallery */}
      <Grid container spacing={1} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardMedia
              component="img"
              image={getImageUrl(property.images?.[0])}
              alt={property.title}
              sx={{ height: isMobile ? 300 : 500, objectFit: "cover" }}
            />
          </Card>
        </Grid>
      <Grid container spacing={1} sx={{ mb: 4 }}>
  {property.images?.slice(1,10).map((img, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Card sx={{ borderRadius: 3 }}>
        <CardMedia
          component="img"
          image={getImageUrl(img)}
          alt={`${property.title} image ${index + 1}`}
          sx={{ height: 200, objectFit: "cover" }}
        />
      </Card>
    </Grid>
  ))}
</Grid>

      </Grid>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Highlights */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <KingBed fontSize="large" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {property.capacity?.bedrooms || 0} bedrooms
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.capacity?.beds || 0} beds
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Bathtub fontSize="large" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {property.capacity?.bathrooms || 0} bathrooms
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.propertyType}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* Description */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              About this place
            </Typography>
            <Typography variant="body1" paragraph>
              {property.description}
            </Typography>
          </Paper>

          {/* Amenities */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              What this place offers
            </Typography>
            <Grid container spacing={2}>
              {property.amenities?.map((amenity, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {amenityIcons[amenity] || <Wifi />}
                    <Typography variant="body1">
                      {amenity.replace("_", " ")}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Right Column - Booking Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 3, position: "sticky", top: 20 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              {/* <Typography variant="h5" fontWeight="bold">
                ₹{property.price.toLocaleString()}
                <Typography component="span" color="text.secondary">
                  {" "}
                  night
                </Typography>
              </Typography> */}
              <Rating value={4.5} precision={0.5} readOnly size="small" />
            </Box>
              <BookingForm price={property.price}/>
              

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                House rules
              </Typography>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {property.rules?.petsAllowed ? (
                    <Pets color="success" />
                  ) : (
                    <Pets color="error" />
                  )}
                  <Typography>
                    {property.rules?.petsAllowed ? "Pets allowed" : "No pets"}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {property.rules?.smokingAllowed ? (
                    <SmokingRooms color="success" />
                  ) : (
                    <SmokingRooms color="error" />
                  )}
                  <Typography>
                    {property.rules?.smokingAllowed
                      ? "Smoking allowed"
                      : "No smoking"}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {property.rules?.partiesAllowed ? (
                    <Nightlife color="success" />
                  ) : (
                    <Nightlife color="error" />
                  )}
                  <Typography>
                    {property.rules?.partiesAllowed
                      ? "Parties allowed"
                      : "No parties"}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {property.rules?.childrenAllowed ? (
                    <FamilyRestroom color="success" />
                  ) : (
                    <FamilyRestroom color="error" />
                  )}
                  <Typography>
                    {property.rules?.childrenAllowed
                      ? "Children allowed"
                      : "No children"}
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Location
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon color="primary" />
                <Typography>{property.location}</Typography>
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
