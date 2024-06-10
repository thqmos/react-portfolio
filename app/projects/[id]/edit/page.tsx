'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import EditProjectForm from '@/components/EditProjectForm';

const getProject = async (id: string) => {
  try {
    const response = await fetch(`/api/projects/${id}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

function EditProject() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const data = await getProject(params.id);
      if (data) {
        setProject(data.project);
      }
    };
    fetchProject();
  }, [params.id]);

  if (!project) {
    return <div>Loading...</div>; // Add a loading state to handle the case where data is being fetched
  }

  return <EditProjectForm id={params.id} project={project} />;
}

export default EditProject;
