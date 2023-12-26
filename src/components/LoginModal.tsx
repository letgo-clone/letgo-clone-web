import React, { useEffect, useState } from 'react'
import { Typography, Grid, Button, DialogContent, DialogActions, DialogTitle, IconButton, TextField } from '@mui/material'
import Carousel from 'react-material-ui-carousel'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Logo from '../assets/img/logo.svg'

import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { setLoginData } from '../redux/store';

import { HandleLoginToken, Request } from '../helpers/Request';

function Item(props) {
    return (
        <>
            <Grid container sx={{ paddingBottom: '20px' }}>
                <Grid lg={12} md={12} xs={12} sm={12} sx={{ textAlign: 'center', marginBottom: '10px' }}>
                    <img src={props.item.image} width={100} height={100} />
                </Grid>
                <Grid lg={12} md={12} xs={12} sm={12} sx={{ paddingBottom: '10px' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '16px', fontWeight: 500 }}>{props.item.description}</Typography>
                </Grid>
            </Grid>
        </>
    )
}

const LoginModal = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passLogin, setPassLogin] = useState(false);

    const hanldeLogin = () => setShowLogin(!showLogin);

    const dispatch = useDispatch();

    let items = [
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

    useEffect(() => {
        if(localStorage.getItem('access_token')){
            const loginVerify = async () => {
                const requestUrl = "/account/session";
                const getData = await Request("GET", requestUrl);

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
                    <DialogContent sx={{ marginBottom: '20%' }}>
                        <Grid container spacing={2}>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginBottom: '20px' }}>
                                <Carousel animation={'slide'} autoPlay={false} swipe={true}>
                                    {
                                        items.map((item, i) => <Item key={i} item={item} />)
                                    }
                                </Carousel>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: 'grid' }}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        color: '#ff3f55',
                                        textTransform: 'none',
                                        border: '4px solid transparent',
                                        outline: 'red solid 2px',
                                        borderRadius: 5,
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        '&:hover': { bgcolor: '#FFFFFF', border: '4px solid #ff3f55', color: '#ff3f55' },
                                    }}
                                    color="error"
                                >
                                    Telefonla devam et
                                </Button>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: 'grid' }}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        color: '#ff3f55',
                                        textTransform: 'none',
                                        border: '4px solid transparent',
                                        outline: 'red solid 2px',
                                        borderRadius: 5,
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        '&:hover': { bgcolor: '#FFFFFF', border: '4px solid #ff3f55', color: '#ff3f55' },
                                    }}
                                    color="error"
                                >
                                    Google ile devam et
                                </Button>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: 'grid' }}>
                                <Button
                                    onClick={hanldeLogin}
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        color: '#ff3f55',
                                        textTransform: 'none',
                                        border: '4px solid transparent',
                                        outline: 'red solid 2px',
                                        borderRadius: 5,
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        '&:hover': { bgcolor: '#FFFFFF', border: '4px solid #ff3f55', color: '#ff3f55' },
                                    }}
                                    color="error"
                                >
                                    E-posta adresiyle devam et
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Grid container sx={{ textAlign: 'center' }}>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginBottom: '10px' }}>
                                <Typography sx={{ fontSize: '12px', color: '#004BBE' }}>
                                    Aydınlatma metnimizi okuyunuz
                                </Typography>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginBottom: '20px' }}>
                                <Typography sx={{ fontSize: '12px', color: '#424242' }}>
                                    Devam ederek bu şartları kabul etmiş olursun:<span style={{ color: "#004BBE" }}> letgo Şartlar ve Koşulları </span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogActions>
                </>
            ) : (
                <>
                    <DialogTitle id="responsive-dialog-title" sx={{ position: 'absolute', p: 0 }}>
                        <IconButton onClick={hanldeLogin} sx={{ float: 'left', marginTop: '10px' }}>
                            <ArrowBackIcon sx={{ fontSize: '1.5rem' }} />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ marginBottom: '20%', overflowY: 'visible' }}>
                        <form
                            method='POST'
                            onSubmit={formik.handleSubmit}
                        >
                            <Grid container spacing={2}>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ textAlign: 'center' }}>
                                    <img src={Logo} width={74} height={47} />
                                </Grid>
                                {!showPassword ? (
                                    <>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginBottom: '20px' }}>
                                            <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#2c2c2c', textAlign: 'center' }}>
                                                E-posta adresini gir
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginBottom: '20px' }}>
                                            <TextField
                                                fullWidth
                                                size='small'
                                                id="email"
                                                name="email"
                                                placeholder='E-posta adresi'
                                                sx={{
                                                    border: '1px solid #2c2c2c',
                                                    borderRadius: 2
                                                }}
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginBottom: '20px' }}>
                                            <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#2c2c2c', textAlign: 'center', marginBottom:'10px' }}>
                                                Şifreni gir
                                            </Typography>
                                            <Typography sx={{ fontSize: '14px', color: '#2c2c2c', textAlign: 'center' }}>
                                                Tekrar hoş geldin <span style={{ fontWeight: 700 }}> {formik.values.email} </span>
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginBottom: '20px' }}>
                                            <TextField
                                                fullWidth
                                                size='small'
                                                id="password"
                                                name="password"
                                                type='password'
                                                placeholder='Şifreni Gir'
                                                sx={{
                                                    border: '1px solid #2c2c2c',
                                                    borderRadius: 2
                                                }}
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </>
                                )}

                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginBottom: '20px', display: 'grid' }}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            backgroundColor: '#ff3f55',
                                            color: '#FFFFFF',
                                            textTransform: 'none',
                                            border: '6px solid transparent',
                                            fontSize: '16px',
                                            borderRadius: 15,
                                            '&:hover': { bgcolor: '#FFFFFF', border: '6px solid #ff3f55', color: '#ff3f55' },
                                        }}
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