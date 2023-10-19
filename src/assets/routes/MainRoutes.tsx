import { useRoutes } from 'react-router-dom';

import { RequireAuth } from '../contexts/Auth/RequireAuth';

import { LoginUser } from '../pages/LoginUser';
import { SignUpUser } from '../pages/SignUpUser';
import { Home } from '../pages/Home';
import { CreateProduct } from '../pages/CreateProduct';
import { UpdateProduct } from '../pages/UpdateProduct';
import { NotFound } from '../pages/NotFound';
import { UserList } from '../pages/UserList';
import { UserUpdate } from '../pages/UserUpdate';
import { AllProducts } from '../pages/AllProducts';

export const MainRoutes = () => {
    return useRoutes([
        {path: '*', element: <NotFound />},
        {path: '/', element: <AllProducts />},
        {path: '/login', element: <LoginUser />},
        {path: '/signup', element: <SignUpUser />},
        {path: '/user/list', element: <UserList /> },
        {path: '/user/update/:id', element: <UserUpdate /> },
        {path: '/home', element: <RequireAuth><Home /></RequireAuth> },
        {path: '/product/create', element: <RequireAuth><CreateProduct /></RequireAuth> },
        {path: '/product/update/:id', element: <RequireAuth><UpdateProduct /></RequireAuth> },
    ]);
}