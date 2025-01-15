import Leftbar from "@/components/dashboard/leftbar";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center h-full w-full text-white">
      <div className="flex-shrink-0 flex-grow-0 basis-[15%] max-w-[15%] h-screen border-r border-gray-300/20">
        <Leftbar />
      </div>
      <div className="flex-shrink-0 flex-grow-0 basis-[85%] max-w-[85%] h-screen py-6">
        {children}
      </div>
    </div>
  );
}
