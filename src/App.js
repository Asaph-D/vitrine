import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import './index.css';
import './styles.css';
import Layout from './components/Layout/Layout';
import HomePage from './components/Pages/HomePage';
import CakesPage from './components/Pages/CakePage';
import BeveragesPage from './components/Pages/BeveragesPage';
import GiftsPage from './components/Pages/GiftsPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import ProductList from './components/Pages/ProductList';
import ContactForm from './components/Pages/ContactForm';
import { ProductViewerProvider } from './components/ProductCard/ProductViewerProvider';
import { CartProvider } from './components/Pages/ProductsSection/CartContext';

const router = createBrowserRouter([
    {
        element: (
            <Layout>
                <CartProvider>
                    <ProductViewerProvider>
                        <Outlet />
                    </ProductViewerProvider>
                </CartProvider>
            </Layout>
        ),
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/cakes", element: <CakesPage /> },
            { path: "/beverages", element: <BeveragesPage /> },
            { path: "/gifts", element: <GiftsPage /> },
            { path: "/products", element: <ProductList /> },
            { path: "/contact", element: <ContactForm /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
