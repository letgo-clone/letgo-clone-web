import React from 'react'

// Material UI elements
import { 
    Grid, 
    Box, 
    Button, 
    AppBar, 
    Toolbar, 
    MenuItem, 
    Container, 
    Menu,
    Typography } from "@mui/material"

// Material UI ıcons
import { 
    ExpandLess, 
    ExpandMore } from '@mui/icons-material';

// Styles
import { subNavbarStyles } from '../../styles';

// interfaces
import { Menu as Category } from '../../redux/interface';

import { SubNavbarAreaProps } from './layout';

const SubNavbar: React.FC<SubNavbarAreaProps>  = ({ categories }) => {
  
  // UseState area 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // Category menu modal
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  // Top category
  const firstSixCategory: Category[] = categories.slice(0, 5);

  /* -Category data in menu
     -Slices the categories data
  */
  const chunkArray = (array: Category[], chunkSize: number): Category[][] => {
    const result: Category[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };
  
  const chunkedCategories = chunkArray(categories, 3);

  return (
    <AppBar position="static" sx={subNavbarStyles.appBar}>
        <Container maxWidth='lg' sx={subNavbarStyles.container}>
            <Toolbar sx={subNavbarStyles.toolbar}>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon={open ? <ExpandLess/> : <ExpandMore/>}
                    sx={subNavbarStyles.allCategoryButton}
                >
                    Tüm Kategoriler
                </Button>
                {/* to view all category the menu  */}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    PaperProps={{
                      style: {
                        width: 'auto',
                      },
                    }}
                    sx={subNavbarStyles.allCategoryMenu}
                    disableScrollLock={true}
                >
                  <Grid container spacing={1}>
                    {chunkedCategories.map((row, rowIndex) => (
                        <Grid item xl={2} lg={2} xs={2} key={rowIndex} sx={subNavbarStyles.allCategoryGrid}>
                          {row.map((category) => (
                            <Box key={category?.category_id} sx={subNavbarStyles.allCategoryBox}>
                                <Typography sx={subNavbarStyles.allCategoryTitle}>
                                    {category.category_name}
                                </Typography>
                                  {category?.sub_category.map((subItem) => (
                                      <Typography key={subItem.sub_category_id} sx={subNavbarStyles.allCategoryContentA} >{subItem.sub_category_name}</Typography>
                                  ))}
                            </Box>
                          ))}
                        </Grid>
                    ))}
                  </Grid>
                </Menu>
                 {/* First category area */}
                <Box sx={subNavbarStyles.firstSixCategoryBox}>
                    {firstSixCategory.length > 0 && firstSixCategory.map((item, key ) => (
                        <MenuItem
                            key={key} sx={subNavbarStyles.firstSixCategoryMenuItem}>
                            <Typography sx={subNavbarStyles.firstSixCategoryText} textAlign="center">
                                {item?.category_name}
                            </Typography>
                        </MenuItem>
                    ))}
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default SubNavbar