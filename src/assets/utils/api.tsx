import axios from 'axios';

export const request = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});

export const api = {
    allUsers: async () => {
        const response = await request.get('user/all');
        return response.data;
    },
    oneUser: async (id: string | number | undefined) => {
        const response = await request.get(`user/${id}`);
        return response.data;
    },
    signUp: async(first_name: string, last_name: string, email: string, password: string, phone_number: string | null, birth_date: string | null, document: string | null) => {
        const response = await request.post('user/signup', {
            first_name,
            last_name,
            email,
            password,
            phone_number,
            birth_date,
            document
        });

        return response.data;
    },
    signIn: async(email: string, password: string) => {
        const response = await request.post('user/signin', {email, password});
        return response.data;
    },
    logout: async () => {
        return { status: true };
    },
    validateToken: async (token: string) => {
        return {
            user: { 
                id: 2, 
                first_name: 'Bruno', 
                last_name: 'Corral', 
                email: 'bruno@gmail.com',
                password: 'bruno123',
                phone_number: '997198081',
                birth_date: '1990-01-01',
                document: '111.222.333-45'
            }
        }
    },
    updateUser: async(id: string | undefined, first_name: string, last_name: string, email: string, password: string, phone_number: string | null, birth_date: string | null, document: string | null) => {
        const response = await request.put(`user/${id}`, {
            first_name,
            last_name,
            email,
            password,
            phone_number,
            birth_date,
            document
        });

        return response.data;
    },
    deleteUser: async(id: number) => {
        const response = await request.delete(`user/${id}`);
        return response.data;
    },
    allProducts: async() => {
        const response = await request.get('product/all');
        return response.data;
    },
    oneProduct: async(id: string | undefined) => {
        const response = await request.get(`product/${id}`);
        return response.data;
    },
    createProduct: async(description: string, quantity: string, price: string, user_id: number | undefined) => {
        const response = await request.post('product/create', {description, quantity, price, user_id});
        return response.data;
    },
    updateProduct: async(id: string | undefined, description: string, quantity: string, price: string) => {
        const response = await request.put(`product/${id}`, {description, quantity, price});
        return response.data;
    },
    deleteProduct: async(id: number) => {
        const response = await request.delete(`product/${id}`);
        return response.data;
    },
};