import React, { useEffect, useState } from 'react';
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
  Alert,
  Stack,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useContext } from 'react';
import { MyContext } from 'src/MyContext';
import Modal from '@mui/material/Modal';
import { DataGrid } from '@mui/x-data-grid';
import { MuiColorInput } from 'mui-color-input';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'material-react-toastify/dist/ReactToastify.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BottomSide from './components/BottomSide';
import Tranding from './components/Tranding';
import { url } from 'src/constant';
const FrontEnd = () => {
  const { themeColor, setTheme } = useContext(MyContext);
  const [color1, setColor] = React.useState('#ffffff');
  const [open, setOpen] = useState(false);
  const [intialAd, setInitialAd] = useState([]);
  const [editid, setEditid] = useState('');
  const [newad, setNewAd] = useState({
    name: '',
    url: '',
    photo: '',
  });
  const [sucess, setSucess] = useState(false);
  const handleChange = (color) => {
    let jasper = { ...color1, colur: color };
    setColor(jasper);
  };

  const onchange = (e) => {
    setNewAd({ ...newad, [e.target.name]: e.target.value });
  };
  const handlePhoto = (e) => {
    console.log(e.target.files[0]);
    setNewAd({ ...newad, photo: e.target.files[0] });
  };
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
  useEffect(() => {
    axios.get(`${url}/api/getTheme`).then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        setColor(response.data[0]);
      }
    });
    axios.get(`${url}/api/getAd`).then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        console.log(intialAd.filter((it) => it._id == response.data._id));
        setInitialAd(response.data);
      }
    });
  }, []);
  const submitTheme = () => {
    axios
      .post(`${url}/api/updatetheme/${color1._id}`, { color: color1 })
      .then((res) => setTheme(res.data.colur));
  };
  const editElement = (id) => {
    axios.get(`${url}/api/editAd/${id}`).then((response) => {
      console.log(response.data.photo);
      setNewAd({ name: response.data.name, photo: response.data.photo, url: response.data.url });
      setOpen(true);
      setEditid(id);
      console.log(newad.photo);
      // setInitialAd(response.data);
    });
  };
  const deleteElement = (id) => {
    axios
      .delete(`${url}/api/deleteAd/${id}`)
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

    const ad = {
      name: newad.name,
      url: newad.url,
      photo: newad.photo,
    };
    console.log(ad.photo);
    if (editid) {
      console.log(typeof ad.photo);
      if (typeof ad.photo == 'string') {
        axios
          .patch(`${url}/api/adedit/${editid}`, ad)
          .then((response) => {
            console.log((intialAd.find((it) => it._id == editid).name = newad.name));
            intialAd.find((it) => it._id == editid).url = newad.url;
            // intialAd.find((it) => it._id == editid).photo = newad.photo;
            // setInitialAd([...intialAd, response.data]);
            setOpen(false);
            setNewAd({
              name: '',
              url: '',
              photo: '',
            });
            toast.success('SucessFully Updated');
          })
          .catch((err) => {
            toast.error('failed');
            setOpen(false);
          });
      } else {
        axios
          .delete(`${url}/api/deleteAd/${editid}`)
          .then((response) => {
            console.log(intialAd);
            const data = intialAd.filter((it) => it._id !== editid);
            console.log(data);
            // setInitialAd(data);
            axios
              .post(`${url}/api/add`, ad, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then((response) => {
                console.log(response.data);
                setInitialAd([...data, response.data]);
                setOpen(false);
                setNewAd({
                  name: '',
                  url: '',
                  photo: '',
                });
                toast.success('SucessFully Updated');
              })
              .catch((err) => {
                toast.error('failed');
                setOpen(false);
              });
          })
          .catch((error) => {
            toast.error('failed');
          });
      }
    } else {
      const ad = {
        name: newad.name,
        url: newad.url,
        photo: newad.photo,
      };
      console.log(ad.photo);
      axios
        .post(`${url}/api/add`, ad, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response.data);
          setInitialAd([...intialAd, response.data]);
          setOpen(false);
          setNewAd({
            name: '',
            url: '',
            photo: '',
          });
          toast.success('SucessFully Updated');
        })
        .catch((err) => {
          toast.error('failed');
          setOpen(false);
        });
    }
    // axios
    //   .post(`${url}/api/add`, ad, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setInitialAd([...intialAd, response.data]);
    //     setNewAd({
    //       name: '',
    //       url: '',
    //       photo: '',
    //     });
    //     setOpen(false);
    //     toast.success('SucessFully Updated');
    //   })
    //   .catch((err) => {
    //     toast.error('failed');
    //     setOpen(false);
    //   });
  };
  return (
    <PageContainer title="Front End" description="this is Sample page">
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

      <Box mb={4}>
        <DashboardCard title="Theme">
          <Box>
            <MuiColorInput value={color1.colur} onChange={handleChange} format="hex" />
          </Box>
          <Box mt={2}>
            <Button variant="contained" onClick={submitTheme}>
              Submit
            </Button>
          </Box>
        </DashboardCard>
      </Box>
      <DashboardCard title="AD Images Table">
        <Box
          m={1}
          //margin
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          //   sx={boxDefault}
        >
          <Button color="primary" variant="contained" size="large" onClick={() => setOpen(true)}>
            Add
          </Button>
        </Box>
        <div style={{ height: 'auto', width: '100%' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Action</TableCell>
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
                      <TableCell align="right">{it.name}</TableCell>
                      <TableCell align="right">{it.url}</TableCell>
                      <TableCell align="right">
                        <img height="40px" width="60px" src={`${url}/Images/` + it.photo} />
                      </TableCell>
                      <TableCell align="right">
                        <Box>
                          <DeleteIcon
                            color="red"
                            style={{ color: 'red', cursor: 'pointer' }}
                            onClick={() => deleteElement(it._id)}
                          />

                          <EditIcon
                            style={{ color: 'green', cursor: 'pointer' }}
                            onClick={() => editElement(it._id)}
                          />
                        </Box>
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
      <BottomSide />
      <Tranding />
    </PageContainer>
  );
};

export default FrontEnd;
