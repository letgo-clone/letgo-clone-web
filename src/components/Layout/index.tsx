import React from 'react'
import { Container } from '@mui/material'
import Navbar from './Navbar'

const Layout = (props) => {
  return (
    <React.Fragment>
      
        <Navbar />
        <Container>
        <div> {props.children} </div>
        </Container>
    </React.Fragment>
  )
}

export default Layout