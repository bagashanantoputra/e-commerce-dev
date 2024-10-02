import { Route, Routes } from 'react-router-dom';
import './App.css';

// User Page
import HomePage from './customer/pages/HomePage/HomePage';
import ProductPage from './customer/pages/ProductPage/ProductPage';
import SignInPage from './customer/pages/SignInPage/SignInPage';
import CreateAccountPage from './customer/pages/CreateAccountPage/CreateAccountPage';
import CheckoutPage from './customer/pages/CheckoutPage/CheckoutPage';
import ProfilePage from './customer/pages/ProfilePage/ProfilePage';
import PrivateRoute from './customer/components/PrivateRoutes/PrivateRoute';

// Admin Page
import DashboardPage from './admin/pages/DashboardPage/DashboardPage';

import { UserContextProvider } from './context/userContext';
import UserPage from './admin/pages/UserPage/UserPage';
import ProductAdminPage from './admin/pages/ProductPage/ProductPage';
import OrderPage from './admin/pages/OrderPage/OrderPage';


function App() {
  return (
    <UserContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="create-account" element={<CreateAccountPage />} />
          <Route
            path="checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route 
            path="dashboard" 
            element={
              <PrivateRoute>
                <DashboardPage/>
              </PrivateRoute>
            } 
          />
          <Route 
            path="users" 
            element={
              <PrivateRoute>
                <UserPage/>
              </PrivateRoute>
            } 
          />
          <Route path="product-admin" element={<ProductAdminPage/>} />
          <Route path="orders" element={<OrderPage/>} />
        </Routes>
      </div>
    </UserContextProvider>
  );
}

export default App;