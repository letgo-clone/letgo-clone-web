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
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  FormControlLabel,
  Switch
}
  from '@mui/material'

// Material UI icons
import {
  Close, 
  Tungsten} from '@mui/icons-material';

// Assets
import { profileEditStyles, privacyStyles } from '../../styles';
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

// Component
import SettingsLeftNav from '../../components/common/SettingsLeftNav';

// Interfaces
import { LoginData } from '../../redux/interface';
import { ProfileInfoTypes } from '../formTypes';

function Privacy() {

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

            const url = '/account/session/user';
          
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