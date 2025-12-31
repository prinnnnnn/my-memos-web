import { Memos } from "@/generated";
import TagBadge from "../tags/tag-badge";
import { formatDate } from "@/lib/utils";
import { gradientsStyles } from "@/lib/theme";

type MemosCardProps = {
    args: Memos;
};

async function MemosCard({ args }: MemosCardProps) {
  return (
    <div className={`border border-gray-300 rounded-lg p-1 shadow-sm h-64 ${gradientsStyles.main}`}>
      {/* <h3 className="text-lg font-semibold">{args.title}</h3> */}
      <div className="flex flex-col justify-between h-full bg-white p-4 rounded-lg shadow-md">
        <div>
            <p className="text-gray-600 font-medium">@{formatDate(args.updated_at)}</p>
            <p className="text-black font-semibold text-xl">{args.content}</p>  
        </div>
        
        <div>

        </div>
        {args.tags && args.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {args.tags.map((tag) => (
                <TagBadge key={`tag-${tag}-${args.id}`} tag={tag}/>
              ))}
            </div>
        )}
      </div>
      
    </div>
  );
}

export default MemosCard;