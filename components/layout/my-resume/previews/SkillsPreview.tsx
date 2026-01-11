import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";

const SkillsPreview = () => {
  const { formData } = useFormContext();
  const themeColor = formData?.themeColor || themeColors[0];

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: themeColor }} />

      <div className="my-4 space-y-3">
        {formData?.skills?.map((skillCategory: any, index: number) => {
          // Handle both old format (name/rating) and new format (category/skills)
          if (skillCategory.category && skillCategory.skills) {
            return (
              <div key={index} className="text-xs">
                <span className="font-semibold" style={{ color: themeColor }}>
                  {skillCategory.category}:
                </span>{" "}
                <span className="text-gray-700">
                  {skillCategory.skills?.join(", ")}
                </span>
              </div>
            );
          } else if (skillCategory.name) {
            // Old format
            return (
              <span key={index} className="text-xs text-gray-700">
                {skillCategory.name}{index < formData.skills.length - 1 ? ", " : ""}
              </span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SkillsPreview;
