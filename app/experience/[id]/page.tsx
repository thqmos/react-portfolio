'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function View() {

    const params = useParams<{ id: string }>()
    const [workExperience, setWorkExperience] = useState<any>([]);


    useEffect(() => {
        async function getExperience() {
            try {
                const response = await fetch(`/api/workExperience/${params.id}`);
                const data = await response.json();
                setWorkExperience(data.workExperience);
              } catch (error) {
                console.error("Error fetching work experiences:", error);
              }
        }
        getExperience();
    }, [])
    
    return(
        <>
            <div className="mt-5 flex flex-col items-center">
                <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Work Experience Detail</h1>
                <a
                    href={"/"}
                    className="mt-5 block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <div className="flex flex-col items-center">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{workExperience.jobTitle}</h5>
                        <h5 className="mb-2 text-xl font-italic text-gray-700 dark:text-gray-400">
                            {workExperience.companyName} - {workExperience.startMonth} {workExperience.startYear} to {workExperience.endMonth} {workExperience.endYear}
                        </h5>
                    </div>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {workExperience.description}
                    </p>
                </a>
            </div>
        </>
    )
}