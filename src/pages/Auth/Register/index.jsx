import { useState } from "react";
import CommonForm from "@/components/CommonForm/index.jsx";
import { Link } from "react-router-dom";
import {userRegister} from "@/store/authSlice/index.jsx";
import { useToast } from "@/hooks/use-toast";
import {useDispatch} from "react-redux";

const registerFormControls = [
    {
        name: "userName",
        label: "User Name",
        placeholder: "Enter your user name",
        componentType: "input",
        type: "text",
    },
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

function Register() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(userRegister(formData));
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
    };

    return (
        <>
            <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-foreground">
                        Create an account
                    </h1>
                    <p className="mt-2">
                        Already have an account?
                        <Link
                            className="font-medium ml-2 text-primary hover:underline"
                            to="/login"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
                <CommonForm
                    formControls={registerFormControls}
                    onSubmit={onSubmit}
                    setFormData={setFormData}
                    formData={formData}
                />
            </div>
        </>
    )
}

export default Register;