import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema (
    {
        title: String,
        associatedWith: String,
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
const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;