"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useFormContext } from "@/lib/context/FormProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { addCustomSectionToResume } from "@/lib/actions/resume.actions";

const RichTextEditor = dynamic(() => import("@/components/common/RichTextEditor"), {
  ssr: false,
  loading: () => <div className="w-full h-40 border border-gray-300 rounded bg-gray-100"></div>,
});

interface CustomSection {
  _id?: string;
  title: string;
  content: string;
}

export default function CustomSectionForm({ params }: { params: { id: string } }) {
  const { formData, handleInputChange } = useFormContext();
  const { toast } = useToast();
  const [customSections, setCustomSections] = useState<CustomSection[]>(
    formData?.customSections || []
  );
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleSectionChange = (index: number, field: keyof CustomSection, value: any) => {
    const actualValue = typeof value === "string" ? value : value?.target?.value || "";
    const updatedSections = [...customSections];
    updatedSections[index] = { ...updatedSections[index], [field]: actualValue };
    setCustomSections(updatedSections);
    handleInputChange({ target: { name: "customSections", value: updatedSections } });
  };

  const addCustomSection = () => {
    setCustomSections([...customSections, { title: "", content: "" }]);
    setExpandedIndex(customSections.length);
  };

  const removeCustomSection = (index: number) => {
    const updatedSections = customSections.filter((_, i) => i !== index);
    setCustomSections(updatedSections);
    handleInputChange({ target: { name: "customSections", value: updatedSections } });
  };

  const handleSave = async () => {
    if (customSections.length === 0) {
      handleInputChange({ target: { name: "customSections", value: [] } });
      return;
    }

    // Validate all sections have required fields
    for (const section of customSections) {
      if (!section.title?.trim()) {
        toast({
          title: "Validation Error",
          description: "Section title is required.",
          variant: "destructive",
        });
        return;
      }
      if (!section.content?.trim()) {
        toast({
          title: "Validation Error",
          description: "Section content is required.",
          variant: "destructive",
        });
        return;
      }
    }

    const res = await addCustomSectionToResume(params.id, customSections);
    if (res.success) {
      handleInputChange({ target: { name: "customSections", value: customSections } });
      toast({
        title: "Custom sections saved",
        description: "Your custom sections have been saved successfully.",
      });
    } else {
      toast({
        title: "Failed to save custom sections",
        description: res.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
      <h2 className="text-lg font-semibold leading-none tracking-tight">Custom Sections</h2>
      <p className="mt-1 text-sm text-slate-500">Add custom sections with any content you want.</p>

      <div className="mt-5 space-y-4">
        {customSections.map((section, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <Input
              placeholder="Section Title"
              value={section.title}
              onChange={(e) => handleSectionChange(index, "title", e.target.value)}
              className="border border-gray-300 mb-3"
            />
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-700 block mb-2">Section Content</label>
              <RichTextEditor
                defaultValue={section.content}
                onRichTextEditorChange={(value) => handleSectionChange(index, "content", value)}
              />
            </div>
            <Button
              onClick={() => removeCustomSection(index)}
              className="bg-red-500 hover:bg-red-600 text-white flex gap-2"
              size="sm"
            >
              <Trash2 size={16} /> Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-5">
        <Button
          onClick={addCustomSection}
          className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2"
          size="sm"
        >
          <Plus size={16} /> Add Custom Section
        </Button>
        <Button onClick={handleSave} className="bg-primary-700 hover:bg-primary-800 text-white" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
}
