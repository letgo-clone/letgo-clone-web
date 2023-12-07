import React, { useState } from 'react'

import { Grid, Card, CardActions, CardContent, CardMedia, Typography, Chip, Button } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import BoltIcon from '@mui/icons-material/Bolt';
import CallIcon from '@mui/icons-material/Call';

import { Link } from 'react-router-dom';

import styles from "../assets/css/cards.module.css";

import otoplusBadge from '../assets/img/otoplus-badge.png'

import slugify from 'react-slugify';

import { Request } from '../helpers/Request';
import Swal from 'sweetalert2';

type AdvertProps = {
    data: string[];
    grid: number[];
}

export const AdCard = ({ data, grid }: AdvertProps) => {
    const [cardData, setCardData] = useState(data);

    const addFavorite = async (advertId: number, hasFavorite: any) => {

        if(hasFavorite){
            const formdata: FormData = new FormData();
            formdata.append("op", 'remove');
            formdata.append("path", 'has_advert_favorite');

            const url = '/advert/favorite/' + advertId;
            const data = await Request('PATCH', url, formdata);

            if(data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: 'Bi Hata oluştu',
                  })
            }

            setCardData(prevObjects => {
                return prevObjects.map(obj => {
                  if (obj.id === advertId) {
                    return { ...obj, has_favorite: false }
                  }
                  return obj;
                })
            })  
        }
        else
        {
            const formdata: FormData = new FormData();
            formdata.append("op", 'add');
            formdata.append("path", 'has_advert_favorite');

            const url = '/advert/favorite/' + advertId;
            const data = await Request('PATCH', url, formdata);

            if(data.error){
                Swal.fire({
                    icon: 'error',
                    title: 'Hata',
                    text: 'Bi Hata oluştu',
                  })
            }

            setCardData(prevObjects => {
                return prevObjects.map(obj => {
                  if (obj.id === advertId) {
                    return { ...obj, has_favorite: true }
                  }
                  return obj;
                })
            })  
        }
    }

    return (
        <Grid container spacing={2}>
            {cardData.map((item, index) => (
                <Grid item={true} lg={grid[0]} md={grid[1]} sm={grid[2]} xs={grid[3]} key={index}>
                    <Card className={styles.card}>

                        <div className={styles.cardMediaDiv}>
                            <div className={styles.cardActionRight} onClick={() => addFavorite(item.id, item.has_favorite)}>
                                <IconButton aria-label="add to favorites" sx={{ padding: 0 }}>
                                    {item.has_favorite == true ? (
                                        <FavoriteIcon sx={{ color:'red' }} />
                                    ): (
                                        <FavoriteBorderIcon sx={{ color:'red' }} />
                                    )}
                                </IconButton>
                            </div>
                            <Link to={`/item/${slugify(item.title)}?id=${item.id}`} style={{ textDecoration: 'none' }}>
                                <CardMedia
                                    component="img"
                                    className={styles.cardMedia}
                                    image={item.photo}
                                />
                                {(item.display_type == 'hot' && item.user_type !== 'OTOPLUS') && (
                                    <div className={styles.cardActionLeft} >
                                        <Chip
                                            avatar={<BoltIcon />}
                                            label="Öne Çıkan"
                                            variant="outlined"
                                            size="small"
                                            className={styles.actionFeatured}
                                        />
                                    </div>
                                )}
                                {(item.user_type == 'OTOPLUS') && (
                                    <div className={styles.cardActionLeft} >
                                        <Chip
                                            label={<img src={otoplusBadge} />}
                                            variant="outlined"
                                            size="small"
                                            className={styles.actionOtoplusFeatured}
                                        />
                                    </div>
                                )}
                            </Link>
                        </div>
                        {item.user_type != 'OTOPLUS' ? (
                            item.display_type == 'hot' ? (
                                <div style={{ borderLeft: '5px solid #ffd200' }}>
                                    <CardContent sx={{ color: '#2c2c2c' }}>
                                        <Typography gutterBottom component="div" sx={{ fontSize: '20px', fontWeight: '700' }}>
                                            {item.price} TL
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container className={styles.cardFooter}>
                                            <Grid item={true} md={6} sm={6} xs={6}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '10px' }}>
                                                    {item.county},{item.city}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} md={6} sm={6} xs={6} sx={{ float: 'right' }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', fontSize: '10px' }}>
                                                    {item.date}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </div>
                            ) : item.display_type == 'new' ? (
                                <div style={{ borderLeft: '5px solid #004bbe' }}>
                                    <CardContent sx={{ color: '#2c2c2c' }}>
                                        <Typography gutterBottom component="div" sx={{ fontSize: '12px', fontWeight: '400', color: '#004bbe' }}>
                                            Yeni
                                        </Typography>
                                        <Typography gutterBottom component="div" sx={{ fontSize: '20px', fontWeight: '700' }}>
                                            {item.price} TL
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container className={styles.cardFooter}>
                                            <Grid item={true} md={6} sm={6} xs={6}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '10px' }}>
                                                    {item.county},{item.city}
                                                </Typography>
                                            </Grid>
                                            <Grid item={true} md={6} sm={6} xs={6} sx={{ float: 'right' }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', fontSize: '10px' }}>
                                                    {item.date}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </div>
                            ) : (
                                <div>
                                    <CardContent sx={{ color: '#2c2c2c' }}>
                                        <Typography gutterBottom component="div" sx={{ fontSize: '20px', fontWeight: '700' }}>
                                            {item.price} TL
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container className={styles.cardFooter}>

                                            <Grid item={true} md={6} sm={6} xs={6}>
                                                {item.city && (
                                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '10px' }}>
                                                        {item?.county}, {item?.city}
                                                    </Typography>
                                                )}
                                            </Grid>
                                            <Grid item={true} md={6} sm={6} xs={6} sx={{ float: 'right' }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', fontSize: '10px' }}>
                                                    {item.date}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </div>
                            )
                        ) : (
                            <div style={{ borderLeft: '5px solid #ffd200' }}>
                                <CardContent sx={{ color: '#2c2c2c' }}>
                                    <Typography gutterBottom component="div" sx={{ fontSize: '20px', fontWeight: '700' }}>
                                        {item.price} TL
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.title}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ display: 'grid' }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<CallIcon />}
                                        sx={{
                                            backgroundColor: '#ff3f55',
                                            color: '#FFFFFF',
                                            borderRadius: '50px',
                                            border: '3px solid #ff3f55',
                                            '&:hover': { backgroundColor: '#FFFFFF', border: '3px solid #ff3f55', color: '#ff3f55' },
                                        }}
                                    >
                                        Ara
                                    </Button>
                                </CardActions>
                            </div>
                        )}

                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}