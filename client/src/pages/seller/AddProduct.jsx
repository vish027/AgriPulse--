import React, { useState } from 'react';
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');

    const { axios, navigate } = useAppContext() || {};

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const uploadedFiles = files.filter(file => file);
            const productPrice = Number(price) || 0;
            const productOfferPrice = offerPrice ? Number(offerPrice) : null;

            // ⚠️ VALIDATION 1: Image check
            if (uploadedFiles.length === 0) {
                toast.error('Please upload at least one product image.');
                return;
            }

            // ⚠️ VALIDATION 2: Price check (Offer Price must be less than Product Price)
            if (productOfferPrice !== null && productOfferPrice >= productPrice) {
                toast.error('Offer Price must be less than Product Price.');
                return;
            }
            
            // 1. Prepare description as a clean string
            const features = description
                .split('\n')
                .filter(line => line.trim() !== '')
                .join('\n');


            // 2. Prepare FormData to send ALL data (mixed text fields and files)
            const formData = new FormData();

            // Append text fields directly
            formData.append('name', name);
            formData.append('description', features);
            formData.append('category', category);
            formData.append('price', productPrice);
            
            // Only append offerPrice if it's provided
            if (productOfferPrice !== null) {
                formData.append('offerPrice', productOfferPrice);
            }
            
            // 3. Append image files
            uploadedFiles.forEach(file => formData.append('images', file));

            // POST request
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/product/add`,
                formData,
                {
                    // 'Content-Type': 'multipart/form-data' is often auto-set with FormData, 
                    // but it's fine to include.
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true, // MUST be true for cookie authentication
                }
            );

            if (data.success) {
                toast.success(data.message);

                // Reset form
                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setOfferPrice('');
                setFiles([]);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error("Error adding product:", error);

            // Handle Unauthorized error (401)
            if (error.response && error.response.status === 401) {
                toast.error("Session expired or unauthorized. Please log in again.");
                navigate && navigate('/seller/login');
            } else {
                // Handle other errors
                toast.error(error.response?.data?.message || 'Failed to add product.');
            }
        }
    };

    return (
        <div className="no-scrollbar flex-1 h-full overflow-y-scroll flex flex-col">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
                
                {/* Product Images */}
                <div>
                    <p className="text-base font-medium">Product Image (Min 1)</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input
                                    type="file"
                                    id={`image${index}`}
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        const updatedFiles = [...files];
                                        updatedFiles[index] = file;
                                        setFiles(updatedFiles);
                                    }}
                                />
                                <img
                                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                                    alt="uploadArea"
                                    className="max-w-24 cursor-pointer object-cover aspect-square border border-gray-300 rounded"
                                    width={100}
                                    height={100}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Product Name */}
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input
                        type="text"
                        id="product-name"
                        placeholder="Type here"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        required
                    />
                </div>

                {/* Product Description */}
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea
                        id="product-description"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                        placeholder="Enter key features, separated by a new line..."
                        required
                    />
                </div>

                {/* Category */}
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.path}>{item.path}</option>
                        ))}
                    </select>
                </div>

                {/* Price and Offer Price */}
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input
                            type="number"
                            id="product-price"
                            placeholder="0"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            required
                            min="0"
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price (Optional)</label>
                        <input
                            type="number"
                            id="offer-price"
                            placeholder="0"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            min="0"
                        />
                    </div>
                </div>

                <button type="submit" className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">
                    ADD
                </button>

            </form>
        </div>
    );
};

export default AddProduct;