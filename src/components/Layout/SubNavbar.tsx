import React from 'react'
import { Grid, Box, Button, AppBar, Toolbar, MenuItem, Container, Paper, Select, Drawer, Menu, Tooltip, Typography } from "@mui/material"

interface SubNavbarAreaProps {
    categories: object[],
}

const SubNavbar: React.FC<SubNavbarAreaProps>  = ({ categories }) => {
  const firstSixCategory: object[] = categories.slice(0, 5);
  
  return (
    <AppBar position="static" sx={{ bgcolor: 'hsla(0,0%,100%,.87)', boxShadow: 1 }}>
        <Container
            maxWidth='lg'
            sx={{
                marginTop: '5px',
                marginBottom: '5px',
                paddingRight: { sm: '0px' },
                paddingLeft: { sm: '0px' }
            }}
        >
            <Toolbar
              sx={{
                  minHeight: { sm: '30px' },
                  marginBottom: '7px'
              }}
            >
               <Typography 
                  sx={{ 
                    flexGrow: 1, color: '#2c2c2c',
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '16.1px',
                    textTransform: 'uppercase',
                    display: 'contents'
                  }}
                >Tüm Kategoriler
              </Typography>
             <Box sx={{ textAlign: 'left', marginLeft: '30px', display : 'inline-flex' }}>
              {firstSixCategory.length > 0 && firstSixCategory.map((item, key ) => (
                  <MenuItem
                      key={key}
                      sx={{
                        display: 'contents'
                      }}
                  >
                      <Typography 
                            sx={{ 
                              color: '#2c2c2c',
                              fontSize: '14px',
                              lineHeight: 1.5,
                              fontWeight: 400,
                              textTransform: 'capitalize',
                              margin: '0px 8px'
                            }} 
                            textAlign="center"
                        >
                          {item?.category_name}
                      </Typography>
                  </MenuItem>
              ))}
            </Box>

            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default SubNavbar