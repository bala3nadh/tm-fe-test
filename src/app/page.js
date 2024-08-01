"use client"
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Card,Select, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MailIcon from '@mui/icons-material/Mail';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: 'male',
    email: '',
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = 'Required field.';
    if (!formData.address) tempErrors.address = 'Invalid Address. Please select from suggestions.';
    if (!formData.city) tempErrors.city = 'Required field.';
    if (!formData.state) tempErrors.state = 'Required field.';
    if (!/^\(\d{3}\)\s\d{3}-\d{4}$/.test(formData.phoneNumber)) tempErrors.phoneNumber = 'Required field. (000) 000-0000';
    if (!formData.dateOfBirth) tempErrors.dateOfBirth = 'Required field. MM/DD/YYYY';
    if (!formData.email) tempErrors.email = 'Email Required field.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phoneNumber: formattedPhoneNumber });
    setErrors({ ...errors, phoneNumber: '' });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
        try {
            // Simulate sending data to the /register endpoint
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Simulate a successful response
            if (response.ok) {
                const data = await response.json();
                console.log(`Registration successful: ${data.message}`);
            } else {
                const errorData = await response.json();
                console.log(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.log('An unexpected error occurred.');
        }
    }
  };

  return (
    <Box sx={{display:'flex', flexDirection:{xs:'column',sm:"column",md:'row',lg:'row',xl:'row'},alignItems:'center',justifyContent:'center',width:'100%' ,height:'100vh'}}>
    <div class="bg-image">
    </div>
    <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center', fontFamily: 'sans serif', gap:'5%',padding:'24px',width:{xs:'100%',sm:'100%',md:'50%',lg:'50%',xl:'50%'},height:{xs:'50%',sm:'50%',md:'100%',lg:'100%',xl:'100%'} }}>
      <Box sx={{display:'flex',justifyContent:'space-between',width:'100%'}}>
        <div><a id="nav-logo" href="/"><img src="https://storage.googleapis.com/cdn.healthtrak.com/app/sha-28a0f13/public/img/sharecare/logo.svg"></img></a></div>
        <Button sx={{padding:'3px 5px',fontSize:'12px',color:'green',borderColor:"green"}} variant="outlined">How it Works</Button>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ maxWidth: '400px', width:'100%', display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px', alignItems: 'center', boxSizing: 'border-box' }}
        onSubmit={handleSubmit}
      >
        <Typography sx={{ color: '#006658', fontFamily:'Tiempos Headline Regular', fontWeight: 'bold', fontSize: '3rem' }} variant="h4" component="h1" gutterBottom>
          Sign up
        </Typography>
        <Card sx={{ border: '1px solid lightgrey' }}>     
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', borderBottom: errors.fullName ? '1px solid #EF4444' : '1px solid lightgrey', padding: '15px 10px' }}>
            <FeedOutlinedIcon />
            <Typography variant='h5'>Your Information</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', backgroundColor: errors.fullName ? '#fef2f2' : '#fff', borderBottom: errors.fullName ? '1px solid #EF4444' : '1px solid lightgrey' }}>
            <TextField
              name="fullName"
              variant='filled'
              placeholder='Full Name'
              sx={{
                border: 'none',
                boxSizing: 'border-box',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'inherit',
                  '&:before, &:after': {
                    borderBottom: 'none',
                  },
                },
              }}
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              label={errors.fullName}
              fullWidth
            />
            <EditOutlinedIcon sx={{ height: '25px', width: '25px', color: errors.fullName ? '#EF4444' : 'black' }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', backgroundColor: errors.address ? '#fef2f2' : '#fff', borderBottom: errors.address ? '1px solid #EF4444' : '1px solid lightgrey' }}>
            <TextField
              placeholder="Address"
              variant='filled'
              sx={{
                border: 'none',
                boxSizing: 'border-box',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'inherit',
                  '&:before, &:after': {
                    borderBottom: 'none',
                  },
                },
              }}
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              label={errors.address}
              fullWidth
            />
            <EditOutlinedIcon sx={{ height: '30px', width: '40px', color: errors.address ? '#EF4444' : 'black' }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: errors.city ? '1px solid #EF4444' : '1px solid lightgrey' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', borderRight: '1px solid lightgrey', backgroundColor: errors.city ? '#fef2f2' : '#fff' }}>
              <TextField
                placeholder="City"
                variant='filled'
                name="city"
                sx={{
                  border: 'none',
                  boxSizing: 'border-box',
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'inherit',
                    '&:before, &:after': {
                      borderBottom: 'none',
                    },
                  },
                }}
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                label={errors.city}
                fullWidth
              />
              <EditOutlinedIcon sx={{ height: '30px', width: '40px', color: errors.city ? '#EF4444' : 'black' }} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', backgroundColor: errors.state ? '#fef2f2' : '#fff' }}>
              <TextField
                placeholder='State'
                sx={{
                  border: 'none',
                  boxSizing: 'border-box',
                  '& .MuiFilledInput-root': {
                    backgroundColor: 'inherit',
                    '&:before, &:after': {
                      borderBottom: 'none',
                    },
                  },
                }}
                name="state"  
                variant='filled'
                value={formData.state}
                onChange={handleChange}
                error={!!errors.state}
                label={errors.state}
                fullWidth
              />
              <EditOutlinedIcon sx={{ height: '30px', width: '40px', color: errors.state ? '#EF4444' : 'black' }} />    
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', backgroundColor: errors.phoneNumber ? '#fef2f2' : '#fff', borderBottom: '1px solid lightgrey' }}>
            <TextField
              variant='filled'
              sx={{
                border: 'none',
                  type:"tel",
                boxSizing: 'border-box',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'inherit',
                  '&:before, &:after': {
                    borderBottom: 'none',
                  },
                },
              }}
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              error={!!errors.phoneNumber}
              label={errors.phoneNumber}
              fullWidth
            />
            <EditOutlinedIcon sx={{ height: '30px', width: '40px', color: errors.phoneNumber ? '#EF4444' : 'black' }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', backgroundColor: errors.dateOfBirth ? '#fef2f2' : '#fff', borderBottom: errors.dateOfBirth ? '1px solid #EF4444' : '1px solid lightgrey' }}>
            <TextField
              variant='filled'
              sx={{
                boxSizing: 'border-box',
                '& .MuiFilledInput-root': {
                  backgroundColor: 'inherit',
                  '&:before, &:after': {
                    borderBottom: 'none',
                  },
                },
              }}
              placeholder="Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              error={!!errors.dateOfBirth}
              label={errors.dateOfBirth}
              fullWidth
            />
            <EditOutlinedIcon sx={{ height: '30px', width: '40px', color: errors.dateOfBirth ? '#EF4444' : 'black' }} />
          </Box>
          <TextField
            variant='filled'
            sx={{
              boxSizing: 'border-box',
              '& .MuiFilledInput-root': {
                backgroundColor: errors.gender ? '#fef2f2' : '#fff',
                '&:before, &:after': {
                  borderBottom: 'none',
                },
              },
            }}
            select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            error={!!errors.gender}
            label={errors.gender}
            fullWidth
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Card>
        <TextField
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          label={errors.email}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, display: 'flex', gap: '10px', alignItems: 'center', padding: '13px', backgroundColor: "#2b364a" }}
        >
          <MailIcon />
          <Typography>Continue with email</Typography>
        </Button>
        <Box sx={{display:'flex',flexWrap:'wrap',alignItems:'start',gap:'2px'}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ color: 'grey',whiteSpace:'nowrap'}}>By Signing up, I agree to the &nbsp;</Typography>
          <Typography sx={{ color: '#00BFA5', width: '90px' }}><a href="https://www.sharecare.com/terms/terms" target="_blank">Offer Terms</a></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            I agree to the Offer Terms and understand I am creating a Sharecare account. I agree to the Sharecare Privacy Policy, Terms, and, if applicable to me, the Privacy Notice for California Residents. I consent to Sharecare’s processing of any health information I may provide, for the purposes listed in the Privacy Policy. I agree to receive emails, offers, alerts, and other notices. I understand that I can opt-out of marketing communications at any time.
          </Typography>
        </AccordionDetails>
      </Accordion>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default SignupForm;
