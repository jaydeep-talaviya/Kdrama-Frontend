import React, { useEffect, useState, useRef } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CommonLayout from './CommonLayout';
import CarouselImage from './commonComps/CarouselImage';
import MainDetails from './commonComps/MainDetails';
import { Grid, Container } from '@mui/material';
import CastInfo from './commonComps/CastInfo';

function SingleKdrama() {
  const contentRef = useRef(); // Ref for the MainContent
  const [headerHeight, setHeaderHeight] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));  // Detect small screen
  const [leftOpen, setLeftOpen] = useState(false);


  const data =  {
    _id: "66d301b67f209f1175907651",
    drama_name: "100 Days My Prince",
    image_url: "https://photos.hancinema.net/photos/photo996064.jpg",
    other_names: ["백일의 낭군님 ", " baek-il-eui nang-gun-nim"],
    drama_link: "https://www.hancinema.net/korean_drama_100_Days_My_Prince.php",
    tv_channel_id: "66c8ac5bd0371da8d2ed96db",
    airing_dates_start: "2018/09/10",
    airing_dates_end: "2018/10/30",
    last_paragraph: "<p><strong>Link</strong></p><p>16 episodes - Mon, Tue 21:30<br/>\nFormerly known as \"Dear Husband of 100 Days\"<br/>\n<strong>Synopsis</strong><br/>\nA prince is the victim of an attempted assassination. He falls off a cliff and subsequently wanders for 100 days under a new name and personality. During that time he meets the head of a prominent detective agency.</p>",
    tv_channel: "tvN (tvN)",
    extra_info: {
      genres: ["Drama", "Historical", "Romance"],
      directed_bys: [
        {
          _id: "66d2f21cab29054fd019b83b",
          name: "Lee Jong-jae (이종재)",
          gender: "Male",
          image: "https://photos.hancinema.net/photos/photo1037112.jpg"
        }
      ],
      written_bys: [
        {
          _id: "66d2f253ab29054fd019bbaa",
          name: "No Ji-seol (노지설)",
          gender: "Male",
          image: ""
        }
      ],
      images: [
        "https://photos.hancinema.net/photos/photo1013857.jpg",
        "https://photos.hancinema.net/photos/photo1013856.jpg",
        "https://photos.hancinema.net/photos/photo1013855.jpg"
      ],
      casts_info: [
        {
          _id: "66cfd0a4c6455ce91d4857a7",
          name: "Cho Seong-ha (조성하)",
          image: "https://photos.hancinema.net/photos/photo1530707.jpg"
        },
        {
          _id: "66cfd0a4c6455ce91d4857a7",
          name: "Cho Seong-ha (조성하)",
          image: "https://photos.hancinema.net/photos/photo1530707.jpg"
        },
        {
          _id: "66cfd0a4c6455ce91d4857a7",
          name: "Cho Seong-ha (조성하)",
          image: "https://photos.hancinema.net/photos/photo1530707.jpg"
        },
        {
          _id: "66cfd0a4c6455ce91d4857a7",
          name: "Cho Seong-ha (조성하)",
          image: "https://photos.hancinema.net/photos/photo1530707.jpg"
        },
        {
          _id: "66cfd0a4c6455ce91d4857a7",
          name: "Cho Seong-ha (조성하)",
          image: "https://photos.hancinema.net/photos/photo1530707.jpg"
        },
        
        {
          _id: "66cfd212c6455ce91d4861e3",
          name: "Jo Han-chul (조한철)",
          image: "https://photos.hancinema.net/photos/photo1665245.jpg"
        },
      ]
    }
  }

  return (
    <CommonLayout
      contentRef={contentRef}
      leftOpen={leftOpen}
      isSmallScreen={true} 
      setHeaderHeight={setHeaderHeight}
      headerHeight={headerHeight}
      SinglePage={true}
    >
      <Grid container spacing={4} sx={{display:"flex",justifyContent:"center"}}>
        <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <CarouselImage images = {data.extra_info.images} title={data.drama_name}/>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <MainDetails
           data={{title:data.drama_name,
            genres:data.extra_info.genres,
            image_url:data.image_url,
            other_names:data.other_names,
            tv_channel:data.tv_channel,
            airing_dates_start:data.airing_dates_start,
            airing_dates_end:data.airing_dates_end,
            last_paragraph:data.last_paragraph
            }}/>
        </Grid>
      </Grid>
      <CastInfo directed_bys={data.extra_info.directed_bys} written_bys={data.extra_info.written_bys} casts_info={data.extra_info.casts_info} />
    </CommonLayout>
  );
}

export default SingleKdrama;
