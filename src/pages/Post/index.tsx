import { Container, Typography, Grid, List, ListItem, ListItemButton, ListItemText, Tabs, Tab, Box } from '@mui/material'
import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import { KeyOffTwoTone } from '@mui/icons-material';
import { setCurrentCategory, useAppDispatch } from '../../redux/store';

import { homePostAdvertStyles } from '../../styles';

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
                <Box sx={{ p: 0 }}>
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
    const [value, setValue] = useState();
    const {menuData} = useAppSelector((state) => state?.Menu);
    const dispatch = useAppDispatch();

    const [subCategory, setSubCategory] = useState<object[]>([]);

    const handleChange = (event: React.SyntheticEvent, newValue: number = 0) => {
        setValue(newValue);

        const filteredSubCategory = menuData!
        .filter((category, key) => (key == newValue && category.sub_category))
        .map(item => ({ ...item, key_id: newValue }))
       
        setSubCategory(filteredSubCategory)
    };

    const handleGetPage = (mainCategoryName: string , subCategoryName: string, subCategoryId: number, mainCategoryId: number) => {
        const currentCategoryObject = {
            subCategoryName: subCategoryName,
            mainCategoryName: mainCategoryName,
            subCategoryId: subCategoryId,
            mainCategoryId: mainCategoryId
        }
        dispatch(setCurrentCategory(currentCategoryObject));
    }
   
    return (
        <Container>
            <Typography sx={homePostAdvertStyles.topTitle}>
                İlan Yayınla
            </Typography>
            <Grid container sx={homePostAdvertStyles.containerGrid}>
                <Typography sx={homePostAdvertStyles.categoryColumnTitle}>
                    BİR KATEGORİ SEÇ
                </Typography>
                <Grid container>
                    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={homePostAdvertStyles.leftCategoryGrid}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={homePostAdvertStyles.leftCategoryTabs}
                        >
                            {menuData!.length > 0 && menuData!.map((item) => (
                                <Tab
                                    label={item.category_name}
                                    iconPosition="start"
                                    sx={homePostAdvertStyles.leftCategoryTab}
                                    icon={<img src={item.icon} width={28} height={28} />}
                                    {...a11yProps(Number(item.category_id))}
                                />
                            ))}
                        </Tabs>
                    </Grid>
                     <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                        {subCategory && subCategory.map((mainItem) =>  (
                            <TabPanel value={value} index={mainItem.key_id}>
                                 <List sx={{ padding:0 }}>
                                     {mainItem.sub_category.map((SubItem, key) => (
                                         <ListItem sx={homePostAdvertStyles.rightCategoryListItem} key={key}>
                                             <Link 
                                                to="/post/attributes" 
                                                onClick={() => handleGetPage(mainItem.category_name, SubItem.sub_category_name, SubItem.sub_category_id, SubItem.main_category_id)} 
                                                style={{textDecoration: 'none'}}
                                                >
                                                 <ListItemButton sx={homePostAdvertStyles.rightCategoryListItemButton}>
                                                        <ListItemText 
                                                            sx={homePostAdvertStyles.rightCategoryListItemText} 
                                                            primary={SubItem.sub_category_name} 
                                                        />
                                                 </ListItemButton>
                                             </Link>
                                         </ListItem>
                                     ))}
                                 </List>
                             </TabPanel>
                        ))}
                    </Grid> 
                </Grid>
            </Grid>
        </Container>
    )
}

export default Index