"use client"
import createProduct from '@/actions/createProduct'
import { assets } from '@/assets/assets'
import { useAuth, useUser } from '@clerk/nextjs'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Page = () => {
  const {user} = useUser()
  const {userId} = useAuth()
  const router = useRouter()
  const [files, setFiles] = useState<string[]>([])
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

const handleUploadSuccess = (result: any) => {
  if (result && result.event === 'success') {
    const uploadedImageUrl = result.info.secure_url;
    setFiles((prevFiles) => [...prevFiles, uploadedImageUrl]);
    console.log('Uploaded image URL:', uploadedImageUrl);
  } else {
    console.error('Upload failed', result);
  }
};
const createProductWithIdAndImage = createProduct.bind(null, userId as string, files)
const [state, action, isPending] = useActionState(createProductWithIdAndImage, null)

useEffect(() => {
  if (state?.status === "success") {
    toast.success(state.message)
    setFiles([])
  }
  if (state?.status === "error") {
    toast.error(state.message)
    setFiles([])
  }
}, [state])

  
  return (
    <div className='flex-1 p-4 md:p-10 max-w-[520px]'>
      <form action={action} className='flex flex-col gap-5'>
        <p className='text-base font-medium'>Product Image</p>
      <CldUploadWidget uploadPreset="product" onSuccess={handleUploadSuccess}>
        {({ open }) => {
          return (
            <button type="button" className='cursor-pointer w-1/4' onClick={() => open()}>
              <Image src={assets.upload_area}  alt='upload' width={100}/>
            </button>
          );
        }}  
      </CldUploadWidget>
      <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
      <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
            name="name"
          />
      <label className="text-base font-medium" htmlFor="product-description">
        Product Description
      </label>
        <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            required
            name='desc'
          ></textarea>

          <div className="flex items-center gap-5 flex-wrap justify-between">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              name='category'
            >
              <option value="earphones">Earphones</option>
              <option value="headphones">Headphones</option>
              <option value="watch">Watch</option>
              <option value="smartphone">Smartphone</option>
              <option value="laptop">Laptop</option>
              <option value="camera">Camera</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              name='price'
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
              name='offerPrice'
            />
          </div>
          </div>
          <button type="submit" disabled={isPending} className="cursor-pointer px-8 py-2.5 bg-orange-600 disabled:bg-orange-200 text-white font-medium rounded">
          {isPending? "Adding" : "ADD"}
        </button>
      </form>
    </div>
  )
}

export default Page