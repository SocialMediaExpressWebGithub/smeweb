"use client"
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const deleteImage = async (publicId: string) => {
    const res = await fetch("/api/removeImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news?"
    );

    if (confirmed) {
      try {
        const res = await fetch(`/api/news/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (res.ok) {
          const post = await res.json();
          const { publicId } = post;
          await deleteImage(publicId);

          toast.success("News deleted successfully");
          router.refresh();
        }else{
          toast.error("Something went wrong.");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <button name="delete" onClick={handleDelete} className="btn bg-red-500">Delete</button>
  );
}