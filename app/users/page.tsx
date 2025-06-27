"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUsers } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { Badge } from "@/components/ui/badge";


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
      <h1 className='font-bold text-3xl text-center mb-10'>Users</h1>
      <div className="flex gap-4 flex-wrap justify-center">
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
              <CardContent>
                {u.genshin ? <Badge variant='outline'>{u.genshin}Genshin</Badge> : ""}
                {u.honkai_3 ? <Badge variant='outline'>{u.honkai_3}Honkai</Badge> : ""}
                {u.honkai_star_rail ? <Badge variant='outline'>{u.honkai_star_rail}Star Rail</Badge> : ""}
              </CardContent>
            </Card>
          ))}
      </div>
    </main>
  );
};

export default Page;
