import React, { useEffect, useState } from 'react'

// Material UI elements
import { 
    IconButton,
    } from '@mui/material';

// Material UI Icons
import { 
    FavoriteBorder,
    Favorite as FavoriteIcon
    } from '@mui/icons-material';

import { Request } from '../helpers/Request';

// Redux
import { useAppSelector } from '../redux/store';

// component
import LoginModal from './LoginModal';

// other
import Swal from 'sweetalert2';

// interface
import { FavoriteTypes } from './component';

const Favorite: React.FC<FavoriteTypes> = ({ id, hasFavorite }) => {
    const {loginData} = useAppSelector((state) => state?.authUser);

    // useState
    const [loginOpen, setLoginOpen] = useState<boolean>(false);
    const [advertFavorite, setAdvertFavorite] = useState<boolean>(false);

    useEffect(() => {
        setAdvertFavorite(hasFavorite!)
    },[hasFavorite])

    const addFavorite = async (advertId: string, currentFavorite: boolean) => {

        if(loginData){
            if(currentFavorite){
                const formdata: FormData = new FormData();
                formdata.append("op", 'remove');
                formdata.append("path", 'has_advert_favorite');
    
                const url = '/advert/favorite/' + advertId;
    
                const data = await Request({
                    method: 'PATCH',
                    url: url,
                    formData: formdata
                });
    
                const responseErrorCheck = Object.keys(data).filter(item => item == 'error')
                if(!responseErrorCheck){
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata',
                        text: 'Bi Hata oluştu',
                      })
                }
                setAdvertFavorite(false);
            }
            else
            {
                const formdata: FormData = new FormData();
                formdata.append("op", 'add');
                formdata.append("path", 'has_advert_favorite');
    
                const url = '/advert/favorite/' + advertId;
                
                const data = await Request({
                    method: 'PATCH',
                    url: url,
                    formData: formdata
                });
    
                const responseErrorCheck = Object.keys(data).filter(item => item == 'error')
    
                if(!responseErrorCheck){
                    Swal.fire({
                        icon: 'error',
                        title: 'Hata',
                        text: 'Bi Hata oluştu',
                      })
                }
                setAdvertFavorite(true);
            }
        }else{
            handleLoginOpen();
        }
    }

    const handleLoginOpen = () => {
        setLoginOpen(true);
    };

    const handleLoginClose = () => {
        setLoginOpen(false);
    };

  return (
    <>
        <IconButton 
            aria-label="add to favorites" 
            onClick={() => addFavorite(id!, advertFavorite)} sx={{ padding:0 }}
        >
                {advertFavorite == true ? (
                    <FavoriteIcon sx={{ color:'red' }} />
                ): (
                    <FavoriteBorder sx={{ color:'red' }} />
                )}
        </IconButton>
        {loginOpen && <LoginModal isLogin={loginOpen} handleClose={handleLoginClose} />}
    </>
  )
}

export default Favorite