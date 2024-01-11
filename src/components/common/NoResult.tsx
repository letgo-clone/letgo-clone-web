import React from 'react'

// Material UI elements
import { 
  Box, 
  Container,
  Typography, 
  Button
  } from '@mui/material';

// styles
import { noResultStyles } from '../../styles';

// interface
import { NoResultProps } from './commonTypes'

import ResultImage from '../../assets/img/noResults.png'
import NoFavoriteImage from '../../assets/img/no-favorites.png'

const NoResult: React.FC<NoResultProps> = ({ page }) => {
  return (
    <Container>
        {page == 'search' && (
        <Box sx={noResultStyles.searchBox}>
            <Typography sx={noResultStyles.searchTitle}>İlan bulunamadı</Typography>
            <Typography sx={noResultStyles.searchSubTitle}>Lütfen yazımını kontrol et veya daha genel bir arama yapmayı dene.</Typography>
        </Box>
        )}
        <Box sx={noResultStyles.imageBox}>
            <img src={page == 'search' ? ResultImage : NoFavoriteImage} style={{ maxWidth: '198px', width: '100%' }} />
        </Box>
        {(page !== 'search') && (
        <Box sx={noResultStyles.otherBox}>
            <Typography sx={noResultStyles.otherTitle}> {page == 'myAds' ? 'Henüz bir ilanın yok' : 'Henüz hiçbir ilanı beğenmedin'}
            </Typography>
             <Typography sx={noResultStyles.otherSubTitle}>
              {page == 'myAds' ? 'Artık kullanmadığın eşyaları elinden çıkar' : 'İlan beğen ve dünyayla paylaş'}
                </Typography>
                {page == 'myAds' ? (
                   <Button
                      href="/editProfile/info"
                      variant="outlined"
                      sx={noResultStyles.otherSellButton}
                      color="error"
                      type="submit"
                    >
                      Satmaya başla
                  </Button>
                ): (
                  <Button
                      href="/editProfile/info"
                      variant="outlined"
                      sx={noResultStyles.otherDiscoverButton}
                      color="error"
                      type="submit"
                    >
                      Keşfet
                  </Button>
                )}
             
        </Box>
        )}
    </Container>
  )
}

export default NoResult