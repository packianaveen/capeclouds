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
import { TableFooter } from '@mui/material';
import { Phone } from '@mui/icons-material';
import { TablePagination, tablePaginationClasses as classes } from '@mui/base/TablePagination';
import { styled } from '@mui/system';
const Servicerequestedadmin = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [data, setData] = useState('');
  const [center, setCenter] = useState('');
  const [catagery, setCatagery] = useState('');
  const [users, setUsers] = useState([]);
  const [service, setService] = useState('');
  const [status, setStatus] = useState('');
  const [openDate, setOpenDate] = useState('');
  const [editid, setEditid] = useState('');
  const [drop, setDrop] = useState('');
  const [centerArr, setCenterArr] = useState([]);
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
        console.log(response.data);
        setUsers(response.data);
        axios
          .get(`${url}/api/getRequestedservice`)
          .then((res) => {
            let out = [];
            console.log(
              res.data
                .filter((it) => it.type == '1')
                .map((item, x) => {
                  item.adminName = 'Default';
                  let admin = JSON.parse(item.user).admin;
                  axios
                    .get(`${url}/api/editCenter/${admin}`)
                    .then((re) => {
                      out[x] = re.data.name;
                      console.log(out);
                      setCenterArr(out);
                      return out;
                    })
                    .catch((error) => {
                      // data.push('Default');
                    });
                }),
            );
            setData(res.data.filter((it) => it.type == '1'));
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const editService = (x) => {
    console.log(x);
    // console.log(getAdmin(data[x].user));
    setCatagery(JSON.parse(data[x].catagery));
    setService(JSON.parse(data[x].service));
    setStatus(data[x].status);
    setPhone(getUser(data[x].user));
    setCenter(typeof centerArr[x] == 'string' ? centerArr[x] : 'Default');
    setOpenDate(data[x].createdAt);
    setEditid(data[x]._id);
    setOpen(true);
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
  const handlePhoto = (e) => {
    console.log(e.target.files[0]);
  };
  const editSserviceStatus = () => {
    const newData = data.map((it, currentIndex) =>
      it._id === editid ? { ...it, status: drop } : it,
    );
    setData(newData);
    console.log(newData.find((it) => it._id == editid));
    axios
      .post(
        `${url}/api/updaterequest`,
        newData.find((it) => it._id == editid),
      )
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
  const handleStatus = (event, x) => {
    console.log(event.target.value);
    setDrop(event.target.value);
    setStatus(event.target.value);
    // console.log(data[x]);
    // const newData = data.map((it, currentIndex) =>
    //   it._id === x ? { ...it, status: event.target.value } : it,
    // );
    // setData(newData);
    // console.log(newData);

    // axios
    //   .post(`${url}/api/updaterequest`, newData[x])
    //   .then((response) => {
    //     console.log(response);
    //     // setData([...data, response.data]);
    //     setOpen(false);
    //     toast.success('SucessFully Updated');
    //   })
    //   .catch((error) => {
    //     toast.error('failed');
    //     setOpen(false);
    //     console.log(error);
    //   });
  };

  const getUser = (id) => {
    console.log(data);
    // const phone = users.find((it) => it._id == id)?.phone;
    // console.log(phone);
    // return phone;
  };
  // const getAdmin = (id) => {
  //   const admin = users.find((it) => it._id == id)?.admin;
  //   console.log(admin);
  //   const data = [];
  //   // if (admin === 'undefined') {
  //   //   return 'Default';
  //   // } else {
  //   axios
  //     .get(`${url}/api/editCenter/${admin}`)
  //     .then((response) => {
  //       data.push(response.data.name);
  //     })
  //     .catch((error) => {
  //       data.push('Default');
  //     });
  //   console.log(data);
  //   // }
  // };
  console.log(centerArr);
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
                  <TableCell align="center">Service center</TableCell>
                  <TableCell align="center">Catagory</TableCell>
                  <TableCell align="center">Service</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Open Date</TableCell>
                  <TableCell align="center">Close Date</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  {/* <TableCell align="center">Action</TableCell> */}
                </TableRow>
              </TableHead>
              {data && (
                <TableBody>
                  {(rowsPerPage > 0
                    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : data
                  ).map((it, x) => (
                    <TableRow
                      style={{ background: x % 2 == 0 ? '#e8e8e8' : 'white' }}
                      key={it._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {x + 1}
                      </TableCell>
                      <TableCell align="center">{JSON.parse(it.user).phone}</TableCell>
                      <TableCell align="center">
                        {typeof centerArr[x] == 'string' ? centerArr[x] : 'Default'}
                      </TableCell>
                      <TableCell align="center">{JSON.parse(it.catagery).name}</TableCell>
                      <TableCell align="center">{JSON.parse(it.service).name}</TableCell>
                      <TableCell align="center">
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
                        {/* <p
                          style={{
                            // color: 'white',
                            // background: 'green',
                            borderRadius: '5px',
                            padding: '3px',
                          }}
                        > */}
                        {/* <FormControl fullWidth>
                          <Select
                            autoWidth={true}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={it.status}
                            // label="Status"
                            style={{ height: '25px', width: '100px' }}
                            onChange={(e) => handleStatus(e, x)}
                          >
                            <MenuItem value="open">Open</MenuItem>
                            <MenuItem value="ongoing">Ongoing</MenuItem>
                            <MenuItem value="close">Close</MenuItem>
                          </Select>
                        </FormControl> */}
                        {/* </p> */}
                      </TableCell>
                      <TableCell align="center">
                        {moment(it.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="center">
                        {moment(it.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="center">
                        {/* <DeleteIcon
                          style={{
                            fontSize: '30px',
                            color: 'white',
                            cursor: 'pointer',
                            margin: '2px',
                            padding: '5px',
                            background: '#ef6767',
                          }}
                          // onClick={() => deleteCatogory(it._id)}
                        /> */}

                        <EditIcon
                          style={{
                            fontSize: '30px',
                            color: 'white',
                            cursor: 'pointer',
                            margin: '2px',
                            padding: '5px',
                            background: '#34c38f',
                          }}
                          onClick={() => editService(x)}
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
      </DashboardCard>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" encType="multipart/form-data">
          <Box m={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-outlined">Phone</InputLabel>
              <OutlinedInput
                fullWidth
                id="component-outlined"
                disabled
                defaultValue={phone}
                label="Name"
              />
            </FormControl>
          </Box>
          <Box m={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-outlined">Catagory</InputLabel>
              <OutlinedInput
                fullWidth
                id="component-outlined"
                disabled
                defaultValue={catagery.name}
                label="Name"
              />
            </FormControl>
          </Box>
          <Box m={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-outlined">Service</InputLabel>
              <OutlinedInput
                fullWidth
                id="component-outlined"
                disabled
                defaultValue={service.name}
                label="Name"
              />
            </FormControl>
          </Box>
          <Box m={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-outlined">Service Center</InputLabel>
              <OutlinedInput
                fullWidth
                id="component-outlined"
                disabled
                defaultValue={center}
                label="Name"
              />
            </FormControl>
          </Box>
          <Box m={2}>
            {/* <FormControl fullWidth>
              <InputLabel htmlFor="component-outlined">Status</InputLabel>
              <OutlinedInput
                fullWidth
                id="component-outlined"
                disabled
                defaultValue={status}
                label="Name"
              />
            </FormControl> */}
            <FormControl fullWidth>
              <Select
                autoWidth={true}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                // style={{ height: '25px', width: '100px' }}
                onChange={(e) => handleStatus(e, editid)}
              >
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="close">Close</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* <Box m={2}>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-outlined">Created Date</InputLabel>
              <OutlinedInput
                fullWidth
                id="component-outlined"
                disabled
                defaultValue={moment(openDate).format('DD/MM/YYYY')}
                label="Name"
              />
            </FormControl>
          </Box> */}

          <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="contained" mr={2} onClick={editSserviceStatus}>
              Submit
            </Button>
            <Button ml={1} variant="contained" color="error" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default Servicerequestedadmin;
