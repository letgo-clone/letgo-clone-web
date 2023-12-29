import React from 'react'
import { Grid, Box, Button, AppBar, Toolbar, MenuItem, Container, Paper, Select, Drawer, Menu, Tooltip, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ExpandLess } from '@mui/icons-material';

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
    <AppBar position="static" sx={{ bgcolor: 'hsla(0,0%,100%,.87)', boxShadow: 1 }}>
        <Container
            maxWidth='lg'
            sx={{
                marginTop: '5px',
                marginBottom: '5px',
                paddingRight: { sm: '0px' },
                paddingLeft: { sm: '0px' }
            }}
        >
            <Toolbar
              sx={{
                  minHeight: { sm: '30px' },
                  marginBottom: '7px'
              }}
            >
              <div>
              <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  endIcon={open ? <ExpandLess/> : <ExpandMoreIcon/>}
                  sx={{
                    color: '#2c2c2c',
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '16.1px',
                    textTransform: 'uppercase',
                  }}
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
                  sx={{
                      marginTop: '1.5%'
                  }}
                  disableScrollLock={true}
              >
              <Grid container spacing={1}>
                {chunkedCategories.map((row, rowIndex) => (
                    <Grid item xl={2} lg={2} xs={2} key={rowIndex} sx={{ margin: '40px 40px' }}>
                      {row.map((category, key) => (
                        <div key={key} style={{ marginBottom: '40px' }}>
                          <Typography
                            sx={{
                              color: '#2c2c2c',
                              fontSize: '14px',
                              lineHeight: 1.5,
                              fontWeight: 700,
                              textTransform: 'capitalize',
                              margin: '0px 8px',
                            }}
                          >
                            {category.category_name}
                          </Typography>
                          {category?.sub_category.map((subItem, subKey) => (
                            <ul
                              key={subKey}
                              style={{
                                padding: '0px 8px'
                              }}
                            >
                              <li
                                style={{
                                  display: 'grid',
                                  marginTop: '8px'
                                }}
                              >
                                <a
                                  style={{
                                    color: '#2c2c2c',
                                    fontSize: '14px',
                                    lineHeight: 1.5,
                                    fontWeight: 400,
                                  }}
                                >
                                  {subItem.sub_category_name}
                                </a>
                              </li>
                            </ul>
                          ))}
                        </div>
                      ))}
                    </Grid>
                ))}
            </Grid>
                
              </Menu>
              </div>
              <Box sx={{ textAlign: 'left', marginLeft: '30px', display : 'inline-flex' }}>
                {firstSixCategory.length > 0 && firstSixCategory.map((item, key ) => (
                    <MenuItem
                        key={key}
                        sx={{
                          display: 'contents'
                        }}
                    >
                        <Typography 
                              sx={{ 
                                color: '#2c2c2c',
                                fontSize: '14px',
                                lineHeight: 1.5,
                                fontWeight: 400,
                                textTransform: 'capitalize',
                                margin: '0px 8px'
                              }} 
                              textAlign="center"
                          >
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