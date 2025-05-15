import { useMutation, useQuery } from "@tanstack/react-query";
import {
  register,
  verifyOTP,
  login,
  getProfile,
  updatePassword,
  sendResetPasswordLink,
  resetPassword,
  changeProfilePic,
} from "../api/apiHandler";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";
 

// Register User
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData) => register(formData),
    onSuccess: (data) => {
      console.log('Registration successful', data);
      navigate("/otp-verify");
      toast.success(data.data.message,{autoClose:700})
    },
    onError: (error) => {
      console.error('Registration failed', error.response?.data || error);
    },
  });
};

// OTP Verification
export const useOtpVerify = (options) => {
  return useMutation({
    mutationFn: verifyOTP,
    ...options,
  });
};

// Login User
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn:(formData)=>login(formData),
      onSuccess: (data) => {
        console.log('Login successful', data);
        toast.success(data.data.message,{autoClose:700});

      window.localStorage.setItem("usertoken",data.data.token);
        window.localStorage.setItem("userImage", data?.data?.data?.image);
        navigate("/");  
    }
    ,
    onError: (error) => {
      console.error('Login failed', error.response?.data || error);
      toast.error(error.response?.data || error,{autoClose:700})

    },
  });
};

// Fetch Profile (requires user to be authenticated)
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    onSuccess: (data) => {
      console.log('Welcome Profile', data);
      toast.success(data.data.message,{autoClose:700});
   }
   });
};

// Send Reset Password Link
export const useSendResetPasswordLink = () => {
  return useMutation({
        mutationKey:['reset-password-link'],
    mutationFn:(data)=>sendResetPasswordLink(data),
    onSuccess: (data) => {
        console.log('Email send for reset password', data);
        toast.success(data.data.message,{autoClose:700});
          // navigate("/")
      } 
   });
};

// Reset Password 
export const useResetPassword = () => {
  return useMutation({
    mutationFn:(data)=>resetPassword(data),
    onSuccess: (data) => {
        console.log('Password reset successfully', data);
        toast.success(data.data.message,{autoClose:700});
      } 
   });
};


// Update Password
export const useUpdatePassword = () => { 
  return useMutation({
    mutationKey:['update-password'],
    mutationFn:(data)=>updatePassword(data),
      onSuccess: (data) => {
        console.log('Password update successful', data);
        toast.success(data.data.message,{autoClose:700});
      } 
  })
};

// Change Profile PIc
export const useUpdateProfilePic = () => { 
  return useMutation({
    mutationKey:['change-profilePic'],
    mutationFn:(data)=>changeProfilePic(data),
      onSuccess: (data) => {
        console.log('Profile picture updated successful', data);
        toast.success(data.data.message,{autoClose:700});
      } 
  })
};
