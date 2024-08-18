"use client";

import { useRef, useState } from "react";
import { Input } from "../ui/input";
import { UserModel } from "@/types/auth";
import Typography from "../ui/typography";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import OnBoardingAction from "@/action/onBoarding";

interface Props {
  user: UserModel;
}

const countries = [
  { value: "kr", label: "South Korea", emoji: "🇰🇷" },
  { value: "us", label: "United States", emoji: "🇺🇸" },
  { value: "jp", label: "Japan", emoji: "🇯🇵" },
];

export default function OnBoardingForm({ user }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(user?.name ?? "");
  const [country, setCountry] = useState<string>(user?.country ?? "kr");
  const [profileImage, setProfileImage] = useState<File | null>();
  const [previewUrl, setPreviewUrl] = useState<string>(user?.avatar_url ?? "");

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCountry =
    (c: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setCountry(c);
    };

  const handleClickImage = () => ref?.current?.click()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selected = e.target.files;
    if (!selected) {
      return;
    }
    if (selected[0]) {
      setProfileImage(selected[0]);
      setPreviewUrl(URL.createObjectURL(selected[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (!name) {
        toast.warning("username is not given");
        return;
      } else if (!profileImage) {
        const blob = await fetch(user.avatar_url).then(res=>res.blob());
        setProfileImage(new File([blob], 'profile-image', { type: blob.type}));
      }
      await OnBoardingAction({
        name,
        profileImage:profileImage!,
        country,
      });
      router.push("/");
    } catch (error) {
      toast.error("on boarding request failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isLoading} className="shadow-xl py-5 px-3 mx-3">
          <Label htmlFor="onboarding__username" className="p-3">
            <Typography variant="p" text="Username" />
          </Label>
          <Input
            type="text"
            id="onboarding__username"
            placeholder="username"
            value={name}
            onChange={handleUsername}
            className="w-full border-0 border-b-2 border-slate-300 focus:border-slate-500 focus:ring-0 transition-colors duration-300 outline-none px-2 py-1"
          />
        </fieldset>

        <fieldset disabled={isLoading} className="shadow-xl py-5 px-3 mx-3">
          <div>
            <Label htmlFor="onboarding__country" className="px-3">
              <Typography variant="p" text="Where are you from?" />
            </Label>
            <ul id="onboarding__country" className="flex space-x-3 px-3">
              {countries.map((c) => (
                <li
                  key={c.value}
                  className="flex space-x-3 justify-between items-center p-2"
                >
                  <Button
                    onClick={handleCountry(c.value)}
                    className={cn(
                      "flex gap-x-3 rounded-xl",
                      c.value === country &&
                        "bg-teal-600 text-white hover:text-black"
                    )}
                  >
                    <Typography variant="p" text={c.emoji} />
                    {c.value === country && (
                      <Typography variant="p" text={c.label} />
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </fieldset>

        <fieldset disabled={isLoading} className="shadow-xl py-5 px-3 mx-3">
          <div>
            <Label htmlFor="onboarding__avatar" className="px-3">
              <Typography variant="p" text="Select Your Profile Image" />
            </Label>
            <input
              ref={ref}
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
            <img
              onClick={handleClickImage}
              className="w-20 h-20 rounded-full object-cover"
              src={previewUrl}
            />
          </div>
        </fieldset>

        <div className="w-full mx-5 flex justify-center">
          <Button
            variant="secondary"
            className="mt-8 bg-primary-dark rounded-xl max-w-64 hover:bg-primary-dark/90 w-full text-white"
            type="submit"
          >
            <Typography text="SUBMIT" variant="h5" />
          </Button>
        </div>
      </form>
    </section>
  );
}
