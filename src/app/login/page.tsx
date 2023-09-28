"use client"
// components/LogInForm.js
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Paper, InputAdornment, IconButton, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

const LogInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  // if (!isOpen) return null;

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} style={{ fontFamily: 'Roboto', fontWeight: '400', padding: '15px 30px 80px 30px', margin: '60px 10px 10px 20px' }}>
        <Typography variant="h4" style={{ textAlign: 'center', fontWeight: 'bold', color: 'red', margin: '20px' }}>
          Log In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* Email field */}
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => (
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message || ''}
                style={{ margin: '10px 0' }}
                {...field}
              />
            )}
          />
          {/* Password field */}
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            }}
            render={({ field }) => (
              <TextField
                label="Password"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message || ''}
                style={{ margin: '10px 0' }}
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          {/* Forgotten Password link */}
          <Link href="/Forget" style={{ textDecoration: 'none', marginLeft: '72%', fontSize: '14px' }}>
            Forgotten Password 
          </Link>
          {/* Login button */}
          <Button
            style={{backgroundColor: 'royalblue', margin: '50px 0px' }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Log In
          </Button>
        </form>
        {/* Sign Up link */}
          <p 
            style={{ textAlign: 'center'}}> 
              You already have an account? 
                <Link href="/signup" style={{textDecoration: 'none', color: 'red'}}>
                   Sign Up 
                </Link>
          </p>
      </Paper>
    </Container>
  );
};

export default LogInForm;
