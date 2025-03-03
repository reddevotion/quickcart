'use client';
import React from "react";
import { useAppContext } from "@/context/AppContext";
import { Box } from "lucide-react";
import { ProductType } from "@/utils/Types";

const MyOrders = () => {

    const {orders, userData, isUserLoading, isOrdersLoading, products, isProductsLoading} = useAppContext();

    
   
    return (
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {isUserLoading || isOrdersLoading || isProductsLoading ? (<div className="fixed top-0 w-screen h-screen bg-white flex justify-center items-center">
            <p className="text-2xl font-bold text-gray-800">Loading...</p>
          </div>) : (<div className="max-w-5xl border-t border-gray-300 text-sm">
                        {orders.filter((item: any)=> item.userId === userData._id).map((order: any) => (
                            <div key={order._id} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300">
                                <div className="flex-1 flex gap-5 max-w-80">
                                    <Box/>
                                    <p className="flex flex-col gap-3">
                                        <span className="font-medium text-base">
                                        {Object.keys(order.cartData).map((itemId: string) => {
                                            const product = products.find((product: ProductType) => product._id === itemId);
                                            const quantity = order.cartData[itemId];
                                            if (!product) return null;
                                            return `${product.name} + x ${quantity}`;
                                        }).join(", ")}
                                        </span>
                                        <span>Items : {order.count}</span>
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-medium">{order.userData.fullName}</span>
                                        <br />
                                        <span >{order.userData.area}</span>
                                        <br />
                                        <span>{`${order.userData.city}, ${order.userData.state}`}</span>
                                        <br />
                                        <span>{order.userData.phoneNumber}</span>
                                    </p>
                                </div>
                                <p className="font-medium my-auto">{"$"}{order.amount}</p>
                                <div>
                                    <p className="flex flex-col">
                                        <span>Method : COD</span>
                                        <span>Date : {new Date(order.createdAt).toLocaleDateString()}</span>
                                        <span>Payment : Pending</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>)}
                </div>
            </div>
    );
};

export default MyOrders;