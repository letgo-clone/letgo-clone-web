import React, { useState } from 'react'

// Material UI Elements
import { 
    Container, 
    Typography, 
    Grid, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemText, 
    Tabs, 
    Tab, 
    Box 
    } from '@mui/material'

// styles
import { homePostAdvertStyles } from '../../styles';

// React router
import { Link } from 'react-router-dom';

// Redux
import { useAppSelector } from '../../redux/store';
import { setCurrentCategory, useAppDispatch } from '../../redux/store';

// Material UI TabPanel for category
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

// view sub category according to Selected category
function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


function Index() {
    // Redux elements
    const {menuData} = useAppSelector((state) => state?.Menu);
    const dispatch = useAppDispatch();

    // useEffect area
    const [value, setValue] = useState();
    const [subCategory, setSubCategory] = useState<object[]>([]);

    // Category filter
    const handleChange = (event: React.SyntheticEvent, newValue: number = 0) => {
        setValue(newValue);

        const filteredSubCategory = menuData!
        .filter((category, key) => (key == newValue && category.sub_category))
        .map(item => ({ ...item, key_id: newValue }))
       
        setSubCategory(filteredSubCategory)
    };

    // saves selected categorys of user in redux
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
             {/* Top title */}
            <Typography sx={homePostAdvertStyles.topTitle}>
                İlan Yayınla
            </Typography>
            <Grid container sx={homePostAdvertStyles.containerGrid}>
                 {/* Left sub title */}
                <Typography sx={homePostAdvertStyles.categoryColumnTitle}>
                    BİR KATEGORİ SEÇ
                </Typography>
                <Grid container>
                    {/* Left main category section */}
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
                     {/* Right sub category section */}
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