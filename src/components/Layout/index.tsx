import React, {useEffect, useState} from 'react'
import { Container } from '@mui/material'
import Navbar from './Navbar';
import AuthNavbar from './AuthNavbar';
import Footer from './Footer'

const Layout = (props) => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
      if (localStorage.getItem('access_token')) {
          setLogin(true)
      }
  }, [])

  return (
    <React.Fragment>
      {login ? (
        <AuthNavbar />
      ): (
        <Navbar />
      )}
     
        <div> {props.children} </div>
      <Footer />
    </React.Fragment>
  )
}

export default Layout