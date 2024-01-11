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
    FormControl,
    SelectChangeEvent
    } from '@mui/material'

// Material UI icons
import {
    ExpandMore, 
    Remove
    } from '@mui/icons-material';

// styles and assets
import { advertSearchStyles } from '../../styles';

// helper
import { RequestPublic } from '../../helpers/Request';

// Redux
import {useAppSelector} from '../../redux/store';

// Component
import AdCard from '../../components/common/AdCard';
import NoResult from '../../components/common/NoResult';
import Breadcrumb from '../../components/common/Breadcrumb';

// other
import { useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import slugify from 'react-slugify';

// Interfaces
import { CardTypes } from '../advertTypes';
import { Menu } from '../../redux/interface';
import { CountiesProps } from '../advertTypes';

const Search = () => {
    // Redux
    const {menuData} = useAppSelector((state) => state?.Menu);

     // React Router
    const [searchParams, setSearchParams] = useSearchParams();
    
    const location_param = searchParams.get('location');

    let selected_city:string = '';
    let selected_county: string = '';

    if(location_param !== null) {
        const location_split = location_param!.split('-');

        selected_city = location_split[0];
        selected_county = location_split[1]
    }   
    
    const category_param = searchParams.get('category');

    let selected_main_category: string = '';
    let selected_sub_category: string = '';

    if(category_param !== null){
        const category_split =  category_param.split('-');
        selected_main_category = category_split[0]
        selected_sub_category = category_split[1]
    }

    const search_query = searchParams.get('q');
    const searchValue = search_query && slugify(search_query, {delimiter: ' '});

    const selectedSorting = searchParams.get('sorting');

    // useState area
    const [advertData, setAdvertData] = useState<CardTypes[]>([]);
    const [price, setPrice] = useState<{minPrice: string, maxPrice: string}>({minPrice: '', maxPrice: ''});
    const [filters, setFilters] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);

    const [categories, setCategories] = useState<Menu[]>([]);
    const [counties, setCounties] = useState<CountiesProps[]>([]);
    const [currentCategory, setCurrentCategory] = useState<string>('');
   
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
            setCount(data.length);
           
            advertData.map((item) => {
                menuData!.filter((reduxItem) => {
                    if(item?.main_category_id == reduxItem.category_id) {
                        setCategories([reduxItem])
                    }
                })
            }) 
               
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

        if (selected_main_category) {
            updatedParams.push("main_category=" + selected_main_category);

            const newList = menuData!.filter((item) => item.category_id == String(selected_main_category));
           
            setCategories(newList)
        }

        if (selected_sub_category) {
            updatedParams.push("sub_category=" + selected_sub_category);
        }

        if (selectedSorting) {
            updatedParams.push("sorting=" + selectedSorting);
        }

        setAdvertData([])
        setFilters(updatedParams);
    }, [selected_city, selected_county, price, search_query, category_param, selectedSorting]);


    /* title the search for view current category */
    useEffect(() => {
        if(selected_sub_category){
            menuData!.map(item => {
                item.sub_category.filter(filterItem => {
                    if(filterItem.sub_category_id == Number(selected_sub_category)) {
                        setCurrentCategory(filterItem.sub_category_name)
                    }
                })
            })
        }else{
            menuData!.filter(filterItem => {
                if(filterItem.category_id == selected_main_category) {
                    setCurrentCategory(filterItem.category_name)
                }
            })
        }
    }, [category_param])

    // gets counties according to current city
    useEffect(() => {
        const getCounties = async() => {
            const url = "/advert/location/" + 34;
            const result = await RequestPublic({
                method: 'GET',
                url: url
            })

            setCounties(result);
        }
        getCounties();
    },[])
      

    const initialValues: {minPrice: string, maxPrice: string} = {
        minPrice: '',
        maxPrice: '',
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: async (values) => {
            const {minPrice, maxPrice} = values;

            if(minPrice){
                if(minPrice || maxPrice){
                    setPrice({minPrice, maxPrice})
                }
            }
            else{
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Bir fiyat aralığını belirlemelisiniz.",
                    showConfirmButton: false,
                    timer: 1500
                });
                
            }
        }
    })

    const handleFilterCategory = (mainCategory: string, subCategory: string) => {
        const categories = subCategory ? slugify(subCategory, { prefix: mainCategory }) : mainCategory;
    
        setSearchParams((prev) => {
            prev.set("category", categories);
            return prev;
        });
    }

    const handleFilterLocation = (city: number, county: number) => {
        const location = county != 0 ? slugify(county, { prefix: String(city) }) : city;
    
        setSearchParams((prev) => {
            prev.set("location", String(location));
            return prev;
        });
    }

    const handleSortingChange = (event: SelectChangeEvent<string>) => {
        const sortingValue = event.target.value;

        if(sortingValue !== 'default'){
            setSearchParams((prevParams) => {
                prevParams.set('sorting', sortingValue);
                return prevParams
            });
        }else{
            setSearchParams((prevParams) => {
                prevParams.delete('sorting')
                return prevParams
            });
        }
    }

    return (
        <Container>
            <Grid container>
                {/* Elements of left filter column */}
                <Grid xl={4} lg={4} md={4} sx={advertSearchStyles.leftFilterGrid}>
                    <Grid spacing={2} container>
                         {/* Top right elements */}
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Breadcrumb breadcrumbItems={[]} />
                            <Typography sx={advertSearchStyles.leftFilterTitle}>{search_query !== null ? searchValue : currentCategory}</Typography>
                        </Grid>
                        {/* filter category of column */}
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Accordion sx={advertSearchStyles.leftFilterAccording} defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    sx={advertSearchStyles.leftFilterAccordingSummary}
                                >
                                    <Typography sx={advertSearchStyles.leftFilterCardsTitle}>
                                        Kategoriler
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                        <Box sx={advertSearchStyles.leftFilterAccordingTitleBox}>
                                                <Remove />
                                                <Typography sx={advertSearchStyles.leftFilterAccordingTitle}>Tüm Kategoriler</Typography>
                                        </Box>
                                        <Grid container>
                                            {categories?.length >0 && categories?.map((mainItem, key) => (
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} key={key}>
                                                    <Box sx={mainItem.category_id == selected_main_category && selected_sub_category == undefined ? (
                                                            advertSearchStyles.leftFilterAccordingContentActiveBox
                                                        ): (
                                                            advertSearchStyles.leftFilterAccordingContentBox
                                                        )}>
                                                        <Remove />
                                                        <Typography 
                                                            sx={advertSearchStyles.leftFilterAccordingMainContent}
                                                            onClick={() => handleFilterCategory(mainItem.category_id, '')}
                                                            >{mainItem.category_name}
                                                        </Typography>
                                                    </Box>
                                                   
                                                    {mainItem?.sub_category?.map((subItem) => (
                                                        <Typography 
                                                            sx={String(subItem.sub_category_id) == selected_sub_category ? (
                                                                advertSearchStyles.leftFilterAccordingActiveSubContent
                                                            ): (
                                                                advertSearchStyles.leftFilterAccordingSubContent
                                                            )}
                                                            onClick={() => handleFilterCategory(mainItem.category_id, String(subItem.sub_category_id))}
                                                            >{subItem.sub_category_name}</Typography>
                                                    ))}
                                                </Grid>
                                            ))}
                                        </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                         {/* filter Location of column */}
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Divider />
                            <Accordion sx={advertSearchStyles.leftFilterAccording} defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    sx={advertSearchStyles.leftFilterAccordingSummary}
                                >
                                    <Typography sx={advertSearchStyles.leftFilterCardsTitle}>
                                        Lokasyonlar
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                        <Box sx={advertSearchStyles.leftFilterAccordingTitleBox}>
                                                <Remove />
                                                <Typography sx={advertSearchStyles.leftFilterAccordingTitle}>Türkiye</Typography>
                                        </Box>
                                        <Grid container>
                                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                    <Box sx={String(selected_city) == selected_city && selected_county == undefined ? (
                                                            advertSearchStyles.leftFilterAccordingContentActiveBox
                                                        ): (
                                                            advertSearchStyles.leftFilterAccordingContentBox
                                                        )}>
                                                        <Remove />
                                                        <Typography 
                                                            sx={advertSearchStyles.leftFilterAccordingMainContent}
                                                            onClick={() => handleFilterLocation(Number(selected_city), 0)}
                                                            >İstanbul
                                                        </Typography>
                                                    </Box>
                                                   
                                                    {counties?.map((ItemCounty, key) => (
                                                        <Typography 
                                                            key={key}
                                                            sx={String(ItemCounty.id) == selected_county ? (
                                                                advertSearchStyles.leftFilterAccordingActiveSubContent
                                                            ): (
                                                                advertSearchStyles.leftFilterAccordingSubContent
                                                            )}
                                                            onClick={() => handleFilterLocation(Number(selected_city), ItemCounty.id!)}
                                                            >{ItemCounty.county}</Typography>
                                                    ))}
                                                </Grid>
                                        </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                         {/* filter Price of column */}
                        <Grid item xl={12} md={12} sm={12} xs={12}>
                            <Divider />
                            <Accordion sx={advertSearchStyles.leftFilterAccording} defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
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
                     {advertData.length !== 0 && (
                        <>
                    <Grid container sx={advertSearchStyles.rightFilterGrid}>
                         {/* Search info */}
                        <Grid xl={4} md={4} sm={4} xs={4}>
                            <Box sx={advertSearchStyles.rightFilterInfoBox}>
                                {search_query !== null ? (
                                    <>
                                        <Typography sx={{ fontWeight: 600 }}>&quot;{searchValue}&quot;&nbsp; </Typography>
                                        <Typography sx={advertSearchStyles.rightFilterInfo}>için arama sonuçları</Typography>
                                    </>
                                ): (
                                    <>
                                        <Typography sx={{ fontWeight: 600 }}>&quot;{"İstanbul"}&quot;&nbsp; </Typography>
                                        <Typography sx={advertSearchStyles.rightFilterInfo}>lokasyonunda ilanlar</Typography>
                                    </>
                                )}
                            </Box>
                        </Grid>
                        {/* data count of search */}
                        <Grid xl={2} md={2} sm={2} xs={2}>
                            <Chip label={`${count} ilan`} sx={advertSearchStyles.rightFilterCount} color="primary" />
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
                                    defaultValue="default"
                                    name="sorting"
                                    onChange={handleSortingChange}
                                >
                                    <MenuItem value="default">Varsayılan</MenuItem>
                                    <MenuItem value="desc-relevance">Yayınlama Tarihi</MenuItem>
                                    <MenuItem value="asc-price">Fiyat: Düşükten Yükseğe</MenuItem>
                                    <MenuItem value="desc-price">Fiyat: Yüksekten Düşüğe</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                     <AdCard data={advertData} grid={[4,4,4,6]} />
                     </>
                    )}
                    {advertData.length == 0 && ( 
                        <NoResult page="search" />
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Search