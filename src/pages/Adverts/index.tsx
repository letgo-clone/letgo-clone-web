import { useEffect, useState } from 'react';
import { Typography, Grid, Card, CardContent, CardActions, Button, Container, IconButton, Divider } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useLocation } from "react-router-dom";

import { Request } from '../../helpers/Request';

import sampleLocation from '../../assets/img/sample-location.png'
import { getItem } from 'localforage';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const AdvertDetail = () => {
    const query = useQuery()
    const id = query.get("id");

    const [advertDetail, setAdvertDetail] = useState('');

    useEffect(() => {
        const getData = async () => {
            const url = "/advert/actual/" + id
            const data = await Request('GET', url);
            setAdvertDetail(data);
        }
        getData();
    }, [])

    return (
        <div style={{ backgroundColor: '#f1f1f1', paddingTop: '20px', paddingBottom: '20px' }}>
            {advertDetail && (
                <Container>
                    <Grid container>
                        <Grid xl={8} lg={8} md={12} sm={12} xs={12}>
                            <Grid container sx={{
                                width: { xl: '96%', lg: '96%', md: '100%', sm: '100%', xs: '100%' },
                                backgroundColor: '#FFFFFF',
                                marginBottom: { md: '10px', sm: '20px', xs: '20px' }
                            }}>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Carousel showArrows={true} autoPlay={true} verticalSwipe={'natural'} dynamicHeight={true}>
                                        {advertDetail.images.map((item, key) => (
                                            <div style={{ backgroundColor: 'red' }}>
                                                <img src={item.big.url} width={item.big.width} />
                                            </div>
                                        ))}
                                    </Carousel>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ padding: '20px' }}>
                                    <Typography sx={{ fontSize: '20px', lineHeight: '20px', fontWeight: 700, color: '#2c2c2c', marginTop: '10px', marginBottom: '10px' }}>
                                        Detaylar
                                    </Typography>
                                    <Grid container>
                                        {advertDetail.parameters.map((item) => (
                                            <>
                                                <Grid lg={3} md={3} sm={3} xs={3}>{item.key_name}</Grid>
                                                <Grid lg={3} md={3} sm={3} xs={3}>{item.value_name}</Grid>
                                            </>
                                        ))}
                                    </Grid>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ padding: '20px' }}>
                                    <Divider />
                                    <Typography sx={{ fontSize: '20px', lineHeight: '20px', fontWeight: 700, color: '#2c2c2c', marginTop: '10px', marginBottom: '10px' }}>
                                        Açıklama
                                    </Typography>
                                    <Typography sx={{ fontSize: '14px', lineHeight: '20px', fontWeight: 400, color: '#2c2c2c', marginTop: '10px', marginBottom: '10px' }}>
                                        {advertDetail.description}
                                    </Typography>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xl={4} lg={4} md={12} sm={12} xs={12}>
                            <Grid container>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Grid container>
                                                <Grid item lg={6} md={6}>
                                                    <Typography sx={{ fontSize: '32px', lineHeight: '32px', fontWeight: 700, color: '#2c2c2c' }}>
                                                        {advertDetail.price.value.display}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 14, marginTop: '10px' }} color="text.secondary" gutterBottom>
                                                        {advertDetail.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={6} md={6} sx={{ textAlign: 'right' }}>
                                                    <IconButton aria-label="share">
                                                        <ShareIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="add to favorites">
                                                        <FavoriteIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions sx={{ marginLeft: '8px' }}>
                                            <Typography sx={{ fontSize: '12px', lineHeight: '20px', fontWeight: 400, color: '#424242' }}>
                                                {advertDetail.locations_resolved.SUBLOCALITY_LEVEL_1_name}, {advertDetail.locations_resolved.ADMIN_LEVEL_3_name}, {advertDetail.locations_resolved.COUNTRY_name}
                                            </Typography>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: '20px' }}>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Grid container>
                                                <Grid item lg={6} md={6}>
                                                    <Typography sx={{ fontSize: '20px', lineHeight: '20px', fontWeight: 700, color: '#2c2c2c', marginTop: '10px' }}>
                                                        Deneme Kişisi
                                                    </Typography>

                                                </Grid>
                                                <Grid item lg={6} md={6} sx={{ textAlign: 'right' }}>
                                                    <IconButton aria-label="share">
                                                        <ChevronRightIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions sx={{ marginLeft: '8px', display: 'grid', marginBottom: '20px' }}>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    backgroundColor: '#FFFFFF',
                                                    color: '#ff3f55',
                                                    borderRadius: '50px',
                                                    border: '3px solid transparent',
                                                    outline: '#ff3f55 solid 3px',
                                                    textTransform: 'none',
                                                    '&:hover': { backgroundColor: '#FFFFFF', border: '3px solid #ff3f55', color: '#ff3f55' },
                                                }}
                                            >
                                                Satıcıyla sohbet et
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: '20px' }} >
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Grid container>
                                                <Grid item lg={12} md={12}>
                                                    <Typography sx={{ fontSize: '20px', lineHeight: '20px', fontWeight: 700, color: '#2c2c2c', marginTop: '10px' }}>
                                                        İlan Konumu
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={12} md={12} sx={{ marginTop: '10px' }}>
                                                    <Typography sx={{ fontSize: '12px', lineHeight: '20px', fontWeight: 400, color: '#424242' }}>
                                                        {advertDetail.locations_resolved.SUBLOCALITY_LEVEL_1_name}, {advertDetail.locations_resolved.ADMIN_LEVEL_3_name}, {advertDetail.locations_resolved.COUNTRY_name}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions sx={{ marginLeft: '8px', display: 'grid', marginBottom: '20px' }}>
                                            <img src={sampleLocation} width="640" />
                                        </CardActions>
                                    </Card>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: '20px' }}>
                                    <Grid container>
                                        <Grid lg={6} md={6}>
                                            <Typography sx={{ fontSize: '14px', marginTop: '10px', color: '#2c2c2c', fontWeight: 'bolder' }} color="text.secondary" gutterBottom>
                                                İlan no {advertDetail.id}
                                            </Typography>
                                        </Grid>
                                        <Grid lg={6} md={6} sx={{ textAlign: 'right' }}>
                                            <Typography sx={{ fontSize: '12px', color: '#ff3f55', fontWeight: 700, textTransform: 'uppercase', marginTop: '10px' }} color="text.secondary" gutterBottom>
                                                İlani Şikayet Et
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </div>
    )
}

export default AdvertDetail