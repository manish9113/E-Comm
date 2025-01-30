// import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header.jsx';
import Home from '../src/components/home/Home.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Detailview from './components/detailview/Detailview.jsx';
import Signin from './components/header/Signin.jsx';
import CreateAccount from './components/header/CreateAccount.jsx';
import DataProvider from './context/dataContext.js';
import Cart from './components/header/Cart.jsx';



function App() {
  return (
    <div >
      <BrowserRouter>
       <DataProvider>
         <Header/>
      <Routes>
        
        <Route path='/' element={<Home/>} />
        <Route path='/products/:id' element={<Detailview/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/createaccount' element={<CreateAccount/>} />
        <Route path='/cart' element={<Cart/>}/>
        
        
      </Routes>
      </DataProvider>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
