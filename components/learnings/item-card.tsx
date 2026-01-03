import { LearningArea, LearningItem } from "@/generated"

type Props = {
    args: LearningItem
    area: LearningArea
}

export default function LearningItemCard({ args, area }: Props) {
  return (
    <div className="w-full h-full rounded-lg p-4"
        style={{ background: `linear-gradient(90deg, ${area.color_hex}, #6c757d)` }}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2">
          {/* header */}
          <div className="flex flex-row justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">{args.title}</h2>
              <p className="text-sm text-gray-300">Last updated: {new Date(args.updated_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* subtitle */}
          <p className="text-sm text-gray-300">
            {args.subtitle}
          </p>
        </div>

        <div className='flex flex-col gap-2'>
          {/* dates */}
          <div className='flex flex-row items-center gap-2'>
            <p className="text-sm text-gray-300 font-semibold items-center">
              Started on {new Date(args.started_at).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-300 font-semibold items-center">
              | Expected completion: {new Date(args.expected_completion).toLocaleDateString()}
            </p>
            {args.completed_at && (
              <p className="text-sm text-gray-300 font-semibold items-center">
                | Completed on {new Date(args.completed_at).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}