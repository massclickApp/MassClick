import mongoose from "mongoose"

const businessListSchema = new mongoose.Schema({
    clientId: { type: String, default: '', },
    businessName: { type: String, default: '', required: true },
    plotNumber: { type: String, default: '', },
    street: { type: String, default: '', required: true },
    pincode: { type: String, default: '', required: true },
    email: { type: String, default: '', required: true },
    contact: { type: String, default: '', required: true },
    contactList: { type: String, default: '', required: true },
    gstin: { type: String, default: '', required: true },
    whatsappNumber: { type: String, default: '', required: true },
    experience: { type: String, default: '', required: true },
    location: { type: String, default: '', required: true },
    category: { type: String, default: '', required: true },
    bannerImage: { type: String, default: '', required: true },
    googleMap: { type: String, default: '', required: true },
    website: { type: String, default: '', required: true },
    facebook: { type: String, default: '', required: true },
    instagram: { type: String, default: '', required: true },
    youtube: { type: String, default: '', required: true },
    pinterest: { type: String, default: '', required: true },
    twitter: { type: String, default: '', required: true },
    linkedin: { type: String, default: '', required: true },
    businessDetails: { type: String, default: '', required: true },
    isActive: { type: Boolean, default: true },
});

export default businessListSchema;