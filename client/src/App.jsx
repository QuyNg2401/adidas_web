import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminRoute } from './components/routing/AdminRoute'
import { AccountPage } from './pages/account/AccountPage'
import { AdminPage } from './pages/admin/AdminPage'
import { CartPage } from './pages/cart/CartPage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrderSuccessPage } from './pages/order-success/OrderSuccessPage'
import { HomePage } from './pages/home/HomePage'
import { LoginPage } from './pages/login/LoginPage'
import { RegisterPage } from './pages/register/RegisterPage'
import { ProductDetailPage } from './pages/product/ProductDetailPage'
import { ProductsPage } from './pages/products/ProductsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
