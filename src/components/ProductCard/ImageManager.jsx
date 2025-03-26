// import React, { useState, useEffect } from "react";
// import cloudinary from '../../api/cloudinaryConfig';

// const ImageManager = () => {
//   const [images, setImages] = useState([]);
//   const [newItem, setNewItem] = useState({ title: "", prix: "", description: "" });

//   // Fetch images from Cloudinary
//   const fetchImages = async () => {
//     try {
//       const response = await cloudinary.v2.api.resources({ type: 'upload', prefix: 'images/' });
//       setImages(response.resources || []);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   // Upload an image to Cloudinary
//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Create an upload preset in Cloudinary

//     try {
//       const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/upload`, {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await response.json();
//       setImages([...images, { ...data, title: newItem.title, prix: newItem.prix, description: newItem.description }]);
//       setNewItem({ title: "", prix: "", description: "" });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   // Handle image upload
//   const handleUpload = (event) => {
//     event.preventDefault();
//     const file = event.target.querySelector('input[type="file"]').files[0];
//     if (file) uploadImage(file);
//   };

//   // Delete an image from Cloudinary
//   const deleteImage = async (item) => {
//     try {
//       await cloudinary.v2.uploader.destroy(item.public_id);
//       setImages(images.filter((img) => img.public_id !== item.public_id));
//     } catch (error) {
//       console.error("Error deleting image:", error);
//     }
//   };

//   return (
//     <div className="image-manager">
//       <form onSubmit={handleUpload}>
//         <input type="file" accept="image/*" required />
//         <input
//           type="text"
//           placeholder="Title"
//           value={newItem.title}
//           onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Prix"
//           value={newItem.prix}
//           onChange={(e) => setNewItem({ ...newItem, prix: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={newItem.description}
//           onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
//         />
//         <button type="submit">Upload</button>
//       </form>

//       <div>
//         {images.map((item) => (
//           <div key={item.public_id} className="image-item">
//             {item.secure_url && <img src={item.secure_url} alt={item.title} />}
//             <h3>{item.title}</h3>
//             <p>Prix: {item.prix}</p>
//             <p>{item.description}</p>
//             <button onClick={() => deleteImage(item)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageManager;
