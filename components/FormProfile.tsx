"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { autoSignFunction, deleteUser, editUser, getUsers } from "@/lib/actions";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const FormProfile = ({ edit, id }: { edit?: boolean; id?: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setisOpen] = useState({
    first: false,
    second: false,
    third: false,
  });
  const [error, setError] = useState("");
  const [token, setToken] = useState({
    itoken: "",
    ituid: "",
  });
  const [response, setResponse] = useState<Iresponses>();
  const [profile, setProfile] = useState<Iprofiles>({
    accountName: "",
    token: "",
    genshin: false,
    honkai_3: false,
    honkai_star_rail: false,
  });
  const [term, setTerm] = useState({
    term1: false,
    term2: false,
  });

  const handleDelete = async () => {
    const status = await deleteUser(id!);
    console.log("🚀 ~ handleDelete ~ status:", status)
    toast.error("Profile Deleted");
    redirect('/')
  };
  const handleSave = async () => {
    if (edit) {
      try {
        await editUser(id!, profile);
      } catch (error) {
        console.log("🚀 ~ handleSave ~ error:", error);
        toast.error("Oops", {
          description: "There has a problem",
        });
      }
    } else {
      try {
        setIsLoading(true);
        const res = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Tentukan tipe konten
          },
          body: JSON.stringify(profile),
        });
        const status = await res.json();
        setProfile({ ...profile, _id: status.message._id });
      } catch (error) {
        console.log("🚀 ~ handleSave ~ error:", error);
        toast.error("Oops", {
          description: "There has a problem",
        });
      }
    }
    setIsLoading(false);
    setisOpen({ ...isOpen, first: false, second: false, third: true });
    toast.success("Success", {
      description: "Your Profile has been saved, Now you can see the result every day",
    });
  };
  const checkError = () => {
    if (!profile.genshin && !profile.honkai_3 && !profile.honkai_star_rail) {
      setIsLoading(true);
      setError("Check atleast on game!");
    } else if (!profile.accountName) {
      setError("Fill Your Account Name");
      setIsLoading(true);
    } else if (!token.itoken || !token.ituid) {
      setError("Input Your Token");
    } else {
      setIsLoading(false);
      setError("");
      return true
    }
  };
  useEffect(() => {
    const getUser = async () => {
      const res = await getUsers(id);
      setProfile(res);
    };
    if (edit && !profile.accountName) {
      getUser();
    }
    if (error) {
      checkError();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, profile]);

  useEffect(() => {
    setProfile({ ...profile, token: `ltoken_v2=${token.itoken};ltuid_v2=${token.ituid}` });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleCopy = async () => {
    navigator.clipboard.writeText(profile._id!);
    toast.success("ID COPIED :)");
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const passed = await checkError()
      if (passed) {
        const res = await autoSignFunction({ accountName: profile.accountName, token: profile.token, genshin: profile.genshin, honkai_3: profile.honkai_3, honkai_star_rail: profile.honkai_star_rail });
        console.log("🚀 ~ handleSubmit ~ res:", res);
        setResponse(res);
      }
    } catch (error) {
      console.log("🚀 ~ Home ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Dialog onOpenChange={() => setisOpen({ ...isOpen, first: !isOpen.first })} open={edit || isOpen.first}>
        {!edit && <DialogTrigger className='text-xl transition-all duration-300 text-primary bg-background p-2 px-4 rounded-4xl font-bold hover:bg-foreground/10'>Add Account &gt;</DialogTrigger>}
        <DialogContent className="px-4">
          {edit && (
            <div className='absolute right-4 z-50 top-4'>
              <div className='bg-green-600 w-4 h-4 rounded-full'></div>
            </div>
          )}
          <DialogHeader>
            {edit && (
              <Link href={"/"} className='flex items-center gap-2'>
                <ArrowLeftIcon /> Back
              </Link>
            )}
            <DialogTitle>{edit ? "Edit Your Id" : "Add Your Account"}</DialogTitle>
            <DialogDescription>Make your daily more easier with automation!</DialogDescription>
          </DialogHeader>{" "}
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-4'>
                <Input required value={profile.accountName} onChange={(e) => setProfile({ ...profile, accountName: e?.target?.value })} id='name' placeholder='UserName' />
                <div className='flex gap-3'>
                  <Input required value={token.itoken} onChange={(e) => setToken({ ...token, itoken: e?.target?.value })} id='token' placeholder='ltoken_v2' />
                  <Input required value={token.ituid} onChange={(e) => setToken({ ...token, ituid: e?.target?.value })} id='token2' placeholder='ltuid_v2' />
                </div>
                <div className='flex items-center space-x-2'>
                  <Switch checked={profile.genshin} onCheckedChange={(checked) => setProfile({ ...profile, genshin: checked })} id='genshin' />
                  <Label htmlFor='genshin'>Genshin</Label>
                  {response?.genshin && <p className='text-sm bg-slate-200 p-2 rounded-lg'> {response?.genshin}</p>}
                </div>
                <div className='flex items-center space-x-2'>
                  <Switch checked={profile.honkai_3} onCheckedChange={(checked) => setProfile({ ...profile, honkai_3: checked })} id='Honkai-3' />
                  <Label htmlFor='Honkai-3'>Honkai_3</Label>
                  {response?.honkai_3 && <p className='text-sm bg-slate-200 p-2 rounded-lg'> {response?.honkai_3}</p>}
                </div>
                <div className='flex items-center space-x-2'>
                  <Switch checked={profile.honkai_star_rail} onCheckedChange={(checked) => setProfile({ ...profile, honkai_star_rail: checked })} id='hsr' />
                  <Label htmlFor='hsr'>Honkai Star Rail</Label>
                  {response?.honkai_star_rail && <p className='text-sm bg-slate-200 p-2 rounded-lg'> {response?.honkai_star_rail}</p>}
                </div>
              </div>
            </div>
          </form>
          {error && <p className='text-destructive text-sm'>{error}</p>}
          <div className='flex gap-2'>
            {edit && (
              <Button className='flex flex-1' onClick={edit ? handleDelete : handleSubmit} disabled={isLoading}>
                Delete
              </Button>
            )}
            <Button className='flex flex-1' onClick={handleSubmit} disabled={isLoading}>
              {response && "Re-"}Submit
            </Button>
            {response && (
              <Button className='flex flex-1' onClick={() => setisOpen({ ...isOpen, second: true })} variant={"outline"} disabled={isLoading}>
                Save
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog key={2} onOpenChange={() => !isLoading && setisOpen({ ...isOpen, second: false })} open={isOpen.second}>
        <DialogContent className='flex flex-col gap-5'>
          <DialogHeader>
            <DialogTitle>Term & Condition</DialogTitle>
            <DialogDescription>Please Read it for a moment</DialogDescription>
          </DialogHeader>
          <div className='items-top flex space-x-2'>
            <Checkbox checked={term.term1} onCheckedChange={(checked) => setTerm({ ...term, term1: checked as boolean })} id='terms1' />
            <div className='grid gap-1.5 leading-none'>
              <label htmlFor='terms1' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                After You Click this confirm button you will get your unique link for sometimes maybe you want to edit your details, and we hope you can keep it safely
              </label>
              <p className='text-sm text-muted-foreground'>Since we dont use sign in method so maybe it helpfull</p>
            </div>
          </div>
          <div className='items-top flex space-x-2'>
            <Checkbox checked={term.term2} onCheckedChange={(checked) => setTerm({ ...term, term2: checked as boolean })} id='terms2' />
            <div className='grid gap-1.5 leading-none'>
              <label htmlFor='terms2' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Accept terms and conditions
              </label>
              <p className='text-sm text-muted-foreground'>
                You agree to our
                <Link className='underline tracking-widest' href={"/tos"}>
                  {" "}
                  Terms of Service{" "}
                </Link>
                and
                <Link className='underline tracking-widest' href={"/policy"}>
                  {" "}
                  Privacy Policy.
                </Link>
              </p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={!term.term1 || !term.term2 || isLoading}>
            Confirm
          </Button>
          <Button disabled={isLoading} onClick={() => setisOpen({ ...isOpen, second: false })} variant={"outline"} className='w-full'>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        key={3}
        open={isOpen.third}
        onOpenChange={() => {
          router.push("/");
          setisOpen({ ...open, first: false, second: false, third: false });
        }}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader className=''>
            <DialogTitle>Success</DialogTitle>
            <DialogDescription>Keep it steady your unique link to edit ur profile if needed.</DialogDescription>
            <Image alt='Success' src={"/success.gif"} height={400} width={400} />
          </DialogHeader>
          <div className='flex flex-col gap-1 pb-4'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant={"outline"} onClick={handleCopy} className='relative cursor-pointer rounded-xl text-neutral-500 z-50 w-full'>
                    {profile._id ?? "Id Expired, Delete and try again"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click To Copy</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <DialogFooter className="flex gap-3">
            <Button onClick={() => router.push("/")} className='flex flex-1'>
              Continue
            </Button>
            <Button variant={"outline"} onClick={() => router.push(`/${profile._id}`)} className='flex flex-1'>
              Visit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormProfile;
