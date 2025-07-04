"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsers } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const Page = () => {
  const [users, setUsers] = useState<Iprofiles[]>([]);
  const [loading, setLoading] = useState(true);
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
    <main className='container py-10 mx-auto'>
      <div className='flex justify-center gap-2'>
        <Link className='bg-muted p-2 px-4 group h-8 w-12 relative rounded-2xl' href={"/"}>
          <span className='group-hover:-translate-x-1 right-1/2 translate-x-1/2 top-1/2 font-bold -translate-y-1/2 duration-200 absolute'>{"<"}</span>
        </Link>
        <h1 className='font-bold gap-2 text-3xl text-center mb-10'>Users</h1>
      </div>
      <div className='flex gap-4 flex-wrap justify-center'>
        {loading && <div>Fetching Data...</div>}

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
              <CardContent className='flex gap-1'>
                {u.genshin ? <Badge variant='default'>{u.genshin}Genshin</Badge> : ""}
                {u.honkai_3 ? <Badge variant='default'>{u.honkai_3}Honkai</Badge> : ""}
                {u.honkai_star_rail ? <Badge variant='default'>{u.honkai_star_rail}Star Rail</Badge> : ""}
              </CardContent>
            </Card>
          ))}
      </div>
    </main>
  );
};

export default Page;
