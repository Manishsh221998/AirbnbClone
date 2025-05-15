import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useResetPassword } from "../../hooks/useUser";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const ResetPasswordModal = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isSuccess, error, isError } = useResetPassword();

  const onSubmit = (data) => {
    mutate({ id, token, data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset successful!", { autoClose: 800 });
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        autoClose: 800,
      });
    }
  }, [isError, error]);

  return (
    <Box sx={{ mt: 24 }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 568,
          mx: "auto",
          my: 15,
          p: 4,
          borderRadius: 2,
          [theme.breakpoints.down("sm")]: {
            mx: 2,
            my: 2,
            p: 3,
          },
        }}
      >
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Reset your password
        </Typography>
        <Divider />
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="New password"
            type="password"
            placeholder="Enter new password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Confirm new password"
            type="password"
            placeholder="Confirm your password"
            error={!!errors.confirm_Password}
            helperText={errors.confirm_Password?.message}
            {...register("confirm_Password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords don't match",
            })}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isPending}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              backgroundImage: "linear-gradient(45deg, #FF385C, #FF398B)",
              "&:hover": {
                backgroundImage: "linear-gradient(45deg, #FF386C, #FF385C)",
              },
            }}
          >
            {isPending ? "Resetting password..." : "Reset password"}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          <Typography variant="body2" color="text.secondary" align="center">
            Remember your password?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/login")}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "black",
                "&:hover": {
                  color: "#ff385c",
                  cursor: "pointer",
                },
              }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResetPasswordModal;
