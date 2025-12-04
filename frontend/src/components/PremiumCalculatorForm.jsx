import { useState } from "react";
import api from "../api/axiosClient";

const PremiumCalculatorForm = ({ product, onPremiumCalculated }) => {
    const [age, setAge] = useState("");
    const [vehicleYear, setVehicleYear] = useState("");
    const [idv, setIdv] = useState("");
    const [premium, setPremium] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/premium/calculate", {
                productId: product._id,
                age: age ? Number(age) : undefined,
                vehicleYear: vehicleYear ? Number(vehicleYear) : undefined,
                idv: idv ? Number(idv) : undefined
            });
            setPremium(res.data.premium);
            onPremiumCalculated?.(res.data.premium);
        } catch (err) {
            alert(err.response?.data?.message || "failed to calculate");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="premium-calculator">
            <h3>💰 Premium Calculator</h3>
            <form onSubmit={handleCalculate}>
                {product.type !== "VEHICLE" && (
                    <div>
                        <label>Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter your age"
                            required
                        />
                    </div>
                )}

                {product.type === "VEHICLE" && (
                    <div>
                        <label>Vehicle Year</label>
                        <input
                            type="number"
                            value={vehicleYear}
                            onChange={(e) => setVehicleYear(e.target.value)}
                            placeholder="e.g., 2020"
                            required
                        />
                    </div>
                )}

                <div>
                    <label>Coverage Amount (IDV / Sum Assured)</label>
                    <input
                        type="number"
                        value={idv}
                        onChange={(e) => setIdv(e.target.value)}
                        placeholder="Enter coverage amount"
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Calculating..." : "Calculate Premium"}
                </button>
            </form>

            {premium && (
                <div className="premium-result">
                    Estimated Premium: ₹{premium.toLocaleString()}
                </div>
            )}
        </div>
    );
};

export default PremiumCalculatorForm;
