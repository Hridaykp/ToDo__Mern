import { Routes,  Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import Auth from './pages/Auth';

function App() {
    return (
        <>
            <Toaster 
                position='top-right'
                toastOptions={{
                    style:{
                        fontSize:'1.7rem'
                    }
                }}
            ></Toaster>
            <Routes>
                <Route exact path='/' element={< Home />} />
                <Route exact path='/edit-profile' element={< EditProfile />} />
                <Route exact path='/auth' element={< Auth />} />

            </Routes>
        </>
    );
}

export default App;
