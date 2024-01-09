import { SxProps, Theme } from "@mui/material";
import { CSSProperties } from "react";

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
        padding: '6px 25px 6px 25px'
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
        marginLeft: 0,
        padding:'8px 0px 5px 0px'
    },

    // Drawer menu list area
    drawerMenuList: {
        width: '100%', 
       
        bgcolor: 'background.paper' 
    },
    drawerAvatarListItem: {
        marginTop: '20px',
        marginBottom: '20px',
        paddingLeft: 0
    },
    drawerMobileAvatarListItem: {
        marginTop: '20px',
        marginBottom: '10px',
        paddingLeft: 0
    },
    drawerAvatar: {
        width: 50,
        height: 50
    },
    drawerAvatarListItemText: {
        marginLeft: '10px'
    },
    drawerAvatarLoginText: {
        fontWeight: 600, 
        marginLeft: '10px', 
        fontSize: '20px'
    },
    drawerProfileButtonItem: {
        display: 'grid',
        marginRight: '20px',
        marginBottom:'25px',
    },
    authMobileMenuProfileButton: {
        backgroundColor: '#ff3f55',
        color: '#FFFFFF',
        textTransform: 'none',
        border: '6px solid transparent',
        padding: '0px 25px 0px 25px',
        fontSize: '16px',
       
        borderRadius: 15,
        '&:hover': { bgcolor: '#FFFFFF', border: '6px solid #ff3f55', color: '#ff3f55' },
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
        marginLeft: '0px',
        p:'10px 0px 5px 0px'
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
        pt: 0.1
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

export const searchStyles: Record<string, SxProps<Theme> | undefined> = {

    // Location Input
    selectLocation: {
        flex: 1
    },
    selectLocationListItem: {
        padding: '0.6px'
    },

    // Search Input
    inputSearchGrid: {
        paddingLeft: '1%'
    },
    inputSearchPaper: { 
        display: 'flex', 
        alignItems: 'center', 
        border: '1px solid #c4baba', 
        boxShadow: '0', 
        p: '0px', 
        width: '100%',
        '&:hover': {
            borderColor: '#000000'
        }
    },
    inputSearchErrorPaper: {
        display: 'flex', 
        alignItems: 'center', 
        border: '1px solid red', 
        boxShadow: '0', 
        p: '0px', 
        width: '100%' 
    },
    inputSearchAreaInputBase: {
        ml: 1.5, 
        flex: 1, 
        pt: 0.5,
        color:'#000000',
        fontWeight: 500 
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

    // Mobile
    drawerBoxTitle : {
        p:'5px',
    },
    drawerBoxLeftIcon: {
        float: 'left'
    },
    drawerBoxRightIcon: {
        float: 'right',
        position: 'relative',
        bottom: '50px',
        color: '#ff3f55',
        p:0,
        borderRadius: 0,
        fontSize: '12px',
        fontWeight: 600,
        borderBottom: '3px solid #ff3f55'
    },
    dialogTitleClose: {
        fontSize: '2rem' 
    },
    dialogContent: {
        backgroundColor: '#e0e0e0',
        height: '100%'
    },
    inputMobileSearchGrid: {
        paddingLeft: '0',
        marginBottom: '15px',
        marginTop: '10px'
    },
    mobileSelectLocation: {
        backgroundColor: '#ffffff',
    },
    mobileSearchIcon: {
        margin: '5px 25px 8px 5px',
        fontSize: '25px',
        color:'gray'
    },

    // Category
    dialogMainBox: {
        display: {
            xl: 'none',
            lg: 'none',
            md: 'block',
            sm: 'block',
            xs: 'block'
        },
    },
    dialogCategoryBox: {
        marginTop: '25px'
    },
    dialogCategoryTitle: {
        textTransform: 'uppercase',
        color: '#424242',
        fontSize: '12px',
        marginTop: '20px'
    },
    dialogCategoryList: {
        padding:0,
        marginTop: '10px'
    },
    dialogCategoryListItem: {
        p: '0px 10px 10px 0px'
    },
    dialogCategoryListItemButton: {
        padding: '10px 5px 15px 0px'
    },
    dialogCategoryText: {
        color: '#2c2c2c'
    },

    // Recent Search
    dialogRecentSearchListItem: {
        p: '0px 5px 5px 0px'
    },
    dialogRecentSearchListItemButton: {
        padding: '5px 5px 5px 10px'
    },
    dialogRecentSearchText: {
        color: '#2c2c2c',
        fontSize: '14px',
        fontWeight: 700
    }
}

export const subNavbarStyles: Record<string, SxProps<Theme> | undefined> = {
    appBar: {
        bgcolor: 'hsla(0,0%,100%,.87)', 
        boxShadow: 1,
        display: {
            xl: 'flex',
            lg: 'flex',
            md: 'flex',
            sm: 'none',
            xs: 'none'
        }
    },
    container: {
        marginTop: '5px',
        marginBottom: '2px',
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
        fontWeight: 400,
        textTransform: 'capitalize',
        margin: '0px 8px'
    }
}

export const footerStyles: Record<string, SxProps<Theme> | undefined> = {
    container: {
        marginTop: '5%',
        position: 'relative',
        left: 0,
        bottom: 0,
        right: 0,
    },
    gridContainer: {
        display: { 
            md: 'flex', 
            xs: 'none' 
        }
    },
    footerHead: {
        color: '#000000',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '13px',
        lineHeight: '20px',
        textTransform: 'uppercase',
    },
    footerContent: {
        marginTop: '15px',
        marginBottom: {lg: '35px', xs: '20px', sm: '20px'},
        paddingLeft: '0px',
        listStyleType: 'none',
    },
    footerContentText: {
        color: '#2c2c2c',
        fontSize: '12px',
        paddingBottom: '6px'
    },

    // Mobile footer styles
    mobileFooterContainer: {
        display: { 
            md: 'none', 
            xs: 'flex' 
        } 
    },
    mobileFooterAccordingDetail: {
        backgroundColor: '#f5f5f5', 
        padding: '8px 12px 16px'
    },
    mobileFooterLastAccordingGrid : {
        marginTop: '10px'
    },
    mobileFooterLastAccordingTitle: {
        padding: '10px 0px 10px 20px' 
    },
    mobileFooterBetweenAppIconGrid: {
        marginTop: '20px', 
        marginBottom:'10px'
    },
    mobileFooterBetweenLeftAppIconGrid: {
        paddingRight:'5px',
        textAlign: 'end'
    },
    mobileFooterBetweenRightAppIconGrid: {
        paddingRight:'5px'
    },

    // Footer bottom Styles
    bottomFooterContainer: {
        backgroundColor: '#ff3f55'
    },
    bottomFooterGridContainer: {
        marginTop: '25px', 
        marginBottom: '15px', 
        color: '#FFFFFF', 
        fontSize: '12px'
    },
    bottomFooterLeftTitle: {
        textAlign: { 
            xs: 'center', 
            md: 'left', 
            marginBottom: '10px', 
            fontWeight: 600 
        } 
    },
    bottomFooterLeftContentGrid: {
        textAlign: 'center', 
        marginBottom: '30px', 
        display: { 
            md: 'inline-flex', 
            xs: 'block' 
        } 
    },
    bottomFooterLeftContent: {
        display: 'inline-block', 
        margin: '0px 4px 0px 0px', 
        fontSize: '12px', 
        lineHeight: '18px', 
        fontWeight: 300
    },
    bottomFooterRightContent: {
        textAlign: { 
            md: 'right', 
            xs: 'center',
        },
        display: {
            xl:'inline-flex', 
            lg: 'inline-flex'
        }
    },
    bottomFooterRightText: {
        fontWeight: '600', 
        fontSize: '12px',
        paddingRight: '12px'
    }
}

export const adCardStyles: Record<string, SxProps<Theme> | undefined> = {
    card: {
        maxWidth: '345px'
    },
    cardMediaBox: {
        position: 'relative',
        padding: '7px 7px 7px 7px'
    },
    cardRightAction: {
        position: 'absolute',
        top: '0',
        left: '93%',
        transform: 'translateX(-50%)'
    },
    cardRightActionIconButton: {
        padding: 0 
    },
    cardMedia: {
        display: 'flex',
        height: '140px',
    },
    cardPartnerMedia: {
        display: 'flex',
        width: '160px',
        height: '114px',
        marginLeft: '18%',
    },
    cardLeftAction: {
        position: 'absolute',
        top: '0',
        left: '20%',
        transform: 'translateX(-50%)'
    },
    cardLeftActionChip: {
        height: '18px !important',
        backgroundColor: '#ffd200 !important',
        fontSize: '10px !important',
    },
    cardLeftActionChipPartner: {
        height: '18px !important',
        fontSize: '10px !important',
        border:'0 !important',
    },

                                // Card Content
    // box area for status

    cardContentFeaturedBox: {
        borderLeft: '5px solid #ffd200'
    },
    cardContentNewStatusBox: {
        borderLeft: '5px solid #004bbe'
    },
    cardContentFreeStatusBox: {
        borderLeft: 'none'
    },
    
    cardContent: {
        color: '#2c2c2c' 
    },
    cardContentPrice: {
        fontSize: '20px', 
        fontWeight: '700'
    },

    // Card Footer
    cardFooterGrid: {
        paddingRight: '10px',
        paddingLeft: '10px',
    },
    cardFooterLocation: {
        fontSize: '10px' 
    },
    cardFooterDateText: {
        textAlign: 'right', 
        fontSize: '10px'
    },

    // Card footer for partner 
    cardPartnerFooter: {
        display: 'grid'
    },
    cardPartnerCallButton: {
        backgroundColor: '#ff3f55',
        color: '#FFFFFF',
        borderRadius: '50px',
        border: '3px solid #ff3f55',
        '&:hover': { 
            backgroundColor: '#FFFFFF', 
            border: '3px solid #ff3f55', 
            color: '#ff3f55' 
        },
    }
    
}

export const loginModalStyles: Record<string, SxProps<Theme> | undefined> = {
    // Carousel
    carouselGrid: {
        paddingBottom: '20px'
    },
    carouselImgGrid: {
        textAlign: 'center', 
        marginBottom: '10px' 
    },
    carouselTextGrid: {
        paddingBottom: '10px', 
        marginLeft: '20px', 
        marginRight: '20px'
    },
    carouselText: {
        textAlign: 'center', 
        fontSize: '16px', 
        fontWeight: 500,
        height: '50px'
    },
    buttonGrid: {
        display: 'grid'
    },
    buttons: {
        backgroundColor: '#FFFFFF',
        color: '#ff3f55',
        textTransform: 'none',
        border: '4px solid transparent',
        outline: 'red solid 2px',
        borderRadius: 5,
        fontSize: '16px',
        fontWeight: 700,
        '&:hover': { bgcolor: '#FFFFFF', border: '4px solid #ff3f55', color: '#ff3f55' },
    },
    footerModalGridContainer: {
        textAlign: 'center', 
        marginTop: '50%',
        display: 'inline-block' 
    },
    footerModalFirstGrid: {
        marginBottom: '10px'
    },
    footerModalFristText: {
        fontSize: '12px', 
        color: '#004BBE' 
    },
    footerModalSecondGrid: {
        marginBottom: '20px',
        display: 'contents'
    },
    footerModalSecondText:{
        fontSize: '12px', 
        color: '#424242' 
    },

                    // Login area
    dialogTitle: {
        p: 0
    },
    dialogTitleClose: {
        fontSize: '2.5rem' 
    },
    dialogTitleArrowButton: {
        float: 'left', 
        marginTop: '10px'
    },
    dialotTitleCloseButton: {
        float: 'right', 
        marginTop: '5px'
    },
    dialogTitleIcon : {
        fontSize: '1.5rem'
    },
    dialogContent: {
        marginBottom: '20%', 
        overflowY: 'visible',
        height: '584px'
    },
    iconGrid : {
        textAlign: 'center'
    },
    // input area
    InputsText: {
        fontSize: '20px', 
        fontWeight: 700, 
        color: '#2c2c2c', 
        textAlign: 'center'
    },
    InputsGrid: {
        marginBottom: '20px', 
        marginTop: '20px'
    },
    Input: {
        borderRadius: 2
    },
    // password area
    passwordWelcomeGrid: {
        display : 'inline-flex',
        marginTop: '10px',
        textAlign: 'center'
    },
    passwordWelcomeText: {
        fontSize: '14px', 
        color: '#2c2c2c', 
        textAlign: 'center', 
    },
    passwordWelcomeInfo: {
        fontWeight: 700, 
        fontSize: '14px'
    },
    forwardButtonGrid: {
        marginBottom: '20px', 
        display: 'grid'
    },
    forwardButton: {
        backgroundColor: '#ff3f55',
        color: '#FFFFFF',
        textTransform: 'none',
        border: '6px solid transparent',
        fontSize: '16px',
        borderRadius: 15,
        '&:hover': { 
            bgcolor: '#FFFFFF', 
            border: '6px solid #ff3f55', 
            color: '#ff3f55' 
        },
    },
    forwardButtonBottomText: {
        fontSize: '12px', 
        color: '#004BBE', 
        textAlign: 'center'
    }
}


export const advertDetailCarouselStyles = {
    carouselImg: {
        maxHeight: '400px', 
        width: 'auto', 
        height: '100%' 
    }
}

export const advertDetailStyles: Record<string, SxProps<Theme> | undefined> = {
    mainBox: {
        backgroundColor: '#f1f1f1', 
        paddingTop: '20px', 
        paddingBottom: '20px'
    },
                        // Left Column = Carousel, Detail and Description boxs
    leftColumnGrid: {
        width: { 
            xl: '96%', 
            lg: '96%', 
            md: '100%', 
            sm: '100%', 
            xs: '100%' 
        },
        backgroundColor: '#FFFFFF',
        marginBottom: { md: '10px', sm: '20px', xs: '20px' }
    },

     // Carousel
    carouselBox: {
        backgroundColor: '#616161', 
        maxHeight: '400px', 
        width: 'auto', 
        height: '100%',
        overflow: 'hidden',
        textAlign:'center'
    },

    // Left column cards
    leftColumnInfoGrid: {
        padding: '20px'
    },
    leftColumnInfoText: {
        fontSize: '20px', 
        lineHeight: '20px', 
        fontWeight: 700, 
        color: '#2c2c2c', 
        marginTop: '10px', 
        marginBottom: '10px'
    },
    leftColumnDescription: {
        fontSize: '14px', 
        lineHeight: '20px', 
        fontWeight: 400, 
        color: '#2c2c2c', 
        marginTop: '10px', 
        marginBottom: '10px'
    },

                    // Right Column: Price, Seller, Location cards
    rightColumnCards: {
        minWidth: 275,
        paddingLeft: '10px'
    },
    rightColumnCardContent: {
        padding: '16px 16px 16px 8px'
    },
    rightColumnPriceText: {
        fontSize: '32px', 
        lineHeight: '32px', 
        fontWeight: 700, 
        color: '#2c2c2c'
    },
    rightColumnPriceTitle: {
        fontSize: 14, 
        marginTop: '10px'
    },
    rightColumnPriceIconsGrid: {
        textAlign: 'right' 
    },
    rightColumnsGrid: {
        marginTop: '20px'
    },
    rightColumnLocationText: {
        fontSize: '12px', 
        lineHeight: '20px', 
        fontWeight: 400, 
        color: '#424242'
    },
    // Seller card
    rightColumnSellerAvatar: {
        width: '68px', 
        height: '68px'
    },
    rightColumnSellerFullname: {
        fontSize: '20px', 
        lineHeight: '20px', 
        fontWeight: 700, 
        color: '#2c2c2c', 
        marginTop: '20px' 
    },
    rightColumnSellerIconGrid: {
        textAlign: 'right', 
        marginTop: '10px' 
    },
    rightColumnSellerButtonGrid: {
        marginLeft: '8px', 
        marginRight: '18px', 
        display: 'grid', 
        marginBottom: '20px'
    },
    rightColumnSellerButton: {
        backgroundColor: '#FFFFFF',
        color: '#ff3f55',
        borderRadius: '50px',
        border: '3px solid transparent',
        outline: '#ff3f55 solid 3px',
        textTransform: 'none',
        '&:hover': { 
            backgroundColor: '#FFFFFF', 
            border: '3px solid #ff3f55', 
            color: '#ff3f55' 
        },
    },

    // Location card
    rightColumnLocationTitle: {
        fontSize: '20px', 
        lineHeight: '20px', 
        fontWeight: 700, 
        color: '#2c2c2c', 
        marginTop: '10px',
        marginBottom: '10px'
    },
    rightColumnLocation: {
        display: 'grid', 
        marginBottom: '20px' 
    },

    // Advert info area
    rightColumnAdvertInfoText: {
        fontSize: '14px', 
        marginTop: '10px', 
        color: '#2c2c2c', 
        fontWeight: 'bolder'
    },
    rightColumnAdvertComplaint: {
        fontSize: '12px', 
        color: '#ff3f55', 
        fontWeight: 700, 
        textTransform: 'uppercase', 
        marginTop: '10px',
        textAlign: 'right'
    }
}

export const advertSearchStyles: Record<string, SxProps<Theme> | undefined> = {
                            // Left Filter Columns
    leftFilterGrid: {
        marginTop: '30px',
        paddingRight: '22px'
    },

    // Title
    leftFilterTitleLink: {
        fontSize: '12px', 
        fontWeight: 400,
        color: '#424242'
    },
    leftFilterTitle: {
        fontSize: '24px', 
        fontWeight: 600
    },
    leftFilterAccording: {
        boxShadow: 'none'
    },
    leftFilterAccordingSummary: {
        padding:0
    },
    leftFilterCardsTitle: {
        flexShrink: 0, 
        fontWeight: 700, 
        textTransform: 'uppercase'
    },

    // Filter Price 
    textBetweenPriceFilter: {
        textAlign: 'center', 
        marginTop: '10px'
    },
    priceFilterButton: {
        color: '#FFFFFF',
        backgroundColor: '#ff3f55',
        borderRadius: 5,
        border: '3px solid #ff3f55',
        textTransform: 'none',
        padding: 0,
        '&:hover': { 
            backgroundColor: '#FFFFFF', 
            color: '#ff3f55', 
            border: '3px solid #ff3f55' 
        },
    },

                             // Top Right Filter Columns
    rightFilterGrid: {
        marginTop: '15%',
        marginBottom: '10px',
        borderBottom: '1px solid #0000001f'
    },
    rightFilterInfoBox: {
        display :'flex',
        marginTop: '14px'
    },
    rightFilterInfo: {
        marginBottom: '15px',
        fontSize: '14px',
        fontWeight: 200
    },
    rightFilterCount: {
        borderRadius: 2,
        backgroundColor: '#99b7e5',
        color: '#000000',
        fontWeight: 600,
        fontSize: '12px',
        marginTop: '7px'
    },
    rightSortingFilterText: {
        fontSize: '14px', 
        fontWeight: 600, 
        marginTop: 1.8, 
        textTransform: 'uppercase',
        textAlign: 'right'
    },
    rightSortingFilter: {
        textAlign: 'left'
    }
}

export const homeBannerStyles: Record<string, CSSProperties | undefined > = {
    bannerDesktop: {
        width: '100%',
        height: 'auto',
    },
    bannerMobile: {
        width: '100%',
        height: 'auto'
    },
}

export const homePageStyles: Record<string, CSSProperties | SxProps<Theme>  | undefined > = {
    bannerDiv: {
        marginTop: '10px',
        display :'block'
    },
    bannerDesktopBox: {
        display: {
            xl: 'block', 
            lg: 'block', 
            md: 'block', 
            sm: 'none', 
            xs: 'none'
        }
    },
    bannerMobileBox: {
        display: {
            xl: 'none', 
            lg: 'none', 
            md: 'none', 
            sm : 'block', 
            xs: 'block'
        },
       
    },
    bannerContainer: {
        position: 'absolute',
        bottom: '30px',
        left: '16px'
    },
    bannerButton: {
        padding: {lg: '10px 50px 10px 50px', md: '10px 50px 10px 50px', sm: '10px 40px 10px 40px'},
        backgroundColor: '#ff3f55',
        marginRight:'20px',
        textTransform: 'none',
        color: '#FFFFFF',
        borderRadius: '50px',
        border: '3px solid #ff3f55',
        '&:hover': { 
            backgroundColor: '#ff3f55', 
            border: '3px solid #ff3f55', 
            color: '#FFFFFF' 
        },
    },
    homeTitle: {
        marginTop: '25px',
        marginBottom: '15px',
        fontSize: '24px',
        fontWeight: 200
    },
    
    // Mobile Category
    dialogMainBox: {
        display: {
            xl: 'none',
            lg: 'none',
            md: 'none',
            sm: 'block',
            xs: 'block'
        },
        marginTop: '25px'
    },
    dialogCategoryBox: {
        marginTop: '25px',
        overflow: 'auto',
        whiteSpace: 'nowrap'
    },
    dialogCategoryTitle: {
        textTransform: 'none',
        color: '#424242',
        fontSize: '14px',
        display: 'contents',
        fontWeight: 500
    },
    dialogCategoryRightTitle: {
        float: 'right',
        color: '#ff3f55',
        borderBottom: '2px solid #ff3f55',
        fontSize: '14px',
        fontWeight: 700
    },
    dialogCategoryList: {
        padding:0,
        marginTop: '10px'
    },
    dialogCategoryListItem: {
        p: '0px 10px 10px 0px',
        display: 'inline-block',
        width: 'auto',
    },
    dialogCategoryListItemButton: {
        padding: '10px 5px 15px 0px',
        display : 'inline-block',
        textAlign: 'center',
        marginLeft: '20px',
        marginRight: '30px'
    },
    dialogCategoryIcon: {
        display: 'inline-flex',
        minWidth: 'auto'
    },
    dialogCategoryAvatar: {
        textAlign: 'center'
    },
    dialogCategoryText: {
        color: '#2c2c2c'
    },

    drawerBoxTitle : {
        p:'5px',
    },
    drawerBoxLeftIcon: {
        float: 'left'
    },
    drawerBoxRightIcon: {
        float: 'right',
        position: 'relative',
        bottom: '50px',
        color: '#ff3f55',
        p:0,
        borderRadius: 0,
        fontSize: '12px',
        fontWeight: 600,
        borderBottom: '3px solid #ff3f55'
    },
    dialogTitleClose: {
        fontSize: '2rem' 
    },

    leftCategoryTabs: {
        borderRight: 1, 
        borderColor: 'divider'
    },
    leftCategoryTab: {
        justifyContent: 'flex-start',
        '&.Mui-selected': {
            color: '#2c2c2c',
            backgroundColor: '#e0e0e0'
        },
        minHeight: '54px',
        maxWidth: '100%',
        border: '1px solid #e0e0e0'
    },

    rightCategoryListItem: {
        padding: 0,
        display: 'contents'
    },
    rightCategoryListItemButton: {
        padding: '0', 
        border: '1px solid #e0e0e0',
        maxWidth: '100%', 
        minHeight: '54px'
    },
    rightCategoryListItemText: {
        paddingLeft: '20px', 
        color: '#2c2c2c' 
    }
}

export const homePostAdvertStyles: Record<string, SxProps<Theme>  | undefined > = {
    topTitle: {
        fontSize: '24px', 
        fontWeight: 700, 
        textTransform: 'uppercase', 
        marginTop: '15px', 
        marginBottom: '15px', 
        textAlign: 'center'
    },
    containerGrid: {
        border: '1px solid #e0e0e0', 
        borderRadius: '8' 
    },
    categoryColumnTitle: {
        fontSize: '16px', 
        fontWeight: 700, 
        lineHeight: 1.5, 
        margin: '25px 15px 15px 30px' 
    },

    // Left category column
    leftCategoryGrid: {
        marginBottom: '20px' 
    },
    leftCategoryTabs: {
        borderRight: 1, 
        borderColor: 'divider'
    },
    leftCategoryTab: {
        justifyContent: 'flex-start',
        '&.Mui-selected': {
            color: '#2c2c2c',
            backgroundColor: '#e0e0e0'
        },
        minHeight: '54px',
        maxWidth: '100%',
        border: '1px solid #e0e0e0'
    },

    // right category column
    rightCategoryListItem: {
        padding: 0,
        display: 'contents'
    },
    rightCategoryListItemButton: {
        padding: '0', 
        border: '1px solid #e0e0e0',
        maxWidth: '100%', 
        minHeight: '54px'
    },
    rightCategoryListItemText: {
        paddingLeft: '20px', 
        color: '#2c2c2c' 
    }
}

// pages/Post/attributes and pages/Post/Edit
export const postAdvertStyles: Record<string, SxProps<Theme>  | undefined > = {
    toptTile: {
        fontSize: '24px', 
        fontWeight: 700, 
        textTransform: 'uppercase', 
        marginTop: '25px', 
        textAlign: 'center' 
    },
    mainGrid: {
        border: '1px solid #e0e0e0', 
        borderRadius: 2 
    },
    subTitle: {
        fontSize: '16px', 
        fontWeight: 700, 
        lineHeight: 1.5, 
        margin: '25px 15px 15px 25px'
    },
    breadCrumbGrid: {
        marginLeft: '25px', 
        marginRight: '25px', 
        paddingBottom: '25px', 
        display: 'inline-flex', 
        borderBottom: '1px solid #e0e0e0',
       
    },
    breadCrumbText: {
        fontSize: '14px',
        color: '#00000099' 
    },
    breadCrumbChangeText: {
        color: '#ff3f55',
        fontSize: '14px', 
        marginLeft: '20px', 
        fontWeight: 700, 
        '&.hover': { 
            borderBottom: 'none' 
        }
    },
    // Inputs
    inputGrids: {
        marginLeft: '25px', 
        marginRight: '25px',
        borderBottom: '1px solid #e0e0e0'
    },
    inputTopTitles: {
        fontSize: '16px', 
        fontWeight: 700, 
        lineHeight: 1.5, 
        margin: '25px 15px 15px 0px' 
    },
    inputsGridContainer: {
        display: 'inline-block', 
        paddingBottom: '25px' 
    },

    // file column
    fileInputGrid: {
        display: 'inline-block', 
        paddingTop: '25px', 
        paddingBottom: '25px', 
        marginTop: '10px', 
        marginLeft: '10px'
    },
    fileInputValidationText: {
        color : '#ff3f55', 
        fontSize: '12px', 
        marginTop: '30px'
    },
    fileInputImageGrid: {
        marginTop: '25px', 
        marginBottom: '25px'
    },
    fileInputImageBox: {
        position: 'relative', 
        margin: '0px 20px 20px 0px' 
    },
    fileInputIconBox: {
        position: 'absolute', 
        top: 0, 
        right: 0, 
        padding: '5px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end'
    },
    fileInputIconButton: {
        backgroundColor: '#000000', 
        borderRadius: 3, 
        '&:hover': {
            backgroundColor :'#000000'
        }
    },
    fileInputImageCloseInput: {
        fontSize: '21px',
        color: '#ffffff' 
    },
    fileInputImageText: {
        position: 'absolute', 
        bottom: '10px', 
        left: '50px', 
        backgroundColor: 'red',
        color: 'white', 
        padding: '3px',
        borderRadius: '5px', 
        margin: '5px',
        fontSize: '12px',
        fontWeight: 300
    },

    // location column
    locationInputTopTitle: {
        fontSize: '16px', 
        fontWeight: 700, 
        lineHeight: 1.5, 
        margin: '25px 0px 35px 15px' 
    },
    locationInputGrid: {
        display: 'inline-block', 
        paddingBottom: '25px', 
        marginLeft: '0px', 
        marginRight: '5px'
    },

    // Profile
    profileGridContainer: {
        display: 'inline-flex', 
        paddingBottom: '25px', 
        marginTop: '20px', 
        marginLeft: '3px'
    },
    profileGridImage: {
        position: 'relative', 
        marginRight: '35px'
    },
    sendButtonGrid: {
        textAlign: 'center', 
        marginTop: '30px', 
        marginBottom: '30px'
    },
    sendButton: {
        backgroundColor: '#ff3f55',
        color: '#FFFFFF',
        textTransform: 'none',
        border: '6px solid transparent',
        padding: 1.4,
        fontSize: '16px',
        borderRadius: 15,
        '&:hover': { bgcolor: '#FFFFFF', border: '6px solid #ff3f55', color: '#ff3f55' },
    }
}

// pages/Profile/index.tsx
export const profileEditStyles: Record<string, SxProps<Theme>  | undefined > = {
    mainGrid: {
        marginTop: 4 
    },
    profileViewButton: {
        backgroundColor: '#FFFFFF',
        color: '#ff3f55',
        borderRadius: '50px',
        border: '3px solid transparent',
        outline: '#ff3f55 solid 3px',
        textTransform: 'none',
        padding: '0px 100px 0px 100px',
        '&:hover': { 
            ackgroundColor: '#FFFFFF', 
            border: '3px solid #ff3f55', 
            color: '#ff3f55' 
        },
    },
    profileEditGrid: {
        border: '1px solid #e0e0e0',
        borderRadius: '5px',
    },
    profileEditTitleGrid: {
        borderBottom: '1px solid #e0e0e0',
        padding: '25px 0px 15px 25px'
    },
    profileEditTitle: {
        fontSize: '20px',
        lineHeight: '24px',
        fontWeight: 700
    },
    basicInputGrid: {
        borderBottom: '1px solid #e0e0e0',
        padding: '25px 0px 15px',
        marginLeft: '20px'
    },
    basicInputTitle: {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 700,
        marginBottom: '15px'
    },
    InputsGrid: {
        display: 'inline-block' 
    },
    contactInputsGrid: {
        borderBottom: '1px solid #e0e0e0',
        padding: '25px 0px 15px 25px',
    },
    contactInputTitle: {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 700,
        marginBottom: '15px'
    },
    contactAdornment: {
        borderRight: '1px solid #e0e0e0', 
        paddingRight: '10px', 
        fontSize: '12px'
    },
    buttonsGrid: {
        borderBottom: '1px solid #e0e0e0',
        padding: '25px 0px 15px 25px',
    },
    cancelButton: {
        display: 'inline-block',
        fontSize: '16px',
        fontWeight: 700,
        color: '#ff3f55',
        marginTop: '15px',
        borderBottom: '1px solid #ff3f55'
    },
    saveButtonGrid: {
        textAlign: 'right'
    },
    saveButton: {
        backgroundColor: '#ff3f55',
        color: '#FFFFFF',
        textTransform: 'none',
        border: '6px solid transparent',
        padding: '7px 5px 7px 5px',
        fontSize: '16px',
        marginRight: '15px',
        marginBottom: '5px',
        borderRadius: 15,
        '&:hover': { 
            bgcolor: '#FFFFFF', 
            border: '6px solid #ff3f55', 
            color: '#ff3f55' 
        },
    }
}

// pages/Profile/MyAdsView.tsx
export const adViewStyles: Record<string, SxProps<Theme>  | undefined > = {
    mainGrid: {
        marginTop: '25px' 
    },
    topMenuBox: {
        display: 'inline-flex',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '15px'
    },
    topMenuText: {
        color: '#2c2c2c',
        paddingRight: '20px'
    },
    adCard: {
        minWidth: 275,
        boxShadow: '0 1px 3px 0 rgba(0,47,52,.2), 0 1px 3px 0 rgba(0,47,52,.2)',
        borderLeft: '4px solid #004bbe'
    },
    cardTitleGrid: {
        display: 'inline-flex' 
    },
    defaultImageCardBox: {
        backgroundColor: '#c8c0c0',
        padding: '18px'
    },
    defaultImageIcon: {
        color: 'black'
    },
    adTitle: {
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: 700,
        color: '#2c2c2c',
        paddingLeft: '15px',
        paddingTop: '20px'
    },
    adPrice: {
        fontSize: '14px',
        color: '#2c2c2c',
        marginTop: '28px'
    },
    adStatusButton: {
        backgroundColor: '#004bbe',
        color: '#ffffff',
        fontSize: '10px',
        fontWeight: 400,
        marginTop: '23px',
        padding: '4px 35px'
    },
    // ad right column elements
    adRightColumnGrid: {
        paddingTop: { 
            xl: '24px', 
            lg: '24px', 
            md: '24px', 
            sm: '0', 
            xs: '0' 
        }
    },
    adStatusGridOfRightColumn:{
        textAlign: { 
            xl: 'center', 
            lg: 'center', 
            md: 'center', 
            xs: 'start', 
            sm: 'start' 
        },
    },
    adStatusText: {
        fontSize: '14px',
        lineHeight: 1.5,
        color: '#2c2c2c',
        marginTop: '28px'
    },
    adActionIconGrid: {
        textAlign: 'right'
    },

    // ad footer
    cardActions: {
        borderTop: '1px solid #e0e0e0'
    },
    cardFavoriteStatusGrid: {
        display: 'inline-flex'
    },
    adFavoriteIcon: {
        width: '16px', 
        height: '16px', 
        paddingRight: '4px', 
        paddingTop: '4px'
    },
    adFavoriteText: {
        fontSize: '10px',
        fontWeight: 700,
        lineHeight: '15px',
        paddingTop: '6px'
    },
    rightButtonsBox: {
        textAlign: 'right'
    },
    rightButtons: {
        backgroundColor: '#FFFFFF',
        color: '#ff3f55',
        borderRadius: '50px',
        border: '2px solid transparent',
        outline: '#ff3f55 solid 2px',
        textTransform: 'none',
        fontSize: '12px',
        marginRight: '20px',
        padding: '2px 10px 2px 10px',
        '&:hover': { 
            backgroundColor: '#FFFFFF', 
            border: '2px solid #ff3f55', 
            color: '#ff3f55' 
        },
    }

}

// pages/Profile/profileView.tsx
export const profileViewStyles: Record<string, SxProps<Theme>  | undefined > = {
    mainBox: {
        marginTop: '25px'
    },
    profileInfoBox: {
        paddingLeft: '45px', 
        marginBottom: '25px'
    },
    profileImageBox: {
        display: 'flex', 
        justifyContent: 'center'
    },
    profileImage: {
        width: 120, 
        height: 120, 
        alignSelf: 'center'
    },
    profileFullname: {
        fontSize: '24px',
        lineHeight: '24px',
        fontWeight: 700,
        marginTop: '25px'
    },
    profileListItem: {
        paddingLeft: '0'
    },
    profileListItemAvatar: {
        minWidth: '35px'
    },
    editProfileButtonBox: {
        display :'grid'
    },
    editProfileButton: {
        backgroundColor: '#ff3f55',
        color: '#FFFFFF',
        textTransform: 'none',
        border: '6px solid transparent',
        fontSize: '16px',
        marginRight: '15px',
        marginBottom: '5px',
        borderRadius: 15,
        '&:hover': { bgcolor: '#FFFFFF', border: '6px solid #ff3f55', color: '#ff3f55' },
    }
}