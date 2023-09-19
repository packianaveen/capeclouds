import React, { useEffect, useState, useMemo } from 'react';
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
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';
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
import { TablePagination, tablePaginationClasses as classes } from '@mui/base/TablePagination';
import { styled } from '@mui/system';
import { localurl } from 'src/constant';
const Admin = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setCat(defaultCat);
  };
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
  const [editid, setEditid] = useState('');
  const [qrId, setQrid] = useState('');
  const [link, setLink] = useState('');
  const [page, setPage] = React.useState(0);
  const [defaultCat, setDefaultCat] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const filteredData = useMemo(() => {
    if (searchVal === '') {
      return data;
    }
    const filterBySearch = data.filter((item) => {
      if (
        item.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.phoneNo.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.pin.toLowerCase().includes(searchVal.toLowerCase())
      ) {
        return item;
      }
    });
    return filterBySearch;

    return [];
  }, [searchVal, data]);
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
      .get(`${url}/api/get-catogery`)
      .then((response) => {
        setDefaultCat(response.data.map((it) => ({ ...it, checked: false })));
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`${url}/api/getCenter`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    setLink(`http://localhost:3000/auth/Register/id=${userId}`);
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
    height: '500px',
    overflowY: 'scroll',
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
  };
  const createServiceCenter = (e) => {
    console.log(photo);
    if (editid) {
      if (typeof photo == 'string') {
        axios
          .patch(`${url}/api/centerEdit/${editid}`, {
            name: name,
            phoneNo: phone,
            status: Status,
            address: address,
            services: JSON.stringify(cat),
            photo: photo,
            pin: pin,
          })
          .then((response) => {
            console.log((data.find((it) => it._id == editid).name = name));
            data.find((it) => it._id == editid).status = Status;
            // data.find((it) => it._id == editid).orderNo = order;
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
          .delete(`${url}/api/deleteCenter/${editid}`)
          .then((response) => {
            toast.success('SucessFully Updated');
            const data1 = data.filter((it) => it._id !== editid);
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
          })
          .catch((error) => {
            console.log(error);
            toast.error('failed');
          });
      }
    } else {
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
    }
    // axios
    //   .post(
    //     `${url}/api/addCenter`,
    //     {
    //       name: name,
    //       phoneNo: phone,
    //       status: Status,
    //       address: address,
    //       services: JSON.stringify(cat),
    //       photo: photo,
    //       pin: pin,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     },
    //   )
    //   .then((response) => {
    //     console.log(response);
    //     setData([...data, response.data]);
    //     setOpen(false);
    //     toast.success('SucessFully Updated');
    //   })
    //   .catch((error) => {
    //     toast.error('failed');
    //     setOpen(false);
    //     console.log(error);
    //   });
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
  const allCheck = () => {
    console.log(cat.map((it) => ({ ...it, checked: true })));
    setCat(cat.map((it) => ({ ...it, checked: true })));
  };
  const editCatogory = (id) => {
    axios.get(`${url}/api/editCenter/${id}`).then((response) => {
      console.log(JSON.parse(response.data.services));
      var reduced = defaultCat.filter(
        (aitem) =>
          !JSON.parse(response.data.services).find((bitem) => aitem['_id'] === bitem['_id']),
      );
      setCat(reduced.concat(JSON.parse(response.data.services)));
      console.log(response.data);
      setName(response.data.name);
      setAddress(response.data.address);
      setPhone(response.data.phone);
      setPin(response.data.pin);
      setPhoto(response.data.photo);
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

      <DashboardCard title="Services Center">
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
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Pin code</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Status</TableCell>

                  <TableCell align="center">Link</TableCell>
                  <TableCell align="center">QR Code</TableCell>

                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              {data && (
                <TableBody>
                  {(rowsPerPage > 0
                    ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredData
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
                      <TableCell align="center">{it.phoneNo}</TableCell>
                      <TableCell align="center">{it.pin}</TableCell>

                      <TableCell align="center">
                        <img height="40px" width="60px" src={`${url}/Images/` + it.photo} />
                      </TableCell>
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
                      </TableCell>

                      <TableCell align="center">
                        <ContentCopyIcon
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            navigator.clipboard.writeText(`${localurl}/auth/login/${it._id}`);
                          }}
                        />
                      </TableCell>
                      {/* <TableCell>
                        <WhatsappShareButton
                          url={'http://localhost:3000/auth/login/' + userId}
                          // title="Share"
                        >
                          {' '}
                          <ContentCopyIcon />
                        </WhatsappShareButton>
                      </TableCell> */}
                      <TableCell
                        align="center"
                        onClick={() => {
                          setQrOpen(true);
                          setQrid(it._id);
                        }}
                      >
                        <DownloadIcon style={{ cursor: 'pointer' }} />
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
                  MaxHeight: '100px',
                  flexWrap: 'wrap',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      // key={it.name}
                      isChecked={false}
                      onChange={allCheck}

                      // index={index}
                    />
                  }
                  label="Select All"
                />
              </Box>
            </FormGroup>
            <FormGroup mt={2}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row !important',
                  MaxHeight: '200px',
                  flexWrap: 'wrap',
                  overflowY: 'scroll',
                }}
              >
                {cat.map((item, index) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={item.name}
                        checked={item.checked}
                        onChange={() => updateCheckStatus(index)}
                        label={item.name}
                        index={index}
                      />
                    }
                    label={item.name}
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

          <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="contained" mr={2} onClick={createServiceCenter}>
              Submit
            </Button>
            <Button ml={1} variant="contained" color="error" onClick={handleClose}>
              Close
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
              value={`${qrId}`}
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
