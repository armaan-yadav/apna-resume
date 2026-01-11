"use client";

import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import {
  Linkedin,
  Twitter,
  Globe,
  Code2,
  Github,
  Instagram,
} from "lucide-react";

const MinimalTemplate = () => {
  const { formData } = useFormContext();
  const socialLinks = formData?.socialLinks || {};
  const hasAnySocialLink = Object.values(socialLinks).some((link) => link);

  const getSocialIcon = (platform: string) => {
    const iconProps = { size: 12, className: "inline" };
    switch (platform) {
      case "linkedin":
        return <Linkedin {...iconProps} />;
      case "twitter":
        return <Twitter {...iconProps} />;
      case "portfolio":
        return <Globe {...iconProps} />;
      case "leetcode":
      case "codeforces":
        return <Code2 {...iconProps} />;
      case "github":
        return <Github {...iconProps} />;
      case "instagram":
        return <Instagram {...iconProps} />;
      default:
        return null;
    }
  };

  const themeColor = formData?.themeColor || themeColors[0];

  return (
    <div className="shadow-lg bg-white w-[210mm] min-h-[297mm] print:shadow-none p-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className="text-3xl font-light tracking-wide"
          style={{ color: themeColor }}
        >
          {formData?.firstName} {formData?.lastName}
        </h1>
        {formData?.jobTitle && (
          <p className="text-sm text-gray-600 mt-1 tracking-wider uppercase">
            {formData?.jobTitle}
          </p>
        )}

        {/* Contact Line */}
        <div className="flex justify-center items-center gap-4 mt-4 text-xs text-gray-600 flex-wrap">
          {formData?.email && <span>{formData?.email}</span>}
          {formData?.email && formData?.phone && (
            <span style={{ color: themeColor }}>•</span>
          )}
          {formData?.phone && <span>{formData?.phone}</span>}
          {formData?.phone && formData?.address && (
            <span style={{ color: themeColor }}>•</span>
          )}
          {formData?.address && <span>{formData?.address}</span>}
        </div>

        {/* Social Links */}
        {hasAnySocialLink && (
          <div className="flex justify-center items-center gap-3 mt-2">
            {Object.entries(socialLinks).map(
              ([platform, url]: [string, any]) => {
                if (!url) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:opacity-70 transition-opacity"
                    style={{ color: themeColor }}
                    title={platform}
                  >
                    {getSocialIcon(platform)}
                  </a>
                );
              }
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      {formData?.summary && (
        <div className="mb-8">
          <p className="text-xs text-gray-700 text-center leading-relaxed max-w-[85%] mx-auto">
            {formData?.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {formData?.experience?.length > 0 && (
        <div className="mb-8">
          <h2
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 pb-2 border-b"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Experience
          </h2>
          {formData?.experience?.map((experience: any, index: number) => (
            <div key={index} className="mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-semibold text-gray-800">
                  {experience?.title}
                </h3>
                <span className="text-xs text-gray-500">
                  {experience?.startDate}
                  {experience?.startDate &&
                    (experience?.endDate || experience?.endDate === "") &&
                    " — "}
                  {experience?.startDate && experience?.endDate === ""
                    ? "Present"
                    : experience.endDate}
                </span>
              </div>
              <p className="text-xs text-gray-600 italic">
                {experience?.companyName}
                {experience?.companyName &&
                  (experience?.city || experience?.state) &&
                  " — "}
                {experience?.city}
                {experience?.city && experience?.state && ", "}
                {experience?.state}
              </p>
              {experience?.workSummary && (
                <div
                  className="text-xs text-gray-700 mt-2 form-preview leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {formData?.education?.length > 0 && (
        <div className="mb-8">
          <h2
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 pb-2 border-b"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Education
          </h2>
          {formData?.education.map((education: any, index: number) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-semibold text-gray-800">
                  {education.universityName}
                </h3>
                <span className="text-xs text-gray-500">
                  {education?.startDate}
                  {education?.startDate &&
                    (education?.endDate || education?.endDate === "") &&
                    " — "}
                  {education?.startDate && education?.endDate === ""
                    ? "Present"
                    : education.endDate}
                </span>
              </div>
              <p className="text-xs text-gray-600 italic">
                {education?.degree}
                {education?.degree && education?.major && " in "}
                {education?.major}
              </p>
              {education?.description && (
                <p className="text-xs text-gray-700 mt-1 leading-relaxed">
                  {education?.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {formData?.skills?.length > 0 && (
        <div className="mb-8">
          <h2
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4 pb-2 border-b"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Skills
          </h2>
          <div className="space-y-3">
            {formData?.skills.map((skillCategory: any, index: number) => {
              // Handle both old format (name/rating) and new format (category/skills)
              if (skillCategory.category && skillCategory.skills) {
                return (
                  <div key={index}>
                    <h3
                      className="text-xs font-semibold mb-2"
                      style={{ color: themeColor }}
                    >
                      {skillCategory.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.skills?.map((skill: string, skillIndex: number) => (
                        <span
                          key={skillIndex}
                          className="text-xs px-3 py-1 rounded-full border"
                          style={{
                            borderColor: themeColor,
                            color: themeColor,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              } else if (skillCategory.name) {
                // Old format
                return (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 rounded-full border mr-1"
                    style={{
                      borderColor: themeColor,
                      color: themeColor,
                    }}
                  >
                    {skillCategory.name}
                  </span>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
