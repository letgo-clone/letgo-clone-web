import { useEffect, useState } from 'react'

// Material UI elements
import {
    Container,
    Grid,
}
    from '@mui/material'


// Helpers
import { Request } from '../../helpers/Request';

// Component
import AdCard from '../../components/common/AdCard';
import ProfileTopMenu from '../../components/common/ProfileTopMenu';

// interface
import { CardTypes } from '../advertTypes';

function MyFavoriteView() {
    const [favoriteData, setFavoriteData] = useState<CardTypes[]>([]);

    useEffect(() => {
        const getData = async () => {

            const url = "/advert/favorite/list";
            const data = await Request({
                method: 'GET',
                url: url
            });

            setFavoriteData(data);
        }
        getData()
    }, [])
    return (
        <Container>
            <Grid container spacing={3} sx={{ marginTop: '25px' }}>
                <Grid item xl={12} lg={12} md={12}>
                    <ProfileTopMenu />
                </Grid>
                <Grid item xl={12} lg={12} md={12}>
                    {favoriteData.length > 0 && <AdCard data={favoriteData} grid={[4, 4, 4, 6]} />}
                </Grid>
            </Grid>
        </Container>
    )
}

export default MyFavoriteView