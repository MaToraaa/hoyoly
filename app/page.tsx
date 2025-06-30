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
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
          If you need instruction about how to get ITUID and ITOKEN u could{" "}
          <Button variant={"outline"} size={"sm"} onClick={() => setOpen(true)}>
            Click On Here
          </Button>
        </p>
      ),
    },
    {
      q: "Error not logged in",
      a: (
        <p>
          This is a common issue even if you seem to get the cookies right. Here&apos;s another method to get your cookies :{" "}
          <a className='text-blue-400 underline' href='https://gist.github.com/torikushiii/59eff33fc8ea89dbc0b2e7652db9d3fd'>
            https://gist.github.com/torikushiii/59eff33fc8ea89dbc0b2e7652db9d3fd
          </a><br />
          Just copy everything and paste to the COOKIE secret{" "}
        </p>
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<Iprofiles[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
        <DialogContent className='dialog-zoom-container px-4 md:p-10 max-h-[80vh] overflow-y-scroll scrollbar-hide'>
          <DialogHeader>
            <DialogTitle>Way u can get TOKEN</DialogTitle>
            <DialogDescription>awawawa</DialogDescription>
          </DialogHeader>
          <div className='flex justify-center translate-x-3 overflow-ellipsis'>
            <ol className='list-decimal list-outside ml-2 [&>li]:mt-2'>
              <li>
                Go to&nbsp;
                <Link className='underline text-blue-400' href={"https://www.hoyolab.com/home"}>
                  HoYoLAB Official Website
                </Link>
                &nbsp;and login if you haven&apos;t (obviously)
                <Link className="cursor-zoom-in" href={"/zoom/h1"}>
                  <Image className='rounded-2xl' width={200} height={200} alt='image1' src={"/h1.png"} />
                </Link>
              </li>
              <li>Open dev tool (Press f12 or right click then Inspect)</li>
              <Link className="cursor-zoom-in" href={"/zoom/h2"}>
                <Image className='rounded-2xl' width={200} height={200} alt='image2' src={"/h2.png"} />
              </Link>

              <li>
                For Chromium users, click on the Application tab. If not found, click on the arrow.
                <br /> For Firefox/Gecko-based browsers, click on the Storage tab.
                <Link className="cursor-zoom-in" href={"/zoom/h3"}>
                  <Image className='rounded-2xl' width={200} height={200} alt='image3' src={"/h3.png"} />
                </Link>
              </li>
              <li>On the side bar expand the cookies tab and click on hoyolab.com</li>
                <Link className="cursor-zoom-in" href={"/zoom/h4"}>
                  <Image className='rounded-2xl' width={200} height={200} alt='image4' src={"/h4.png"} />
                </Link>
              <li>Find ltoken_v2 and ltuid_v2, click on them, and copy the value.</li>
            </ol>
          </div>
        </DialogContent>
      </Dialog>

      <div className='min-h-screen  w-full relative flex pb-10 px-20 max-md:px-4 flex-col '>
        <nav className=''>
          <h1 className='text-primary flex items-center gap-1 text-4xl z-50 my-3 p-2 px-4 w-fit font-extrabold tracking-wide bg-background rounded-2xl'>
            <Image src={"/hoyolab.gif"} alt='Hoyolab' className='rounded-4xl' width={50} height={50} />
            Hoyoly
          </h1>
        </nav>

        {/* Radial gradient for the container to give a faded look */}
        <div className='absolute -z-10 pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>

        <main className='grid grid-cols-4 gap-4 max-lg:flex max-md:flex-col'>
          <div className='col-span-3'>
            <Card className='col-start-3 h-full'>
              <CardContent className='grid gap-2 p-4'>
                <h1 className='text-4xl sm:text-6xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-slate-500 to-neutral-500 pt-8'>Welcome to Hoyoly ツ</h1>
                <p className='text-muted-foreground text-base'>Your best Hoyoverse Support!</p>
                <h2 className='font-bold text-2xl py-2'>How to use?</h2>
                <p>Hoyoly helps you to automate your daily sign in with only using your cookies and then help you sign in every single day ✅.</p>
                <ul className='space-y-1'>
                  <li>◇ Log in to hoyolab official site and receive your token</li>
                  <li>◇ Press add button below</li>
                  <li>◇ Paste your Token and put on form</li>
                  <li>◇ Voila its done.</li>
                </ul>
                <div className='py-2'>
                  <FormProfile />
                </div>
                <h2 className='font-bold text-2xl py-2'>How does it works?</h2>
                <p className="md:max-w-4xl">Everytime u press sign in on hoyolab will sending request to their API, Hoyoly do the same thing, we use your cookie so pretend like you and sending request to their api, we use Google Apps Script to schedule it every 03:00(utc+8)  </p>
                <h2 className='font-bold text-2xl py-2'>How to update my data?</h2>
                <p>By put your unique &quot;id&quot; in end of our domain &quot;/&quot;, you can see detail your profile. You can also delete or update your profile.</p>
              </CardContent>
            </Card>
          </div>

          <div className='col-span-1 grid gap-4'>
            <Card className='min-w-sm'>
              <CardHeader>
                <CardTitle className=''>Users</CardTitle>
                <CardDescription>People that use our services</CardDescription>
              </CardHeader>
              <CardContent className='grid gap-2'>
                {loading && <div>Fetching Data...</div>}
                {users &&
                  users.slice(0, 5).map((u, i) => (
                    <div className='flex gap-2' key={i}>
                      <Avatar>
                        <AvatarImage src='https://github.com/shadcn.png' />
                        <AvatarFallback>GI</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className='mr-1 font-bold '>{u.accountName}</span>
                        {u.honkai_3 ? (
                          <Badge className='text-primary' variant='secondary'>
                            {u.honkai_3}Honkai
                          </Badge>
                        ) : (
                          ""
                        )}
                        {u.honkai_star_rail ? (
                          <Badge className='text-primary' variant='secondary'>
                            {u.honkai_star_rail}Star Rail
                          </Badge>
                        ) : (
                          ""
                        )}
                        {u.genshin ? (
                          <Badge className='text-primary' variant='secondary'>
                            {u.genshin}Genshin
                          </Badge>
                        ) : (
                          ""
                        )}
                        <CardDescription>{moment(u.createdAt).format("MMMM Do")}</CardDescription>
                      </div>
                    </div>
                  ))}
                <Button variant={"outline"} onClick={() => router.push("/users")} className='mt-3 font-bold'>
                  See all users &gt;
                </Button>
              </CardContent>
            </Card>

            <Card className='min-w-sm'>
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
                <CardDescription>Frequently Question</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type='single' collapsible className='w-full' defaultValue='item-0'>
                  {faq &&
                    faq.map((f: Ifaq, i) => (
                      <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger className='font-bold tracking-wide'>{f.q}</AccordionTrigger>
                        <AccordionContent className=' whitespace-pre-line'>{f.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className='mt-3 flex max-md:flex-col gap-3 justify-between'>
          <p className='font-bold'>
            Hoyoly is not affiliated with HoYoverse nor Hoyolab.
            <br /> Genshin Impact, any game content and materials are trademarks and copyrights of HoYoverse.
          </p>
          <p>
            <Link className='hover:underline text-muted-foreground font-bold text-sm' href={"/tos"}>
              {" "}
              Terms of Service{" "}
            </Link>
            <br />
            <Link className='hover:underline text-muted-foreground font-bold text-sm' href={"/policy"}>
              {" "}
              Privacy Policy.
            </Link>
          </p>
        </footer>
      </div>

      {/* <div className='flex gap-10 flex-col items-center justify-center py-20 px-10 bg-neutral-50'>
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
      </div> */}
    </>
  );
}
