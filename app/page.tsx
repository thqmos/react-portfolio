'use client'

import Image from "next/image";
import { useRouter} from "next/navigation";

export default function Home() {

  const router = useRouter();


  return (
    <>
      <button onClick={() => router.push("/experience")}>Add Work Experience</button>
    </>
  );
}
