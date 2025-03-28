import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { fetchPreciseProducts } from './ProductsSection/productsData';

const GiftsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await fetchPreciseProducts('cadeau');
            setProducts(fetchedProducts);
        };

        loadProducts();
    }, []);

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-4xl font-bold text-orange-800 text-center mt-10 mb-16 relative">
                Cadeaux
                <span className="block w-20 h-1 bg-orange-500 absolute bottom-[-16px] left-1/2 transform -translate-x-1/2"></span>
            </h1>
            <div className="grid grid-cols-0 md:grid-cols-3 gap-12 mt-12 mb-12">
                {products.map((product) => (
                    <ProductCard product={product}/>
                ))}
            </div>
        </div>
    );
};

export default GiftsPage;
