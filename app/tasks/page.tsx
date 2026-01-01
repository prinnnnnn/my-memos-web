import TagsFilter from "@/components/tags/tags-filter";
import { ApiError, Task, TasksService } from "@/generated";
import { gradientsStyles } from "@/lib/theme";

/*  */
async function getTasks(
  tags: string[],
  startDate: Date,
  endDate: Date,
) {
  try {

    const { data } = await TasksService.getTasks(
      tags.length > 0 ? tags : undefined,
      startDate.toISOString(),
      endDate.toISOString(),
    );

    data.sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    return { data };

  } catch (error) {
    if ((error as ApiError).status !== 404) {
      console.error(`error fetching tasks: `, error);
    }
    return {
      data: [] as Task[],
    };
  }
}

export async function MemosPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParamsResolved = await searchParams;
  const tagsParam = searchParamsResolved.tags as string || "";
  const { data } = await getTasks(tagsParam.split(","), new Date("2025-12-01"), new Date("2026-01-31"));

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white">
      <div>
        <h1 className={`text-4xl font-bold mb-8 w-min ${gradientsStyles.text}`}>Memos</h1>
      </div>
      <div className="max-w-7xl mx-auto p-8 flex flex-col gap-6">

        <TagsFilter domain="tasks"/>

      </div>
    </div>
  )
}

export default MemosPage