import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
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
import { Height } from '@mui/icons-material';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor:"#112e4ad1",
    height:"100%",
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    })
    
}));

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const menus = ['K-Dramas','K-Movies',"K-Actors","K-Actress","Upcomming K-Drama","Upcomming K-Movie"]

const showOff = [{"menu_name":"Kdramas","val":10},{"menu_name":"Movies","val":11},{"menu_name":"Actress","val":23},{"menu_name":"Actress","val":34},{"menu_name":"Directors","val":30},{"menu_name":"Writter","val":7}]

function DynContainerDivs() {
    return (
        <Box sx={{ width: '100%',
            justifyContent:"center",
            alignItems:"center",
            display:"flex"}}>
            <Grid
                container
                justifyContent="center"
                columnSpacing={{ xs: 1, sm: 2, md: 2,lg:2 }} columns={{ xs: 4, sm: 8, md: 12 }} 
            >

                    <Grid size={3}>
                        <Item>
                                <CardContent  >
                                   
                                <Typography sx={{fontFamily: "Gloria Hallelujah",
                                    fontWeight: "800 !important",
                                    fontStyle: "oblique !important",
                                    fontSize: "1.5vw !important"}} 
                                    color='white'
                                    variant="h3" component="div">
                                        Explore K-Drama World
                                    </Typography>
                                    <Box sx={{ width: '100%', maxWidth: 360 }}>
                                        <nav className="main_mailbox folders">
                                            <List>
                                                {menus.map((val,idx)=>{
                                                    return  <ListItem disablePadding >
                                                    <ListItemButton>
                                                    <ListItemIcon>
                                                        <NearMeIcon  />
                                                    </ListItemIcon >
                                                    <ListItemText primary={val} />
                                                    </ListItemButton>
                                                </ListItem>
                                                })}
                                           
                                        
                                            </List>
                                        </nav>
                                        </Box>
                                </CardContent>
                        </Item>
                    </Grid>

                    <Grid size={6}>
                        <Item>
                            <ImageSlider/>
                        </Item>
                    </Grid>
                    <Grid size={3}>
                    <Item>
                                <CardContent  >
                                   
                                <Typography sx={{fontFamily: "Gloria Hallelujah",
                                    fontWeight: "800 !important",
                                    fontStyle: "oblique !important",
                                    fontSize: "1.5vw !important"}} 
                                    color='white'
                                    variant="h3" component="div">
                                        Explore K-Drama World
                                    </Typography>
                                    <Box sx={{ width: '100%', maxWidth: 360 }}>
                                        <nav className="main_mailbox folders">
                                            <List>
                                                {showOff.map((val,idx)=>{
                                                    return  <ListItem disablePadding >
                                                    <ListItemButton>
                                                    <ListItemIcon>
                                                        <ArrowForwardIcon  />
                                                    </ListItemIcon >
                                                    <ListItemText primary={val['menu_name']} />
                                                    <ListItemText primary={val['val']} />
                                                    </ListItemButton>
                                                </ListItem>
                                                })}
                                           
                                        
                                            </List>
                                        </nav>
                                        </Box>
                                </CardContent>
                        </Item>
                    </Grid>
                </Grid>
        </Box>

    )
}

export default DynContainerDivs;