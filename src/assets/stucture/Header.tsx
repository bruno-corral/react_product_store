import { useContext } from "react";
import { AuthContext, AuthContextType } from "../contexts/Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
    const auth = useContext<AuthContextType>(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signout();
        navigate('/');
    }

    return (
        <div className="bg-red-700 w-screen h-20 flex justify-center items-center mb-10">
            {!auth.user &&
                <div className="container mx-auto flex justify-between">
                    <Link to={'/user/list'}><button className="bg-black p-3 border border-white rounded-md font-bold hover:opacity-90 mx-4">User List</button></Link>
                    <Link to={'/'}><h1 className="text-white font-bold text-2xl p-3 flex-1">Trinkets Shop</h1></Link>
                    <Link to={'/login'}><button className="bg-black p-3 border border-white rounded-md font-bold hover:opacity-90 mx-4">Login</button></Link>
                </div> 
            }
            {auth.user && 
                <div className="container mx-auto flex justify-between">
                    <div className="flex justify-between">
                        <p className="font-bold text-xl p-3 text-white">Hello {auth.user.first_name} {auth.user.last_name}, welcome!</p>
                    </div>
                    <h1 className="text-white font-bold text-2xl p-3">Trinkets Shop</h1>
                    <button className="bg-black p-3 border border-white rounded-md font-bold hover:opacity-90 mx-4" onClick={handleLogout}>Logout</button>
                </div>
            }

        </div>
    );
}