import React from 'react'


import { AdCard } from '../components/AdCard';

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
        <AdCard data={dataAd} />
      </>
  )
}

export default index