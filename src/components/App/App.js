import React, { StrictMode } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fab, fas, far);

const App = () => (
  <div className="container">
    <StrictMode>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </StrictMode>
  </div>
);

export default App;
