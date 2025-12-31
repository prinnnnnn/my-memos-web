/* components */
import MemosView from '@/components/memos/memos-view'

import { gradientsStyles } from '@/lib/theme'

export async function MemosPage() {

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white">
      <div>
        <h1 className={`text-4xl font-bold mb-8 w-min ${gradientsStyles.text}`}>Memos</h1>
      </div>
      <MemosView />
    </div>
  )
}

export default MemosPage
