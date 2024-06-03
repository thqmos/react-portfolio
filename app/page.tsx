'use client'
import Image from "next/image";
import { useRouter} from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  
  const router = useRouter();
  const [workExperiences, setWorkExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      //Work experience stuff
      try {
        const response = await fetch("/api/workExperience");
        const data = await response.json();
        setWorkExperiences(data.workExperiences); // assuming the API returns { workExperiences: WorkExperience[] }
      } catch (error) {
        console.error("Error fetching work experiences:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
      <h1 className="mb-2 mt-5 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Nathan Wessel</h1>
      <h1 className="mb-2 mt-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Work Experience</h1>
        {workExperiences.map(work => (
          <a
            href={`/experience/${work._id}`}
            key={work._id}
            className="mt-5 block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="flex flex-col items-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{work.jobTitle}</h5>
              <h5 className="mb-2 text-xl font-italic text-gray-700 dark:text-gray-400">
                {work.companyName} - {work.startMonth} {work.startYear} to {work.endMonth} {work.endYear}
              </h5>
            </div>
          </a>
        ))}
        <button onClick={() => router.push("/experience")} className="mt-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Work Experience</button>
      </div>
    </>
  );
}
