import { useState } from "react";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password });
            login(res.data);
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "login failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="auth-brand">
                    <h1>🛡️ PolicyMS</h1>
                    <p className="tagline">Your trusted insurance partner</p>
                </div>

                <div className="auth-features">
                    <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <div>
                            <h4>Secure & Trusted</h4>
                            <p>Bank-level security for your data</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <div>
                            <h4>Quick Claims</h4>
                            <p>Process claims in 24 hours</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <div>
                            <h4>Best Rates</h4>
                            <p>Competitive premiums guaranteed</p>
                        </div>
                    </div>
                </div>

                <div className="auth-stats">
                    <div className="stat">
                        <h3>10K+</h3>
                        <p>Happy Customers</p>
                    </div>
                    <div className="stat">
                        <h3>₹50Cr+</h3>
                        <p>Claims Settled</p>
                    </div>
                    <div className="stat">
                        <h3>4.8★</h3>
                        <p>Customer Rating</p>
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-form-container">
                    <div className="auth-header">
                        <h2>Welcome Back!</h2>
                        <p>Login to manage your policies</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>
                                <span className="label-icon">📧</span>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <span className="label-icon">🔒</span>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button type="submit" className="auth-button">
                            Login to Account
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/register" className="auth-link">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
