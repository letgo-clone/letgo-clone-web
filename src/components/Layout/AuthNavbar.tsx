import React, { useState, MouseEvent, useEffect } from 'react';
import { Grid, Box, Button, AppBar, Toolbar, IconButton, MenuItem, FormControl, Container, Paper, Select, Drawer, Menu, Tooltip, Typography } from "@mui/material"
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
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';

import Logo from '../../assets/img/logo.svg'
import MobileLogo from '../../assets/img/logo-mobile.svg'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from "react-redux";
import { removeAllData } from '../../redux/store';
import { Request } from '../../helpers/Request';


const AuthNavbar = () => {
    const navigate = useNavigate();
    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
    const openMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorNav(event.currentTarget);
    }

    const closeMenu = () => {
        setAnchorNav(null)
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const LoginOpen = Boolean(anchorEl);

    const handleLoginClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLoginClose = () => {
        setAnchorEl(null);
    };

    const { loginData } = useSelector((state) => state.authUser);

    const handlelogout = async() => {
        const url = "/oauth/logout";
        const result = await Request('GET', url);

        if(result.success){
            removeAllData();
            navigate('/');
            location.reload()
        }
    }

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
                                <IconButton
                                    href='/item/search'
                                    color="primary"
                                    sx={{
                                        p: '12px',
                                        color: '#FFFFFF',
                                        backgroundColor: '#2c2c2c',
                                        borderRadius: '0px 2px 2px 0px',
                                        '&:hover': { color: 'FFFFFF', backgroundColor: '#2c2c2c' }
                                    }}
                                    aria-label="directions">
                                    <SearchOutlinedIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: { md: 'contents', sm: 'contents', xs: 'none' } }}>
                            <Grid container sx={{ display: 'contents' }}>
                                <Grid item xl={1} lg={1} md={1} sx={{ paddingLeft: '24px' }}>
                                    <IconButton>
                                        <SmsIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={1} lg={1} md={1} sx={{ paddingLeft: '12px' }}>
                                    <IconButton>
                                        <NotificationsIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={1} lg={1} md={1} sx={{ paddingRight: '24px' }}>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleLoginClick}
                                            size="small"
                                            sx={{ ml: 2 }}

                                            aria-controls={LoginOpen ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={LoginOpen ? 'true' : undefined}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    marginRight: '5px'
                                                }}
                                                src={loginData.photo.url}
                                            ></Avatar>
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={LoginOpen}
                                    onClose={handleLoginClose}
                                    onClick={handleLoginClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleLoginClose}>
                                        <Avatar
                                            src={loginData.photo.url}
                                            sx={{
                                                width: '56px !important',
                                                height: '56px !important',
                                            }}
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: '20px',
                                                lineHeight: '24px',
                                                fontWeight: 700,
                                                paddingLeft: '15px'
                                            }}> {loginData.fullname}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLoginClose}>
                                        <Button
                                            href="/editProfile/info"
                                            variant="outlined"
                                            sx={{
                                                backgroundColor: '#ff3f55',
                                                color: '#FFFFFF',
                                                textTransform: 'none',
                                                border: '6px solid transparent',
                                                padding: '0px 25px 0px 25px',
                                                fontSize: '16px',
                                                marginTop:'15px',
                                                marginBottom:'5px',
                                                borderRadius: 15,
                                                '&:hover': { bgcolor: '#FFFFFF', border: '6px solid #ff3f55', color: '#ff3f55' },
                                            }}
                                            color="error"
                                            type="submit"
                                        >
                                            Profili görüntüle ve düzenle
                                        </Button>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem component="a" href="/profile/myads" onClick={handleLoginClose}>
                                        <ListItemIcon>
                                             <FavoriteIcon fontSize="small" />
                                        </ListItemIcon>
                                        İlanlarım
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => { 
                                        handleLoginClose();
                                        handlelogout();
                                    }}>
                                        <ListItemIcon>
                                             <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Çıkış
                                    </MenuItem>
                                </Menu>
                            </Grid>
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
        </AppBar >
    )
}

export default AuthNavbar