'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

interface EditWorkExperienceFormProps {
    id: string;
    project: any;
}

function EditWorkExperienceForm({ id, project }: EditWorkExperienceFormProps) {
    const rows = 4;
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: project.title,
        associatedWith: project.associatedWith,
        startMonth: project.startMonth,
        startYear: project.startYear,
        endMonth: project.endMonth,
        endYear: project.endYear,
        description: project.description,
        hoverColor: project.hoverColor
    });

    function validateForm(): Boolean {
        if (formData.title === "") {
            alert("Please enter a title.");
            return false;
        }
        if (formData.startYear === "") {
            alert("Please enter the year you started the project.");
            return false;
        }
        return true;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) return;

        try {
            const res = await fetch(`/api/projects/${id}`, {
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
                throw new Error("Failed to edit the project");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className="max-w-sm mx-auto mt-8" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                    <h1 className="block mb-2 font-xl text-gray-900 dark:text-white">Edit Project</h1>
                </div>

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required />

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Associated With?</label>
                <input value={formData.associatedWith} onChange={(e) => setFormData({ ...formData, associatedWith: e.target.value })} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Associated With" />

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

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hover Color</label>
                <select value={formData.hoverColor} onChange={(e) => setFormData({ ...formData, hoverColor: e.target.value })} className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="hover:bg-red-600">Red</option>
                    <option value="hover:bg-orange-600">Orange</option>
                    <option value="hover:bg-amber-600">Amber</option>
                    <option value="hover:bg-yellow-600">Yellow</option>
                    <option value="hover:bg-lime-600">Lime</option>
                    <option value="hover:bg-green-600">Green</option>
                    <option value="hover:bg-emerald-600">Emerald</option>
                    <option value="hover:bg-teal-600">Teal</option>
                    <option value="hover:bg-cyan-600">Cyan</option>
                    <option value="hover:bg-sky-600">Sky Blue</option>
                    <option value="hover:bg-blue-600">Blue</option>
                    <option value="hover:bg-indigo-600">Indigo</option>
                    <option value="hover:bg-violet-600">Violet</option>
                    <option value="hover:bg-purple-600">Purple</option>
                    <option value="hover:bg-fuchsia-600">Fuchsia</option>
                    <option value="hover:bg-pink-600">Pink</option>
                    <option value="hover:bg-rose-600">Rose</option>
                    <option value="hover:bg-slate-600">Slate</option>
                    <option value="hover:bg-gray-600">Gray</option>
                    <option value="hover:bg-zinc-600">Zinc</option>
                    <option value="hover:bg-neutral-600">Neutral</option>
                    <option value="hover:bg-neutral-600">Neutral</option>
                    <option value="hover:bg-stone-600">Stone</option>
                </select>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
            </form>
        </>
    );
}

export default EditWorkExperienceForm;
