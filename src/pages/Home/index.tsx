import { useEffect, useState } from 'react';

import { AdCard } from '../../components/AdCard';
import { Typography, Button, Grid, Container } from '@mui/material';

import { RequestPublic } from '../../helpers/Request';

import otoplusBanner from '../../assets/img/banner-otoplus.png'
import otoplusBannerMobile from '../../assets/img/banner-otoplus-mobile.png'

import styles from "../../assets/css/banner.module.css";

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
       <Grid container className={styles.bannerDiv} position="relative">
        <img src={otoplusBanner} className={styles.bannerDesktop} alt="Banner" />
        <img src={otoplusBannerMobile} className={styles.bannerMobile} />
        <Grid item className={styles.buttonContainer}>
            <Button
                  variant="outlined"
                  sx={{
                    padding: {lg: '10px 50px 10px 50px', md: '10px 50px 10px 50px', sm: '10px 40px 10px 40px'},
                    backgroundColor: '#ff3f55',
                    marginRight:'20px',
                    textTransform: 'none',
                    color: '#FFFFFF',
                    borderRadius: '50px',
                    border: '3px solid #ff3f55',
                    '&:hover': { backgroundColor: '#ff3f55', border: '3px solid #ff3f55', color: '#FFFFFF' },
                  }}
                >
                  Araba Al
            </Button>
            <Button
                variant="outlined"
                sx={{
                  padding: {lg: '10px 50px 10px 50px', md: '10px 50px 10px 50px', sm: '10px 40px 10px 40px'},
                  backgroundColor: '#ff3f55',
                  textTransform: 'none',
                  color: '#FFFFFF',
                  borderRadius: '50px',
                  border: '3px solid #ff3f55',
                  '&:hover': { backgroundColor: '#ff3f55', border: '3px solid #ff3f55', color: '#FFFFFF' },
                }}
              >
                Araba Sat
            </Button>
        </Grid>
      </Grid>
      <Typography
        sx={{
          marginTop: '25px',
          marginBottom: '15px',
          fontSize: '24px',
          fontWeight: 200
        }}
      >Güncel İlanlar</Typography>
      {advertData && <AdCard data={advertData} grid={[3,3,4,6]} />}
    </Container>
  )
}

export default Index