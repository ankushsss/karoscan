import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { useMsal,useAccount } from "@azure/msal-react";
import { InteractionType, InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { loginRequest } from "../../authConfig";
import headers from '../../_mock/header';
// import addResturantData from "../../services/Actions/addResturantData"
// import { customerRegistration } from '../../services/Reducers/customerReducer';
import { customerRegistration } from '../../services/Reducers/Api/api';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  // const [idToken,setIdToken] = useState(accounts[0].localAccountId)
  const { instance, accounts, inProgress } = useMsal();
  const [atsResponse, setAtsResponse] = useState(null);
  const account = useAccount(accounts[0] || {});
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   instance.acquireTokenSilent(request).then((response) => {
      
  // }).catch((e) => {
  //     if (e instanceof InteractionRequiredAuthError) {
  //         instance.acquireTokenRedirect(request);
  //     }
  // });
  //   axios.post(process.env.React_App_CUSTOMER_REGISTRATION_API,{id_token:idToken},{headers}).then((res)=>{
  //     console.log(res,"aarhahe")
  //   }).catch((err)=>{
  //     console.log(err)
  //   })
        
  // },[])

  useEffect(() => {
    if (!atsResponse && account && inProgress === InteractionStatus.None) {
        const request = {
            ...loginRequest,
            account
        };
        instance.acquireTokenSilent(request).then((response) => {
            console.log(response.idToken)
            // axios.post(process.env.React_App_CUSTOMER_REGISTRATION_API,{id_token:response.idToken},{headers}).then((res)=>{
            //       console.log(res,"aarhahe")
            //       dispatch(addResturantData(res))
            //     }).catch((err)=>{
            //       console.log(err)
            //     })
            dispatch(customerRegistration(response.idToken))
        }).catch((e) => {
            if (e instanceof InteractionRequiredAuthError) {
                instance.acquireTokenRedirect(request);
            }
        });
    }
}, [account, inProgress, instance, atsResponse]);


  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
