import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formattedDate = (date: number) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
export const parseStringfy = (items: unknown) => JSON.parse(JSON.stringify(items));

export const paginateData = (items:string[], currentPage: number, itemsPerPage: number) => {
  if (items){
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const currentItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return { items: currentItems, totalPages: totalPages };
  }
};
