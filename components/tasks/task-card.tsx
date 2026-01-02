import { Task } from '@/generated'
import { gradientsStyles } from '@/lib/theme'
import TagBadge from '../tags/tag-badge'
import { formatDate, formatFutureDate } from '@/lib/utils'
import { FaClockRotateLeft } from "react-icons/fa6";
import { TASKS_STATUS } from '@/lib/constants';
import ReactMarkdown from 'react-markdown';
import { CompleteTaskButton, StartTaskButton } from './status-button';

type TaskCardProps = {
  args: Task
}
/*

1. button to open task details
- display task title, description, tags, updated_at
- styled card with hover effect

2. button to send to in-progress

3. button to mark as done

*/

const TaskCard = ({ args }: TaskCardProps) => {
  return (
    <div className={`w-full h-60 ${gradientsStyles.main} rounded-lg p-1`}>
      <div className="w-full h-full bg-linear-to-r from-[#1b1b1d] to-[#343a40] rounded-lg p-4">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            {/* header */}
            <div className="flex flex-row justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-white">{args.title}</h2>
                <p className="text-sm text-gray-300">{formatDate(args.updated_at)}</p>
              </div>
              {args.status === TASKS_STATUS.todo.key && <StartTaskButton taskId={args.id} />}
              {args.status === TASKS_STATUS.inProgress.key && <CompleteTaskButton taskId={args.id} />}
            </div>

            {/* description */}
            <p className="text-sm text-gray-300">
              {args.description}
            </p>
          </div>


          <div className='flex flex-col gap-2'>
            {/* due date and complete date */}
            <div className='flex flex-row items-center gap-2'>
              {args.status !== TASKS_STATUS.done.key && (
                <>
                  <FaClockRotateLeft />
                  <p className="text-sm text-gray-300 font-semibold items-center">
                    {formatFutureDate(args.due_date)}
                  </p>
                </>
              )}
              
            </div>

            {/* tags */}
            {args.tags && args.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {args.tags.map((tag) => (
                  <TagBadge key={`tag-${tag}-${args.id}`} tag={tag} />
                ))}
              </div>
            )}
          </div>


        </div>
      </div>
    </div>
  )
}

export default TaskCard;
