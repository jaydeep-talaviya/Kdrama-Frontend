import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Avatar } from '@mui/material';

const CastInfo = ({ directed_bys, written_bys, casts_info }) => {
  return (
    <Card sx={{ padding: 3, bgcolor: '#f4f4f4', boxShadow: 3 }}>
      <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Crew & Cast
      </Typography>
      
      <Grid container spacing={2}>
        {/* Directed By Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', mt: 2 }}>
            Directed By
          </Typography>
          <Box>
            {directed_bys.map((director) => (
              <Box key={director._id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt={director.name}
                  src={director.image || "https://via.placeholder.com/150"}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Typography variant="body1" sx={{ color: '#555' }}>
                  {director.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Written By Section */}
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', mt: 2 }}>
            Written By
          </Typography>
          <Box>
            {written_bys.map((writer) => (
              <Box key={writer._id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt={writer.name}
                  src={writer.image || "https://via.placeholder.com/150"}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Typography variant="body1" sx={{ color: '#555' }}>
                  {writer.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', mt: 3, mb: 2 }}>
        Cast
      </Typography>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        {casts_info.map((cast) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={cast._id} sx={{ textAlign: 'center' }}>
            <Avatar
              alt={cast.name}
              src={cast.image || 'https://via.placeholder.com/150'}
              sx={{ width: 80, height: 80, margin: '0 auto' }}
            />
            <Typography variant="body1" sx={{ color: '#555', mt: 1 }}>
              {cast.name} ({cast.native_name})
            </Typography>
          </Grid>
        ))}
      </Grid>
          </Card>
  );
};

export default CastInfo;
