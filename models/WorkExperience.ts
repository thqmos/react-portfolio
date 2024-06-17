import mongoose, { Schema } from "mongoose";

const workExperienceSchema = new Schema (
    {
        companyName: String,
        city: String,
        state: String,
        jobTitle: String,
        startMonth: String,
        startYear: String,
        endMonth: String,
        endYear: String,
        description: String,
        hoverColor: String,
    },
    {
        timestamps: true
    }
);
const WorkExperience = mongoose.models.WorkExperience || mongoose.model("WorkExperience", workExperienceSchema);

export default WorkExperience;