import React from 'react'
import {
  Container,
  Grid,
  Button,
  Typography,
  InputAdornment,
  TextField,
}
  from '@mui/material'

import { useFormik } from 'formik'
import { Link } from 'react-router-dom';
import { setLoginData } from '../../redux/store';
import { useSelector, useDispatch } from "react-redux";
import { Request } from '../../helpers/Request';
import Swal from 'sweetalert2';

function ProfileInfo() {
  const { loginData } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullname: loginData.fullname,
      about: loginData.about,
      phoneNumber: loginData.phone_number,
      email: loginData.email
    },
    onSubmit: async (values) => {
      const fullname = values.fullname;
      const about = values.about;
      const phoneNumber = values.phoneNumber;
      const email = values.email;

      const formdata: FormData = new FormData();
      formdata.append('fullname', fullname);
      formdata.append('about', about);
      formdata.append('phone_number', phoneNumber);
      formdata.append('email', email);

      const url = '/account/session/user';
      const result = await Request('PUT', url, formdata);

      if (result.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "İşlem tamamlanıyor.",
          showConfirmButton: false,
          timer: 1500
        });
        const formdata: FormData = new FormData();
        formdata.append("fullname", fullname);

        const url = '/account/session/user';
        await Request('PUT', url, formdata);

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
  })
  return (
    <Container>
      <Grid container sx={{ marginTop: 4 }}>
        <Grid item lg={4} md={4} sm={4}>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#ff3f55',
              borderRadius: '50px',
              border: '3px solid transparent',
              outline: '#ff3f55 solid 3px',
              textTransform: 'none',
              padding: '0px 100px 0px 100px',
              '&:hover': { backgroundColor: '#FFFFFF', border: '3px solid #ff3f55', color: '#ff3f55' },
            }}
          >
            Profili Görüntüle
          </Button>
        </Grid>
        <Grid
          item
          lg={8} md={8} sm={8}
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: '5px',
          }}
        >
          <form
            method='POST'
            onSubmit={formik.handleSubmit}
            encType='multipart/form-data'
          >
            <Grid container>
              <Grid
                item
                lg={12} xl={12} md={12} sm={12} xs={12}
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  padding: '25px 0px 15px 25px'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '20px',
                    lineHeight: '24px',
                    fontWeight: 700
                  }}
                >
                  Profili düzenle
                </Typography>
              </Grid>
              <Grid
                item
                lg={12} xl={12} md={12} sm={12} xs={12}
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  padding: '25px 0px 15px',
                  marginLeft: '20px'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: 700,
                    marginBottom: '15px'
                  }}
                >
                  Temel bilgiler
                </Typography>
                <Grid container spacing={3} sx={{ display: 'inline-block' }}>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <TextField
                      fullWidth
                      size='small'
                      id="fullname"
                      name="fullname"
                      placeholder='Ad ve soyad'
                      value={formik.values.fullname}
                      onChange={formik.handleChange}
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
              <Grid
                item
                lg={12} xl={12} md={12} sm={12} xs={12}
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  padding: '25px 0px 15px 25px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: 700,
                    marginBottom: '15px'
                  }}
                >
                  İletişim bilgileri
                </Typography>
                <Grid container spacing={3} sx={{ display: 'inline-block' }}>
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
                          <Typography sx={{ borderRight: '1px solid #e0e0e0', paddingRight: '10px', fontSize: '12px' }}>+90</Typography>
                        </InputAdornment>
                      }}
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
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                lg={12} xl={12} md={12} sm={12} xs={12}
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  padding: '25px 0px 15px 25px',
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                    <Link
                      to={'/profile'}
                      style={{
                        textDecoration: 'none'
                      }}
                    >
                      <Typography
                        sx={{
                          display: 'inline-block',
                          fontSize: '16px',
                          fontWeight: 700,
                          color: '#ff3f55',
                          marginTop: '15px',
                          borderBottom: '1px solid #ff3f55'
                        }}>Vazgeç</Typography>
                    </Link>
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={6} sx={{ textAlign: 'right' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        backgroundColor: '#ff3f55',
                        color: '#FFFFFF',
                        textTransform: 'none',
                        border: '6px solid transparent',
                        padding: '7px 5px 7px 5px',
                        fontSize: '16px',
                        marginRight: '15px',
                        marginBottom: '5px',
                        borderRadius: 15,
                        '&:hover': { bgcolor: '#FFFFFF', border: '6px solid #ff3f55', color: '#ff3f55' },
                      }}
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