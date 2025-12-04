import { useState } from "react";
import api from "../api/axiosClient";

const ClaimForm = ({ policyId, onCreated }) => {
  // create claim for selected policy
  const [description, setDescription] = useState("");
  const [incidentDate, setIncidentDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/claims", {
        policyId,
        description,
        incidentDate
      });
      onCreated?.(res.data);
      setDescription("");
      setIncidentDate("");
    } catch (err) {
      alert(err.response?.data?.message || "failed to file claim");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>File Claim</h4>
      <div>
        <label>Incident Date</label>
        <input
          type="date"
          value={incidentDate}
          onChange={(e) => setIncidentDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Describe Incident</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Claim</button>
    </form>
  );
};

export default ClaimForm;
