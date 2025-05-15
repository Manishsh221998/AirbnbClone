import React, { useEffect } from "react";
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
import { useSendResetPasswordLink } from "../../hooks/useUser";
import { toast } from "react-toastify";

const ResetPasswordLinkModal = ({ open, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate, isPending, isSuccess, isError, error, reset } =
    useSendResetPasswordLink();

  const onSubmit = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (isError) {
      toast.error(
        error?.response?.data?.message || "Failed to send reset link",
        {
          autoClose: 1000,
        }
      );
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Reset link sent to your email!", {
        autoClose: 1000,
      });
      onClose();
      reset(); // resets the mutation state
    }
  }, [isSuccess, onClose, reset]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 7, px: 3, py: 5 } }}
    >
      <DialogTitle sx={{ px: 3, pt: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Reset Password
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
            label="Email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email && "Email is required"}
            {...register("email", { required: true })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundImage: "linear-gradient(45deg, #FF385C, #FF398B)",
              "&:hover": {
                backgroundImage: "linear-gradient(45deg, #FF386C, #FF385C)",
              },
            }}
            disabled={isPending}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send Link"
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordLinkModal;
