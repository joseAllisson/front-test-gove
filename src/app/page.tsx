import { redirect } from "next/navigation";

export default function Home() {
  redirect('/usuarios');

  return (
    <div>
      Home
    </div>
  );
}
