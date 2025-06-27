"use server";
import { User } from "@/model/user";
import { connectMongodb } from "./mongo";
import { parseStringfy } from "./utils";

export type IgameName = "genshin" | "honkai_star_rail" | "honkai_3" ;

export const getUsers = async (id?: string) => {
  try {
    await connectMongodb();
    let data;
    if (id) {
      data = await User.findOne({ _id: id }).sort({ updatedAt: -1 });
    } else {
      data = await User.find().sort({ updatedAt: -1 });
    }
    console.log("🚀 ~ getUsers ~ data:", data);
    return parseStringfy(data);
  } catch (error) {
    console.log("🚀 ~ getUsers ~ error:", error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectMongodb();
    const data = await User.deleteOne({ _id: id });
    return parseStringfy(data);
  } catch (error) {
    console.log("🚀 ~ getUsers ~ error:", error);
  }
};

export const editUser = async (id: string, profile: Iprofiles) => {
  try {
    await connectMongodb();
    const data = await User.findByIdAndUpdate(id, profile, { new: true, runValidators: true });
    return parseStringfy(data);
  } catch (error) {
    console.log("🚀 ~ getUsers ~ error:", error);
  }
};

export const addUsers = async (profile: Iprofiles) => {
  await connectMongodb();
  return await User.create({
    token: profile.token,
    genshin: profile.genshin,
    honkai_star_rail: profile.honkai_star_rail,
    honkai_3: profile.honkai_3,
    accountName: profile.accountName,
  });
};

const urlDict: Record<IgameName, string> = {
  genshin: "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481",
  honkai_star_rail: "https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311",
  honkai_3: "https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111",
};

export const autoSignFunction = async ({ token, genshin, honkai_star_rail, honkai_3, accountName }: Iprofiles) => {
  const urls: string[] = [];

  if (genshin) urls.push(urlDict.genshin);
  if (honkai_star_rail) urls.push(urlDict.honkai_star_rail);
  if (honkai_3) urls.push(urlDict.honkai_3);

  const header = {
    Cookie: token,
    Accept: "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
    "x-rpc-app_version": "2.34.1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "x-rpc-client_type": "4",
    Referer: "https://act.hoyolab.com/",
    Origin: "https://act.hoyolab.com",
  };

  const options = {
    method: "POST",
    headers: header,
    muteHttpExceptions: true,
  };

  const response = {
    accountName: accountName,
    genshin: "",
    honkai_star_rail: "",
    honkai_3: "",
  };
  const httpResponses = await Promise.all(urls.map((url) => fetch(url, options as RequestInit)));
  await Promise.all(
    httpResponses.map(async (r, i) => {
      const responseJson = await r.json();
      console.log("🚀 ~ httpResponses.map ~ responseJson:", responseJson);
      const bannedCheck = responseJson.data?.gt_result?.is_risk;

      // Menemukan nama game berdasarkan url
      const gameName = Object.keys(urlDict).find((key) => {
        const typedKey = key as IgameName;
        return urlDict[typedKey] === urls[i];
      });

      if (bannedCheck) {
        response[gameName as IgameName] = `Auto check-in failed due to CAPTCHA blocking.`;
      } else {
        response[gameName as IgameName] = `${responseJson.retcode == -5003 ? "✅ " + responseJson.message : "❎ " + responseJson.message}`;
      }
    })
  );
  return response;
};
