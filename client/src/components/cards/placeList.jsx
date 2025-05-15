import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Container,
  Grid,
  styled,
  useMediaQuery,
  useTheme,
  Skeleton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import { usePropertiesQuery } from "../../hooks/useProperty";
import { getImageUrl } from "../../api/endpoints";

const PropertyCard = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  cursor: "pointer",
  "&:hover": {
    "& img": {
      opacity: 0.9,
    },
  },
});

const ImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  paddingTop: "75%", // 4:3 aspect ratio
  borderRadius: "12px",
  overflow: "hidden",
  marginBottom: "12px",
});

const StyledImage = styled("img")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "opacity 0.3s ease",
});

const WishlistButton = styled(IconButton)({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "50%",
  zIndex: 2,
  padding: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
});

const PropertyInfo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});

const PropertyHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "8px",
});

const PropertyTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: "1rem",
  lineHeight: 1.2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  marginBottom: "4px",
});

const PropertyLocation = styled(Typography)({
  fontSize: "0.875rem",
  color: "#717171",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

const PriceText = styled(Typography)({
  fontWeight: 600,
  fontSize: "0.95rem",
  marginTop: "8px",
  "& span": {
    fontWeight: 400,
  },
});

const RatingBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  "& svg": {
    fontSize: "1rem",
    color: "#222",
    marginRight: "2px",
  },
});

const LoadingSkeleton = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <PropertyCard>
        <ImageContainer>
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </ImageContainer>
        <PropertyInfo>
          <Skeleton width="80%" height={24} />
          <Skeleton width="60%" height={20} />
          <Skeleton width="50%" height={20} style={{ marginTop: "8px" }} />
        </PropertyInfo>
      </PropertyCard>
    </Grid>
  );
};

const PlacesList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading, error } = usePropertiesQuery();
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (error)
    return (
      <Box py={10} textAlign="center" color="error.main">
        Error loading properties. Please try again later.
      </Box>
    );

  return (
    <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
      <Grid container spacing={isMobile ? 2 : 4}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))
          : data?.map((property) => {
              const images = property.images || [];
              const currentImage = images[0];

              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={property._id}
                  sx={{
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <PropertyCard>
                    <ImageContainer>
                      <StyledImage
                        src={
                          currentImage
                            ? getImageUrl(currentImage)
                            : "/placeholder.jpg"
                        }
                        alt={property.title}
                        onError={(e) => (e.target.src = "/placeholder.jpg")}
                      />
                      <WishlistButton
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(property._id);
                        }}
                        aria-label={
                          wishlist[property._id]
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        {wishlist[property._id] ? (
                          <FavoriteIcon sx={{ color: "#ff385c" }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ color: "#222" }} />
                        )}
                      </WishlistButton>
                    </ImageContainer>

                    <PropertyInfo>
                      <PropertyHeader>
                        <Box sx={{ flex: 1 }}>
                          <PropertyTitle>{property.title}</PropertyTitle>
                          <PropertyLocation>
                            {property.location}
                          </PropertyLocation>
                        </Box>
                        {property.rating && (
                          <RatingBox>
                            <StarIcon />
                            <Typography variant="body2">
                              {property.rating.toFixed(1)}
                            </Typography>
                          </RatingBox>
                        )}
                      </PropertyHeader>
                      <PriceText>
                        ₹{property.price * 5}
                        <span> for 5 night</span>
                      </PriceText>
                    </PropertyInfo>
                  </PropertyCard>
                </Grid>
              );
            })}
      </Grid>
      {!isLoading && !data?.length && (
        <Box py={10} textAlign="center">
          No properties found matching your criteria.
        </Box>
      )}
    </Container>
  );
};

export default PlacesList;