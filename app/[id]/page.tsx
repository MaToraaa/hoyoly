"use client";
import FormProfile from "@/components/FormProfile";
import { getUsers } from "@/lib/actions";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const param = useParams<{ id: string }>();
  console.log("🚀 ~ Page ~ param:", param);
  const [exist, setExist] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const res = await getUsers(param.id);
      if (res != null) setExist(true);
    };
    getUser();
  }, [param.id]);

  return (
    <>
      {exist ? (
        <FormProfile edit={true} id={param.id} />
      ) : (
        <>
          <div className='flex justify-center h-40 items-center tracking-widest font-semibold text-2xl'>Oops Profile Not Found :(</div>
        </>
      )}
    </>
  );
};

export default Page;
