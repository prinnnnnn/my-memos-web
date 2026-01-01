import TagsFilter from "@/components/tags/tags-filter";
import DateRangeFilter from "@/components/tasks/date-range-filter";
import TaskCard from "@/components/tasks/task-card";
import TaskCreate from "@/components/tasks/tasks-create";
import { ApiError, Task, TasksService } from "@/generated";
import { TASKS_STATUS } from "@/lib/constants";
import { gradientsStyles } from "@/lib/theme";

/*  */
async function getTasks(
  tags: string[],
  startDate: string | undefined,
  endDate: string | undefined,
) {
  try {

    const { data } = await TasksService.getTasks(
      tags.length > 0 ? tags : undefined,
      startDate,
      endDate,
    );

    data.sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    return {
      todo: data.filter(task => task.status === TASKS_STATUS.todo.key),
      inProgress: data.filter(task => task.status === TASKS_STATUS.inProgress.key),
      done: data.filter(task => task.status === TASKS_STATUS.done.key),
    }

  } catch (error) {
    if ((error as ApiError).status !== 404) {
      console.error(`error fetching tasks: `, error);
    }
    return {
      todo: [] as Task[],
      inProgress: [] as Task[],
      done: [] as Task[],
    };
  }
}

const StateHeader = ({ state, count }: { state: string, count: number }) => {
  return (
    <div className="mb-4 bg-white rounded-lg p-2 shadow">
      <div className="flex flex-row justify-between items-center">
        <h4 className="text-lg font-semibold text-black">{state}</h4>
        <div className="flex flex-row items-center gap-2">
          <span className="text-sm text-gray-500">{count} items</span>
          {state === TASKS_STATUS.todo.key && (
            <TaskCreate />
          )}
        </div>
      </div>
    </div>
  );
}

export async function MemosPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParamsResolved = await searchParams;

  /* params */
  const tagsParam = searchParamsResolved.tags as string || "";
  const startDateParam = searchParamsResolved.start_date as string | undefined;
  const endDateParam = searchParamsResolved.end_date as string | undefined;

  const { todo, inProgress, done } = await getTasks(tagsParam.split(","), startDateParam, endDateParam);

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white">
      <div>
        <h1 className={`text-4xl font-bold mb-8 w-min ${gradientsStyles.text}`}>Tasks</h1>
      </div>
      <div className="max-w-7xl mx-auto p-8 flex flex-col gap-6">

        {/* search params */}
        <div className="flex flex-row gap-4">
          <TagsFilter domain="tasks" />
          <DateRangeFilter />
        </div>
  
        {/* 3 columns => to-do, in-progress, done */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <StateHeader state="To Do" count={todo.length} />
            <div className="flex flex-col gap-4">
              {todo.map(task => (
                <TaskCard key={task.id} args={task} />
              ))}
            </div>

          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <StateHeader state="In Progress" count={inProgress.length} />
            <div className="flex flex-col gap-4">
              {inProgress.map(task => (
                <TaskCard key={task.id} args={task} />
              ))}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <StateHeader state="Done" count={done.length} />
            <div className="flex flex-col gap-4">
              {done.map(task => (
                <TaskCard key={task.id} args={task} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MemosPage