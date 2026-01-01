"use client";

import { TasksService } from "@/generated";

/* icons */
import { SiStreamrunners } from "react-icons/si";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

/* hooks */
import { useRouter } from "next/navigation";
import { useState } from "react";
import { gradientsStyles } from "@/lib/theme";

export const StartTaskButton = ({ taskId }: { taskId: number }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await TasksService.startTask(taskId);
      router.refresh();
    } catch (error) {
      console.error(`error starting task: `, error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`text-white rounded-2xl px-2 py-1 ${gradientsStyles.main} ${gradientsStyles.hovered}`}
      disabled={loading}
    >
      <SiStreamrunners className="inline" />
    </button>
  );
}

export const CompleteTaskButton = ({ taskId }: { taskId: number }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      await TasksService.completeTask(taskId);
      router.refresh();
    } catch (error) {
      console.error(`error completing task: `, error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`text-white rounded-2xl px-2 py-1 ${gradientsStyles.main} ${gradientsStyles.hovered}`}
      disabled={loading}
    >
      <IoCheckmarkDoneCircle className="inline" />
    </button>
  );
}