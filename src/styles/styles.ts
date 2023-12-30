import { SxProps, Theme } from "@mui/material";

export const navbarStyles: Record<string, SxProps<Theme> | undefined> = {
    appBar: {
        bgcolor: 'hsla(0,0%,100%,.87)', 
        boxShadow: 1 
    },
    container: {
        marginTop: '5px',
        marginBottom: '5px',
        paddingRight: { sm: '0px' },
        paddingLeft: { sm: '0px' }
    },
    toolbar: {
        paddingRight: { sm: '0px' },
        paddingLeft: { sm: '0px', xs: '0' },
        display: { md: 'flex', xs: 'none' }
    },
    logoIconButton: {
        display: { md: 'flex', xs: 'none' }
    },
    selectLocation: {
        flex: 1
    },
    selectLocationListItem: {
        padding: '0.6px'
    },
    selectLocationListItemFirstIcon: {
        minWidth: '20%'
    },
    inputSearchGrid: {
        paddingLeft: '1%'
    },
    inputSearchPaper: { 
        display: 'flex', 
        alignItems: 'center', 
        border: '1px solid #c4baba', 
        boxShadow: '0', 
        p: '0px', 
        width: '100%' 
    },
    inputSearchAreaInputBase: {
        ml: 1, 
        flex: 1, 
        pt: 1 
    },
    searchInputIconButton: {
        p: '12px',
        color: '#FFFFFF',
        backgroundColor: '#2c2c2c',
        borderRadius: '0px 2px 2px 0px',
        '&:hover': { 
            color: 'FFFFFF', 
            backgroundColor: '#2c2c2c' 
        }
    },
    // Right auth elements
    rightButtonsGrid: {
        display: { md: 'contents', sm: 'contents', xs: 'none' }
    },
    authBoxGrid: {
        display: 'contents'
    },
    authIconsGrid: {
        paddingLeft: '24px'
    },
    authAvatarIconGrid: {
        paddingRight: '24px'
    },
    authAvatarIconButton: {
        ml: 2
    },
    authAvatar: {
        width: 32,
        height: 32,
        marginRight: '5px'
    },
    authMenuAvatar: {
        width: '56px !important',
        height: '56px !important',
    },
    authMenuAvatarText: {
        fontSize: '20px',
        lineHeight: '24px',
        fontWeight: 700,
        paddingLeft: '15px'
    },
    authMenuProfileButton: {
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
    },
    authMenuSellButton: {
        color: '#FFFFFF',
        backgroundColor: '#ff3f55',
        borderRadius: 5,
        border: '4px solid white',
        '&:hover': { backgroundColor: '#FFFFFF', color: '#ff3f55' },
        padding: '6px 15px 6px 15px'
    },
    authMenuSellButtonText: {
        fontWeight: '600', 
        textTransform: 'none'
    },

    // Right non auth elements
   
    loginButtonOnRight: {
        color: '#ff3f55',
        marginLeft:'24px'
    },
    loginButtonTextOnRight: {
        fontSize: '16px',
        fontWeight: '600', 
        borderBottom: '2px solid #ff3f55', 
        textTransform: 'none'
    },
    sellButtonOnRight: {
        color: '#FFFFFF',
        backgroundColor: '#ff3f55',
        borderRadius: 5,
        border: '4px solid white',
        '&:hover': { 
            backgroundColor: '#FFFFFF', 
            color: '#ff3f55' 
        },
        padding: '6px 15px 6px 15px'
    },
    sellButtonTextOnRight: {
        fontWeight: '600', 
        textTransform: 'none'
    },

                            // Mobile Menu Styles
    mobileToolbar: {
        paddingRight: 0,
        paddingLeft: 0,
        display: { md: 'none' }
    },

    // Close ıcon and logo area
    mobileNavbarHamburgerMenuIcon: {
        fontSize: '2.0rem'
    },

    // Drawer styles start
    drawerCloseIconGrid: {
        marginTop: '1px' 
    },
    drawerCloseIcon : {
        fontSize: '2.5rem' 
    },
    drawerLogoIconButton: {
        marginTop: '10px',
        marginLeft: '1px'
    },

    // Drawer menu list area
    drawerMenuList: {
        width: '100%', 
        maxWidth: 360, 
        bgcolor: 'background.paper' 
    },
    drawerAvatarListItem: {
        marginTop: '20px',
        marginBottom: '20px',
        paddingLeft: 0
    },
    drawerAvatar: {
        width: 50,
        height: 50
    },
    drawerAvatarListItemText: {
        marginLeft: '10px'
    },
    drawerMenuListItemButton: {
        paddingLeft: 0 
    },
    drawerMenuListItemIcon: {
        minWidth: '45px'
    },
    drawerLoginButtonContainer: {
        display: 'inline-grid',
        paddingLeft: 0, 
        paddingRight: 0 
    },
    drawerLoginButton: {
        borderRadius: 5,
        backgroundColor: '#ff3f55',
        textTransform: 'none',
        marginTop: '20px',
        padding: '10px'
    },
    // Drawer styles end

    mobileTopLogo: {
        marginLeft: '3px'
    },
    mobileLocationListItem: {
        paddingRight: 0
    },
    mobileLocationListItemText:{
        color: '#2c2c2c', 
        fontWeight: '600', 
        textAlign: 'end'
    },
    mobileLocationListItemIcon: {
        minWidth: { 
            xs: '0' 
        }
    },
    mobileSearchPaper: {
        display: 'flex', 
        alignItems: 'center', 
        border: '1px solid #c4baba', 
        boxShadow: '0', 
        p: '0px'
    },
    mobileSearchIconButton: {
        color: '#2c2c2c', 
        backgroundColor: '#FFFFFF', 
        borderRadius: '0px 2px 2px 0px'
    },
    mobileSearchInputBase: {
        ml: 1, 
        flex: 1, 
        pt: 1
    },

    // Dialog content style
    dialogTitle : {
        float: 'right'
    },
    dialogTitleClose: {
        fontSize: '2.5rem' 
    }
} 

export const authUserMenuStyle = {
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
    }
}

export const subNavbarStyles: Record<string, SxProps<Theme> | undefined> = {
    appBar: {
        bgcolor: 'hsla(0,0%,100%,.87)', 
        boxShadow: 1
    },
    container: {
        marginTop: '5px',
        marginBottom: '5px',
        paddingRight: { sm: '0px' },
        paddingLeft: { sm: '0px' }
    },
    toolbar: {
        minHeight: { 
            sm: '30px' },
        marginBottom: '7px'
    },
    allCategoryButton: {
        color: '#2c2c2c',
        fontSize: '14px',
        fontWeight: 700,
        lineHeight: '16.1px',
        textTransform: 'uppercase',
    },
    allCategoryMenu: {
        marginTop: '1.5%'
    },
    allCategoryGrid: {
        margin: '40px 40px' 
    },
    allCategoryBox: {
        marginBottom: '40px'
    },
    allCategoryTitle: {
        color: '#2c2c2c',
        fontSize: '14px',
        lineHeight: 1.5,
        fontWeight: 700,
        textTransform: 'capitalize',
        margin: '0px 8px 8px 8px',
    },
    allCategoryContentA : {
        color: '#2c2c2c',
        fontSize: '14px',
        lineHeight: 1.5,
        fontWeight: 300,
        paddingBottom: '8px',
        margin: '0px 8px',
    },
    firstSixCategoryBox: {
        textAlign: 'left', 
        marginLeft: '30px', 
        display : 'inline-flex'
    },
    firstSixCategoryMenuItem: {
        display: 'contents'
    },
    firstSixCategoryText: {
        color: '#2c2c2c',
        fontSize: '14px',
        lineHeight: 1.5,
        fontWeight: 300,
        textTransform: 'capitalize',
        margin: '0px 8px'
    }
}