import { useState, useEffect } from "react";

import { User } from "../types/User";
import { Link } from "react-router-dom";
import { api } from "../utils/api";

export const UserList = () => {
    const [user, setUser] = useState<User[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getAllUsers = async () => {
        try {
            setLoading(true);
            setError(false);

            const response = await api.allUsers();
            setUser(response.users);

            setLoading(false);
        } catch (error) {
            setError(true);
            return;
        }
    }

    const handleDeleteUser = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete?')) return false;

        const response = await api.deleteUser(id);

        if (response.error === true) {
            setError(true);
            alert(response.message);
            return;
        }

        setUser(user.filter(user => user.id !== id));
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="py-2 container mx-auto">
            <div className="flex flex-1 justify-between">
                <h1 className='font-bold text-2xl text-black'>User List</h1>
                <Link to='/'><button className="border border-black bg-black text-white p-3 m-3 rounded-md font-bold hover:opacity-60">Go Home</button></Link>
            </div>

            {loading && error === false &&
                <p className="font-bond text-2xl text-black text-center">Loading...</p>
            }

            {error === true &&  
                <h1 className="my-4 text-2xl font-bold text-black">There was an error, we are fixing it!</h1>
            }

            {user.length <= 0 && error === false && 
                <p className="text-2xl text-black text-center font-bold">There are no registered users!</p>
            }

            {user.map(item => 
                <div key={item.id} className="inline-block">
                    <div className="border border-black py-4 rounded-md px-3 m-4">
                        <h1 className="text-black font-bold text-2xl p-3">{item.first_name} {item.last_name}</h1>
                        <p className="text-black font-bold text-xl p-3">{item.email}</p>
                        <div>
                            <Link to={`/user/update/${item.id}`}><button className="bg-blue-500 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white">Update</button></Link>
                            <button className="bg-red-500 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white" onClick={() => handleDeleteUser(item.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 