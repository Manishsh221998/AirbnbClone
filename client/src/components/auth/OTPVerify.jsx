import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useOtpVerify } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OTPVerifyModal = ({ open, onClose }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { mutate: verifyOtp, isPending } = useOtpVerify();

  const onSubmit = (data) => {
    verifyOtp(data, {
      onSuccess: () => {
        toast.success("OTP Verified! You can now log in.",{autoClose:600});
        navigate("/login");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "OTP verification failed.");
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius:5,
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ px: 3, pt: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Verify OTP
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mx: 3, mb: 2 }} />

      <DialogContent sx={{ px: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            fullWidth
            label="Email"
            {...register("email", { required: true })}
          />
          <TextField
            fullWidth
            label="OTP"
            {...register("otp", { required: true })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundImage: "linear-gradient(45deg, #FF386C, #FF398B)",
              "&:hover": {
                backgroundImage: "linear-gradient(45deg, #FF386C, #FF385C)",
              },
            }}
            disabled={isPending}
          >
            {isPending ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerifyModal;
