import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useEffect } from 'react';
import { Card, CardContent, FormControlLabel, Checkbox, Button } from '@mui/material';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Swal from 'sweetalert2';
import { url } from 'src/constant';

import Blog from './components/Blog';
import { useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
const SamplePage = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [font, setFont] = useState('');
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState('');
  const [selectdata, setSelectdata] = useState(true);
  const [adSlide, setAdslide] = useState([]);
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('user')).admin;
  useEffect(() => {
    console.log(admin);
    axios.get(`${url}/api/editCenter/${admin}`).then((response) => {
      setData(JSON.parse(response.data.services));
      axios.get(`${url}/api/getbottomAd`).then((res) => {
        if (res.data.length > 0) {
          setAdslide(res.data.filter((it) => it.admin == response.data.admin));
          console.log(res.data.filter((it) => it.admin == response.data.admin));
        }
      });
    });
  }, []);
  const showAlert = () => {
    Swal.fire({
      title: 'Success',
      text: 'Our Repercentative contact you soon',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };
  const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    height: '500px',
    bgcolor: 'background.paper',
    border: '2px solid gray',
    boxShadow: 24,
    p: 4,
  };
  const hanldeService = (x) => {
    console.log(data[x]);
    setSelectdata(data[x]);
    console.log(data[x]._id);
    navigate(`/userservice/${data[x]._id}`);
    // setCat(JSON.parse(data[x].services).map((it) => ({ ...it, req: false })));
    // // setService(JSON.parse(data[x].services).map((it) => ({ ...it, req: false })));
    // setOpen(true);
  };
  const createRequest = (e) => {
    console.log(data);
    console.log(cat);
    axios
      .post(`${url}/api/createRequest`, {
        data: JSON.stringify(selectdata),
        service: JSON.stringify(cat),
        user: localStorage.getItem('user'),
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
  const updateCheckStatus = (index) => {
    setCat(cat.map((it, currentIndex) => (currentIndex === index ? { ...it, req: !it.req } : it)));

    // or
    // setCat([
    //   ...cat.slice(0, index),
    //   { ...cat[index], checked: !cat[index].checked },
    //   ...cat.slice(index + 1),
    // ]);
  };
  return (
    <PageContainer
      title="Catogeries"
      description="this is Sample page"
      style={{ backgroundColor: '#fdf1f4' }}
    >
      <Box>
        {/* <Box>
          <Typography fontWeight="700" variant="h3" mb={2}>
            Our Trending Services
          </Typography>
        </Box> */}
        <div>
          <Swiper
            spaceBetween={30}
            effect={'fade'}
            // height={200}
            // navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[EffectFade, Navigation, Pagination]}
            // className="mySwiper"
          >
            {adSlide.map((it) => (
              <SwiperSlide style={{ width: '100% !important' }}>
                <img
                  height="120px"
                  width="100%"
                  src={`${url}/Images/` + it.photo}
                  style={{ borderRadius: '15px' }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* <div>
          <div style={{ backgroundImage: `http://localhost:7098/Images/1692925982567-QWfIVD.jpg` }}>
            {' '}
            <img
              height="120px"
              width="100%"
              src="http://localhost:7098/Images/1692925982567-QWfIVD.jpg"
              style={{ borderRadius: '15px' }}
            />
          </div>
        </div> */}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          // p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
        style={{ backgroundColor: '#fdf1f4' }}
      >
        {data.map((it, x) => (
          <div
            style={{
              margin: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
            onClick={() => hanldeService(x)}
          >
            <Card
              sx={{
                height: '80px',
                width: '80px',
                borderRadius: '107px',
                boxShadow:
                  'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
                lineHeight: '10px',
              }}
            >
              <CardContent>
                <img
                  style={{ objectFit: 'contain' }}
                  height="100%"
                  width="100%"
                  src={`${url}/Images/` + it.photo}
                />
              </CardContent>
            </Card>
            <div
              style={{
                height: '80px',
                width: '80px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: '13px', color: '#233443', fontWeight: 'bold' }}>{it.name}</p>
            </div>
            {/* <p>{it.name}</p> */}
          </div>
        ))}
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={style} component="form" encType="multipart/form-data">
            {cat ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                  m: 1,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  flexWrap: 'wrap',
                  overflow: 'scroll',
                  overflowX: 'hidden',
                  height: '400px',
                }}
              >
                {cat
                  .filter((item) => item.checked == true)
                  .map((it, x) => (
                    <Card
                      sx={{
                        margin: '10px',
                        cursor: 'pointer',
                        height: '120px',
                        width: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CardContent>
                        <img
                          style={{ objectFit: 'fill' }}
                          height="80px"
                          width="100%"
                          src={`${url}/Images/` + it.photo}
                        />
                        <Typography
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          variant="p"
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                key={it.name}
                                isChecked={it.checked}
                                onChange={() => updateCheckStatus(x)}
                                label={it.name}
                                index={x}
                              />
                            }
                            label={it.name}
                          />
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Box>
            ) : (
              ''
            )}
            <Box
              style={{
                margin: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Button variant="contained" onClick={createRequest}>
                Request Service
              </Button>
              {/* <Button
                variant="contained"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close
              </Button> */}
            </Box>
          </Box>
        </Box>
      </Modal>
      <Box>
        <Blog />
      </Box>
    </PageContainer>
  );
};

export default SamplePage;
