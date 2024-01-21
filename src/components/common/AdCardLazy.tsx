import React from 'react'

// Material UI elements
import { 
    Grid, 
    Card
    } from '@mui/material';

// Styles
import { adCardStyles } from '../../styles';

// Interfaces or Types

import { AdCardLazyProps } from './commonTypes';

const AdCardLazy: React.FC<AdCardLazyProps> = ({ grid }) => {
    return (
        <Grid container spacing={2}>
            {[1,2,3,4,5,6,7,8].map((index) => (
                <Grid item={true} lg={grid[0]} md={grid[1]} sm={grid[2]} xs={grid[3]} key={index}>
                    <Card sx={adCardStyles.cardLazy}>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default AdCardLazy