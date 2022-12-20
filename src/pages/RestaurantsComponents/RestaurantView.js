import react,{ useEffect, useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Drawer,
  TextField,
  Snackbar,
  Alert,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
} from '@mui/material';
import { RestaurantMenu, Star } from '@mui/icons-material';
import { date } from 'yup/lib/locale';

// import Page from '../components/Page';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';

// components
import Page from '../../components/Page';
// import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from "../../sections/@dashboard/user";
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../../sections/@dashboard/products';
// mock
import PRODUCTS from '../../_mock/products';
import { restaurantList,addCategory,addMenuCategory } from '../../services/Reducers/Api/api';
import { CategoryCard } from './CategoryCard';
import Iconify from '../../components/Iconify';
import USERLIST from '../../_mock/user';
// import {  } from '../../services/Reducers/Api/api';

const Alertset = forwardRef((props, ref)=> {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TABLE_HEAD = [
  { id: 'category_img', label: 'Image', alignRight: false },
  { id: 'category_name', label: 'Name', alignRight: false },
  { id: 'category_id', label: 'Id', alignRight: false },
  { id: 'isVerified', label: 'Items', alignRight: false },
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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export  function RestaurantView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [categoryList, setCategoryList] = useState([])
  const [categoryMenuItemsList, setCategoryMenuItemsList] = useState([ ])
  const [singleItem, setSingleItem] = useState({
    
    "item_name": "Butter  panner ",
        "item_regular_price": 0,
        "item_variants": {},
        "item_description": "",
        "item_availability_status": false,
        "item_image":""
  })
  const [isCategoryList, setIsCategoryList] = useState(true)
  const [drawers, setDrawer] = useState({
    right: false
  });
  const [model, setModel] = useState({open:false,type:""})
  const [editCategory, setEditCategory] = useState({})
  const [restaurant, setRestaurant] = useState({})
  const {customer,restaurants} = useSelector(state => state)
  const [page, setPage] = useState(0);
  const {id} = useParams()

const [order, setOrder] = useState('asc');

const [selected, setSelected] = useState([]);

const [orderBy, setOrderBy] = useState('name');

const [filterName, setFilterName] = useState('');

const [rowsPerPage, setRowsPerPage] = useState(5);

const [alertMssg, setAlertMssg] = useState({open:false,mssg:""});

const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelecteds = categoryList.map((n) => n.name);
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

const closeAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertMssg({open:false});
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
  setFilterName(event.target.value);
};

const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoryList.length) : 0;

const filteredUsers = applySortFilter(categoryList, getComparator(order, orderBy), filterName);

const isUserNotFound = filteredUsers.length === 0;

  console.log(restaurants,"jhgf")
 const dispatch = useDispatch()
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };
useEffect(()=>{
    if(customer.mssg === "success")
    {
    dispatch(restaurantList(customer))
   
    }

},[customer])

useEffect(()=>{
    if(restaurants.mssg === "success")
    {
   const filterRestaurant = restaurants.payload.data.data.filter((res)=>{
    console.log(id)
        return res.restaurant_id === id
    })
    console.log("filterRestaurant",filterRestaurant)
    setRestaurant(filterRestaurant[0])
    const categories = filterRestaurant[0].menu
    if(categories !== []){ setCategoryList(filterRestaurant[0].menu.menu_category)}
}
},[restaurants.mssg])


  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    
    <Page title="Dashboard: Products">

      <Container>
      <div className="card" style={{width:"100%"}}>
    <div className="card__image" >
       <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Salad" />
       <div style={{textAlign:"center",width:"100%"}}>
          <RestaurantMenu/>
          <h3 style={{textTransform:"uppercase"}}>{restaurant.restaurant_name}</h3>
        </div>
    </div>
    <div className="card__info">
       <div className="car__info--title">
        <br/>
       


        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
       </div>
       <div className="card__info--price">
          <Star/><Star/><Star/><Star/><Star/>
     
       </div>
       
    </div>
 
  {isCategoryList?<div>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} ml={5} mr={5}>
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <Button variant="contained" component={RouterLink} onClick={()=>{
            // editCategory.category_name? setEditCategory({...editCategory,editCategory.category_name}):setEditCategory()
            if(editCategory.category_name)
            {
              setEditCategory({
                menu_items:[],
                category_name:""
              })
            }
            setModel({open:true,type:"view"})
          }}to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Category
          </Button>
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
                  rowCount={categoryList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {console.log(categoryList)}
                <TableBody>
                  {categoryList?filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // const categorydate = new Date(row.date_created)
                    const isItemSelected = selected.indexOf(row.restaurant_name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, row.category_name)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={row.category_name} />
                          </Stack>
                        </TableCell>
                        <TableCell align="left">   {row.category_name}</TableCell>
                        <TableCell align="left">{row.category_id}</TableCell>
                        <TableCell align="left">{row.menu_items?row.menu_items.length:"0"}</TableCell>
                        <TableCell align="right">
                          <Button  onClick={()=>{
                            setCategoryMenuItemsList(row.menu_items)
                            setEditCategory(row)
                            setIsCategoryList(false)


                          }}>View</Button>
                          <Button  onClick={()=>{
                            setEditCategory(row)
                            setModel({open:true,type:"edit"})

                          }}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    );
                  }):""}
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
            count={categoryList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card></div>:<div>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} ml={5} mr={5}>
          <Typography variant="h4" gutterBottom>
            Menu Itemes
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" onClick={()=>setDrawer({right:true})} startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Menu Itemes
          </Button>
        </Stack>
        <card>
        {categoryMenuItemsList?categoryMenuItemsList.map((items)=>{
          return(<div style={{margin:"0 auto",display:"inline-block"}}>
            <CategoryCard category={items}/>
            </div>)
        }):""}
        </card>
        
        
        </div>}



        </div>


      </Container>
  
      <Drawer anchor="right"
          open={drawers.right}
          onClose={()=>setDrawer({right:false})}
        >
        <div style={{padding:"10px"}}>
        <TextField
        variant="filled"
        label=" Name"
        value={singleItem.item_name}
        onChange={(e)=>setSingleItem({...singleItem,"item_name":e.target.value})}
        /><br/>
        <TextField
        variant="filled"
        label="Availability_status"
        value={singleItem.item_availability_status}
        onChange={(e)=>setSingleItem({...singleItem,"item_availability_status":e.target.value})}

      
        /><br/>
        <TextField
        variant="filled"
        label="Description"
        value={singleItem.item_description}
        onChange={(e)=>setSingleItem({...singleItem,"item_description":e.target.value})}

      
        /><br/>
        <TextField
        variant="filled"
        label="Price"
        value={singleItem.item_regular_price}
        onChange={(e)=>setSingleItem({...singleItem,"item_regular_price":e.target.value})}

      
        /><br/>
        <input
        type="file"
        onChange={(e)=>setSingleItem({...singleItem,"item_image":e.target.files[0]})}
        /><br/>
     <DialogActions>
          <Button onClick={()=>setModel({open:false})}>Cancel</Button>
          <Button onClick={async()=>{
            console.log(singleItem,"singleItem")
          const res = await addMenuCategory(id,customer.payload.data.customer_id,editCategory.category_id,singleItem)
          console.log(res)
          if(res === "success")
          {
            dispatch(restaurantList(customer))
            // console.log("success")
            setDrawer(false)
            setAlertMssg({open:true,mssg:"Category Item add successfully"})
          }else{
            setAlertMssg({open:true,mssg:"error"})
          }

        
         }}>Save</Button>

          
        </DialogActions>
   
        </div>
      </Drawer>
      <Dialog open={model.open} onClose={()=>setModel({open:false})}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you want to edit category name 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            
            label="Category Name"
            type="text"
            value={editCategory.category_name}
            onChange={(e)=>setEditCategory({...editCategory,category_name:e.target.value})}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={()=>setModel({open:false})}>Cancel</Button>
         {model.type==="edit"?<Button onClick={()=>{


         }}>Update</Button>:<Button onClick={async()=>{
          const res = await addCategory(id,customer.payload.data.customer_id,editCategory.category_name)
          console.log(res)
          if(res === "success")
          {
            dispatch(restaurantList(customer))
            // console.log("success")
            setModel({open:false})
            setAlertMssg({open:true,mssg:"Category add successfully"})
          }

        
         }}>Add</Button>}
        </DialogActions>
      </Dialog>
      <Snackbar open={alertMssg.open} autoHideDuration={6000} onClose={closeAlert}>
        <Alertset onClose={closeAlert} severity="success" sx={{ width: '100%',color:"white" }}>
          {alertMssg.mssg}
        </Alertset>
      </Snackbar>
    </Page>
  );
}
