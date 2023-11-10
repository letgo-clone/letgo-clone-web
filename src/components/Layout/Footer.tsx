import React from 'react'
import { Grid, Container } from "@mui/material"

import { Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';

function Footer() {
    return (

        <footer>
            <Container>
                <Grid container>
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
            </Container>
            <Grid container sx={{ backgroundColor: '#ff3f55' }}>
                <Container>
                    <Grid container sx={{ marginTop: '25px', marginBottom: '15px', color: '#FFFFFF', fontSize:'12px' }}>
                        <Grid md={6}>Resmi bağlantılar</Grid>
                        <Grid md={6} sx={{ textAlign:'right' }}> <span style={{ fontWeight:'600', paddingRight:'12px' }}> Türkiye'de ikinci el eşya al ve sat</span> © 2006-2023 letgo</Grid>
                    </Grid>
                    <ol id='footer-bottom-content'>
                        <li>Şartlar ve Koşullar</li>
                        <li>Reklam Politikası</li>
                        <li style={{ maxWidth:'170px' }}>Resmi Kurumlar için Kılavuz</li>
                        <li>Gizlilik Bildirimi</li>
                    </ol>
                </Container>
            </Grid>
        </footer>
    )
}

export default Footer