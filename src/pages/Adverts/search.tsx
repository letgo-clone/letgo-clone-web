import React, { useState, useEffect } from 'react'
import { Box, Grid, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Divider, TextField, Button, Select, MenuItem, Chip, FormControl } from '@mui/material'

import { RequestPublic } from '../../helpers/Request';

import { AdCard } from '../../components/AdCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Link } from 'react-router-dom';
import { advertSearchStyles } from '../../styles';

const Search = () => {
    const [advertData, setAdvertData] = useState('');

    useEffect(() => {
        const getData = async () => {
            const url = "/advert/actual"
            const data = await RequestPublic('GET', url);
            setAdvertData(data);
        }
        getData();
    }, [])
    return (
        <Container>
            <Grid container>
                <Grid xl={4} lg={4} md={4} sx={advertSearchStyles.leftFilterGrid}>
                    <Grid spacing={2} container>
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Typography sx={advertSearchStyles.leftFilterTitleLink}>Ana sayfa (Breadcumb) </Typography>
                            </Link>
                            <Typography sx={advertSearchStyles.leftFilterTitle}>İphone 14 in Istanbul</Typography>
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Accordion sx={advertSearchStyles.leftFilterAccording}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    sx={advertSearchStyles.leftFilterAccordingSummary}
                                >
                                    <Typography sx={advertSearchStyles.leftFilterCardsTitle}>
                                        Kategoriler
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        <li>Tüm Kategoriler</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Divider />
                            <Accordion sx={advertSearchStyles.leftFilterAccording}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    sx={advertSearchStyles.leftFilterAccordingSummary}
                                >
                                    <Typography sx={advertSearchStyles.leftFilterCardsTitle}>
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
                            <Accordion sx={advertSearchStyles.leftFilterAccording}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    sx={advertSearchStyles.leftFilterAccordingSummary}
                                >
                                    <Typography sx={advertSearchStyles.leftFilterCardsTitle}>
                                        Fiyatlar
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={1}>
                                        <Grid item xl={3} md={3} sm={3} xs={3}>
                                            <TextField id="outlined-basic" label="en az" variant="outlined" size="small" />
                                        </Grid>
                                        <Grid item xl={2} md={2} sm={2} xs={2} >
                                            <Typography sx={advertSearchStyles.textBetweenPriceFilter}>
                                                -
                                            </Typography>
                                        </Grid>
                                        <Grid item xl={3} md={3} sm={3} xs={3}>
                                            <TextField id="outlined-basic" label="en çok" variant="outlined" size="small" />
                                        </Grid>
                                        <Grid item xl={3} md={3} sm={3} xs={3} sx={{ marginLeft: 2, marginTop: 1 }}>
                                            <Button variant="contained" sx={advertSearchStyles.priceFilterButton}>Uygula</Button>
                                        </Grid>
                                    </Grid>

                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xl={8} lg={8} md={8}>
                    <Grid container sx={advertSearchStyles.rightFilterGrid}>
                        <Grid xl={4} md={4} sm={4} xs={4}>
                            <Box sx={advertSearchStyles.rightFilterInfoBox}>
                                <Typography sx={{ fontWeight: 600 }}>&quot;Araba&quot;&nbsp; </Typography>
                                <Typography sx={advertSearchStyles.rightFilterInfo}>için arama sonuçları</Typography>
                            </Box>
                        </Grid>
                        <Grid xl={2} md={2} sm={2} xs={2}>
                            <Chip label="3878 ilan" sx={advertSearchStyles.rightFilterCount} color="primary" />
                        </Grid>
                        <Grid xl={3} md={3} sm={3} xs={3}>
                            <Typography sx={advertSearchStyles.rightSortingFilterText}>
                                Sıralama Ölçütü :
                            </Typography>
                        </Grid>
                        <Grid xl={3} md={3} sm={3} xs={3}>
                            <FormControl variant="standard" sx={{ m: 1, width:'100%' }}>
                                <Select
                                    disableUnderline
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={advertSearchStyles.rightSortingFilter}
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
                    {advertData && <AdCard data={advertData} grid={[4,4,4,6]} />}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Search