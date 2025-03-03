"use client"

import React from 'react'
import ProductCard from './ProductCard'
import { ProductType } from '@/utils/Types';
import { useAppContext } from '@/context/AppContext';



const ProductList = ({title, home}: {title: string, home: boolean}) => {
  const { user, router, queryClient, userData, isUserLoading, userError, products, productsError, isProductsLoading} = useAppContext()

      const onFavoriteUpdate = () => {
        if (user) {
          queryClient.invalidateQueries({queryKey: ['userData', user.id]});
          queryClient.refetchQueries({queryKey: ['userData', user.id]});
        }
      };
      
    

  return (
    <div className="flex flex-col items-center pt-14">
        <p className="text-2xl font-medium text-left w-full ml-13">{title}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
            {isProductsLoading || isUserLoading ? (<p>Loading products...</p>) : productsError || userError ? (<p>Error fetching products...</p>) : home ? (
          // Slice products to show only the first 20
          products.slice(0, 10).map((product: ProductType) => {
            const isFavorite = userData
              ? userData.favoriteItems.includes(product._id)
              : false;
            return (
              <ProductCard
                key={product.name}
                product={product}
                isFavorite={isFavorite}
                userData={userData}
                onFavoriteUpdate={onFavoriteUpdate}
              />
            );
          })
        ) : (
          products.map((product: ProductType) => {
            const isFavorite = userData
              ? userData.favoriteItems.includes(product._id)
              : false;
            return (
              <ProductCard
                key={product.name}
                product={product}
                isFavorite={isFavorite}
                userData={userData}
                onFavoriteUpdate={onFavoriteUpdate}
              />
            );
          })
        )}
        </div>
        {
          home && (
            <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded cursor-pointer text-gray-500/70 hover:bg-slate-50/90 transition">
              See more
            </button>
          )
        }
        
    </div>
  )
}

export default ProductList