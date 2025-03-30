import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { fetchPreciseProducts } from './ProductsSection/productsData';

const CakesPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const fetchedProducts = await fetchPreciseProducts('gateau');
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Erreur lors du chargement des produits:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return (
        <div className="container mx-auto py-16">
            <h1 className="text-4xl font-bold text-orange-800 text-center mt-10 mb-16 relative">
                Nos Gâteaux
                <span className="block w-20 h-1 bg-orange-500 absolute bottom-[-16px] left-1/2 transform -translate-x-1/2"></span>
            </h1>
            <div className="grid grid-cols-0 md:grid-cols-3 gap-12 mt-12 mb-12">
                {loading ? (
                    // Afficher les squelettes pendant le chargement
                    Array(6).fill().map((_, index) => (
                        <ProductSkeleton key={`skeleton-${index}`} />
                    ))
                ) : products.length > 0 ? (
                    // Afficher les produits si disponibles
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="opacity-0 animate-fadeIn"
                            style={{
                                animationDelay: `${(Math.random() * 0.5)}s`,
                                animationDuration: '0.06s',
                                animationFillMode: 'forwards'
                            }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))
                ) : (
                    // Afficher les squelettes si aucun produit
                    Array(6).fill().map((_, index) => (
                        <ProductSkeleton key={`skeleton-${index}`} />
                    ))
                )}
            </div>
            <style jsx global>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation-name: fadeIn;
                }
            `}</style>
        </div>
    );
};

export default CakesPage;
