"use client";

import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import Modal from "../ui/modal";
import { useForm, useWatch } from "react-hook-form";
import { CreateTaskInput, createTaskSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { TasksService } from "@/generated";
import { gradientsStyles } from "@/lib/theme";
import { TAGS } from "@/lib/constants";

export default function TaskCreate() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      due_date: '',
      tags: [],
    }
  })

  const selectedTags = useWatch<CreateTaskInput>({
    control,
    name: 'tags',
  }) as string[];

  const createTask = async (data: CreateTaskInput) => {
    try {

      setLoading(true);
      await TasksService.createTask({
        ...data,
        ...(data.due_date !== '' && { due_date: new Date(data.due_date).toISOString() }),
      });
      setShowCreateModal(false);

      router.refresh();
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <IoAddCircle
        className="text-gray-600 hover:text-gray-800 cursor-pointer"
        size={22}
        onClick={() => setShowCreateModal(true)}
      />
      {showCreateModal && (
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create New Task"
        >
          <form onSubmit={handleSubmit(createTask)}>
            <div className="mb-4">
              <div className="flex flex-row gap-2 justify-between items-center">
                {/* title */}
                <div className="w-1/2">
                  <label className="block text-lg text-slate-900 font-bold mb-1">Title</label>
                  <input
                    {...register("title")}
                    type="text"
                    id="task-title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-slate-900"
                    placeholder="Enter task title"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>
                {/* due date */}
                <div className="w-1/2">
                  <label className="block text-lg text-slate-900 font-bold mb-1">Due Date</label>
                  <input
                    {...register("due_date")}
                    type="date"
                    id="due-date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-slate-900"
                  />
                  {errors.due_date && <p className="text-red-500 text-sm mt-1">{errors.due_date.message}</p>}
                </div>
              </div>

            </div>
            <div>
              <label className="block text-lg text-slate-900 font-bold mb-1">Description</label>
              <textarea
                {...register("description")}
                rows={4}
                className="mt-1 mb-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-slate-900"
                placeholder="Write your memo here..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            {/* tags form */}
            <div>
              <label className="block text-lg font-semibold text-slate-900">
                Add Tags <span className="text-red-500">*</span>
              </label>
              <fieldset className="mt-2 flex flex-wrap gap-2 items-center">
                {TAGS.map((tag) => {
                  const checked = selectedTags.includes(tag.key);
                  return (
                    <label
                      key={tag.key}
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 cursor-pointer select-none text-sm font-medium transition-shadow ${checked
                        ? "text-white shadow-sm border-transparent"
                        : "text-slate-900 border border-slate-200 hover:bg-slate-50"
                        }`}
                      style={{
                        backgroundColor: checked ? tag.color : '#ffffff',
                      }}
                    >

                      <input
                        type="checkbox"
                        value={tag.key}
                        {...register("tags")}
                        className="sr-only"
                      />

                      <span
                        className={`h-2.5 w-2.5 rounded-full shrink-0 ${tag.color ?? "bg-slate-400"
                          } ${checked ? "ring-1 ring-white/30" : ""}`}
                        aria-hidden
                      />
                      <span>{tag.label}</span>
                    </label>
                  );
                })}
              </fieldset>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg text-white font-bold ${gradientsStyles.main} ${gradientsStyles.hovered}`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Memo'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}