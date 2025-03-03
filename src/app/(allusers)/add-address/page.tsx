'use client'
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import addAddress from '@/actions/addAddress'
import toast from "react-hot-toast";

const AddAddress = () => {

    const {userData, user, router, isUserLoading, queryClient} = useAppContext()

    useEffect(() => {
        if(!user) {
          router.push('/')
          toast.error("You are not authorized to visit this page!")
        }
      }, [])
    
    const addAddressWithId = userData? addAddress.bind(null, userData._id as string) : (async () => ({ message: "No user data", status: "error" }));
    const [state, action, isPending] = useActionState(addAddressWithId, null)

    useEffect(() => {
        if (state?.status === "success") {
          toast.success(state.message)
          queryClient.refetchQueries({queryKey: ['userData', user.id]})
          router.push("/cart")
        }
        if (state?.status === "error") {
          toast.error(state.message)
          queryClient.refetchQueries({queryKey: ['userData', user.id]})
        }
      }, [state])

    if(isUserLoading) {
        return (<div className="fixed top-0 w-screen h-screen bg-white flex justify-center items-center">
      <p className="text-2xl font-bold text-gray-800">Loading...</p>
    </div>)
      }
    return (
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
                <form action={action} className="w-full">
                    <p className="text-2xl md:text-3xl text-gray-500">
                        Add Shipping <span className="font-semibold text-orange-600">Address</span>
                    </p>
                    <div className="space-y-3 max-w-sm mt-10">
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Full name"
                            name="fullName"
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone number"
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            placeholder="Pin code"
                            name="pincode"
                        />
                        <textarea
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500 resize-none"
                            rows={4}
                            placeholder="Address (Area and Street)"
                            name="area"
                        ></textarea>
                        <div className="flex space-x-3">
                            <input
                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                type="text"
                                placeholder="City/District/Town"
                                name="city"
                            />
                            <input
                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                type="text"
                                placeholder="State"
                                name="state"
                            />
                        </div>
                    </div>
                    <button type="submit" disabled={isPending} className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase disabled:bg-orange-300">
                        Save address
                    </button>
                </form>
                <Image
                    className="md:mr-16 mt-16 md:mt-0"
                    src={assets.my_location_image}
                    alt="my_location_image"
                />
            </div>
    );
};

export default AddAddress;