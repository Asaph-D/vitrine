import { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const reviewsRef = collection(db, 'reviews');
        const querySnapshot = await getDocs(query(reviewsRef, orderBy('timestamp', 'desc')));
        const allReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        console.log('Fetched testimonials:', allReviews); // Ajouter un log ici

        setTestimonials(allReviews);
      } catch (err) {
        setError(err);
        console.error('Error fetching testimonials:', err); // Ajouter un log ici
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
};

export default useTestimonials;
