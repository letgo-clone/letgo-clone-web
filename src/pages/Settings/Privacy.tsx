// Material UI elements
import {
  Container,
  Grid,
  Typography,
  Box,
  Switch
}
  from '@mui/material'

// Assets
import { profileEditStyles, privacyStyles } from '../../styles';


// Component
import SettingsLeftNav from '../../components/common/SettingsLeftNav';

function Privacy() {

  return (
    <Container>
        <Grid container spacing={3} sx={profileEditStyles.mainGrid}>
          {/* Profile view button */}
            <Grid item lg={4} md={4} sm={12} xs={12}>
                    <SettingsLeftNav />
            </Grid>
              {/* Left column grids, inputs */}
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <Box sx={privacyStyles.settingsLeftBox}>
                    <Grid container>
                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12} sx={privacyStyles.settingsTitleGrid}>
                            <Typography sx={privacyStyles.settingsTitle}>
                                İlan ayarlarım
                            </Typography>
                        </Grid>
                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12} sx={privacyStyles.settingContentGrid}>
                            <Grid container>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                                        <Typography sx={privacyStyles.settingLeftText}>Telefon numaramı ilanlarda göster</Typography>
                                </Grid>
                                <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                                    <Box sx={privacyStyles.settingRightBox}>
                                        <Switch defaultChecked />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                
            </Grid>
        </Grid>
    </Container>
  )
}

export default Privacy