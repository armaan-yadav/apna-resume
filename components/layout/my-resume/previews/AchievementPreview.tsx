"use client";

import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";

const AchievementPreview = () => {
  const { formData } = useFormContext();
  const themeColor = formData?.themeColor || themeColors[0];

  if (!formData?.achievements || formData.achievements.length === 0) {
    return null;
  }

  return (
    <div className="my-6">
      <h2 className="text-center font-bold text-sm mb-2" style={{ color: themeColor }}>
        Achievements
      </h2>
      <hr style={{ borderColor: themeColor }} />
      <div className="my-5 space-y-4">
        {formData.achievements.map((achievement: any, index: number) => (
          <div key={index}>
            <h3 className="text-sm font-bold" style={{ color: themeColor }}>
              {achievement?.title}
            </h3>
            <p className="text-xs text-gray-500">{achievement?.date}</p>
            <p className="text-xs text-gray-700 mt-1">{achievement?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementPreview;
