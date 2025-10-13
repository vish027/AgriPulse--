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

            // Fetch the token from localStorage
            const token = localStorage.getItem('sellerToken'); // Replace with actual key used in login
            if (!token) {
                toast.error('You are not logged in. Please log in first.');
                navigate && navigate('/seller/login');
                return;
            }

            const uploadedFiles = files.filter(file => file);
            const productPrice = Number(price) || 0;
            const productOfferPrice = offerPrice ? Number(offerPrice) : null;

            // ⚠️ VALIDATION 1: Image check
            if (uploadedFiles.length === 0) {
                toast.error('Please upload at least one product image.');
                return;
            }

            // ⚠️ VALIDATION 2: Offer price check
            if (productOfferPrice !== null && productOfferPrice >= productPrice) {
                toast.error('Offer Price must be less than Product Price.');
                return;
            }

            // 1. Clean description
            const features = description
                .split('\n')
                .filter(line => line.trim() !== '')
                .join('\n');

            // 2. Prepare FormData
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', features);
            formData.append('category', category);
            formData.append('price', productPrice);
            if (productOfferPrice !== null) formData.append('offerPrice', productOfferPrice);
            uploadedFiles.forEach(file => formData.append('images', file));

            // ✅ Debug logs
            console.group('🧾 Product Details Being Sent');
            console.log({
                name,
                description: features,
                category,
                price: productPrice,
                offerPrice: productOfferPrice,
                images: uploadedFiles.map(f => f.name),
            });
            console.groupCollapsed('📦 FormData Entries');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }
            console.groupEnd();
            console.groupEnd();

            // 3. POST request
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/product/add`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // ✅ token added
                    },
                    // withCredentials: true, // Only needed if backend uses cookies
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
            if (error.response && error.response.status === 401) {
                toast.error("Session expired or unauthorized. Please log in again.");
                navigate && navigate('/seller/login');
            } else {
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
