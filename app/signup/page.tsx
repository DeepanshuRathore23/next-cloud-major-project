import SignupForm from "../ui/signup-form";
import { Suspense } from "react";

export default function Page(){
    return (
        <>
        <Suspense>
            <SignupForm/>
        </Suspense>
        
        </>
    );
}