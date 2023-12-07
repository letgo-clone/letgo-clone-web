import React, { useState, useEffect } from 'react'
import {
    Container, Typography, Grid, MenuItem, InputLabel, TextField, InputAdornment, Divider,
    Alert, Tab, Tabs, Breadcrumbs, Link, Box, Table, TableCell, TableHead, TableRow, ListItem,
    List, ListItemAvatar, Avatar, ListItemText, Button, Switch, Card, CardMedia
} from '@mui/material'

import profileImage from '../../assets/img/profile-logo.jpeg'
import ImageOutlinedIcon from '../../assets/img/image-icon.png';
import CallIcon from '@mui/icons-material/Call';

import { useFormik } from 'formik';
import { Request, RequestPublic } from '../../helpers/Request';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { setLoginData } from '../../redux/store';
import { useSelector, useDispatch } from "react-redux";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function Attributes() {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);

    const dispatch = useDispatch();
    const { loginData } = useSelector((state) => state.authUser);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const [cities, setCities] = useState({});
    const [counties, setCounties] = useState({});

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            city_id: '',
            county_id: '',
            how_status: '',
            fullname: loginData.fullname,
            photo: []
        },
        onSubmit: async (values) => {
            const title = values.title;
            const description = values.description;
            const price = values.price;
            const city_id = values.city_id;
            const county_id = values.county_id;
            const fullname = values.fullname;
            const howStatus = values.how_status

            const formdata: FormData = new FormData();
            formdata.append("title", title);
            formdata.append("description", description);
            const filesArray = Array.from(values.photo);

            filesArray.forEach((file, index) => {
                formdata.append('photo', file);
            });

            formdata.append("how_status", howStatus);
            formdata.append("price", price);
            formdata.append("city_id", city_id);
            formdata.append("county_id", county_id);
            const url = "/advert/actual";

            const response = await Request('POST', url, formdata);

            if (response.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "İşlem tamamlanıyor.",
                    showConfirmButton: false,
                    timer: 1500
                });
                if (loginData.fullname != fullname) {
                    const formdata: FormData = new FormData();
                    formdata.append("fullname", fullname);

                    const url = '/account/session/user';
                    await Request('PUT', url, formdata);

                    const newLoginData = {
                        fullname: fullname,
                    }
                    dispatch(setLoginData(newLoginData));
                }
                navigate('/');
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Bi hata oluştu",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    })

    useEffect(() => {
        const getCities = async () => {
            const url = "/advert/location";
            const getData = await RequestPublic('GET', url);
            setCities(getData);
        }
        getCities();
    }, [])

    useEffect(() => {
        const getCounties = async () => {
            const url = "/advert/location/" + formik.values.city_id;
            const getData = await RequestPublic('GET', url);
            setCounties(getData);
        }
        getCounties();
    }, [formik.values.city_id]);


    return (
        <Container>
            <Typography sx={{ fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', marginTop: '25px', textAlign: 'center' }}>
                İlan Yayınla
            </Typography>
            <Grid container sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, margin: '25px 15px 15px 25px' }}>
                    SEÇİLEN KATEGORİ
                </Typography>
                <Grid container>
                    <form
                        method='POST'
                        onSubmit={formik.handleSubmit}
                        encType='multipart/form-data'
                    >
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ marginLeft: '25px', paddingBottom: '25px', display: 'inline-flex', borderBottom: '1px solid #e0e0e0' }}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link underline="hover" color="inherit" href="/">
                                    Araba
                                </Link>
                                <Typography color="text.primary">Araba</Typography>
                            </Breadcrumbs>
                            <Typography sx={{ color: '#ff3f55', fontSize: '14px', marginLeft: '20px', fontWeight: 700, borderBottom: '1px solid #ff3f55', '&.hover': { borderBottom: 'none' } }}>Değiştir</Typography>
                        </Grid>
                        <Divider />
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ marginLeft: '25px', marginRight: '25px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, margin: '25px 15px 15px 0px' }}>
                                BİRAZ BİLGİ EKLE
                            </Typography>
                            <Grid container spacing={3} sx={{ display: 'inline-block', borderBottom: '1px solid #e0e0e0', paddingBottom: '25px' }}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <InputLabel shrink htmlFor="how_status">
                                        Durum
                                    </InputLabel>
                                    <TextField
                                        id="outlined-select-currency"
                                        fullWidth
                                        select
                                        size="small"
                                        name="how_status"
                                        value={formik.values.how_status}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value="Yeni">Yeni</MenuItem>
                                        <MenuItem value="Yeni gibi">Yeni gibi</MenuItem>
                                        <MenuItem value="İyi">İyi</MenuItem>
                                        <MenuItem value="Makul">Makul</MenuItem>
                                        <MenuItem value="Yıpranmış">Yıpranmış</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <InputLabel shrink htmlFor="year">
                                        İlan Başlığı
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id="title"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <InputLabel shrink htmlFor="year">
                                        Açıklama
                                    </InputLabel>
                                    <TextField
                                        multiline
                                        rows={4}
                                        fullWidth
                                        size='small'
                                        id="description"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        helperText="Durum, özellik ve satma nedeni gibi bilgileri ekle"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xl={12} lg={12} sm={12} xs={12} sx={{ marginLeft: '25px', marginRight: '25px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, margin: '25px 15px 15px 0px' }}>
                                FİYAT BELİRLE
                            </Typography>
                            <Grid container spacing={3} sx={{ display: 'inline-block', borderBottom: '1px solid #e0e0e0', paddingBottom: '25px' }}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <InputLabel shrink htmlFor="price">
                                        Yıl
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id="price"
                                        name="price"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">
                                                <Typography sx={{ borderRight: '1px solid #e0e0e0', paddingRight: '10px', fontSize: '12px' }}>TL</Typography>
                                            </InputAdornment>
                                        }}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Alert sx={{ backgroundColor: '#f8f9fa', color: '#2c2c2c' }} severity="info">Ticaret Bakanlığı’nın 06.07.2023 tarihli yönetmeliği uyarınca ikinci el arabalar, sıfır araba fiyatından daha yüksek bir fiyata satılamaz.</Alert>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xl={12} lg={12} sm={12} xs={12} sx={{ marginLeft: '25px', marginRight: '25px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, margin: '25px 15px 15px 0px' }}>
                                21 ADEDE KADAR FOTOĞRAF YÜKLEYEBİLİRSİN
                            </Typography>
                            <Grid container sx={{ borderBottom: '1px solid #e0e0e0', paddingTop: '25px', paddingBottom: '25px', marginTop: '10px', marginLeft: '10px' }}>
                                <input
                                    multiple
                                    type="file"
                                    name="photo"
                                    className="form-control"
                                    accept='image/png, image/jpeg'
                                    onChange={(event) => formik.setFieldValue('photo', event.currentTarget.files)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xl={12} lg={12} sm={12} xs={12} sx={{ marginLeft: '25px', marginRight: '25px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, margin: '25px 15px 15px 0px' }}>
                                KONUMUNU ONAYLA
                            </Typography>
                            <Grid container spacing={3} sx={{ display: 'inline-block', borderBottom: '1px solid #e0e0e0', paddingBottom: '25px', marginLeft: '5px', marginRight: '5px' }}>
                                <Tabs
                                    centered
                                    value={value}
                                    onChange={handleChange}
                                >
                                    <Tab
                                        label="LİSTEDEN SEÇ"
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        label="MEVCUT KONUM"
                                        {...a11yProps(1)}
                                    />
                                </Tabs>
                                <TabPanel value={value} index={0}>
                                    <Grid container spacing={2} sx={{ display: 'contents' }}>
                                        <Grid item lg={6} md={6} sm={12} xs={12}>
                                            <InputLabel shrink htmlFor="year">
                                                İl
                                            </InputLabel>
                                            <TextField
                                                id="city_id"
                                                fullWidth
                                                select
                                                size="small"
                                                name="city_id"
                                                value={formik.values.city_id}
                                                onChange={formik.handleChange}
                                            >
                                                {cities.length > 0 && cities.map((option) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option.city}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        {(formik.values.city_id && counties.length > 0) && (
                                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                                <InputLabel shrink htmlFor="year">
                                                    İlçe
                                                </InputLabel>
                                                <TextField
                                                    id="outlined-select-currency"
                                                    fullWidth
                                                    select
                                                    size="small"
                                                    name="county_id"
                                                    value={formik.values.county_id}
                                                    onChange={formik.handleChange}
                                                >
                                                    {counties.length > 0 && counties.map((option) => (
                                                        <MenuItem key={option.id} value={option.id}>
                                                            {option.county}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                        )}
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell variant='head'>İlçe</TableCell>
                                                    <TableCell sx={{ textAlign: 'right' }}>İstanbul</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant='head'>Konum</TableCell>
                                                    <TableCell sx={{ textAlign: 'right' }}>Kağıthane</TableCell>
                                                </TableRow>
                                            </TableHead>
                                        </Table>
                                    </Grid>
                                </TabPanel>
                            </Grid>
                        </Grid>
                        <Grid item xl={12} lg={12} sm={12} xs={12} sx={{ marginLeft: '25px', marginRight: '25px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, margin: '25px 15px 15px 0px' }}>
                                BİLGİLERİNİ GÖZDEN GEÇİR
                            </Typography>
                            <Grid container spacing={3} sx={{ display: 'inline-flex', paddingBottom: '25px', marginTop: '20px', marginLeft: '3px' }}>
                                <Grid xl={1} lg={1} md={1} sm={1} xs={1} sx={{ position: 'relative', marginRight: '35px' }}>
                                    <img src={profileImage} width={100} height={100} />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '20px',
                                        right: '2px'
                                    }}>
                                        <h4></h4>
                                    </div>
                                </Grid>
                                <Grid xl={6} lg={6} md={6} sm={10} xs={10}>
                                    <InputLabel shrink htmlFor="fullname">
                                        Ad Soyad
                                    </InputLabel>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        id="fullname"
                                        name="fullname"
                                        onChange={formik.handleChange}
                                        value={formik.values.fullname}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container sx={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '25px', marginTop: '20px', marginLeft: '3px' }}>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <CallIcon sx={{ color: 'blue' }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Tek tuşla arama" secondary="İlanların hakkında alıcılardan arama al" />
                                        </ListItem>
                                    </List>
                                </Grid>
                                <Grid xl={6} lg={6} md={6} sm={6} xs={6} sx={{ textAlign: { lg: 'left', xl: 'left', md: 'left', sm: 'right', xs: 'right' }, paddingLeft: '70px' }}>
                                    <Switch {...label} disabled />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xl={12} lg={12} sm={12} xs={12} sx={{ marginLeft: '25px', marginRight: '25px' }}>
                            <Grid container>
                                <Grid lg={12} md={12} sx={{ textAlign: 'center', marginTop: '30px', marginBottom: '30px' }}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            backgroundColor: '#ff3f55',
                                            color: '#FFFFFF',
                                            textTransform: 'none',
                                            border: '6px solid transparent',
                                            padding: 1.4,
                                            fontSize: '16px',
                                            borderRadius: 15,
                                            '&:hover': { bgcolor: '#FFFFFF', border: '6px solid #ff3f55', color: '#ff3f55' },
                                        }}
                                        color="error"
                                        type="submit"
                                    >
                                        Hemen ilan ver
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Attributes