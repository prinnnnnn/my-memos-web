"use client";

import { useState } from 'react'
import Modal from '@/components/ui/modal';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMemosSchema } from '@/lib/validator';
import { CreateMemosInput } from '@/lib/validator/memos';
import { IoClose } from 'react-icons/io5';
import { TAGS } from '@/lib/constants';
import { MemosService } from '@/generated';
import { useRouter } from 'next/navigation';
import { gradientsStyles } from '@/lib/theme';

const CreateMemosModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMemosInput>({
    resolver: zodResolver(createMemosSchema),
    defaultValues: {
      content: '',
      tags: [],
    }
  });

  const selectedTags = useWatch<CreateMemosInput>({
    control,
    name: 'tags',
  }) as string[];

  const handleCreate = async (data: CreateMemosInput) => {

    try {
      setLoading(true);
      await MemosService.createMemo(data);
      setShowCreateModal(false);
      
      router.refresh();
    } catch (error) {
      console.error('Failed to create memo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={`px-4 py-2 flex items-center gap-2 text-white font-bold rounded-lg ${gradientsStyles.hovered} ${gradientsStyles.main}`}
        onClick={() => setShowCreateModal(true)}
      >
        <span>Create New Memo</span>
      </button>
      {showCreateModal && (
        <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Memo">
          <form className="space-y-4" onSubmit={handleSubmit(handleCreate)}>
            {/* content */}
            <div>
              <label className="block text-lg text-slate-900 font-bold mb-1">Content</label>
              <textarea
                {...register("content")}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#023e8a] focus:border-transparent text-slate-950"
                placeholder="Write your memo here..."
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>

            {/* tags */}
            {selectedTags.length > 0 && (
              <div>
                <label className="block text-lg font-semibold text-slate-900">
                  Selected Tags ({selectedTags.length})
                </label>
                <div className="mt-2 space-y-2">
                  {selectedTags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3"
                    >
                      <span className="text-sm font-medium text-slate-900">
                        {tag}
                      </span>
                      <button
                        onClick={() => {
                          const updatedTags = selectedTags.filter(t => t !== tag);
                          // Manually update the tags field
                          const event = {
                            target: {
                              name: 'tags',
                              value: updatedTags,
                            },
                          } as unknown as React.ChangeEvent<HTMLInputElement>;
                          register("tags").onChange(event);
                        }}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <IoClose className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 cursor-pointer select-none text-sm font-medium transition-shadow ${
                        checked
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
                        className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                          tag.color ?? "bg-slate-400"
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

  )
}

export default CreateMemosModal
