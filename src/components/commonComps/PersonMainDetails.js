import React from 'react'
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

function PersonMainDetails({data}) {

const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
const isValidDate = (date) => {
  return dateRegex.test(date);
};

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
          {data.name}
        </Typography>
        
        {data.other_names && data.other_names !== 'None'&&
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ textAlign: 'left' }}  // Left-align the content
        >
          Other Names: {data.other_names}
        </Typography>
            }
        {data.jobs &&
         <Typography
          variant="body1"
          color="text.primary"
          sx={{ textAlign: 'left' }}  // Left-align the content
        >
          Jobs: {data.jobs.join(",")}
        </Typography>}
        {data.gender &&
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ textAlign: 'left' }}  // Left-align the content
        >
          Gender: {data.gender}
        </Typography>
      }
        {data.birth_of_date && isValidDate(data.birth_of_date) &&
        <Typography
          variant="body1"
          color="text.primary"
          sx={{  textAlign: 'left' }}  // Left-align the content
        >
          Birth:
          <Box component="body1" sx={{ fontWeight: 'bold', ml: 1 }}>
            {data.birth_of_date }
          </Box>
        </Typography>
        }

      </CardContent>
    </Grid>
  </Card>
  )
}

export default PersonMainDetails