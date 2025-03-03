'use client'
import { fetchOrders, fetchProducts, fetchUser } from "@/utils/fetchFunc";
import { Address, CartItems, ProductType, User } from "@/utils/Types";
import { useUser } from "@clerk/nextjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";



interface AppContextType {
    router: ReturnType<typeof useRouter>;
    queryClient: ReturnType<typeof useQueryClient>;
    userData: any;  
    isUserLoading: boolean | undefined;
    userError: any;
    isSeller: boolean;
    user: any;
    products: ProductType[];
    isProductsLoading: boolean | undefined;
    productsError: Error | null;
    cartItems: CartItems;
    setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
    addToCart: (itemId: string) => Promise<void>;
    updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
    getCartCount: () => number;
    getCartAmount: () => number;
    userAddresses: Address[];
    setUserAddresses: React.Dispatch<React.SetStateAction<any>>;
    isOrdersLoading: boolean | undefined;
    ordersError: Error | null;
    orders: any;
    deleteCartItems: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | null>(null);



export const useAppContext = () => {
    const context = useContext(AppContext);


    if (context === null) {
        throw new Error (
                "AppContext must be used within an AppContextProvider"
        )
    }

    return context
}


export const AppContextProvider = ({children} : {children : React.ReactNode}) => {

    const router = useRouter()
    const queryClient = useQueryClient();
    const { user } = useUser()
    const [isSeller, setIsSeller] = useState(user?.publicMetadata?.role === "seller");
    const [cartItems, setCartItems] = useState<CartItems>({})
    const [userAddresses, setUserAddresses] = useState([]);

    const { data: userData, isLoading: isUserLoading, error: userError } = user ? useQuery({
        queryKey: ['userData', user.id],
        queryFn: () => fetchUser(user.id),
        refetchOnWindowFocus: false, 
        staleTime: Infinity,
        enabled: !!user,
    }): {data: null}

    const { data: products, isLoading: isProductsLoading, error: productsError } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetchProducts()
    })

    const { data: orders, isLoading: isOrdersLoading, error: ordersError } = useQuery({
        queryKey: ['orders'],
        queryFn: () => fetchOrders()
    })

    useEffect(() => {
        if (userData && userData.cartItems) {
            setCartItems(userData.cartItems);
        }
        if (userData && userData.addresses) {
            setUserAddresses(userData.addresses);
        }
    }, [userData])

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }



    

    const addToCart = async (itemId: string) => {

        let cartData = structuredClone(cartItems);
        if(!userData) {
            toast.error("You are not logged in");
            return;
        }
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/cart`, {cartData, userId: userData._id})  
            toast.success("Item added to cart")
        } catch (error) {
            toast.error("Error adding item to cart")
        }
    }

    const updateCartQuantity = async (itemId: string, quantity: number) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/cart`, {cartData, userId: userData._id})  
            toast.success("Cart updated")
        } catch (error) {
            toast.error("Error updating cart")
        }
    }

    const deleteCartItems = async () => {

        let cartData = {};
        setCartItems(cartData)
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/cart`, {cartData, userId: userData._id})  
            toast.success("Cart updated")
        } catch (error) {
            toast.error("Error updating cart")
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product: ProductType) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return (Math.floor(totalAmount * 100) / 100) - 0.01 * getCartCount();
    }
        
        



    const value = {
        router, queryClient,
        userData, isUserLoading,
        userError, isSeller,
        user, products, isProductsLoading,
        productsError, cartItems, setCartItems, addToCart,
        updateCartQuantity, getCartCount, getCartAmount,
        setUserAddresses, userAddresses, orders, isOrdersLoading, ordersError, deleteCartItems
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}