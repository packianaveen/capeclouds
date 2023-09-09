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
import { TableFooter } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { url } from 'src/constant';
import { TablePagination, tablePaginationClasses as classes } from '@mui/base/TablePagination';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { styled } from '@mui/system';
const Admin = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState('');
  const [order, setOrder] = useState('');
  const [data, setData] = useState('');
  const [photo, setPhoto] = useState('');
  const [editid, setEditid] = useState('');
  const [Status, Setstatus] = useState('Enable');
  const [page, setPage] = React.useState(0);
  const [searchVal, setSearchVal] = useState(null);
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
      .get(`${url}/api/get-service`)
      .then((response) => {
        setData(response.data);
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

  const handleSearch = (e) => {
    console.log(e.target.value);
    function filterByValue(array, string) {
      return array.filter((o) => {
        delete o.__v;
        Object.keys(o).some((k) => o[k].toLowerCase().includes(string.toLowerCase()));
      });
    }
    const items = filterByValue(data, e.target.value);
    console.log(items);
    // setData(items);
  };
  const createCatogeries = (e) => {
    console.log(photo);
    if (editid) {
      if (typeof photo == 'string') {
        axios
          .patch(`${url}/api/serviceedit/${editid}`, {
            name: name,
            orderNo: order,
            status: Status,
            photo: photo,
          })
          .then((response) => {
            console.log((data.find((it) => it._id == editid).name = name));
            data.find((it) => it._id == editid).status = Status;
            data.find((it) => it._id == editid).orderNo = order;
            // intialAd.find((it) => it._id == editid).photo = newad.photo;
            // setInitialAd([...intialAd, response.data]);
            setOpen(false);

            toast.success('SucessFully Updated');
          })
          .catch((err) => {
            toast.error('failed');
            setOpen(false);
          });
      } else {
        axios
          .delete(`${url}/api/delete-service/${editid}`)
          .then((response) => {
            toast.success('SucessFully Updated');
            const data1 = data.filter((it) => it._id !== editid);
            axios
              .post(
                `${url}/api/create-service`,
                {
                  name: name,
                  orderNo: order,
                  status: Status,
                  photo: photo,
                },
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                },
              )
              .then((response) => {
                console.log(response);
                setData([...data1, response.data]);
                setOpen(false);
                setName('');
                setOrder('');
                setPhoto('');
                Setstatus('');
                toast.success('SucessFully Updated');
              })
              .catch((error) => {
                toast.error('failed');
                setOpen(false);
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
            toast.error('failed');
          });
      }
    } else {
      axios
        .post(
          `${url}/api/create-service`,
          {
            name: name,
            orderNo: order,
            status: Status,
            photo: photo,
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
          setName('');
          setOrder('');
          setPhoto('');
          Setstatus('');
          toast.success('SucessFully Updated');
        })
        .catch((error) => {
          toast.error('failed');
          setOpen(false);
          console.log(error);
        });
    }
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
      Setstatus(response.data.status);
      setEditid(id);

      // setNewAd({ name: response.data.name, photo: response.data.photo, url: response.data.url });
      setOpen(true);

      // setInitialAd(response.data);
    });
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

      <DashboardCard title="Services Table">
        {/* <Box
          m={1}
          //margin

          //   sx={boxDefault}
        >
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={handleOpen}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            Add
          </Button>
        </Box>
        <Box
          m={1}
          //margin

          //   sx={boxDefault}
        >
          <CustomTextField
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            size="large"
            // id="otp"
            // type="password"
            // label="password"
            onChange={(e) => handleSearch(e)}
            // value={password}
            // variant="outlined"
            // fullWidth
          />
        </Box> */}
        <Box
          m={1}
          // sx={{ width: '80%' }}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <CustomTextField
            style={{ marginRight: '10px' }}
            label="Search"
            onChange={(e) => setSearchVal(e.target.value)}
            variant="outlined"
          />
          <Button ml={1} color="primary" variant="contained" size="large" onClick={handleOpen}>
            Add
          </Button>
        </Box>

        <div style={{ height: 'auto', width: '100%' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow style={{ fontWeight: 'bold' }}>
                  <TableCell width="10%">ID</TableCell>
                  <TableCell align="center" width="20%">
                    Name
                  </TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Order No</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Action</TableCell>
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
                      <TableCell align="center">{it.name}</TableCell>
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
                      <TableCell align="center">{it.orderNo}</TableCell>
                      <TableCell align="center">
                        <img height="40px" width="60px" src={`${url}/Images/` + it.photo} />
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
              <FormControl fullWidth onChange={(e) => setName(e.target.value)}>
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput fullWidth id="component-outlined" defaultValue={name} label="Name" />
              </FormControl>
            </Box>
            <Box m={1}>
              <FormControl fullWidth onChange={(e) => setOrder(e.target.value)}>
                <InputLabel htmlFor="component-outlined">Order Number</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="component-outlined"
                  defaultValue={order}
                  label="Order No"
                />
              </FormControl>
            </Box>
            <Box m={1}>
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
            {/* <Box>
              <Button disabled={!name || !order} variant="contained" onClick={createCatogeries}>
                Submit
              </Button>
            </Box> */}
            <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button variant="contained" mr={2} onClick={createCatogeries}>
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
