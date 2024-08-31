import getUserData from "@/action/getUserData";
import { redirect } from "next/navigation";

export default async function Home() {
  const { data: user, error } = await getUserData();
  if (error || !user) {
    return redirect("/auth");
  } else if (user.status === "onBoarding") {
    return redirect("/on-boarding");
  } else if (!user.groups || user.groups.length === 0) {
    return redirect("/group/create");
  } else {
    const groupId = user.groups[0];
    return redirect(`/group/${groupId}`);
  }
}
