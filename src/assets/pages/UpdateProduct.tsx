import { useState, useEffect } from "react";

import { Link, useParams, useNavigate  } from 'react-router-dom';
import { api } from "../utils/api";

export const UpdateProduct = () => {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const params = useParams();

    const navigate = useNavigate();

    const getProduct = async () => {
        try {
            setLoading(true);
            setError(false);

            const response = await api.oneProduct(params.id);
            setDescription(response.product.description);
            setQuantity(response.product.quantity);
            setPrice(response.product.price);

            setLoading(false);
        } catch (error) {
            setError(true);
            return;
        }
    }

    const handleUpdateProduct = async () => {
        setLoading(true);
        setError(false);

        const response = await api.updateProduct(
            params.id,
            description,
            quantity,
            price
        );

        setLoading(false);

        if (response.error === true) {
            setError(true);
            alert(response.message);
            return;
        }

        alert(response.data.message);
        navigate(-1);
    }

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div className="container mx-auto max-w-2xl flex flex-col items-center justify-content border border-black rounded-md p-10 px-6 mb-4">
            <h1 className='font-bold text-2xl text-black'>Update Product</h1>
            {loading && error === false && 
                <p className="font-bond text-2xl text-black text-center">Loading...</p>
            }
            {error === true &&  
                <h1 className="my-4 text-2xl font-bold text-black">There was an error, we are fixing it!</h1>
            }
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="text" 
                placeholder="Description" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="number" 
                placeholder="Quantity" 
                value={quantity} 
                onChange={e => setQuantity(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="number" 
                placeholder="Price" 
                value={price} 
                onChange={e => setPrice(e.target.value)} 
            />
            <div>
                <button className="bg-red-700 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white" onClick={handleUpdateProduct}>Update</button>
                <Link to='/home'><button className="border border-black bg-black p-3 rounded-md font-bold hover:opacity-90 m-4">Go Home</button></Link>
            </div>
        </div>
    );
}