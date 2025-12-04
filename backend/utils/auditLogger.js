import { AuditLog } from "../models/AuditLog.js";

export const logAction = async ({ userId, action, entityType, entityId, meta }) => {
  // store audit log for compliance
  await AuditLog.create({
    user: userId || null,
    action,
    entityType,
    entityId,
    meta
  });
};
