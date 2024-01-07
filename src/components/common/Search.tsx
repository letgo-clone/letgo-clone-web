import React, { useState, useEffect } from 'react';

// Material UI elements
import { 
    Grid, 
    MenuItem, 
    FormControl, 
    Paper, 
    Select, 
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    Button,
    InputBase } from "@mui/material"

// Material UI Icons
import { 
    SearchOutlined, 
    LocationOn 
} from '@mui/icons-material';

// styles
import { searchStyles } from '../../styles';

// Helper
import { RequestPublic } from '../../helpers/Request';

// other
import { useFormik } from 'formik';
import slugify from 'react-slugify';
import { useNavigate, useParams } from 'react-router-dom';

// İnterface
import { 
    searchProps
    ,searchFormTypes 
    } from './commonTypes';

import { CountiesProps } from '../../pages/advertTypes';

const Search: React.FC<searchProps> = ({ dimension }) => {
    // React Router
    const navigate = useNavigate();
    const params = useParams();

    const paramLocation = params.location;
    const paramLocationSplit = paramLocation && paramLocation.split('-');
    const paramsSearch = params.search;

    const cityId = '34';
    // useState
    const [counties, setCounties] = useState<CountiesProps[]>([]);

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
        location: paramLocationSplit !== undefined && paramLocationSplit[1] ? 
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
                navigate('/search/' + locationDetail + '/'  + searchFilter) 
            }
        }
    })
  return (
    <Container>
        <form
            onSubmit={formik.handleSubmit}
        >
            <Grid container>
                    {/* Location select input */}
                    <Grid item xl={4} md={4} xs={4}>
                        <FormControl size="small" fullWidth>
                            <Select
                                id="location"
                                name="location"
                                sx={searchStyles.selectLocation}
                                value={formik.values.location}
                                onChange={formik.handleChange}
                                error={Boolean(formik.values.location == '' && formik.touched.location)}
                            >
                                <MenuItem value="0">
                                    <ListItem sx={searchStyles.selectLocationListItem}>
                                        <ListItemIcon sx={searchStyles.selectLocationListItemFirstIcon}>
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
                    <Grid item xl={8} md={8} xs={12} sx={searchStyles.inputSearchGrid}>
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
                            />
                            <Button
                                type="submit"
                                color="primary"
                                sx={searchStyles.searchInputIconButton}
                                aria-label="directions">
                                <SearchOutlined />
                            </Button>
                        </Paper>
                    </Grid>
                   
            </Grid>
        </form>
    </Container>
  )
}

export default Search;