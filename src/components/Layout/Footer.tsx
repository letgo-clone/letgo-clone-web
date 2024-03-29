import React, {useEffect, useState} from 'react'

// Material UI Elements
import { 
    Grid, 
    Container, 
    Typography, 
    Box, 
    Accordion, 
    AccordionSummary,
    AccordionDetails,
    Divider
    } from "@mui/material"

// Material UI icons
import { 
    Facebook, 
    Instagram, 
    Twitter, 
    YouTube,
    ExpandMore
    } from '@mui/icons-material';

// styles
import { footerStyles } from '../../styles';

// assets
import GooglePlay from '../../assets/img/playstore.webp'
import AppStore from '../../assets/img/appstore.webp'

// Redux
import { useAppSelector } from '../../redux/store';

// React Router
import { useNavigate } from 'react-router-dom';

// interface

import { Menu } from '../../redux/interface';

function Footer() {
    // React Router area
    const navigate = useNavigate();

    // Redux area
    const {menuData} = useAppSelector((state) => state?.Menu);

    // useState area
    const [firstFooterCategory, setFirstFooterCategory] = useState<Menu[]>([])
    const [secondFooterCategory, setSecondooterCategory] = useState<Menu[]>([])

    // UseEffect area
    useEffect(() => {
        if(menuData?.length !== 0){
            const firstColumnCategory = menuData?.slice(0, 4);
            const secondColumnCategory = menuData?.slice(7, 10);
           
            setFirstFooterCategory(firstColumnCategory!);
            setSecondooterCategory(secondColumnCategory!)
        }
    },[menuData])
    
    // function area

    const handleSearchCategory = (categoryId: string) => {
        navigate('/search?category='  + categoryId);
    }

    const year = new Date().getFullYear()
    return (
        <React.Fragment>
        {/* First Footer */}
            <Container sx={footerStyles.container}>
                {/* Footer for desktop */}
                <Grid container sx={footerStyles.gridContainer}>
                    <Grid item md={3}>
                        <Typography sx={footerStyles.footerHead}>Popüler Kategoriler</Typography>
                        <Box sx={footerStyles.footerContent}>
                            {firstFooterCategory?.length !== 0 && firstFooterCategory?.map((item,key) => (
                                 <Typography 
                                    onClick={() => handleSearchCategory(item.category_id)} 
                                    key={key} 
                                    sx={footerStyles.footerContentText}
                                >İkinci El {item?.category_name}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                        <Typography sx={footerStyles.footerHead}>Popüler Sayfalar</Typography>
                        <Box sx={footerStyles.footerContent}>
                            {secondFooterCategory?.length !== 0 && secondFooterCategory?.map((item,key) => (
                                <Typography 
                                     onClick={() => handleSearchCategory(item.category_id)} 
                                     key={key} 
                                     sx={footerStyles.footerContentText}
                                 >İkinci El {item?.category_name}
                                 </Typography>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item md={2}>
                        <Typography sx={footerStyles.footerHead}>Letgo</Typography>
                        <Box sx={footerStyles.footerContent}>
                            <Typography sx={footerStyles.footerContentText}>Hakkımızda</Typography>
                            <Typography sx={footerStyles.footerContentText}>Yardım ve Destek</Typography>
                            <Typography sx={footerStyles.footerContentText}>Güvenlik Önerileri</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={2}>
                        <Typography sx={footerStyles.footerHead}>OTOPLUS</Typography>
                        <Box sx={footerStyles.footerContent}>
                            <Typography sx={footerStyles.footerContentText}>Araba Sat</Typography>
                            <Typography sx={footerStyles.footerContentText}>Merkezlerimiz</Typography>
                            <Typography sx={footerStyles.footerContentText}>İletişim</Typography>
                            <Typography sx={footerStyles.footerContentText}>Güvenlik Açığı İfşa Programı</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={2}>
                        <Grid container>
                            <Grid item md={12}>
                                <Typography sx={footerStyles.footerHead}>Bizi Takip Et</Typography>
                                <Grid container>
                                    <Grid item md={3}>
                                        <Facebook />
                                    </Grid>
                                    <Grid item md={3}>
                                        <Instagram />
                                    </Grid>
                                    <Grid item md={3}>
                                        <Twitter />
                                    </Grid>
                                    <Grid item md={3}>
                                        <YouTube />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={12} sx={{ marginTop:'30%' }}>
                                <Grid container>
                                    <Grid item md={6}>
                                        <img src={GooglePlay} width={86} height={25} />
                                    </Grid>
                                    <Grid item md={6}>
                                        <img src={AppStore} width={86} height={25} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                 {/* Footer for tablet and phone */}
                <Grid container sx={footerStyles.mobileFooterContainer}>
                    <Grid item xs={12}>
                        <Divider />
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Popüler Kategoriler</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={footerStyles.mobileFooterAccordingDetail}>
                                <Box sx={footerStyles.footerContent}>
                                    {firstFooterCategory?.length !== 0 && firstFooterCategory?.map((item,key) => (
                                        <Typography 
                                            onClick={() => handleSearchCategory(item.category_id)} 
                                            key={key} 
                                            sx={footerStyles.footerContentText}
                                        >İkinci El {item?.category_name}
                                        </Typography>
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Popüler Sayfalar</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={footerStyles.mobileFooterAccordingDetail}>
                                <Box sx={footerStyles.footerContent}>
                                    {secondFooterCategory?.length !== 0 && secondFooterCategory?.map((item,key) => (
                                        <Typography 
                                            onClick={() => handleSearchCategory(item.category_id)} 
                                            key={key} 
                                            sx={footerStyles.footerContentText}
                                        >İkinci El {item?.category_name}
                                        </Typography>
                                    ))}
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>letgo</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={footerStyles.mobileFooterAccordingDetail}>
                                <Box sx={footerStyles.footerContent}>
                                    <Typography sx={footerStyles.footerContentText}>Hakkımızda</Typography>
                                    <Typography sx={footerStyles.footerContentText}>Yardım ve Destek</Typography>
                                    <Typography sx={footerStyles.footerContentText}>Güvenlik Önerileri</Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>otoplus</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={footerStyles.mobileFooterAccordingDetail}>
                                <Box sx={footerStyles.footerContent}>
                                    <Typography sx={footerStyles.footerContentText}>Araba Sat</Typography>
                                    <Typography sx={footerStyles.footerContentText}>Merkezlerimiz</Typography>
                                    <Typography sx={footerStyles.footerContentText}>İletişim</Typography>
                                    <Typography sx={footerStyles.footerContentText}>Güvenlik Açığı İfşa Programı</Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Resmi bağlantılar</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={footerStyles.mobileFooterAccordingDetail}>
                                <Box sx={footerStyles.footerContent}>
                                    <Typography sx={footerStyles.footerContentText}>Şartlar ve Koşullar</Typography>
                                    <Typography sx={footerStyles.footerContentText}>Reklam Politikası</Typography>
                                    <Typography sx={footerStyles.footerContentText}>Resmi Kurumlar için Kılavuz</Typography>
                                    <Typography sx={footerStyles.footerContentText}>Gizlilik Bildirimi</Typography>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    
                    <Grid item xs={12} sx={footerStyles.mobileFooterLastAccordingGrid}>
                        <Grid container sx={footerStyles.mobileFooterLastAccordingTitle}>
                            <Grid item xs={6}>
                                BİZİ TAKİP ET
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container>
                                    <Grid item xs={3}>
                                        <Facebook />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Instagram />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Twitter />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <YouTube />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    <Divider />
                    </Grid>
                    <Grid item xs={12} sx={footerStyles.mobileFooterBetweenAppIconGrid}>
                        <Grid container>
                            <Grid item xs={6} sx={footerStyles.mobileFooterBetweenLeftAppIconGrid}>
                                    <img src={GooglePlay} width={86} height={25} />
                                </Grid>
                            <Grid item xs={6} sx={footerStyles.mobileFooterBetweenRightAppIconGrid}>
                                <img src={AppStore} width={86} height={25} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        {/* Second Footer */}
            <Grid container sx={footerStyles.bottomFooterContainer}>
                <Container>
                    <Grid container sx={footerStyles.bottomFooterGridContainer}>
                        <Grid item md={8} xs={12}>
                            <Grid container>
                                <Grid item md={12} xs={12} sx={footerStyles.bottomFooterLeftTitle}>
                                    Resmi bağlantılar
                                </Grid>
                                <Grid item md={12} xs={12} sx={footerStyles.bottomFooterLeftContentGrid}>
                                    <Typography  sx={footerStyles.bottomFooterLeftContent}>Şartlar ve Koşullar</Typography>
                                    <Typography  sx={footerStyles.bottomFooterLeftContent}>-Reklam Politikası</Typography>
                                    <Typography  sx={footerStyles.bottomFooterLeftContent}>-Resmi Kurumlar için Kılavuz</Typography>
                                    <Typography  sx={footerStyles.bottomFooterLeftContent}>-Gizlilik Bildirimi</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={4} xs={12} sx={footerStyles.bottomFooterRightContent}> 
                            <Typography sx={footerStyles.bottomFooterRightText}> 
                                www.github.com/FRTYZ
                            </Typography> 
                                © 2006-{year}
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </React.Fragment>
    )
}

export default Footer