import { redirect } from "next/navigation";

// Always redirect to login - middleware handles auth
export default function Home() {
  redirect("/login");
}
