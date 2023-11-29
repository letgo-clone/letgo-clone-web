import { AnyAction, configureStore, createSlice } from '@reduxjs/toolkit';

interface FormState {
    formData?: any;
  }
  
  interface AuthUserState {
    loginData?: any;
  }
  
  interface MenuState {
    menuData?: any;
  }
  
  interface OffcanvasState {
    OffcanvasData?: any;
  }
  

// formSlice oluşturulması ve reducer tanımlanması
const formSlice = createSlice({
  name: 'form',
  initialState: {} as FormState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

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

const canvasSlice = createSlice({
  name: 'Offcanvas',
  initialState: {} as OffcanvasState,
  reducers: {
    setOffcanvasData: (state, action) => {
      state.OffcanvasData = action.payload;
    },
  },
});

export const { updateFormData } = formSlice.actions;
export const { setLoginData } = loginSlice.actions;
export const { setOffcanvasData } = canvasSlice.actions;

// rootReducer oluşturulması ve tüm reducer'ların birleştirilmesi
const rootReducer = {
  form: formSlice.reducer,
  authUser: loginSlice.reducer,
  Offcanvas: canvasSlice.reducer,
};

// Özel bir middleware oluşturun
const saveToLocalStorageMiddleware = (store) => (next) => (action: AnyAction) => {
  const result = next(action);
  // Redux store verilerini Local Storage'a kaydetme
  localStorage.setItem('form', JSON.stringify(store.getState().form));
  localStorage.setItem('authUser', JSON.stringify(store.getState().authUser));
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    // Local Storage'dan veriyi yükleme
    form: JSON.parse(localStorage.getItem('form') || '{}'),
    authUser: JSON.parse(localStorage.getItem('authUser') || '{}')
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveToLocalStorageMiddleware),
});

export function removeAllData(){
    localStorage.clear();
}

export default store;
