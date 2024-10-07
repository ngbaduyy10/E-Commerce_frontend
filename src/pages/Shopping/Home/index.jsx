import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ShoppingProductCard from "@/components/ShoppingProductCard/index.jsx";
import {useEffect, useState} from "react";
import { categoriesIcon, brandsIcon } from "@/utils/index.jsx";
import bannerOne from "@/assets/banner-1.webp";
import bannerTwo from "@/assets/banner-2.webp";
import bannerThree from "@/assets/banner-3.webp";
import {getProducts} from "@/services/product.service.jsx";
import {getReviews} from "@/services/review.service.jsx";
import ProductDetailDialog from "@/components/ProductDetailDialog/index.jsx";

function Home() {
    const [featureImageList, setFeatureImageList] = useState([bannerOne, bannerTwo, bannerThree]);
    const [productList, setProductList] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getProducts({limit: 8});
            if (response.success) {
                setProductList(response.data);
            }
        }

        fetchApi();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
        }, 10000);
        return () => clearInterval(timer);
    }, [featureImageList]);

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
            <div className="flex flex-col min-h-screen">
                <div className="relative w-full h-[600px] overflow-hidden">
                    {featureImageList.length > 0 && featureImageList.map((slide, index) => (
                        <img
                            src={slide}
                            key={index}
                            className={`${index === currentSlide ? "opacity-100" : "opacity-0"} 
                                absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
                        />
                    ))}
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
                        onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length)}
                    >
                        <ChevronLeftIcon className="w-4 h-4"/>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
                        onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)}
                    >
                        <ChevronRightIcon className="w-4 h-4"/>
                    </Button>
                </div>
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            Shop by category
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {categoriesIcon.map((category) => (
                                <Card
                                    key={category.id}
                                    className="cursor-pointer hover:shadow-lg transition-shadow"
                                >
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        <category.icon className="w-12 h-12 mb-4 text-primary"/>
                                        <span className="font-bold">{category.label}</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {brandsIcon.map((brand) => (
                                <Card
                                    key={brand.id}
                                    className="cursor-pointer hover:shadow-lg transition-shadow"
                                >
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        <brand.icon className="w-12 h-12 mb-4 text-primary"/>
                                        <span className="font-bold">{brand.label}</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8">
                            Feature Products
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {productList.length > 0 && productList.map((product) => (
                                <ShoppingProductCard
                                    key={product._id}
                                    product={product}
                                    handleProduct={handleProduct}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <ProductDetailDialog
                product={selectedProduct}
                setProduct={setSelectedProduct}
                reviews={reviews}
                open={dialogOpen}
                setOpen={setDialogOpen}
            />
        </>
    );
}

export default Home;