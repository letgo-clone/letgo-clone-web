import React, { useState, useEffect, useRef } from 'react'
import {
    Container, Typography, Grid, MenuItem, InputLabel, TextField, InputAdornment, Divider,
    Alert, Tab, Tabs, Breadcrumbs, Link, Box, Table, TableCell, TableHead, TableRow, ListItem,
    List, ListItemAvatar, Avatar, ListItemText, Button, Switch, Card, CardMedia, IconButton
} from '@mui/material'

import CancelIcon from '@mui/icons-material/Cancel';

import profileImage from '../../assets/img/profile-logo.jpeg'
import ImageOutlinedIcon from '../../assets/img/image-icon.png';
import CallIcon from '@mui/icons-material/Call';
import CloseIcon from '@mui/icons-material/Close';

import { useFormik } from 'formik';
import { Request, RequestPublic } from '../../helpers/Request';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { setLoginData, useAppSelector, useAppDispatch } from '../../redux/store';

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

    const dispatch = useAppDispatch();
    const {loginData} = useAppSelector((state) => state?.authUser);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const [cities, setCities] = useState({});
    const [counties, setCounties] = useState({});
    const [images, setImages] = useState<object[]>([]);

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
            const {title, description, price, city_id, county_id, fullname, how_status} = values;

            if(title == '' || description == '' || price == '' || county_id == '' || fullname == '' || how_status == '' || images.length == 0){
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Gerekli alanları doldurmanız gerekiyor.",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else{
                const formdata: FormData = new FormData();
                formdata.append("title", title);
                formdata.append("description", description);
    
                images.forEach((file, index) => {
                    formdata.append('photo', file);
                });
    
                formdata.append("how_status", how_status);
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


    const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;

        if(fileList){
            const files: File[] = Array.from(fileList);

            setImages((prevImages) => {
                const prevArray = prevImages ? Array.from(prevImages) : [];
                return [...prevArray, ...files];
            });
        }

        formik.setFieldValue("photo", event.currentTarget.files);
    }

    const removeImage = (imageKey: number) => {
        const newList = images.filter((veri, key) => key !== imageKey);
        setImages(newList);
    }

    return (
        <Container>
            <Typography sx={{ fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', marginTop: '25px', textAlign: 'center' }}>
                İlan Yayınla
            </Typography>
            <Grid container sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, margin: '25px 15px 15px 25px' }}>
                    SEÇİLEN KATEGORİ
                </Typography>
                <form
                        method='POST'
                        onSubmit={formik.handleSubmit}
                        encType='multipart/form-data'
                    >
                <Grid container>
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
                                        error={Boolean(formik.values.how_status == '' && formik.touched.how_status )}
                                        helperText={formik.values.how_status == '' && formik.touched.how_status && 'Durumu belirtmeniz gerekiyor'}
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
                                        error={Boolean(formik.values.title == '' && formik.touched.title)}
                                        helperText={formik.values.title == '' && formik.touched.title && 'En az 1 karakter olması gerekir. Lütfen alanı düzenle.'}
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
                                        error={Boolean(formik.values.description == '' && formik.touched.description)}
                                        helperText={formik.values.description == '' && formik.touched.description ? 'En az 10 karakter olması gerekir. Lütfen alanı düzenle.' : 'Durum, özellik ve satma nedeni gibi bilgileri ekle'}
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
                                        error={Boolean(formik.values.price == '' && formik.touched.price)}
                                        helperText={formik.values.price == '' && formik.touched.price && 'Bu alan zorunludur'}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xl={12} lg={12} sm={12} xs={12} sx={{ marginLeft: '25px', marginRight: '25px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, margin: '25px 15px 15px 0px' }}>
                                21 ADEDE KADAR FOTOĞRAF YÜKLEYEBİLİRSİN
                            </Typography>
                            <Grid container sx={{ display: 'inline-block', borderBottom: '1px solid #e0e0e0', paddingTop: '25px', paddingBottom: '25px', marginTop: '10px', marginLeft: '10px' }}>
                                <input
                                    multiple
                                    type="file"
                                    name="photo"
                                    className="form-control"
                                    accept='image/png, image/jpeg'
                                    onChange={(event) => 
                                        {
                                            handlePhoto(event)
                                        }}
                                />
                                {images.length < 1 &&
                                     <Typography sx={{ color : '#ff3f55', fontSize: '12px', marginTop: '30px' }}>Bu alan zorunludur</Typography>
                                }
                            </Grid>
                            <Grid container sx={{marginTop: '25px', marginBottom: '25px' }}>
                            {images.length > 0 && images.map((item, key) => (
                                <Box sx={{ position: 'relative', padding: '0px 20px 20px 0px' }}>
                                <div className='advert-image' style={{ position: 'relative' }}>
                                    <img 
                                        src={URL.createObjectURL(item)}
                                        style={{ objectFit: 'fill' }} 
                                        width={140} 
                                        height={140} 
                                        alt="Advert" 
                                    />
                                    <div className='image-content' style={{ position: 'absolute', top: 0, right: 0, padding: '5px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <IconButton 
                                            aria-label="remove to advert" 
                                            onClick={() => removeImage(key)}
                                            sx={{ backgroundColor: '#000000', borderRadius: 3, '&:hover': {backgroundColor :'#000000'}}}
                                        >
                                                <CloseIcon sx={{ fontSize: '21px',color: '#ffffff' }} />
                                        </IconButton>
                                    </div>
                                    {key == 0  &&
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
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
                                            }}
                                        >
                                            KAPAK
                                        </Typography>
                                    }
                                </div>
                                </Box>
                            ))}
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
                                                error={Boolean(formik.values.city_id == '' && formik.touched.city_id)}
                                                helperText={formik.values.city_id == '' && formik.touched.city_id  && 'Bu alan zorunludur'}
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
                                                    error={Boolean(formik.values.county_id == '' && formik.touched.county_id)}
                                                    helperText={formik.values.county_id == '' && formik.touched.county_id && 'Bu alan zorunludur'}
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
                                        error={Boolean(formik.values.fullname == '')}
                                        helperText={formik.values.fullname == '' && 'Bu alan zorunludur'}
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
                    </Grid>
                </form>
            </Grid>
        </Container>
    )
}

export default Attributes