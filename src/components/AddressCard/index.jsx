import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import PropTypes from "prop-types";

AddressCard.propTypes = {
    addressInfo: PropTypes.object,
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func,
    editedAddress: PropTypes.string,
    setSelectedAddress: PropTypes.func,
    selectedAddress: PropTypes.object,
};

function AddressCard({ addressInfo, handleEdit, handleDelete, editedAddress, setSelectedAddress, selectedAddress }) {
    return (
        <Card
            className={`cursor-pointer border-red-700 ${
                selectedAddress?._id === addressInfo?._id
                    ? "border-red-900 border-[4px]"
                    : "border-black"
            }`}
        >
            <CardContent className="grid p-4 gap-4">
                <Label>Address: {addressInfo?.address}</Label>
                <Label>City: {addressInfo?.city}</Label>
                <Label>Pin Code: {addressInfo?.pinCode}</Label>
                <Label>Phone: {addressInfo?.phone}</Label>
            </CardContent>
            {setSelectedAddress ? (
                <CardFooter className="p-3 flex justify-end">
                    {selectedAddress?._id === addressInfo?._id ? (
                        <Button onClick={() => setSelectedAddress(null)}>Cancel</Button>
                    ) : (
                        <Button onClick={() => setSelectedAddress(addressInfo)}>Select</Button>
                    )}
                </CardFooter>
            ) : (
                <CardFooter className="p-3 flex justify-between">
                    {editedAddress === addressInfo?._id ? (
                        <Button onClick={() => handleEdit(null)}>Cancel Edit</Button>
                    ) : (
                        <Button onClick={() => handleEdit(addressInfo)}>Edit</Button>
                    )}
                    <Button onClick={() => handleDelete(addressInfo)}>Delete</Button>
                </CardFooter>
            )}
        </Card>
    );
}

export default AddressCard;