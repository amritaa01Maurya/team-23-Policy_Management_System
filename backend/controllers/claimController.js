import { Claim } from "../models/Claim.js";
import { Policy } from "../models/Policy.js";
import { logAction } from "../utils/auditLogger.js";

export const createClaim = async (req, res, next) => {
  try {
    const { policyId, description, incidentDate, evidence } = req.body;

    const policy = await Policy.findById(policyId);
    if (!policy) return res.status(404).json({ message: "policy not found" });

    if (policy.policyholder.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "not your policy" });
    }

    if (policy.status !== "ACTIVE") {
      return res
        .status(400)
        .json({ message: "claim cannot be filed on non active policy" });
    }

    const claim = await Claim.create({
      policy: policy._id,
      claimant: req.user._id,
      description,
      incidentDate,
      evidence
    });

    await logAction({
      userId: req.user._id,
      action: "CREATE_CLAIM",
      entityType: "CLAIM",
      entityId: claim._id.toString()
    });

    res.status(201).json(claim);
  } catch (err) {
    next(err);
  }
};

export const getAllClaims = async (req, res, next) => {
  try {
    const claims = await Claim.find({})
      .populate("policy")
      .populate("claimant", "name email");
    res.json(claims);
  } catch (err) {
    next(err);
  }
};

export const updateClaimStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adjusterNotes } = req.body;

    const claim = await Claim.findById(id);
    if (!claim) return res.status(404).json({ message: "claim not found" });

    claim.status = status;
    if (adjusterNotes) claim.adjusterNotes = adjusterNotes;
    await claim.save();

    await logAction({
      userId: req.user._Id,
      action: "UPDATE_CLAIM_STATUS",
      entityType: "CLAIM",
      entityId: claim._id.toString(),
      meta: { status }
    });

    res.json(claim);
  } catch (err) {
    next(err);
  }
};

export const getMyClaims = async (req, res, next) => {
  try {
    const claims = await Claim.find({ claimant: req.user._id })
      .populate("policy")
      .sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    next(err);
  }
};
