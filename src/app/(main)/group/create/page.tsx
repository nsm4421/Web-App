import CreateGroupForm from "@/components/group/create/createGroupForm";
import CreateGroupStepIndicator from "@/components/group/create/createGroupStepIndicator";

export default function CreateGroupPage() {
  return (
    <main className="w-screen h-screen grid place-content-center bg-neutral-100">
      <div className="max-w-[600px] px-5 py-2 mx-auto my-auto">
        <CreateGroupStepIndicator />
        <CreateGroupForm />
      </div>
    </main>
  );
}
