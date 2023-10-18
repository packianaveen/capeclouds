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
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import Blog from './components/Blog';
import { useNavigate, useParams } from 'react-router';

const SamplePage = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState('');
  const navigate = useNavigate();
  let { id } = useParams();
  const [selectdata, setSelectdata] = useState('');

  useEffect(() => {
    axios.get(`${url}/api/edit-catogery/${id}`).then((response) => {
      console.log(JSON.parse(response.data.services));
      setCat(response.data);
      setData(JSON.parse(response.data.services).filter((it) => it.checked == true));
    });
  }, []);
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
  const hanldeService = (x) => {
    console.log(data[x]);
    setSelectdata(data[x]);
    // navigate(`/userservice/${data[x]._id}`);
    // setCat(JSON.parse(data[x].services).map((it) => ({ ...it, req: false })));
    // setService(JSON.parse(data[x].services).map((it) => ({ ...it, req: false })));
    setOpen(true);
  };
  const createRequest = (e) => {
    console.log(data);
    console.log(cat);
    axios
      .post(`${url}/api/createRequest`, {
        data: JSON.stringify(cat),
        service: JSON.stringify(selectdata),
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',

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
              justifyContent: 'center',
              flexDirection: 'column',
            }}
            onClick={() => hanldeService(x)}
          >
            <Card
              sx={{
                height: '80px',
                width: '80px',
                borderRadius: '107px',

                lineHeight: '10px',
              }}
            >
              <CardContent>
                <img style={{ objectFit: 'contain' }} height="100%" width="100%" src={it.photo} />
              </CardContent>
            </Card>
            <div
              style={{
                height: '80px',
                width: '80px',
                textAlign: 'center',
                fontsize: '12px',
              }}
            >
              <p>{it.name}</p>
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
            <Box mb={2} style={{ fontWeight: 'bold' }}>
              Service Request
            </Box>
            <Box>
              <CustomTextField
                style={{ marginTop: '10px' }}
                id="otp"
                label="Catagoery"
                value={cat.name}
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
                value={selectdata.name}
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
    </PageContainer>
  );
};

export default SamplePage;
