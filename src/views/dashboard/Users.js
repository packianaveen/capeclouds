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
import moment from 'moment';
const Users = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [intialAd, setInitialAd] = useState([]);

  const [newad, setNewAd] = useState({
    name: '',
    url: '',
    photo: '',
  });
  const handlePhoto = (e) => {
    console.log(e.target.files[0]);
    setNewAd({ ...newad, photo: e.target.files[0] });
  };

  const onchange = (e) => {
    setNewAd({ ...newad, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    axios.get(`${url}/api/getusers`).then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        setInitialAd(response.data);
      }
    });
  }, []);

  const editElement = (id) => {
    axios.get(`${url}/api/editbottomAd/${id}`).then((response) => {
      console.log(response.data.photo);
      setNewAd({ name: response.data.name, photo: response.data.photo, url: response.data.url });
      setOpen(true);
      console.log(newad.photo);
      // setInitialAd(response.data);
    });
  };
  const deleteElement = (id) => {
    axios
      .delete(`${url}/api/deleteuser/${id}`)
      .then((response) => {
        console.log(response);
        const data = intialAd.filter((it) => it._id !== response.data._id);
        setInitialAd(data);
        toast.success('SucessFully Updated');
      })
      .catch((error) => {
        toast.error('failed');
      });
  };
  const handleAd = (e) => {
    e.preventDefault();
    console.log(newad.photo);
    const ad = {
      name: newad.name,
      url: newad.url,
      photo: newad.photo,
    };
    // // formData.append('photo', newad.photo);

    // console.log(formData);
    axios
      .post(`${url}/api/bottomadd`, ad, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        setInitialAd([...intialAd, response.data]);
        setOpen(false);
        toast.success('SucessFully Updated');
      })
      .catch((err) => {
        toast.error('failed');
        setOpen(false);
      });
  };
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
  return (
    <Box mt={4}>
      <DashboardCard title="Users">
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
        <Box
          m={1}
          //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          //   sx={boxDefault}
        >
          {/* <Button color="primary" variant="contained" size="large" onClick={handleOpen}>
            Add
          </Button> */}
        </Box>
        <div style={{ height: 'auto', width: '100%' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Pin code</TableCell>
                  <TableCell align="center">Service Center</TableCell>
                  <TableCell align="center">Create date</TableCell>
                  {/* <TableCell align="right">Service center</TableCell> */}
                  {/* <TableCell align="right">Status</TableCell> */}
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              {intialAd && (
                <TableBody>
                  {intialAd.map((it, x) => (
                    <TableRow
                      key={it._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {x + 1}
                      </TableCell>
                      <TableCell align="center">{it.phone}</TableCell>
                      <TableCell align="center">{it.pin}</TableCell>
                      <TableCell align="center">{it.admin ? it.admin : 'Default'}</TableCell>
                      <TableCell align="center">
                        {' '}
                        {moment(it.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="center">
                        <DeleteIcon
                          color="red"
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => deleteElement(it._id)}
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
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" encType="multipart/form-data">
            <Box m={1}>
              <FormControl fullWidth onChange={(e) => onchange(e)}>
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="component-outlined"
                  name="name"
                  defaultValue={newad.name}
                  label="Name"
                  required
                />
              </FormControl>
            </Box>
            <Box m={1}>
              <FormControl fullWidth onChange={(e) => onchange(e)}>
                <InputLabel htmlFor="component-outlined">URL</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="component-outlined"
                  defaultValue={newad.url}
                  name="url"
                  label="Name"
                />
              </FormControl>
            </Box>
            <Box m={1}>
              <FormControl fullWidth>
                {newad.photo.length == 0 ? (
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
              <Button fullWidth variant="contained" onClick={handleAd}>
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </DashboardCard>
    </Box>
  );
};

export default Users;
