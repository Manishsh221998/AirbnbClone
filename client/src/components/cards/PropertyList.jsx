import { useState } from "react";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Rating,
  Skeleton,
  Grid,
  Button,
  Container,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { styled } from "@mui/material/styles";
import { usePropertiesQuery } from "../../hooks/useProperty";
import { useNavigate } from "react-router-dom";

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: "none",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
  },
  height: "100%",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  height: 250, // Fixed height
  width: 250, // Fixed width
  borderRadius: 12,
  overflow: "hidden",
  margin: "0 auto", // Center the image container
}));

const FavoriteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  zIndex: 2,
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  zIndex: 2,
  opacity: 0,
  transition: "opacity 0.3s ease",
  "div:hover &": {
    opacity: 1,
  },
}));

const PrevButton = styled(NavButton)({
  left: 8,
});

const NextButton = styled(NavButton)({
  right: 8,
});

const PropertyList = () => {
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(10);
  const [favorites, setFavorites] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const { data, isPending } = usePropertiesQuery();

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const loadMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  const navigateToProperty = (id) => {
    navigate(`/property/${id}`);
  };

  const handleNextImage = (e, propertyId) => {
    e.stopPropagation();
    const property = data.find((p) => p.id === propertyId);
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % property.images.length,
    }));
  };

  const handlePrevImage = (e, propertyId) => {
    e.stopPropagation();
    const property = data.find((p) => p.id === propertyId);
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]:
        ((prev[propertyId] || 0) - 1 + property.images.length) %
        property.images.length,
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {data?.slice(0, visibleItems).map((property) => (
          <Grid item key={property.id} xs={12} sm={6} md={4} lg={3}>
            <StyledCard onClick={() => navigateToProperty(property._id)}>
              <ImageContainer>
                <FavoriteButton
                  aria-label="add to favorites"
                  onClick={(e) => toggleFavorite(e, property.id)}
                  size="small"
                >
                  {favorites[property.id] ? (
                    <FavoriteIcon sx={{ color: "#FF385C" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </FavoriteButton>

                {property.images.length > 1 && (
                  <>
                    <PrevButton
                      aria-label="previous image"
                      onClick={(e) => handlePrevImage(e, property.id)}
                      size="small"
                    >
                      <ArrowBackIosNewIcon fontSize="small" />
                    </PrevButton>
                    <NextButton
                      aria-label="next image"
                      onClick={(e) => handleNextImage(e, property.id)}
                      size="small"
                    >
                      <ArrowForwardIosIcon fontSize="small" />
                    </NextButton>
                  </>
                )}

                {isPending ? (
                  <Skeleton
                    variant="rectangular"
                    width={250}
                    height={250}
                    animation="wave"
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 2,
                    }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    image={`http://localhost:6001/${
                      property.images[currentImageIndex[property.id] || 0]
                    }`}
                    alt={property.title}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                  />
                )}
              </ImageContainer>

              <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" noWrap>
                    {property.location}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  {property.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {property.dates}
                </Typography>

                <Typography variant="subtitle1" fontWeight="bold">
                  ₹{property.price}{" "}
                  <Typography component="span" variant="body2">
                    per night
                  </Typography>
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {visibleItems < (data?.length || 0) && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="outlined"
            onClick={loadMore}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              bgcolor: "white",
              color: "black",
              borderColor: "black",
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
                borderColor: "black",
                color: "white",
                bgcolor: "black",
              },
            }}
          >
            View More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PropertyList;
