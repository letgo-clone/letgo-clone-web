import { useEffect, useState, lazy, Suspense } from 'react';

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
const AdCard = lazy(() => import('../../components/common/AdCard'))
import AdCardLazy from '../../components/common/AdCardLazy';
import CategoryBanner from '../../components/CategoryBanner';

// helpers
import { RequestPublic } from '../../helpers/Request';

// interfaces
import { CardTypes } from '../advertTypes';

function Index() {
  document.title = "Türkiye'deki İkinci El Eşyaları Al & Sat - Clone";
  // useState area
  const [advertData, setAdvertData] = useState<CardTypes[]>([]);
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
              <Button href="https://www.otoplus.com/al" target='blank' variant="outlined" sx={homePageStyles.bannerButton}>
                    Araba Al
              </Button>
              <Button href="https://www.otoplus.com/araba-sat" target="blank" variant="outlined" sx={homePageStyles.bannerButton}>
                  Araba Sat
              </Button>
          </Grid>
      </Grid>
      <CategoryBanner styles={homePageStyles} page="home" handleDrawerClose={null} />
      {/* Actual advert */}
      <Typography sx={homePageStyles.homeTitle}>Güncel İlanlar</Typography>
          <Suspense fallback={<AdCardLazy  grid={[3, 3, 4, 6]} />}>
              <AdCard data={advertData} grid={[3, 3, 4, 6]} />
          </Suspense>
    </Container>
  )
}

export default Index