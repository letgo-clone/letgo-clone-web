import React, {
      useEffect, 
      useState,
      ReactNode
    } from 'react'

// Layout Components
import Navbar from './Navbar';
import SubNavbar from './SubNavbar';
import Footer from './Footer'

// Redux
import { 
  setMenuData, 
  useAppSelector, 
  useAppDispatch 
  } from '../../redux/store';

// helpers
import { RequestPublic } from '../../helpers/Request';

// interface
import { LayoutProps } from './layout';

const Layout = (props: LayoutProps) => {
  const [login, setLogin] = useState(false);
  const dispatch = useAppDispatch();
  const {menuData} = useAppSelector((state) => state?.Menu);
  const {loginData} = useAppSelector((state) => state?.authUser)

  useEffect(() => {
      if (loginData) {
          setLogin(true)
      }
  }, [])

  useEffect(() => {
        const getCategories = async() => {
            const categoryGetUrl = "/advert/categories";
            
            const categoryData = await RequestPublic({
                method: 'GET',
                url: categoryGetUrl
            });
           
            dispatch(setMenuData(categoryData))
        }
        
        if(menuData?.length == 0) {
            getCategories()
        }
   }, [])

  return (
    <React.Fragment>
        <Navbar isLogin={login!} />
        <SubNavbar categories={menuData!}/>
          <div> {props.children} </div>
        <Footer />
    </React.Fragment>
  )
}

export default Layout