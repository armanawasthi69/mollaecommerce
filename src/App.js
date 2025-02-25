import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './comopnents/footer';
import Header from './comopnents/header';
import HomePage from './pages/homePage';
import ShopPage from './pages/shopPage';
import ProductDetail from './pages/productDetailPage';
import AboutPage from './pages/aboutPage';
import ContactPage from './pages/contactPage';
import CartPage from './pages/cartPage';
import CheckOutPage from './pages/checkOutPage';
import WishListPage from './pages/wishListPage';
import AccountPage from './pages/myAccountPage';
import NotFoundPage from './pages/404Page';
import LoginPage from './pages/loginPage';
import { useEffect } from 'react';
import { BackToTop } from './utils/helper';
import CategoryPage from './pages/categorywisePage';
import { ToastContainer } from 'react-toastify';
import Private from './routes/private';

function App() {
  let { pathname } = useLocation()

  useEffect(() => {
    BackToTop()
  }, [pathname])

  return (
    <>
      <div className="page-wrapper">
        <Header />

        <Routes>

          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/:slug' element={<CategoryPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/cart' element={<CartPage />} />

          {/* private Route */}
          <Route path='/checkout' element={<Private />} >
            <Route index element={<CheckOutPage />} />
          </Route>
          {/*  end */}

          <Route path='/wishlist' element={<WishListPage />} />

          {/* private Route */}
          <Route path='/my-account' element={<Private />}>
            <Route index element={<AccountPage />} />
          </Route>
          {/* end */}

          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>

        <Footer />
        <ToastContainer theme='colored' />
      </div>
    </>
  );
}

export default App;
