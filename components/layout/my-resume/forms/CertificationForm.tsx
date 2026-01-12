"use client";

import React, { useState } from "react";
import { useFormContext } from "@/lib/context/FormProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { addCertificationToResume } from "@/lib/actions/resume.actions";

interface Certification {
  _id?: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export default function CertificationForm({ params }: { params: { id: string } }) {
  const { formData, handleInputChange } = useFormContext();
  const { toast } = useToast();
  const [certifications, setCertifications] = useState<Certification[]>(
    formData?.certifications || []
  );

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value };
    setCertifications(updatedCertifications);
    handleInputChange({ target: { name: "certifications", value: updatedCertifications } });
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      { title: "", issuer: "", issueDate: "", expiryDate: "", credentialUrl: "" },
    ]);
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  const handleSave = async () => {
    if (certifications.length === 0) {
      handleInputChange({ target: { name: "certifications", value: [] } });
      return;
    }

    // Validate all certifications have required fields
    for (const cert of certifications) {
      if (!cert.title?.trim()) {
        toast({
          title: "Validation Error",
          description: "Certification title is required.",
          variant: "destructive",
        });
        return;
      }
      if (!cert.issuer?.trim()) {
        toast({
          title: "Validation Error",
          description: "Issuer is required.",
          variant: "destructive",
        });
        return;
      }
    }

    const res = await addCertificationToResume(params.id, certifications);
    if (res.success) {
      handleInputChange({ target: { name: "certifications", value: certifications } });
      toast({
        title: "Certifications saved",
        description: "Your certifications have been saved successfully.",
      });
    } else {
      toast({
        title: "Failed to save certifications",
        description: res.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary-700 border-t-4 bg-white">
      <h2 className="text-lg font-semibold leading-none tracking-tight">Certifications</h2>
      <p className="mt-1 text-sm text-slate-500">Add your professional certifications and credentials.</p>

      <div className="mt-5 space-y-4">
        {certifications.map((cert, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Certification Title"
                value={cert.title}
                onChange={(e) => handleCertificationChange(index, "title", e.target.value)}
                className="border border-gray-300"
              />
              <Input
                placeholder="Issuing Organization"
                value={cert.issuer}
                onChange={(e) => handleCertificationChange(index, "issuer", e.target.value)}
                className="border border-gray-300"
              />
              <Input
                placeholder="Issue Date (e.g., Jan 2024)"
                value={cert.issueDate}
                onChange={(e) => handleCertificationChange(index, "issueDate", e.target.value)}
                className="border border-gray-300"
              />
              <Input
                placeholder="Expiry Date (Optional)"
                value={cert.expiryDate || ""}
                onChange={(e) => handleCertificationChange(index, "expiryDate", e.target.value)}
                className="border border-gray-300"
              />
              <Input
                placeholder="Credential URL (Optional)"
                value={cert.credentialUrl || ""}
                onChange={(e) => handleCertificationChange(index, "credentialUrl", e.target.value)}
                className="border border-gray-300 md:col-span-2"
              />
            </div>
            <Button
              onClick={() => removeCertification(index)}
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
          onClick={addCertification}
          className="bg-blue-500 hover:bg-blue-600 text-white flex gap-2"
          size="sm"
        >
          <Plus size={16} /> Add Certification
        </Button>
        <Button onClick={handleSave} className="bg-primary-700 hover:bg-primary-800 text-white" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
}
