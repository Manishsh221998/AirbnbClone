"use client"

import React from "react"
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  useMediaQuery,
  IconButton,
  Stack,
  MenuItem,
  Select,
  FormControl,
  Button,
 } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import LanguageIcon from "@mui/icons-material/Language"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"

const footerSections = [
  {
    title: "Support",
    links: [
      "Help Center",
      "AirCover",
      "Safety information",
      "Supporting people with disabilities",
      "Cancellation options",
      "Report a neighborhood concern",
    ],
  },
  {
    title: "Community",
    links: ["Airbnb.org: disaster relief housing", "Combating discrimination"],
  },
  {
    title: "Hosting",
    links: [
      "Airbnb your home",
      "AirCover for Hosts",
      "Explore hosting resources",
      "Visit our community forum",
      "How to host responsibly",
      "Airbnb-friendly apartments",
    ],
  },
  {
    title: "Airbnb",
    links: ["Newsroom", "Learn about new features", "Letter from our founders", "Careers", "Investors", "Gift cards"],
  },
]

const AirbnbFooter = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const [language, setLanguage] = React.useState("English")
  const [currency, setCurrency] = React.useState("USD")

//   const handleLanguageChange = (event: SelectChangeEvent) => {
//     setLanguage(event.target.value)
//   }

//   const handleCurrencyChange = (event: SelectChangeEvent) => {
//     setCurrency(event.target.value)
//   }

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* Footer Links Section */}
        <Grid container spacing={4}>
          {footerSections.map((section, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Typography variant="subtitle1" component="h3" fontWeight="bold" gutterBottom>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {section.links.map((link, linkIndex) => (
                  <Box component="li" key={linkIndex} sx={{ mb: 1 }}>
                    <Link
                      href="#"
                      color="text.secondary"
                      sx={{
                        textDecoration: "none",
                        "&:hover": {
                          textDecoration:'underline',
                          textDecorationThickness: "1px",
                          color: "text.primary",
                        },
                      }}
                    >
                      {link}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Footer Bottom Section */}
        <Grid
          container
          direction={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "flex-start" : "center"}
          spacing={isMobile ? 2 : 0}
        >
          {/* Copyright and Links */}
          <Grid item>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={isMobile ? 1 : 2}
              alignItems={isMobile ? "flex-start" : "center"}
            >
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Airbnb, Inc.
              </Typography>
              <Box
                component="span"
                sx={{
                  display: { xs: "none", sm: "inline" },
                  mx: 0.5,
                }}
              >
                ·
              </Box>
              <Link href="#" color="text.secondary" sx={{ textDecoration: "none" }}>
                <Typography variant="body2">Privacy</Typography>
              </Link>
              <Box
                component="span"
                sx={{
                  display: { xs: "none", sm: "inline" },
                  mx: 0.5,
                }}
              >
                ·
              </Box>
              <Link href="#" color="text.secondary" sx={{ textDecoration: "none" }}>
                <Typography variant="body2">Terms</Typography>
              </Link>
              <Box
                component="span"
                sx={{
                  display: { xs: "none", sm: "inline" },
                  mx: 0.5,
                }}
              >
                ·
              </Box>
              <Link href="#" color="text.secondary" sx={{ textDecoration: "none" }}>
                <Typography variant="body2">Sitemap</Typography>
              </Link>
            </Stack>
          </Grid>

          {/* Language, Currency and Social Links */}
          <Grid item>
            <Stack
              direction={isMobile ? "column" : "row"}
              spacing={2}
              alignItems={isMobile ? "flex-start" : "center"}
              sx={{ mt: isMobile ? 2 : 0 }}
            >
              {/* Language Selector */}
              {/* <Stack direction="row" alignItems="center" spacing={1}>
                <LanguageIcon fontSize="small" />
                <FormControl size="small" variant="standard">
                  <Select
                    value={language}
                    onChange={handleLanguageChange}
                    disableUnderline
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: "medium",
                      "& .MuiSelect-select": {
                        py: 0,
                        pr: 1.5,
                      },
                    }}
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="Spanish">Español</MenuItem>
                    <MenuItem value="French">Français</MenuItem>
                  </Select>
                </FormControl>
              </Stack> */}

              {/* Currency Selector */}
              {/* <Stack direction="row" alignItems="center" spacing={1}>
                <AttachMoneyIcon fontSize="small" />
                <FormControl size="small" variant="standard">
                  <Select
                    value={currency}
                    onChange={handleCurrencyChange}
                    disableUnderline
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: "medium",
                      "& .MuiSelect-select": {
                        py: 0,
                        pr: 1.5,
                      },
                    }}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                  </Select>
                </FormControl>
              </Stack> */}

              {/* Social Media Icons */}
              {!isMobile && !isTablet && (
                <Stack direction="row" spacing={1}>
                  <IconButton size="small" aria-label="Facebook">
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" aria-label="Twitter">
                    <TwitterIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" aria-label="Instagram">
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                </Stack>
              )}
            </Stack>
          </Grid>

          {/* Social Media Icons for Mobile/Tablet */}
          {(isMobile || isTablet) && (
            <Grid item sx={{ mt: 2 }}>
              <Stack direction="row" spacing={1}>
                <IconButton size="small" aria-label="Facebook">
                  <FacebookIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" aria-label="Twitter">
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" aria-label="Instagram">
                  <InstagramIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Container>
 
    </Box>
  )
}

export default AirbnbFooter
