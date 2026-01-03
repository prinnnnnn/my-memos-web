import LearningItemCard from "@/components/learnings/item-card";
import Pagination from "@/components/pagination";
import { ApiError, LearningItem, LearningsService } from "@/generated";
import { LEARNING_ITEM_STATUS } from "@/lib/constants";
import { gradientsStyles } from "@/lib/theme";

const fetchPageData = async (id: number, page?: number, limit?: number) => {
  try {
    const { data: areaData } = await LearningsService.getLearningAreaById(id);
    const { data: itemsData, pagination } = await LearningsService.getLearningItemsByArea(
      id,
      page,
      limit,
    );

    itemsData.sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    return {
      area: {
        ...areaData,
        icon_emoji: `${process.env.OBJECTS_ENGINE_URL}/download/${areaData.icon_emoji}`,
      },
      items: itemsData,
      pagination,
    };
  } catch (error) {
    if ((error as ApiError).status !== 404) {
      console.error(`error fetching memos: `, error);
    }
    return {
      area: null,
      items: [] as LearningItem[],
      pagination: {
        page: 1,
        limit: 10,
        skip: 0,
        total: 0,
      },
    };
  }
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function LearningAreaPage({ params, searchParams }: PageProps) {

  const paramsResolved = await params;
  const searchParamsResolved = await searchParams;
  const page = parseInt(searchParamsResolved.page as string || '1');
  const limit = parseInt(searchParamsResolved.limit as string || '20');
  const { area, items, pagination } = await fetchPageData(parseInt(paramsResolved.id), page, limit);

  const notStartedItems = items.filter(item => item.status === LEARNING_ITEM_STATUS.notStarted.key);
  const inProgressItems = items.filter(item => item.status === LEARNING_ITEM_STATUS.inProgress.key);
  const completedItems = items.filter(item => item.status === LEARNING_ITEM_STATUS.completed.key);

  const numNotStarted = notStartedItems.length;
  const numInProgress = inProgressItems.length;
  const numCompleted = completedItems.length;

  if (!area) {
    return (
      <div className="w-full mx-auto px-4 py-8 bg-white">
        <div className="w-fit">
          <h1 className={`text-4xl font-bold mb-8 ${gradientsStyles.text}`}>Learning Area Not Found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white">
      <div className="w-fit flex flex-row items-center gap-4 mb-4">
        <img
          src={area.icon_emoji}
          alt={area.name}
          className="w-16 h-16"
        />
        <h1 className="text-4xl font-bold" style={{ color: area.color_hex }}>{area.name}</h1>
      </div>

      <div className="bg-slate-100 w-full p-2 rounded-lg shadow">
        <div className="flex items-center gap-4 bg-white p-2 shadow rounded-lg">
          {/* learning area description */}
          <div className="p-1">
            <h2 className="text-2xl font-bold text-slate-800 underline">Overview</h2>
            <p className="text-md text-gray-700 font-semibold">{area.description}</p>
          </div>
        </div>
      </div>

      {/* in progress learning items */}
      <div className="p-3 flex flex-col gap-4 bg-gray-100 rounded-lg mt-6">
        <h2 className="text-2xl font-bold text-gray-500 mb-1 flex flex-row items-center">
          {LEARNING_ITEM_STATUS.inProgress.label}
          <span className="text-xl font-semibold text-gray-600 ml-2 bg-gray-300 rounded-2xl px-2">{numInProgress}</span>
        </h2>
        {inProgressItems.length === 0 && (
          <p className="text-gray-500">No learning items found.</p>
        )}
        {inProgressItems.map((item) => (
          <LearningItemCard 
            key={item.item_id} 
            args={item} 
            area={area}
          />
        ))}
      </div>

      {/* todo learning items */}
      <div className="p-3 flex flex-col gap-4 bg-gray-100 rounded-lg mt-6">
        <h2 className="text-2xl font-bold text-gray-500 mb-1 flex flex-row items-center">
          {LEARNING_ITEM_STATUS.notStarted.label}
          <span className="text-xl font-semibold text-gray-600 ml-2 bg-gray-300 rounded-2xl px-2">{numNotStarted}</span>
        </h2>
        {notStartedItems.length === 0 && (
          <p className="text-gray-500">No learning items found.</p>
        )}
        {notStartedItems.map((item) => (
          <LearningItemCard 
            key={item.item_id} 
            args={item} 
            area={area}
          />
        ))}
      </div>

      {/* completed learning items */}
      <div className="p-3 flex flex-col gap-4 bg-gray-100 rounded-lg mt-6">
        <h2 className="text-2xl font-bold text-gray-500 mb-1 flex flex-row items-center">
          {LEARNING_ITEM_STATUS.completed.label}
          <span className="text-xl font-semibold text-gray-600 ml-2 bg-gray-300 rounded-2xl px-2">{numCompleted}</span>
        </h2>
        {completedItems.length === 0 && (
          <p className="text-gray-500">No learning items found.</p>
        )}
        {completedItems.map((item) => (
          <LearningItemCard 
            key={item.item_id} 
            args={item} 
            area={area}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        pageSize={limit}
        total={pagination.total}
        totalPages={Math.ceil(pagination.total / limit)}
        domain="learning items"
      />

      

    </div>
  )
}