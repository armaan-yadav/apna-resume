"use client";

import { useFormContext } from "@/lib/context/FormProvider";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { Check, FileText } from "lucide-react";
import { templates, TemplateType } from "@/lib/templates";
import { updateResume } from "@/lib/actions/resume.actions";
import { useToast } from "../ui/use-toast";

const TemplateSelector = ({ params }: { params: { id: string } }) => {
  const { toast } = useToast();
  const { formData, handleInputChange } = useFormContext();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("classic");

  useEffect(() => {
    if (formData?.template) {
      setSelectedTemplate(formData.template);
    }
  }, [formData?.template]);

  const onTemplateSelect = async (templateId: TemplateType) => {
    setSelectedTemplate(templateId);

    handleInputChange({
      target: {
        name: "template",
        value: templateId,
      },
    });

    const result = await updateResume({
      resumeId: params.id,
      updates: {
        template: templateId,
      },
    });

    if (result.success) {
      toast({
        title: "Template updated.",
        description: `Changed to ${templates.find((t) => t.id === templateId)?.name} template.`,
        className: "bg-white",
      });
    } else {
      toast({
        title: "Uh Oh! Something went wrong.",
        description: result?.error,
        variant: "destructive",
        className: "bg-white",
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" className="btn-gradient flex gap-2">
          <FileText size={16} /> Template
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h2 className="mb-3 text-sm font-bold">Select Resume Template</h2>
        <div className="grid grid-cols-1 gap-3">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onTemplateSelect(template.id)}
              className={`relative flex items-center gap-3 p-3 rounded-lg cursor-pointer border-2 transition-all duration-300 hover:shadow-md ${
                selectedTemplate === template.id
                  ? "border-primary-700 bg-primary-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-12 h-16 rounded border flex items-center justify-center text-xs ${
                  selectedTemplate === template.id
                    ? "bg-primary-100 border-primary-300"
                    : "bg-gray-100 border-gray-200"
                }`}
              >
                <FileText
                  size={24}
                  className={
                    selectedTemplate === template.id
                      ? "text-primary-700"
                      : "text-gray-400"
                  }
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{template.name}</h3>
                <p className="text-xs text-gray-500">{template.description}</p>
              </div>
              {selectedTemplate === template.id && (
                <Check
                  className="text-primary-700"
                  strokeWidth={3}
                  width={20}
                  height={20}
                />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TemplateSelector;
