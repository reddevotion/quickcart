"use client"
import { assets } from '@/assets/assets';
import { fetchProduct } from '@/utils/fetchFunc';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React from 'react'
import { useAppContext } from '@/context/AppContext';


const page = () => {
  const {id} = useParams()

  const {router, userData, addToCart} = useAppContext()

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id as string)
  }
  );


    if(isLoading) {
        return (
            <div className="fixed top-0 w-screen h-screen bg-white flex justify-center items-center">
                <p className="text-2xl font-bold text-gray-800">Loading...</p>
              </div>
        )
      }

  if (product) {
  return (
    <div className='section pt-14 flex flex-col justify-center w-full'>
        <div className='flex flex-col md:flex-row gap-16'>
            <div className='w-full md:w-1/2 flex flex-col gap-2 md:gap-4 lg:gap-8'>
                <div className='rounded-lg flex items-center justify-center w-full md:max-w-[520px] max-h-2/3 bg-gray-500/10  mx-auto'>
                    <Image src={product.image[0]} width={500} height={500} alt="ProductImage"/>
                </div>
                <div className='flex justify-between w-full max-h-[120px] md:max-w-[520px] mx-auto'>
                    {product.image.map((image: string, index: number) => (
                        <div key={index} className='rounded-lg flex items-center justify-center bg-gray-500/10 max-w-[120px]'>
                        <Image src={image} className='h-full w-full' width={200} height={200} alt="ProductImage"/>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full md:w-1/2'>
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
            {product.name}
            </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4.5)</p>
                    </div>
                    <p className="text-gray-600 mt-3">
                        {product.description}
                    </p>
                    <p className="text-3xl font-medium mt-6">
                        ${product.offerPrice - 0.01}
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                            ${product.price - 0.01}
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Brand</td>
                                    <td className="text-gray-800/50 ">Generic</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Color</td>
                                    <td className="text-gray-800/50 ">Multi</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category</td>
                                    <td className="text-gray-800/50 capitalize">
                                        {product.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="flex items-center mt-10 gap-4">
                        <button onClick={async () => {await addToCart(id as string)}}className="w-full py-3.5 cursor-pointer bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                            Add to Cart
                        </button>
                        <button onClick={async () => {await addToCart(id as string); setTimeout(() => {router.push('/cart')}, 1000) }} className="w-full py-3.5 cursor-pointer bg-orange-500 text-white hover:bg-orange-600 transition">
                            Buy now
                        </button>
                    </div>
                    </div>
            </div>
        </div>
    </div>
  )

}
}

export default page