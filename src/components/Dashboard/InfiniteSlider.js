import React from 'react'
import './InfiniteSlider.css';


const data = {"drama":["https://photos.hancinema.net/photos/photo1120570.jpg","https://photos.hancinema.net/photos/photo825899.jpg","https://photos.hancinema.net/photos/photo941389.jpg","https://photos.hancinema.net/photos/photo1251091.jpg","https://photos.hancinema.net/photos/photo1827023.jpg","https://photos.hancinema.net/photos/photo971704.jpg","https://photos.hancinema.net/photos/photo1229257.jpg","https://photos.hancinema.net/photos/photo1073383.jpg","https://photos.hancinema.net/photos/photo1474124.jpg","https://photos.hancinema.net/photos/photo1010192.jpg","https://photos.hancinema.net/photos/photo1253315.jpg","https://photos.hancinema.net/photos/photo1623698.jpg","https://photos.hancinema.net/photos/photo970164.jpg","https://photos.hancinema.net/photos/photo1831830.jpg","https://photos.hancinema.net/photos/photo1260406.jpg","https://photos.hancinema.net/photos/photo1199331.jpg","https://photos.hancinema.net/photos/photo1600043.jpg","https://photos.hancinema.net/photos/photo1229385.jpg","https://photos.hancinema.net/photos/photo914232.jpg","https://photos.hancinema.net/photos/photo1440413.jpg"],"movie":["https://photos.hancinema.net/photos/photo1269752.jpg","https://photos.hancinema.net/photos/photo1815078.jpg","https://photos.hancinema.net/photos/photo1156332.jpg","https://photos.hancinema.net/photos/photo1817813.jpg","https://photos.hancinema.net/photos/photo1227251.jpg","https://photos.hancinema.net/photos/photo1791553.jpg","https://photos.hancinema.net/photos/photo855931.jpg","https://photos.hancinema.net/photos/photo990045.jpg","https://photos.hancinema.net/photos/photo926935.jpg","https://photos.hancinema.net/photos/photo904387.jpg","https://photos.hancinema.net/photos/photo1498758.jpg","https://photos.hancinema.net/photos/photo1863395.jpg","https://photos.hancinema.net/photos/photo979098.jpg","https://photos.hancinema.net/photos/photo1488621.jpg","https://photos.hancinema.net/photos/photo1733456.jpg","https://photos.hancinema.net/photos/photo1029590.jpg","https://photos.hancinema.net/photos/photo1721746.jpg","https://photos.hancinema.net/photos/photo1214350.jpg","https://photos.hancinema.net/photos/photo961296.jpg","https://photos.hancinema.net/photos/photo1692760.jpg"]}

function InfiniteSlider() {
    return (
        <div class="slider">
            <div class="slide-track">
                {data['drama'].map((val,idx)=>{
                   return <div class="slide">
                        <img src={val}  width="250" height="100%" alt="" />
                    </div>
                })}
                {data['movie'].map((val,idx)=>{
                    return <div class="slide">
                        <img src={val} height="100%" width="250" alt="" />
                    </div>
                })}

            </div>
        </div>
    )
}

export default InfiniteSlider