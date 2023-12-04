import React, { useEffect, useState } from 'react'
import {
    Container,
    Grid,
    Box,
    Button,
    Typography,
    InputAdornment,
    TextField,
}
    from '@mui/material'

import { Link } from 'react-router-dom'
import { Request } from '../../helpers/Request';
import { AdCard } from '../../components/AdCard';

function MyFavoriteView() {
    const [favoriteData, setFavoriteData] = useState({});

    useEffect(() => {
        const getData = async () => {
            const url = "/advert/favorite/list";
            const data = await Request('GET', url);
            setFavoriteData(data.getData);
        }
        getData()
    }, [])
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
                <Grid item xl={12} lg={12} md={12}>
                    {favoriteData.length > 0 && <AdCard data={favoriteData} grid={[4, 4, 4, 6]} />}
                </Grid>
            </Grid>
        </Container>
    )
}

export default MyFavoriteView