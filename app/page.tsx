"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsers } from "@/lib/actions";
import moment from "moment";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FormProfile from "@/components/FormProfile";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  type Ifaq = {
    q: string;
    a: string | React.ReactNode;
  };
  const faq: Ifaq[] = [
    {
      q: "Is this safe?",
      a: "There should be no issues, automated check-in exists for years and there hasn't been any reports about hoyo doing anything against it",
    },
    {
      q: "How To Get ITUID and ITOKEN?",
      a: (
        <p>
          If you need instruction about how to get ITUID and ITOKEN u could <Button onClick={() => setOpen(true)}>Click On Here</Button>
        </p>
      ),
    },
    {
      q: "Error not logged in",
      a: (
        <p>
          This is a common issue even if you seem to get the cookies right. Here&apos;s another method to get your cookies :{" "}
          <a className='text-indigo-700 underline' href='https://gist.github.com/torikushiii/59eff33fc8ea89dbc0b2e7652db9d3fd'>
            https://gist.github.com/torikushiii/59eff33fc8ea89dbc0b2e7652db9d3fd
          </a>
          Just copy everything and paste to the COOKIE secret{" "}
        </p>
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<Iprofiles[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await getUsers();
        setUsers(res);
      } catch (error) {
        console.log("🚀 ~ getData ~ error:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className='p-10'>
          <DialogHeader>
            <DialogTitle>Way u can get TOKEN</DialogTitle>
            <DialogDescription>awawawa</DialogDescription>
          </DialogHeader>
          <div className='flex justify-center translate-x-3 overflow-ellipsis'>
            <ol className='list-decimal space-y-4'>
              <li>Open HoYoLAB and login if you haven&apos;t (obviously)</li>
              <li>Open dev tool (Press f12 or right click then Inspect)</li>
              <li>
                For Chromium users, click on the Application tab. If not found, click on the arrow.
                <br /> For Firefox/Gecko-based browsers, click on the Storage tab.
              </li>
              <li>On the filter box, type v2. You might want to expand the dev tools to see clearly.</li>
              <li>Find ltoken_v2 and ltuid_v2, click on them, and copy the value below.</li>
            </ol>
          </div>
        </DialogContent>
      </Dialog>

      <div className='h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center'>
        {/* Radial gradient for the container to give a faded look */}
        <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
        <p className='text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-slate-500 to-neutral-500 py-8'>
          Auto Hoyolab Daily <span className='bg-transparent text-white'>✅</span>
        </p>
        <FormProfile />
      </div>
      <div className='container mx-auto p-5 py-20'>
        <h2 className='text-4xl font-mono'>FAQ</h2>
        {faq &&
          faq.map((f: Ifaq, i) => (
            <Accordion key={i} type='single' collapsible>
              <AccordionItem value={`item-${i}`}>
                <AccordionTrigger className='text-lg'>{f.q}</AccordionTrigger>
                <AccordionContent className='text-base whitespace-pre-wrap'>{f.a}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
      </div>
      <div className='flex gap-10 flex-col items-center justify-center py-20 px-10 bg-neutral-50'>
        <div className='text-center'>
          <h2 className='text-4xl font-mono'>Our User</h2>
          <p>( {users?.length || 0} )</p>
        </div>
        <div className='flex gap-4 flex-wrap justify-center'>
          {loading && (
            <div>
              Loading...
            </div>
          )}
          {users &&
            users.map((u, i) => (
              <Card key={i}>
                <CardHeader className='pb-2 flex flex-row gap-2'>
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>GI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{u.accountName}</CardTitle>
                    <CardDescription>{moment(u.createdAt).format("MMMM Do")}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {u.genshin ? <Badge variant='outline'>{u.genshin}Genshin</Badge> : ""}
                  {u.honkai_3 ? <Badge variant='outline'>{u.honkai_3}Honkai</Badge> : ""}
                  {u.honkai_star_rail ? <Badge variant='outline'>{u.honkai_star_rail}Star Rail</Badge> : ""}
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
