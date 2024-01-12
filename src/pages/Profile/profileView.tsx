import { useEffect, useState } from 'react'

// Material UI elements
import {
    Container,
    Grid,
    Button,
    Typography,
    Avatar,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
    }
    from '@mui/material'

// Material UI icons

import {
    CalendarMonth,
    Edit
    } from '@mui/icons-material';

// Styles
import { profileViewStyles } from '../../styles';

// Assets
import defaultAvatar from '../../assets/img/default_avatar.png'

// Components
import AdCard from '../../components/common/AdCard';

// Helpers
import { Request } from '../../helpers/Request';

// Redux
import store from '../../redux/store';

import { useParams } from "react-router-dom";

// interfaces
import { 
    CardTypes,
    UserProfileProp 
    } from '../advertTypes';


function ProfileView() {
    // Redux
    const loginData = store.getState().authUser?.loginData;

    // Router
    const params = useParams();
    const paramsId = params.userId;

    // useState
    const [profile, setProfile] = useState<UserProfileProp>({});
    const [advert, setAdvert] = useState<CardTypes[]>([])
    
    useEffect(() => {
        const getData = async () => {
            const userID = paramsId ? paramsId : loginData?.id;
            const url = "/account/info/" + userID;
            const data: object[] | any  = await Request({
                method : 'GET',
                url: url
            });

            if(Object.keys(data).length > 0){
                setProfile(data?.user);
                setAdvert(data?.adverts);
            }
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
                                {/* User image */}
                                <Box sx={profileViewStyles.profileImageBox}>
                                    <Avatar
                                        src={profile.photo == null ? defaultAvatar : profile.photo?.url}
                                        sx={profileViewStyles.profileImage}
                                    />
                                </Box>
                                 {/* User fullname */}
                                <Typography sx={profileViewStyles.profileFullname}>
                                    {profile.fullname}
                                </Typography>
                                 {/* User info */}
                                <List>
                                    <ListItem sx={profileViewStyles.profileListItem}>
                                        <ListItemAvatar sx={profileViewStyles.profileListItemAvatar}>
                                            <CalendarMonth />
                                        </ListItemAvatar>
                                        <ListItemText secondary={`${profile?.date} tarihinden beri üye`} />
                                    </ListItem>
                                </List>
                                <Grid xl={12} lg={12} md={12} xs={12} sm={12}>
                                    <Box sx={profileViewStyles.editProfileButtonBox}>
                                        <Button
                                            href="/editProfile/info"
                                            variant="outlined"
                                            sx={profileViewStyles.editProfileButton}
                                            startIcon={<Edit />}
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
                            {Object.keys(advert).length > 0 && <AdCard data={advert} grid={[4, 4, 4, 6]} />}
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Container>
    )
}

export default ProfileView