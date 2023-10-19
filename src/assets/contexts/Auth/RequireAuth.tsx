import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { AllProducts } from "../../pages/AllProducts";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const auth = useContext(AuthContext);

    if (!auth.user) {
        return <AllProducts />
    }

    return children;
}