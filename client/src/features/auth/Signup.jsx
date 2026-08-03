import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Import icon
import { useAuth } from "../../hooks/useAuth";

export const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signup(name, email, password);
            navigate("/home");
        } catch (error) {
            console.error("Error signing up:", error);
            if (error.response && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("An error occurred. Please try again.");
            }
        }
    };

    return (
        <Box
            sx={{
                backgroundImage: `url('/photos/signup.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    maxWidth: 400,
                    width: '90%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#fff',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    Sign Up
                </Typography>
                <form onSubmit={handleSignUp}>
                    <TextField
                        label="Name"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.8)' },
                            },
                        }}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.8)' },
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.8)' },
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        startIcon={<PersonAddIcon />} // Add icon
                        sx={{
                            mt: 2,
                            backgroundColor: 'rgba(0, 123, 255, 0.2)',
                            color: '#fff',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            borderRadius: '8px',
                            backdropFilter: 'blur(5px)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 123, 255, 0.4)',
                            },
                        }}
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};
