import React, { useEffect, useState, forwardRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import swal from 'sweetalert';
import { Drawer, Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Snackbar,
  Alert,
  Container,
  Typography,
  TableContainer,
  TablePagination, } from '@mui/material';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
// import { useTheme } from '@mui/material/styles';
import { Link as RouterLink,useNavigate,Navigate } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select';
import { State, City } from 'country-state-city';
import { useForm, Controller } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { reset } from 'numeral';

import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import headers from '../_mock/header';
import Page from '../components/Page';
import Label from '../components/Label';
import { restaurantList } from '../services/Reducers/Api/api';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Alertset = forwardRef((props, ref)=> {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }
const TABLE_HEAD = [
  { id: 'restaurant_name', label: 'Name', alignRight: false },
  { id: 'restaurant_email', label: 'Email', alignRight: false },
  { id: 'restaurant_city', label: 'City', alignRight: false },
  { id: 'restaurant_state', label: 'State', alignRight: false },
  { id: 'restaurant_country', label: 'Country', alignRight: false },
  { id: 'restaurant_address', label: 'Address', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.restaurant_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}



const Resturants = () => {
  // const rest = useSelector((state) => state)
  // console.log(rest,"hiiii")
  // const navigate = useNavigate()
  const [isLoading,setLoading] = useState(false);
  const dispatch =  useDispatch()
  console.log(useSelector(state=>state),"restaget")

  // const customer = {}
  const {customer,restaurants} = useSelector((state)=>state)
  console.log(customer,"error")
  const [restCustomer ,setRestCustomer] = useState({})
  const [restaurantData, setRestaurantData] = useState(
  {
        "customerId": "",
        "restaurantName": "aman test dhaba",
        "restaurantEmail": "aman@gmail.com",
        "restaurantCity": "indore",
        "restaurantCountry": "india",
        "restaurantType": "token",
        "restaurantState": "mp",
        "restaurantAddress": "rajeev gandhi",
        "restaurantMobileNumber": "12646543456789",
        "restaurantBranchName": "bhavarkua",
        "restaurantIsFranchised": "true"
  }
  );

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [restaurentList , setResturantList] = useState([])

  const [alertMssg, setAlertMssg] = useState({open:false,mssg:""});
  
  const[open,setOpen] = useState(false)
    
const navigate = useNavigate()
const closeAlert = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setAlertMssg({open:false});
};


const postData=  (e) =>{
    // navigate('/dashboard/resturants') 
  // history.push("/resturants")
  setLoading(true); 
  e.preventDefault();
  axios.post(process.env.React_App_REGISTRATION_CREATE_RESTURANT_API,restaurantData,{headers})
  .then(res => {console.log('posting..',res);setLoading(false)
  
  if(res.data.statusCode === 200){
    setAlertMssg({open:true,mssg:"Category Item add successfully"})
    getResturants(customer)
    toggleDrawer("right", false)
  }
  else {
    setAlertMssg({open:true,mssg:"error"})
    // getResturants(customer)
 
  };
  })
  .catch(err => console.log(err))
}
  
 useEffect(()=>{
    getResturants(customer)
 },[customer])
 useEffect(()=>{
if(restaurants.mssg === "success")
{
  setResturantList(restaurants.payload.data.data)
}
 },[restaurants.mssg])

  const { handleSubmit, control,reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset()
  }
  // const [countries,setCountries] = useState(Country.getAllCountries("IN"));
  // const [country, setCountry] = useState('')
  // const handleChange = (event) => {
  //   setCountry(event.target.value);
  // }; 
  const handleChange = (e) => {
    setRestaurantData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
   
  }
useEffect(()=>{
  console.log(restaurantData)
  
},[restaurantData])
  const [states, setStates] = useState(State.getStatesOfCountry("IN"));
  // const [selectStates, setSelectStates] = useState([])


  const [city, setCity] = useState(City.getCitiesOfState("IN", "MP"));
  // const [selectCity, setSelectCity] = useState([])


  const [state, setState] = React.useState({
    right: false
  });


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = restaurentList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    event.preventDefault()
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - restaurentList.length) : 0;

  const filteredUsers = applySortFilter(!restaurentList? []:restaurentList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const toggleDrawer = (anchor, open) => (event) => {
    console.log(customer.payload.data.customer_id,"jkl")
    setRestaurantData({...restaurantData,customerId:customer.payload.data.customer_id})
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handelSubmit = (e) => {
    console.log(restaurantData)
  }

  const getResturants = async (data)=>{
    
    
    if(data.mssg === "success")
    {
      console.log(data.payload.data.customer_id,"if")
      dispatch(restaurantList(data))
    //  const res =  await axios.get(`${process.env.React_App_GET_ALL_RESTURANT_API}${data.payload.data.customer_id}`,{headers});
     
    // console.log(res.data.data)
     
    }
    else
    {
      console.log(data,"else")
    }
    
  }

  return (
    <>
  
<Page title="Restaurant">
<Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

        <Typography variant="h4" gutterBottom>
          User
        </Typography>
        <Button variant="contained" onClick={toggleDrawer("right", true)} component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
          Add Resturants
        </Button>

        <Drawer anchor="right"
          open={state.right}
          onClose={toggleDrawer("right", false)}
        >
          <DialogTitle>Add Resturant</DialogTitle>
          <form onSubmit={handelSubmit}>
      
            <div style={{ padding: "10px" }}>
              <TextField
                autoFocus
                id="restaurantName"
                label="Restaurant Name"
                variant="outlined"
                fullWidth
                value={restaurantData.restaurantName}
                name="restaurantName"
                onChange={handleChange}
                InputProps={{ sx: { height: 40 } }}

              />
            </div>
            <div style={{ padding: "10px" }}>
              <TextField
                autoFocus
                id="restaurantEmail"
                label="Restaurant Email"
                variant="outlined"
                fullWidth
                value={restaurantData.restaurantEmail}
                name="restaurantEmail"
                onChange={handleChange}
                InputProps={{ sx: { height: 40 } }}

              />
            </div>
             <div style={{ padding: "10px" }}>
              <TextField
                margin="dense"
                id="restaurantAddress"
                label="Address"
                type="text"
                fullWidth
                variant="outlined"
                name='restaurantAddress'
                value={restaurantData.restaurantAddress}
                onChange={handleChange}
                InputProps={{ sx: { height: 40 } }}
              />
            </div> 

            <div style={{ padding: "10px" }}>
              <TextField
                margin="dense"
                id="restaurantMobileNumber"
                label="Mobile"
                type="text"
                fullWidth
                variant="outlined"
                name="restaurantMobileNumber"
                onChange={handleChange}
                value={restaurantData.restaurantMobileNumber}
                InputProps={{ sx: { height: 40 } }}
              />
            </div>

            <div style={{ padding: "10px" }}>
              <FormControl>
                <FormLabel >Resturant type</FormLabel>
                <RadioGroup
                  

                  value={restaurantData.restaurantType}
                  onChange={handleChange}
                  name="restaurantType"
                >
                  <FormControlLabel value="Tabel Based" control={<Radio />} label="Tabel Based" />
                  <FormControlLabel value="Token Based" control={<Radio />} label="Token Based" />
                </RadioGroup>
              </FormControl>
            </div>

            <div style={{ padding: "10px" }}>
              <FormControl sx={{ m: 1, width: 300 }} >
                <InputLabel id="demo-multiple-name-label">Country</InputLabel>
                <Select
                  // value={selectStates}
                  value={restaurantData.restaurantCountry}
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  // onChange={(e) => setSelectStates(e.target.value)}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                  name="restaurantCountry"
                >
                  {/* {countries.map((countries) => (
                    <MenuItem
                      key={countries.name}
                      value={countries.name}
                    // style={getStyles(item.name, personName, theme)}
                    >
                      {countries.name}
                    </MenuItem>
                  ))} */}

                  <MenuItem value={"India"}>India</MenuItem>
                </Select>
              </FormControl>
            </div>

            
            <div style={{ padding: "10px" }}>
              <FormControl sx={{ m: 1, width: 300 }}>

                <InputLabel id="demo-multiple-farnished-label">This Resturant is Franhised</InputLabel>
                <Select

                  value={restaurantData.restaurant_is_franchised}
                  label="demo-multiple-farnished-label"
                  onChange={handleChange}
                  name="restaurant_is_franchised"
                >
                  <MenuItem value={"yes"}>yes</MenuItem>
                  <MenuItem value={"no"}>no</MenuItem>
                </Select>
              </FormControl>
            </div>

             <div style={{ padding: "10px" }}>
              <FormControl sx={{ m: 1, width: 300 }} >
                <InputLabel id="demo-multiple-name-label">State</InputLabel>
                <Select
                  // value={selectStates}
                  value={restaurantData.restaurantState}
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  // onChange={(e) => setSelectStates(e.target.value)}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                  name="restaurantState"
                >
                  {states.map((state) => (
                    <MenuItem
                      key={state.name}
                      value={state.name}
                    // style={getStyles(item.name, personName, theme)}
                    >
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div style={{ padding: "10px" }}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-city-label">City</InputLabel>
                <Select
                  // value={selectCity}
                  value={restaurantData.restaurantCity}
                  name="restaurantCity"
                  labelId="demo-multiple-city-label"
                  id="demo-city-name"
                  onChange={handleChange}
                  // onChange={(e) => setSelectCity(e.target.value)}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {city.map((city) => (
                    <MenuItem
                      key={city.name}
                      value={city.name}
                    // style={getStyles(item.name, personName, theme)}
                    >
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div> 

            

            <DialogActions>
               {!isLoading &&(<Button type='submit' onClick={postData} >Submit</Button>)}
               {isLoading &&(<Button type='submit' disabled>
               <i className="fa fa-spinner" aria-hidden="true"/>Submiting...</Button>)}
               {/* <Button type='submit' onClick={postData}>Submit</Button> */}
            </DialogActions>
          </form>

        </Drawer>
      </Stack>
      <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={restaurentList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                   
                    const isItemSelected = selected.indexOf(row.restaurant_name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={row.restaurant_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, row.restaurant_name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={row.restaurant_name} src="" />
                            <Typography variant="subtitle2" noWrap>
                              
                            {row.restaurant_name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{row.restaurant_email}</TableCell>
                        <TableCell align="left">{row.restaurant_city}</TableCell>
                        <TableCell align="left">{row.restaurant_state}</TableCell>
                        <TableCell align="left">{row.restaurant_country}</TableCell>
                        <TableCell align="left">{row.restaurant_address}</TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                        {/* <TableCell align="left">
                          <Label variant="ghost" color={(row.status === 'active' && 'unactive') || 'success'}>
                            {sentenceCase(row.status)}
                          </Label>
                        </TableCell> */}

                        <TableCell align="right">
                          <Button onClick={()=>navigate(`/dashboard/view/${row.restaurant_id}`)}>View</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={restaurentList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        </Container>
        <Snackbar open={alertMssg.open} autoHideDuration={6000} onClose={closeAlert}>
        <Alertset onClose={closeAlert} severity="success" sx={{ width: '100%',color:"white" }}>
          {alertMssg.mssg}
        </Alertset>
      </Snackbar>
        </Page>
    </>
  )
}

export default Resturants
