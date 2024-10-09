import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

function MainDetails({ data }) {
  console.log("<<<<<<<data",data)
  return (
    <Card
      sx={{
        display: 'flex',
        borderRadius: 2,
        boxShadow: 5,
        bgcolor: '#f4f4f4',
        height: "400px",
      }}
    >
      <Grid item xs={12}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',  // Make content fill the available height
            justifyContent: 'space-between',  // Add spacing between sections
          }}
        >
          {/* Title (centered) */}
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#333',
              textAlign: 'center',  // Center the title
            }}
          >
            {data.title}
          </Typography>

          {/* Other details (left-aligned) */}
          <Typography
            variant="subtitle1"
            color="text.secondary"
            gutterBottom
            sx={{ textAlign: 'left' }}  // Left-align the content
          >
            Other Names: {data.other_names.join(', ')}
          </Typography>
          {data.genres &&
           <Typography
            variant="body1"
            color="text.primary"
            sx={{ textAlign: 'left' }}  // Left-align the content
          >
            Genres: {data.genres.join(",")}
          </Typography>}
          {data.tv_channel &&
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ textAlign: 'left' }}  // Left-align the content
          >
            TV Channel: {data.tv_channel}
          </Typography>
        }
          {data.airing_dates_start && data.airing_dates_end &&
          <Typography
            variant="body1"
            color="text.primary"
            sx={{  textAlign: 'left' }}  // Left-align the content
          >
            Airing Dates:
            <Box component="body1" sx={{ fontWeight: 'bold', ml: 1 }}>
              {data.airing_dates_start} - {data.airing_dates_end}
            </Box>
          </Typography>
          }

          {/* Description with scrollbar and fixed height */}
          <Box
            sx={{
              mt: 2,
              maxHeight: '50%',  // Occupy up to 50% of the card height for the description
              overflowY: 'auto',  // Enable vertical scrollbar if content overflows
              padding: 2,  // Add padding for a cleaner look
              border: '1px solid #ddd',  // Optional: add border for better separation
              borderRadius: '4px',
              backgroundColor: '#fff',  // Background color to highlight the text box
              flexGrow: 1,  // Allow the box to grow and fill the remaining space
            }}
            dangerouslySetInnerHTML={{ __html: data.last_paragraph }}
          />
        </CardContent>
      </Grid>
    </Card>
  );
}

export default MainDetails;
