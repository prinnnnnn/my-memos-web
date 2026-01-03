import { ApiError, LearningItem, LearningsService } from "@/generated";
import { gradientsStyles } from "@/lib/theme";

const fetchPageData = async (id: number, page?: number, limit?: number) => {
  try {
    const areaRes = await LearningsService.getLearningAreaById(id);
    const itemsRes = await LearningsService.getLearningItemsByArea(
      id,
      page,
      limit,
    );

    const { data: areaData } = areaRes;
    const { data: itemsData } = itemsRes;

    itemsData.sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    return {
      area: {
        ...areaData,
        icon_emoji: `${process.env.OBJECTS_ENGINE_URL}/download/${areaData.icon_emoji}`,
      },
      items: itemsData,
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
  const { area, items } = await fetchPageData(parseInt(paramsResolved.id), page, limit);

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
      <div className="w-fit">
        <h1 className={`text-4xl font-bold mb-8 ${gradientsStyles.text}`}>{area.name}</h1>
      </div>

      <div className="bg-slate-100 w-full p-2 rounded-lg shadow">
        <div className="flex items-center gap-4 bg-white p-2 shadow rounded-lg">
          {/* learning area description */}
          <div className="p-1">
            <h2 className="text-2xl font-bold text-slate-800 underline">Overview</h2>
            <p className="text-lg text-gray-700 font-semibold">{area.description}</p>
          </div>
        </div>

      </div>

    </div>
  )
}