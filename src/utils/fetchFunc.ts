import axios from "axios";

export const fetchUser = async (id: string) => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`;
  
    const { data } = await axios.get(url);
    return data;
};

export const fetchProducts = async () => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
    const { data } = await axios.get(url);
    return data;
};

export const fetchProduct = async (id: string) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
    return data;
};

export const fetchOrders = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/orders`);
    return data;
}