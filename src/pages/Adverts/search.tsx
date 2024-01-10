import { useState, useEffect } from 'react'

// Material UI elements
import { 
    Box, 
    Grid, 
    Container, 
    Typography, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    Divider, 
    TextField, 
    Button, 
    Select, 
    MenuItem, 
    Chip, 
    FormControl 
    } from '@mui/material'

// Material UI icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// styles and assets
import { advertSearchStyles } from '../../styles';

// helper
import { RequestPublic } from '../../helpers/Request';

// Component
import { AdCard } from '../../components/AdCard';

// other
import { Link,useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

// Interfaces
import { CardTypes } from '../advertTypes';



interface Location {
    city: string;
    county?: string; // county opsiyonel hale getirildi
  }

const Search = () => {
     // React Router
   
     const [searchParams, setSearchParams] = useSearchParams();
    
    const location_param = searchParams.get('location')
    const location = parseLocation(location_param!);

    const selected_city = location?.city;
    const selected_county = location?.county;

    const search_query = searchParams.get('q');

    // useState area
    const [advertData, setAdvertData] = useState<CardTypes[]>([]);
    const [price, setPrice] = useState<{minPrice: string, maxPrice: string}>({minPrice: '', maxPrice: ''});
    const [filters, setFilters] = useState<string[]>([]);
    
    // useEffect area
    useEffect(() => {
        const getData = async () => {
            const baseUrl = "/advert/actual"
            const fullUrl = baseUrl + (filters.length > 0 ? "?" + filters.join("&"): "");

            const data = await RequestPublic({
                method: 'GET',
                url: fullUrl
            });
            
            setAdvertData(data); 
        }

        if(filters.length > 0){
            getData();
        }
       
    }, [filters])


    useEffect(() => {
        // Herhangi bir değişiklik olduğunda parametreleri kontrol et ve güncelle
        const updatedParams = [];
        if(search_query){
            const search:string = search_query.replace(/-/g, '%');
            
            updatedParams.push("search=" + search);
        }
        if (selected_city) {
          updatedParams.push("selected_city=" + selected_city);
        }
    
        if (selected_county) {
          updatedParams.push("selected_county=" + selected_county);
        }

        if (price) {
            if(price.maxPrice){
                updatedParams.push("max_price=" + price.maxPrice);
            }
            if(price.minPrice){
                updatedParams.push("min_price=" + price.minPrice);
            }
        }
        
        setAdvertData([])
        setFilters(updatedParams);
      }, [selected_city, selected_county, price, search_query]);

    function parseLocation(input: string): Location {
        const parts = input.split('-');
        const result: Location = {city: ''};

        if (parts.length === 1 && typeof parts[0] === 'string') {
            result.city = parts[0];
        } 
        else (parts.length === 2 && typeof parts[0] === 'string' && typeof parts[1] === 'string')
        {
            result.city = parts[0];
            result.county = parts[1];
        }

        return result;
    }

    const initialValues: {minPrice: string, maxPrice: string} = {
        minPrice: '',
        maxPrice: '',
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: async (values) => {
            const {minPrice, maxPrice} = values;

            if(maxPrice > minPrice){
                if(minPrice || maxPrice){
                    setPrice({minPrice, maxPrice})
                }
            }
            else{
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "En yüksek değer en az değerden küçük olmamalı.",
                    showConfirmButton: false,
                    timer: 1500
                });
                
            }
        }
    })
    return (
        <Container>
            <Grid container>
                {/* Elements of left filter column */}
                <Grid xl={4} lg={4} md={4} sx={advertSearchStyles.leftFilterGrid}>
                    <Grid spacing={2} container>
                         {/* Top right elements */}
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Typography sx={advertSearchStyles.leftFilterTitleLink}>Ana sayfa (Breadcumb) </Typography>
                            </Link>
                            <Typography sx={advertSearchStyles.leftFilterTitle}>İphone 14 in Istanbul</Typography>
                        </Grid>
                        {/* filter category of column */}
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Accordion sx={advertSearchStyles.leftFilterAccording}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    sx={advertSearchStyles.leftFilterAccordingSummary}
                                >
                                    <Typography sx={advertSearchStyles.leftFilterCardsTitle}>
                                        Kategoriler
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        <li>Tüm Kategoriler</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                         {/* filter Location of column */}
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Divider />
                            <Accordion sx={advertSearchStyles.leftFilterAccording}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    sx={advertSearchStyles.leftFilterAccordingSummary}
                                >
                                    <Typography sx={advertSearchStyles.leftFilterCardsTitle}>
                                        Lokasyonlar
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul style={{ listStyle: '-' }}>
                                        <li>İstanbul</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                         {/* filter Price of column */}
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Divider />
                            <Accordion sx={advertSearchStyles.leftFilterAccording}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    sx={advertSearchStyles.leftFilterAccordingSummary}
                                >
                                    <Typography sx={advertSearchStyles.leftFilterCardsTitle}>
                                        Fiyatlar
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                <form 
                                    method='POST'
                                    onSubmit={formik.handleSubmit}
                                >
                                    <Grid container spacing={1}>
                                        <Grid item xl={3} md={3} sm={3} xs={3}>
                                            <TextField 
                                                id="outlined-basic" 
                                                label="en az" 
                                                variant="outlined" 
                                                size="small"
                                                name="minPrice" 
                                                value={formik.values.minPrice}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xl={2} md={2} sm={2} xs={2} >
                                            <Typography sx={advertSearchStyles.textBetweenPriceFilter}>
                                                -
                                            </Typography>
                                        </Grid>
                                        <Grid item xl={3} md={3} sm={3} xs={3}>
                                            <TextField 
                                                id="outlined-basic" 
                                                label="en çok" 
                                                variant="outlined" 
                                                size="small" 
                                                name="maxPrice" 
                                                value={formik.values.maxPrice}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                        <Grid item xl={3} md={3} sm={3} xs={3} sx={{ marginLeft: 2, marginTop: 1 }}>
                                            <Button type="submit" variant="contained" sx={advertSearchStyles.priceFilterButton}>Uygula</Button>
                                        </Grid>
                                    </Grid>
                                </form>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xl={8} lg={8} md={8}>
                     {/* Elements of right filter column */}
                    <Grid container sx={advertSearchStyles.rightFilterGrid}>
                         {/* Search info */}
                        <Grid xl={4} md={4} sm={4} xs={4}>
                            <Box sx={advertSearchStyles.rightFilterInfoBox}>
                                <Typography sx={{ fontWeight: 600 }}>&quot;Araba&quot;&nbsp; </Typography>
                                <Typography sx={advertSearchStyles.rightFilterInfo}>için arama sonuçları</Typography>
                            </Box>
                        </Grid>
                        {/* data count of search */}
                        <Grid xl={2} md={2} sm={2} xs={2}>
                            <Chip label="3878 ilan" sx={advertSearchStyles.rightFilterCount} color="primary" />
                        </Grid>
                          {/* sorting filter */}
                        <Grid xl={3} md={3} sm={3} xs={3}>
                            <Typography sx={advertSearchStyles.rightSortingFilterText}>
                                Sıralama Ölçütü :
                            </Typography>
                        </Grid>
                        <Grid xl={3} md={3} sm={3} xs={3}>
                            <FormControl variant="standard" sx={{ m: 1, width:'100%' }}>
                                <Select
                                    disableUnderline
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    sx={advertSearchStyles.rightSortingFilter}
                                    defaultValue={50}
                                >
                                    <MenuItem value={10}>Yayınlama Tarihi</MenuItem>
                                    <MenuItem value={20}>Akıllı Sıralama</MenuItem>
                                    <MenuItem value={30}>Fiyat: Düşükten Yükseğe</MenuItem>
                                    <MenuItem value={40}>Fiyat: Yüksekten Düşüğe</MenuItem>
                                    <MenuItem value={50}>Mesafeye Göre</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    {advertData.length > 0 && <AdCard data={advertData} grid={[4,4,4,6]} />}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Search