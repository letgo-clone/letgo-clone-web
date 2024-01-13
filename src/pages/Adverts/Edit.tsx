import React, { useState, useEffect } from 'react'

// Material UI elements
import {
    Container, 
    Typography, 
    Grid, 
    MenuItem, 
    InputLabel, 
    TextField, 
    InputAdornment, 
    Divider,
    Breadcrumbs, 
    Button, 
    Box, 
    IconButton,
    Select
    } from '@mui/material'

// Material UI icons
import CloseIcon from '@mui/icons-material/Close';

// styles and assets
import { postAdvertStyles } from '../../styles';

// React router
import { useParams, useNavigate } from "react-router-dom";

// helpers
import { Request, RequestPublic } from '../../helpers/Request';

// Others
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

// Interfaces
import { 
    EditAdvertDetail, 
    EditAdvertImages, 
    CitiesProps, 
    CountiesProps 
    } from '../advertTypes';

    import { PostAdvertTypes } from '../formTypes';

function AdvertEdit() {
    // React router elements
    const params = useParams();
    const navigate = useNavigate();
    const advertId = params.advertId;

     // useState elements
    const [cities, setCities] = useState<CitiesProps[]>([]);
    const [counties, setCounties] = useState<CountiesProps[]>([]);
    const [advertDetail, setAdvertDetail] = useState<EditAdvertDetail>({});
    const [advertImages, setAdvertImages] = useState<EditAdvertImages[] | any>([]);
    const [deletedAdvertImages, setDeletedAdvertImages] = useState<object[]>([]);

    const initialValues: PostAdvertTypes = {
        title: (advertDetail && advertDetail.title),
        description: (advertDetail && advertDetail.description),
        price: (advertDetail && advertDetail.price),
        city_id: String(advertDetail.city_id!),
        county_id: String(advertDetail.county_id!),
        how_status : (advertDetail?.how_status),
        photo: []
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: async (values) => {
            const {title, description, price, city_id, county_id, how_status} = values;

            if(title == '' || description == '' || price == '' || county_id == null || how_status == '' || advertImages.length == 0){
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
                formdata.append("title", title!);
                formdata.append("description", description!);
                formdata.append("price", price!);
                formdata.append("city_id", String(city_id!));
                formdata.append("county_id", county_id!);
                formdata.append("how_status", how_status!);
                formdata.append("old_images", JSON.stringify(deletedAdvertImages));
                formdata.append("cover_image_id", advertImages[0].image_id);
    
                const filterNewImage = advertImages.filter((item: File | EditAdvertImages) => item instanceof File)
                filterNewImage.forEach((file: File) => { 
                    formdata.append('photo', file);
                }); 
    
                const url = "/advert/list/" + advertId;

                const response = await Request({
                    method: 'PUT',
                    url: url,
                    formData: formdata 
                });
                
                const responseCheck = Object.keys(response).filter(item => item == 'success')
                if (responseCheck) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Güncellendi.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/profile/myads')
                } 
                else {
                    await Swal.fire({
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

     // useEffect elements


    /*
        gets advert data from API
    */
    useEffect(() => {
        const getData = async() => {
            const url = '/advert/list/' + advertId;
            const data: EditAdvertDetail | any = await Request({
                method: 'GET',
                url: url
            });
            setAdvertDetail(data);
            
            const sortedImages = data.images.sort((item: EditAdvertImages, key: EditAdvertImages) =>
                item.is_cover_image === key.is_cover_image ? 0 : item.is_cover_image ? -1 : 1
            );
            setAdvertImages(sortedImages);
        }
        getData();
    }, []);

    /*
        gets cities of location data from API
    */
    useEffect(() => {
        const getCities = async () => {
            const url = "/advert/location";

            const getData = await RequestPublic({
                method: 'GET',
                url: url
            });
            setCities(getData);
        }
        getCities();
    }, [])

    /*
        gets counties of location data from API
    */
    useEffect(() => {
        const getCounties = async () => {
            const url = "/advert/location/" + formik.values.city_id;

            const getData = await RequestPublic({
                method :'GET',
                url: url
            });

            setCounties(getData);
        }
        if(formik.values.city_id !== 'undefined'){
            getCounties();
        }
    }, [formik.values.city_id]);

    /*
       gets selected image from pc
    */
    const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = event.target.files;

        if(fileList){
            const files: File[] = Array.from(fileList);

            setAdvertImages((prevImages: any) => {
                const prevArray = prevImages ? Array.from(prevImages) : [];
                return [...prevArray, ...files];
            });
        }

        formik.setFieldValue("photo", event.currentTarget.files);
    }

    /*
        Remove selected image from upload images
    */
    const removeImage = (imageId: number, imageKey: number) => {
        const newList = advertImages.filter((item: EditAdvertImages, key: number) => key !== imageKey && item);
    
        setAdvertImages(newList);

        if(imageId){
            setDeletedAdvertImages((prevDeletedImages) => [
                ...prevDeletedImages,
                advertImages.find((item: EditAdvertImages) => item.image_id == imageId),
            ]);
        }
    }
    return (
        <Container>
            <Typography sx={postAdvertStyles.toptTile}>
                Düzenle
            </Typography>
            <Grid container sx={postAdvertStyles.mainGrid}>
                <Typography sx={postAdvertStyles.subTitle}>
                    SEÇİLEN KATEGORİ
                </Typography>
                <form
                        method='POST'
                        onSubmit={formik.handleSubmit}
                        encType='multipart/form-data'
                    >
                    <Grid container>
                        {Object.keys(advertDetail).length !== 0 && (
                            <>
                             {/* BreadCrumb area */}
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={postAdvertStyles.breadCrumbGrid}>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Typography
                                            sx={postAdvertStyles.breadCrumbText}>
                                                {advertDetail.category_name!}
                                    </Typography>
                                    <Typography sx={postAdvertStyles.breadCrumbText}> {advertDetail.sub_category_name!}</Typography>
                                </Breadcrumbs>
                            </Grid>
                            <Divider />
                            {/* advert info column = title, description, status */}
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={postAdvertStyles.inputGrids}>
                                <Typography sx={postAdvertStyles.inputTopTitles}>
                                    BİRAZ BİLGİ EKLE
                                </Typography>
                                <Grid container spacing={3} sx={postAdvertStyles.inputsGridContainer}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <InputLabel shrink htmlFor="how_status">
                                            Durum
                                        </InputLabel>
                                        <Select
                                            id="outlined-select-currency"
                                            fullWidth
                                            size="small"
                                            name="how_status"
                                            value={formik.values.how_status}
                                            onChange={formik.handleChange}
                                            error={Boolean(formik.values.how_status == '' && formik.touched.how_status)}
                                            defaultValue={"Yeni"}
                                        >
                                            <MenuItem value="Yeni">Yeni</MenuItem>
                                            <MenuItem value="Yeni gibi">Yeni gibi</MenuItem>
                                            <MenuItem value="İyi">İyi</MenuItem>
                                            <MenuItem value="Makul">Makul</MenuItem>
                                            <MenuItem value="Yıpranmış">Yıpranmış</MenuItem>
                                        </Select>
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
                                            error={Boolean(formik.values.title == '')}
                                            helperText={formik.values.title == '' ? 'En az 1 karakter olması gerekir. Lütfen alanı düzenle.': 'Ürününün temel özelliklerinden bahset (ör. marka, model, yaş, tip)'}
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
                                            error={Boolean(formik.values.description == '')}
                                            helperText={formik.values.description == '' ? 'En az 10 karakter olması gerekir. Lütfen alanı düzenle.' : 'Durum, özellik ve satma nedeni gibi bilgileri ekle'}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* advert price column */}
                            <Grid item xl={12} lg={12} sm={12} xs={12} sx={postAdvertStyles.inputGrids}>
                                <Typography sx={postAdvertStyles.inputTopTitles}>
                                    FİYAT BELİRLE
                                </Typography>
                                <Grid container spacing={3} sx={postAdvertStyles.inputsGridContainer}>
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
                                            error={Boolean(formik.values.price == '')}
                                            helperText={formik.values.price == '' && 'Bu alan zorunludur'}
                                            inputProps={{ type: 'number'}} 
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* advert image column */}
                            <Grid item xl={12} lg={12} sm={12} xs={12} sx={postAdvertStyles.inputGrids}>
                                <Typography sx={postAdvertStyles.inputTopTitles}>
                                    21 ADEDE KADAR FOTOĞRAF YÜKLEYEBİLİRSİN
                                </Typography>
                                <Grid container sx={postAdvertStyles.fileInputGrid}>
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
                                    {advertImages.length < 1 &&
                                        <Typography sx={postAdvertStyles.fileInputValidationText}>Bu alan zorunludur</Typography>
                                    }
                                </Grid>
                                <Grid container sx={postAdvertStyles.fileInputImageGrid}>
                                    {advertImages.length > 0 && advertImages.map((item: any, key: number) => (
                                        <Box sx={postAdvertStyles.fileInputImageBox} key={key}>
                                                <img 
                                                    src={item.image_id ? item.url : URL.createObjectURL(item)} 
                                                    style={{ objectFit: 'cover' }} 
                                                    width={140} 
                                                    height={140} 
                                                    alt="Advert" 
                                                />
                                                <Box className='image-content' sx={postAdvertStyles.fileInputIconBox}>
                                                        <IconButton 
                                                            aria-label="remove to advert" 
                                                            onClick={() => removeImage(item.image_id!, key)}
                                                            sx={{ backgroundColor: '#000000', borderRadius: 3, '&:hover': {backgroundColor :'#000000'}}}
                                                        >
                                                                <CloseIcon sx={{ fontSize: '21px',color: '#ffffff' }} />
                                                        </IconButton>
                                                </Box>
                                                {key == 0  &&
                                                    <Typography variant="body2" sx={postAdvertStyles.fileInputImageText}>
                                                        KAPAK
                                                    </Typography>
                                                }
                                        </Box>
                                    ))}
                                </Grid>
                            </Grid>
                             {/* advert location column */}
                            <Grid item xl={12} lg={12} sm={12} xs={12} sx={postAdvertStyles.inputGrids}>
                                <Typography sx={postAdvertStyles.locationInputTopTitle}>
                                    KONUMUNU ONAYLA
                                </Typography>
                                <Grid container spacing={3} sx={postAdvertStyles.locationInputGrid}>
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
                                                    error={Boolean(formik.values.city_id == '')}
                                                    helperText={formik.values.city_id == '' && 'Bu alan zorunludur'}
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
                                                        error={Boolean(formik.values.county_id == '')}
                                                        helperText={formik.values.county_id == '' && 'Bu alan zorunludur'}
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
                                </Grid>
                            </Grid>
                             {/* send button */}
                            <Grid item xl={12} lg={12} sm={12} xs={12} sx={postAdvertStyles.inputGrids}>
                                <Grid container>
                                    <Grid lg={12} md={12} sm={12} xs={12} sx={postAdvertStyles.sendButtonGrid}>
                                        <Button
                                            variant="outlined"
                                            sx={postAdvertStyles.sendButton}
                                            color="error"
                                            type="submit"
                                        >
                                            Devam et
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                            </>
                        )}
                    </Grid>
                </form>
            </Grid>
        </Container>
    )
}

export default AdvertEdit