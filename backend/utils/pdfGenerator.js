import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// create __dirname in esm
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// generate simple pdf with qr code
export const generatePolicyPdf = async (policy, user) => {
  const doc = new PDFDocument();
  const pdfDir = path.join(__dirname, "..", "generated-pdfs");
  if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

  const filePath = path.join(pdfDir, `${policy.policyNumber}.pdf`);
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.fontSize(20).text("Policy Certificate", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Policy Number: ${policy.policyNumber}`);
  doc.text(`Policyholder: ${user.name} (${user.email})`);
  doc.text(`Coverage Amount: ${policy.coverageAmount}`);
  doc.text(`Premium: ${policy.premium}`);
  doc.text(`Start Date: ${policy.startDate.toDateString()}`);
  doc.text(`End Date: ${policy.endDate.toDateString()}`);
  doc.moveDown();

  const qrData = `POLICY:${policy.policyNumber}`;
  const qrPath = path.join(pdfDir, `${policy.policyNumber}-qr.png`);
  await QRCode.toFile(qrPath, qrData);

  doc.text("Scan QR code to verify policy:");
  doc.image(qrPath, { width: 100, align: "left" });

  doc.end();

  return {
    pdfPath: filePath,
    qrPath
  };
};
