import React from 'react'
import { Grid, Box, Button, AppBar, Toolbar, MenuItem, Container, Paper, Select, Drawer, Menu, Tooltip, Typography } from "@mui/material"

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { subNavbarStyles } from '../../styles';

interface SubNavbarAreaProps {
    categories: object[],
}

const SubNavbar: React.FC<SubNavbarAreaProps>  = ({ categories }) => {
  const firstSixCategory: object[] = categories.slice(0, 5);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  const chunkArray = (array, chunkSize) => {
      const result = [];
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
                        {row.map((category, key) => (
                          <Box key={key} sx={subNavbarStyles.allCategoryBox}>
                              <Typography sx={subNavbarStyles.allCategoryTitle}>
                                  {category.category_name}
                              </Typography>
                                {category?.sub_category.map((subItem, subKey) => (
                                    <Typography sx={subNavbarStyles.allCategoryContentA} >{subItem.sub_category_name}</Typography>
                                ))}
                          </Box>
                        ))}
                      </Grid>
                  ))}
              </Grid>
                  
                </Menu>
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