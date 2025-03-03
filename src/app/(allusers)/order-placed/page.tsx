'use client'
import { useAppContext } from '@/context/AppContext'
import { Check } from 'lucide-react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const OrderPlaced = () => {

  const { router, user } = useAppContext()

  useEffect(() => {
    setTimeout(() => {
      router.push('/my-orders')
    }, 5000)
  }, [])

  useEffect(() => {
    if(!user) {
      router.push('/')
      toast.error("You are not authorized to visit this page!")
    }
  }, [])

  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
      <div className="flex justify-center items-center relative">
        <Check/>
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-green-300 border-gray-200"></div>
      </div>
      <div className="text-center text-2xl font-semibold">Order Placed Successfully</div>
    </div>
  )
}

export default OrderPlaced