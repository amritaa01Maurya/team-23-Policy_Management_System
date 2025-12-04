import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import PremiumCalculatorForm from "../components/PremiumCalculatorForm";

const PurchasePolicyPage = () => {
    // handle calculate premium and purchase in one screen
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [premium, setPremium] = useState(null);
    const [coverageAmount, setCoverageAmount] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api
            .get("/products")
            .then((res) => {
                const found = res.data.find((p) => p._id === productId);
                setProduct(found);
            })
            .catch(() => alert("failed to load product"));
    }, [productId]);

    const handlePremiumCalculated = (value) => {
        setPremium(value);
        setCoverageAmount(""); // optional reset
    };

    const handlePurchase = async () => {
        if (!premium) {
            return alert("please calculate premium first");
        }
        try {
            // in real flow, redirect to payment gateway first
            const res = await api.post("/policies/purchase", {
                productId,
                coverageAmount: Number(coverageAmount),
                premium
            });
            alert("policy purchased successfully");
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "purchase failed");
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="container">
            <h2>Purchase {product.name}</h2>
            <p>{product.description}</p>
            <PremiumCalculatorForm
                product={product}
                onPremiumCalculated={handlePremiumCalculated}
            />

            {premium && (
                <div className="mt-md">
                    <h3>Purchase</h3>
                    <label>Coverage Amount</label>
                    <input
                        type="number"
                        value={coverageAmount}
                        onChange={(e) => setCoverageAmount(e.target.value)}
                        required
                    />
                    <button onClick={handlePurchase}>Pay & Generate Policy</button>
                </div>
            )}
        </div>
    );
};

export default PurchasePolicyPage;
