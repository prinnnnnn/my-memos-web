import { TAGS } from '@/lib/constants';

const TagBadge = ({ tag }: { tag: string }) => {
  const tagInfo = TAGS.filter(t => t.name === tag)[0];
  return (
    <div className="inline-flex items-center px-2 py-1 text-sm font-bold rounded-full text-white" style={{ backgroundColor: tagInfo.color }}>
      {tag}
    </div>
  )
}

export default TagBadge;