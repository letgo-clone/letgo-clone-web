import { useEffect, useState } from 'react';

import { AdCard } from '../components/AdCard';
import { Typography } from '@mui/material';

import { Request } from '../helpers/Request';


function Index() {
  const [advertData, setAdvertData] = useState('');

  useEffect(() => {

     const getData = async() => {
        const url = "/advert/actual"
        const data = await Request('GET', url);
        setAdvertData(data);
    }

    getData(); 

  },[])
  
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
        { advertData && <AdCard data={advertData} />}
      </>
  )
}

export default Index