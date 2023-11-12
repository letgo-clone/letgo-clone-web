import React from 'react'


import { AdCard } from '../components/AdCard';
import { Typography } from '@mui/material';

function index() {
  let dataAd: (object)[];

  dataAd = [
    {
      id: 23,
      price: 600,
      photo: 'https://apollo-ireland.akamaized.net/v1/files/ynm4j6jj89vc2-OLXAUTOTR/image;s=780x0;q=60',
      explain: 'Raf Kitaplık',
      location: 'Sarıyer, İstanbul',
      date: 'Bugün',
    },
    {
      id: 24,
      price: 600,
      photo: 'https://apollo-ireland.akamaized.net/v1/files/j07mbdudw9ay-OLXAUTOTR/image;s=780x0;q=60',
      explain: 'Raf Kitaplık',
      location: 'Bağcılar, İstanbul',
      date: 'Bugün',
    },
    {
      id: 24,
      price: 600,
      photo: 'https://apollo-ireland.akamaized.net/v1/files/j07mbdudw9ay-OLXAUTOTR/image;s=780x0;q=60',
      explain: 'Raf Kitaplık',
      location: 'Bağcılar, İstanbul',
      date: 'Bugün',
    },
    
  ]
  
  return (
      <>
        <Typography 
            sx={{ 
              marginTop:'25px', 
              marginBottom:'15px', 
              fontSize: '24px',
              fontWeight: 200 
          }}
          >Güncel İlanlar</Typography>
        <AdCard data={dataAd} />
      </>
  )
}

export default index