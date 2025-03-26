import React from 'react';

const SearchFilterSort = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection
}) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher des produits..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="ALL">Toutes catégories</option>
          <option value="cake">Pâtisseries</option>
          <option value="juice">Boissons</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="nom">Nom</option>
          <option value="prix">Prix</option>
        </select>
        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilterSort;
