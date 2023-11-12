import React from 'react'

import { Grid, Card, CardActions, CardContent, CardMedia, Typography, Chip } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import BoltIcon from '@mui/icons-material/Bolt';

import styles from "../assets/css/cards.module.css";

type AdvertProps = {
    data: string[];
}

export const AdCard = ({ data } : AdvertProps) => {

  return (
    <Grid container spacing={2}>
        {data.map((item, index) => (
            <Grid item={true}  lg={3} md={3} sm={4} xs={6} key={index}>
                <Card className={styles.card}>
                    <div className={styles.cardMediaDiv}>
                        <CardMedia
                        component="img"
                        className={styles.cardMedia}
                        image={item.photo}
                        />
                        <div className={styles.cardActionLeft} >
                        <Chip
                            avatar={<BoltIcon />}
                            label="Öne Çıkan"
                            variant="outlined"
                            size="small"
                            className={styles.actionFeatured}
                        />
                        </div>
                        <div className={styles.cardActionRight} >
                        <IconButton aria-label="add to favorites" sx={{ padding: 0 }}>
                            <FavoriteIcon />
                        </IconButton>
                        </div>
                    </div>
                <CardContent>
                    <Typography gutterBottom component="div" sx={{ fontSize: '20px', fontWeight: '700' }}>
                    {item.price} TL
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {item.explain}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container className={styles.cardFooter}>
                    <Grid item={true} md={6} sm={6} xs={6}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '10px' }}>
                        {item.location}
                        </Typography>
                    </Grid>
                    <Grid item={true} md={6} sm={6} xs={6} sx={{ float: 'right' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right', fontSize: '10px' }}>
                        {item.date}
                        </Typography>
                    </Grid>
                    </Grid>
                </CardActions>
                </Card>
            </Grid>
        ))}
    </Grid>
  )
}