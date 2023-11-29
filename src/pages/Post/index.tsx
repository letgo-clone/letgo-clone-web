import { Container, Typography, Grid, List, ListItem, ListItemButton, ListItemText, Tabs, Tab, Box } from '@mui/material'
import React from 'react'

import { Link } from 'react-router-dom';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


function Index() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Typography sx={{ fontSize: '24px', fontWeight: 700, textTransform: 'uppercase', marginTop: '25px', textAlign: 'center' }}>
                İlan Yayınla
            </Typography>
            <Grid container sx={{ border: '1px solid #e0e0e0', borderRadius: '8' }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, lineHeight: 1.5, margin: '25px 15px 15px 30px' }}>
                    BİR KATEGORİ SEÇ
                </Typography>
                <Grid container>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{ marginBottom: '20px' }}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab
                                label="Araba"
                                iconPosition="start"
                                sx={{
                                    justifyContent: 'flex-start',
                                    '&.Mui-selected': {
                                        color: '#2c2c2c',
                                        backgroundColor: '#e0e0e0'
                                    },
                                    minHeight: '54px',
                                    maxWidth: '100%',
                                    borderBottom: '1px solid #e0e0e0'
                                }}
                                icon={<img src="https://statics.olx.com.tr/olxtr/category_icons/v4/category_5_1x.png" width={28} height={28} />}
                                {...a11yProps(0)}
                            />
                            <Tab
                                label="Telefon"
                                iconPosition="start"
                                sx={{
                                    justifyContent: 'flex-start',
                                    '&.Mui-selected': {
                                        color: '#2c2c2c',
                                        backgroundColor: '#e0e0e0'
                                    },
                                    minHeight: '54px',
                                    maxWidth: '100%',
                                    borderBottom: '1px solid #e0e0e0'
                                }}
                                icon={<img src="https://statics.olx.com.tr/olxtr/category_icons/v4/category_6_1x.png" width={28} height={28} />}
                                {...a11yProps(1)}
                            />
                            <Tab
                                label="Ev Eşyaları"
                                iconPosition="start"
                                sx={{
                                    justifyContent: 'flex-start',
                                    '&.Mui-selected': {
                                        color: '#2c2c2c',
                                        backgroundColor: '#e0e0e0'
                                    },
                                    minHeight: '54px',
                                    maxWidth: '100%',
                                    borderBottom: '1px solid #e0e0e0'
                                }}
                                icon={<img src="https://statics.olx.com.tr/olxtr/category_icons/v4/category_10_1x.png" width={28} height={28} />}
                                {...a11yProps(2)}
                            />
                            <Tab
                                label="Elektronik"
                                iconPosition="start"
                                sx={{
                                    justifyContent: 'flex-start',
                                    '&.Mui-selected': {
                                        color: '#2c2c2c',
                                        backgroundColor: '#e0e0e0'
                                    },
                                    minHeight: '54px',
                                    maxWidth: '100%',
                                    borderBottom: '1px solid #e0e0e0'
                                }}
                                icon={<img src="https://statics.olx.com.tr/olxtr/category_icons/v4/category_7_1x.png" width={28} height={28} />}
                                {...a11yProps(3)}
                            />
                            <Tab
                                label="Motosiklet"
                                iconPosition="start"
                                sx={{
                                    justifyContent: 'flex-start',
                                    '&.Mui-selected': {
                                        color: '#2c2c2c',
                                        backgroundColor: '#e0e0e0'
                                    },
                                    minHeight: '54px',
                                    maxWidth: '100%',
                                    borderBottom: '1px solid #e0e0e0'
                                }}
                                icon={<img src="https://statics.olx.com.tr/olxtr/category_icons/v4/category_8_1x.png" width={28} height={28} />}
                                {...a11yProps(4)}
                            />
                            <Tab
                                label="Bebek ve Çocuk"
                                iconPosition="start"
                                sx={{
                                    justifyContent: 'flex-start',
                                    '&.Mui-selected': {
                                        color: '#2c2c2c',
                                        backgroundColor: '#e0e0e0'
                                    },
                                    minHeight: '54px',
                                    maxWidth: '100%',
                                    borderBottom: '1px solid #e0e0e0'
                                }}
                                icon={<img src="https://statics.olx.com.tr/olxtr/category_icons/v4/category_13_1x.png" width={28} height={28} />}
                                {...a11yProps(5)}
                            />
                            <Tab
                                label="Hobi ve Eğlence"
                                iconPosition="start"
                                sx={{
                                    justifyContent: 'flex-start',
                                    '&.Mui-selected': {
                                        color: '#2c2c2c',
                                        backgroundColor: '#e0e0e0'
                                    },
                                    minHeight: '54px',
                                    maxWidth: '100%',
                                    borderBottom: '1px solid #e0e0e0'
                                }}
                                icon={<img src="https://statics.olx.com.tr/olxtr/category_icons/v4/category_11_1x.png" width={28} height={28} />}
                                {...a11yProps(6)}
                            />
                            <Tab
                                label="Giyim ve Aksesuar"
                                iconPosition="start"
                                sx={{
                                    justifyContent: 'flex-start',
                                    '&.Mui-selected': {
                                        color: '#2c2c2c',
                                        backgroundColor: '#e0e0e0'
                                    },
                                    minHeight: '54px',
                                    maxWidth: '100%',
                                    borderBottom: '1px solid #e0e0e0'
                                }}
                                icon={<img src="https://statics.olx.com.tr/olxtr/category_icons/v4/category_14_1x.png" width={28} height={28} />}
                                {...a11yProps(7)}
                            />
                        </Tabs>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        <TabPanel value={value} index={0}>
                            <List sx={{ padding: 0 }}>
                                <ListItem sx={{ p: 0 }}>
                                    <Link to="/post/attributes" style={{ display: 'contents', color: '#2c2c2c', padding:0 }}>
                                        <ListItemButton sx={{ padding: '10px 10px 12px 20px', borderBottom: '1px solid #e0e0e0' }}>
                                            <ListItemText primary="Araba" />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link to="/post/attributes" style={{ display: 'contents', color: '#2c2c2c' }}>
                                        <ListItemButton sx={{ padding: '10px 10px 12px 20px', borderBottom: '1px solid #e0e0e0' }}>
                                            <ListItemText primary="Araba Yedek Parça ve Aksesuar" />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ padding: '10px 10px 12px 20px', borderBottom: '1px solid #e0e0e0' }}>
                                        <ListItemText primary="Araba Ses ve Görüntü Sistemleri" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ padding: '10px 10px 12px 20px', borderBottom: '1px solid #e0e0e0' }}>
                                        <ListItemText primary="Jant ve Lastik" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton sx={{ padding: '10px 10px 12px 20px', borderBottom: '1px solid #e0e0e0' }}>
                                        <ListItemText primary="Kiralık Araçlar" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <List sx={{ padding: 0 }}>
                                <ListItem disablePadding sx={{ padding: 0 }}>
                                    <ListItemButton sx={{ padding: '10px 10px 12px 20px', borderBottom: '1px solid #e0e0e0' }}>
                                        <ListItemText primary="Akıllı Telefon" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding sx={{ padding: 0 }}>
                                    <ListItemButton sx={{ padding: '10px 10px 12px 20px', borderBottom: '1px solid #e0e0e0' }}>
                                        <ListItemText primary="Telefon Aksesuarları ve Parçaları" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding sx={{ padding: 0 }}>
                                    <ListItemButton sx={{ padding: '10px 10px 12px 20px', borderBottom: '1px solid #e0e0e0' }}>
                                        <ListItemText primary="Sabit ve Telsiz Telefon" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Item Three333
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            Item Four44
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            Item Five555
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            Item Six666
                        </TabPanel>
                        <TabPanel value={value} index={6}>
                            Item Seven777
                        </TabPanel>
                        <TabPanel value={value} index={7}>
                            Item Seven777
                        </TabPanel>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Index