"use client";

import { useState } from "react";
import { useFormContext } from "@/lib/context/FormProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, X } from "lucide-react";
import { addSkillToResume } from "@/lib/actions/resume.actions";
import { useToast } from "@/components/ui/use-toast";

const DEFAULT_CATEGORIES = [
  "Languages",
  "Frameworks",
  "Tools",
  "Databases",
  "Other",
];

const SkillsForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange } = useFormContext();
  
  // Migrate old skill format to new format if needed
  const migrateSkills = (skills: any[]) => {
    if (!skills || skills.length === 0) {
      return [{ category: "Languages", skills: [] }];
    }
    
    // Check if it's old format (has 'name' and 'rating' properties)
    if (skills[0] && 'name' in skills[0] && 'rating' in skills[0]) {
      // Convert old format to new format - group all old skills under "Other"
      const oldSkillNames = skills.map((s: any) => s.name).filter(Boolean);
      return [{ category: "Other", skills: oldSkillNames }];
    }
    
    // Already new format or empty
    return skills;
  };
  
  const [skillsList, setSkillsList] = useState(() => 
    migrateSkills(formData.skills)
  );
  const [newSkillInputs, setNewSkillInputs] = useState<{ [key: number]: string }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCategoryChange = (index: number, value: string) => {
    const newSkillsList = [...skillsList];
    newSkillsList[index].category = value;
    setSkillsList(newSkillsList);

    handleInputChange({
      target: {
        name: "skills",
        value: newSkillsList,
      },
    });
  };

  const handleAddSkill = (index: number) => {
    const skillToAdd = newSkillInputs[index]?.trim();
    if (!skillToAdd) return;

    const newSkillsList = [...skillsList];
    if (!newSkillsList[index].skills) {
      newSkillsList[index].skills = [];
    }
    newSkillsList[index].skills.push(skillToAdd);
    setSkillsList(newSkillsList);

    // Clear the input
    setNewSkillInputs((prev) => ({ ...prev, [index]: "" }));

    handleInputChange({
      target: {
        name: "skills",
        value: newSkillsList,
      },
    });
  };

  const handleRemoveSkill = (categoryIndex: number, skillIndex: number) => {
    const newSkillsList = [...skillsList];
    newSkillsList[categoryIndex].skills.splice(skillIndex, 1);
    setSkillsList(newSkillsList);

    handleInputChange({
      target: {
        name: "skills",
        value: newSkillsList,
      },
    });
  };

  const AddNewCategory = () => {
    const newSkillsList = [
      ...skillsList,
      {
        category: "",
        skills: [],
      },
    ];
    setSkillsList(newSkillsList);

    handleInputChange({
      target: {
        name: "skills",
        value: newSkillsList,
      },
    });
  };

  const RemoveCategory = (index: number) => {
    const newSkillsList = skillsList.filter((_: any, i: number) => i !== index);
    setSkillsList(newSkillsList);

    handleInputChange({
      target: {
        name: "skills",
        value: newSkillsList,
      },
    });
  };

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    // Use skillsList directly instead of formData.skills to ensure latest data
    const result = await addSkillToResume(params.id, skillsList);

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Skills updated successfully.",
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

    setIsLoading(false);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
      <h2 className="text-lg font-semibold leading-none tracking-tight">
        Skills
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Add your skills organized by category
      </p>

      <div className="mt-5 space-y-4">
        {skillsList.map((item: any, index: number) => (
          <div
            key={index}
            className="border rounded-lg p-4 space-y-3 relative"
          >
            {skillsList.length > 1 && (
              <button
                type="button"
                onClick={() => RemoveCategory(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={18} />
              </button>
            )}

            <div className="space-y-2">
              <label className="text-slate-700 font-semibold text-sm">
                Category:
              </label>
              <div className="flex gap-2">
                <Input
                  className="no-focus"
                  placeholder="e.g., Languages, Frameworks, Tools"
                  value={item.category || ""}
                  onChange={(e: any) =>
                    handleCategoryChange(index, e.target.value)
                  }
                  list={`category-suggestions-${index}`}
                />
                <datalist id={`category-suggestions-${index}`}>
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-700 font-semibold text-sm">
                Skills:
              </label>
              <div className="flex flex-wrap gap-2 min-h-[32px]">
                {item.skills?.map((skill: string, skillIndex: number) => (
                  <span
                    key={skillIndex}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index, skillIndex)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  className="no-focus"
                  placeholder="Type a skill and press Add"
                  value={newSkillInputs[index] || ""}
                  onChange={(e: any) =>
                    setNewSkillInputs((prev) => ({
                      ...prev,
                      [index]: e.target.value,
                    }))
                  }
                  onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkill(index);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAddSkill(index)}
                  className="text-primary shrink-0"
                >
                  <Plus size={16} className="mr-1" /> Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-2 justify-between">
        <Button
          variant="outline"
          onClick={AddNewCategory}
          className="text-primary"
        >
          <Plus className="size-4 mr-2" /> Add Category
        </Button>
        <Button
          disabled={isLoading}
          onClick={onSave}
          className="bg-primary-700 hover:bg-primary-800 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp; Saving
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SkillsForm;
