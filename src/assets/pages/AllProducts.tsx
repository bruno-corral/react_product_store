import { useState, useEffect } from "react";

import { api } from "../utils/api";
import { Product } from "../types/Product";

export const AllProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getProducts = async () => {
        try {
            setLoading(true);
            setError(false);

            const response = await api.allProducts();
            setProducts(response.products);

            setLoading(false);
        } catch (error) {
            setError(true);
            return;
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="py-2 container mx-auto">
            <div className="flex flex-1 justify-between">
                <h1 className="text-black text-2xl font-bold">Our Products</h1>
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
                    </div>
                </div>  
            )}
        </div>
    );
}