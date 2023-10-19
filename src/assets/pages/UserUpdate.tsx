import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import { api } from '../utils/api';

export const UserUpdate = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [document, setDocument] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            setLoading(true);
            setError(false);

            const response = await api.oneUser(params.id);
            setName(response.user.first_name);
            setLastName(response.user.last_name);
            setEmail(response.user.email);
            setPassword(response.user.password);
            setPhone(response.user.phone_number);
            setBirthDate(response.user.birth_date);
            setDocument(response.user.document);

            setLoading(false);
        } catch (error) {
            setError(true);
            return;
        }
    }

    const handleUpdateUser = async () => {
        const first_name = name;
        const last_name = lastName;
        const phone_number = phone;
        const birth_date = birthDate;

        const response = await api.updateUser(
            params.id,
            first_name,
            last_name,
            email,
            password,
            phone_number,
            birth_date,
            document
        );

        if (response.error === false) {
            alert(response.message);
            navigate(-1);

            return;
        }

        alert(response.message);
        return;
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="container mx-auto max-w-2xl flex flex-col items-center justify-content border border-black rounded-md p-10 px-6 mb-4">
            <h1 className='font-bold text-2xl text-black'>Update User</h1>
            {loading && error === false && 
                <p className="font-bond text-2xl text-black text-center">Loading...</p>
            }
            {error === true &&  
                <h1 className="my-4 text-2xl font-bold text-black">There was an error, we are fixing it!</h1>
            }
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="text" 
                placeholder="Type your Name*" 
                value={name} 
                onChange={e => setName(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="text" 
                placeholder="Type your Last Name*" 
                value={lastName} 
                onChange={e => setLastName(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="email" 
                placeholder="Type your E-mail*" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="password"
                placeholder="Type your Password*" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="number"
                placeholder="Type your Number Phone" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none" 
                type="date"
                value={birthDate} 
                onChange={e => setBirthDate(e.target.value)} 
            />
            <input 
                className="px-3 py-2 w-full rounded-md m-4 outline-none"
                type="text"
                placeholder="Type your CPF" 
                value={document} 
                onChange={e => setDocument(e.target.value)} 
            />
            <div>
                <button className="bg-red-700 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white" onClick={handleUpdateUser}>Update</button>
                <Link to='/user/list'><button className="border border-black bg-black p-3 rounded-md font-bold hover:opacity-90 m-4">Go User List</button></Link>
            </div>
        </div>
    );
}