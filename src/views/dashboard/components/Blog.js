import 'react-slideshow-image/dist/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from 'src/constant';
import { Box, Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router';
import { Carousel } from '3d-react-carousal';
import Modal from '@mui/material/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Swal from 'sweetalert2';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import Catogery from '../Catogery';
const AdSlide = () => {
  const [adSlide, setAdslide] = useState([]);
  const [trand, settrend] = useState([]);
  const [trand1, settrend1] = useState([]);
  const [newad, setNewad] = useState([]);
  const [open, setOpen] = useState(false);
  const [service, setService] = useState('');
  const [catogery, setCatogery] = useState('');
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
    axios.get(`${url}/api/gettrendAd1`).then((response) => {
      if (response.data.length > 0) {
        settrend1(response.data);
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
  const trendReq = (x) => {
    console.log(trand[x]);
    setService(JSON.parse(trand[x].service));
    setCatogery(JSON.parse(trand[x].catogery));
    setOpen(true);
  };
  const trendReq1 = (x) => {
    console.log(trand[x]);
    setService(JSON.parse(trand1[x].service));
    setCatogery(JSON.parse(trand1[x].catogery));
    setOpen(true);
  };
  const handleClick = (id) => {
    navigate(`/agroservices/${id}`);
  };
  const showAlert = () => {
    Swal.fire({
      title: 'Service Requested Sucessfully',
      text: 'GET A CALL FROM US SHORTLY',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };
  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid',
    boxShadow: 24,
    p: 4,
  };
  const createRequest = (e) => {
    axios
      .post(`${url}/api/createRequest`, {
        data: JSON.stringify(catogery),
        service: JSON.stringify(service),
        user: localStorage.getItem('user'),
        type: '1',
      })
      .then((response) => {
        console.log(response);
        setOpen(false);
        showAlert();
      })
      .catch((error) => {
        console.log(error);
      });
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
          {trand.map((it, x) => (
            <SwiperSlide>
              <img
                height="200px"
                width="100%"
                src={`${url}/Images/` + it.photo}
                onClick={() => trendReq(x)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
          {trand1.map((it, x) => (
            <SwiperSlide>
              <img
                height="200px"
                width="100%"
                src={`${url}/Images/` + it.photo}
                onClick={() => trendReq1(x)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={style} component="form" encType="multipart/form-data">
            <Box mb={2} style={{ fontWeight: 'bold' }}>
              Service Request
            </Box>
            <Box>
              <CustomTextField
                style={{ marginTop: '10px' }}
                id="otp"
                label="Catagoery"
                value={service.name}
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box>
              <CustomTextField
                style={{ marginTop: '10px' }}
                id="otp"
                label="Service"
                // onChange={(e) => {
                //   setPin(e.target.value);
                // }}
                value={catogery.name}
                variant="outlined"
                fullWidth
              />
            </Box>

            <Box
              style={{
                margin: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button variant="contained" onClick={createRequest}>
                Request Service
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
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
