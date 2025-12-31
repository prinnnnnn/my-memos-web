"use client";

import { useState } from 'react'
import Modal from '@/components/ui/modal';
import { useForm } from 'react-hook-form';
import Button from '../ui/button';

const CreateMemosModal = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ content: string; tags: string[] }>();

   const handleCreate = async () => {
    try {
      // await api.createMemo(formData.content, formData.tags);
      // setShowCreateModal(false);
      // setFormData({ content: '', tags: [] });
      // setFormTagInput('');
      // loadMemos();
    } catch (error) {
      console.error('Failed to create memo:', error);
    }
  };

  return (
    <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Memo">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-900 font-bold mb-1">Content</label>
          <textarea
            value={formData.content}
            onChange={e => setFormData({ ...formData, content: e.target.value })}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#023e8a] focus:border-transparent text-slate-950"
            placeholder="Write your memo here..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={formTagInput}
              onChange={e => setFormTagInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addFormTag()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Add a tag"
            />
            <Button onClick={addFormTag} size="sm">Add</Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span key={tag} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {tag}
                  <button onClick={() => removeFormTag(tag)} className="ml-2 text-blue-900 hover:text-blue-700">
                    <FiX className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button onClick={() => setShowCreateModal(false)} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreate} >
            Create Memo
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateMemosModal
