'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState, MouseEvent } from 'react'

export default function View() {

    const params = useParams<{ id: string }>();
    const [project, setProject] = useState<any>([]);
    const router = useRouter();


    useEffect(() => {
        async function getProject() {
            try {
                const response = await fetch(`/api/projects/${params.id}`);
                const data = await response.json();
                setProject(data.project);
              } catch (error) {
                console.error("Error fetching project:", error);
              }
        }
        getProject();
    }, [params.id])

    async function deleteProject(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const confirmed = confirm("Are you sure?");
        if (confirmed) {
            const res = await fetch(`/api/projects?id=${params.id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.push("/")
                router.refresh();
            }
        }
    };

    return(
        <>
            <div className="mt-5 flex flex-col items-center">
                <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Project Detail</h1>
                <a
                    href={"/"}
                    key={project._id}
                    className="mt-5 block max-w-xl p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                    <div className="flex flex-col items-center">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.title}</h5>
                        <h5 className="mb-2 text-xl font-italic text-gray-700 dark:text-gray-400">
                            {project.associatedWith} - {project.startMonth} {project.startYear} to {project.endMonth} {project.endYear}
                        </h5>
                    </div>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {project.description}
                    </p>
                    <button onClick={() => router.push(`/projects/${params.id}/edit`)} className="mt-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit</button>
                    <button onClick={(e) => deleteProject(e)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button>
                </a>
            </div>
        </>
    )
    }