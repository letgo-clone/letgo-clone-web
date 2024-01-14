// Material UI elements
import {
    Typography,
    List,
    ListItem,
    ListItemButton
  }
    from '@mui/material'

// Styles
import { settingsLeftNavStyles } from '../../styles';

import { useNavigate, useLocation } from 'react-router-dom'

function SettingsLeftNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const leftNavbarItem = [
        {
            name : "Gizlilik",
            link: '/settings/privacy'
        }, 
        {
            name: "Bildirimler",
            link: '/settings/notifications'
        }, 
        {
            name: "İletişim Tercihleri",
            link: '/settings/tercih',
        }
    ]

    const handleRouteLeftButton = (link: string) => {
        navigate(link)
    }

  return (
    <>
        <List>
            {leftNavbarItem.map((item, key) => (
                <>
                    <ListItem disablePadding key={key}>
                        <ListItemButton sx={settingsLeftNavStyles.listItemButton} onClick={() => handleRouteLeftButton(item.link!)}>
                                <Typography
                                    sx={
                                        location.pathname == item.link ? (
                                            settingsLeftNavStyles.listItemActiveText
                                        ): (
                                            settingsLeftNavStyles.listItemText
                                        )
                                     }
                                >
                                    {item.name}
                                </Typography>
                        </ListItemButton>
                    </ListItem>
                </>
            ))}
        </List>
    </>
  )
}

export default SettingsLeftNav