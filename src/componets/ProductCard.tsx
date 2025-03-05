"use client"

import axios from 'axios';
import { assets } from '@/assets/assets'
import { ProductCardProps} from '@/utils/Types'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useAppContext } from '@/context/AppContext';




const addOrRemoveFav = async (id:string, userId:string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, {id, userId});

    return response.data;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error
  }
};




const ProductCard = ({product, isFavorite, userData, onFavoriteUpdate} : ProductCardProps) => {
    const [isProductFavorite, setIsProductFavorite] = useState(isFavorite);

    const {router} = useAppContext()

    const mutation = useMutation({
        mutationFn: () => addOrRemoveFav(product._id, userData._id),
        onSuccess: () => {
          toast.success(`${isProductFavorite ? 'Item removed from favorites' : 'Item added to favorites'}`);
          setIsProductFavorite((prev) => !prev);
          onFavoriteUpdate()
        },
        onError: () => {
            toast.error(`${isProductFavorite ? 'Error removing item from favorites' : 'Error adding item to favorites'}`);
        },
      })

      const handleFavoriteClick = () => {
        if (!userData) {
          toast.error("You are not logged in");
          return;
        }
        mutation.mutate();
      };
    
  return (
    <div className='max-w-[200px] mx-auto'>
        <div className='rounded-lg h-52 flex items-center justify-center relative w-full bg-gray-500/10 group'>
            <Image className='group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full' src={product.image[0]} alt="venu_watch_image_helpag" width={800} height={800}/>
            <button onClick={handleFavoriteClick} className={`absolute top-2 right-2 p-2 rounded-full shadow-md cursor-pointer transition ${isProductFavorite ? 'bg-red-400 text-white' : 'bg-white text-gray-500'}`}><Heart  size={14}/></button>
        </div>
        <div className='flex flex-col pt-2'>
            <p className='md:text-base font-medium w-full truncate cursor-pointer' onClick={() => {router.push('/product/'+product._id);}}>{product.name}</p>
            <p className='w-full text-xs text-gray-500/70 max-sm:hidden truncate'>{product.description}</p>
            <div className='flex items-center gap-2'>
                <span className='text-xs'>4.5</span>
                <span className='flex items-center gap-0.5'>
                {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </span>
            </div>
            <div className='flex items-center justify-between w-full mt-2'>
                <span className="text-base font-medium">${product.price - 0.01}</span>
                <button className='cursor-pointer max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition'>Buy now</button>
            </div>
        </div>
    </div>
  )
}

export default ProductCard