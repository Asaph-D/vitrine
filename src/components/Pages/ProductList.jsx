import React, { useState, useEffect } from 'react';
import OrderSystem from './ProductsSection/OrderSystem';
import SearchFilterSort from './ProductsSection/SearchFilterSort';
import { fetchProducts } from './ProductsSection/productsData';

const EnhancedProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [sortField, setSortField] = useState('nom');
  const [sortDirection, setSortDirection] = useState('asc');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const result = products
      .filter(product => {
        const matchesSearch = product.nom.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'ALL' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;
        if (sortField === 'prix') {
          return direction * (a.prix - b.prix);
        }
        return direction * a[sortField].localeCompare(b[sortField]);
      });

    setFilteredProducts(result);
  }, [searchTerm, filterCategory, sortField, sortDirection, products]);

  return (
    <div className="p-4 md:p-8">
      <SearchFilterSort
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
      <OrderSystem products={filteredProducts} />
    </div>
  );
};

export default EnhancedProductList;
