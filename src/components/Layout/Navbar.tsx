import React, { useState, MouseEvent, useEffect } from 'react';
import { Grid, Box, Button, AppBar, Toolbar, IconButton, MenuItem, FormControl, Container, Paper, Select, Drawer, Dialog, DialogTitle, useMediaQuery, Menu, Tooltip, Typography } from "@mui/material"
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

import { useTheme } from '@mui/material/styles';
import LoginModal from '../LoginModal';
import { navbarStyles, authUserMenuStyle } from '../../styles/navbarStyles';
import { useSelector } from "react-redux";
import { removeAllData } from '../../redux/store';
import { Request } from '../../helpers/Request';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarAreaProps {
    isLogin: boolean
}

const Navbar: React.FC<NavbarAreaProps> = ({isLogin}) => {

    const navigate = useNavigate();
    // useState elements
    const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);

    const openMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorNav(event.currentTarget);
    }

    const closeMenu = () => {
        setAnchorNav(null)
    }

    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        <AppBar position="static" sx={navbarStyles.appBar}>
            <Container maxWidth='lg' sx={navbarStyles.container}>
                <Toolbar sx={navbarStyles.toolbar}> 
                    <Link to="/">
                        <IconButton
                            size='small'
                            edge='start'
                            color="inherit"
                            aria-label="logo"
                            sx={navbarStyles.logoIconButton}
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
                                    sx={navbarStyles.selectLocation}
                                >
                                    <MenuItem value="34">
                                        <ListItem sx={navbarStyles.selectLocationListItem}>
                                            <ListItemIcon sx={navbarStyles.selectLocationListItemFirstIcon}>
                                                <LocationOnIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="İstanbul, Türkiye" />
                                        </ListItem>
                                    </MenuItem>
                                    <MenuItem value="06">
                                        <ListItem sx={navbarStyles.selectLocationListItem}>
                                            <ListItemIcon>
                                                <LocationOnIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Ankara" />
                                        </ListItem>
                                    </MenuItem>
                                    <MenuItem value="35">
                                        <ListItem sx={navbarStyles.selectLocationListItem}>
                                            <ListItemIcon>
                                                <LocationOnIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="İzmir" />
                                        </ListItem>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xl={8} md={8} xs={12} sx={navbarStyles.inputSearchGrid}>
                            <Paper component="form" sx={navbarStyles.inputSearchPaper}>
                                <InputBase
                                    sx={navbarStyles.inputSearchAreaInputBase}
                                    placeholder="Araba, telefon, bisiklet ve daha fazlası"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton
                                    href='/item/search'
                                    color="primary"
                                    sx={navbarStyles.searchInputIconButton}
                                    aria-label="directions">
                                    <SearchOutlinedIcon />
                                </IconButton>
                            </Paper>
                        </Grid>
                    </Grid>
                    {isLogin ? (
                        <Box sx={navbarStyles.rightButtonsGrid}>
                            <Grid container sx={navbarStyles.authBoxGrid}>
                                <Grid item xl={1} lg={1} md={1} sx={navbarStyles.authIconsGrid}>
                                    <IconButton>
                                        <SmsIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={1} lg={1} md={1} sx={navbarStyles.authIconsGrid}>
                                    <IconButton>
                                        <NotificationsIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={1} lg={1} md={1} sx={navbarStyles.authAvatarIconGrid}>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleLoginClick}
                                            size="small"
                                            sx={navbarStyles.authAvatarIconButton}
                                            aria-controls={LoginOpen ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={LoginOpen ? 'true' : undefined}
                                        >
                                            <Avatar sx={navbarStyles.authAvatar} src={loginData.photo.url}></Avatar>
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
                                        sx: {authUserMenuStyle}
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleLoginClose}>
                                        <Avatar
                                            src={loginData.photo.url}
                                            sx={navbarStyles.authMenuAvatar}
                                        />
                                        <Typography sx={navbarStyles.authMenuAvatarText}>{loginData.fullname}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLoginClose}>
                                        <Button
                                            href="/editProfile/info"
                                            variant="outlined"
                                            sx={navbarStyles.authMenuProfileButton}
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
                                    sx={navbarStyles.authMenuSellButton}
                                    variant='contained'
                                    color='error'
                                    startIcon={<CameraAltIcon />} >
                                    <Typography sx={navbarStyles.authMenuSellButtonText}>Sat</Typography>
                                </Button>
                            </Link>
                        </Box>
                    ): (
                        <Box sx={navbarStyles.rightButtonsGrid}>
                            <Button onClick={handleOpen} sx={navbarStyles.loginButtonOnRight}>
                                <Typography sx={navbarStyles.loginButtonTextOnRight}>Giriş</Typography>
                            </Button>
                            <Link to="/post">
                                <Button
                                    sx={navbarStyles.sellButtonOnRight}
                                    variant='contained'
                                    color='error'
                                    startIcon={<CameraAltIcon />} >
                                    <Typography sx={navbarStyles.sellButtonTextOnRight}>Sat</Typography>
                                </Button>
                            </Link>
                        </Box>
                    )}
                </Toolbar>
                <Toolbar sx={navbarStyles.mobileToolbar}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Grid container>
                                <Grid item xs={2}>
                                    <IconButton size='small' edge='start' onClick={openMenu}>
                                        <MenuIcon sx={navbarStyles.mobileNavbarHamburgerMenuIcon} />
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
                                            <Grid container>
                                                <Grid item xs={1} sx={navbarStyles.drawerCloseIconGrid}>
                                                    <IconButton size='medium' edge='start' onClick={closeMenu}>
                                                        <CloseIcon sx={navbarStyles.drawerCloseIcon} />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={5}>
                                                    <IconButton
                                                        edge='start'
                                                        color="inherit"
                                                        aria-label="logo"
                                                        sx={navbarStyles.drawerLogoIconButton}
                                                    >
                                                        <img src={MobileLogo} width={'60'} height={'28'} />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <List sx={navbarStyles.drawerMenuList} aria-label="contacts">
                                                <ListItem sx={navbarStyles.drawerAvatarListItem}>
                                                    <ListItemAvatar>
                                                        <Avatar sx={navbarStyles.drawerAvatar}>
                                                            <Face2Icon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary="Hesabına Gir"
                                                        secondary="Hesabına giriş yap"
                                                        sx={navbarStyles.drawerAvatarListItemText}
                                                    />
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton sx={navbarStyles.drawerMenuListItemButton}>
                                                            <ListItemIcon sx={navbarStyles.mobileNavbarListItemIcon}>
                                                                <CameraAltIcon />
                                                            </ListItemIcon>
                                                        <ListItemText primary="Satmaya Başla" />
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton sx={navbarStyles.drawerMenuListItemButton}>
                                                            <ListItemIcon sx={navbarStyles.drawerMenuListItemIcon}>
                                                                <FavoriteIcon />
                                                            </ListItemIcon>
                                                        <ListItemText primary="İlanlarım" />
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton sx={navbarStyles.drawerMenuListItemButton}>
                                                            <ListItemIcon sx={navbarStyles.drawerMenuListItemIcon}>
                                                                <MessageIcon />
                                                            </ListItemIcon>
                                                        <ListItemText primary="Sohbet" />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton sx={navbarStyles.drawerMenuListItemButton}>
                                                            <ListItemIcon sx={navbarStyles.drawerMenuListItemIcon}>
                                                                <HelpIcon />
                                                            </ListItemIcon>
                                                        <ListItemText primary="Yardım" />
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                            <Container sx={navbarStyles.drawerLoginButtonContainer}>
                                                <Button
                                                    variant="contained"
                                                    color="error" size='large'
                                                    sx={navbarStyles.drawerLoginButton}
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
                                        sx={navbarStyles.mobileTopLogo}
                                    >
                                        <img src={MobileLogo} width={'60'} height={'28'} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Box>
                                <ListItem sx={navbarStyles.mobileLocationListItem}>
                                    <ListItemText primary="İstanbul, Türkiye" sx={navbarStyles.mobileLocationListItemText} />
                                    <ListItemIcon sx={navbarStyles.mobileLocationListItemIcon}>
                                        <LocationOnIcon />
                                    </ListItemIcon>
                                </ListItem>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper component="form" sx={navbarStyles.mobileSearchPaper}>
                                <IconButton color="primary" sx={navbarStyles.mobileSearchIconButton} aria-label="directions">
                                    <SearchOutlinedIcon />
                                </IconButton>
                                <InputBase
                                    sx={navbarStyles.mobileSearchInputBase}
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
                <DialogTitle id="responsive-dialog-title" sx={{ p: 0 }}>
                    <IconButton onClick={handleClose} sx={navbarStyles.dialogTitle}>
                        <CloseIcon sx={navbarStyles.dialogTitleClose} />
                    </IconButton>
                </DialogTitle>
                <LoginModal />
            </Dialog>
        </AppBar >
    )
}

export default Navbar