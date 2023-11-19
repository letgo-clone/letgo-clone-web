import { useEffect, useState } from 'react';

import { AdCard } from '../components/AdCard';
import { Typography, Button, Grid } from '@mui/material';

import { Request } from '../helpers/Request';

import otoplusBanner from '../assets/img/banner-otoplus.png'
import otoplusBannerMobile from '../assets/img/banner-otoplus-mobile.png'

import styles from "../assets/css/banner.module.css";

function Index() {
  const [advertData, setAdvertData] = useState('');

  useEffect(() => {
    const getData = async () => {
      const url = "/advert/actual"
      const data = await Request('GET', url);
      setAdvertData(data);
    }
    getData();
  }, [])

  return (
    <>
      <Grid container className={styles.bannerDiv}>
        <img src={otoplusBanner} className={styles.bannerDesktop} />
        <img src={otoplusBannerMobile} className={styles.bannerMobile} />
        <Grid container sx={{ position: 'absolute' }}>
          <Grid item xl={3} lg={3} md={3} sm={8} xs={8}>
            <Grid container spacing={3} sx={{ marginLeft: '10%', marginTop: { xl: '50%', lg: '70%', md: '80%', sm: '65%', xs: '60%' } }}>
              <Grid item lg={6} md={6} xs={6} className={styles.bottonDiv}>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: '#ff3f55',
                    textTransform: 'none',
                    color: '#FFFFFF',
                    borderRadius: '50px',
                    border: '3px solid #ff3f55',
                    '&:hover': { backgroundColor: '#ff3f55', border: '3px solid #ff3f55', color: '#FFFFFF' },
                  }}
                >
                  Araba Al
                </Button>
              </Grid>
              <Grid item lg={6} md={6} xs={6} className={styles.bottonDiv}>
                <Button
                  variant="outlined"
                  sx={{
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
          </Grid>

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
      {advertData && <AdCard data={advertData} />}
    </>
  )
}

export default Index