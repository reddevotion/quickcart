"use client"
import { useAppContext } from '@/context/AppContext'
import { ProductType } from '@/utils/Types'
import { Box } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const Orders = () => {
  
  const {user, router, isOrdersLoading, orders, products, isProductsLoading} = useAppContext()
  useEffect(() => {
    if(!user || user?.publicMetadata?.role !== "seller") {
      router.push('/')
      toast.error("You are not authorized to visit this page!")
    }
  }, [])

  if (!user || user?.publicMetadata?.role !== "seller") {
    return (<div className="fixed top-0 w-screen h-screen bg-white flex justify-center items-center">
      <p className="text-2xl font-bold text-gray-800">Loading...</p>
    </div>)
  }

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
            {isOrdersLoading || isProductsLoading ? (<div className="fixed top-0 w-screen h-screen bg-white flex justify-center items-center">
      <p className="text-2xl font-bold text-gray-800">Loading...</p>
    </div>) : <div className="md:p-10 p-4 space-y-5">
                <h2 className="text-lg font-medium">Orders</h2>
                <div className="max-w-4xl rounded-md">
                    {orders.map((order: any, index: number) => (
                        <div key={index} className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300">
                            <div className="flex-1 flex gap-5 max-w-80">
                                <Box/>
                                <p className="flex flex-col gap-3">
                                    <span className="font-medium">
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
                </div>
            </div>}
        </div>
  )
}

export default Orders