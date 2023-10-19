import { useState, useContext } from "react";
import { Link, useNavigate  } from 'react-router-dom';
import { api } from "../utils/api";
import { AuthContext, AuthContextType } from "../contexts/Auth/AuthContext";

export const CreateProduct = () => {
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const auth = useContext<AuthContextType>(AuthContext);
    const navigate = useNavigate();

    const handleRegisterProduct = async () => {
        if (description === '' || quantity === '' || price === '') {
            alert('The description and/or quantity and/or price cannot be blank!');
            return;
        }

        const user_id = auth.user?.id;

        const response = await api.createProduct(
            description[0].toUpperCase() + description.substring(1).toLocaleLowerCase(),
            quantity,
            price,
            user_id
        );

        if (response.error === false) {
            navigate(-1);
            return;
        }

        alert(response.message);
        return;
    }

    return (
        <div className="container mx-auto max-w-2xl flex flex-col items-center justify-content border border-black rounded-md p-10 px-6 mb-4">
            <h1 className='font-bold text-2xl text-black'>Register Product</h1>
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
                <button className="bg-red-700 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white" onClick={handleRegisterProduct}>Register</button>
                <Link to='/home'><button className="border border-black bg-black p-3 rounded-md font-bold hover:opacity-90 m-4">Go Home</button></Link>
            </div>
        </div>
    );
}