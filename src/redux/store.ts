import { configureStore, createSlice, Middleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { MenuState, AuthUserState, CurrentCategoryState } from './interface';

  
// loginSlice oluşturulması ve reducer tanımlanması
const loginSlice = createSlice({
  name: 'authUser',
  initialState: {} as AuthUserState,
  reducers: {
    setLoginData: (state, action) => {
      state.loginData = { ...state.loginData, ...action.payload}
    },
  },
});


const menuSlice = createSlice({
  name: 'Menu',
  initialState: {menuData: []} as MenuState,
  reducers: {
    setMenuData: (state, action) => {
      state.menuData = action.payload;
    },
  },
});

const currentCategorySlice = createSlice({
  name: 'currentCategory',
  initialState: {currentCategory: []} as CurrentCategoryState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategoryData = action.payload;
    },
  },
});

export const { setLoginData } = loginSlice.actions;
export const { setMenuData } = menuSlice.actions;
export const { setCurrentCategory } = currentCategorySlice.actions;

// rootReducer oluşturulması ve tüm reducer'ların birleştirilmesi
const rootReducer = {
    authUser: loginSlice.reducer,
    Menu: menuSlice.reducer,
    currentCategory: currentCategorySlice.reducer,
};

// Özel bir middleware oluşturun
const saveToLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  localStorage.setItem('authUser', JSON.stringify(store.getState().authUser));
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    // Local Storage'dan veriyi yükleme
    authUser: JSON.parse(localStorage.getItem('authUser') || '{}')
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorageMiddleware),
});

export function removeAllData(){
    localStorage.clear();
}

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;