"use client";

import { TAGS } from '@/lib/constants';
/* hooks */
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiX, FiFilter } from 'react-icons/fi';

type TagFilterProps = {
  domain: string;
  createWidget?: React.ReactNode;
};

export default function TagFilter({ domain, createWidget }: TagFilterProps) {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tagsParam = params.get('tags');
    if (tagsParam) {
      setSelectedTags(tagsParam.split(','));
    }
  }, [router]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete('tags');
    if (selectedTags.length > 0) {
      params.append('tags', selectedTags.join(','));
    }
    router.push(`/${domain}?${params.toString()}`);
  }, [selectedTags]);

  const toggleTag = (tagKey: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagKey)
        ? prev.filter((key) => key !== tagKey)
        : [...prev, tagKey]
    );
  };

  const clearAllTags = () => {
    setSelectedTags([]);
  };

  return (
    <div className="w-full">
      {/* Filter by Tags */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Filter by Tags</h2>
          </div>
          <div className='flex flex-row items-center gap-4'>
            {selectedTags.length > 0 && (
              <button
                onClick={clearAllTags}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Clear all
              </button>
            )}
            {createWidget && <>{createWidget}</>}
          </div>

        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {TAGS.map((tag) => {
            const isSelected = selectedTags.includes(tag.key);
            return (
              <button
                key={tag.key}
                onClick={() => toggleTag(tag.key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 transform hover:scale-105`}
                style={{
                  backgroundColor: isSelected ? tag.color : '#f1f3f5',
                  color: isSelected ? '#ffffff' : '#000000',
                }}
              >
                {tag.label}
                {isSelected && (
                  <FiX className="inline-block ml-1" size={16} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}