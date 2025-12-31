/* ui */
import { FiPlus, FiX, FiFilter, FiFileText } from "react-icons/fi";

/* types */
import { Memos, MemosService } from "@/generated";
import MemosCard from "./memos-card";
import Pagination from "@/components/pagination";
import TagsFilter from "../tags/tags-filter";

async function getMemos(
  page: number,
  perpage: number,
  tags: string[]
) {
  try {

    const { data, pagination } = await MemosService.listMemos(
      tags.length > 0 ? tags : undefined,
      page,
      perpage,
    );

    return { data, pagination };

  } catch (error) {
    console.error(`error fetching memos: `, error);
    return {
      data: [] as Memos[],
      pagination: {
        page: 1,
        limit: 10,
        skip: 0,
        total: 0,
      },
    };
  }
}

async function MemosView({
  searchParams
} : {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParamsResolved = await searchParams;
  const tagsParam = searchParamsResolved.tags as string || "";
  const { data, pagination } = await getMemos(1, 10, tagsParam.split(","));

  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-col gap-6">

      <TagsFilter />

      {data.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <FiFileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p>No memos found. Create your first memo to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {data.map(memo => (
            <MemosCard args={memo} key={`memo-${memo.id}`} />
          ))}
        </div>
      )}

      <Pagination 
        currentPage={pagination.page}
        totalPages={Math.ceil(pagination.total / pagination.limit)}
        total={pagination.total}
        pageSize={pagination.limit}
        domain="memos"
      />  

    </div>
  );
};

export default MemosView;