import React from 'react';

import { Routes, Route } from "react-router-dom";

import Layout from './components/Layout';

// Import Routes all
import { publicRoutes } from "./routes";

function App() {

  return (
    <React.Fragment>
      <Routes>
      {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<Layout>{route.component}</Layout>}
            key={idx}
            exact={true}
          />
        ))}
       
      </Routes>
    </React.Fragment>
  )
}

export default App
