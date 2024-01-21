import { useEffect, useState } from 'react';

// Material UI elements
import { 
    Avatar, 
    Typography, 
    Grid, 
    Card, 
    CardContent,
    Box, 
    CardActions, 
    Button, 
    Container, 
    IconButton, 
    Divider,
    } from "@mui/material"

// Material UI icons

import {
    Share,
    ChevronRight
    } from '@mui/icons-material';

// styles and assets
import { 
    advertDetailStyles,
    advertDetailCarouselStyles 
    } from '../../styles';

// Helper
import { RequestPublic } from '../../helpers/Request';

// Redux
import { useAppSelector } from '../../redux/store';

// Component
import Favorite from '../../components/Favorite';
import Breadcrumb from '../../components/common/Breadcrumb';

// Other
import { useParams, useNavigate } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import slugify from 'react-slugify';

// İnterfaces
import { DetailCardTypes,DetailCaredPhotoTypes } from '../advertTypes';

const AdvertDetail = () => {
    // Redux
    const {loginData} = useAppSelector((state) => state?.authUser);

    // React Router
    const navigate = useNavigate();
    const params = useParams();
    const id = params.itemId;

    // useState area
    const [advertDetail, setAdvertDetail] = useState<DetailCardTypes>({});
    const [advertImages, setAdvertImages] = useState<DetailCaredPhotoTypes[]>([]);

    // useEffect area

    // gets actual advert data
    useEffect(() => {
        const getData = async () => {
            const url = "/advert/actual/" + id
            const data: DetailCardTypes | any = await RequestPublic({
                method: 'GET',
                url: url
            });

            document.title = data.title;
            setAdvertDetail(data);
            setAdvertImages(data.photo);
        }
        getData();
    }, [])

    const handleRouteProfile = (currentUser: number) => {
        if(currentUser == loginData?.id){
            navigate('/profile')
        }else{
            navigate('/profile/' + currentUser )
        }
    }

     const breadCrumbItems = [
        {
            title: advertDetail.main_category,
            link:  '/search?category=' + advertDetail.main_category_id
        },
        {
            title: advertDetail.sub_category,
            link:  '/search?category=' + advertDetail.main_category_id + '-' + advertDetail.sub_category_id
        },
        {
            title: advertDetail.city + ' içindeki ' + advertDetail.sub_category + ' ilanları' ,
            link: '/search?location=' + advertDetail.city_id + '&category=' + advertDetail.main_category_id + '-' + advertDetail.sub_category_id
        },
        {
            title: advertDetail.county + ' içindeki ' + advertDetail.sub_category + ' ilanları' ,
            link: '/search?location=' + advertDetail.city_id + '-' + advertDetail.county_id + '&category=' + advertDetail.main_category_id + '-' + advertDetail.sub_category_id
        },
        {
            title: advertDetail.title,
            link: '/item/' + slugify(advertDetail.title) + '/' + advertDetail.id
        }
    ] 

    return (
        <Box sx={advertDetailStyles.mainBox}>
            {advertDetail && (
                <Container>
                    <Breadcrumb  breadcrumbItems={breadCrumbItems} />
                    <Grid container>
                        <Grid xl={8} lg={8} md={12} sm={12} xs={12}>
                            {/* Left Column Contents  */}
                            <Grid container sx={advertDetailStyles.leftColumnGrid}>
                                {/* Carousel  */}
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Carousel animation={'slide'} autoPlay={true} swipe={true} height={400}>
                                    {
                                        advertImages.map((item, key) => (
                                            <Box sx={advertDetailStyles.carouselBox} key={key}>
                                                <img 
                                                    src={item.url} 
                                                    width={1000}
                                                    loading='lazy'
                                                    style={advertDetailCarouselStyles.carouselImg} 
                                                />
                                            </Box>
                                        ))
                                    }
                                </Carousel>
                
                                </Grid>
                                {/* Detail Card  */}
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={advertDetailStyles.leftColumnInfoGrid}>
                                    <Typography sx={advertDetailStyles.leftColumnInfoText}>
                                        Detaylar
                                    </Typography>
                                    <Grid container>
                                            <Grid lg={3} md={3} sm={3} xs={3}>Durum</Grid>
                                            <Grid lg={3} md={3} sm={3} xs={3}>{advertDetail?.how_status}</Grid>
                                    </Grid>
                                </Grid>
                                {/* Description Card */}
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={advertDetailStyles.leftColumnInfoGrid}>
                                    <Divider />
                                    <Typography sx={advertDetailStyles.leftColumnInfoText}>
                                        Açıklama
                                    </Typography>
                                    <Typography sx={advertDetailStyles.leftColumnDescription}>
                                        {advertDetail?.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                         {/*  Left Column Contents */}
                        <Grid xl={4} lg={4} md={12} sm={12} xs={12}>
                            <Grid container>
                                {/* Price card */}
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Card sx={advertDetailStyles.rightColumnCards}>
                                        <CardContent sx={advertDetailStyles.rightColumnCardContent}>
                                            <Grid container>
                                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                                    <Typography sx={advertDetailStyles.rightColumnPriceText}>
                                                        {advertDetail.price}
                                                    </Typography>
                                                    <Typography sx={advertDetailStyles.rightColumnPriceTitle} color="text.secondary" gutterBottom>
                                                        {advertDetail.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={6} xs={6} sx={advertDetailStyles.rightColumnPriceIconsGrid}>
                                                    <IconButton aria-label="share">
                                                        <Share />
                                                    </IconButton>
                                                    <Favorite  id={advertDetail.id} hasFavorite={advertDetail.has_favorite}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions>
                                            <Typography sx={advertDetailStyles.rightColumnLocationText}>
                                                {advertDetail.county}, {advertDetail.city}
                                            </Typography>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                 {/* Seller card */}
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={advertDetailStyles.rightColumnsGrid}>
                                    <Card sx={advertDetailStyles.rightColumnCards}>
                                        <CardContent sx={advertDetailStyles.rightColumnCardContent}>
                                            <Grid container>
                                                <Grid item lg={3} md={3} sm={3} xs={3}>
                                                    <Avatar 
                                                        alt="Remy Sharp" 
                                                        src={advertDetail?.user_image?.url} 
                                                        sx={advertDetailStyles.rightColumnSellerAvatar} 
                                                        onClick={() => handleRouteProfile(advertDetail.userid!)}
                                                    />
                                                </Grid>
                                                <Grid item lg={6} md={6} sm={6} xs={6}>
                                                    <Typography
                                                        sx={advertDetailStyles.rightColumnSellerFullname}
                                                        onClick={() => handleRouteProfile(advertDetail.userid!)}
                                                    >
                                                        {advertDetail.fullname}
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={3} md={3} sm={3} xs={3} sx={advertDetailStyles.rightColumnSellerIconGrid}>
                                                    <IconButton 
                                                        aria-label="share" 
                                                        onClick={() => handleRouteProfile(advertDetail.userid!)}
                                                    >
                                                        <ChevronRight />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions sx={advertDetailStyles.rightColumnSellerButtonGrid}>
                                            <Button variant="outlined" sx={advertDetailStyles.rightColumnSellerButton}>
                                                Satıcıyla sohbet et
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                                 {/* Location card */}
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={advertDetailStyles.rightColumnsGrid}>
                                    <Card sx={advertDetailStyles.rightColumnCards}>
                                        <CardContent sx={advertDetailStyles.rightColumnCardContent}>
                                            <Grid container>
                                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                                    <Typography sx={advertDetailStyles.rightColumnLocationTitle}>
                                                        İlan Konumu
                                                    </Typography>
                                                </Grid>
                                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                                    <Typography sx={advertDetailStyles.rightColumnLocationText}>
                                                        {advertDetail.county}, {advertDetail.city}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <CardActions sx={advertDetailStyles.rightColumnLocation}>
                                            <img src={'../../assets/img/sample-location.png'} width="640" />
                                        </CardActions>
                                    </Card>
                                </Grid>
                                 {/* Advert Report */}
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={advertDetailStyles.rightColumnsGrid}>
                                    <Grid container>
                                        <Grid lg={6} md={6} sm={6} xs={6}>
                                            <Typography sx={advertDetailStyles.rightColumnAdvertInfoText} color="text.secondary" gutterBottom>
                                                İlan no {advertDetail.id}
                                            </Typography>
                                        </Grid>
                                        <Grid lg={6} md={6} sm={6} xs={6}>
                                            <Typography sx={advertDetailStyles.rightColumnAdvertComplaint} color="text.secondary" gutterBottom>
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
        </Box>
    )
}

export default AdvertDetail