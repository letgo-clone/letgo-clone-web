import React, { useState, MouseEvent } from 'react';
import { Grid, Box, Button, AppBar, Toolbar, IconButton, MenuItem, FormControl, Container, Paper, Select, Drawer, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, Typography } from "@mui/material"
import InputBase from '@mui/material/InputBase';

import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';
import HelpIcon from '@mui/icons-material/Help';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Face2Icon from '@mui/icons-material/Face2';

import Logo from '../../assets/img/logo.svg'
import MobileLogo from '../../assets/img/logo-mobile.svg'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';


import LoginModal from '../LoginModal';

function Navbar() {
    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
    const openMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorNav(event.currentTarget);
    }

    const closeMenu = () => {
        setAnchorNav(null)
    }

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: 'hsla(0,0%,100%,.87)', boxShadow: 1 }}>
            <Container
                maxWidth='lg'
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
                    <Link to="/">
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
                    </Link>
                    <Grid container>
                        <Grid item xl={4} md={4} xs={4}>
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
                        <Grid item xl={8} md={8} xs={12} sx={{ paddingLeft: '1%' }}>
                            <Paper
                                component="form"
                                sx={{ display: 'flex', alignItems: 'center', border: '1px solid #c4baba', boxShadow: '0', p: '0px', width: '100%' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1, pt: 1 }}
                                    placeholder="Araba, telefon, bisiklet ve daha fazlası"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton href='/item/search' color="primary" sx={{ p: '12px', color: '#FFFFFF', backgroundColor: '#2c2c2c', borderRadius: '0px 2px 2px 0px', '&hover': { backgroundColor: '#2c2c2c' } }} aria-label="directions">
                                    <SearchOutlinedIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: { md: 'flex', sm: 'flex', xs: 'none' }, marginLeft: '20px' }}>
                        <Button onClick={handleOpen} sx={{ color: '#ff3f55' }}><p style={{ fontWeight: '600', borderBottom: '2px solid #ff3f55', textTransform: 'none' }}>Giriş</p></Button>
                        <Link to="/post">
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
                        </Link>
                    </Box>
                </Toolbar>
                <Toolbar
                    sx={{
                        paddingRight: 0,
                        paddingLeft: 0,
                        display: { md: 'none' }
                    }}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <IconButton size='small' edge='start' onClick={openMenu}>
                                        <MenuIcon sx={{ fontSize: '2.0rem' }} />
                                    </IconButton>
                                    <Drawer
                                        anchor={'top'}
                                        open={Boolean(anchorNav)}
                                        onClose={closeMenu}
                                        PaperProps={{
                                            sx: {
                                                height: '100%',
                                                maxHeight: 'none',
                                            },
                                        }}
                                    >
                                        <Container>
                                            <Grid container >
                                                <Grid item xs={1} sx={{ marginTop: '1px' }}>
                                                    <IconButton size='medium' edge='start' onClick={closeMenu}>
                                                        <CloseIcon sx={{ fontSize: '2.5rem' }} />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <IconButton
                                                        edge='start'
                                                        color="inherit"
                                                        aria-label="logo"
                                                        sx={{
                                                            marginTop: '10px',
                                                            marginLeft: '1px'
                                                        }}
                                                    >
                                                        <img src={MobileLogo} width={'60'} height={'28'} />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <List
                                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                                aria-label="contacts"
                                            >
                                                <ListItem
                                                    sx={{
                                                        marginTop: '20px',
                                                        marginBottom: '20px',
                                                        paddingLeft: 0
                                                    }}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            sx={{
                                                                width: 50,
                                                                height: 50
                                                            }}
                                                        >
                                                            <Face2Icon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="Hesabına Gir"
                                                        secondary="Hesabına giriş yap"
                                                        sx={{
                                                            marginLeft: '10px'
                                                        }}
                                                    />
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton sx={{ paddingLeft: 0 }}>
                                                        <ListItemIcon sx={{ minWidth: '45px' }}>
                                                            <CameraAltIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Satmaya Başla" />
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton sx={{ paddingLeft: 0 }}>
                                                        <ListItemIcon sx={{ minWidth: '45px' }}>
                                                            <FavoriteIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary="İlanlarım" />
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton sx={{ paddingLeft: 0 }}>
                                                        <ListItemIcon sx={{ minWidth: '45px' }}>
                                                            <MessageIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Sohbet" />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton sx={{ paddingLeft: 0 }}>
                                                        <ListItemIcon sx={{ minWidth: '45px' }}>
                                                            <HelpIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Yardım" />
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                            <Container sx={{ display: 'inline-grid', paddingLeft: 0, paddingRight: 0 }}>
                                                <Button
                                                    variant="contained"
                                                    color="error" size='large'
                                                    sx={{
                                                        borderRadius: 5,
                                                        backgroundColor: '#ff3f55',
                                                        textTransform: 'none',
                                                        marginTop: '20px',
                                                        padding: '10px'
                                                    }}
                                                >Giriş</Button>
                                            </Container>
                                        </Container>
                                    </Drawer>
                                </Grid>
                                <Grid item xs={6}>
                                    <IconButton
                                        edge='start'
                                        color="inherit"
                                        aria-label="logo"
                                        sx={{
                                            marginLeft: '3px'
                                        }}
                                    >
                                        <img src={MobileLogo} width={'60'} height={'28'} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <ListItem sx={{ paddingRight: 0 }}>
                                    <ListItemText primary="İstanbul, Türkiye" sx={{ color: '#2c2c2c', fontWeight: '600', textAlign: 'end' }} />
                                    <ListItemIcon sx={{ minWidth: { xs: '0' } }}>
                                        <LocationOnIcon />
                                    </ListItemIcon>
                                </ListItem>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
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
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" sx={{ p:0 }}>
                    <IconButton onClick={handleClose} sx={{ float: 'right' }}>
                        <CloseIcon sx={{ fontSize: '2.5rem' }} />
                    </IconButton>
                </DialogTitle>
                <LoginModal />
            </Dialog>
        </AppBar >
    )
}

export default Navbar