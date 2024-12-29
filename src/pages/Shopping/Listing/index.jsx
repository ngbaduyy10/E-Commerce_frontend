import {ArrowUpDownIcon} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem} from "@/components/ui/dropdown-menu.jsx";
import {useEffect, useState} from "react";
import {getProducts} from "@/services/product.service.jsx";
import {sortOptions} from "@/utils/index.jsx";
import ShoppingProductCard from "@/components/ShoppingProductCard/index.jsx";
import ProductFilter from "@/components/ProductFilter/index.jsx";
import ProductDetailDialog from "@/components/ProductDetailDialog/index.jsx";
import {getReviews} from "@/services/review.service.jsx";

function Listing() {
    const [sort, setSort] = useState("");
    const [productList, setProductList] = useState([]);
    const [filters, setFilters] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getProducts({filters, sort});
            if (response.success) {
                setProductList(response.data);
            }
        }

        fetchApi();
    }, [filters, sort]);

    const handleFilter = (key, value) => {
        if (!value) {
            const newFilters = { ...filters };
            delete newFilters[key];
            setFilters(newFilters);
            return;
        }

        if (filters[key]) {
            if (filters[key].includes(value)) {
                if (filters[key].length === 1) {
                    const newFilters = { ...filters };
                    delete newFilters[key];
                    setFilters(newFilters);
                } else {
                    setFilters({
                        ...filters,
                        [key]: filters[key].filter((item) => item !== value),
                    });
                }
            } else {
                setFilters({
                    ...filters,
                    [key]: [...filters[key], value],
                });
            }
        } else {
            setFilters({
                ...filters,
                [key]: [value],
            });
        }
    }

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
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
                <ProductFilter filters={filters} handleFilter={handleFilter} />
                <div className="bg-background w-full rounded-lg shadow-sm">
                    <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="text-lg font-extrabold">All Products</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-muted-foreground">
                              {productList?.length} Products
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1"
                                    >
                                        <ArrowUpDownIcon className="h-4 w-4"/>
                                        <span>Sort by</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px]">
                                    <DropdownMenuRadioGroup
                                        value={sort}
                                        onValueChange={(value) => value !== "none" ? setSort(value) : setSort("")}
                                    >
                                        {sortOptions.map((sortItem) => (
                                            <DropdownMenuRadioItem
                                                value={sortItem.id}
                                                key={sortItem.id}
                                            >
                                                {sortItem.label}
                                            </DropdownMenuRadioItem>
                                        ))}
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    {productList?.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                            {productList.map((product) => (
                                <ShoppingProductCard
                                    key={product._id}
                                    product={product}
                                    handleProduct={handleProduct}
                                />
                            ))}
                        </div>
                    )}
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

export default Listing;