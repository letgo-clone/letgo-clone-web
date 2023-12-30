import React, { useState, MouseEvent } from 'react';

// Material UI elements
import { 
    Grid, 
    Box, 
    Button, 
    AppBar, 
    Toolbar, 
    IconButton, 
    MenuItem, 
    FormControl, 
    Container, 
    Paper, 
    Select, 
    Drawer, 
    Dialog, 
    DialogTitle, 
    Menu, 
    Tooltip, 
    Divider,
    Avatar,
    ListItemAvatar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    InputBase,
    Typography } from "@mui/material"

// Material UI Icons
import { 
    SearchOutlined, 
    LocationOn, 
    CameraAlt, 
    Close, 
    Favorite, 
    Message, 
    Help, 
    Face2,
    Sms, 
    Notifications,
    ExpandMore,
    Logout, 
    Menu as MenuIcon } from '@mui/icons-material';

// Material UI styles
import { navbarStyles, authUserMenuStyle } from '../../styles/navbarStyles';

// Logo
import Logo from '../../assets/img/logo.svg'
import MobileLogo from '../../assets/img/logo-mobile.svg'

// Components
import LoginModal from '../LoginModal';
import { Request } from '../../helpers/Request';

// React Router
import { Link, useNavigate } from 'react-router-dom';

// Redux
import { useSelector } from "react-redux";
import { removeAllData } from '../../redux/store';

interface NavbarAreaProps {
    isLogin: boolean
}

const Navbar: React.FC<NavbarAreaProps> = ({isLogin}) => {

    // React router elements
    const navigate = useNavigate();
    const { loginData } = useSelector((state) => state.authUser);

    // useState elements
    const [mobileNav, setMobileNav] = useState<null | HTMLElement>(null);
    const [profilePopover, setProfilePopover] = React.useState<null | HTMLElement>(null);
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    
    // Mobile navbar drawer
    const openMobileMenu = (event: MouseEvent<HTMLElement>) => {
        setMobileNav(event.currentTarget);
    }
    const closeMobileMenu = () => {
        setMobileNav(null)
    }

    // Login Dialog
    const handleLoginOpen = () => {
        setLoginOpen(true);
        setMobileNav(null)
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

   // Profile avatar Menu
    const LoginOpen = Boolean(profilePopover);

    const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
        setProfilePopover(event.currentTarget);
    };
    const handleProfileClose = () => {
        setProfilePopover(null);
    };

   
    // Logout
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
                                                <LocationOn />
                                            </ListItemIcon>
                                            <ListItemText primary="İstanbul, Türkiye" />
                                        </ListItem>
                                    </MenuItem>
                                    <MenuItem value="06">
                                        <ListItem sx={navbarStyles.selectLocationListItem}>
                                            <ListItemIcon>
                                                <LocationOn />
                                            </ListItemIcon>
                                            <ListItemText primary="Ankara" />
                                        </ListItem>
                                    </MenuItem>
                                    <MenuItem value="35">
                                        <ListItem sx={navbarStyles.selectLocationListItem}>
                                            <ListItemIcon>
                                                <LocationOn />
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
                                    <SearchOutlined />
                                </IconButton>
                            </Paper>
                        </Grid>
                    </Grid>
                    {isLogin ? (
                        <Box sx={navbarStyles.rightButtonsGrid}>
                            <Grid container sx={navbarStyles.authBoxGrid}>
                                <Grid item xl={1} lg={1} md={1} sx={navbarStyles.authIconsGrid}>
                                    <IconButton>
                                        <Sms />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={1} lg={1} md={1} sx={navbarStyles.authIconsGrid}>
                                    <IconButton>
                                        <Notifications />
                                    </IconButton>
                                </Grid>
                                <Grid item xl={1} lg={1} md={1} sx={navbarStyles.authAvatarIconGrid}>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleProfileOpen}
                                            size="small"
                                            sx={navbarStyles.authAvatarIconButton}
                                            aria-controls={LoginOpen ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={LoginOpen ? 'true' : undefined}
                                        >
                                            <Avatar sx={navbarStyles.authAvatar} src={loginData.photo.url}></Avatar>
                                            <ExpandMore />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Menu
                                    anchorEl={profilePopover}
                                    id="account-menu"
                                    open={LoginOpen}
                                    onClose={handleProfileOpen}
                                    onClick={handleProfileClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {authUserMenuStyle}
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleProfileClose}>
                                        <Avatar
                                            src={loginData.photo.url}
                                            sx={navbarStyles.authMenuAvatar}
                                        />
                                        <Typography sx={navbarStyles.authMenuAvatarText}>{loginData.fullname}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleProfileClose}>
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
                                    <MenuItem component="a" href="/profile/myads" onClick={handleProfileClose}>
                                        <ListItemIcon>
                                            <Favorite fontSize="small" />
                                        </ListItemIcon>
                                        İlanlarım
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => { 
                                        handleProfileClose();
                                        handlelogout();
                                    }}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
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
                                    startIcon={<CameraAlt />} >
                                    <Typography sx={navbarStyles.authMenuSellButtonText}>Sat</Typography>
                                </Button>
                            </Link>
                        </Box>
                    ): (
                        <Box sx={navbarStyles.rightButtonsGrid}>
                            <Button onClick={handleLoginOpen} sx={navbarStyles.loginButtonOnRight}>
                                <Typography sx={navbarStyles.loginButtonTextOnRight}>Giriş</Typography>
                            </Button>
                            <Link to="/post">
                                <Button
                                    sx={navbarStyles.sellButtonOnRight}
                                    variant='contained'
                                    color='error'
                                    startIcon={<CameraAlt />} >
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
                                    <IconButton size='small' edge='start' onClick={openMobileMenu}>
                                        <MenuIcon sx={navbarStyles.mobileNavbarHamburgerMenuIcon} />
                                    </IconButton>
                                    <Drawer
                                        anchor={'top'}
                                        open={Boolean(mobileNav)}
                                        onClose={closeMobileMenu}
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
                                                    <IconButton size='medium' edge='start' onClick={closeMobileMenu}>
                                                        <Close sx={navbarStyles.drawerCloseIcon} />
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
                                                            <Face2 />
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
                                                                <CameraAlt />
                                                            </ListItemIcon>
                                                        <ListItemText primary="Satmaya Başla" />
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton sx={navbarStyles.drawerMenuListItemButton}>
                                                            <ListItemIcon sx={navbarStyles.drawerMenuListItemIcon}>
                                                                <Favorite />
                                                            </ListItemIcon>
                                                        <ListItemText primary="İlanlarım" />
                                                    </ListItemButton>
                                                </ListItem>
                                                <ListItem disablePadding>
                                                    <ListItemButton sx={navbarStyles.drawerMenuListItemButton}>
                                                            <ListItemIcon sx={navbarStyles.drawerMenuListItemIcon}>
                                                                <Message />
                                                            </ListItemIcon>
                                                        <ListItemText primary="Sohbet" />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                                <ListItem disablePadding>
                                                    <ListItemButton sx={navbarStyles.drawerMenuListItemButton}>
                                                            <ListItemIcon sx={navbarStyles.drawerMenuListItemIcon}>
                                                                <Help />
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
                                        <LocationOn />
                                    </ListItemIcon>
                                </ListItem>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper component="form" sx={navbarStyles.mobileSearchPaper}>
                                <IconButton color="primary" sx={navbarStyles.mobileSearchIconButton} aria-label="directions">
                                    <SearchOutlined />
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
                fullScreen={false}
                open={loginOpen}
                onClose={handleLoginClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" sx={{ p: 0 }}>
                    <IconButton onClick={handleLoginClose} sx={navbarStyles.dialogTitle}>
                        <Close sx={navbarStyles.dialogTitleClose} />
                    </IconButton>
                </DialogTitle>
                <LoginModal />
            </Dialog>
        </AppBar >
    )
}

export default Navbar