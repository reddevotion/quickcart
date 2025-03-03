"use client"
import { ProductType } from '@/utils/Types'
import { useUser } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Edit2, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'





const fetchProducts = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  return data;
};


  
const ProductList = () => {
 
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  }
  );
    const {user} = useUser()
    const router = useRouter()
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
    <div className='flex-1 flex flex-col gap-4 p-4 md:p-10'>
        <h2 className='text-lg font-medium'>All Products</h2>
        <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
            <table className='w-full text-gray-900 text-sm text-left'>
                <thead>
                    <tr>
                        <th className='w-2/3 md:w-2/5 px-4 py-3 font-medium truncate'>Product</th>
                        <th className='px-4 py-3 font-medium truncate max-sm:hidden'>Category</th>
                        <th className="px-4 py-3 font-medium truncate">Price</th>
                        <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
                    </tr>
                </thead>
                <tbody className='text-sm text-gray-500'>
                    {isLoading ? (
                      <tr className='border-t border-gray-500/20'><td className='pl-2 md:pl-4 py-3'>Loading products...</td></tr>) : products.map((product : ProductType) => (
                        <tr key={product.name} className='border-t border-gray-500/20'>
                            <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate'>
                                <div className="bg-gray-500/10 rounded p-2">
                                    <Image
                                        src={product.image[0]}
                                        alt="product Image"
                                        className="w-16"
                                        width={1280}
                                        height={720}
                                    />
                                </div>
                                <span className="truncate w-full cursor-pointer" onClick={() => router.push(`/product/${product._id}`)}>
                                    {product.name}
                                </span>
                            </td>
                            <td className="px-4 py-3 max-sm:hidden capitalize">{product.category}</td>
                            <td className="px-4 py-3">${product.offerPrice - 0.01}</td>
                            <td className="px-4 py-3 space-x-2">
                              <button type='button' className='bg-red-800 text-white p-1 rounded-md cursor-pointer hover:bg-red-600 transition'><X size={18}/></button>
                              <button type='button' className='bg-blue-800 text-white p-1 rounded-md cursor-pointer hover:bg-blue-600 transition'><Edit2 size={18}/></button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
        
    </div>
  )
}

export default ProductList