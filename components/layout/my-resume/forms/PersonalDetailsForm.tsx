"use client";

import { useFormContext } from "@/lib/context/FormProvider";
import React, { useState } from "react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import { Loader2 } from "lucide-react";
import { updateResume } from "@/lib/actions/resume.actions";
import { useToast } from "@/components/ui/use-toast";

const PersonalDetailsForm = ({ params }: { params: { id: string } }) => {
  const { formData, handleInputChange } = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onSave = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const updates = {
      firstName: formData?.firstName,
      lastName: formData?.lastName,
      jobTitle: formData?.jobTitle,
      address: formData?.address,
      phone: formData?.phone,
      email: formData?.email,
      socialLinks: {
        linkedin: formData?.socialLinks?.linkedin,
        twitter: formData?.socialLinks?.twitter,
        portfolio: formData?.socialLinks?.portfolio,
        leetcode: formData?.socialLinks?.leetcode,
        codeforces: formData?.socialLinks?.codeforces,
        github: formData?.socialLinks?.github,
        instagram: formData?.socialLinks?.instagram,
      },
    };

    const result = await updateResume({
      resumeId: params.id,
      updates: updates,
    });

    if (result.success) {
      toast({
        title: "Information saved.",
        description: "Personal details updated successfully.",
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
        Personal Details
      </h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Get Started with the basic information
      </p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div className="space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">
              First Name:
            </label>
            <Input
              name="firstName"
              defaultValue={formData?.firstName}
              required
              onChange={handleInputChange}
              className="no-focus"
            />
          </div>
          <div className="space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">
              Last Name:
            </label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={formData?.lastName}
              className="no-focus"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">
              Job Title:
            </label>
            <Input
              name="jobTitle"
              required
              onChange={handleInputChange}
              defaultValue={formData?.jobTitle}
              className="no-focus"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">
              Address:
            </label>
            <Input
              name="address"
              required
              defaultValue={formData?.address}
              onChange={handleInputChange}
              className="no-focus"
            />
          </div>
          <div className="space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">Phone:</label>
            <Input
              name="phone"
              required
              defaultValue={formData?.phone}
              onChange={handleInputChange}
              className="no-focus"
            />
          </div>
          <div className="space-y-2">
            <label className="mt-2 text-slate-700 font-semibold">Email:</label>
            <Input
              name="email"
              required
              defaultValue={formData?.email}
              onChange={handleInputChange}
              className="no-focus"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t-2">
          <h3 className="text-md font-semibold text-slate-700 mb-4">
            Social Links (Optional)
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-2">
              <label className="mt-2 text-slate-700 font-semibold">
                LinkedIn:
              </label>
              <Input
                name="socialLinks.linkedin"
                placeholder="https://linkedin.com/in/username"
                defaultValue={formData?.socialLinks?.linkedin}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const [parent, child] = name.split(".");
                  handleInputChange({
                    target: {
                      name: parent,
                      value: {
                        ...formData?.[parent],
                        [child]: value,
                      },
                    },
                  });
                }}
                className="no-focus"
              />
            </div>
            <div className="space-y-2">
              <label className="mt-2 text-slate-700 font-semibold">
                Twitter:
              </label>
              <Input
                name="socialLinks.twitter"
                placeholder="https://twitter.com/username"
                defaultValue={formData?.socialLinks?.twitter}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const [parent, child] = name.split(".");
                  handleInputChange({
                    target: {
                      name: parent,
                      value: {
                        ...formData?.[parent],
                        [child]: value,
                      },
                    },
                  });
                }}
                className="no-focus"
              />
            </div>
            <div className="space-y-2">
              <label className="mt-2 text-slate-700 font-semibold">
                Portfolio:
              </label>
              <Input
                name="socialLinks.portfolio"
                placeholder="https://yourportfolio.com"
                defaultValue={formData?.socialLinks?.portfolio}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const [parent, child] = name.split(".");
                  handleInputChange({
                    target: {
                      name: parent,
                      value: {
                        ...formData?.[parent],
                        [child]: value,
                      },
                    },
                  });
                }}
                className="no-focus"
              />
            </div>
            <div className="space-y-2">
              <label className="mt-2 text-slate-700 font-semibold">
                LeetCode:
              </label>
              <Input
                name="socialLinks.leetcode"
                placeholder="https://leetcode.com/username"
                defaultValue={formData?.socialLinks?.leetcode}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const [parent, child] = name.split(".");
                  handleInputChange({
                    target: {
                      name: parent,
                      value: {
                        ...formData?.[parent],
                        [child]: value,
                      },
                    },
                  });
                }}
                className="no-focus"
              />
            </div>
            <div className="space-y-2">
              <label className="mt-2 text-slate-700 font-semibold">
                Codeforces:
              </label>
              <Input
                name="socialLinks.codeforces"
                placeholder="https://codeforces.com/profile/username"
                defaultValue={formData?.socialLinks?.codeforces}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const [parent, child] = name.split(".");
                  handleInputChange({
                    target: {
                      name: parent,
                      value: {
                        ...formData?.[parent],
                        [child]: value,
                      },
                    },
                  });
                }}
                className="no-focus"
              />
            </div>
            <div className="space-y-2">
              <label className="mt-2 text-slate-700 font-semibold">
                GitHub:
              </label>
              <Input
                name="socialLinks.github"
                placeholder="https://github.com/username"
                defaultValue={formData?.socialLinks?.github}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const [parent, child] = name.split(".");
                  handleInputChange({
                    target: {
                      name: parent,
                      value: {
                        ...formData?.[parent],
                        [child]: value,
                      },
                    },
                  });
                }}
                className="no-focus"
              />
            </div>
            <div className="space-y-2">
              <label className="mt-2 text-slate-700 font-semibold">
                Instagram:
              </label>
              <Input
                name="socialLinks.instagram"
                placeholder="https://instagram.com/username"
                defaultValue={formData?.socialLinks?.instagram}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const [parent, child] = name.split(".");
                  handleInputChange({
                    target: {
                      name: parent,
                      value: {
                        ...formData?.[parent],
                        [child]: value,
                      },
                    },
                  });
                }}
                className="no-focus"
              />
            </div>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
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
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
