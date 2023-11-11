import React from 'react'
import { Grid, Container, Typography, Divider } from "@mui/material"
import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Footer() {
    return (

        <footer>
            <Container sx={{ paddingRight: { xs: '0', md: '16' }, paddingLeft: { xs: '0', md: '16' } }}>
                <Grid container sx={{ display: { md: 'flex', xs: 'none' } }}>
                    <Grid md={3}>
                        <p id={'footer-head'}>Popüler Kategoriler</p>
                        <ol id={'footer-content'}>
                            <li>İkinci El Cep Telefonu</li>
                            <li>İkinci El Bilgisayar</li>
                            <li>İkinci El Araba</li>
                            <li>İkinci El Motosiklet</li>
                        </ol>
                    </Grid>
                    <Grid md={3}>
                        <p id={'footer-head'}>Popüler Sayfalar</p>
                        <ol id={'footer-content'}>
                            <li>İkinci El Mobilya</li>
                            <li>İkinci El Bilgisayar</li>
                            <li>İkinci El Araba</li>
                            <li>İkinci El Motosiklet</li>
                        </ol>
                    </Grid>
                    <Grid md={2}>
                        <p id={'footer-head'}>Letgo</p>
                        <ol id={'footer-content'}>
                            <li>Hakkımızda</li>
                            <li>Yardım ve Destek</li>
                            <li>Güvenlik Önerileri</li>
                        </ol>
                    </Grid>
                    <Grid md={2}>
                        <p id={'footer-head'}>OTOPLUS</p>
                        <ol id={'footer-content'}>
                            <li>İkinci El Cep Telefonu</li>
                            <li>Araba Sat</li>
                            <li>Merkezlerimiz</li>
                            <li>İletişim</li>
                            <li>Güvenlik Açığı İfşa Programı</li>
                        </ol>
                    </Grid>
                    <Grid md={2}>
                        <p id={'footer-head'}>Bizi Takip Et</p>
                        <Grid container>
                            <Grid md={3}>
                                <Facebook />
                            </Grid>
                            <Grid md={3}>
                                <Instagram />
                            </Grid>
                            <Grid md={3}>
                                <Twitter />
                            </Grid>
                            <Grid md={3}>
                                <YouTube />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container sx={{ display: { md: 'none', xs: 'flex' } }}>
                    <Grid xs={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Popüler Kategoriler</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#f5f5f5', padding: '8px 12px 16px' }}>
                                <ol id={'footer-content'}>
                                    <li>İkinci El Cep Telefonu</li>
                                    <li>İkinci El Bilgisayar</li>
                                    <li>İkinci El Araba</li>
                                    <li>İkinci El Motosiklet</li>
                                </ol>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid xs={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Popüler Sayfalar</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#f5f5f5', padding: '8px 12px 16px' }}>
                                <ol id={'footer-content'}>
                                    <li>İkinci El Mobilya</li>
                                    <li>İkinci El Bilgisayar</li>
                                    <li>İkinci El Araba</li>
                                    <li>İkinci El Motosiklet</li>
                                </ol>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid xs={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>letgo</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#f5f5f5', padding: '8px 12px 16px' }}>
                                <ol id={'footer-content'}>
                                    <li>Hakkımızda</li>
                                    <li>Yardım ve Destek</li>
                                    <li>Güvenlik Önerileri</li>
                                </ol>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid xs={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>otoplus</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#f5f5f5', padding: '8px 12px 16px' }}>
                                <ol id={'footer-content'}>
                                    <li>İkinci El Cep Telefonu</li>
                                    <li>Araba Sat</li>
                                    <li>Merkezlerimiz</li>
                                    <li>İletişim</li>
                                    <li>Güvenlik Açığı İfşa Programı</li>
                                </ol>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid xs={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Resmi bağlantılar</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ backgroundColor: '#f5f5f5', padding: '8px 12px 16px' }}>
                                <ol id={'footer-content'}>
                                    <li>Şartlar ve Koşullar</li>
                                    <li>Reklam Politikası</li>
                                    <li>Resmi Kurumlar için Kılavuz</li>
                                    <li>Gizlilik Bildirimi</li>
                                </ol>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Divider />
                    <Grid xs={12} sx={{ marginTop:'10px' }}>
                        <Grid container sx={{ padding:'15px 0px 10px 20px' }}>
                            <Grid xs={6}>
                                BİZİ TAKİP ET
                            </Grid>
                            <Grid xs={6}>
                                <Grid container>
                                    <Grid xs={3}>
                                        <Facebook />
                                    </Grid>
                                    <Grid xs={3}>
                                        <Instagram />
                                    </Grid>
                                    <Grid xs={3}>
                                        <Twitter />
                                    </Grid>
                                    <Grid xs={3}>
                                        <YouTube />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Grid container sx={{ backgroundColor: '#ff3f55' }}>
                <Container>
                    <Grid container sx={{ marginTop: '25px', marginBottom: '15px', color: '#FFFFFF', fontSize: '12px' }}>
                        <Grid md={8} xs={12}>
                            <Grid container>
                                <Grid md={12} xs={12} sx={{ textAlign: { xs: 'center', md: 'left', marginBottom: '10px', fontWeight: 600 } }}>
                                    Resmi bağlantılar
                                </Grid>
                                <Grid md={12} xs={12} sx={{ textAlign: 'center', marginBottom: '30px', display: { md: 'inline-flex', xs: 'block' } }}>
                                    <Typography sx={{ display: 'inline-block', margin: '0px 4px 0px 0px', fontSize: '12px', lineHeight: '18px', fontWeight: 300 }}>Şartlar ve Koşullar</Typography>
                                    <Typography sx={{ display: 'inline-block', margin: '0px 4px 0px 0px', fontSize: '12px', lineHeight: '18px', fontWeight: 300 }}>-Reklam Politikası</Typography>
                                    <Typography sx={{ display: 'inline-block', margin: '0px 4px 0px 0px', fontSize: '12px', lineHeight: '18px', fontWeight: 300 }}>-Resmi Kurumlar için Kılavuz</Typography>
                                    <Typography sx={{ display: 'inline-block', margin: '0px 4px 0px 0px', fontSize: '12px', lineHeight: '18px', fontWeight: 300 }}>-Gizlilik Bildirimi</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid md={4} xs={12} sx={{ textAlign: { md: 'right', xs: 'center' }, fontSize: '12px', fontWeight: 100 }}> <span style={{ fontWeight: '600', paddingRight: '12px' }}> Türkiye'de ikinci el eşya al ve sat</span> © 2006-2023 letgo</Grid>
                    </Grid>
                </Container>
            </Grid>
        </footer>
    )
}

export default Footer