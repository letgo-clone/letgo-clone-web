import { useEffect, useState } from 'react'

// Material UI elements
import {
    Container,
    Grid,
    Box,
    Typography,
}
    from '@mui/material'

// Styles
import { adViewStyles } from '../../styles';

// Helpers
import { Request } from '../../helpers/Request';

// Component
import { AdCard } from '../../components/AdCard';

import { Link } from 'react-router-dom'

// interface
import {CardTypes} from '../advertTypes';

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
                    <Box sx={adViewStyles.topMenuBox}>
                        <Link
                            to="/profile/myads"
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography sx={adViewStyles.topMenuText}>
                                İlanlarım
                            </Typography>
                        </Link>
                        <Link
                            to="/profile/myfavorite"
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography sx={adViewStyles.topMenuText}>
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