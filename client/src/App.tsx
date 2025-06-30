import React from 'react'
import {Routes, Route} from 'react-router-dom'
const LandingPage = React.lazy(() => import("./pages/LandingPage"))
const MainPage = React.lazy(() => import("./pages/MainPage"));
import ProtectedRoute from './components/ProtectedRoute'
import { Suspense } from 'react';
import Loader from './components/Loader';
import CreateEvent from './pages/CreateEvent';
import MainEventScreen from './pages/MainEventScreen';
import Dashboard from './pages/Dashboard';
import SelectScreen from './components/SelectScreen';
import FullScreenLoaderWrapper from './components/FullScreenLoaderWrapper';

function App() {

  return (
      <Routes>
        <Route path='/' element={
            <Suspense fallback={<FullScreenLoaderWrapper><Loader /></FullScreenLoaderWrapper>}>
              <LandingPage />
            </Suspense>
        }/>
        <Route element={<ProtectedRoute />}>
          <Route path='/main' element={
            <Suspense fallback={<FullScreenLoaderWrapper><Loader /></FullScreenLoaderWrapper>}>
              <MainPage />
            </Suspense>
          }>
            <Route path='' element={<MainEventScreen/>}/>
            <Route path='createEvent' element={<CreateEvent/>}/>
            <Route path='event/:eventId' element={<Dashboard/>}>
              <Route path=':selectedTab' element={<SelectScreen/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
  )
}

export default App
