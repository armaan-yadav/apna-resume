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
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const ModernTemplate = () => {
  const { formData } = useFormContext();
  const socialLinks = formData?.socialLinks || {};
  const hasAnySocialLink = Object.values(socialLinks).some((link) => link);

  const getSocialIcon = (platform: string) => {
    const iconProps = { size: 12, className: "inline mr-1" };
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

  const getPlatformLabel = (platform: string) => {
    const labels: Record<string, string> = {
      linkedin: "LinkedIn",
      twitter: "Twitter",
      portfolio: "Portfolio",
      leetcode: "LeetCode",
      codeforces: "Codeforces",
      github: "GitHub",
      instagram: "Instagram",
    };
    return labels[platform] || platform;
  };

  const themeColor = formData?.themeColor || themeColors[0];
  const order: string[] = (formData?.sectionOrder || ["summary", "experience", "education", "skills"]).filter((k: string) => k !== "skills");

  const renderRightSection = (key: string) => {
    switch (key) {
      case "summary":
        return (
          formData?.summary && (
            <div className="mb-6">
              <h3
                className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                Profile
              </h3>
              <p className="text-xs text-gray-700 text-justify leading-relaxed">
                {formData?.summary}
              </p>
            </div>
          )
        );
      case "experience":
        return (
          formData?.experience?.length > 0 && (
            <div className="mb-6">
              <h3
                className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                Experience
              </h3>
              {formData?.experience?.map((experience: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold" style={{ color: themeColor }}>
                      {experience?.title}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {experience?.startDate}
                      {experience?.startDate &&
                        (experience?.endDate || experience?.endDate === "") &&
                        " - "}
                      {experience?.startDate && experience?.endDate === ""
                        ? "Present"
                        : experience.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    {experience?.companyName}
                    {experience?.companyName && experience?.city && " | "}
                    {experience?.city}
                    {experience?.city && experience?.state && ", "}
                    {experience?.state}
                  </p>
                  {experience?.workSummary && (
                    <div
                      className="text-xs text-gray-700 mt-1 form-preview"
                      dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
                    />
                  )}
                </div>
              ))}
            </div>
          )
        );
      case "education":
        return (
          formData?.education?.length > 0 && (
            <div className="mb-6">
              <h3
                className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b-2"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                Education
              </h3>
              {formData?.education.map((education: any, index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold" style={{ color: themeColor }}>
                      {education.universityName}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {education?.startDate}
                      {education?.startDate &&
                        (education?.endDate || education?.endDate === "") &&
                        " - "}
                      {education?.startDate && education?.endDate === ""
                        ? "Present"
                        : education.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">
                    {education?.degree}
                    {education?.degree && education?.major && " in "}
                    {education?.major}
                  </p>
                  {education?.description && (
                    <p className="text-xs text-gray-700 mt-1 text-justify">
                      {education?.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div className="shadow-lg bg-white w-[210mm] min-h-[297mm] print:shadow-none flex">
      {/* Left Sidebar */}
      <div
        className="w-[70mm] p-6 text-white min-h-full"
        style={{ backgroundColor: themeColor }}
      >
        {/* Name */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold leading-tight">
            {formData?.firstName}
          </h1>
          <h1 className="text-2xl font-bold leading-tight">
            {formData?.lastName}
          </h1>
          <p className="text-sm mt-2 opacity-90">{formData?.jobTitle}</p>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-1">
            Contact
          </h3>
          {formData?.email && (
            <div className="flex items-center gap-2 text-xs mb-2">
              <Mail size={12} />
              <span className="break-all">{formData?.email}</span>
            </div>
          )}
          {formData?.phone && (
            <div className="flex items-center gap-2 text-xs mb-2">
              <Phone size={12} />
              <span>{formData?.phone}</span>
            </div>
          )}
          {formData?.address && (
            <div className="flex items-center gap-2 text-xs mb-2">
              <MapPin size={12} />
              <span>{formData?.address}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        {hasAnySocialLink && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-1">
              Links
            </h3>
            <div className="space-y-2">
              {Object.entries(socialLinks).map(
                ([platform, url]: [string, any]) => {
                  if (!url) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs hover:underline"
                    >
                      {getSocialIcon(platform)}
                      {getPlatformLabel(platform)}
                    </a>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Skills */}
        {formData?.skills?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 border-b border-white/30 pb-1">
              Skills
            </h3>
            <div className="space-y-3">
              {formData?.skills.map((skillCategory: any, index: number) => {
                // Handle both old format (name/rating) and new format (category/skills)
                if (skillCategory.category && skillCategory.skills) {
                  return (
                    <div key={index}>
                      <div className="text-xs font-semibold mb-1 opacity-90">
                        {skillCategory.category}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {skillCategory.skills?.map((skill: string, skillIndex: number) => (
                          <span
                            key={skillIndex}
                            className="text-xs px-2 py-0.5 bg-white/20 rounded"
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
                      className="text-xs px-2 py-0.5 bg-white/20 rounded mr-1"
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

      {/* Right Content */}
      <div className="flex-1 p-8">
        {order.map((key) => (
          <div key={key}>{renderRightSection(key)}</div>
        ))}
      </div>
    </div>
  );
};

export default ModernTemplate;
