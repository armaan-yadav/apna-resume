import { useFormContext } from "@/lib/context/FormProvider";
import React from "react";
import {
  ClassicTemplate,
  ModernTemplate,
  MinimalTemplate,
} from "./templates";
import { TemplateType } from "@/lib/templates";

const ResumePreview = () => {
  const { formData } = useFormContext();

  if (Object.keys(formData || {}).length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-[210mm] min-h-[297mm] rounded-sm shadow-lg skeleton" />
      </div>
    );
  }

  const renderTemplate = () => {
    const template = (formData?.template || "classic") as TemplateType;
    
    switch (template) {
      case "modern":
        return <ModernTemplate />;
      case "minimal":
        return <MinimalTemplate />;
      case "classic":
      default:
        return <ClassicTemplate />;
    }
  };

  return (
    <div className="flex items-center justify-center">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
