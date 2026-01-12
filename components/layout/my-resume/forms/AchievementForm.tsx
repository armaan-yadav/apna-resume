"use client";

import React, { useState } from "react";
import { useFormContext } from "@/lib/context/FormProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import RichTextEditor from "@/components/common/RichTextEditor";
import { useToast } from "@/components/ui/use-toast";
import { addAchievementToResume } from "@/lib/actions/resume.actions";

interface Achievement {
  _id?: string;
  title: string;
  description: string;
  date: string;
}

export default function AchievementForm({ params }: { params: { id: string } }) {
  const { formData, handleInputChange } = useFormContext();
  const { toast } = useToast();
  const [achievements, setAchievements] = useState<Achievement[]>(
    formData?.achievements || []
  );

  const handleAchievementChange = (index: number, field: keyof Achievement, value: string) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index] = { ...updatedAchievements[index], [field]: value };
    setAchievements(updatedAchievements);
    handleInputChange({ target: { name: "achievements", value: updatedAchievements } });
  };

  const addAchievement = () => {
    setAchievements([...achievements, { title: "", description: "", date: "" }]);
  };

  const removeAchievement = (index: number) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
  };

  const handleSave = async () => {
    if (achievements.length === 0) {
      handleInputChange({ target: { name: "achievements", value: [] } });
      return;
    }

      // Validate all achievements have required fields
      for (const achievement of achievements) {
        if (!achievement.title?.trim()) {
          toast({
            title: "Validation Error",
            description: "Achievement title is required.",
            variant: "destructive",
          });
          return;
        }
        if (!achievement.description?.trim()) {
          toast({
            title: "Validation Error",
            description: "Achievement description is required.",
            variant: "destructive",
          });
          return;
        }
      }

    const res = await addAchievementToResume(params.id, achievements);
    if (res.success) {
      handleInputChange({ target: { name: "achievements", value: achievements } });
      toast({
        title: "Achievements saved",
        description: "Your achievements have been saved successfully.",
      });
    } else {
      toast({
        title: "Failed to save achievements",
        description: res.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
      <h2 className="text-lg font-semibold leading-none tracking-tight">Achievements</h2>
      <p className="mt-1 text-sm text-slate-500">Add your professional achievements and awards.</p>

      <div className="mt-5 space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 gap-4">
              <Input
                placeholder="Achievement Title"
                value={achievement.title}
                onChange={(e) => handleAchievementChange(index, "title", e.target.value)}
                className="border border-gray-300"
              />
              <Input
                placeholder="Date (e.g., Jan 2024)"
                value={achievement.date}
                onChange={(e) => handleAchievementChange(index, "date", e.target.value)}
                className="border border-gray-300"
              />
              <textarea
                placeholder="Description"
                value={achievement.description}
                onChange={(e) => handleAchievementChange(index, "description", e.target.value)}
                rows={3}
                className="border border-gray-300 rounded-md p-2 text-sm"
              />
            </div>
            <Button
              onClick={() => removeAchievement(index)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white flex gap-2"
              size="sm"
            >
              <Trash2 size={16} /> Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-5">
        <Button
          onClick={addAchievement}
          className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2"
          size="sm"
        >
          <Plus size={16} /> Add Achievement
        </Button>
        <Button onClick={handleSave} className="bg-primary-700 hover:bg-primary-800 text-white" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
}
