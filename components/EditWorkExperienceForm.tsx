'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

interface EditWorkExperienceFormProps {
    id: string;
    workExperience: any;
}

function EditWorkExperienceForm({ id, workExperience }: EditWorkExperienceFormProps) {
    const rows = 4;
    const router = useRouter();

    const [formData, setFormData] = useState({
        companyName: workExperience.companyName,
        city: workExperience.city,
        state: workExperience.state,
        jobTitle: workExperience.jobTitle,
        startMonth: workExperience.startMonth,
        startYear: workExperience.startYear,
        endMonth: workExperience.endMonth,
        endYear: workExperience.endYear,
        description: workExperience.description
    });

    function validateForm(): Boolean {
        if (formData.companyName === "") {
            alert("Please enter a company name.");
            return false;
        }
        if (formData.jobTitle === "") {
            alert("Please enter your job title at the company.");
            return false;
        }
        if (formData.startYear === "") {
            alert("Please enter the year you started the work.");
            return false;
        }
        return true;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) return;

        try {
            const res = await fetch(`/api/workExperience/${id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData), // Ensure body contains the form data directly
            });

            if (res.ok) {
                router.push("/");
                router.refresh();
            } else {
                throw new Error("Failed to create the work experience");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className="max-w-sm mx-auto mt-8" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                    <h1 className="block mb-2 font-xl text-gray-900 dark:text-white">Edit Work Experience</h1>
                </div>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                <input value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company Name" required />

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                <input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City" />

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">State</label>
                <input value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="State" />

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
                <input value={formData.jobTitle} onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title you held.." required />

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Month</label>
                        <select value={formData.startMonth} onChange={(e) => setFormData({ ...formData, startMonth: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>
                    <div className="relative z-0 w-full group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Year</label>
                        <input value={formData.startYear} onChange={(e) => setFormData({ ...formData, startYear: e.target.value })} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start Year" required />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Month</label>
                        <select value={formData.endMonth} onChange={(e) => setFormData({ ...formData, endMonth: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                    </div>
                    <div className="relative z-0 w-full group">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Year</label>
                        <input value={formData.endYear} onChange={(e) => setFormData({ ...formData, endYear: e.target.value })} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="End Year" />
                    </div>
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} id="message" rows={rows} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5" placeholder="Description"></textarea>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
            </form>
        </>
    );
}

export default EditWorkExperienceForm;
