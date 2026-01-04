export const dynamic = 'force-dynamic'

import AreaCard from "@/components/learnings/area-card";
import AreaCreate from "@/components/learnings/area-create";
import { ApiError, LearningArea, LearningsService } from "@/generated";
import { gradientsStyles } from "@/lib/theme";

async function getLearningAreas() {
  try {

    const { data } = await LearningsService.getLearningAreas();

    data.sort((a, b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

    return { data: data.map(area => ({
      ...area,
      icon_emoji: `${process.env.OBJECTS_ENGINE_URL}/download/${area.icon_emoji}`,
    })) };

  } catch (error) {
    if ((error as ApiError).status !== 404) {
      console.error(`error fetching tasks: `, error);
    }
    return { data: [] as LearningArea[] }
  }
}

export default async function LearningsAreaPage() {

  const { data } = await getLearningAreas();

  return (
    <div className="w-full mx-auto px-4 py-8 bg-white">
      <div className="w-fit">
        <h1 className={`text-4xl font-bold mb-8 ${gradientsStyles.text}`}>Learning Areas</h1>
      </div>
      {/* learning areas */}
      <div className="px-10 py-2">
        <div className={`flex flex-col gap-4 rounded-lg p-2`}>
          <AreaCreate />
          {data.map(area => (
            <AreaCard key={`learning-area-${area.area_id}`} args={area} />
          ))}
        </div>
      </div>

    </div>
  );
}