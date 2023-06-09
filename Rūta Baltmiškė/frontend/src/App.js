import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRoute from './pages/Dashboard/UserRoute';
import AdminRoute from './pages/Dashboard/AdminRoute';
import SingleJob from './pages/SingleJob';
import LoginAndRegister from './pages/LoginAndRegister';
import { createTheme } from '@mui/material/styles';
import { themeColors } from './theme'
import Dashboard from './pages/Dashboard/Dashboard';




const App = () => {
   
    const theme = createTheme(themeColors());

    return (
        <>
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/search/location/:location' element={<Home />} />
                            <Route path='/search/:keyword' element={<Home />} />
                            <Route path='/login' element={<LoginAndRegister />} />
                            <Route path='/register' element={<LoginAndRegister />} />
                            <Route path='/job/:id' element={<SingleJob />} />
                            <Route path='/admin/dashboard' element={<AdminRoute><Dashboard tipas="admin"></Dashboard></AdminRoute>} />
                            <Route path='/user/dashboard' element={<UserRoute><Dashboard tipas="user"></Dashboard></UserRoute>} />
                            <Route path='*' element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
           </ThemeProvider>
        </>
    )
}

export default App
