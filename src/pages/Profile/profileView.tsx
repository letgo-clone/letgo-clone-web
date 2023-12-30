import React, { useEffect, useState } from 'react'
import {
    Container,
    Grid,
    Button,
    Typography,
    InputAdornment,
    TextField,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
}
    from '@mui/material'

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@mui/icons-material/Edit';

import Swal from 'sweetalert2';

import { useParams } from "react-router-dom";
import { Request } from '../../helpers/Request';

import { AdCard } from '../../components/AdCard';

import { useAppSelector } from '../../redux/store';

function ProfileView() {
    const {loginData} = useAppSelector((state) => state?.authUser);
    
    let userId;
    const params = useParams();
    const paramsId = params.userId;

    if (paramsId) {
        userId = paramsId
    } else {
        userId = loginData.id
    }

    const [profile, setProfile] = useState({});
    const [advert, setAdvert] = useState({})

    useEffect(() => {
        const getData = async () => {
            const url = "/account/info/" + userId;
            const data = await Request('GET', url);
            setProfile(data.userData);
            setAdvert(data.advertData);
        }
        getData();
    }, []);

    return (
        <Container>
            {profile && (
                <Grid container sx={{ marginTop: '25px' }}>
                    <Grid item xl={4} lg={4} md={4} xs={12} sm={12} sx={{ paddingLeft: '45px', marginBottom: '25px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                src={profile.photo?.url}
                                sx={{ width: 120, height: 120, alignSelf: 'center' }}
                            />
                        </Box>
                        <Typography
                            sx={{
                                fontSize: '24px',
                                lineHeight: '24px',
                                fontWeight: 700,
                                marginTop: '25px'
                            }}
                        >
                            {profile.fullname}
                        </Typography>
                        <List>
                            <ListItem sx={{ paddingLeft: '0' }}>
                                <ListItemAvatar sx={{ minWidth: '35px' }}>
                                    <CalendarMonthIcon />
                                </ListItemAvatar>
                                <ListItemText secondary={`${profile.date} tarihinden beri üye`} />
                            </ListItem>
                        </List>
                        <Grid xl={12} lg={12} md={12} xs={12} sm={12} sx={{ display: 'grid' }}>
                            <Button
                                href="/editProfile/info"
                                variant="outlined"
                                sx={{
                                    backgroundColor: '#ff3f55',
                                    color: '#FFFFFF',
                                    textTransform: 'none',
                                    border: '6px solid transparent',

                                    fontSize: '16px',
                                    marginRight: '15px',
                                    marginBottom: '5px',
                                    borderRadius: 15,
                                    '&:hover': { bgcolor: '#FFFFFF', border: '6px solid #ff3f55', color: '#ff3f55' },
                                }}
                                startIcon={<EditIcon />}
                                color="error"
                                type="submit"
                            >
                                Profili Düzenle
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xl={8} lg={8} md={8} xs={12} sm={12}>
                        {advert.length > 0 && <AdCard data={advert} grid={[4, 4, 4, 6]} />}
                    </Grid>
                </Grid>
            )}
        </Container>
    )
}

export default ProfileView