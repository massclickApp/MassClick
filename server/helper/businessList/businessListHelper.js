import { ObjectId } from "mongodb";
import businessListModel from "../../model/businessList/businessListModel.js"
import mongoose from "mongoose";

export const createBusinessList = async function (reqBody = {}) {
    try {

        const data = {
            ...reqBody,
        };
        const businessListDocument = new businessListModel(data);
        const result = await businessListDocument.save();
        return result;
    } catch (error) {
        if (error.message && error.message.duplicateKey) {
            throw error;
        }
        console.error('Error saving Business:', error);
        throw error;
    }
};

export const viewBusinessList = async (id) => {
    try {
        if (!ObjectId.isValid(id)) {
            throw new Error("Invalid business ID");
        }

        const business = await businessListModel.findById(id).lean();
        if (!business) {
            throw new Error("business not found");
        }

        return business;
    } catch (error) {
        console.error("Error in business:", error);
        throw error;
    }
};
export const viewAllBusinessList = async () => {
    try {
        const business = await businessListModel.find().lean();
        if (!business) {
            throw new Error("No business found");
        }
        return business;
    } catch (error) {
        console.error("Error fetching business:", error);
        throw error;
    }
};

export const updateBusinessList = async (id, data) => {
    if (!ObjectId.isValid(id)) throw new Error("Invalid business ID");

    const business = await businessListModel.findByIdAndUpdate(id, data, { new: true });
    if (!business) throw new Error("business not found");
    return business;
};

export const deleteBusinessList = async (id) => {
    if (!ObjectId.isValid(id)) throw new Error("Invalid business ID");

    const deletedbusiness = await businessListModel.findByIdAndDelete(id);
    if (!deletedbusiness) throw new Error("business not found");
    return deletedbusiness;
};
export const activeBusinessList = async (id, newStatus) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid business ID");

    const business = await businessListModel.findByIdAndUpdate(
        id,
        { activeBusinesses: newStatus },
        { new: true }
    );

    if (!business) throw new Error("Business not found");

    return business;
};