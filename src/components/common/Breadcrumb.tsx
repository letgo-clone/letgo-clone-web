import React from 'react'

// Material UI elements
import { Breadcrumbs } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// React Router
import { Link } from 'react-router-dom';

// styles
import { breadcrumbStyles } from '../../styles';

// interfaces
import { BreadcrumbProps } from './commonTypes';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbItems }) => {
  const lastBreadCrumb = breadcrumbItems?.slice(-1)[0];
  
  return (
    <>
      <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small"/> }
          aria-label="breadcrumb"
          sx={breadcrumbStyles.breadcrumbs}
      >
          <Link to="/" style={breadcrumbStyles.links}>
              Ana sayfa
          </Link>
            {breadcrumbItems?.length !== 0 && breadcrumbItems?.map((item,key) => (
                <Link
                    key={key}
                    style={{
                      ...breadcrumbStyles.links,
                      color: lastBreadCrumb?.title == item.title ? "black" : "inherit"
                    }}
                    to={item.link!}
                  >
                    {item.title}
                </Link>
            ))}
      </Breadcrumbs>
    </>
  )
}

export default Breadcrumb