import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from '@/libs/auth';

export default async function login() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

    return <LoginForm />;
}