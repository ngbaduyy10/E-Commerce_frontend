import { Input } from "@/components/ui/input.jsx";
import {useEffect, useState} from "react";
import {searchProducts} from "@/services/search.service.jsx";
import ProductDetailDialog from "@/components/ProductDetailDialog/index.jsx";
import ShoppingProductCard from "@/components/ShoppingProductCard/index.jsx";
import {getReviews} from "@/services/review.service.jsx";

function Search() {
    const [keyword, setKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            const response = await searchProducts(keyword);
            if (response.success) {
                setSearchResults(response.data);
            }
        };

        if (keyword) {
            fetchSearchResults();
        }
    }, [keyword]);

    const handleProduct = async (product) => {
        setSelectedProduct(product);
        setDialogOpen(true);

        const response = await getReviews(product._id);
        if (response.success) {
            setReviews(response.data);
        }
    }

    return (
        <>
            <div className="container mx-auto md:px-6 px-4 py-8">
                <div className="flex justify-center mb-8">
                    <div className="w-full flex items-center">
                        <Input
                            value={keyword}
                            name="keyword"
                            onChange={(event) => setKeyword(event.target.value)}
                            className="py-6"
                            placeholder="Search Products..."
                        />
                    </div>
                </div>
                {!searchResults.length ? (
                    <h1 className="text-5xl font-extrabold">No result found!</h1>
                ) : null}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {searchResults.length > 0 && searchResults.map((product) => (
                        <ShoppingProductCard
                            key={product._id}
                            product={product}
                            handleProduct={handleProduct}
                        />
                    ))}
                </div>
                <ProductDetailDialog
                    product={selectedProduct}
                    setProduct={setSelectedProduct}
                    reviews={reviews}
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                />
            </div>
        </>
    );
}

export default Search;