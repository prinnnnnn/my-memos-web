import { LearningArea } from '@/generated'
import Link from 'next/link'

type Props = {
  args: LearningArea
}

const AreaCard = ({ args }: Props) => {
  return (
    <div
      className="p-1.5 rounded-lg shadow-lg"
      style={{ background: `linear-gradient(90deg, #000000, ${args.color_hex}, #f8f9fa)` }}
    >
      <div className='bg-white rounded-lg shadow p-4 w-full'>
        <div className='flex flex-row'>
          <div className='shrink-0 content-center mr-4'>
            <img src={args.icon_emoji} alt={args.name} className='w-16 h-16' />
          </div>
          <div className='flex flex-col'>
            <Link 
              className='hover:underline hover:text-black'
              href={`/learnings/${args.area_id}`}
            >
              <h3 className='text-lg font-semibold text-gray-800'>{args.name}</h3>
            </Link>
            <p className='text-sm text-gray-800'>{args.description}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AreaCard;
