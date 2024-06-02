import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Card, CardContent, Grid, Avatar } from '@mui/material';

function App() {
    const [name, setName] = useState('');
    const [nextAppointment, setNextAppointment] = useState('');
    const [patientData, setPatients] = useState(null);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleNextAppointmentChange = (event) => {
        setNextAppointment(event.target.value);
    };

    const fetchPatients = async () => {
        try {
            const params = {};
            if (name) params.name = name;
            if (nextAppointment) params.next_appointment = `"${nextAppointment}"`;

            const response = await axios.get('http://localhost:5000/patients', { params });
            console.log('response', response.data.data);
            setPatients(response.data.data);
        } catch (error) {
            console.error("There was an error fetching the patients!", error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        fetchPatients();
    }, [name, nextAppointment]);

    return (
        <Container>
            <Typography variant="h3" component="div" gutterBottom>
                Doctor-Patient Connect Dashboard
            </Typography>
            <TextField
                label="Enter Patient Name"
                value={name}
                onChange={handleNameChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Enter Next Appointment (e.g., Wed, 29 May 2024 17:22:01 GMT)"
                type="text"
                value={nextAppointment}
                onChange={handleNextAppointmentChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={fetchPatients}>
                Fetch Patient Data
            </Button>
            {patientData && (
                <Grid container spacing={3} marginTop={3}>
                    {patientData.map((patient, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card>
                                <CardContent>
                                    <Avatar alt={patient.patient_name} src={patient.profile_picture || "/static/images/avatar/1.jpg"} />
                                    <Typography gutterBottom variant="h5" component="div">
                                        {patient.patient_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Next Appointment: {new Date(patient.next_appointment).toLocaleDateString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default App;
