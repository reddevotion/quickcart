import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="w-full h-full flex justify-center items-center my-20">
            <SignUp/>
        </div>
    )
}