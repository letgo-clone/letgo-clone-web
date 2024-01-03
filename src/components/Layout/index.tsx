import React, {useEffect, useState} from 'react'
import { Container } from '@mui/material'
import Navbar from './Navbar';
import AuthNavbar from './AuthNavbar';
import Footer from './Footer'
import { setMenuData, useAppSelector, useAppDispatch } from '../../redux/store';
import { RequestPublic } from '../../helpers/Request';
import SubNavbar from './SubNavbar';

const Layout = (props) => {
  const [login, setLogin] = useState(false);
  const dispatch = useAppDispatch();
  const {menuData} = useAppSelector((state) => state?.Menu);

  useEffect(() => {
      if (localStorage.getItem('access_token')) {
          setLogin(true)
      }
  }, [])

  useEffect(() => {
        const getCategories = async() => {
            const categoryGetUrl = "/advert/categories";
            
            const categoryData = await RequestPublic({
                method: 'GET',
                url: categoryGetUrl
            });
           
            dispatch(setMenuData(categoryData))
        }
        
        if(menuData?.length == 0) {
            getCategories()
        }
   }, [])

  return (
    <React.Fragment>
        <Navbar isLogin={login!} />
        <SubNavbar categories={menuData!}/>
        <div> {props.children} </div>
      <Footer />
    </React.Fragment>
  )
}

export default Layout