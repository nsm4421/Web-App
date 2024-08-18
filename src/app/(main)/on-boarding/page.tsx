import getUserData from "@/action/getUserData";
import OnBoardingForm from "@/components/on-boarding/onBoardingForm";
import Typography from "@/components/ui/typography";

export default async function OnBoardingPage() {
  const user = await getUserData();
  return (
    <main className="px-3 py-10">
      <Typography variant="h5" text="On Boarding" />

      <OnBoardingForm user={user!} />
    </main>
  );
}
