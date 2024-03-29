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
  import { privacyStyles } from '../../styles';
  
  
  // Component
  import SettingsLeftNav from '../../components/common/SettingsLeftNav';
  
  function Chat() {
    document.title = "Sohbet güvenliği ipuçları"
    return (
      <Container>
          <Grid container spacing={3} sx={privacyStyles.settingsMainGrid}>
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
                                  Bildirimlerim
                              </Typography>
                          </Grid>
                          <Grid item lg={12} xl={12} md={12} sm={12} xs={12} sx={privacyStyles.settingContentGrid}>
                              <Grid container>
                                  <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                                          <Typography sx={privacyStyles.settingLeftText}>Güvenlik İpuçları</Typography>
                                          <Typography sx={privacyStyles.settingLeftSubText}>Sohbet etkinliğine dayalı güvenlik ipuçları al</Typography>
                                  </Grid>
                                  <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                                      <Box sx={privacyStyles.settingRightBox}>
                                          <Switch defaultChecked  color="error"/>
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
  
  export default Chat