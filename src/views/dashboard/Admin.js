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
import { styled } from '@mui/system';
import PageContainer from 'src/components/container/PageContainer';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
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
import { TableFooter } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { url } from 'src/constant';
import { useTableSearch } from './components/useTableSearch';
import { TablePagination, tablePaginationClasses as classes } from '@mui/base/TablePagination';
const Admin = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName('');
    setPhone('');
    setPassword('');
    setFont(20);
    setPin('');
  };
  const [name, setName] = useState('');
  const [font, setFont] = useState(20);
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState('');
  const [editid, setEditid] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [Status, Setstatus] = useState('Enable');
  const [searchVal, setSearchVal] = useState(null);
  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: data,
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const CustomTablePagination = styled(TablePagination)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }

    & .${classes.selectLabel} {
      margin: 0;
    }

    & .${classes.displayedRows} {
      margin: 0;

      @media (min-width: 768px) {
        margin-left: auto;
      }
    }

    & .${classes.spacer} {
      display: none;
    }

    & .${classes.actions} {
      display: flex;
      gap: 0.25rem;
    }
  `;
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
    if (editid) {
      // axios
      //   .delete(`${url}/api/deleteuser/${editid}`)
      //   .then((response) => {
      //     // toast.success('SucessFully Updated');
      //     const data1 = data.filter((it) => it._id !== editid);
      //     axios
      //       .post(`${url}/api/updateUser`, {
      //         phone: phone,
      //         pin: pin,
      //         password: password,
      //         type: '3',
      //         status: Status,
      //         font: font,
      //         name: name,
      //         id: editid,
      //       })
      //       .then((response) => {
      //         console.log(response);
      //         setData([...data1, response.data]);
      //         setOpen(false);
      //         toast.success('SucessFully Updated');
      //       })
      //       .catch((error) => {
      //         toast.error('failed');
      //         console.log(error);
      //         setOpen(false);
      //       });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     toast.error('failed');
      //   });
      axios
        .post(`${url}/api/updateUser`, {
          phone: phone,
          pin: pin,
          password: password,
          type: '3',
          status: Status,
          font: font,
          name: name,
          _id: editid,
        })
        .then((response) => {
          const data1 = data.filter((it) => it._id !== editid);
          console.log(response);
          setData([...data1, response.data]);
          setOpen(false);
          setName('');
          setPhone('');
          setPassword('');
          setFont(20);
          setPin('');
          toast.success('SucessFully Updated');
        })
        .catch((error) => {
          toast.error('failed');
          console.log(error);
          setOpen(false);
        });
    } else {
      axios
        .post(`${url}/api/userAd`, {
          phone: phone,
          pin: pin,
          password: password,
          type: '3',
          status: Status,
          font: font,
          name: name,
        })
        .then((response) => {
          console.log(response);
          setData([...filteredData, response.data]);
          setName('');
          setPhone('');
          setPassword('');
          setFont(20);
          setPin('');
          setOpen(false);
          toast.success('SucessFully Updated');
        })
        .catch((error) => {
          toast.error('failed');
          console.log(error);
          setOpen(false);
        });
    }
  };

  const deleteCatogory = (id) => {
    console.log(id);
    axios
      .delete(`${url}/api/deleteuser/${id}`)
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
    axios.get(`${url}/api/getuser/${id}`).then((response) => {
      console.log(response.data);
      setName(response.data.name);
      setFont(response.data.font);
      setPhone(response.data.phone);
      setPassword(response.data.password);
      Setstatus(response.data.status);
      setPin(response.data.pin);
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
          <CustomTextField
            style={{ marginRight: '10px' }}
            label="Search"
            onChange={(e) => setSearchVal(e.target.value)}
            variant="outlined"
          />
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
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Password</TableCell>
                  <TableCell align="center">Pin</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              {filteredData && (
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredData
                  ).map((it, x) => (
                    <TableRow
                      key={it._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {x + 1}
                      </TableCell>
                      <TableCell align="center">{it.phone}</TableCell>
                      <TableCell align="center">{it.name}</TableCell>
                      <TableCell align="center">{it.password}</TableCell>
                      <TableCell align="center">{it.pin}</TableCell>
                      <TableCell align="center" style={{ width: '10%' }}>
                        <div
                          style={{
                            background: it.status == 'Enable' ? '#34c38f' : '#ef6767',
                            padding: '2px',
                            width: '100%',
                            color: 'white',
                            borderRadius: '5px',
                          }}
                        >
                          <div
                            style={{
                              background: it.status == 'Enable' ? '#34c38f' : '#ef6767',
                              padding: '2px',
                              width: '100%',
                              color: 'white',
                              borderRadius: '5px',
                            }}
                          >
                            {it.status}
                          </div>
                        </div>
                      </TableCell>
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
              <TableFooter>
                <TableRow>
                  <CustomTablePagination
                    style={{ padding: '20px' }}
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        'aria-label': 'rows per page',
                      },
                      actions: {
                        showFirstButton: true,
                        showLastButton: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
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
              <MuiPhoneNumber
                style={{ marginBottom: '10px' }}
                fullWidth
                variant="outlined"
                defaultCountry={'in'}
                value={phone}
                onChange={(value) => {
                  setPhone(value);
                }}
              />
            </Box>
            <Box m={1}>
              <FormControl fullWidth onChange={(e) => setName(e.target.value)}>
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="component-outlined"
                  defaultValue={name}
                  label="Order No"
                />
              </FormControl>
            </Box>
            <Box m={1}>
              <FormControl fullWidth onChange={(e) => setFont(e.target.value)}>
                <InputLabel htmlFor="component-outlined">Font Size</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="component-outlined"
                  type="number"
                  defaultValue={font}
                  label="Order No"
                />
              </FormControl>
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
            <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button
                disabled={!phone || !password}
                variant="contained"
                mr={2}
                onClick={createAdmins}
              >
                Submit
              </Button>
              <Button ml={1} variant="contained" color="error" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </DashboardCard>
    </PageContainer>
  );
};

export default Admin;
