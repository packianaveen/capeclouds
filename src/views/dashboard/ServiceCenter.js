import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
  FilledInput,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { ToastContainer, toast } from 'react-toastify';
import DownloadIcon from '@mui/icons-material/Download';
import 'react-toastify/dist/ReactToastify.css';
import QRCode from 'qrcode.react';
import { TelegramShareButton, WhatsappShareButton } from 'react-share';
import { url } from 'src/constant';
const Admin = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [data, setData] = useState('');
  const [pin, setPin] = useState('');
  const [photo, setPhoto] = useState('');
  const [cat, setCat] = useState([]);
  const [Status, Setstatus] = useState('Enable');
  const [qrOpen, setQrOpen] = useState(false);
  const [userId, setuserid] = JSON.parse(localStorage.getItem('user'))._id;
  useEffect(() => {
    axios
      .get(`${url}/api/get-catogery`)
      .then((response) => {
        setCat(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`${url}/api/getCenter`)
      .then((response) => {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid',
    boxShadow: 24,
    p: 4,
  };
  const handlePhoto = (e) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };
  const updateCheckStatus = (index) => {
    setCat(
      cat.map((topping, currentIndex) =>
        currentIndex === index ? { ...topping, checked: !topping.checked } : topping,
      ),

      console.log(cat),
    );

    // or
    // setToppings([
    //   ...toppings.slice(0, index),
    //   { ...toppings[index], checked: !toppings[index].checked },
    //   ...toppings.slice(index + 1),
    // ]);
  };
  const createServiceCenter = (e) => {
    console.log(photo);
    axios
      .post(
        `${url}/api/addCenter`,
        {
          name: name,
          phoneNo: phone,
          status: Status,
          address: address,
          services: JSON.stringify(cat),
          photo: photo,
          pin: pin,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((response) => {
        console.log(response);
        setData([...data, response.data]);
        setOpen(false);
        toast.success('SucessFully Updated');
      })
      .catch((error) => {
        toast.error('failed');
        setOpen(false);
        console.log(error);
      });
  };
  const downloadQR = () => {
    const qrCodeURL = document
      .getElementById('qrCodeEl')
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    console.log(qrCodeURL);
    let aEl = document.createElement('a');
    aEl.href = qrCodeURL;
    aEl.download = 'QR_Code.png';
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };
  const deleteCatogory = (id) => {
    console.log(id);
    axios
      .delete(`${url}/api/deleteCenter/${id}`)
      .then((response) => {
        toast.success('SucessFully Updated');
        console.log('sucess');
      })
      .catch((error) => {
        console.log(error);
        toast.error('failed');
      });
  };
  // const editCatogory = (id) => {
  //   axios.get(`${url}/api/edit-catogery/${id}`).then((response) => {
  //     console.log(response.data);
  //     setName(response.data.name);
  //     setPhoto(response.data.photo);
  //     setOrder(response.data.orderNo);
  //     Setstatus(response.data.status);
  //     // setNewAd({ name: response.data.name, photo: response.data.photo, url: response.data.url });
  //     setOpen(true);

  //     // setInitialAd(response.data);
  //   });
  // };
  return (
    <PageContainer title="Services Table">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <DashboardCard title="Services Center">
        <Box
          m={1}
          //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          //   sx={boxDefault}
        >
          <Button color="primary" variant="contained" size="large" onClick={handleOpen}>
            Add
          </Button>
        </Box>
        <div style={{ height: 'auto', width: '100%' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Pin code</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">QR Code</TableCell>
                  <TableCell align="center">Link</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              {data && (
                <TableBody>
                  {data.map((it, x) => (
                    <TableRow
                      key={it._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {x + 1}
                      </TableCell>
                      <TableCell align="center">{it.name}</TableCell>

                      <TableCell align="center">
                        <img height="40px" width="60px" src={`${url}/Images/` + it.photo} />
                      </TableCell>
                      <TableCell align="center">{it.status}</TableCell>
                      <TableCell align="center">{it.pin}</TableCell>
                      <TableCell align="center">{it.phoneNo}</TableCell>
                      <TableCell align="center">
                        <ContentCopyIcon />
                      </TableCell>
                      <TableCell>
                        <WhatsappShareButton
                          url={'http://localhost:3000/auth/login/' + userId}
                          // title="Share"
                        >
                          {' '}
                          <ContentCopyIcon />
                        </WhatsappShareButton>
                      </TableCell>
                      <TableCell align="center" onClick={() => setQrOpen(true)}>
                        <DownloadIcon
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `http://localhost:3000/auth/login/${userId}`,
                            );
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <DeleteIcon
                          color="red"
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => deleteCatogory(it._id)}
                        />

                        <EditIcon
                          style={{ color: 'green', cursor: 'pointer' }}
                          // onClick={() => editCatogory(it._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      </DashboardCard>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" encType="multipart/form-data">
          <Box m={1}>
            <FormControl fullWidth onChange={(e) => setName(e.target.value)}>
              <InputLabel htmlFor="component-outlined">Name</InputLabel>
              <OutlinedInput fullWidth id="component-outlined" defaultValue={name} label="Name" />
            </FormControl>
          </Box>

          <Box m={1}>
            <FormControl fullWidth>
              {photo.length == 0 ? (
                <Button variant="contained" component="label" onChange={handlePhoto}>
                  Upload File
                  <input
                    type="file"
                    //    value={newad.photo && newad.photo}
                    accept="image/*"
                    id="file"
                    name="photo"
                    hidden
                  />
                </Button>
              ) : (
                <Button variant="contained" component="label" onChange={handlePhoto}>
                  ReUpload
                  <input type="file" accept="image/*" id="file" name="photo" hidden />
                </Button>
              )}
            </FormControl>
          </Box>
          <Box m={1}>
            <FormControl fullWidth onChange={(e) => setPhone(e.target.value)}>
              <InputLabel htmlFor="component-outlined">Phone Number</InputLabel>
              <OutlinedInput
                fullWidth
                id="component-outlined"
                defaultValue={phone}
                label="Order No"
              />
            </FormControl>
          </Box>
          <Box m={1}>
            <FormControl fullWidth onChange={(e) => setAddress(e.target.value)}>
              <InputLabel htmlFor="component-outlined">Address</InputLabel>
              <OutlinedInput
                fullWidth
                id="component-outlined"
                defaultValue={address}
                label="Order No"
              />
            </FormControl>
          </Box>
          <Box m={1}>
            <FormControl fullWidth onChange={(e) => setPin(e.target.value)}>
              <InputLabel htmlFor="component-outlined">Pin code</InputLabel>
              <OutlinedInput
                fullWidth
                id="component-outlined"
                defaultValue={pin}
                label="Order No"
              />
            </FormControl>
          </Box>
          <Box mt={2}>
            <InputLabel htmlFor="component-outlined">Select Catagory</InputLabel>
            <FormGroup mt={2}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row !important',
                  MaxHeight: '500px',
                  flexWrap: 'wrap',
                  overflow: 'scroll',
                }}
              >
                {cat.map((it, index) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={it.name}
                        isChecked={it.checked}
                        onChange={() => updateCheckStatus(index)}
                        label={it.name}
                        index={index}
                      />
                    }
                    label={it.name}
                  />
                ))}
              </Box>
            </FormGroup>
          </Box>
          <Box m={1}>
            <FormControl fullWidth>
              <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={Status}
                onChange={(e) => Setstatus(e.target.value)}
                name="radio-buttons-group"
              >
                <FormControlLabel value="Enable" control={<Radio />} label="Enable" />
                <FormControlLabel value="Disable" control={<Radio />} label="Disable" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box>
            <Button variant="contained" onClick={createServiceCenter}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" encType="multipart/form-data">
          <Box m={1}>
            <QRCode
              id="qrCodeEl"
              value="http://localhost:3000/auth/login/${userId}"
              size={290}
              level={'H'}
              bgColor={'#ffffff'}
              includeMargin={true}
            />
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <Button variant="contained" onClick={downloadQR}>
              {' '}
              Download QR{' '}
            </Button>
          </Box>
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default Admin;
