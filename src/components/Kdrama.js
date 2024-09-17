import React from 'react'
import Main from './MainLayout'
import MainContent from './commonComps/MainContent'

function Kdrama() {

    const all_genres = [
        {
            "_id": "66c8a9b65b264c573545798f",
            "genre_name": "Action"
        },
        {
            "_id": "66c8a9b65b264c5735457990",
            "genre_name": "Adventure"
        },
        {
            "_id": "66c8a9b65b264c5735457991",
            "genre_name": "Aging"
        },
        {
            "_id": "66c8a9b65b264c5735457992",
            "genre_name": "Animation"
        },
        {
            "_id": "66c8a9b65b264c5735457993",
            "genre_name": "Anthology"
        },
        {
            "_id": "66c8a9b65b264c5735457994",
            "genre_name": "Audio Movie"
        },
        {
            "_id": "66c8a9b65b264c5735457996",
            "genre_name": "BL - Boys' Love"
        },
        {
            "_id": "66c8a9b65b264c5735457995",
            "genre_name": "Biography"
        },
        {
            "_id": "66c8a9b65b264c5735457997",
            "genre_name": "Black comedy"
        },
        {
            "_id": "66c8a9b65b264c5735457998",
            "genre_name": "Business"
        }
    ]
    const all_tv_channels = [
        {
          "_id": "66c8ac58d0371da8d2ed9595",
          "tv_channel": "21st Century Media ((주)이십일세기미디어)",
          "tv_channel_link": "https://www.hancinema.net/korean_company_128_21st_Century_Media.html"
        },
        {
          "_id": "66c8ac58d0371da8d2ed9597",
          "tv_channel": "A1 Media (에이원 미디어)",
          "tv_channel_link": "https://www.hancinema.net/korean_company_176_A1_Media.html"
        },
        {
          "_id": "66c8ac58d0371da8d2ed9599",
          "tv_channel": "Apple TV+ (Apple TV+)",
          "tv_channel_link": "https://www.hancinema.net/korean_company_100_Apple_TV_plus_.html"
        },
        {
          "_id": "66c8ac58d0371da8d2ed959f",
          "tv_channel": "BBANGYA TV (빵야TV)",
          "tv_channel_link": "https://www.hancinema.net/korean_company_103_BBANGYA_TV.html"
        }]


    const left_props = {genres:all_genres,tv_channels:all_tv_channels}

    const right_props = {type:'kdrama'}

    return (
        <>
            <Main child={<MainContent />} left_props={left_props} right_props={right_props} isVisible={true} />
        </>
    )
}

export default Kdrama