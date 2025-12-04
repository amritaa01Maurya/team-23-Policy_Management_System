import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import PolicyCard from "../components/PolicyCard";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        api
            .get("/products")
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(() => {
                alert("failed to load products");
                setLoading(false);
            });
    }, []);

    const handleSelect = (product) => {
        navigate(`/purchase/${product._id}`);
    };

    return (
        <>
            <div className="hero">
                <h1>🛡️ Protect What Matters Most</h1>
                <p>
                    Comprehensive insurance solutions tailored to your needs. Life, Health, and Vehicle coverage made simple.
                </p>
                <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                    Explore Products
                </button>
            </div>

            <div className="container" id="products">
                <h2>Our Insurance Products</h2>

                {loading ? (
                    <div className="spinner"></div>
                ) : products.length === 0 ? (
                    <div className="empty-state">
                        <h3>📦 No Products Available</h3>
                        <p>We're currently setting up our insurance products. Please check back soon!</p>
                    </div>
                ) : (
                    <div className="grid">
                        {products.map((p) => (
                            <PolicyCard key={p._id} product={p} onSelect={handleSelect} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductsPage;
