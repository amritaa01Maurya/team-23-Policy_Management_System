import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/Product.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const sampleProducts = [
    {
        name: "Life Shield Plus",
        type: "LIFE",
        basePremium: 5000,
        termYears: 20,
        description: "Comprehensive life insurance coverage for you and your family",
        meta: {
            minAge: 18,
            maxAge: 65,
            minIdv: 500000,
            maxIdv: 10000000
        }
    },
    {
        name: "Health Guard Pro",
        type: "HEALTH",
        basePremium: 8000,
        termYears: 1,
        description: "Complete health insurance with cashless hospitalization",
        meta: {
            minAge: 18,
            maxAge: 70,
            minIdv: 300000,
            maxIdv: 5000000
        }
    },
    {
        name: "Motor Secure",
        type: "VEHICLE",
        basePremium: 3500,
        termYears: 1,
        description: "Comprehensive vehicle insurance with zero depreciation",
        meta: {
            minIdv: 200000,
            maxIdv: 5000000
        }
    },
    {
        name: "Family Health Plus",
        type: "HEALTH",
        basePremium: 12000,
        termYears: 1,
        description: "Family floater health insurance for up to 6 members",
        meta: {
            minAge: 18,
            maxAge: 70,
            minIdv: 500000,
            maxIdv: 10000000
        }
    },
    {
        name: "Term Life Protect",
        type: "LIFE",
        basePremium: 3000,
        termYears: 30,
        description: "Affordable term life insurance with high coverage",
        meta: {
            minAge: 18,
            maxAge: 60,
            minIdv: 1000000,
            maxIdv: 50000000
        }
    },
    {
        name: "Two Wheeler Shield",
        type: "VEHICLE",
        basePremium: 1500,
        termYears: 1,
        description: "Complete protection for your two-wheeler",
        meta: {
            minIdv: 30000,
            maxIdv: 200000
        }
    }
];

const seedProducts = async () => {
    try {
        await connectDB();

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");

        // Insert sample products
        await Product.insertMany(sampleProducts);
        console.log("Sample products inserted successfully!");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding products:", error);
        process.exit(1);
    }
};

seedProducts();
