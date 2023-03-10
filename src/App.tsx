import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import SuspenseFallback from './components/SuspenseFallback';

import './App.css';

import Sidebar from './components/Sidebar';

const LoginContainer = lazy(async () => await import('./containers/LoginContainer'));
const ProgramsContainer = lazy(async () => await import('./containers/ProgramsContainer'));
const ResidentsContainer = lazy(async () => await import('./containers/ResidentsContainer'));

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Sidebar />
        <Suspense fallback={<SuspenseFallback />}>
        <div className="main-view">
          <Routes>
            <Route path="/" element={<LoginContainer />} />
            <Route path="/residents" element={<ResidentsContainer />} />
            <Route path="/programs" element={<ProgramsContainer />} />
          </Routes>
        </div>
        </Suspense>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;
