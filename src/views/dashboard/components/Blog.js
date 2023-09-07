import 'react-slideshow-image/dist/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from 'src/constant';
import { Box } from '@mui/material';
import { Navigate, useNavigate } from 'react-router';
import { Carousel } from '3d-react-carousal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
const AdSlide = () => {
  const [adSlide, setAdslide] = useState([]);
  const [trand, settrend] = useState([]);
  const [newad, setNewad] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${url}/api/getbottomAd`).then((response) => {
      if (response.data.length > 0) {
        setAdslide(response.data);
        console.log(response.data);
      }
    });
    axios.get(`${url}/api/gettrendAd`).then((response) => {
      if (response.data.length > 0) {
        settrend(response.data);
        console.log(response.data);
      }
    });
    axios.get(`${url}/api/getAd`).then((response) => {
      if (response.data.length > 0) {
        setNewad(response.data);
        console.log(response.data);
      }
    });
  }, []);
  const handleClick = () => {
    navigate('/userservice/64f415b6a938a764b90770dd', { replace: true });
  };
  let slides = [
    <img src="https://picsum.photos/800/300/?random" alt="1" height="300px" width="100%" />,
    <img src="https://picsum.photos/800/301/?random" alt="2" height="300px" width="100%" />,
    <img src="https://picsum.photos/800/302/?random" alt="3" height="300px" width="100%" />,
    <img src="https://picsum.photos/800/303/?random" alt="4" height="300px" width="100%" />,
    <img src="https://picsum.photos/800/304/?random" alt="5" height="300px" width="100%" />,
  ];

  return (
    <>
      {/* <Slide autoplay>
        {adSlide.map((it) => (
          <div className="each-slide-effect">
            <div style={{ backgroundImage: `${url}/Images/` + it.photo }}>
              {' '}
              <img height="auto" width="100%" src={`${url}/Images/` + it.photo} />
            </div>
          </div>
        ))}
      </Slide>
      <Box mt={2}>
        <Slide autoplay>
          {trand.map((it) => (
            <div className="each-slide-effect" style={{ height: '500px' }}>
              <div style={{ backgroundImage: `${url}/Images/` + it.photo }}>
                {' '}
                <img height="auto" width="100%" src={`${url}/Images/` + it.photo} />
              </div>
            </div>
          ))}
        </Slide>
      </Box>
      <Box mt={2}>
        <Slide autoplay>
           {trand.map((it) => (
            <div className="each-slide-effect" style={{ height: '500px' }}>
              <div style={{ backgroundImage: `${url}/Images/` + it.photo }}>
                {' '}
                <img height="auto" width="100%" src={`${url}/Images/` + it.photo} />
              </div>
            </div>
          ))}
        </Slide>
      </Box> */}

      <Box mt={2}>
        {newad.map((it) => (
          <div>
            <div onClick={handleClick}>
              {' '}
              <img
                height="auto"
                width="100%"
                src={`${url}/Images/` + it.photo}
                style={{ borderRadius: '15px' }}
              />
            </div>
          </div>
        ))}
      </Box>
      <Box mt={2}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          // className="mySwiper"
        >
          {trand.map((it) => (
            <SwiperSlide>
              <img height="200px" width="100%" src={`${url}/Images/` + it.photo} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* <Box>
        <Carousel interval="500" autoPlay>
          {trand.map((it) => (
            <div>
              <img height="auto" width="100%" src={`${url}/Images/` + it.photo} />
              <p className="legend">Legend 1</p>
            </div>
          ))}
        </Carousel>
      </Box> */}
    </>
  );
};

export default AdSlide;
