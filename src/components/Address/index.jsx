import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {useEffect, useState} from "react";
import {addAddress, getAddress, updateAddress, deleteAddress} from "@/services/address.service.jsx";
import {useSelector} from "react-redux";
import AddressCard from "@/components/AddressCard/index.jsx";
import {addressForm} from "@/utils/index.jsx";
import CommonForm from "@/components/CommonForm/index.jsx";
import {useToast} from "@/hooks/use-toast.js";

const initialFormData = {
    address: "",
    city: "",
    pinCode: "",
    phone: "",
    notes: "",
}

function Address() {
    const { toast } = useToast();
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState(initialFormData);
    const [addressList, setAddressList] = useState([]);
    const [editedAddress, setEditedAddress] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getAddress(user.id);
            if (response.success) {
                setAddressList(response.data);
            }
        }

        if (user) {
            fetchApi();
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...formData, userId: user.id };
        let response;
        if (editedAddress) {
            response = await updateAddress(editedAddress, data);
        } else {
            response = await addAddress(data);
        }
        if (response.success) {
            if (editedAddress) {
                setAddressList(addressList.map((address) => {
                    if (address._id === editedAddress) {
                        return response.data;
                    }
                    return address;
                }));
            } else {
                setAddressList([...addressList, response.data]);
            }
            setFormData(initialFormData);
            setEditedAddress(null);
            toast({
                title: response.message,
            });
        }
    }

    const handleEdit = (address) => {
        if (!address) {
            setFormData(initialFormData);
            setEditedAddress(null);
        } else {
            setFormData({
                address: address.address,
                city: address.city,
                pinCode: address.pinCode,
                phone: address.phone,
                notes: address.notes
            });
            setEditedAddress(address._id);
        }
    }

    const handleDelete = async (address) => {
        const response = await deleteAddress(address._id);
        if (response.success) {
            setAddressList(addressList.filter((item) => item._id !== address._id));
            toast({
                title: response.message,
            });
        }
    }

    const formValid = () => {
        return Object.keys(formData).map((key) => formData[key].trim() !== "").every((item) => item);
    }

    return (
        <>
            <Card>
                <div className="mb-5 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {addressList.length > 0 && addressList.map((address) => (
                        <AddressCard
                            key={address._id}
                            addressInfo={address}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            editedAddress={editedAddress}
                        />
                    ))}
                </div>
                <CardHeader>
                    <CardTitle>
                        {"Add New Address"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <CommonForm
                        formControls={addressForm}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={editedAddress ? "Update Address" : "Add Address"}
                        onSubmit={handleSubmit}
                        disabled={!formValid()}
                    />
                </CardContent>
            </Card>
        </>
    );
}

export default Address;