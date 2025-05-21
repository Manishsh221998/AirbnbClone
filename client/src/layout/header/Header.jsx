import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Container,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TuneIcon from "@mui/icons-material/Tune";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import HouseIcon from "@mui/icons-material/House";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PoolIcon from "@mui/icons-material/Pool";
import WaterIcon from "@mui/icons-material/Water";
import LandscapeIcon from "@mui/icons-material/Landscape";
import CastleIcon from "@mui/icons-material/Castle";
import PublicIcon from "@mui/icons-material/Public";
import ParkIcon from "@mui/icons-material/Park";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Logo component
const Logo = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "#FF385C",
  fontWeight: "bold",
  fontSize: "24px",
  cursor: "pointer",
}));

const CategoryTab = styled(Tab)(({ theme }) => ({
  minWidth: "auto",
  padding: "12px 16px",
  fontSize: "12px",
  textTransform: "none",
  color: "#717171",
  "&.Mui-selected": {
    color: "#000",
    fontWeight: "bold",
  },
}));

const NavLink = styled(Button)(({ theme }) => ({
  color: "black",
  textTransform: "none",
  fontWeight: "medium",
  fontSize: "18px",
  margin: "0 8px",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const AirbnbHeader = () => {
  const token = window.localStorage.getItem("usertoken");
  const userImage = window.localStorage.getItem("userImage");
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    try {
      handleMenuClose();
      window.localStorage.clear();
      setTimeout(() => navigate("/", { replace: true }), 1);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Categories that match your backend enum
  const categories = [
    {
      label: "Amazing views",
      icon: <LandscapeIcon fontSize="small" />,
      value: "Amazing views",
    },
    {
      label: "Castles",
      icon: <CastleIcon fontSize="small" />,
      value: "Castles",
    },
    {
      label: "Beachfronts",
      icon: <BeachAccessIcon fontSize="small" />,
      value: "Beachfronts",
    },
    { label: "Lake", icon: <WaterIcon fontSize="small" />, value: "Lake" },
    {
      label: "Mansions",
      icon: <HouseIcon fontSize="small" />,
      value: "Mansions",
    },
    { label: "OMG!", icon: <PublicIcon fontSize="small" />, value: "OMG!" },
    {
      label: "Rooms",
      icon: <ApartmentIcon fontSize="small" />,
      value: "Rooms",
    },
    {
      label: "Top cities",
      icon: <HouseIcon fontSize="small" />,
      value: "Top cities",
    },
    {
      label: "Top of the world",
      icon: <PublicIcon fontSize="small" />,
      value: "Top of the world",
    },
  ];

  const handleCategoryClick = (categoryValue) => {
    navigate(`/properties?category=${encodeURIComponent(categoryValue)}`);
  };

  const handleCategoryChange = (event, newValue) => {
    setCategoryValue(newValue);
    const category = categories[newValue]?.value;
    if (category) {
      handleCategoryClick(category);
    }
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {!token ? (
          <>
            <ListItem
              button
              component={Link}
              to="/login"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Log in" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/register"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Sign up" />
            </ListItem>
          </>
        ) : (
          <ListItem
            button
            component={Link}
            to="/profile"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Profile" />
          </ListItem>
        )}
        <Divider />
        <ListItem>
          <ListItemText primary="Airbnb your home" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Host an experience" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Help Centre" />
        </ListItem>
        {token && (
          <>
            <Divider />
            <ListItem button onClick={logout}>
              <ListItemText primary="Log out" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: "170px" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ borderBottom: "1px solid #eee", bgcolor: "white" }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            {/* Logo */}
            <Link to="/">
              <Logo>
                <svg
                  width="30"
                  height="32"
                  fill="currentcolor"
                  style={{ display: "block" }}
                >
                  <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06-.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5z"></path>
                </svg>
                <Typography
                  variant="h6"
                  sx={{ ml: 1, display: { xs: "none", sm: "block" } }}
                >
                  cloudbnb
                </Typography>
              </Logo>
            </Link>

            {/* Navigation Links - HOME | EXPERIENCE */}
            <Box
              sx={{ flexGrow:1, display: "flex", justifyContent: "center" }}
            >
              <NavLink component={Link} to="/">
                HOME
              </NavLink>
              <NavLink component={Link} to="/experience" disabled>
                EXPERIENCE
              </NavLink>
            </Box>

            {/* Right side buttons */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!isSmall && (
                <Button
                  sx={{
                    borderRadius: "40px",
                    textTransform: "none",
                    fontWeight: "medium",
                    mr: 1,
                    color: "black",
                  }}
                >
                  Airbnb your home
                </Button>
              )}

              {/* <IconButton sx={{ mr: 1, color: "gray" }}>
                <LanguageIcon fontSize="small" />
              </IconButton> */}

              <Button
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "40px",
                  py: "7px",
                  paddingRight: "7px",
                  paddingLeft: "14px",
                  minWidth: "auto",
                }}
                onClick={token ? handleMenuOpen : handleMenuOpen}
              >
                <MenuIcon fontSize="small" sx={{ mr: 1, color: "black" }} />
                <Avatar
                  sx={{ width: 31, height: 31, bgcolor: "#717171" }}
                  src={`http://localhost:6001/${userImage}`}
                >
                  {!userImage && <AccountCircleIcon fontSize="small" />}
                </Avatar>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: { mt: 1.5, width: 220, borderRadius: 2 },
                }}
              >
                {token ? (
                  <>
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={handleMenuClose}
                    >
                      Profile
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      component={Link}
                      to="/register"
                      onClick={handleMenuClose}
                    >
                      Sign up
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/login"
                      onClick={handleMenuClose}
                    >
                      Log in
                    </MenuItem>
                  </>
                )}
                <Divider />
                <MenuItem onClick={handleMenuClose}>Airbnb your home</MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  Host an experience
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>Help Centre</MenuItem>
                {token && (
                  <>
                    <Divider />
                    <MenuItem onClick={logout}>Log out</MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </Toolbar>

          {location.pathname === "/profile" || location.pathname.startsWith("/property/")? null : (
            <>
              {/* Categories */}
              <Box sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tabs
                    value={categoryValue}
                    onChange={handleCategoryChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                      "& .MuiTabs-indicator": {
                        backgroundColor: "#000",
                        height: "2px",
                      },
                      flex: 1,
                    }}
                  >
                    {categories.map((category, index) => (
                      <CategoryTab
                        key={index}
                        icon={category.icon}
                        label={category.label}
                        iconPosition="top"
                        onClick={() => handleCategoryClick(category.value)}
                      />
                    ))}
                  </Tabs>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 2,
                      borderLeft: "1px solid #ddd",
                      pl: 2,
                    }}
                  >
                    {/* <Button
                      startIcon={<TuneIcon />}
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        textTransform: "none",
                        px: 2,
                      }}
                    >
                      Filters
                    </Button> */}
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Category Navigation Arrows */}
      <Box
        sx={{
          position: "absolute",
          right: 16,
          top: isMobile ? 120 : 140,
          display: { xs: "none", md: "block" },
        }}
      >
        <IconButton
          sx={{
            bgcolor: "white",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "white" },
          }}
        ></IconButton>
      </Box>
    </Box>
  );
};

export default AirbnbHeader;
