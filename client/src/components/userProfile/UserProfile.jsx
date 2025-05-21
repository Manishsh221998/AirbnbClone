import React, { useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Tabs, 
  Tab, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Chip, 
  Divider, 
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  CircularProgress
} from '@mui/material';
import {
  Star,
  Favorite,
  Settings,
  Home,
  PhotoCamera
} from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetIcon from '@mui/icons-material/LockReset';
import PortraitIcon from '@mui/icons-material/Portrait';
import { useProfile, useUpdateProfilePic } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import UpdatePasswordDialogBox from './UpdatePasswordDialogBox';
import Bookings from './BookingProfile';
import LuggageIcon from '@mui/icons-material/Luggage';
import FavoriteIcon from '@mui/icons-material/Favorite';
const UserProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
 
  // State management
  const [value, setValue] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now()); // Add timestamp state
 
  // Data hooks
  const { data, isLoading, refetch } = useProfile();
  const userData = data?.data?.data;
  const { mutate: updateProfilePic, isLoading: isUpdating } = useUpdateProfilePic();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('id', userData?.id);
      
      updateProfilePic(formData, {
        onSuccess: () => {
          // Update timestamp to force image reload
          setImageTimestamp(Date.now());
          refetch();
          handleMenuClose();
        },
        onError: (error) => {
          console.error('Error uploading profile picture:', error);
        }
      });
    }
  };

  const handleProfileChangeClick = () => {
    fileInputRef.current.click();
  };

    // Sample data
    const listings = [
      {
        id: 1,
        title: 'Modern Loft in Downtown',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        type: 'Entire apartment',
        location: 'San Francisco',
        price: '$120/night',
        rating: 4.89,
        reviews: 56
      }
    ];

    

  // Event handlers
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFavoriteToggle = () => {
    setFavorite(!favorite);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    try {
      navigate('/');
      window.localStorage.clear();
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handlePasswordSubmit = (newPassword) => {
    console.log('New password submitted:', newPassword);
    handleDialogClose();
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: isMobile ? 1 : 3 }}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Profile
        </Typography>
      
        <div>
          <IconButton onClick={handleMenuOpen}>
            <Settings />
          </IconButton>
          <Menu
            sx={{ borderRadius: 5 }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleProfileChangeClick} disabled={isUpdating}>
              <PortraitIcon sx={{ mr: 1 }} />
              {isUpdating ? 'Uploading...' : 'Change Profile'}
            </MenuItem>
            <MenuItem onClick={handleDialogOpen}>
              <LockResetIcon sx={{ mr: 1 }} />
              Update Password
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Box>

      {/* Update Password Dialog */}
      <UpdatePasswordDialogBox 
        open={openDialog} 
        onClose={handleDialogClose}
        onSubmit={handlePasswordSubmit}
        id={userData?.id}
      />

      {/* User Info Section */}
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3, mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar 
            src={`http://localhost:6001/${userData.image}`}
            sx={{ 
              width: isMobile ? 100 : 150, 
              height: isMobile ? 100 : 150,
              border: '3px solid white',
              boxShadow: 2,
            }} 
          />
          {isUpdating && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '50%',
              }}
            >
              <CircularProgress size={24} color="secondary" />
            </Box>
          )}
        </Box>
     
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              {userData?.name}
            </Typography>
            {userData?.isVerified && (
              <Chip 
                label="Verified" 
                size="small" 
                color="warning" 
                sx={{ fontSize: '0.7rem', height: 20, boxShadow: 2 }} 
              />
            )}
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            <EmailIcon sx={{ fontSize: '19px', marginRight: "3px", marginBottom: '1px' }} /> 
            Email | {userData?.email}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="body1">
              <CallIcon sx={{ fontSize: '18px', marginRight: "3px", marginBottom: '1px' }} />
              Contact | {userData?.phone}  
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Tabs Section */}
<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
  <Tabs 
    value={value} 
    onChange={handleTabChange} 
    variant={isMobile ? 'scrollable' : 'fullWidth'}
    sx={{
      '& .MuiTabs-indicator': { backgroundColor: 'red' },
    }}
  >
    <Tab 
      label="Wishlist" 
      icon={isMobile ? <FavoriteIcon /> : null} 
      sx={{
        color: 'black',
        '&.Mui-selected': { color: 'crimson' }
      }}
    />
    <Tab 
      label="My Bookings" 
      icon={isMobile ? <LuggageIcon /> : null}
      sx={{
        color: 'black',
        '&.Mui-selected': { color: 'crimson' }
      }}
    />
  </Tabs>
</Box>

      {/* Tab Content */}
      <Box sx={{ pt: 2 }}>
        {value === 0 && (
          <Grid container spacing={3}>
            {listings.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.title}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: favorite ? 'red' : 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }
                      }}
                      onClick={handleFavoriteToggle}
                    >
                      <Favorite />
                    </IconButton>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {item.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star color="primary" fontSize="small" />
                        <Typography variant="body2">
                          {item.rating}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.type} · {item.location}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {value === 1 && (
          <Box>
            <Bookings/> 
             
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;