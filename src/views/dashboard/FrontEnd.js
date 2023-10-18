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
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
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
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Tranding2 from './components/Trending2';
const FrontEnd = () => {
  const { themeColor, setTheme } = useContext(MyContext);
  const [color1, setColor] = React.useState('#ffffff');
  const [open, setOpen] = useState(false);
  const [intialAd, setInitialAd] = useState([]);
  const [editid, setEditid] = useState('');
  const [cat, setCat] = useState([]);
  const [defaultCat, setDefaultCat] = useState([]);
  const [topText, setToptext] = useState('Cape Clouds');
  const admin = JSON.parse(localStorage.getItem('user'))._id;
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
  useEffect(() => {
    axios.get(`${url}/api/getTheme`).then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        setColor(response.data[0]);
        setToptext(response.data[0].topText);
      }
    });
    axios.get(`${url}/api/getAd`).then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
        console.log(
          intialAd.filter((it) => it.admin == admin).filter((it) => it._id == response.data._id),
        );
        setInitialAd(response.data.filter((it) => it.admin == admin));
      }
    });
    axios
      .get(`${url}/api/get-service`)
      .then((response) => {
        setDefaultCat(
          response.data.filter((it) => it.admin == admin).map((it) => ({ ...it, checked: false })),
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const updateCheckStatus = (index) => {
    setCat(
      cat.map((it, currentIndex) =>
        currentIndex === index ? { ...it, checked: !it.checked } : it,
      ),
    );

    // or
    // setCat([
    //   ...cat.slice(0, index),
    //   { ...cat[index], checked: !cat[index].checked },
    //   ...cat.slice(index + 1),
    // ]);
  };
  const submitTheme = () => {
    axios
      .post(`${url}/api/updatetheme/${color1._id}`, { color: color1, topText: topText })
      .then((res) => setTheme(res.data.colur));
  };
  const editElement = (id) => {
    axios.get(`${url}/api/editAd/${id}`).then((response) => {
      console.log(JSON.parse(response.data.services));
      setNewAd({
        name: response.data.name,
        photo: response.data.photo,
        services: response.data.services,
      });
      setCat(JSON.parse(response.data.services));
      setOpen(true);
      setEditid(id);
      console.log(cat);
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
      services: JSON.stringify(cat),
      photo: newad.photo,
      admin: admin,
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
        services: JSON.stringify(cat),
        photo: newad.photo,
        admin: admin,
      };
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
  console.log(cat);
  const allCheck = () => {
    console.log(cat.map((it) => ({ ...it, checked: true })));
    setCat(cat.map((it) => ({ ...it, checked: true })));
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
            <CustomTextField
              style={{ marginTop: '10px' }}
              id="otp"
              label="Top Text"
              onChange={(e) => {
                setToptext(e.target.value);
              }}
              value={topText}
              variant="outlined"
            />
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
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={() => {
              setOpen(true);
              setCat(defaultCat);
            }}
          >
            Add
          </Button>
        </Box>
        <div style={{ height: 'auto', width: '100%' }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
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
                      {/* <TableCell align="right">{it.url}</TableCell> */}
                      <TableCell align="right">
                        <img height="40px" width="60px" src={it.photo} />
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
        onClose={() => {
          setOpen(false);
        }}
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
          {/* <Box m={1}>
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
          </Box> */}
          <Box m={1}>
            <FormControl fullWidth>
              {newad.photo.length == 0 ? (
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
          <Box mt={2} sx={{ height: '150px', overflowY: 'scroll' }}>
            <InputLabel htmlFor="component-outlined">Select Services</InputLabel>
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
                  MaxHeight: '100px',
                  flexWrap: 'wrap',
                }}
              >
                {cat.map((item, index) => (
                  <>
                    <FormControlLabel
                      key={item._id}
                      control={
                        <Checkbox
                          key={item._id}
                          checked={item.checked}
                          onChange={() => updateCheckStatus(index)}
                          label={item.name}
                          index={index}
                        />
                      }
                      label={item.name}
                    />
                    {/* <p>{it.checked.toString()}</p> */}
                  </>
                ))}
              </Box>
            </FormGroup>
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
      <Tranding2 />
    </PageContainer>
  );
};

export default FrontEnd;
