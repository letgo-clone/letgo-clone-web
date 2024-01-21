import { useState } from 'react';

// Material UI elements
import {
  Container,
  Grid,
  Typography,
  Box,
  Switch,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button
}
  from '@mui/material'


// Material UI Icons

import { 
  VisibilityOff,
  Visibility
} from '@mui/icons-material';

// Assets
import { privacyStyles } from '../../styles';

// Component
import SettingsLeftNav from '../../components/common/SettingsLeftNav';

// helpers
import { Request } from '../../helpers/Request';

// Redux
import { removeAllData } from '../../redux/store';

// Other
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

// interface
import { PrivacyFormTypes } from '../formTypes';

function Privacy() {
  document.title = "Gizlilik"
  // useState
  const [visiblityPassword, setVisibilityPassword] = useState(false);

  const initialValues: PrivacyFormTypes = {
      currentPass: '',
      password: '',
      passwordAgain: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const { currentPass, password, passwordAgain } = values;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

      if (currentPass == '' || password == '' || passwordAgain == '') {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: 'Gerekli alanları doldurmanız gerekiyor.',
          })
      }
      else if (password !== passwordAgain) {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: 'Şifreler uyuşmuyor.',
          })
      }
      else if (currentPass == password) {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: 'Yeni şifreniz ile mevcut şifreniz aynı olmamalıdır.',
          })
      }
      else if (password && password.length < 6 && !passwordRegex.test(password)) {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: 'En az 6 karakter ve en az bir harf ve bir sayı kullan',
          })
      }
      else{
        const formdata: FormData = new FormData();
        formdata.append('password', password!);
        formdata.append('current_pass', currentPass!);

        const url = '/account/session';

        const result: {success?: boolean}[] | any = await Request({
            method: 'PUT',
            url: url,
            formData: formdata
        });

        if(result.success){
            Swal.fire({
              position: "center",
              icon: "success",
              title: "İşlem tamamlandı.",
              showConfirmButton: false,
              timer: 1500
            });
            removeAllData();
            location.reload();
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: result.error_description,
          })
        }
      }
    }
  })

  const handleClickShowPassword = () => setVisibilityPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
  };


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
                                        <Switch defaultChecked color="error"/>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={privacyStyles.settingsLeftBox}>
                    <Grid container>
                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12} sx={privacyStyles.settingsTitleGrid}>
                            <Typography sx={privacyStyles.settingsTitle}>
                                Şifreyi değiştir
                            </Typography>
                        </Grid>
                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12} sx={privacyStyles.settingContentGrid}>
                          <form
                             method='POST'
                             onSubmit={formik.handleSubmit}
                          >
                            <Grid container>
                                <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
                                  <Box sx={privacyStyles.passwordBox}>
                                      <OutlinedInput
                                          fullWidth
                                          id="outlined-adornment-password"
                                          type={visiblityPassword ? 'text' : 'password'}
                                          endAdornment={
                                          <InputAdornment position="end">
                                              <IconButton
                                              aria-label="toggle password visibility"
                                              onClick={handleClickShowPassword}
                                              onMouseDown={handleMouseDownPassword}
                                              edge="end"
                                              >
                                              {visiblityPassword ? <VisibilityOff /> : <Visibility />}
                                              </IconButton>
                                          </InputAdornment>
                                          }
                                          placeholder='Mevcut şifre'
                                          name="currentPass"
                                          value={formik.values.currentPass}
                                          onChange={formik.handleChange}
                                          error={Boolean(formik.values.currentPass == '' && formik.touched.currentPass)}
                                      />
                                   </Box>
                                </Grid>
                                <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
                                  <Box sx={privacyStyles.passwordBox}>
                                      <OutlinedInput
                                          fullWidth
                                          id="outlined-adornment-password"
                                          type={visiblityPassword ? 'text' : 'password'}
                                          endAdornment={
                                          <InputAdornment position="end">
                                              <IconButton
                                              aria-label="toggle password visibility"
                                              onClick={handleClickShowPassword}
                                              onMouseDown={handleMouseDownPassword}
                                              edge="end"
                                              >
                                              {visiblityPassword ? <VisibilityOff /> : <Visibility />}
                                              </IconButton>
                                          </InputAdornment>
                                          }
                                          placeholder='Yeni şifre'
                                          name="password"
                                          value={formik.values.password}
                                          onChange={formik.handleChange}
                                          error={Boolean(formik.values.password == '' && formik.touched.password)}
                                      />
                                       <Typography sx={{ fontSize : '14px', fontWeight: 300}}>En az 6 karakter ve en az bir harf ve bir sayı kullan</Typography>
                                  </Box>
                                </Grid>
                                <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
                                  <Box sx={privacyStyles.passwordBox}>
                                      <OutlinedInput
                                          fullWidth
                                          id="outlined-adornment-password"
                                          type={visiblityPassword ? 'text' : 'password'}
                                          endAdornment={
                                          <InputAdornment position="end">
                                              <IconButton
                                              aria-label="toggle password visibility"
                                              onClick={handleClickShowPassword}
                                              onMouseDown={handleMouseDownPassword}
                                              edge="end"
                                              >
                                              {visiblityPassword ? <VisibilityOff /> : <Visibility />}
                                              </IconButton>
                                          </InputAdornment>
                                          }
                                          placeholder='Yeni şifreyi onayla'
                                          name="passwordAgain"
                                          value={formik.values.passwordAgain}
                                          onChange={formik.handleChange}
                                          error={Boolean(formik.values.passwordAgain == '' && formik.touched.passwordAgain)}
                                      />
                                  </Box>
                                </Grid>
                                <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
                                    <Box sx={privacyStyles.buttonBox}>
                                      <Button 
                                        variant="outlined" 
                                        sx={privacyStyles.saveButton}
                                        color="error"
                                        type="submit"
                                    >
                                        Şifreyi değiştir
                                    </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                          </form>
                        </Grid>
                    </Grid>
                </Box>
                
            </Grid>
        </Grid>
    </Container>
  )
}

export default Privacy