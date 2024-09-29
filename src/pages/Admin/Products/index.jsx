import { Button } from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast.js";
import {useEffect, useState} from "react";
import CommonForm from "@/components/CommonForm/index.jsx";
import UploadImage from "@/components/UploadImage/index.jsx";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/services/product.service";
import AdminProductCard from "@/components/AdminProductCard/index.jsx";

const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title",
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter product description",
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "accessories", label: "Accessories" },
            { id: "footwear", label: "Footwear" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "adidas", label: "Adidas" },
            { id: "puma", label: "Puma" },
            { id: "levi", label: "Levi's" },
            { id: "zara", label: "Zara" },
            { id: "h&m", label: "H&M" },
        ],
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter product price",
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter sale price (optional)",
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter total stock",
    },
];

function Products() {
    const { toast } = useToast();
    const [addProductModal, setAddProductModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getProducts();
            if (response.success) {
                setProducts(response.data);
            }
        }

        fetchApi();
    }, [reload]);

    const onCloseModal = () => {
        setAddProductModal(false);
        setFormData({});
        setImageUrl(null);
        setImageFile(null);
        setIsEdit(false);
    }

    const handleEdit = (product) => {
        setFormData(product);
        setAddProductModal(true);
        setImageUrl(product?.image);
        setIsEdit(true);
    }

    const handleDelete = async (id) => {
        const response = await deleteProduct(id);
        if (response.success) {
            setReload(!reload);
            toast({
                title: response.message,
            });
        } else {
            toast({
                title: response.message,
                variant: "destructive",
            });
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        for (const key in formData) {
            if (key !== "image" && key!== "_id") {
                data.append(key, formData[key]);
            }
        }
        if (imageFile) {
            data.append("image", imageFile);
        }
        let response;
        if(isEdit) {
            response = await updateProduct(formData._id, data);
        } else {
            response = await createProduct(data);
        }
        if (response.success) {
            setAddProductModal(false);
            setFormData({});
            setImageFile(null);
            setImageUrl(null);
            setIsEdit(false);
            setReload(!reload);
            toast({
                title: response.message,
            });
        } else {
            toast({
                title: response.message,
                variant: "destructive",
            });
        }
        setLoading(false);
    }

    return (
        <>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={() => setAddProductModal(true)}>
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.length > 0 && products.map((product) => (
                    <AdminProductCard
                        key={product._id}
                        product={product}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
            <Dialog open={addProductModal} onOpenChange={onCloseModal}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[85vh] overflow-auto">
                        <UploadImage
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            imageUrl={imageUrl}
                            setImageUrl={setImageUrl}
                        />
                        <CommonForm
                            formControls={addProductFormElements}
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={onSubmit}
                            buttonText={isEdit ? "Update" : "Add"}
                            disabled={loading}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Products;