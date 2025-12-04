import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/" className="logo">🛡️ PolicyMS</Link>
            <div className="nav-links">
                <Link to="/products">Products</Link>
                {user && <Link to="/dashboard">Dashboard</Link>}
                {(user?.role === "ADMIN" || user?.role === "ADJUSTER") && (
                    <Link to="/admin/claims">Admin Claims</Link>
                )}
                {user?.role === "ADMIN" && (
                    <Link to="/admin/products">Manage Products</Link>
                )}
                {!user ? (
                    <>
                        <Link to="/login" className="nav-login">Login</Link>
                        <Link to="/register" className="nav-register">Register</Link>
                    </>
                ) : (
                    <div className="nav-user">
                        <span className="user-name">👤 {user.name || user.email}</span>
                        <button className="secondary" onClick={logout}>Logout</button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
