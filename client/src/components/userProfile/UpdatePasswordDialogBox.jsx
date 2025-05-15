import React, { useEffect } from 'react';  
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Box
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useForm } from 'react-hook-form';
 import { useUpdatePassword } from '../../hooks/useUser';
 
const UpdatePasswordDialogBox = ({ open, onClose, id }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const {mutate, isPending, isSuccess, isError, error,reset: resetMutation} = useUpdatePassword();

  const onSubmit = (data) => {
    const password=data.password
     const obj={userId:id,password}
     console.log(obj)
      mutate(obj);
  };
 useEffect(() => {
    if (isSuccess) {
      onClose();
      reset();
      resetMutation()
    }
  }, [isSuccess, onClose, reset,resetMutation]);
  return (
    <Dialog 
       component="form"
          onSubmit={handleSubmit(onSubmit)}
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          minWidth: isMobile ? '90%' : 400,
          overflow: 'hidden'
        }
      }}
    >
      <DialogTitle 
        sx={{
          fontWeight: 'medium',
          color: 'black',
          // backgroundColor: theme.palette.grey[100],
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <LockResetIcon />
        Update Password
      </DialogTitle>
      
      <Divider />
      
      <DialogContent sx={{ py: 3, px: 3 }}>
        <Box 
       
          sx={{ minWidth: 300 }}
        >
          <TextField
            fullWidth
            label="Password"
            type="text"
            {...register('password', { 
              required: 'Password is required'
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ 
              mt: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '& fieldset': {
                  // borderColor: theme.palette.grey[300],
                },
                '&:hover fieldset': {
                  borderColor:'#FF385C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: "black",
                  borderWidth: 1,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'black',
              }
            }}
            variant="outlined"
            size="medium"
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ 
        px: 3, 
        py: 2,
        // backgroundColor: theme.palette.grey[50],
        borderTop: `1px solid ${theme.palette.divider}`
      }}>
        <Button 
          onClick={() => {
            onClose();
            reset();
          }}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: 'none',
            color: theme.palette.text.secondary,
            '&:hover': {
              // backgroundColor: theme.palette.grey[200]
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
           variant="contained"
          disabled={isPending}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: 'none',
            backgroundColor:'#FF385C',
            '&:hover': {
              backgroundColor:'black'
            },
            '&:disabled': {
              // backgroundColor: theme.palette.grey[300]
            }
          }}
        >
          {isPending ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdatePasswordDialogBox;