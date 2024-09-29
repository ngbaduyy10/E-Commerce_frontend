import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import CommonForm from '../../../components/CommonForm';
import {userLogin} from "@/store/authSlice/index.jsx";
import { useToast } from "@/hooks/use-toast"

const loginFormControls = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: "input",
        type: "email",
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        type: "password",
    },
];

function Login() {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(userLogin(formData));
        if (response.payload.success) {
            toast({
                title: response.payload.message,
            });
        } else {
            toast({
                title: response.payload.message,
                variant: "destructive",
            });
        }
    }

    return (
        <>
            <div className="mx-auto w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-foreground">
                        Sign in to your account
                    </h1>
                    <p className="mt-2">
                        Do not have an account
                        <Link
                            className="font-medium ml-2 text-primary hover:underline"
                            to="/register"
                        >
                            Register
                        </Link>
                    </p>
                </div>
                <CommonForm
                    formControls={loginFormControls}
                    buttonText={"Sign In"}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={onSubmit}
                />
            </div>
        </>
    )
}

export default Login;