import { useEffect, useState } from 'react';

import { AdCard } from '../../components/AdCard';
import { Typography, Button, Grid, Container, Box } from '@mui/material';

import { RequestPublic } from '../../helpers/Request';

import otoplusBanner from '../../assets/img/banner-otoplus.png'
import otoplusBannerMobile from '../../assets/img/banner-otoplus-mobile.png'

import styles from "../../assets/css/banner.module.css";
import { homePageStyles, homeBannerStyles } from '../../styles';

function Index() {
  const [advertData, setAdvertData] = useState('');

  useEffect(() => {
    const getData = async () => {
        const advertGetUrl = "/advert/actual"
        const advertData = await RequestPublic('GET', advertGetUrl);
        setAdvertData(advertData);

    }
    getData();
  }, [])

  return (
    <Container>
       <Grid container sx={homePageStyles.bannerDiv} position="relative">
       <Box sx={homePageStyles.bannerDesktopBox}>
          <img src={otoplusBanner} style={homeBannerStyles.bannerDesktop} alt="Banner" />
       </Box>
       <Box sx={homePageStyles.bannerMobileBox}>
          <img src={otoplusBannerMobile} style={homeBannerStyles.bannerMobile} />
        </Box>
        <Grid item sx={homePageStyles.bannerContainer}>
            <Button variant="outlined" sx={homePageStyles.bannerButton}>
                  Araba Al
            </Button>
            <Button variant="outlined" sx={homePageStyles.bannerButton}>
                Araba Sat
            </Button>
        </Grid>
      </Grid>
      <Typography sx={homePageStyles.homeTitle}>Güncel İlanlar</Typography>
          {advertData && <AdCard data={advertData} grid={[3,3,4,6]} />}
    </Container>
  )
}

export default Index