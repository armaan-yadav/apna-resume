"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useFormContext } from "@/lib/context/FormProvider";
import { Button } from "@/components/ui/button";
import { GripVertical, List, Briefcase, GraduationCap, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { updateResume } from "@/lib/actions/resume.actions";
import { useToast } from "@/components/ui/use-toast";

const SECTION_LABELS: Record<string, { label: string; icon: any }> = {
  summary: { label: "Summary", icon: List },
  experience: { label: "Experience", icon: Briefcase },
  education: { label: "Education", icon: GraduationCap },
  skills: { label: "Skills", icon: Layers },
};

const DEFAULT_ORDER = ["summary", "experience", "education", "skills"];

export default function SectionOrderBoard({ params }: { params: { id: string } }) {
  const { formData, handleInputChange } = useFormContext();
  const [order, setOrder] = useState<string[]>(() => formData.sectionOrder || DEFAULT_ORDER);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!formData.sectionOrder || formData.sectionOrder.length === 0) {
      handleInputChange({ target: { name: "sectionOrder", value: DEFAULT_ORDER } });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newOrder = Array.from(order);
    const [moved] = newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, moved);
    setOrder(newOrder);
    handleInputChange({ target: { name: "sectionOrder", value: newOrder } });
  };

  const saveOrder = async () => {
    setIsSaving(true);
    const res = await updateResume({ resumeId: params.id, updates: { sectionOrder: order } as any });
    setIsSaving(false);
    if (res?.success) {
      toast({
        title: "Order saved",
        description: "Section order updated.",
      });
    } else {
      toast({
        title: "Failed to save order",
        description: res?.error || "Please try again.",
        variant: "destructive",
      });
    }
    return res;
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
      <h2 className="text-lg font-semibold leading-none tracking-tight">Section Order</h2>
      <p className="mt-1 text-sm text-slate-500">Drag to reorder how sections appear in the resume.</p>

      <div className="mt-5">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                {order.map((key, index) => {
                  const Icon = SECTION_LABELS[key]?.icon || GripVertical;
                  return (
                    <Draggable draggableId={key} index={index} key={key}>
                      {(draggableProvided, snapshot) => (
                        <div
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          className={`flex items-center justify-between p-3 rounded-md border bg-white ${snapshot.isDragging ? "shadow-lg" : "shadow-sm"}`}
                        >
                          <div className="flex items-center gap-3">
                            <GripVertical className="text-gray-400" />
                            <Icon className="text-primary-700" size={18} />
                            <span className="font-medium">{SECTION_LABELS[key]?.label || key}</span>
                          </div>
                          <span className="text-xs text-gray-400">#{index + 1}</span>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="mt-6">
        <Button onClick={saveOrder} disabled={isSaving} className="bg-primary-700 text-white hover:bg-primary-800">
          {isSaving ? "Saving..." : "Save Order"}
        </Button>
      </div>
    </div>
  );
}
