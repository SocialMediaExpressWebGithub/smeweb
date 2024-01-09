
// import { CategoryType } from "@/types";
// import Link from "next/link";

// const getCategories = async (): Promise<CategoryType[] | null> => {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`)
//         if (res.status == 200) {
//             const dbres = await res.json();
//             return dbres.category_data;
//         }
//     } catch (error) {
//         console.log("categories error:", error)
//     }
//     return null
// }
// export default async function CategoryBar() {
//     const categoryData = await getCategories();

//     return (
//         <div className="flex gap-1 text-sm flex-wrap border-b-4 border-t-4 top-2 bottom-2">
//             <Link className="px-1.5 py-1.5 rounded-md cursor-pointer" href={`${process.env.NEXT_PUBLIC_URL}`}><span className="hover:underline font-semibold">Home</span></Link>
//             {categoryData && categoryData.map((category: CategoryType) => (
//                 <Link className="px-1.5 py-1.5 rounded-md cursor-pointer" key={category.id} href={`/category/${category.catName}`}><span className="hover:underline font-semibold">{category.catName}</span></Link>
//             ))}
//         </div>
//     );
// }


"use client"
import { CategoryType } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

const getCategories = async (): Promise<CategoryType[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`);
    if (res.status === 200) {
      const dbres = await res.json();
      return dbres.category_data;
    }
  } catch (error) {
    console.log("categories error:", error);
  }
  return null;
};

export default function CategoryBar() {
  const [categoryData, setCategoryData] = useState<CategoryType[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      if (data) {
        setCategoryData(data);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex gap-1 text-sm flex-wrap border-b-4 border-t-4 top-2 bottom-2">
      <Link className="px-1.5 py-1.5 rounded-md cursor-pointer" href={`${process.env.NEXT_PUBLIC_URL}`}>
        <span className="hover:underline font-semibold">Home</span>
      </Link>
      {categoryData &&
        categoryData.map((category: CategoryType) => (
          <Link className="px-1.5 py-1.5 rounded-md cursor-pointer" key={category.id} href={`/category/${category.catName}`}>
            <span className="hover:underline font-semibold">{category.catName}</span>
          </Link>
        ))}
    </div>
  );
}
