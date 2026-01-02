"use client";

import { LearningsService } from "@/generated";
import { CreateLearningAreaInput, CreateLearningAreaSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAddCircle } from "react-icons/io";
import { TextAreaField, TextField } from "@/components/form/text-field";
import { gradientsStyles } from "@/lib/theme";

const AreaCreate = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLearningAreaInput>({
    resolver: zodResolver(CreateLearningAreaSchema),
    defaultValues: {
      name: "",
      description: "",
      color_hex: "",
      icon_emoji: "",
    }
  });

  const onSubmit = async (data: CreateLearningAreaInput) => {

    try {

      setLoading(true);

      await LearningsService.createLearningArea(data);

      setShowCreateForm(false);
      router.refresh();

    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-1.5 rounded-lg shadow-lg"
      style={{ background: `linear-gradient(90deg, #000000, #9d0208, #ffba08)` }}
    >
      {/* create New Area Button */}
      <div className='bg-white rounded-lg shadow p-4 w-full'>
        <div className='flex flex-row'>
          <div className='shrink-0 content-center mr-4'>
            <IoMdAddCircle
              size={64}
              color="#000814"
              onClick={() => setShowCreateForm(!showCreateForm)}
            />
          </div>
          <div className='flex flex-col justify-center'>
            <h3 className='text-lg font-semibold text-gray-800'>Create New Area</h3>
            <p className='text-sm text-gray-800'>Add a new learning area to the platform.</p>
          </div>
        </div>
      </div>

      {/* create area form */}
      {showCreateForm && (
        <div className='bg-white rounded-lg shadow p-4 w-full mt-2'>
          <h3 className='text-2xl font-semibold text-gray-800 mb-4'>New Learnings Area</h3>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <TextField
                label="Name"
                placeholder="Enter area name"
                register={register("name")}
                error={errors.name!}
              />
            </div>
            <div className="flex flex-row gap-6">
              <div className="w-1/2">
                <TextField
                  label="Color Hex"
                  placeholder="#ff5733"
                  register={register("color_hex")}
                  error={errors.color_hex!}
                />
              </div>
              <div className="w-1/2">
                <TextField
                  label="Icon URL"
                  placeholder="Enter icon URL"
                  register={register("icon_emoji")}
                  error={errors.icon_emoji!}
                />
              </div>
            </div>
            <div className="w-full">
              <TextAreaField
                label="Description"
                placeholder="Enter area description"
                register={register("description")}
                error={errors.description!}
                rows={4}
              />
            </div>
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
                {loading ? 'Creating...' : 'Create Area'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  )
}

export default AreaCreate;
