import React, { useEffect, useState, MouseEvent} from 'react'

// Material UI elements
import { 
  Typography, 
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Drawer,
  IconButton,
  Tab,
  Tabs
} from '@mui/material';

// Material UI Icons
import { 
  ArrowBack
  } from '@mui/icons-material';

// Redux
import { useAppSelector } from '../redux/store';

// react router
import { useNavigate } from 'react-router-dom';

// other packages
import slugify from 'react-slugify';

// İnterfaces
import { CategoryBannerProps } from './component';
import {Menu} from '../redux/interface'
import { PostCategory, TabPanelProps } from '../pages/advertTypes';

const CategoryBanner: React.FC<CategoryBannerProps> = ({ styles, page, handleDrawerClose }) => {

  // Redux elements
  const navigate = useNavigate();
  const {menuData} = useAppSelector((state) => state?.Menu);

  // useState area
  const [categories, setCategories] = useState<Menu[]>([]);
  const [allCategory, setAllCategory] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState<number>(0);
  const [subCategory, setSubCategory] = useState<PostCategory[]>([]);
  const [secondPage, setSecondPage] = useState<boolean>(false);

  // useEffect area

  /* 
    Gets data from props 
  */
  useEffect(() => {
      if(page == 'home'){
            setCategories(menuData!)
      }
      else{
          const firstSixCategory = menuData?.slice(0, 4);
          setCategories(firstSixCategory!);
      }
  },[menuData])

  // function area

  // search for route
  const handleRecentSearch = (search: string) => {
      const searchFilter = slugify(search);

      if(handleDrawerClose){
        handleDrawerClose();
      }
      const cityId = '34';
      navigate('/search/' + cityId + '/'  + searchFilter);
  }

  // Drawer the all category
  const openAllCategory = (event: MouseEvent<HTMLElement>) => {
      setAllCategory(event.currentTarget);
  }

  const closeAllCategory = () => {
      if(secondPage){
        setSecondPage(false);
      }else{
        setAllCategory(null);
      }
  }

  // filters the Sub category 
  const handleChange = (event: React.SyntheticEvent, newValue: number = 0) => {
      setValue(newValue);

      if(event.target){
          const filteredSubCategory = menuData!
          .filter((category, key) => (key == newValue && category.sub_category))
          .map(item => ({ ...item, key_id: newValue }))
      
          setSubCategory(filteredSubCategory);
      }
      setSecondPage(true)
  };

  return (
    <Box sx={styles.bannerMainBox}>
      {/* Title section  */}
      <Box sx={{ display : 'block' }}>
          <Typography sx={styles.bannerCategoryTitle}>
              {page == 'home' ? (
                "Kategorilere göz at"
              ): (
                "Popüler Kategoriler"
              )}
          </Typography>
          {page == 'home' && (
              <Typography onClick={openAllCategory} sx={styles.bannerCategoryRightTitle}>Tümünü gör</Typography>
          )}
      </Box>
       {/* Content section  */}
      <Box sx={styles.bannerCategoryBox}>
              <List sx={styles.bannerCategoryList}>
                  {categories?.map((Item, key) => (
                      <ListItem key={key} sx={styles.bannerCategoryListItem}>
                              <ListItemButton 
                                sx={styles.dialogCategoryListItemButton}
                                onClick={() => handleRecentSearch(Item?.category_name)}
                                >
                                <ListItemIcon sx={styles.bannerCategoryIcon}>
                                    <Avatar alt="Remy Sharp" src={Item.icon} sx={styles.bannerCategoryAvatar}/>
                                </ListItemIcon>
                                <ListItemText 
                                    sx={styles.bannerCategoryText}
                                    primary={Item?.category_name} 
                                />
                              </ListItemButton>
                      </ListItem>
                  ))}
            </List>
      </Box>
      {/* Drawer for clicked all category in home page  */}
      <Drawer
          anchor={'top'}
          open={Boolean(allCategory)}
          onClose={closeAllCategory}
          PaperProps={{
              sx: {
                  height: '100%',
                  maxHeight: 'none',
              },
          }}
      >
        {/* Drawer Title */}
          <Box sx={styles.bannerDrawerBoxTitle}>
              <IconButton onClick={closeAllCategory} sx={styles.bannerDrawerBoxLeftIcon}>
                  <ArrowBack sx={styles.bannerDialogTitleClose} />
              </IconButton>
                  <Typography sx={{
                      display: 'inline-block',
                      marginTop: '8px',
                      marginLeft: '20px',
                      fontSize: '20px',
                      lineHeight: '24px',
                      fontWeight: 700
                  }}>Tüm Kategoriler</Typography>
          </Box>
          {/* Main categories section */}
          {!secondPage && (
              <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={subCategory.length > 0 && value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  sx={styles.leftCategoryTabs}
              >
                  {categories!.length > 0  && categories!.map((item, key) => (
                      <Tab
                          key={key}
                          label={item.category_name}
                          sx={styles.leftCategoryTab}
                          iconPosition='end'
                          {...a11yProps(Number(item.category_id))}
                      />
                  ))}
              </Tabs>
          )}
            {/* Sub categories section */}
          {secondPage && subCategory.map((mainItem, key) =>  (
              <TabPanel value={value} index={mainItem.key_id} key={key}>
                    <List sx={{ padding:0 }}>
                        {mainItem?.sub_category.map((SubItem, key) => (

                            <ListItem sx={styles.rightCategoryListItem} key={key}>
                                    <ListItemButton sx={styles.rightCategoryListItemButton}>
                                          <ListItemText 
                                              sx={styles.rightCategoryListItemText} 
                                              primary={SubItem.sub_category_name} 
                                          />
                                    </ListItemButton>
                            </ListItem>
                            
                        ))}
                    </List>
              </TabPanel>

          ))}
      </Drawer>
    </Box>
  )
}

export default CategoryBanner

// Main category tab
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
              <Box sx={{ p: 0 }} key={index}>
                  {children}
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