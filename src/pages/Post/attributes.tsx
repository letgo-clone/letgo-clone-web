import React from 'react'
import {
    Container, Typography, Grid, MenuItem, InputLabel, TextField, InputAdornment, Divider,
    Alert, Tab, Tabs, Breadcrumbs, Link, Box, Table, TableCell, TableHead, TableRow, ListItem,
    List, ListItemAvatar, Avatar, ListItemText, Button, Switch, Card, CardMedia
} from '@mui/material'

import profileImage from '../../assets/img/profile-logo.jpeg'
import ImageOutlinedIcon from '../../assets/img/image-icon.png';
import CallIcon from '@mui/icons-material/Call';

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
    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const brands = [
        {
            value: 'honda',
            label: 'Honda',
        },
        {
            value: 'mercedes',
            label: 'Mercedes-Benz',
        },
        {
            value: 'bmw',
            label: 'BMW',
        }
    ];

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
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
                                <InputLabel shrink htmlFor="year">
                                    Yıl
                                </InputLabel>
                                <TextField fullWidth size='small' id="year" />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <InputLabel shrink htmlFor="year">
                                    Marka
                                </InputLabel>
                                <TextField fullWidth size='small' id="year" />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <InputLabel shrink htmlFor="year">
                                    Kasa Tipi
                                </InputLabel>
                                <TextField
                                    id="outlined-select-currency"
                                    fullWidth
                                    select
                                    size="small"
                                >
                                    {brands.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <InputLabel shrink htmlFor="year">
                                    Yeni kasa/eski kasa
                                </InputLabel>
                                <TextField
                                    id="outlined-select-currency"
                                    fullWidth
                                    select
                                    size="small"
                                >
                                    {brands.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <InputLabel shrink htmlFor="year">
                                    Koltuk Sayısı
                                </InputLabel>
                                <TextField
                                    id="outlined-select-currency"
                                    fullWidth
                                    select
                                    size="small"
                                >
                                    {brands.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <InputLabel shrink htmlFor="year">
                                    MOTOR
                                </InputLabel>
                                <TextField
                                    id="outlined-select-currency"
                                    fullWidth
                                    select
                                    size="small"
                                >
                                    {brands.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <InputLabel shrink htmlFor="km">
                                    Kilometre
                                </InputLabel>
                                <TextField fullWidth size='small' id="km" />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <InputLabel shrink htmlFor="plate">
                                    Plaka
                                </InputLabel>
                                <TextField fullWidth size='small' id="plate" />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <InputLabel shrink htmlFor="year">
                                    Yakıt
                                </InputLabel>
                                <TextField
                                    id="outlined-select-currency"
                                    fullWidth
                                    select
                                    size="small"
                                >
                                    {brands.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <InputLabel shrink htmlFor="year">
                                    Renk
                                </InputLabel>
                                <TextField
                                    id="outlined-select-currency"
                                    fullWidth
                                    select
                                    size="small"
                                >
                                    {brands.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <InputLabel shrink htmlFor="year">
                                    İlan Başlığı
                                </InputLabel>
                                <TextField
                                    id="outlined-select-currency"
                                    fullWidth
                                    select
                                    size="small"
                                    helperText="Ürününün temel özelliklerinden bahset (ör. marka, model, yaş, tip)"
                                >
                                    {brands.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <InputLabel shrink htmlFor="year">
                                    Açıklama
                                </InputLabel>
                                <TextField
                                    fullWidth
                                    size='small'
                                    id="year"
                                    multiline
                                    rows={4}
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
                                <InputLabel shrink htmlFor="year">
                                    Yıl
                                </InputLabel>
                                <TextField
                                    fullWidth
                                    size='small'
                                    id="year"
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
                        <Grid container sx={{ borderBottom: '1px solid #e0e0e0', paddingTop:'25px' ,paddingBottom: '25px', marginTop: '10px', marginLeft: '10px' }}>
                            <Grid xl={6} lg={6} md={6} sm={12} xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xl={3} lg={3} md={4}>
                                        <Card sx={{ maxWidth: 80, textAlign: '-webkit-center', p:2 }}>
                                            <CardMedia
                                                component="img"
                                                width={50}
                                                image={ImageOutlinedIcon}
                                                sx={{ maxWidth:50 }}
                                            />
                                        </Card>
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={4}>
                                        <Card sx={{ maxWidth: 80, textAlign: '-webkit-center', p:2 }}>
                                            <CardMedia
                                                component="img"
                                                width={50}
                                                image={ImageOutlinedIcon}
                                                sx={{ maxWidth:50 }}
                                            />
                                        </Card>
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={4}>
                                        <Card sx={{ maxWidth: 80, textAlign: '-webkit-center', p:2 }}>
                                            <CardMedia
                                                component="img"
                                                width={50}
                                                image={ImageOutlinedIcon}
                                                sx={{ maxWidth:50 }}
                                            />
                                        </Card>
                                    </Grid>
                                    <Grid item xl={3} lg={3} md={4}>
                                        <Card sx={{ maxWidth: 80, textAlign: '-webkit-center', p:2 }}>
                                            <CardMedia
                                                component="img"
                                                width={50}
                                                image={ImageOutlinedIcon}
                                                sx={{ maxWidth:50 }}
                                            />
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
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
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <InputLabel shrink htmlFor="year">
                                        İl
                                    </InputLabel>
                                    <TextField
                                        id="outlined-select-currency"
                                        fullWidth
                                        select
                                        size="small"
                                    >
                                        {brands.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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
                                <InputLabel shrink htmlFor="year">
                                    Ad Soyad
                                </InputLabel>
                                <TextField fullWidth size='small' id="adsoyad" defaultValue={'Fırat YILDIZ'} />
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
                                >
                                    Hemen ilan ver
                                </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Attributes