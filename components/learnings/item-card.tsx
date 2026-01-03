import { LearningArea, LearningItem } from "@/generated"
import { LEARNING_ITEM_STATUS } from "@/lib/constants"
import { formatDate } from "@/lib/utils"
import { CompleteLearningItemButton, StartLearningItemButton } from "./update-buttons"

type Props = {
  args: LearningItem
  area: LearningArea
}

export default function LearningItemCard({ args, area }: Props) {

  const statusColor = (() => {
    switch (args.status) {
      case LEARNING_ITEM_STATUS.notStarted.key:
        return "#3a86ff"
      case LEARNING_ITEM_STATUS.inProgress.key:
        return "#fb5607"
      case LEARNING_ITEM_STATUS.completed.key:
        return "#affc41"
      default:
        return "#6c757d"
    }
  })();

  return (
    <div className="w-full h-full rounded-lg p-2 shadow"
      style={{ background: `linear-gradient(90deg, ${statusColor}, #6c757d)` }}
    >
      <div className="flex flex-row justify-between items-center w-full bg-white rounded-lg px-4 py-3">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            {/* header */}
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-row items-center gap-2">
                <h2 className="text-lg font-semibold text-black">{args.title}</h2>
                <span
                  className="text-sm font-semibold text-white px-2 py-1 rounded-lg"
                  style={{ backgroundColor: area.color_hex }}
                >
                  {args.subtitle}
                </span>
              </div>
            </div>


            {/* notes */}
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{args.notes}</p>

          </div>

          <div className='flex flex-col gap-2'>
            {/* dates */}
            <div className='flex flex-row items-center gap-2'>
              <p className="text-sm text-gray-900 font-semibold items-center">
                Started on {formatDate(args.started_at)}
              </p>
              {args.status !== LEARNING_ITEM_STATUS.completed.key && <p className="text-sm text-gray-900 font-semibold items-center">
                | Expected completion: {formatDate(args.expected_completion)}
              </p>}
              {args.status === LEARNING_ITEM_STATUS.completed.key && args.completed_at && (
                <p className="text-sm text-gray-900 font-semibold items-center">
                  | Completed on {formatDate(args.completed_at)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="h-full">
          {args.status === LEARNING_ITEM_STATUS.notStarted.key && (
            <StartLearningItemButton itemId={args.item_id} />
          )}
          {args.status === LEARNING_ITEM_STATUS.inProgress.key && (
            <CompleteLearningItemButton itemId={args.item_id} />
          )}
        </div>

      </div>

    </div>
  )
}