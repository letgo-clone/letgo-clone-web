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
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import { Link } from 'react-router-dom'
import { Request } from '../../helpers/Request';
import slugify from 'react-slugify';
import Swal from 'sweetalert2';

import { adViewStyles } from '../../styles';

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
            cancelButtonColor: '#ff3f55'
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

    const handleDeleteAdvert = async(advertId: number) => {
        const { value } = await Swal.fire({
            title: 'İlanı sattın mı ?',
            text: "Bu işlemi yapmak istediğinizden emin misiniz ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Vazgeç',
            confirmButtonText: 'İlanı sattım',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ff3f55'
        });

        if(value) {
            const formdata: FormData = new FormData();
            formdata.append("op", 'remove');
            formdata.append("path", 'has_advert_remove');
            formdata.append("value", true);
            const url = '/advert/list/' + advertId;

            const response = await Request('PATCH', url, formdata);

            if(response.success){
                Swal.fire({
                    icon: 'success',
                    title: 'İşlem Başarılı',
                    html: 'İlan yayından kaldırıldı',
                    confirmButtonText: 'Tamam'
                });
                const newList = myAds.filter((veri) => veri.id !== advertId);
                setMyAds(newList);
            }
        }
    } 

    return (
        <Container>
            <Grid container spacing={3} sx={adViewStyles.mainGrid}>
                <Grid item xl={12} lg={12} md={12}>
                    <Box sx={adViewStyles.topMenuBox}>
                        <Link
                            to="/profile/myads"
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography sx={adViewStyles.topMenuText}>
                                İlanlarım
                            </Typography>
                        </Link>
                        <Link
                            to="/profile/myfavorite"
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography sx={adViewStyles.topMenuText}>
                                Favorilerim
                            </Typography>
                        </Link>
                    </Box>
                </Grid>
                {myAds.length > 0 && myAds.map((item, key) => (
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} key={key}>
                        <Card sx={adViewStyles.adCard}>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xl={6} md={6} sm={12} xs={12}>
                                        <Link to={`/item/${slugify(item.title)}/${item.id}`} style={{ textDecoration: 'none' }}>
                                            <Grid container>
                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} sx={adViewStyles.cardTitleGrid}>
                                                    {item?.is_cover_image ? (
                                                        <img
                                                            src={item.is_cover_image}
                                                            style={{
                                                                objectFit: 'cover',
                                                                display: 'block'
                                                            }}
                                                            width={60}
                                                            height={60}
                                                         />
                                                    ): (
                                                        <Box sx={adViewStyles.defaultImageCardBox}>
                                                            <InsertPhotoIcon sx={adViewStyles.defaultImageIcon} />
                                                        </Box>
                                                    )}
                                                    <Typography sx={adViewStyles.adTitle}>{item.title}</Typography>
                                                </Grid>
                                                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                                    <Typography sx={adViewStyles.adPrice}>
                                                        {item.price}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                                                    <Button
                                                        variant="contained"
                                                        sx={adViewStyles.adStatusButton}
                                                        disabled={!(item.is_visible)}
                                                    >
                                                        {item.is_visible ? 'Etkin' : 'Devre dışı'}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Link>
                                    </Grid>
                                    <Grid item xl={6} md={6} sm={12} xs={12} sx={adViewStyles.adRightColumnGrid}>
                                        <Grid container>
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={adViewStyles.adStatusGridOfRightColumn}>
                                                <Typography sx={adViewStyles.adStatusText}>
                                                    {item.is_visible ? 'Bu ilan şuanda yayında' : 'Bu ilan yayında değil'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={adViewStyles.adActionIconGrid}>
                                                <IconButton aria-label="visible" onClick={() => handleVisibleChange(item.id, item.is_visible)}>
                                                    <VisibilityOffIcon />
                                                </IconButton>
                                                <IconButton aria-label="edit" href={`/post/edit/${item.id}`}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" onClick={() => handleDeleteAdvert(item.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions sx={adViewStyles.cardActions}>
                                <Grid container>
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={adViewStyles.cardFavoriteStatusGrid}>
                                        <FavoriteIcon sx={adViewStyles.adFavoriteIcon} />
                                        <Typography sx={adViewStyles.adFavoriteText}>
                                            Beğeniler: {item.likes}
                                        </Typography>
                                    </Grid>
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                        <Box sx={adViewStyles.rightButtonsBox}>
                                        <Button
                                            onClick={() => handleDeleteAdvert(item.id)}
                                            variant="outlined"
                                            sx={adViewStyles.rightButtons}
                                            size='small'
                                        >
                                            Satıldı olarak işaretle
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            sx={adViewStyles.rightButtons}
                                            size='small'
                                        >
                                            Daha hızlı sat
                                        </Button>
                                        </Box>
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