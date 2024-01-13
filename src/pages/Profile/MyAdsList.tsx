import { useEffect, useState } from 'react'

// Material UI elements
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
    } from '@mui/material'

// Material UI icons
import {
    Delete,
    Edit,
    VisibilityOff,
    Visibility,
    Favorite,
    InsertPhoto
    } from '@mui/icons-material';

// Styles
import { adViewStyles } from '../../styles';

// Helpers
import { Request } from '../../helpers/Request';

// Component
import ProfileTopMenu from '../../components/common/ProfileTopMenu';
import NoResult from '../../components/common/NoResult';

// npm packages
import { Link } from 'react-router-dom'
import slugify from 'react-slugify';
import Swal from 'sweetalert2';

// interface
import { MyAdProp } from '../advertTypes';

function MyAdsView() {
    // useState area
    const [myAds, setMyAds] = useState<MyAdProp[]>([]);

    // useEffect area
    useEffect(() => {
        const getData = async () => {
            const url = "/advert/list";
            const data = await Request({
                method: 'GET', 
                url: url
            });
            
            setMyAds(data);
        }
        getData();
    }, []);

    const handleVisibleChange = async(advertId: string, advertValue: boolean) => {

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
            formdata.append("value", advertValue? 'false' : 'true');
            const url = '/advert/list/' + advertId;

            const response = await Request({
                method: 'PATCH',
                url: url,
                formData: formdata
            });

            const responseCheck = Object.keys(response).filter(item => item == 'success')
            if(responseCheck){
                Swal.fire({
                    icon: 'success',
                    title: 'İşlem Başarılı',
                    html: advertValue ? 'İlan yayından kaldırıldı' : 'İlan tekrar yayına alındı',
                    confirmButtonText: 'Tamam'
                });

                setMyAds(prevObjects => {
                    return prevObjects.map(obj => {
                      if (obj?.id === advertId) {
                        return { ...obj, is_visible: advertValue ? false : true  }
                      }
                      return obj;
                    })
                })
            }
        }
    } 

    const handleDeleteAdvert = async(advertId: string) => {
        const { value } = await Swal.fire({
            title: 'İlanını silmek üzeresin.',
            text: "Bu eylemi geri alamayacaksın",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Vazgeç',
            confirmButtonText: 'İlanı Kaldır',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ff3f55'
        });

        if(value) {
            const formdata: FormData = new FormData();
            formdata.append("op", 'remove');
            formdata.append("path", 'has_advert_remove');
            formdata.append("value", 'true');
            const url = '/advert/list/' + advertId;

            // 'PATCH', url, formdata
            const response = await Request({
                method: 'PATCH',
                url: url,
                formData: formdata
            });

            const responseCheck = Object.keys(response).filter(item => item == 'success')
            if(responseCheck){
                Swal.fire({
                    icon: 'success',
                    title: 'İşlem Başarılı',
                    html: 'İlan kaldırıldı',
                    confirmButtonText: 'Tamam'
                });
                const newList = myAds.filter((veri) => veri?.id !== advertId);
                setMyAds(newList);
            }
        }
    } 

    const handleSellChange = async(advertId: string) => {

        const { value } = await Swal.fire({
            title: 'İlanı sattım',
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
            formdata.append("op", 'replace');
            formdata.append("path", 'has_advert_sell');
            formdata.append("value", 'true');
            const url = '/advert/list/' + advertId;

            const response = await Request({
                method: 'PATCH',
                url: url,
                formData: formdata
            });

            const responseCheck = Object.keys(response).filter(item => item == 'success')
            if(responseCheck){
                Swal.fire({
                    icon: 'success',
                    title: 'İşlem Başarılı',
                    html: 'İlan satıldı olarak olarak işaretlendi, ilan yayından kaldırıldı,',
                    confirmButtonText: 'Tamam'
                });

                setMyAds(prevObjects => {
                    return prevObjects.map(obj => {
                      if (obj?.id === advertId) {
                        return { ...obj, is_sell: true  }
                      }
                      return obj;
                    })
                })
            }
        }
    } 

    const handleHotAdvert = async(advertId: string, howStatus: string) => {

        const { value } = await Swal.fire({
            title: howStatus == '2' ?  'İlanı hızlı sat' : 'Öne çıkanlardan kaldır',
            text: howStatus == '2'  ? "İlanınızı öne çıkan vitrinine ekleyerek hızlı satabilirsiniz." : 'Bu işlemi yapmak istediğinizden emin misiniz ?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Vazgeç',
            confirmButtonText: howStatus == '2' ? 'İlanı öne çıkanlara ekle': 'İlanı öne çıkanlardan kaldır',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ff3f55'
        });

        if(value) {
            const formdata: FormData = new FormData();
            formdata.append("op", 'replace');
            formdata.append("path", 'has_advert_status');
            formdata.append("value", howStatus == '2' ? '4' : '2' );
            const url = '/advert/list/' + advertId;

            const response = await Request({
                method: 'PATCH',
                url: url,
                formData: formdata
            });

            const responseCheck = Object.keys(response).filter(item => item == 'success')
            if(responseCheck){
                Swal.fire({
                    icon: 'success',
                    title: 'İşlem Başarılı',
                    html: howStatus == '2' ? 'İlan öne çıkan vitrinine eklendi' : 'İlan öne çıkan vitrininden kaldırıldı.' ,
                    confirmButtonText: 'Tamam'
                });

                setMyAds(prevObjects => {
                    return prevObjects.map(obj => {
                      if (obj?.id === advertId) {
                        return { ...obj, status_id: howStatus == '2' ? '4': '2'}
                      }
                      return obj;
                    })
                })
            }
        }
    }

    return (
        <Container>
            <Grid container spacing={3} sx={adViewStyles.mainGrid}>
                {/* Top menu */}
                <Grid item xl={12} lg={12} md={12}>
                    <ProfileTopMenu />
                </Grid>
                {Object.keys(myAds).length > 0 ? myAds?.map((item, key) => (
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} key={key}>
                         {/* Ad card */}
                        <Card sx={!(item.is_visible) || (item.is_sell) ? (
                            adViewStyles.adCardDisabled
                        ): (
                            adViewStyles.adCard
                        )}>
                            <CardContent>
                                <Grid container spacing={3}>
                                     {/* Left column elements of card: Image, price, status */}
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
                                                            <InsertPhoto sx={adViewStyles.defaultImageIcon} />
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
                                                    {(item.is_sell) ? (
                                                         <Button
                                                            variant="contained"
                                                            sx={adViewStyles.adSellStatusButton}
                                                        >
                                                         Satıldı
                                                     </Button>
                                                    ): (
                                                    <Button
                                                        variant="contained"
                                                        sx={adViewStyles.adStatusButton}
                                                        disabled={!(item.is_visible)}
                                                    >
                                                        {item.is_visible ? 'Etkin' : 'Devre dışı'}
                                                    </Button>
                                                    )}
                                                  
                                                </Grid>
                                            </Grid>
                                        </Link>
                                    </Grid>
                                     {/* Right column elements of card: Status, Action */}
                                    <Grid item xl={6} md={6} sm={12} xs={12} sx={adViewStyles.adRightColumnGrid}>
                                        <Grid container>
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={adViewStyles.adStatusGridOfRightColumn}>
                                                <Typography sx={adViewStyles.adStatusText}>
                                                    {item.is_sell ? (
                                                        'Bu ilan satıldı'
                                                    ) : (item.status_id == '4') ? (
                                                        'Bu ilan öne çıkanlarda'
                                                    ):(
                                                        (item.is_visible) && !(item.is_sell) ? 'Bu ilan şuanda yayında' : 'Bu ilan yayında değil'
                                                    )}
                                                </Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={adViewStyles.adActionIconGrid}>
                                                {!(item.is_sell) ? (
                                                    <>
                                                        <IconButton aria-label="visible" onClick={() => handleVisibleChange(item.id!, item.is_visible!)}>
                                                            {item.is_visible ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                        <IconButton aria-label="edit" href={`/post/edit/${item.id}`}>
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton aria-label="delete" onClick={() => handleDeleteAdvert(item.id!)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </>
                                                ): (
                                                    <IconButton aria-label="delete" onClick={() => handleDeleteAdvert(item.id!)}>
                                                        <Delete />
                                                    </IconButton>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                             {/* Card footer elements = favorites and status button */}
                            <CardActions sx={adViewStyles.cardActions}>
                                <Grid container>
                                    {/* Favorite status */}
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={adViewStyles.cardFavoriteStatusGrid}>
                                        <Favorite sx={adViewStyles.adFavoriteIcon} />
                                        <Typography sx={adViewStyles.adFavoriteText}>
                                            Beğeniler: {item.likes}
                                        </Typography>
                                    </Grid>
                                     {/*  status determination buttons */}
                                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                                        <Box sx={adViewStyles.rightButtonsBox}>
                                        {!(item.is_sell) && (
                                             <Button
                                                onClick={() => handleSellChange(item.id!)}
                                                variant="outlined"
                                                sx={adViewStyles.rightButtons}
                                                size='small'
                                            >
                                                Satıldı olarak işaretle
                                            </Button>
                                        )}
                                        {item.is_visible || item.is_sell && 
                                            <Button
                                                onClick={() => handleHotAdvert(item.id!, item.status_id!)}
                                                variant="outlined"
                                                sx={adViewStyles.rightButtons}
                                                size='small'
                                            >
                                                {item.status_id == '4' ? 'Öne çıkanlardan kaldır' : 'Daha hızlı sat'}
                                            </Button>
                                        }
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                )): (
                    <NoResult page="myAds" />
                )}
            </Grid>
        </Container >
    )
}

export default MyAdsView