import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Avatar } from '@mui/material';
import kdrama_bg from '../../images/kdrama_bg.jpg';
import { Link } from 'react-router-dom';

function DramaMovieInfo({
  directed_by_movies,
  directed_by_dramas,
  written_of_dramas,
  written_of_movies,
  cast_of_dramas,
  cast_of_movies,
}) {
  return (
    <Card sx={{ padding: 3, bgcolor: '#f4f4f4', boxShadow: 3 }}>

      {(directed_by_movies.length > 0 || directed_by_dramas.length > 0) && (
        <>
            <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Directed Movies & Drama
          </Typography>
       
        <Grid container spacing={3}>
          {directed_by_movies &&
            directed_by_movies.length > 0 &&
            directed_by_movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.movie_id}>
                <Box className="drama_movie_box">
               <Link to={`/kmovie/${movie.movie_id}`} className="drama_movie_links">
                  <Avatar
                    alt={movie.movie.movie_name}
                    src={movie.movie.image_url || kdrama_bg}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Typography variant="body1" sx={{ color: '#555' }}>
                    {movie.movie.movie_name}
                  </Typography>
                  </Link>
                </Box>
              </Grid>
            ))}

          {directed_by_dramas &&
            directed_by_dramas.length > 0 &&
            directed_by_dramas.map((drama) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={drama.drama_id}>
                <Box className="drama_movie_box">
                <Link to={`/kdrama/${drama.drama_id}`} className="drama_movie_links">

                  <Avatar
                    alt={drama.drama?.drama_name}
                    src={drama.drama?.image_url || kdrama_bg}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Typography variant="body1" sx={{ color: '#555' }}>
                    {drama.drama?.drama_name}
                  </Typography>
                  </Link>
                </Box>
              </Grid>
            ))}
        </Grid>
        </>
      )}

      {(written_of_dramas || written_of_movies) && (
        <>
          <Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            Written Movies & Drama
          </Typography>

          <Grid container spacing={3}>
            {written_of_movies &&
              written_of_movies.length > 0 &&
              written_of_movies.map((writer) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={writer.movie_id}>
                  <Box className="drama_movie_box">
                  <Link to={`/kmovie/${writer.movie_id}`} className="drama_movie_links">

                    <Avatar
                      alt={writer.movie.movie_name}
                      src={writer.movie.image_url || kdrama_bg}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Typography variant="body1" sx={{ color: '#555' }}>
                      {writer.movie.movie_name}
                    </Typography>
                    </Link>
                  </Box>
                </Grid>
              ))}

            {written_of_dramas &&
              written_of_dramas.length > 0 &&
              written_of_dramas.map((writer) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={writer.drama_id}>
                  <Box className="drama_movie_box">
                  <Link to={`/kdrama/${writer.drama_id}`} className="drama_movie_links">
                    <Avatar
                      alt={writer.drama?.drama_name}
                      src={writer.drama?.image_url || kdrama_bg}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Typography variant="body1" sx={{ color: '#555' }}>
                      {writer.drama?.drama_name}
                    </Typography>
                    </Link>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </>
      )}

      {cast_of_movies && cast_of_movies.length > 0 && (
        <>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', mt: 3, mb: 2 }}>
            Cast in Movies
          </Typography>

          <Grid container spacing={3} sx={{justifyContent:'space-around'}}>
            {cast_of_movies.map((cast) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={cast._id}>
                <Box >
                <Link to={`/kmovie/${cast.movie_id}`} className="drama_movie_links">
                  <Avatar
                    alt={cast.movie_id}
                    src={cast.movie.image_url || kdrama_bg}
                    sx={{ width: 80, height: 80, margin: '0 auto' }}
                  />
                  <Typography variant="h5" sx={{ color: '#555', mt: 1 }}>
                    {cast.movie.movie_name}
                  </Typography>
                  </Link>
                  {cast.movie?.name_in_movie?.cast_name_in_drama && (cast.movie?.name_in_drama?.cast_name_in_drama.search("Pics") == -1 && cast.movie?.name_in_drama?.cast_name_in_drama.search("Credits") == -1) && (
                    <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                      {`As ${cast.movie?.name_in_movie?.cast_name_in_drama}`}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {cast_of_dramas && cast_of_dramas.length > 0 && (
        <>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#333', mt: 3, mb: 2 }}>
            Cast in Drama
          </Typography>

          <Grid container spacing={3}  sx={{justifyContent:'space-around'}}>
            {cast_of_dramas.map((cast) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={cast._id}>
                <Box sx={{ textAlign: 'center' }} >
                <Link to={`/kdrama/${cast.drama_id}`} className="drama_movie_links">
                  <Avatar
                    alt={cast.drama_id}
                    src={cast.drama.image_url || kdrama_bg}
                    sx={{ width: 80, height: 80, margin: '0 auto' }}
                  />
                  </Link>
                  <Typography variant="h5" sx={{ color: '#555', mt: 1 }}>
                    {cast.drama.drama_name}
                  </Typography>
                  {cast.drama?.name_in_drama?.cast_name_in_drama && (cast.drama?.name_in_drama?.cast_name_in_drama.search("Pics") == -1 && cast.drama?.name_in_drama?.cast_name_in_drama.search("Credits") == -1) && (
                    <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                      {`As ${cast.drama?.name_in_drama?.cast_name_in_drama}`}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Card>
  );
}

export default DramaMovieInfo;
