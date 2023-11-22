import React, { useState, useEffect } from 'react'
import { Grid, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Divider, TextField, Button, Select, MenuItem, Chip, FormControl } from '@mui/material'

import { Request } from '../../helpers/Request';

import { AdCard } from '../../components/AdCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Link } from 'react-router-dom';

const Search = () => {
    const [advertData, setAdvertData] = useState('');

    useEffect(() => {
        const getData = async () => {
            /*           let myHeaders: Headers = new Headers();
                      myHeaders.append("Cookie", "_abck=A7612682F5225D9B716F452C612B454F~-1~YAAQLN46Fxq1rt2LAQAA1I3+9Qpey3sNTwN3h3xzapsDOuDsfVY170L03ZjxK80E9p9OWru/ndNGeG2aWh5kLPlyw2/JjdJ7OX74h7Up/AbqvOFDzuHcGreEIc6Up0g+wgtk5QiU2W+erI+UuZo/r9NRqmVuFJ5CTK4F4zLkAyBWvJeP7NQelZmfAb0YV1R2mJ0tvX/p6KpPh39SjzGWwtRcPL+2RG6h2Yz5vKn2PuoI1geWzIcSn4A1QZzroExypTkBtm9B4ftky7XjJ3d1Lfab2u0XzZ9/C3uoa0JuUZt0HeBxpzNFeQskpMQkHPiiGW8FF86OHb+LbFX97NOoF1He2TJc7GEo09tSeIGLIbyBcZFgpqO/2Q==~-1~-1~-1; bm_sz=D9D509F2676AF2EAE9E0D68853B37E64~YAAQLN46Fxu1rt2LAQAA1I3+9RUrTBzgSMGMHNljDjRxLYiLAr2USUPmouQ4NKH+V8/qxf0LgsbJwIubSrQkZTQvz9dIPxJPbdhPM8tiVwMgrzbcIDtLlStU9CK4+2GYYpapPPJLKgILheVOXcWozyLqfsiclmgwF53ZoEtnWseKBTkqJhnr/gqIzkgD4y+c0IF9WEFDtdnuqvkrH+JZb+yVXKBoK8qDDfoC4ZKF4u++xidXcLiy6Ac2VBiktWtIzGb7wChSuOojNVrUNM/NBdZ90RnFXj+4ou8iERkSl2P3qQ==~4277816~3487554");
                      myHeaders.append('Accept', 'application/json');
                      myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:5173');
                      myHeaders.append('Access-Control-Allow-Credentials', 'true');
          
          
                      let requestOptions: any = {
                          credentials: 'include',
                          method: 'GET',
                          headers: myHeaders,
                          redirect: 'follow',
                      };
          
                      fetch("https://www.letgo.com/api/relevance/v4/search?category=601&facet_limit=100&location=4000040&location_facet_limit=20&platform=web-desktop&query=iphone&relaxedFilters=true&spellcheck=true&user=18bf5b3d443x46b5dbc7", requestOptions)
                          .then(response => response.json())
                          .then(result => console.log(result))
                          .catch(error => console.log('error', error)); */


            const url = "/advert/actual"
            const data = await Request('GET', url);
            setAdvertData(data);
        }
        getData();
    }, [])
    return (
        <Container>
            <Grid container>
                <Grid xl={4} lg={4} md={4} sx={{ marginTop: '30px' }}>
                    <Grid spacing={2} container>
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Link to="/" style={{ textDecoration: 'none', color: '#424242' }}><Typography sx={{ fontSize: '12px', fontWeight: 400 }}>Ana sayfa</Typography></Link>
                            <Typography sx={{ fontSize: '24px', fontWeight: 600 }}>İphone 14 in Istanbul</Typography>
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Accordion sx={{ boxShadow: 'none' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ flexShrink: 0, fontWeight: 700, textTransform: 'uppercase' }}>
                                        Kategoriler
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul style={{ listStyle: '-' }}>
                                        <li>Tüm Kategoriler</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Divider />
                            <Accordion sx={{ boxShadow: 'none' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ flexShrink: 0, fontWeight: 700, textTransform: 'uppercase' }}>
                                        Lokasyonlar
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul style={{ listStyle: '-' }}>
                                        <li>İstanbul</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Divider />
                            <Typography sx={{ margin: '25px 0px 25px 15px' }}>
                                Filtreler
                            </Typography>
                            <Accordion sx={{ boxShadow: 'none' }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ flexShrink: 0, fontWeight: 700, textTransform: 'uppercase' }}>
                                        Fiyatlar
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={1}>
                                        <Grid item xl={3} md={3} sm={3} xs={3}>
                                            <TextField id="outlined-basic" label="en az" variant="outlined" size="small" />
                                        </Grid>
                                        <Grid item xl={2} md={2} sm={2} xs={2} >
                                            <Typography sx={{ textAlign: 'center', marginTop: '15px' }}>
                                                -
                                            </Typography>
                                        </Grid>
                                        <Grid item xl={3} md={3} sm={3} xs={3}>
                                            <TextField id="outlined-basic" label="en çok" variant="outlined" size="small" />
                                        </Grid>
                                        <Grid item xl={3} md={3} sm={3} xs={3} sx={{ marginLeft: 2, marginTop: 1 }}>
                                            <Button variant="contained" sx={{
                                                color: '#FFFFFF',
                                                backgroundColor: '#ff3f55',
                                                borderRadius: 5,
                                                border: '3px solid #ff3f55',
                                                textTransform: 'none',
                                                padding: 0,
                                                '&:hover': { backgroundColor: '#FFFFFF', color: '#ff3f55', border: '3px solid #ff3f55' },
                                            }}>Uygula</Button>
                                        </Grid>
                                    </Grid>

                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xl={8} lg={8} md={8}>
                    <Grid container sx={{ marginTop: '15%' }}>
                        <Grid xl={4} md={4} sm={4} xs={4}>
                            <Typography
                                sx={{
                                    marginBottom: '15px',
                                    fontSize: '14px',
                                    fontWeight: 200
                                }}
                            > <span style={{ fontWeight: 600 }}> &quot;Araba&quot; </span> için arama sonuçları</Typography>
                        </Grid>
                        <Grid xl={2} md={2} sm={2} xs={2}>
                            <Chip label="3878 ilan" color="primary" />
                        </Grid>
                        <Grid xl={3} md={3} sm={3} xs={3} sx={{ textAlign: 'right' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 700, marginTop: 1.5, textTransform: 'uppercase' }}>
                                Sıralama Ölçütü :
                            </Typography>
                        </Grid>
                        <Grid xl={3} md={3} sm={3} xs={3}>
                            <FormControl variant="standard" sx={{ m: 1, width:'100%' }}>
                                <Select
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={{ textAlign: 'left' }}
                                    defaultValue={50}
                                >
                                    <MenuItem value={10}>Yayınlama Tarihi</MenuItem>
                                    <MenuItem value={20}>Akıllı Sıralama</MenuItem>
                                    <MenuItem value={30}>Fiyat: Düşükten Yükseğe</MenuItem>
                                    <MenuItem value={40}>Fiyat: Yüksekten Düşüğe</MenuItem>
                                    <MenuItem value={50}>Mesafeye Göre</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {advertData && <AdCard data={advertData} />}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Search