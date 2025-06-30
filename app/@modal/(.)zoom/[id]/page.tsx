"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
      <DialogContent className='max-h-[85%] z-500 py-10 px-5 overflow-y-scroll overflow-x-hidden scrollbar-hide '>
        {/* <Image alt={id} src={`/${id}.png`} fill /> */}
        <div>{id}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Page;
