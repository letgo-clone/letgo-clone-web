import { useEffect, useState } from 'react';

// Material UI elements
import { 
  Typography, 
  Button, 
  Grid, 
  Container, 
  Box 
  } from '@mui/material';

// Style and assets
import { homePageStyles, homeBannerStyles } from '../../styles';

import otoplusBanner from '../../assets/img/banner-otoplus.png'
import otoplusBannerMobile from '../../assets/img/banner-otoplus-mobile.png'

// Components
import { AdCard } from '../../components/AdCard';

// helpers
import { RequestPublic } from '../../helpers/Request';

// interfaces
import { CardTypes } from '../advertTypes';

function Index() {
  // useState area
  const [advertData, setAdvertData] = useState<CardTypes>({});

  // useEffect area
  useEffect(() => {
    const getData = async () => {
        const advertGetUrl = "/advert/actual"
 
        const advertData = await RequestPublic({
            method: 'GET',
            url: advertGetUrl
        });

        setAdvertData(advertData);
    }
    getData();
  }, [])

  return (
    <Container>
      {/* Banner  */}
       <Grid container sx={homePageStyles.bannerDiv} position="relative">
          <Box sx={homePageStyles.bannerDesktopBox}>
              <img src={otoplusBanner} style={homeBannerStyles.bannerDesktop} loading='lazy' />
          </Box>
          <Box sx={homePageStyles.bannerMobileBox}>
              <img src={otoplusBannerMobile} style={homeBannerStyles.bannerMobile} loading='lazy' />
          </Box>
           {/* Buttons into banner  */}
          <Grid item sx={homePageStyles.bannerContainer}>
              <Button variant="outlined" sx={homePageStyles.bannerButton}>
                    Araba Al
              </Button>
              <Button variant="outlined" sx={homePageStyles.bannerButton}>
                  Araba Sat
              </Button>
          </Grid>
      </Grid>
      {/* Actual advert */}
      <Typography sx={homePageStyles.homeTitle}>Güncel İlanlar</Typography>
          {advertData && <AdCard data={advertData} grid={[3,3,4,6]} />}
    </Container>
  )
}

export default Index