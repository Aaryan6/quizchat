import Link from "next/link";

import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "../supabase-server";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;

  return (
    <div className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle className='text-center'>Welcome to Quizmify</CardTitle>
          <CardDescription className='text-center pt-2'>
            Quizmify is a platform for creating quizzes using AI.{" "}
          </CardDescription>
        </CardHeader>
        <div className='flex justify-center pb-4'>
          {user ? (
            <Button asChild>
              <Link href={"/"}>
                Continue to dashboard <MoveRight className='ml-2' />
              </Link>
            </Button>
          ) : (
            <Button asChild variant={"outline"}>
              <Link href={"/signin"}>Sign In</Link>
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
