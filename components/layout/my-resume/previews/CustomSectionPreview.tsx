"use client";

import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";

const CustomSectionPreview = () => {
  const { formData } = useFormContext();
  const themeColor = formData?.themeColor || themeColors[0];

  if (!formData?.customSections || formData.customSections.length === 0) {
    return null;
  }

  return (
    <>
      {formData.customSections.map((section: any, index: number) => (
        <div key={index} className="my-6">
          <h2 className="text-center font-bold text-sm mb-2" style={{ color: themeColor }}>
            {section?.title}
          </h2>
          <hr style={{ borderColor: themeColor }} />
          <div
            className="text-xs my-2 form-preview"
            dangerouslySetInnerHTML={{ __html: section?.content }}
          />
        </div>
      ))}
    </>
  );
};

export default CustomSectionPreview;
