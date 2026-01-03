"use client";

import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { CreateLearningItemInput, CreateLearningItemSchema } from "@/lib/validator";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ui/modal";
import { TextAreaField, TextField } from "@/components/form/text-field";
import { LearningArea, LearningsService } from "@/generated";
import { gradientsStyles } from "@/lib/theme";
import { useRouter } from "next/navigation";

const ItemCreate = ({ area }: { area: LearningArea }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLearningItemInput>({
    resolver: zodResolver(CreateLearningItemSchema),
    defaultValues: {
      area_id: area.area_id,
      title: '',
      notes: '',
      subtitle: '',
      started_date: Date.now().toString(),
      expected_completion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toString(),
    }
  })

  const onSubmit = async (data: CreateLearningItemInput) => {
    try {
      setLoading(true);
      await LearningsService.createLearningItem({
        ...data,
        started_date: new Date(data.started_date).toISOString(),
        expected_completion: new Date(data.expected_completion).toISOString(),
      })
      setShowCreateForm(false);

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <IoIosAddCircle
        size={32}
        className="text-gray-500 hover:text-black"
        onClick={() => setShowCreateForm(true)}
      />
      {showCreateForm && (
        <Modal title="Create Learning Item" isOpen={showCreateForm} onClose={() => setShowCreateForm(false)}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* area & title */}
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <label className="block text-lg text-slate-900 font-bold mb-1">Learning Area</label>
                <input
                  value={area.name}
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-slate-900"
                  disabled
                />
              </div>
              <div className="col-span-2">
                <TextField
                  label="Title"
                  register={register("title")}
                  error={errors.title as FieldError}
                  placeholder="Enter title"
                />
              </div>
            </div>
            {/* Subtitle */}
            <div>
              <TextField
                label="Subtitle"
                register={register("subtitle")}
                error={errors.subtitle as FieldError}
                placeholder="Enter subtitle"
              />
            </div>
            {/* Notes */}
            <div>
              <TextAreaField
                label="Notes"
                register={register("notes")}
                error={errors.notes as FieldError}
                placeholder="Enter notes"
                rows={6}
              />
            </div>
            {/* Dates */}
            <div className="flex flex-row gap-2 justify-between items-center">
              <div className="w-1/2">
                <label className="block text-lg text-slate-900 font-bold mb-1">Started Date</label>
                <input
                  {...register("started_date")}
                  type="date"
                  id="started-date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-slate-900"
                />
                {errors.started_date && <p className="text-red-500 text-sm mt-1">{errors.started_date.message}</p>}
              </div>
              <div className="w-1/2">
                <label className="block text-lg text-slate-900 font-bold mb-1">Expected Completion</label>
                <input
                  {...register("expected_completion")}
                  type="date"
                  id="expected-completion"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-slate-900"
                />
                {errors.expected_completion && <p className="text-red-500 text-sm mt-1">{errors.expected_completion.message}</p>}
              </div>
            </div>
            {/* buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-200 text-black font-bold rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg text-white font-bold ${gradientsStyles.main} ${gradientsStyles.hovered}`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}

export default ItemCreate;

/**
 * 
 * requestBody: {
            area_id: number;
            title: string;
            notes: string;
            subtitle: string;
            started_date: string;
            expected_completion: string;
        },
 */