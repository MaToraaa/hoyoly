"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };
  const { id } = React.use(params);

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogContent className='max-h-[85%] max-w-fit z-500 py-10 overflow-y-scroll scrollbar-hide '>
        <DialogTitle className="bg-muted rounded-2xl w-min p-3">https://hoyoly.vercel.app/{id}.png</DialogTitle>
        <Image alt={id} className="w-max h-max" src={`/${id}.png`} width={5000} height={5000} />
        {/* <div>{id}</div> */}
      </DialogContent>
    </Dialog>
  );
};

export default Page;
