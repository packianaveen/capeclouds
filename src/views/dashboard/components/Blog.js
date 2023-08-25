import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from 'src/constant';
import { Box } from '@mui/material';
const AdSlide = () => {
  const [adSlide, setAdslide] = useState([]);
  const [trand, settrend] = useState([]);
  const [newad, setNewad] = useState([]);
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
  const images = [
    'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  ];
  return (
    <>
      <Slide autoplay>
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
          {newad.map((it) => (
            <div className="each-slide-effect" style={{ height: '500px' }}>
              <div style={{ backgroundImage: `${url}/Images/` + it.photo }}>
                {' '}
                <img height="auto" width="100%" src={`${url}/Images/` + it.photo} />
              </div>
            </div>
          ))}
        </Slide>
      </Box>
    </>
  );
};

export default AdSlide;
