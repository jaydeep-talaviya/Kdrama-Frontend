import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ImageSlider from './ImageSlider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NearMeIcon from '@mui/icons-material/NearMe';
import './DynContainerDivs.css';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: "#112e4ad1",
    height: "90%",
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    })
}));

// const menus = ['K-Dramas', 'K-Movies', "K-Actors", "K-Actress", "Upcoming K-Drama", "Upcoming K-Movie"];
const menus = [{route_name:"K-Dramas",route:"/kdrama"},
    {route_name:"K-Movies",route:"/kmovie"},
]
const showOff = [
    { "menu_name": "Kdramas", "val": 10 },
    { "menu_name": "Movies", "val": 11 },
    { "menu_name": "Actress", "val": 23 },
    { "menu_name": "Actress", "val": 34 },
    { "menu_name": "Directors", "val": 30 },
    { "menu_name": "Writers", "val": 7 }
];

function DynContainerDivs() {
    return (
        <Box sx={{ width: '100%', justifyContent: "center", alignItems: "center", display: "flex" }}>
            <Grid
                container
                justifyContent="center"
                columnSpacing={{ xs: 2,sm:1, lg: 1 }}
                columns={{ xs: 4, sm: 12 }}
                rowSpacing={1} /* Added row spacing */
            >
                <Grid size={3}>
                    <Item sx={{ padding: 1, minHeight: "200px" }}> {/* Reduced padding */}
                        <CardContent sx={{ paddingBottom: '4px',overflowY:"auto",height:"90%" }}> {/* Reduced padding */}
                            <Typography sx={{
                                fontFamily: "Gloria Hallelujah",
                                fontWeight: 700,
                                fontSize: "1.2rem",  /* Reduced font size */
                                lineHeight: 1.2,    /* Adjusted line height */
                                mb: 1  /* Added margin-bottom for space */
                            }} color='white' variant="h5" component="div">
                                Explore K-Drama World
                            </Typography>
                            <Box sx={{ width: '100%', maxWidth: 360 }}>
                                <nav className="main_mailbox folders">
                                    <List>
                                        {menus.map((val, idx) => (
                                            <ListItem disablePadding key={idx}>
                                                <ListItemButton  component={Link}       // Use Link component to enable navigation
                                                    to={val.route}         // Specify the path you want to navigate to
                                                    sx={{ padding: '4px 3px' }}> {/* Reduced padding */}
                                                    <ListItemIcon>
                                                        <NearMeIcon fontSize="small" /> {/* Adjust icon size */}
                                                    </ListItemIcon>
                                                    <ListItemText primary={val.route_name} sx={{ fontSize: '0.9rem' }} /> {/* Adjusted text size */}
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </nav>
                            </Box>
                        </CardContent>
                    </Item>
                </Grid>

                <Grid size={6}>
                    <Item sx={{ padding: 1, minHeight: "200px" }}> {/* Reduced padding */}
                        <ImageSlider />
                    </Item>
                </Grid>

                <Grid size={3}>
                    <Item sx={{ padding: 1, minHeight: "200px" }}> {/* Reduced padding */}
                        <CardContent sx={{ paddingBottom: '4px',overflowY:"auto",height:"90%" }}> {/* Reduced padding */}
                            <Typography sx={{
                                fontFamily: "Gloria Hallelujah",
                                fontWeight: 700,
                                fontSize: "1.2rem",  /* Reduced font size */
                                lineHeight: 1.1,    /* Adjusted line height */
                                mb: 1  /* Added margin-bottom for space */
                            }} color='white' variant="h5" component="div">
                                Explore K-Drama World
                            </Typography>
                            <Box sx={{ width: '100%', maxWidth: 360 }}>
                                <nav className="main_mailbox folders">
                                    <List>
                                        {showOff.map((val, idx) => (
                                            <ListItem disablePadding key={idx}>
                                                <ListItemButton sx={{ padding: '4px 3px' }}> {/* Reduced padding */}
                                                    <ListItemIcon>
                                                        <ArrowForwardIcon fontSize="small" /> {/* Adjust icon size */}
                                                    </ListItemIcon>
                                                    <ListItemText primary={val['menu_name']} sx={{ fontSize: '0.9rem' }} /> {/* Adjusted text size */}
                                                    <ListItemText primary={val['val']} sx={{ fontSize: '0.9rem' }} /> {/* Adjusted text size */}
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </nav>
                            </Box>
                        </CardContent>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DynContainerDivs;
