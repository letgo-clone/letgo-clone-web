import { useState } from 'react';

// Material UI elements
import {
  Container,
  Grid,
  Button,
  Typography,
  InputAdornment,
  TextField,
  Box,
  IconButton,
  Card,
  CardContent
}
  from '@mui/material'

// Material UI icons
import {
  Close, 
  Tungsten} from '@mui/icons-material';

// Assets
import { profileEditStyles } from '../../styles';
import DefaultAvatar from '../../assets/img/default_avatar.png'

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
import { ProfileInfoTypes } from '../formTypes';

function ProfileInfo() {
  document.title = "Profilini görüntüle";
  // Redux elemen ts
  const dispatch = useAppDispatch();
  const loginData: LoginData = store.getState().authUser.loginData!;

  // useState
  const [uploadImage, setUploadImage] = useState<File | null>(null)

  const initialValues: ProfileInfoTypes = {
    fullname: loginData.fullname,
    about: loginData?.about ? loginData?.about : '',
    phoneNumber: loginData?.phone_number ? loginData?.about : '',
    email: loginData.email
  };

  const formik = useFormik({
      initialValues,
      onSubmit: async (values) => {
        const { fullname, about, phoneNumber, email } = values;

        if(fullname == '' || email == ''){
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Gerekli alanları doldurmanız gerekiyor.",
              showConfirmButton: false,
              timer: 1500
            });
        }
        else{
            const formdata: FormData = new FormData();
            formdata.append('fullname', fullname!);
            about !== '' && formdata.append('about', about!);
            phoneNumber !== '' && formdata.append('phone_number', phoneNumber!);
            formdata.append('email', email!);
            uploadImage && formdata.append('photo', uploadImage);

            const url = '/account/session';
          
            const result: {success?: boolean, photo?: object}[] | any = await Request({
                method: 'PUT',
                url: url,
                formData: formdata
            });
            
            if (result?.success) {
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
                    photo: JSON.parse(result?.photo)
                }
                dispatch(setLoginData(newLoginData));
                location.reload();
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

  const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(file) {
        setUploadImage(file)
    }
  }

  const removeImage = () => {
      setUploadImage(null)
  }
  return (
    <Container>
        <Grid container spacing={3} sx={profileEditStyles.mainGrid}>
          {/* Profile view button */}
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Box sx={profileEditStyles.profileViewButtonBox}>
                <Button
                    href={'/profile'}
                    variant="outlined"
                    sx={profileEditStyles.profileViewButton}
                >
                  Profili Görüntüle
                </Button>
              </Box>
            </Grid>
              {/* Left column grids, inputs */}
            <Grid item lg={8} md={8} sm={12} xs={12} sx={profileEditStyles.profileEditGrid}>
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
                            <Typography sx={profileEditStyles.fileInputTitle}>Profil Fotoğrafı</Typography>
                            <Grid container spacing={3}>
                                <Grid item xl={2} lg={2} md={4} sm={4} xs={12}>
                                  {loginData?.photo ? (
                                       <img
                                          src={loginData?.photo.url}
                                          width={100}
                                          height={100}
                                       />
                                  ): (
                                        <img
                                            src={DefaultAvatar}
                                            width={100}
                                            height={100}
                                        />
                                  )}
                                </Grid>
                                <Grid item xl={10} lg={10} md={8} sm={8} xs={12}>
                                   <input
                                        type="file"
                                        name="photo"
                                        className="form-control"
                                        accept='image/png, image/jpeg'
                                        onChange={(event) => 
                                        {
                                           
                                            handlePhoto(event)
                                        }}
                                    />
                                </Grid>
                                  <Box sx={profileEditStyles.imagePreviewBox}>
                                      {uploadImage !== null && (
                                          <>
                                          <img
                                              src={URL.createObjectURL(uploadImage!)}
                                              width={100}
                                              height={100}
                                          />
                                            <Box sx={profileEditStyles.imagePreviewCloseIconBox}>
                                                  <IconButton 
                                                      aria-label="remove to advert" 
                                                      onClick={() => removeImage()}
                                                      sx={profileEditStyles.imagePreviewIconButton}
                                                  >
                                                          <Close sx={profileEditStyles.imagePreviewIcon} />
                                                  </IconButton>
                                            </Box>
                                          </>
                                      )}
                                  </Box>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12} sx={profileEditStyles.basicInputGrid}>
                            <Typography sx={profileEditStyles.inputTitle}>Temel bilgiler</Typography>
                            <Grid container spacing={2}>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                    <Grid container spacing={3} sx={profileEditStyles.InputsGrid}>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                    <Card sx={profileEditStyles.leftCard}>
                                          <CardContent>
                                              <Box sx={profileEditStyles.leftCardTitleBox}>
                                                <Tungsten />
                                                <Typography sx={profileEditStyles.leftCardTitle} >Bu neden önemlidir</Typography>
                                              </Box>
                                              <Box>
                                                <Typography
                                                  sx={profileEditStyles.leftCardContent}
                                                >letgo güven üzerine kuruludur. Başkalarının seni tanımasına yardım et. Biraz kendinden bahsetmeye ne dersin? En sevdiğin markaları, kitapları, filmleri, şovları, müzikleri, yemekleri paylaş. Ve neler olduğunu gör...</Typography>
                                              </Box>
                                          </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12} sx={profileEditStyles.contactInputsGrid}>
                            <Typography sx={profileEditStyles.inputTitle}>İletişim bilgileri</Typography>
                            <Grid container spacing={2}>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <Grid container spacing={3} sx={profileEditStyles.InputsGrid}>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                                            />
                                        </Grid>
                                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
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
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                    <Grid container spacing={3} sx={profileEditStyles.InputsGrid}>
                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                  <Typography sx={profileEditStyles.inputLeftTitle}>Bu numara, alıcı irtibat bilgileri, anımsatıcılar ve diğer bildirimler içindir.</Typography>
                                            </Grid>
                                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                                  <Typography sx={profileEditStyles.inputLeftTitle}>E-posta adresini kimseyle paylaşmayacağız.</Typography>
                                            </Grid>
                                    </Grid>
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