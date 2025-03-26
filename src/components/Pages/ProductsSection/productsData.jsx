import { imageUrls } from '../../../imageUrls'; // Assurez-vous d'importer les URLs d'images correctement

export const products = [
  { id: 1, nom: 'Gâteau au chocolat', description: 'Un délicieux gâteau au chocolat', image: imageUrls.cakes[0], category: 'cake', prix: 15 },
  { id: 2, nom: 'Tarte aux fruits', description: 'Une tarte aux fruits frais', image: imageUrls.cakes[1], category: 'cake', prix: 15 },
  { id: 3, nom: 'Café latte', description: 'Un café latte crémeux', image: imageUrls.drinks[0], category: 'gift', prix: 50 },
  { id: 4, nom: 'Thé glacé', description: 'Un thé glacé rafraîchissant', image: imageUrls.drinks[1], category: 'gift', prix: 50 },
];
