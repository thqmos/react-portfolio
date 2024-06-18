import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from '@/libs/auth';

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

    return <RegisterForm />;
}