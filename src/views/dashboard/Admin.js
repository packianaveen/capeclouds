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
import MuiPhoneNumber from 'mui-phone-number';
import DashboardCard from '../../components/shared/DashboardCard';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { url } from 'src/constant';
const Admin = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [order, setOrder] = useState('');
  const [data, setData] = useState('');
  const [photo, setPhoto] = useState('');
  const [editid, setEditid] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    axios
      .get(`${url}/api/getusers`)
      .then((response) => {
        setData(response.data.filter((it) => it.type == '3'));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const style = {
    position: 'fixed',
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
  const createAdmins = () => {
    axios
      .post(`${url}/api/userAd`, {
        phone: phone,
        pin: pin,
        password: password,
        type: '3',
      })
      .then((response) => {
        console.log(response);
        let roles = response.data;
        toast.success('SucessFully Updated');
      })
      .catch((error) => {
        toast.error('failed');
        console.log(error);
      });
  };
  const deleteCatogory = (id) => {
    console.log(id);
    axios
      .delete(`${url}/api/delete-service/${id}`)
      .then((response) => {
        toast.success('SucessFully Updated');
        const data1 = data.filter((it) => it._id !== response.data._id);
        setData(data1);
        console.log('sucess');
      })
      .catch((error) => {
        console.log(error);
        toast.error('failed');
      });
  };
  const editCatogory = (id) => {
    axios.get(`${url}/api/edit-service/${id}`).then((response) => {
      console.log(response.data);
      setName(response.data.name);
      setPhoto(response.data.photo);
      setOrder(response.data.orderNo);
      // Setstatus(response.data.status);
      setEditid(id);

      // setNewAd({ name: response.data.name, photo: response.data.photo, url: response.data.url });
      setOpen(true);

      // setInitialAd(response.data);
    });
  };
  return (
    <PageContainer title="Admin Table">
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

      <DashboardCard title="Admin Table">
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
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Password</TableCell>
                  <TableCell align="center">Pin</TableCell>

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
                      <TableCell align="center">{it.phone}</TableCell>
                      <TableCell align="center">{it.pin}</TableCell>
                      <TableCell align="center">{it.password}</TableCell>
                      {/* <TableCell align="center">
                        <img height="40px" width="60px" src={`${url}/Images/` + it.photo} />
                      </TableCell> */}
                      <TableCell align="center">
                        <DeleteIcon
                          style={{
                            fontSize: '30px',
                            color: 'white',
                            cursor: 'pointer',
                            margin: '2px',
                            padding: '5px',
                            background: '#ef6767',
                          }}
                          onClick={() => deleteCatogory(it._id)}
                        />

                        <EditIcon
                          style={{
                            fontSize: '30px',
                            color: 'white',
                            cursor: 'pointer',
                            margin: '2px',
                            padding: '5px',
                            background: '#34c38f',
                          }}
                          onClick={() => editCatogory(it._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" encType="multipart/form-data">
            <Box m={1}>
              {/* <FormControl fullWidth onChange={(e) => setName(e.target.value)}>
                <InputLabel htmlFor="component-outlined">Phone</InputLabel>
                <OutlinedInput fullWidth id="component-outlined" defaultValue={name} label="Name" />
              </FormControl> */}
              <MuiPhoneNumber
                style={{ marginBottom: '10px' }}
                fullWidth
                variant="outlined"
                defaultCountry={'in'}
                onChange={(value) => {
                  setPhone(value);
                }}
              />
            </Box>
            <Box m={1}>
              <FormControl fullWidth onChange={(e) => setPin(e.target.value)}>
                <InputLabel htmlFor="component-outlined">Pin Number</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="component-outlined"
                  defaultValue={pin}
                  label="Order No"
                />
              </FormControl>
            </Box>
            <Box m={1}>
              <FormControl fullWidth onChange={(e) => setPassword(e.target.value)}>
                <InputLabel htmlFor="component-outlined">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="component-outlined"
                  defaultValue={password}
                  label="Order No"
                />
              </FormControl>
            </Box>
            {/* <Box m={1}>
              <FormControl fullWidth>
                {photo.length == 0 ? (
                  <Button variant="contained" component="label" onChange={handlePhoto}>
                    Upload Image
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
                    Re-Upload Image
                    <input type="file" accept="image/*" id="file" name="photo" hidden />
                  </Button>
                )}
              </FormControl>
            </Box> */}
            {/* <Box m={1}>
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
            </Box> */}
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <Button disabled={!phone || !password} variant="contained" onClick={createAdmins}>
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </DashboardCard>
    </PageContainer>
  );
};

export default Admin;
