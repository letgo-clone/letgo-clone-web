import React from 'react';

// Material UI elements
import { 
    Grid, 
    IconButton, 
    MenuItem, 
    FormControl, 
    Paper, 
    Select, 
    ListItem,
    ListItemIcon,
    ListItemText,
    InputBase } from "@mui/material"

// Material UI Icons
import { 
    SearchOutlined, 
    LocationOn 
} from '@mui/icons-material';

// styles
import { searchStyles } from '../../styles';

// İnterface
import { searchProps } from './commonTypes';

const Search: React.FC<searchProps> = ({ dimension }) => {
   
  return (
    <Grid container>
        {/* Location select input */}
        <Grid item xl={4} md={4} xs={4}>
            <FormControl size="small" fullWidth>
                <Select
                    id="location"
                    name="location"
                    value="34"
                    sx={searchStyles.selectLocation}
                >
                    <MenuItem value="34">
                        <ListItem sx={searchStyles.selectLocationListItem}>
                            <ListItemIcon sx={searchStyles.selectLocationListItemFirstIcon}>
                                <LocationOn />
                            </ListItemIcon>
                            <ListItemText primary="İstanbul, Türkiye" />
                        </ListItem>
                    </MenuItem>
                    <MenuItem value="06">
                        <ListItem sx={searchStyles.selectLocationListItem}>
                            <ListItemIcon>
                                <LocationOn />
                            </ListItemIcon>
                            <ListItemText primary="Ankara" />
                        </ListItem>
                    </MenuItem>
                    <MenuItem value="35">
                        <ListItem sx={searchStyles.selectLocationListItem}>
                            <ListItemIcon>
                                <LocationOn />
                            </ListItemIcon>
                            <ListItemText primary="İzmir" />
                        </ListItem>
                    </MenuItem>
                </Select>
            </FormControl>
        </Grid>
        {/* Search input */}
        <Grid item xl={8} md={8} xs={12} sx={searchStyles.inputSearchGrid}>
            <Paper component="form" sx={searchStyles.inputSearchPaper}>
                <InputBase
                    sx={searchStyles.inputSearchAreaInputBase}
                    placeholder="Araba, telefon, bisiklet ve daha fazlası"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton
                    href='/item/search'
                    color="primary"
                    sx={searchStyles.searchInputIconButton}
                    aria-label="directions">
                    <SearchOutlined />
                </IconButton>
            </Paper>
        </Grid>
    </Grid>
  )
}

export default Search;