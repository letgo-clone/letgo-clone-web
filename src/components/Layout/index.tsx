import React from 'react'
import { Container } from '@mui/material'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <Container sx={{ marginTop:'10px' }}>
        <div> {props.children} </div>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default Layout