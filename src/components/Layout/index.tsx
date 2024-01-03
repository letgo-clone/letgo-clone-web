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
interface LayoutProps {
    children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const [login, setLogin] = useState(false);
  const dispatch = useAppDispatch();
  const {menuData} = useAppSelector((state) => state?.Menu);

  useEffect(() => {
      if (localStorage.getItem('access_token')) {
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