import React, { useState, useEffect } from 'react';

// Material UI elements
import { 
    Grid, 
    MenuItem, 
    FormControl, 
    Paper, 
    Select, 
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Container,
    Button,
    Typography,
    Box,
    InputBase } from "@mui/material"

// Material UI Icons
import { 
    SearchOutlined, 
    LocationOn,
    Search as SearchIcon,
} from '@mui/icons-material';

// styles
import { searchStyles } from '../../styles';

// Helper
import { RequestPublic } from '../../helpers/Request';

// Redux
import store, {useAppSelector, useAppDispatch, setSearchData, setSearchDrawer} from '../../redux/store';

// Components
import CategoryBanner from '../CategoryBanner';

// other
import { useFormik } from 'formik';
import slugify from 'react-slugify';
import { useNavigate, useSearchParams } from 'react-router-dom';

// İnterface
import { 
    searchProps
    ,searchFormTypes 
    } from './commonTypes';

import { CountiesProps } from '../../pages/advertTypes';

const Search: React.FC<searchProps> = ({ dimension }) => {
    // Component Setting
    const locationSelectGrid = dimension == 'desktop' ? [4,4,4,4] : [4,4,12,12];
    const searchInputGrid =  dimension == 'desktop' ? [8,8,12,12] : [8,8,12,12];

    // Redux
    const dispatch = useAppDispatch();
    const {searchData} = useAppSelector((state) => state?.search);
    const searchDrawer = store.getState().searchDrawer?.searchDrawer;

    // React Router
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const paramLocation = searchParams.get('location');
    const paramLocationSplit = paramLocation && paramLocation.split('-');
    const paramsSearch = slugify(searchParams.get('q'), {delimiter: ' '});

    const cityId = '34';
    // useState
    const [counties, setCounties] = useState<CountiesProps[]>([]);

    // useEffect
    useEffect(() => {
        const getCounties = async() => {
            const url = "/advert/location/" + cityId;
            const result = await RequestPublic({
                method: 'GET',
                url: url
            })

            setCounties(result);
        }
        getCounties();
      
    },[])

   const initialValues: searchFormTypes = {
        location: paramLocationSplit !== null && paramLocationSplit[1] ? 
                            paramLocationSplit[1] 
                  : '0',
        search: paramsSearch ? paramsSearch : '',
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: async (values) => {
            const {location, search} = values;
            const locationDetail = location == '0' ? cityId : slugify(location, { prefix: cityId });
          
            const searchFilter = slugify(search);
             if(search !== ''){

                const searchData = [{
                    title: search,
                    date: Date.now()
                }]
                dispatch(setSearchData(searchData))
                handleTurnSearchDrawer()
                
                const category = searchParams.get('category')
                if(category !== null){
                    navigate('/search?location=' + locationDetail + '&category=' + category  + '&q='  + searchFilter);
                }
                else{
                    navigate('/search?location=' + locationDetail + '&q='  + searchFilter);
                }
            }
        }
    })

    /*
        turns on and off the search grid
    */
    const handleTurnSearchDrawer = () => {
        dispatch(setSearchDrawer(!searchDrawer));
    }

    const handleRecentSearch = (search: string) => {
        const searchFilter = slugify(search);
        handleTurnSearchDrawer()
        navigate('/search?location=' + cityId + '&q='  + searchFilter);
    }

  return (
    <Container>
        <form
            onSubmit={formik.handleSubmit}
        >
            {dimension == 'mobile' &&
              <Box sx={searchStyles.drawerBoxTitle}>
                    <Button type="submit" sx={searchStyles.drawerBoxRightIcon}>Ara</Button>
                </Box>
            }
            <Grid 
                container
                direction={dimension == 'desktop' ? 'row' : 'column-reverse'}
            >
                    {/* Location select input */}
                    <Grid 
                        item 
                        xl={locationSelectGrid[0]} 
                        md={locationSelectGrid[1]} 
                        xs={locationSelectGrid[2]} 
                        sm={locationSelectGrid[3]}
                    >
                        <FormControl size="small" fullWidth>
                            <Select
                                id="location"
                                name="location"
                                sx={dimension == 'desktop' ? searchStyles.selectLocation : searchStyles.mobileSelectLocation }
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                error={Boolean(formik.values.location == '' && formik.touched.location)}
                            >
                                <MenuItem value="0">
                                    <ListItem
                                     sx={searchStyles.selectLocationListItem}
                                     >
                                        <ListItemIcon>
                                            <LocationOn />
                                        </ListItemIcon>
                                        <ListItemText primary="İstanbul, Türkiye" />
                                    </ListItem>
                                </MenuItem>
                                {counties.length > 0 && counties.map((item, key) => (
                                    <MenuItem value={item.id} key={key}>
                                        <ListItem sx={searchStyles.selectLocationListItem}>
                                            <ListItemIcon>
                                                <LocationOn />
                                            </ListItemIcon>
                                            <ListItemText primary={item.county} />
                                        </ListItem>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Search input */}
                    <Grid 
                        item 
                        xl={searchInputGrid[0]} 
                        md={searchInputGrid[1]} 
                        xs={searchInputGrid[2]} 
                        sm={searchInputGrid[3]} 
                        sx={dimension == 'desktop' ? searchStyles.inputSearchGrid : searchStyles.inputMobileSearchGrid }
                    >
                        <Paper sx={
                              formik.values.search == '' && formik.touched.search ?
                                    searchStyles.inputSearchErrorPaper
                               :
                                    searchStyles.inputSearchPaper
                            }>
                            <InputBase
                                name="search"
                                placeholder="Araba, telefon, bisiklet ve daha fazlası"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                sx={searchStyles.inputSearchAreaInputBase}
                                value={formik.values.search}
                                onChange={formik.handleChange}
                                startAdornment={dimension == 'mobile' && <SearchIcon sx={searchStyles.mobileSearchIcon} />}
                            />
                            {dimension == 'desktop' && (
                                <Button
                                    type="submit"
                                    color="primary"
                                    sx={searchStyles.searchInputIconButton}
                                    aria-label="directions">
                                    <SearchOutlined />
                                </Button>
                            )}
                        </Paper>
                    </Grid>
            </Grid>
            {dimension == 'mobile' && 
                <Grid container>
                     <Grid 
                        item
                        md={12}
                        xs={12}
                        sm={12}
                    >
                        {searchData.length > 0 && (
                            <Box sx={searchStyles.dialogCategoryBox}>
                                <Typography sx={searchStyles.dialogCategoryTitle}>Son Aramalar</Typography>
                                <List sx={searchStyles.dialogCategoryList}>
                                        {searchData?.map((recentItem, key) => (
                                            <ListItem key={key} sx={searchStyles.dialogRecentSearchListItem}>
                                                    <ListItemButton 
                                                        sx={searchStyles.dialogRecentSearchListItemButton}
                                                        onClick={() => handleRecentSearch(recentItem?.title)}
                                                        >
                                                        <Typography 
                                                            sx={searchStyles.dialogRecentSearchText}
                                                        >{recentItem.title}</Typography>
                                                    </ListItemButton>
                                            </ListItem>
                                        ))}
                                </List>
                            </Box>
                        )}
                    </Grid>
                    <Grid 
                        item
                        md={12}
                        xs={12}
                        sm={12}
                    >
                       <CategoryBanner styles={searchStyles} page="search" handleDrawerClose={handleTurnSearchDrawer} />
                    </Grid>
                </Grid>
            }
        </form>
    </Container>
  )
}

export default Search;