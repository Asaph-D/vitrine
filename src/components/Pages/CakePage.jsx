import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { imageUrls } from '../../imageUrls';

const CakesPage = () => {
    const products = [
        { id: 1, nom: 'Gâteau au chocolat', description: 'Un délicieux gâteau au chocolat', image: imageUrls.cakes[0] },
        { id: 2, nom: 'Tarte aux fruits', description: 'Une tarte aux fruits frais', image: imageUrls.cakes[1] },
        // Ajoutez d'autres produits ici si nécessaire
    ];

    return (
        <div className="container mx-auto py-16">
            <h1 className="text-4xl font-bold text-orange-800 text-center mt-10 mb-16 relative">
                Nos Gâteaux
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

export default CakesPage;
