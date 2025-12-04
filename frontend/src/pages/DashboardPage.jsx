import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import ClaimForm from "../components/ClaimForm";

const DashboardPage = () => {
    const [policies, setPolicies] = useState([]);
    const [claims, setClaims] = useState([]);
    const [selectedPolicyId, setSelectedPolicyId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("policies"); // "policies" or "claims"

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setLoading(true);
        Promise.all([
            api.get("/policies/my"),
            api.get("/claims/my").catch(() => ({ data: [] })) // In case endpoint doesn't exist yet
        ])
            .then(([policiesRes, claimsRes]) => {
                setPolicies(policiesRes.data);
                setClaims(claimsRes.data || []);
                setLoading(false);
            })
            .catch(() => {
                alert("failed to load data");
                setLoading(false);
            });
    };

    return (
        <div className="container">
            <h2>📋 My Dashboard</h2>

            {/* Tabs */}
            <div className="dashboard-tabs">
                <button
                    className={`tab-button ${activeTab === "policies" ? "active" : ""}`}
                    onClick={() => setActiveTab("policies")}
                >
                    My Policies ({policies.length})
                </button>
                <button
                    className={`tab-button ${activeTab === "claims" ? "active" : ""}`}
                    onClick={() => setActiveTab("claims")}
                >
                    My Claims ({claims.length})
                </button>
            </div>

            {loading ? (
                <div className="spinner"></div>
            ) : (
                <>
                    {/* Policies Tab */}
                    {activeTab === "policies" && (
                        <>
                            {policies.length === 0 ? (
                                <div className="empty-state">
                                    <h3>📄 No Policies Yet</h3>
                                    <p>You haven't purchased any insurance policies yet. Browse our products to get started!</p>
                                </div>
                            ) : (
                                <ul>
                                    {policies.map((p) => (
                                        <li key={p._id}>
                                            <div>
                                                <strong>{p.product.name}</strong>
                                                <br />
                                                <small>{p.policyNumber}</small>
                                            </div>
                                            <span className={`status status-${p.status.toLowerCase()}`}>
                                                {p.status}
                                            </span>
                                            <div>
                                                <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>₹{p.premium.toLocaleString()}</span>
                                            </div>
                                            <button onClick={() => {
                                                setSelectedPolicyId(p._id);
                                                setActiveTab("claims");
                                            }}>
                                                File Claim
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}

                    {/* Claims Tab */}
                    {activeTab === "claims" && (
                        <>
                            {selectedPolicyId && (
                                <div className="mt-md mb-xl">
                                    <ClaimForm
                                        policyId={selectedPolicyId}
                                        onCreated={() => {
                                            alert("Claim submitted successfully!");
                                            setSelectedPolicyId(null);
                                            loadData(); // Reload to show new claim
                                        }}
                                    />
                                    <button
                                        className="secondary mt-md"
                                        onClick={() => setSelectedPolicyId(null)}
                                        style={{ width: '100%' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                            {claims.length === 0 ? (
                                <div className="empty-state">
                                    <h3>📋 No Claims Filed</h3>
                                    <p>You haven't filed any insurance claims yet.</p>
                                </div>
                            ) : (
                                <div className="claims-list">
                                    {claims.map((claim) => (
                                        <div key={claim._id} className="claim-card">
                                            <div className="claim-header">
                                                <div>
                                                    <h4>{claim.policy?.policyNumber || 'Policy'}</h4>
                                                    <p className="claim-date">
                                                        Filed on: {new Date(claim.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <span className={`status status-${claim.status.toLowerCase()}`}>
                                                    {claim.status.replace(/_/g, ' ')}
                                                </span>
                                            </div>
                                            <div className="claim-body">
                                                <p><strong>Incident Date:</strong> {new Date(claim.incidentDate).toLocaleDateString()}</p>
                                                <p><strong>Description:</strong> {claim.description}</p>
                                                {claim.adjusterNotes && (
                                                    <div className="adjuster-notes">
                                                        <strong>Adjuster Notes:</strong>
                                                        <p>{claim.adjusterNotes}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default DashboardPage;
