const backendUrl = "https://prodancakes-backend-production.up.railway.app";

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${backendUrl}/products`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des produits');
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
};

export const fetchPreciseProducts = async (categorie) => {
  try {
    const response = await fetch(`${backendUrl}/products`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des produits');
    }
    const products = await response.json();
    return products.filter(product => product.categorie === categorie);
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
};
