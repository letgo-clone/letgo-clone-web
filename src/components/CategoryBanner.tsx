import React, { useEffect, useState} from 'react'

import { 
  Container,
  Typography, 
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';

// Redux
import { useAppSelector } from '../redux/store';

// react router
import { useNavigate } from 'react-router-dom';

// other packages
import slugify from 'react-slugify';

// İnterfaces
import { CategoryBannerProps } from './component';
import {Menu} from '../redux/interface'

const CategoryBanner: React.FC<CategoryBannerProps> = ({ styles, page, handleDrawerClose }) => {
  const navigate = useNavigate();
  const {menuData} = useAppSelector((state) => state?.Menu);

  // useState
  const [categories, setCategories] = useState<Menu[]>([]);

  // useEffect
  useEffect(() => {
     if(page == 'home'){
          setCategories(menuData!)
     }
     else{
        const firstSixCategory = menuData?.slice(0, 4);
        setCategories(firstSixCategory!);
     }
  },[menuData])

  // for route
  const handleRecentSearch = (search: string) => {
    const searchFilter = slugify(search);

    if(handleDrawerClose){
      handleDrawerClose();
    }
    const cityId = '34';
    navigate('/search/' + cityId + '/'  + searchFilter);
  }

  return (
    <Box sx={styles.dialogMainBox}>
      <Box sx={{ display : 'block' }}>
       
          <Typography sx={styles.dialogCategoryTitle}>
              {page == 'home' ? (
                "Kategorilere göz at"
              ): (
                "Popüler Kategoriler"
              )}
          </Typography>
         

          {page == 'home' && (
              <Typography sx={{ 
                float: 'right',
                color: '#ff3f55',
                borderBottom: '2px solid #ff3f55',
                fontSize: '14px',
                fontWeight: 700
               }}>Tümünü gör</Typography>
          )}

      </Box>
      <Box sx={styles.dialogCategoryBox}>
              <List sx={styles.dialogCategoryList}>
                  {categories?.map((Item, key) => (
                      <ListItem key={key} sx={styles.dialogCategoryListItem}>
                              <ListItemButton 
                                sx={styles.dialogCategoryListItemButton}
                                onClick={() => handleRecentSearch(Item?.category_name)}
                                >
                                <ListItemIcon sx={styles.dialogCategoryIcon}>
                                    <Avatar alt="Remy Sharp" src={Item.icon} sx={styles.dialogCategoryAvatar}/>
                                </ListItemIcon>
                                <ListItemText 
                                    sx={styles.dialogCategoryText}
                                    primary={Item?.category_name} 
                                />
                              </ListItemButton>
                      </ListItem>
                  ))}
            </List>
      </Box>
    </Box>
  )
}

export default CategoryBanner