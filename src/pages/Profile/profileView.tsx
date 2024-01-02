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

import { profileViewStyles } from '../../styles';

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
                <Box sx={profileViewStyles.mainBox}>
                    <Grid container>
                        <Grid item xl={4} lg={4} md={4} xs={12}>
                            <Box sx={profileViewStyles.profileInfoBox}>
                                <Box sx={profileViewStyles.profileImageBox}>
                                    <Avatar
                                        src={profile.photo?.url}
                                        sx={profileViewStyles.profileImage}
                                    />
                                </Box>
                                <Typography sx={profileViewStyles.profileFullname}>
                                    {profile.fullname}
                                </Typography>
                                <List>
                                    <ListItem sx={profileViewStyles.profileListItem}>
                                        <ListItemAvatar sx={profileViewStyles.profileListItemAvatar}>
                                            <CalendarMonthIcon />
                                        </ListItemAvatar>
                                        <ListItemText secondary={`${profile.date} tarihinden beri üye`} />
                                    </ListItem>
                                </List>
                                <Grid xl={12} lg={12} md={12} xs={12} sm={12}>
                                    <Box sx={profileViewStyles.editProfileButtonBox}>
                                        <Button
                                            href="/editProfile/info"
                                            variant="outlined"
                                            sx={profileViewStyles.editProfileButton}
                                            startIcon={<EditIcon />}
                                            color="error"
                                            type="submit"
                                        >
                                            Profili Düzenle
                                        </Button>
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xl={8} lg={8} md={8} xs={12} sm={12}>
                            {advert.length > 0 && <AdCard data={advert} grid={[4, 4, 4, 6]} />}
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Container>
    )
}

export default ProfileView