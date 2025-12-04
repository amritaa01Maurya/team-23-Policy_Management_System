import { useEffect, useState } from "react";
import api from "../api/axiosClient";

const AdminClaimsPage = () => {
    // allow admin/adjuster to manage claims
    const [claims, setClaims] = useState([]);

    const loadClaims = () => {
        api
            .get("/claims")
            .then((res) => setClaims(res.data))
            .catch(() => alert("failed to load claims"));
    };

    useEffect(() => {
        loadClaims();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/claims/${id}/status`, { status });
            loadClaims();
        } catch (err) {
            alert("update failed");
        }
    };

    return (
        <div className="container">
            <h2>Claims (Admin / Adjuster)</h2>
            <table>
                <thead>
                    <tr>
                        <th>Policy</th>
                        <th>Claimant</th>
                        <th>Status</th>
                        <th>Incident</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {claims.map((c) => (
                        <tr key={c._id}>
                            <td>{c.policy.policyNumber}</td>
                            <td>{c.claimant.name}</td>
                            <td>
                                <span className={`status status-${c.status.toLowerCase()}`}>
                                    {c.status}
                                </span>
                            </td>
                            <td>{new Date(c.incidentDate).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="secondary"
                                    onClick={() => updateStatus(c._id, "UNDER_REVIEW")}
                                >
                                    Review
                                </button>
                                <button onClick={() => updateStatus(c._id, "APPROVED")}>Approve</button>
                                <button className="danger" onClick={() => updateStatus(c._id, "REJECTED")}>
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminClaimsPage;
