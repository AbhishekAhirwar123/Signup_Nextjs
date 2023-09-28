"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Link,
  Grid,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio, // Import Radio components
} from "@mui/material";
import { styled } from "@mui/system";

// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";



const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const StyledPaper = styled(Paper)`
  padding: 30px;
  max-width: 500px; /* Adjust the max-width for a wider form */
  width: 100%;
  text-align: center;
  margin-top: 20px; /* Optional: Adjust margin for spacing */
`;

// ... (previous imports and component code)

const SignupPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    confirmpassword: "",
    password: "",
    gender: "male", // Default value for gender
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmpasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // Regular expressions for validations
  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordMinLength = 8;

  useEffect(() => {
    // Validation checks for enabling/disabling the signup button
    const isFirstNameValid = nameRegex.test(user.firstname);
    const isLastNameValid = nameRegex.test(user.lastname);
    const isEmailValid = emailRegex.test(user.email);
    const isNumberValid = /^[0-9]{10}$/.test(user.number);
    const isPasswordValid = user.password.length >= passwordMinLength;
    const isPasswordMatch = user.password === user.confirmpassword;

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isNumberValid &&
      isPasswordValid &&
      isPasswordMatch
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response.data);
      router.push("/login");
    } catch (err: any) {
      console.log("Signup Failed", err.message);
      console.log(user);
      setError(err.message);
    }
  };

  // Handler function for gender radio button changes
  const handleGenderChange = (event: any) => {
    setUser({ ...user, gender: event.target.value });
  };

  // Validation functions
  const validateFirstname = () => {
    if (!nameRegex.test(user.firstname)) {
      setFirstnameError("First Name only letters and spaces");
    } else {
      setFirstnameError("");
    }
  };

  const validateLastname = () => {
    if (!nameRegex.test(user.lastname)) {
      setLastnameError(" Last Name only letters and spaces");
    } else {
      setLastnameError("");
    }
  };

  const validateEmail = () => {
    if (!emailRegex.test(user.email)) {
      setEmailError("Invalid Email Address");
    } else {
      setEmailError("");
    }
  };

  const validateNumber = () => {
    if (!/^[0-9]{10}$/.test(user.number)) {
      setNumberError("Please Enter a Valid (10-Digit) Phone Number");
    } else {
      setNumberError("");
    }
  };

  const validatePassword = () => {
    if (user.password.length < passwordMinLength) {
      setPasswordError(`Password must be at least ${passwordMinLength} characters`);
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmpassword = () => {
    if (user.password !== user.confirmpassword) {
      setConfirmpasswordError("Passwords do not match");
    } else {
      setConfirmpasswordError("");
    }
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h4" color="primary" gutterBottom>
          Signup Page
        </Typography>
        <hr />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={user.firstname}
              onChange={(e) =>
                setUser({ ...user, firstname: e.target.value })
              }
              onBlur={validateFirstname}
            />
            {firstnameError && (
              <Typography variant="body2" color="error">
                {firstnameError}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={user.lastname}
              onChange={(e) =>
                setUser({ ...user, lastname: e.target.value })
              }
              onBlur={validateLastname}
            />
            {lastnameError && (
              <Typography variant="body2" color="error">
                {lastnameError}
              </Typography>
            )}
          </Grid>
        </Grid>

        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          margin="normal"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          onBlur={validateEmail}
        />
        {emailError && (
          <Typography variant="body2" color="error">
            {emailError}
          </Typography>
        )}

        <TextField
          label="Number"
          fullWidth
          variant="outlined"
          margin="normal"
          value={user.number}
          onChange={(e) => setUser({ ...user, number: e.target.value })}
          onBlur={validateNumber}
        />
        {numberError && (
          <Typography variant="body2" color="error">
            {numberError}
          </Typography>
        )}

        {/* Place both radio buttons in a single Grid item */}
        <Grid item xs={12} style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" style={{ marginRight: "16px" }}>
            Gender:
          </Typography>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={user.gender}
            onChange={handleGenderChange}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
            />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </Grid>

        <TextField
          label="Password"
          fullWidth
          variant="outlined"
          margin="normal"
          type={showPassword ? "text" : "password"}
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          onBlur={validatePassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {passwordError && (
          <Typography variant="body2" color="error">
            {passwordError}
          </Typography>
        )}


        <TextField
          label="Confirm Password"
          fullWidth
          variant="outlined"
          margin="normal"
          type="password"
          value={user.confirmpassword}
          onChange={(e) =>
            setUser({ ...user, confirmpassword: e.target.value })
          }
          onBlur={validateConfirmpassword}
        />
        {confirmpasswordError && (
          <Typography variant="body2" color="error">
            {confirmpasswordError}
          </Typography>
        )}


        <Button
          onClick={onSignup}
          variant="contained"
          color="primary"
          fullWidth
          disabled={buttonDisabled}
          style={{ marginTop: "16px", backgroundColor: "royalblue", color: "#fff" }}
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </Button>

        {error && (
          <Typography
            variant="body2"
            color="error"
            style={{ marginTop: "16px" }}
          >
            {error}
          </Typography>
        )}

        <Typography variant="body2" color="textSecondary" style={{ marginTop: "16px" }}>
          <Link href="/login" underline="none" color="black">
            Already have a Acoount <span style={{color: 'red'}}> Login Page </span> 
          </Link>
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
};

export default SignupPage;
