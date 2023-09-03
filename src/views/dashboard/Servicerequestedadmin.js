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
import moment from 'moment/moment';
import { ToastContainer, toast } from 'react-toastify';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import 'react-toastify/dist/ReactToastify.css';
import { url } from 'src/constant';
import { Phone } from '@mui/icons-material';
const Servicerequestedadmin = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [order, setOrder] = useState('');
  const [data, setData] = useState('');
  const [photo, setPhoto] = useState('');
  const [temp, setTemp] = useState('');
  const [users, setUsers] = useState([]);
  const [Status, Setstatus] = useState('Enable');
  useEffect(() => {
    axios
      .get(`${url}/api/getRequestedservice`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`${url}/api/getusers`)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
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
  const handleStatus = (event, x) => {
    console.log(event.target.value);
    console.log(data[x]);
    const newData = data.map((it, currentIndex) =>
      currentIndex === x ? { ...it, status: event.target.value } : it,
    );
    setData(newData);
    console.log(newData);

    axios
      .post(`${url}/api/updaterequest`, newData[x])
      .then((response) => {
        console.log(response);
        // setData([...data, response.data]);
        setOpen(false);
        toast.success('SucessFully Updated');
      })
      .catch((error) => {
        toast.error('failed');
        setOpen(false);
        console.log(error);
      });
  };

  const getUser = (id) => {
    // axios.get(`${url}/api/getuser/${user}`).then((response) => {
    //   console.log(response.data.phone);
    //   phone = response.data.phone;
    //   return phone;
    // });
    console.log(users);
    const phone = users.find((it) => it._id == id)?.phone;
    console.log(phone);
    return phone;
  };

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

      <DashboardCard title="Services Requested">
        <Box
          m={1}
          //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          //   sx={boxDefault}
        ></Box>
        <div style={{ height: 'auto', width: '100%' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Phone No</TableCell>
                  <TableCell align="center">Catagory</TableCell>
                  <TableCell align="center">Service</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Date</TableCell>
                </TableRow>
              </TableHead>
              {data && (
                <TableBody>
                  {data.map((it, x) => (
                    <TableRow
                      style={{ background: x % 2 == 0 ? '#e8e8e8' : 'white' }}
                      key={it._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {x + 1}
                      </TableCell>
                      <TableCell align="center">{getUser(it.user)}</TableCell>
                      <TableCell align="center">{JSON.parse(it.catagery).name}</TableCell>
                      <TableCell align="center">{JSON.parse(it.service).name}</TableCell>
                      <TableCell align="center">
                        {/* <p
                          style={{
                            // color: 'white',
                            // background: 'green',
                            borderRadius: '5px',
                            padding: '3px',
                          }}
                        > */}
                        <FormControl fullWidth>
                          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={it.status}
                            // label="Status"
                            style={{ height: '25px' }}
                            onChange={(e) => handleStatus(e, x)}
                          >
                            <MenuItem value="open">Open</MenuItem>
                            <MenuItem value="ongoing">Ongoing</MenuItem>
                            <MenuItem value="close">Close</MenuItem>
                          </Select>
                        </FormControl>
                        {/* </p> */}
                      </TableCell>
                      <TableCell align="center">
                        {moment(it.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default Servicerequestedadmin;
