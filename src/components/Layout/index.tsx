import React from 'react'
import { Container } from '@mui/material'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <React.Fragment>
      <Navbar />
        <div> {props.children} </div>
      <Footer />
    </React.Fragment>
  )
}

export default Layout