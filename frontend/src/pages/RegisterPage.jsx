import { useState } from "react";
import api from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/register", {
                name,
                email,
                password
            });
            login(res.data);
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "register failed");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left">
                <div className="auth-brand">
                    <h1>🛡️ PolicyMS</h1>
                    <p className="tagline">Start your insurance journey today</p>
                </div>

                <div className="auth-features">
                    <div className="feature-item">
                        <span className="feature-icon">🚀</span>
                        <div>
                            <h4>Quick Signup</h4>
                            <p>Get started in under 2 minutes</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">💳</span>
                        <div>
                            <h4>Instant Coverage</h4>
                            <p>Policy active immediately after payment</p>
                        </div>
                    </div>
                    <div className="feature-item">
                        <span className="feature-icon">📱</span>
                        <div>
                            <h4>Digital First</h4>
                            <p>Manage everything from your device</p>
                        </div>
                    </div>
                </div>

                <div className="auth-testimonial">
                    <div className="testimonial-content">
                        <p>"PolicyMS made getting insurance so easy! The whole process was smooth and transparent."</p>
                        <div className="testimonial-author">
                            <strong>Priya Sharma</strong>
                            <span>Verified Customer</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-form-container">
                    <div className="auth-header">
                        <h2>Create Account</h2>
                        <p>Join thousands of satisfied customers</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label>
                                <span className="label-icon">👤</span>
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

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
                                placeholder="Create a strong password"
                                required
                            />
                        </div>

                        <button type="submit" className="auth-button">
                            Create Account
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Already have an account?{" "}
                            <Link to="/login" className="auth-link">
                                Login Here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
