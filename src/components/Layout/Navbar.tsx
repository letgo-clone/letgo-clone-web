import React, { useState, MouseEvent, useEffect } from 'react';

// Material UI elements
import { 
    Grid, 
    Box, 
    Button, 
    AppBar, 
    Toolbar, 
    IconButton, 
    MenuItem, 
    Container, 
    Paper, 
    Drawer, 
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
    ArrowBack,
    Menu as MenuIcon } from '@mui/icons-material';

// Material UI styles
import { navbarStyles, authUserMenuStyle, searchStyles } from '../../styles';

// Logo
import Logo from '../../assets/img/logo.svg'
import MobileLogo from '../../assets/img/logo-mobile.svg'

// Components
import LoginModal from '../LoginModal';
import SearchBar from '../common/SearchBar';

// helper
import { Request } from '../../helpers/Request';


// React Router
import { Link, useNavigate } from 'react-router-dom';

// Redux
import store,{ removeAllData} from '../../redux/store';
import { LoginData } from '../../redux/interface';

// interfaces
import { NavbarAreaProps } from './layout';

const Navbar: React.FC<NavbarAreaProps> = ({isLogin}) => {

    // React router elements
    const navigate = useNavigate();

    // Redux
    const loginData = store.getState().authUser?.loginData;
    const searchDrawer = store.getState().searchDrawer?.searchDrawer;

    // useState elements
    const [mobileNav, setMobileNav] = useState<null | HTMLElement>(null);
    const [mobileSearchDiv, setSearchDiv] = useState<null | HTMLElement>(null);
    const [profilePopover, setProfilePopover] = React.useState<null | HTMLElement>(null);
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [userData, setUserData] = useState<LoginData>({});

    /*
        Gets user data in redux state
    */
    useEffect(() => {
        if(loginData){
            setUserData(loginData)
        }
    },[loginData])

    /*
        turns on and off the search grid
    */
    useEffect(() => {
        closeSearchDiv();
    },[searchDrawer])
    
    // Mobile navbar drawer
    const openMobileMenu = (event: MouseEvent<HTMLElement>) => {
        setMobileNav(event.currentTarget);
    }
    const closeMobileMenu = () => {
        setMobileNav(null)
    }

    // Mobile Search
    const openSearchDiv = (event: MouseEvent<HTMLElement>) => {
        setSearchDiv(event.currentTarget);
    }

    const closeSearchDiv = () => {
        setSearchDiv(null)
    }

    // Login Dialog
    const handleLoginOpen = () => {
        setLoginOpen(true);
        setMobileNav(null);
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
        const result = await Request({
            method: 'GET',
            url: url
        });
  
        if(result){
            removeAllData();
            navigate('/');
            location.reload()
        }
    }

    // Sell Button
    const handleSellButton = () => {
        if(isLogin){
            navigate('/post')
        }else{
            handleLoginOpen()
        }
    }

    const handleAdsButton = () => {
        if(isLogin){
            navigate('/profile/myads');
        }else{
            handleLoginOpen()
        }
    }
    return (
        <AppBar position="static" sx={navbarStyles.appBar}>
            <Container maxWidth='lg' sx={navbarStyles.container}>
                {/* Desktop navbar */}
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
                    <SearchBar dimension={'desktop'} />
                     {/* Right menu content according to login */}
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
                                            <Avatar sx={navbarStyles.authAvatar} src={userData.photo?.url}></Avatar>
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
                                            src={userData.photo?.url}
                                            sx={navbarStyles.authMenuAvatar}
                                        />
                                        <Typography sx={navbarStyles.authMenuAvatarText}>{userData?.fullname}</Typography>
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
                                    <MenuItem component="a" onClick={() => handleAdsButton()}>
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
                            <Button
                                sx={navbarStyles.authMenuSellButton}
                                variant='contained'
                                color='error'
                                startIcon={<CameraAlt />} 
                                onClick={() => handleSellButton()}
                            >
                                <Typography sx={navbarStyles.authMenuSellButtonText}>Sat</Typography>
                            </Button>
                        </Box>
                    ): (
                        <Box sx={navbarStyles.rightButtonsGrid}>
                            <Button onClick={handleLoginOpen} sx={navbarStyles.loginButtonOnRight}>
                                <Typography sx={navbarStyles.loginButtonTextOnRight}>Giriş</Typography>
                            </Button>
                            <Button
                                sx={navbarStyles.authMenuSellButton}
                                variant='contained'
                                color='error'
                                startIcon={<CameraAlt />} 
                                onClick={() => handleSellButton()}
                            >
                                <Typography sx={navbarStyles.authMenuSellButtonText}>Sat</Typography>
                            </Button>
                        </Box>
                    )}
                </Toolbar>
                {/* Mobile navbar */}
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
                                                <Grid item xl={12} md={12} sm={12} xs={12}>
                                                    <Grid container>
                                                        <Grid item xs={1} sx={navbarStyles.drawerCloseIconGrid}>
                                                            <IconButton size='medium' edge='start' onClick={closeMobileMenu}>
                                                                <Close sx={navbarStyles.drawerCloseIcon} />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={11}>
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
                                                        {isLogin ? (
                                                            <>
                                                            <ListItem sx={navbarStyles.drawerMobileAvatarListItem}>
                                                                <ListItemAvatar>
                                                                    <Avatar sx={navbarStyles.drawerAvatar} src={userData.photo?.url}></Avatar>
                                                                </ListItemAvatar>
                                                                <Typography
                                                                    sx={navbarStyles.drawerAvatarLoginText}
                                                                >{userData?.fullname}</Typography>
                                                            </ListItem>
                                                            <Box onClick={handleProfileClose} sx={navbarStyles.drawerProfileButtonItem}>
                                                                <Button
                                                                    href="/editProfile/info"
                                                                    variant="outlined"
                                                                    sx={navbarStyles.authMobileMenuProfileButton}
                                                                    color="error"
                                                                    type="submit"
                                                                >
                                                                    Profili görüntüle ve düzenle
                                                                </Button>
                                                            </Box>
                                                            </>
                                                        ): (
                                                            <ListItem 
                                                                sx={navbarStyles.drawerAvatarListItem}
                                                                onClick={handleLoginOpen}
                                                            >
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
                                                        )}
                                                    
                                                        <Divider />
                                                        <ListItem disablePadding>
                                                            <ListItemButton 
                                                                sx={navbarStyles.drawerMenuListItemButton}
                                                                onClick={() => handleSellButton()}
                                                            >
                                                                    <ListItemIcon sx={navbarStyles.drawerMenuListItemIcon}>
                                                                        <CameraAlt />
                                                                    </ListItemIcon>
                                                                <ListItemText primary="Satmaya Başla" />
                                                            </ListItemButton>
                                                        </ListItem>
                                                        <ListItem disablePadding>
                                                            <ListItemButton 
                                                                sx={navbarStyles.drawerMenuListItemButton}
                                                                onClick={() => handleAdsButton()}
                                                            >
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
                                                        {isLogin && (
                                                            <>
                                                            <Divider />
                                                            <ListItem disablePadding>
                                                                <ListItemButton 
                                                                    sx={navbarStyles.drawerMenuListItemButton} 
                                                                    onClick={() => {
                                                                        handlelogout();
                                                                        closeMobileMenu();
                                                                    }}
                                                                >
                                                                        <ListItemIcon sx={navbarStyles.drawerMenuListItemIcon}>
                                                                            <Logout />
                                                                        </ListItemIcon>
                                                                    <ListItemText primary="Çıkış" />
                                                                </ListItemButton>
                                                            </ListItem>
                                                            </>
                                                        )}
                                                    </List>
                                                    {!isLogin && (
                                                    <Container sx={navbarStyles.drawerLoginButtonContainer}>
                                                        <Button
                                                            onClick={handleLoginOpen}
                                                            variant="contained"
                                                            color="error" 
                                                            size='large'
                                                            sx={navbarStyles.drawerLoginButton}
                                                        >Giriş</Button>
                                                    </Container>
                                                    )}
                                                </Grid>
                                            </Grid>
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
                            <Box onClick={openSearchDiv}>
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
                                    inputProps={{
                                        readOnly: true
                                    }}
                                    onClick={openSearchDiv}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
             {/* Login dialog for logging in */}
            {loginOpen && <LoginModal isLogin={loginOpen} handleClose={handleLoginClose} />}

            <Drawer
                anchor={'top'}
                open={Boolean(mobileSearchDiv)}
                onClose={closeSearchDiv}
                PaperProps={{
                    sx: {
                        height: '100%',
                        maxHeight: 'none',
                    },
                }}
            >
                <Box sx={searchStyles.drawerBoxTitle}>
                    <IconButton onClick={closeSearchDiv} sx={searchStyles.drawerBoxLeftIcon}>
                        <ArrowBack sx={searchStyles.dialogTitleClose} />
                    </IconButton>
                </Box>
                <Box sx={searchStyles.dialogContent}>
                    <SearchBar dimension='mobile'/>
                </Box>
            </Drawer>
        </AppBar >
    )
}

export default Navbar