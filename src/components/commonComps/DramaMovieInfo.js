import React from 'react'
import { Card, CardContent, Typography, Box, Grid, Avatar } from '@mui/material';
import kdrama_bg from '../../images/kdrama_bg.jpg';

function DramaMovieInfo({directed_by_movies,directed_by_dramas,written_of_dramas,written_of_movies,cast_of_dramas,cast_of_movies}) {
    console.log(directed_by_movies,directed_by_dramas)
    console.log(written_of_dramas,written_of_movies)
    console.log(cast_of_dramas,cast_of_movies)
  
    return (
    <Card sx={{ padding: 3, bgcolor: '#f4f4f4', boxShadow: 3 }}>
      <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Directed Movies & Drama
      </Typography>
      
      {(directed_by_movies || directed_by_dramas) &&
      <Grid container spacing={2}>
          {directed_by_movies && directed_by_movies.length> 0 &&

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', mt: 2 }}>
            Directed Movies
          </Typography>
          <Box>
            {directed_by_movies.map((director) => (
              <Box key={director.movie_id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt={director.movie.movie_name}
                  src={director.movie.image_url || kdrama_bg}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Typography variant="body1" sx={{ color: '#555' }}>
                  {director.movie_name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      }
      {directed_by_dramas && directed_by_dramas.length> 0 &&
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', mt: 2 }}>
            Direced K-drama
          </Typography>
          <Box>
            {directed_by_dramas.map((writer) => (
              <Box key={directed_by_dramas.drama_id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt={directed_by_dramas.drama.drama_name}
                  src={directed_by_dramas.drama.image_url || kdrama_bg}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Typography variant="body1" sx={{ color: '#555' }}>
                  {directed_by_dramas.drama.drama_name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        }
      </Grid>
      }

    {(written_of_dramas || written_of_movies) &&
        <>
        <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Written Movies & Drama
      </Typography>
        
      <Grid container spacing={2}>
          {written_of_movies && written_of_movies.length> 0 &&

        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', mt: 2 }}>
            Written Movies
          </Typography>
          <Box>
            {written_of_movies.map((writter) => (
              <Box key={writter.movie_id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt={writter.movie.movie_name}
                  src={writter.movie.image_url || kdrama_bg}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Typography variant="body1" sx={{ color: '#555' }}>
                  {writter.movie_name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      }
      {written_of_dramas && written_of_dramas.length> 0 &&
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', mt: 2 }}>
            Written K-Drama
          </Typography>
          <Box>
            {written_of_dramas.map((writer) => (
              <Box key={written_of_dramas.drama_id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt={written_of_dramas.drama.drama_name}
                  src={written_of_dramas.drama.image_url || kdrama_bg}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Typography variant="body1" sx={{ color: '#555' }}>
                  {written_of_dramas.drama.drama_name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        }
      </Grid>
      </>
      }

    {cast_of_movies && cast_of_movies.length > 0 &&
      <>      
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', mt: 3, mb: 2 }}>
        Cast in Movies
      </Typography>
        
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        {cast_of_movies.map((cast) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={cast._id} sx={{ textAlign: 'center' }}>
            <Avatar
              alt={cast.movie_id}
              src={cast.movie.image_url || kdrama_bg}
              sx={{ width: 80, height: 80, margin: '0 auto' }}
            />
            <Typography variant="h5" sx={{ color: '#555', mt: 1 }}>
              {cast.movie.movie_name}
            </Typography>
            {cast.movie?.name_in_movie?.cast_name_in_drama.length > 1 && cast.drama?.name_in_movie?.cast_name_in_drama !== " ( 📰 News 🎥 Credits 📷 Pics )" &&
            <Typography variant="p" sx={{ color: '#555', mt: 1 }}>
            {` As ${cast.movie?.name_in_movie?.cast_name_in_drama}`}
            </Typography>
                }


          </Grid>
        ))}
      </Grid>
    
      </>
      }
      {cast_of_dramas && cast_of_dramas.length > 0 &&
      <>      
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', mt: 3, mb: 2 }}>
        Cast in Drama
      </Typography>

      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        {cast_of_dramas.map((cast) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={cast._id} sx={{ textAlign: 'center' }}>
            <Avatar
              alt={cast.drama_id}
              src={cast.drama.image_url || kdrama_bg}
              sx={{ width: 80, height: 80, margin: '0 auto' }}
            />
         
            <Typography variant="h5" sx={{ color: '#555', mt: 1 }}>
              {cast.drama.drama_name}
            </Typography>
            {cast.drama?.name_in_drama?.cast_name_in_drama.length > 1 && cast.drama?.name_in_drama?.cast_name_in_drama !== " ( 📰 News 🎥 Credits 📷 Pics )" &&
            <Typography variant="p" sx={{ color: '#555', mt: 1 }}>
            {` As ${cast.drama?.name_in_drama?.cast_name_in_drama}`}
            </Typography>
                }


          </Grid>
        ))}
      </Grid>
      </>
      }
          </Card>
  )
}

export default DramaMovieInfo