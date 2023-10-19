import { useState, useEffect, useContext } from "react";
import { Link  } from 'react-router-dom';

import { api } from "../utils/api";
import { Product } from "../types/Product";
import { AuthContext, AuthContextType } from "../contexts/Auth/AuthContext";

export const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const auth = useContext<AuthContextType>(AuthContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getProductsByUser = async () => {
        try {
            setLoading(true);
            setError(false);

            const response = await api.oneUser(auth.user?.id);
            setProducts(response.product);

            console.log(response.product)

            setLoading(false);
        } catch (error) {
            setError(true);
            return;
        }
    }

    const handleDeleteProduct = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete?')) return false;

        const response = await api.deleteProduct(id);

        if (response.error === true) {
            setError(true);
            alert(response.message);
            return;
        }

        setProducts(products.filter(product => product.id !== id));
    }

    useEffect(() => {
        getProductsByUser();
    }, []);

    return (
        <div className="py-2 container mx-auto">
            <div className="flex flex-1 justify-between">
                <h1 className="text-black text-2xl font-bold">List Products</h1>
                <Link to='/product/create'><button className="bg-black p-3 border border-white rounded-md font-bold hover:opacity-90">Register Product</button></Link>
            </div>

            {loading && error === false &&
                <p className="font-bond text-2xl text-black text-center">Loading...</p>
            }

            {error === true &&  
                <h1 className="my-4 text-2xl font-bold text-black">There was an error, we are fixing it!</h1>
            }

            {products.length <= 0 && error === false && 
                <p className="text-2xl text-black text-center font-bold">There are no registered products!</p>
            }

            {products.map(item =>
                <div key={item.id} className="inline-block">
                    <div className="border border-black py-4 rounded-md px-3 m-4">
                        <h1 className="text-black font-bold text-3xl p-3">{item.description}</h1>
                        <div className="flex flex-1">
                            <h2 className="text-black text-2xl p-3">R${item.price}</h2>
                            <p className="text-black text-2xl p-3">Quantity: {item.quantity}</p>
                        </div>
                        <div>
                            <Link to={`/product/update/${item.id}`}><button className="bg-blue-500 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white">Update</button></Link>
                            <button className="bg-red-500 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white" onClick={() => handleDeleteProduct(item.id)}>Delete</button>
                        </div>
                    </div>
                </div>  
            )}
        </div>
    );
}