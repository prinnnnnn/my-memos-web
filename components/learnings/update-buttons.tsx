"use client";

import { LearningsService } from "@/generated";

/* icons */
import { SiStreamrunners } from "react-icons/si";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

/* hooks */
import { useRouter } from "next/navigation";
import { useState } from "react";

const getGradientStyle = (variant: "start" | "complete") => {
  switch (variant) {
    case "start":
      return "bg-linear-to-r from-[#0077b6] to-[#0096c7] hover:from-[#03045e] hover:to-[#023e8a]";
    case "complete":
      return "bg-linear-to-r from-[#e85d04] to-[#f48c06] hover:from-[#d00000] hover:to-[#c9184a]";
    default:
      return "";
  }
};

export const StartLearningItemButton = ({ itemId }: { itemId: number }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await LearningsService.startLearningItem(itemId);
      router.refresh();
    } catch (error) {
      console.error(`error starting learning item: `, error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`text-white rounded-full p-2 ${getGradientStyle("start")}`}
      disabled={loading}
    >
      <SiStreamrunners className="inline" size={32}/>
    </button>
  );
}

export const CompleteLearningItemButton = ({ itemId }: { itemId: number }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await LearningsService.completeLearningItem(itemId);
      router.refresh();
    } catch (error) {
      console.error(`error completing learning item: `, error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`text-white rounded-full p-2 ${getGradientStyle("complete")}`}
      disabled={loading}
    >
      <IoCheckmarkDoneCircle className="inline" size={32} />
    </button>
  );
}