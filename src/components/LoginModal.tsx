import { useEffect, useState } from 'react'

// Material UI elements
import { 
    Typography, 
    Grid, 
    Button, 
    DialogContent, 
    Box, 
    DialogTitle, 
    IconButton, 
    TextField,
    Dialog,  
    useTheme,
    useMediaQuery,
    FormControlLabel,
    Checkbox,
    OutlinedInput,
    InputAdornment
    } from '@mui/material'

// Material UI Icons

import { 
    ArrowBack,
    Close,
    VisibilityOff,
    Visibility
} from '@mui/icons-material';

// styles and assets
import { loginModalStyles } from '../styles';

// Other packages
import Carousel from 'react-material-ui-carousel'
import { useFormik } from "formik";
import Swal from 'sweetalert2';

// Redux
import { setLoginData, useAppDispatch } from '../redux/store';

// Helpers
import { HandleLoginToken, Request, RequestPublic } from '../helpers/Request';
import Logo from '../assets/img/logo.svg'

// interfaces
import { loginModalProps,ErrorProps } from './component';


const LoginModal: React.FC<loginModalProps> = ({ isLogin, handleClose }) => {
    // Redux
    const dispatch = useAppDispatch();
    
    // useState
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showRegister, setShowRegister] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [passLogin, setPassLogin] = useState<boolean>(false);
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [error, setError] = useState<ErrorProps>({});
    const [pageName, setPageName] = useState<string>('email');
    const [visiblityPassword, setVisibilityPassword] = useState(false);

    useEffect(() => {
        setLoginOpen(isLogin)
    },[isLogin])

    // Login verification
    useEffect(() => {
        if(localStorage.getItem('access_token')){
            const loginVerify = async () => {
                
                const requestUrl = "/account/session";
                const getData = await Request({
                    method: 'GET',
                    url: requestUrl
                });

                dispatch(setLoginData(getData));
                location.reload();
            }
            loginVerify();
        }
    },[passLogin])
    
    // Carousel Items
    const caroselItems: {image: string, description: string}[] = [
        {
            image: "https://statics.olx.com.tr/external/base/img/letgo/loginEntryPointPost.webp",
            description: "letgo'yu daha güvenli bir hale getirmeye sen de destek ol"
        },
        {
            image: "https://statics.olx.com.tr/external/base/img/letgo/loginEntryPointFavorite.webp",
            description: "İletişime geç ve daha hızlı anlaşmaya var"
        },
        {
            image: "https://statics.olx.com.tr/external/base/img/letgo/loginEntryPointChat.webp",
            description: "Tüm favori ürünlerini tek bir yerde kaydet"
        }
    ];

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            const email = values.email;
            const password = values.password;

            if (email) {
                setShowPassword(true)
            }
            if(password){
               const data = await HandleLoginToken(email,password);

               if(!data.error){
                    setPassLogin(true);
               }else{
                    setError(data)
               }
            }
        }
    });

    // Login area on/off
    const handleLogin = () => {
        setShowLogin(!showLogin);
        formik.setFieldValue('email', '');
        setShowPassword(false)
    }

    const handleRegister = () => {
        setShowRegister(!showRegister);
    }

    const handleClickShowPassword = () => setVisibilityPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const registerFormik = useFormik({
        initialValues: {
            email: '',
            dataPrivacyCheck: '',
            marketingCheck: '',
            password: '',
            passwordConfirm: ''
        },
        onSubmit: async (values) => {
            const {dataPrivacyCheck, marketingCheck, email, password, passwordConfirm} = values;
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

            if(email || email !== ''){
                const formdata: FormData = new FormData();
                formdata.append("email", email);

                const url = "/account/session/user";
                const checkEmail: Error | any = await RequestPublic({
                    method: 'POST',
                    url: url,
                    formData: formdata 
                })

                if(checkEmail.error == 'duplicate_email'){
                    setError({ error_type: checkEmail.error, error_description: checkEmail.error_description })
                }else{
                    setPageName('confirm')
                } 
            }

            if(dataPrivacyCheck && marketingCheck){
                setPageName('password')
            }

            if(pageName == 'password' && password !== ''){
                if(password != passwordConfirm){
                    setError({ error_type: 'register_validation', error_description: 'Şifreler uyuşmuyor' })
                }
                else if (password !== '' && password.length < 6 && !passwordRegex.test(password)) {
                    setError({ error_type: 'register_validation', error_description: 'En az 6 karakter ve en az bir büyük harf ve bir sayı kullan' })
                }else{
                    const formdata: FormData = new FormData();
                    formdata.append("email", email);
                    formdata.append("password", password);

                    const url = "/account/session/user";
                    const postData = await RequestPublic({
                        method: 'POST',
                        url: url,
                        formData: formdata 
                    })

                    const responseCheck = Object.keys(postData).filter(item => item == 'success');

                    if(responseCheck){
                        const data = await HandleLoginToken(email,password);
                    
                        if(!data.error){
                            setPassLogin(true);
                        }else{
                            setError(data)
                        }
                    }else{
                        const error: {error: string | undefined, error_description: string | undefined}[] | any = postData;
                        setError({ error_type: 'register_validation', error_description: error?.error_description })
                    
                    }
                }
            }
        }
    });

    // Material UI setting
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
   
    return (
        <>
            <Dialog
                    fullScreen={fullScreen}
                    open={loginOpen}
                    maxWidth="xs"
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                <DialogTitle id="responsive-dialog-title" sx={loginModalStyles.dialogTitle}>
                        <IconButton onClick={handleClose} sx={loginModalStyles.dialotTitleCloseButton}>
                            <Close sx={loginModalStyles.dialogTitleClose} />
                        </IconButton>
                        {showLogin && (
                            <IconButton onClick={handleLogin} sx={loginModalStyles.dialogTitleArrowButton}>
                              <ArrowBack sx={loginModalStyles.dialogTitleIcon} />
                            </IconButton>
                        )}
                </DialogTitle>
                <DialogContent sx={loginModalStyles.dialogContent}>
                {!showLogin && !showRegister ? (
                    <>
                        {/* First page of login modal  */}
                       
                            <Grid container spacing={2}>
                                {/* Carousel */}
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Carousel animation={'slide'} autoPlay={false} swipe={true}>
                                        {
                                            caroselItems.map((item, i) => (
                                                <Grid key={i} container sx={loginModalStyles.carouselGrid}>
                                                    <Grid lg={12} md={12} xs={12} sm={12} sx={loginModalStyles.carouselImgGrid}>
                                                        <img src={item.image} width={100} height={100} />
                                                    </Grid>
                                                    <Grid lg={12} md={12} xs={12} sm={12} sx={loginModalStyles.carouselTextGrid}>
                                                        <Typography sx={loginModalStyles.carouselText}>{item.description}</Typography>
                                                    </Grid>
                                                </Grid>
                                            ))
                                        }
                                    </Carousel>
                                </Grid>
                                {/* Buttons */}
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.buttonGrid}>
                                    <Button
                                        onClick={handleRegister}
                                        variant="outlined"
                                        sx={loginModalStyles.buttons}
                                        color="error"
                                    >
                                        Kayıt yaparak devam et
                                    </Button>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.buttonGrid}>
                                    <Button
                                        onClick={handleLogin}
                                        variant="outlined"
                                        sx={loginModalStyles.buttons}
                                        color="error"
                                    >
                                        Giriş yaparak devam et
                                    </Button>
                                </Grid>
                            </Grid>
                            {/* Modal footer */}
                            <Grid container sx={loginModalStyles.footerModalGridContainer}>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.footerModalFirstGrid}>
                                    <Typography sx={loginModalStyles.footerModalFristText}>
                                        Aydınlatma metnimizi okuyunuz
                                    </Typography>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.footerModalSecondGrid}>
                                    <Typography sx={loginModalStyles.footerModalSecondText}>
                                        Devam ederek bu şartları kabul etmiş olursun: &nbsp;
                                    </Typography>
                                    <Typography sx={loginModalStyles.footerModalFristText}> 
                                        letgo Şartlar ve Koşulları 
                                    </Typography>
                                </Grid>
                            </Grid>
                    </>
                ) : showRegister  ?  (
                    <>
                    <form
                          method='POST'
                          onSubmit={registerFormik.handleSubmit}
                      >
                          <Grid container spacing={2}>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ textAlign: 'center', marginTop: '5%' }}>
                                        <img src={Logo} width={74} height={47} />
                                </Grid>
                                {pageName == 'email'  ? (
                                    <>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Typography sx={loginModalStyles.InputsText}>
                                                E-posta adresini gir
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.InputsGrid}>
                                            <TextField
                                                fullWidth
                                                size='small'
                                                id="email"
                                                name="email"
                                                placeholder='E-posta adresi'
                                                sx={loginModalStyles.emailInput}
                                                value={registerFormik.values.email}
                                                onChange={registerFormik.handleChange}
                                            />
                                            {Object.keys(error).length > 0 && error.error_type == 'duplicate_email' && (
                                                    <Typography sx={{ fontSize : '12px', fontWeight: 400, color: '#ff3f55' }}>{error.error_description}</Typography>
                                            )}
                                        </Grid>
                                    </>
                                ): pageName == 'confirm' ?  (
                                    <>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: '5px', marginBottom: '5px', textAlign: 'center', display :'block' }}>
                                            <Typography sx={{ fontSize :'14px', fontWeight: 700 }}>Kişisel Verilerin Korunması ve Elektronik Ticari İletileri</Typography>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: '5px', marginBottom: '5px' }}>
                                            <FormControlLabel 
                                                    name="dataPrivacyCheck"
                                                    onChange={registerFormik.handleChange}
                                                    required
                                                    control={
                                                        <Checkbox 
                                                            sx={{ 
                                                                '& .MuiSvgIcon-root': {
                                                                    fontSize: '28px'
                                                                },
                                                                color: '#ff3f55',
                                                                '&.Mui-checked': {
                                                                    color: '#ff3f55',
                                                                },
                                                            }} 
                                                        />
                                                    } 
                                                    label={
                                                        <Typography
                                                                sx={{ fontSize :'14px' }}
                                                            >
                                                            <Typography sx={{ color: '#ff3f55', fontSize: '14px',fontWeight: 700, display: 'contents' }}>Müşteri Aydınlatma Metni </Typography> 
                                                            'ni okudum,
                                                            <Typography sx={{ color: '#ff3f55', fontWeight: 700,fontSize: '14px', display: 'contents' }}> Müşteri Açık Rıza Metni </Typography>
                                                            ' ni okudum ve kabul ediyorum. 
                                                        </Typography>
                                                    } 
                                            />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: '5px', marginBottom: '5px' }}>
                                            <FormControlLabel 
                                                    name="marketingCheck"
                                                    onChange={registerFormik.handleChange}
                                                    required
                                                    control={
                                                        <Checkbox 
                                                            sx={{ 
                                                                '& .MuiSvgIcon-root': {
                                                                    fontSize: '28px'
                                                                },
                                                                color: '#ff3f55',
                                                                '&.Mui-checked': {
                                                                    color: '#ff3f55',
                                                                },
                                                            }} 
                                                        />
                                                    } 
                                                    label={
                                                        <Typography
                                                                sx={{ fontSize :'14px' }}
                                                            >
                                                            Elektronik Ticaret Kanunu kapsamında [kampanya, promosyon, reklam vb.] konuları dahil ticari elektronik iletilerin [e-posta, SMS, arama vb.] tarafıma iletilmesine onay veriyorum. 
                                                        </Typography>
                                                    } 
                                                />
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: '30%', marginBottom: '5px' }}>
                                            <Typography>*Zorunlu Alanlar</Typography>
                                        </Grid>
                                    </>
                                ): (
                                    <>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: '5px', marginBottom: '5px', textAlign: 'center', display :'block' }}>
                                            <Typography sx={{ fontSize :'20px', fontWeight: 700 }}>Bir dahaki sefere daha hızlı giriş yapmak için bir şifre oluştur</Typography>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ marginTop: '5px', marginBottom: '5px', textAlign: 'center', display :'block' }}>
                                            <Typography sx={{ fontSize :'14px', fontWeight: 400 }}> <Typography sx={{ fontWeight: 700, fontSize: '14px', display: 'contents' }}>{registerFormik.values.email}</Typography> için bir şifre oluşturuyorsun. Bu, bir dahaki sefere daha hızlı giriş yapmana yardımcı olacak.</Typography>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: 'grid' }}>
                                            <OutlinedInput
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
                                                placeholder='Şifre'
                                                name="password"
                                                value={registerFormik.values.password}
                                                onChange={registerFormik.handleChange}
                                                error={Boolean(registerFormik.values.password == '' && registerFormik.touched.password)}
                                            />
                                            {Object.keys(error).length > 0 && (error.error_type == 'register_validation'  || error.error_type == 'invalid_grant' ) && (
                                                    <Typography sx={{ fontSize : '12px', fontWeight: 400, color: '#ff3f55' }}>{error.error_description}</Typography>
                                            )}
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={{ display: 'grid', marginBottom: '40px' }}>
                                            <OutlinedInput
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
                                                placeholder='Şifre Onayla'
                                                name="passwordConfirm"
                                                value={registerFormik.values.passwordConfirm}
                                                onChange={registerFormik.handleChange}
                                                error={Boolean(registerFormik.values.passwordConfirm == '' && registerFormik.touched.passwordConfirm)}
                                            />
                                          
                                        </Grid>
                                    </>
                                )}
                              
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.forwardButtonGrid}>
                                    <Button
                                        variant="outlined"
                                        sx={loginModalStyles.forwardButton}
                                        color="error"
                                        type="submit"
                                    >
                                       {pageName == "password" ? 'Şifre oluştur' : 'Devam et'} 
                                    </Button>
                                </Grid>
                          </Grid>
                      </form>
                    </>
                ): (
                    <>
                    {/* Login modal elements */}
                        <form
                            method='POST'
                            onSubmit={formik.handleSubmit}
                        >
                            <Grid container spacing={2}>
                                <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.iconGrid}>
                                    <img src={Logo} width={74} height={47} />
                                </Grid>
                                {!showPassword ? (
                                    <>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Typography sx={loginModalStyles.InputsText}>
                                                E-posta adresini gir
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.InputsGrid}>
                                            <TextField
                                                fullWidth
                                                size='small'
                                                id="email"
                                                name="email"
                                                placeholder='E-posta adresi'
                                                sx={loginModalStyles.emailInput}
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item lg={12} md={12} sm={12} xs={12}>
                                            <Typography sx={loginModalStyles.InputsText}>
                                                Şifreni gir
                                            </Typography>
                                            <Box sx={loginModalStyles.passwordWelcomeGrid}>
                                                <Typography sx={loginModalStyles.passwordWelcomeText}>
                                                    Tekrar hoş geldin&nbsp;
                                                </Typography>
                                                <Typography sx={loginModalStyles.passwordWelcomeInfo}> {formik.values.email} </Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.InputsGrid}>
                                            <TextField
                                                fullWidth
                                                size='small'
                                                id="password"
                                                name="password"
                                                type='password'
                                                placeholder='Şifreni Gir'
                                                sx={loginModalStyles.Input}
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                error={Boolean(formik.values.password == '' && formik.touched.password)}
                                            />
                                            {Object.keys(error).length > 0 &&  (
                                                <Typography>{error.error_description!}</Typography>
                                            )}
                                        </Grid>
                                    </>
                                )}

                                <Grid item lg={12} md={12} sm={12} xs={12} sx={loginModalStyles.forwardButtonGrid}>
                                    <Button
                                        variant="outlined"
                                        sx={loginModalStyles.forwardButton}
                                        color="error"
                                        type="submit"
                                    >
                                        Devam et
                                    </Button>
                                    <Typography sx={{ fontSize: '12px', color: '#004BBE', textAlign: 'center' }}>
                                        Aydınlatma metnimizi okuyunuz
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </>
                )}

             
                </DialogContent>
           
            </Dialog>
    
        </>
    )
}

export default LoginModal