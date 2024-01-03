import React, { useEffect, useState } from 'react'

// Material UI elements
import { 
    Typography, 
    Grid, 
    Button, 
    DialogContent, 
    Box, 
    DialogTitle, 
    IconButton, 
    TextField 
    } from '@mui/material'

// Material UI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// styles and assets
import { loginModalStyles } from '../styles';
import Logo from '../assets/img/logo.svg'

// Other packages
import Carousel from 'react-material-ui-carousel'
import { useFormik } from "formik";

// Redux
import { setLoginData, useAppDispatch } from '../redux/store';

// Helpers
import { HandleLoginToken, Request } from '../helpers/Request';

const LoginModal = () => {
    // Redux
    const dispatch = useAppDispatch();
    
    // useState
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passLogin, setPassLogin] = useState<boolean>(false);
    
    // Login area on/off
    const hanldeLogin = () => setShowLogin(!showLogin);

    // Carousel Items
    const caroselItems: {image: string, description: string}[] = [
        {
            image: "https://statics.olx.com.tr/external/base/img/letgo/loginEntryPointPost.webp",
            description: "letgo'yu daha güvenli bir hale getirmeye sen de destek ol"
        },
        {
            image: "https://statics.olx.com.tr/external/base/img/letgo/loginEntryPointFavorite.webp",
            description: "İletişime geç ve daha hızlı anlaşmaya var"
        },
        {
            image: "https://statics.olx.com.tr/external/base/img/letgo/loginEntryPointChat.webp",
            description: "Tüm favori ürünlerini tek bir yerde kaydet"
        }
    ];

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            const email = values.email;
            const password = values.password;

            if (email) {
                setShowPassword(true)
            }
            if(password){
               const data = await HandleLoginToken(email,password);

               if(!data.error){
                    setPassLogin(true);
               }
            }
        }
    });

    // Login verification
    useEffect(() => {
        if(localStorage.getItem('access_token')){
            const loginVerify = async () => {
                
                const requestUrl = "/account/session";
                const getData = await Request({
                    method: 'GET',
                    url: requestUrl
                });

                dispatch(setLoginData(getData));
                location.reload();
            }
            loginVerify();
        }
    },[passLogin])

    return (
        <>
            {!showLogin ? (
                <>
                    {/* First page of login modal  */}
                    <DialogContent>
                        <Grid container spacing={2}>
                            {/* Carousel */}
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Carousel animation={'slide'} autoPlay={false} swipe={true}>
                                    {
                                        caroselItems.map((item, i) => (
                                            <Grid key={i} container sx={loginModalStyles.carouselGrid}>
                                                <Grid lg={12} md={12} xs={12} sm={12} sx={loginModalStyles.carouselImgGrid}>
                                                    <img src={item.image} width={100} height={100} />
                                                </Grid>
                                                <Grid lg={12} md={12} xs={12} sm={12} sx={loginModalStyles.carouselTextGrid}>
                                                    <Typography sx={loginModalStyles.carouselText}>{item.description}</Typography>
                                                </Grid>
                                            </Grid>
                                        ))
                                    }
                                </Carousel>
                            </Grid>
                              {/* Buttons */}
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.buttonGrid}>
                                <Button
                                    variant="outlined"
                                    sx={loginModalStyles.buttons}
                                    color="error"
                                >
                                    Telefonla devam et
                                </Button>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.buttonGrid}>
                                <Button
                                    variant="outlined"
                                    sx={loginModalStyles.buttons}
                                    color="error"
                                >
                                    Google ile devam et
                                </Button>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.buttonGrid}>
                                <Button
                                    onClick={hanldeLogin}
                                    variant="outlined"
                                    sx={loginModalStyles.buttons}
                                    color="error"
                                >
                                    E-posta adresiyle devam et
                                </Button>
                            </Grid>
                        </Grid>
                        {/* Modal footer */}
                        <Grid container sx={loginModalStyles.footerModalGridContainer}>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.footerModalFirstGrid}>
                                <Typography sx={loginModalStyles.footerModalFristText}>
                                    Aydınlatma metnimizi okuyunuz
                                </Typography>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.footerModalSecondGrid}>
                                <Typography sx={loginModalStyles.footerModalSecondText}>
                                    Devam ederek bu şartları kabul etmiş olursun: &nbsp;
                                </Typography>
                                <Typography sx={loginModalStyles.footerModalFristText}> 
                                    letgo Şartlar ve Koşulları 
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </>
            ) : (
                <>
                    {/* Login modal elements */}
                    <DialogTitle id="responsive-dialog-title" sx={loginModalStyles.dialogTitle}>
                        <IconButton onClick={hanldeLogin} sx={loginModalStyles.dialogTitleIconButton}>
                            <ArrowBackIcon sx={loginModalStyles.dialogTitleIcon} />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={loginModalStyles.dialogContent}>
                        <form
                            method='POST'
                            onSubmit={formik.handleSubmit}
                        >
                            <Grid container spacing={2}>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.iconGrid}>
                                    <img src={Logo} width={74} height={47} />
                                </Grid>
                                {!showPassword ? (
                                    <>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Typography sx={loginModalStyles.InputsText}>
                                                E-posta adresini gir
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.emailInputGrid}>
                                            <TextField
                                                fullWidth
                                                size='small'
                                                id="email"
                                                name="email"
                                                placeholder='E-posta adresi'
                                                sx={loginModalStyles.emailInput}
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Typography sx={loginModalStyles.InputsText}>
                                                Şifreni gir
                                            </Typography>
                                            <Box sx={loginModalStyles.passwordWelcomeGrid}>
                                                <Typography sx={loginModalStyles.passwordWelcomeText}>
                                                    Tekrar hoş geldin&nbsp;
                                                </Typography>
                                                <Typography sx={loginModalStyles.passwordWelcomeInfo}> {formik.values.email} </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.InputsGrid}>
                                            <TextField
                                                fullWidth
                                                size='small'
                                                id="password"
                                                name="password"
                                                type='password'
                                                placeholder='Şifreni Gir'
                                                sx={loginModalStyles.Input}
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </>
                                )}

                                <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.forwardButtonGrid}>
                                    <Button
                                        variant="outlined"
                                        sx={loginModalStyles.forwardButton}
                                        color="error"
                                        type="submit"
                                    >
                                        Devam et
                                    </Button>
                                    <Typography sx={{ fontSize: '12px', color: '#004BBE', textAlign: 'center' }}>
                                        Aydınlatma metnimizi okuyunuz
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                </>
            )}
        </>
    )
}

export default LoginModal