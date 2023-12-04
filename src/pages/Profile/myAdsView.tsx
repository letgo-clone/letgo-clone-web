import React from 'react'
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

function MyAdsView() {
    return (
        <Container>
            <Grid container spacing={3} sx={{ marginTop: '25px' }}>
                <Grid item xl={12} lg={12} md={12}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            borderBottom : '1px solid #e0e0e0',
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
                <Grid item xl={12} lg={12} md={12}>2</Grid>
            </Grid>
        </Container>
    )
}

export default MyAdsView