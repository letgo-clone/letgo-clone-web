import React, { useState } from 'react'

// Material UI elements
import { 
    Box, 
    Grid, 
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    Typography, 
    Chip, 
    IconButton,
    Button 
    } from '@mui/material';

// Material UI Icons
import { 
    FavoriteBorder,
    Favorite,
    Bolt,
    Call
    } from '@mui/icons-material';

// Styles
import { adCardStyles } from '../styles';

// assets
import otoplusBadge from '../assets/img/otoplus-badge.png'

// Other package
import Swal from 'sweetalert2';
import slugify from 'react-slugify';
import { Link } from 'react-router-dom';

// helper
import { Request } from '../helpers/Request';

// Interfaces or Types
import { 
    AdvertProps,
    CardTypes
} from '../pages/advertTypes';


export const AdCard: React.FC<AdvertProps> = ({ data, grid }) => {
    const [cardData, setCardData] = useState<CardTypes[]>(data);

    const addFavorite = async (advertId: string, hasFavorite: boolean) => {
        
        if(hasFavorite){
            const formdata: FormData = new FormData();
            formdata.append("op", 'remove');
            formdata.append("path", 'has_advert_favorite');

            const url = '/advert/favorite/' + advertId;

            const data = await Request({
                method: 'PATCH',
                url: url,
                formData: formdata
            });

            const responseErrorCheck = Object.keys(data).filter(item => item == 'error')
            if(responseErrorCheck){
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
            
            const data = await Request({
                method: 'PATCH',
                url: url,
                formData: formdata
            });

            const responseErrorCheck = Object.keys(data).filter(item => item == 'error')

            if(responseErrorCheck){
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
                    <Card sx={adCardStyles.card}>
                        {/* Card Media */}
                        <Box sx={adCardStyles.cardMediaBox}>
                            <Box sx={adCardStyles.cardRightAction} onClick={() => addFavorite(item.id!, item.has_favorite!)}>
                                <IconButton aria-label="add to favorites" sx={adCardStyles.cardRightActionIconButton}>
                                    {item.has_favorite == true ? (
                                        <Favorite sx={{ color:'red' }} />
                                    ): (
                                        <FavoriteBorder sx={{ color:'red' }} />
                                    )}
                                </IconButton>
                            </Box>
                            <Link to={`/item/${slugify(item.title)}/${item.id}`} style={{ textDecoration: 'none' }}>
                                <CardMedia
                                    component="img"
                                    sx={
                                        item.display_type !== 'partner' ? (
                                            adCardStyles.cardMedia
                                        ): (
                                            adCardStyles.cardPartnerMedia
                                        )
                                    }
                                    loading="lazy"
                                    image={item.photo!}
                                />
                                {(item.display_type == 'hot' && item.display_name !== 'Otoplus') && (
                                    <Box sx={adCardStyles.cardLeftAction} >
                                        <Chip
                                            avatar={<Bolt />}
                                            label="Öne Çıkan"
                                            variant="outlined"
                                            size="small"
                                            sx={adCardStyles.cardLeftActionChip}
                                        />
                                    </Box>
                                )}
                                {(item.display_type == 'partner') && (
                                    <Box sx={adCardStyles.cardLeftAction} >
                                        <Chip
                                            label={<img src={otoplusBadge} />}
                                            variant="outlined"
                                            size="small"
                                            sx={adCardStyles.cardLeftActionChipPartner}
                                        />
                                    </Box>
                                )}
                            </Link>
                        </Box>
                        {/* Card Content */}
                        <Box 
                            sx={
                                item.display_type == 'hot' || item.display_type == 'partner'  ? (
                                    adCardStyles.cardContentFeaturedBox
                                ): item.display_type == 'new' ? (
                                    adCardStyles.cardContentNewStatusBox
                                ): (
                                    adCardStyles.cardContentFreeStatusBox
                                )
                            }
                        >
                            <CardContent sx={adCardStyles.cardContent}>
                                <Typography gutterBottom component="div" sx={adCardStyles.cardContentPrice}>
                                    {item.price} TL
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.title}
                                </Typography>
                            </CardContent>
                            {item.display_type !== 'partner' ? (
                                <CardActions>
                                  <Grid container sx={adCardStyles.cardFooterGrid}>
                                      <Grid item={true} md={6} sm={6} xs={6}>
                                          <Typography variant="body2" color="text.secondary" sx={adCardStyles.cardFooterLocation}>
                                              {item.county},{item.city}
                                          </Typography>
                                      </Grid>
                                      <Grid item={true} md={6} sm={6} xs={6} >
                                          <Typography variant="body2" color="text.secondary" sx={adCardStyles.cardFooterDateText}>
                                              {item.date}
                                          </Typography>
                                      </Grid>
                                  </Grid>
                                </CardActions>
                            ): (
                                <CardActions sx={adCardStyles.cardPartnerFooter}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Call />}
                                        sx={adCardStyles.cardPartnerCallButton}
                                    >
                                        Ara
                                    </Button>
                                </CardActions>
                            )}
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}