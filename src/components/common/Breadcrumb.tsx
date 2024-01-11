import React from 'react'

// Material UI elements
import { Breadcrumbs, Link } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// styles
import { breadcrumbStyles } from '../../styles';

// interfaces
import { BreadcrumbProps } from './commonTypes';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbItems }) => {
  const lastBreadCrumb = breadcrumbItems?.slice(-1)[0]
  
  return (
    <>
      <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small"/> }
          aria-label="breadcrumb"
          sx={breadcrumbStyles.breadcrumbs}
      >
          <Link underline="hover" color="inherit" href="/">
              Ana sayfa
          </Link>
            {breadcrumbItems?.length !== 0 && breadcrumbItems?.map((item,key) => (
                <Link
                    key={key}
                    underline="hover"
                    color={lastBreadCrumb?.title == item.title ? "text.primary" : "inherit"}
                    href={item.link}
                  >
                    {item.title}
                </Link>
            ))}
      </Breadcrumbs>
    </>
  )
}

export default Breadcrumb