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
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
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
  const handleClick = (id) => {
    navigate(`/agroservices/${id}`);
  };

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
            <div onClick={() => handleClick(it._id)}>
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
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
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
