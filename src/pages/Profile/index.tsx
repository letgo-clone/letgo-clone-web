import React from 'react'

// Material UI elements
import {
  Container,
  Grid,
  Button,
  Typography,
  InputAdornment,
  TextField,
}
  from '@mui/material'

// Styles
import { profileEditStyles } from '../../styles';

// Helper
import { Request } from '../../helpers/Request';

// Redux
import 
  store,
  { 
  setLoginData, 
  useAppDispatch 
  } from '../../redux/store';

// other npm packages 
import { useFormik } from 'formik'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

// Interfaces
import { LoginData } from '../../redux/interface';
import { ResultProps } from '../advertTypes';
import { ProfileInfoTypes } from '../formTypes';

function ProfileInfo() {
  // Redux elemen ts
  const dispatch = useAppDispatch();
  const loginData: LoginData = store.getState().authUser.loginData!;


  const initialValues: ProfileInfoTypes = {
    fullname: loginData.fullname,
    about: loginData.about,
    phoneNumber: loginData.phone_number,
    email: loginData.email
  };

  const formik = useFormik({
      initialValues,
      onSubmit: async (values) => {
        const { fullname, about, phoneNumber, email } = values;

        if(fullname == '' || phoneNumber == '' || email == ''){
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Gerekli alanları doldurmanız gerekiyor.",
              showConfirmButton: false,
              timer: 1500
            });

        }else{
            const formdata: FormData = new FormData();
            formdata.append('fullname11', fullname!);
            formdata.append('about', about!);
            formdata.append('phone_number', phoneNumber!);
            formdata.append('email', email!);

            const url = '/account/session/user';
        
            const result: ResultProps = await Request({
                method: 'PUT',
                url: url,
                formData: formdata
            });
           
            if (result.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "İşlem tamamlandı.",
                    showConfirmButton: false,
                    timer: 1500
                });
                const formdata: FormData = new FormData();
                formdata.append("fullname", fullname!);

                const newLoginData = {
                    fullname: fullname,
                    email : email,
                    about: about,
                    phone_number: phoneNumber,
                }
                dispatch(setLoginData(newLoginData));
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Bi hata oluştu",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

      }
  })
  return (
    <Container>
        <Grid container sx={profileEditStyles.mainGrid}>
          {/* Profile view button */}
            <Grid item lg={4} md={4} sm={4}>
                <Button
                    href={'/profile'}
                    variant="outlined"
                    sx={profileEditStyles.profileViewButton}
                >
                  Profili Görüntüle
                </Button>
            </Grid>
              {/* Left column grids, inputs */}
            <Grid item lg={8} md={8} sm={8} sx={profileEditStyles.profileEditGrid}>
                <form
                    method='POST'
                    onSubmit={formik.handleSubmit}
                    encType='multipart/form-data'
                >
                    <Grid container>
                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12} sx={profileEditStyles.profileEditTitleGrid}>
                          <Typography sx={profileEditStyles.profileEditTitle}>
                              Profili düzenle
                          </Typography>
                        </Grid>
                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12} sx={profileEditStyles.basicInputGrid}>
                          <Typography sx={profileEditStyles.basicInputTitle}>Temel bilgiler</Typography>
                          <Grid container spacing={3} sx={profileEditStyles.InputsGrid}>
                              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                  <TextField
                                    fullWidth
                                    size='small'
                                    id="fullname"
                                    name="fullname"
                                    placeholder='Ad ve soyad'
                                    value={formik.values.fullname}
                                    onChange={formik.handleChange}
                                    error={Boolean(formik.values.fullname == '' )}
                                    helperText={formik.values.fullname == '' && 'Bu alan zorunludur'}
                                  />
                              </Grid>
                              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                  <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    size='small'
                                    id="about"
                                    name="about"
                                    placeholder='Hakkımda [isteğe bağlı]'
                                    value={formik.values.about}
                                    onChange={formik.handleChange}
                                  />
                              </Grid>
                          </Grid>
                        </Grid>
                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12} sx={profileEditStyles.contactInputsGrid}>
                            <Typography sx={profileEditStyles.contactInputTitle}>İletişim bilgileri</Typography>
                            <Grid container spacing={3} sx={profileEditStyles.InputsGrid}>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <TextField
                                      fullWidth
                                      size='small'
                                      id="phoneNumber"
                                      name="phoneNumber"
                                      value={formik.values.phoneNumber}
                                      onChange={formik.handleChange}
                                      InputProps={{
                                        startAdornment: <InputAdornment position="start">
                                          <Typography sx={profileEditStyles.contactAdornment}>+90</Typography>
                                        </InputAdornment>
                                      }}
                                      error={Boolean(formik.values.phoneNumber == '' )}
                                      helperText={formik.values.phoneNumber == '' && 'Bu alan zorunludur'}
                                    />
                                </Grid>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <TextField
                                      fullWidth
                                      size='small'
                                      id="email"
                                      name="email"
                                      placeholder='E-mail'
                                      value={formik.values.email}
                                      onChange={formik.handleChange}
                                      error={Boolean(formik.values.email == '' )}
                                      helperText={formik.values.email == '' && 'Bu alan zorunludur'}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12} sx={profileEditStyles.buttonsGrid}>
                            <Grid container spacing={3}>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <Link to={'/profile'} style={{ textDecoration: 'none'}}>
                                        <Typography sx={profileEditStyles.cancelButton}>Vazgeç</Typography>
                                    </Link>
                                </Grid>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} sx={profileEditStyles.saveButtonGrid}>
                                  <Button 
                                      variant="outlined" 
                                      sx={profileEditStyles.saveButton}
                                      color="error"
                                      type="submit"
                                  >
                                    Değişiklikleri kaydet
                                  </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    </Container>
  )
}

export default ProfileInfo