import React, { useState, MouseEvent } from 'react';
import { Grid, Box, Typography, Button, AppBar, Toolbar, IconButton, Menu, MenuList, MenuItem, FormControl, Container, Paper, Select, Drawer } from "@mui/material"
import InputBase from '@mui/material/InputBase';

import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import Logo from '../../assets/img/logo.svg'
import MobileLogo from '../../assets/img/logo-mobile.svg'

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


function Navbar() {
    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
    const openMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorNav(event.currentTarget);
    }

    const closeMenu = () => {
        setAnchorNav(null)
    }

    const pages = ['Giriş', 'Sat'];
    return (
        <AppBar position="static" sx={{ bgcolor: 'hsla(0,0%,100%,.87)', boxShadow: 1 }}>
            <Container
                maxWidth='xl'
                sx={{
                    marginTop: '5px',
                    marginBottom: '5px',
                    paddingRight: { sm: '0px' },
                    paddingLeft: { sm: '0px' }
                }
                }
            >
                <Toolbar
                    sx={{
                        paddingRight: { sm: '0px' },
                        paddingLeft: { sm: '0px', xs: '0' },
                        display: { md: 'flex', xs: 'none' }
                    }}>
                    <IconButton
                        size='small'
                        edge='start'
                        color="inherit"
                        aria-label="logo"
                        sx={{
                            display: { md: 'flex', xs: 'none' }
                        }}
                    >
                        <img src={Logo} width={'120'} height={'48'} />
                    </IconButton>
                    <IconButton
                        edge='start'
                        color="inherit"
                        aria-label="logo"
                        sx={{
                            display: { md: 'none', xs: 'flex' }
                        }}
                    >
                        <img src={MobileLogo} width={'60'} height={'28'} />
                    </IconButton>
                    <Grid container>
                        <Grid xl={4} md={4} xs={4}>
                            <FormControl size="small" fullWidth>
                                <Select
                                    id="location"
                                    name="location"
                                    value="34"
                                    sx={{ flex: 1 }}
                                >
                                    <MenuItem value="34">
                                        <ListItem sx={{ padding: '0.6px' }}>
                                            <ListItemIcon sx={{ minWidth: { xs: '20%' } }}>
                                                <LocationOnIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="İstanbul, Türkiye" />
                                        </ListItem>
                                    </MenuItem>
                                    <MenuItem value="06">
                                        <ListItem sx={{ padding: '0.6px' }}>
                                            <ListItemIcon>
                                                <LocationOnIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Ankara" />
                                        </ListItem>
                                    </MenuItem>
                                    <MenuItem value="35">
                                        <ListItem sx={{ padding: '0.6px' }}>
                                            <ListItemIcon>
                                                <LocationOnIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="İzmir" />
                                        </ListItem>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xl={8} md={8} xs={12} sx={{ paddingLeft: '1%' }}>
                            <Paper
                                component="form"
                                sx={{ display: 'flex', alignItems: 'center', border: '1px solid #c4baba', boxShadow: '0', p: '0px', width: '100%' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1, pt: 1 }}
                                    placeholder="Araba, telefon, bisiklet ve daha fazlası"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton color="primary" sx={{ p: '12px', color: '#FFFFFF', backgroundColor: '#2c2c2c', borderRadius: '0px 2px 2px 0px' }} aria-label="directions">
                                    <SearchOutlinedIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: { md: 'flex', sm: 'flex', xs: 'none' }, marginLeft: '20px' }}>
                        <Button sx={{ color: '#ff3f55' }}><p style={{ fontWeight: '600', borderBottom: '2px solid #ff3f55', textTransform: 'none' }}>Giriş</p></Button>
                        <Button
                            sx={
                                {
                                    color: '#FFFFFF',
                                    backgroundColor: '#ff3f55',
                                    borderRadius: 5,
                                    border: '4px solid white',
                                    '&:hover': { backgroundColor: '#FFFFFF', color: '#ff3f55' },
                                    padding: '6px 15px 6px 15px'
                                }
                            }
                            variant='contained'
                            color='error'
                            startIcon={<CameraAltIcon />} >
                            <p style={{ fontWeight: '600', textTransform: 'none' }}>Sat</p>
                        </Button>
                    </Box>
                </Toolbar>
                <Toolbar
                    sx={{
                        paddingRight: 0,
                        paddingLeft: 0,
                        display: { md: 'none' }
                    }}>
                    <Grid container>
                        <Grid xs={6} >
                            <Grid container>
                                <Grid xs={2}>
                                    <IconButton size='small' edge='start' onClick={openMenu}>
                                        <MenuIcon />
                                    </IconButton>
                                    
                                    <Drawer
                                        anchor={'top'}
                                        open={Boolean(anchorNav)}
                                        onClose={closeMenu}
                                    >
                                        <MenuList>
                                            {pages.map((page) => (
                                                <MenuItem>{page}</MenuItem>
                                            ))}
                                        </MenuList>
                                    </Drawer>
                                </Grid>
                                <Grid xs={6}>
                                    <IconButton
                                        edge='start'
                                        color="inherit"
                                        aria-label="logo"
                                        sx={{
                                            display: { md: 'none', xs: 'flex' }
                                        }}
                                    >
                                        <img src={MobileLogo} width={'60'} height={'28'} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={6} >
                            <Box>
                                <ListItem sx={{}}>
                                    <ListItemText primary="İstanbul, Türkiye" sx={{ color: '#2c2c2c', fontWeight: '600' }} />
                                    <ListItemIcon sx={{ minWidth: { xs: '20%' } }}>
                                        <LocationOnIcon />
                                    </ListItemIcon>
                                </ListItem>
                            </Box>
                        </Grid>
                        <Grid xs={12}>
                            <Paper
                                component="form"
                                sx={{ display: 'flex', alignItems: 'center', border: '1px solid #c4baba', boxShadow: '0', p: '0px' }}
                            >
                                <IconButton color="primary" sx={{ color: '#2c2c2c', backgroundColor: '#FFFFFF', borderRadius: '0px 2px 2px 0px' }} aria-label="directions">
                                    <SearchOutlinedIcon />
                                </IconButton>
                                <InputBase
                                    sx={{ ml: 1, flex: 1, pt: 1 }}
                                    placeholder="Araba, telefon, bisiklet ve daha fazlası"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>

    )
}

export default Navbar