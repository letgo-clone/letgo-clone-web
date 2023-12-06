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
    Menu,
    MenuItem,
    IconButton,
}
    from '@mui/material'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Link } from 'react-router-dom'
import { Request } from '../../helpers/Request';

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

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                {myAds.length > 0 && myAds.map((item, key) => (
                    <Grid item xl={12} lg={12} md={12} key={key}>
                        <Card
                            sx={{
                                minWidth: 275,
                                boxShadow: '0 1px 3px 0 rgba(0,47,52,.2), 0 1px 3px 0 rgba(0,47,52,.2)'
                            }}
                        >
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xl={6} md={6} sm={6} xs={6}>
                                        <Grid container>
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} sx={{ display: 'inline-flex' }}>
                                                <img
                                                    src={item.images[0].url}
                                                    style={{
                                                        objectFit: 'cover',
                                                        display: 'block'
                                                    }}
                                                    width={60}
                                                    height={60}
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        lineHeight: '20px',
                                                        fontWeight: 700,
                                                        paddingLeft: '15px',
                                                        paddingTop: '20px'
                                                    }}> {item.title}</Typography>
                                            </Grid>
                                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4} sx={{ textAlign: 'center' }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        color: '#2c2c2c',
                                                        marginTop: '28px'
                                                    }}
                                                >
                                                    {item.price}
                                                </Typography>
                                            </Grid>
                                            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: '#004bbe',
                                                        color: '#ffffff',
                                                        fontSize: '10px',
                                                        fontWeight: 400,
                                                        marginTop: '23px',
                                                        padding: '4px 35px'
                                                    }}
                                                    disabled={!(item.is_visible)}
                                                >
                                                    {item.is_visible ? 'Etkin' : 'Devre dışı'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xl={6} md={6} sm={6} xs={6}>
                                        <Grid container>
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} sx={{ textAlign: 'center' }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        lineHeight: 1.5,
                                                        color: '#2c2c2c',
                                                        marginTop: '28px'
                                                    }}
                                                >
                                                    {item.is_visible ? 'Bu ilan şuanda yayında' : 'Bu ilan yayında değil'}
                                                </Typography>
                                            </Grid>
                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} sx={{ textAlign: 'right' }}>
                                                <IconButton
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClick}
                                                >
                                                    <MoreHorizIcon />
                                                </IconButton>
                                                <Menu
                                                    id="long-button"
                                                    aria-labelledby="more"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                >
                                                    <MenuItem onClick={handleClose}>Düzenle</MenuItem>
                                                    <MenuItem onClick={handleClose}>Devre dışı bırak</MenuItem>
                                                    <MenuItem onClick={handleClose}>İlanı kaldır</MenuItem>
                                                </Menu>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions sx={{ borderTop: '1px solid #e0e0e0' }}>
                                <Grid container>
                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6}></Grid>
                                    <Grid item xl={6} lg={6} md={6} sm={6} xs={6} sx={{ textAlign: 'right' }}>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                backgroundColor: '#FFFFFF',
                                                color: '#ff3f55',
                                                borderRadius: '50px',
                                                border: '2px solid transparent',
                                                outline: '#ff3f55 solid 2px',
                                                textTransform: 'none',
                                                fontSize: '12px',
                                                marginRight: '20px',
                                                padding: '2px 10px 2px 10px',
                                                '&:hover': { backgroundColor: '#FFFFFF', border: '2px solid #ff3f55', color: '#ff3f55' },
                                            }}
                                            size='small'
                                        >
                                            Satıldı olarak işaretle
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                backgroundColor: '#FFFFFF',
                                                color: '#ff3f55',
                                                borderRadius: '50px',
                                                border: '2px solid transparent',
                                                outline: '#ff3f55 solid 2px',
                                                textTransform: 'none',
                                                fontSize: '12px',
                                                padding: '2px 10px 2px 10px',
                                                '&:hover': { backgroundColor: '#FFFFFF', border: '2px solid #ff3f55', color: '#ff3f55' },
                                            }}
                                            size='small'
                                        >
                                            Daha hızlı sat
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default MyAdsView