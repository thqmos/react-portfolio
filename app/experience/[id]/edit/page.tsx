'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import EditWorkExperienceForm from '@/components/EditWorkExperienceForm';

const getExperience = async (id: string) => {
  try {
    const response = await fetch(`/api/workExperience/${id}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching work experiences:", error);
    return null;
  }
}

function EditWorkExperience() {
  const params = useParams<{ id: string }>();
  const [workExperience, setWorkExperience] = useState<any>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      const data = await getExperience(params.id);
      if (data) {
        setWorkExperience(data.workExperience);
      }
    };
    fetchExperience();
  }, [params.id]);

  if (!workExperience) {
    return <div>Loading...</div>; // Add a loading state to handle the case where data is being fetched
  }

  return <EditWorkExperienceForm id={params.id} workExperience={workExperience} />;
}

export default EditWorkExperience;
