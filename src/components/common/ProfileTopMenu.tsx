
// Material UI elements
import {
    Box,
    Typography,
}
    from '@mui/material'

// Styles
import { adViewStyles } from '../../styles'

// React router
import { Link } from 'react-router-dom'

function ProfileTopMenu() {
  return (
    <Box sx={adViewStyles.topMenuBox}>
        <Link
            to="/profile/myads"
            style={{ textDecoration: 'none' }}
        >
            <Typography sx={adViewStyles.topMenuText}>
                İlanlarım
            </Typography>
        </Link>
        <Link
            to="/profile/myfavorite"
            style={{ textDecoration: 'none' }}
        >
            <Typography sx={adViewStyles.topMenuText}>
                Favorilerim
            </Typography>
        </Link>
    </Box>
  )
}

export default ProfileTopMenu