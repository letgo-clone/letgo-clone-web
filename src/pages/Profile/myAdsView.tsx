import React, { useEffect, useState } from 'react'
import {
    Container,
    Grid,
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    CardActions,
    IconButton
}
    from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Link } from 'react-router-dom'
import { Request } from '../../helpers/Request';
import slugify from 'react-slugify';
import Swal from 'sweetalert2';

function MyAdsView() {
    const [myAds, setMyAds] = useState({});

    useEffect(() => {
        const getData = async () => {
            const url = "/advert/list";
            const data = await Request('GET', url);
            setMyAds(data);
        }
        getData();
    }, []);

    const handleVisibleChange = async(advertId: number, advertValue: string) => {
        const { value } = await Swal.fire({
            title: advertValue ? 'İlanı yayından kaldırma' : 'İlanı yayına alma',
            text: "Bu işlemi yapmak istediğinizden emin misiniz ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Vazgeç',
            confirmButtonText: advertValue ? 'İlanı yayından kaldır' : 'İlanı tekrardan yayın al',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
        });

        if(value) {
            const formdata: FormData = new FormData();
            formdata.append("op", 'replace');
            formdata.append("path", 'has_advert_visible');
            formdata.append("value", !advertValue);
            const url = '/advert/list/' + advertId;

            const response = await Request('PATCH', url, formdata);

            if(response.success){
                Swal.fire({
                    icon: 'success',
                    title: 'İşlem Başarılı',
                    html: advertValue ? 'İlan yayından kaldırıldı' : 'İlan tekrar yayına alındı',
                    confirmButtonText: 'Tamam'
                });
                setMyAds(prevObjects => {
                    return prevObjects.map(obj => {
                      if (obj.id === advertId) {
                        return { ...obj, is_visible: advertValue ? false : true  }
                      }
                      return obj;
                    })
                })
            }
        }
    } 

    return (
        <Container>
            <Grid container spacing={3} sx={{ marginTop: '25px' }}>
                <Grid item xl={12} lg={12} md={12}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            borderBottom: '1px solid #e0e0e0',
                            paddingBottom: '15px'
                        }}>
                        <Link
                            to="/profile/myads"
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                sx={{
                                    color: '#2c2c2c',
                                    paddingRight: '20px'
                                }}
                            >
                                İlanlarım
                            </Typography>
                        </Link>
                        <Link
                            to="/profile/myfavorite"
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                sx={{
                                    color: '#2c2c2c'
                                }}
                            >
                                Favorilerim
                            </Typography>
                        </Link>
                    </Box>
                </Grid>
                {myAds.length > 0 && myAds.map((item, key) => (
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} key={key}>

                        <Card
                            sx={{
                                minWidth: 275,
                                boxShadow: '0 1px 3px 0 rgba(0,47,52,.2), 0 1px 3px 0 rgba(0,47,52,.2)',
                                borderLeft: '4px solid #004bbe'
                            }}
                        >

                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xl={6} md={6} sm={12} xs={12}>
                                        <Link to={`/item/${slugify(item.title)}?id=${item.id}`} style={{ textDecoration: 'none' }}>
                                            <Grid container>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} sx={{ display: 'inline-flex' }}>
                                                    <img
                                                        src={item.images[0].url}
                                                        style={{
                                                            objectFit: 'cover',
                                                            display: 'block'
                                                        }}
                                                        width={60}
                                                        height={60}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            fontSize: '14px',
                                                            lineHeight: '20px',
                                                            fontWeight: 700,
                                                            color: '#2c2c2c',
                                                            paddingLeft: '15px',
                                                            paddingTop: '20px'
                                                        }}> {item.title}</Typography>
                                                </Grid>
                                                <Grid item xl={4} lg={4} md={4} sm={4} xs={4} sx={{ textAlign: 'center' }}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#2c2c2c',
                                                            marginTop: '28px'
                                                        }}
                                                    >
                                                        {item.price}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                                                    <Button
                                                        variant="contained"
                                                        sx={{
                                                            backgroundColor: '#004bbe',
                                                            color: '#ffffff',
                                                            fontSize: '10px',
                                                            fontWeight: 400,
                                                            marginTop: '23px',
                                                            padding: '4px 35px'
                                                        }}
                                                        disabled={!(item.is_visible)}
                                                    >
                                                        {item.is_visible ? 'Etkin' : 'Devre dışı'}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Link>
                                    </Grid>
                                    <Grid item xl={6} md={6} sm={12} xs={12} sx={{ paddingTop: { xl: '24px', lg: '24px', md: '24px', sm: '0', xs: '0' } }}>
                                        <Grid container>
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{ textAlign: { xl: 'center', lg: 'center', md: 'center', xs: 'start', sm: 'start' } }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        lineHeight: 1.5,
                                                        color: '#2c2c2c',
                                                        marginTop: '28px'
                                                    }}
                                                >
                                                    {item.is_visible ? 'Bu ilan şuanda yayında' : 'Bu ilan yayında değil'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                                                <IconButton aria-label="visible" onClick={() => handleVisibleChange(item.id, item.is_visible)}>
                                                    <VisibilityOffIcon />
                                                </IconButton>
                                                <IconButton aria-label="edit" href={`/post/edit/${item.id}`}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>

                            <CardActions sx={{ borderTop: '1px solid #e0e0e0' }}>
                                <Grid container>
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{ display: 'inline-flex' }}>
                                        <FavoriteIcon sx={{ width: '16px', height: '16px', paddingRight: '4px', paddingTop: '4px' }} />
                                        <Typography
                                            sx={{
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                lineHeight: '15px',
                                                paddingTop: '6px'
                                            }}
                                        >
                                            Beğeniler: {item.likes}
                                        </Typography>
                                    </Grid>
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{ textAlign: 'right' }}>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                backgroundColor: '#FFFFFF',
                                                color: '#ff3f55',
                                                borderRadius: '50px',
                                                border: '2px solid transparent',
                                                outline: '#ff3f55 solid 2px',
                                                textTransform: 'none',
                                                fontSize: '12px',
                                                marginRight: '20px',
                                                padding: '2px 10px 2px 10px',
                                                '&:hover': { backgroundColor: '#FFFFFF', border: '2px solid #ff3f55', color: '#ff3f55' },
                                            }}
                                            size='small'
                                        >
                                            Satıldı olarak işaretle
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                backgroundColor: '#FFFFFF',
                                                color: '#ff3f55',
                                                borderRadius: '50px',
                                                border: '2px solid transparent',
                                                outline: '#ff3f55 solid 2px',
                                                textTransform: 'none',
                                                fontSize: '12px',
                                                padding: '2px 10px 2px 10px',
                                                '&:hover': { backgroundColor: '#FFFFFF', border: '2px solid #ff3f55', color: '#ff3f55' },
                                            }}
                                            size='small'
                                        >
                                            Daha hızlı sat
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </Container >
    )
}

export default MyAdsView