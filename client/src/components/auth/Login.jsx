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
import { useLogin } from "../../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginModal = ({ open, onClose }) => {
  
  const { register, handleSubmit } = useForm();
  const {mutate, isPending, isSuccess, isError, error} = useLogin();

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };
if(isError){
  toast.error(error?.response?.data?.message,{autoClose:800})
}
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius:7, px:3,py:5 } }}
    >
      <DialogTitle sx={{ px: 3, pt: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Login to Your Account
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
            {...register("email", { required: true })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...register("password", { required: true })}
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
            {isPending ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        <Divider><Link to="/reset-password-link" style={{textAlign:'center',color:'brown',fontFamily:'serif'}}>Forgot Password</Link></Divider>
          
          <Link to="/register" style={{textAlign:'center'}}>Create an account</Link>

          {isSuccess && (
            <Typography color="success.main" mt={2}>
              Logged in successfully!
            </Typography>
          )}
         
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
