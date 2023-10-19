import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../utils/api';

export const SignUpUser = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [document, setDocument] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (name === '' || lastName === '' || email === '' || password === '') {
            alert('The name and/or last name and/or email and/or password cannot be blank!');
            return;
        }

        const first_name = name;
        const last_name = lastName;
        const phone_number = phone;
        const birth_date = birthDate;

        const response = await api.signUp(
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

    return (
        <div className="container mx-auto max-w-2xl flex flex-col items-center justify-content border border-black rounded-md p-10 px-6 mb-4">
            <h1 className='font-bold text-2xl text-black'>Register User</h1>
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
                <button className="bg-red-700 p-3 rounded-md font-bold hover:opacity-90 m-4 text-white" onClick={handleSignUp}>Register</button>
                <Link to='/login'><button className="border border-black bg-black p-3 rounded-md font-bold hover:opacity-90 m-4">Go Login</button></Link>
            </div>
        </div>
    );
}