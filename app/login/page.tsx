import LoginForm from "../ui/login-form";
import { Suspense } from "react";

export default function page(){
    return (
        <>
        <Suspense>
            <LoginForm/>
        </Suspense>
        
        </>
    );
}