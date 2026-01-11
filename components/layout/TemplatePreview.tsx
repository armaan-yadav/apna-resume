"use client";

import { dummyResumeData } from "@/lib/dummyResume";
import { themeColors } from "@/lib/utils";
import { Linkedin, Twitter, Globe, Code2, Github, Instagram } from "lucide-react";

interface ResumeData {
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  address?: string;
  phone?: string;
  email?: string;
  themeColor?: string;
  summary?: string;
  socialLinks?: Record<string, string>;
  experience?: any[];
  education?: any[];
  skills?: any[];
}

interface TemplatePreviewProps {
  template: "classic" | "modern" | "minimal";
  data?: ResumeData;
  scale?: number;
}

const getSocialIcon = (platform: string) => {
  const iconProps = { size: 14, className: "inline mr-1" };
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

// Classic Template Preview
const ClassicPreview = ({ data }: { data: ResumeData }) => {
  const socialLinks = data?.socialLinks || {};
  const hasAnySocialLink = Object.values(socialLinks).some((link) => link);
  const themeColor = data?.themeColor || themeColors[0];

  return (
    <div
      className="shadow-lg p-14 border-t-[20px] bg-white w-[210mm] min-h-[297mm]"
      style={{ borderColor: themeColor }}
    >
      {/* Personal Details */}
      <div>
        <h2 className="font-bold text-xl text-center" style={{ color: themeColor }}>
          {data?.firstName} {data?.lastName}
        </h2>
        <h2 className="text-center text-sm font-medium">{data?.jobTitle}</h2>
        <h2 className="text-center font-normal text-xs" style={{ color: themeColor }}>
          {data?.address}
        </h2>
        <div className="flex justify-between">
          <h2 className="font-normal text-xs" style={{ color: themeColor }}>
            {data?.phone}
          </h2>
          <h2 className="font-normal text-xs" style={{ color: themeColor }}>
            {data?.email}
          </h2>
        </div>
        {hasAnySocialLink && (
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {Object.entries(socialLinks).map(([platform, url]) => {
              if (!url) return null;
              return (
                <span
                  key={platform}
                  className="text-xs font-medium"
                  style={{ color: themeColor }}
                >
                  {getSocialIcon(platform)}
                  {getPlatformLabel(platform)}
                </span>
              );
            })}
          </div>
        )}
        <hr className="border-[1.5px] my-2 mb-5" style={{ borderColor: themeColor }} />
      </div>

      {/* Summary */}
      {data?.summary && <p className="text-xs text-justify">{data?.summary}</p>}

      {/* Experience */}
      {data?.experience && data.experience.length > 0 && (
        <div className="my-6">
          <h2 className="text-center font-bold text-sm mb-2" style={{ color: themeColor }}>
            Professional Experience
          </h2>
          <hr style={{ borderColor: themeColor }} />
          {data.experience.map((experience: any, index: number) => (
            <div key={index} className="my-5">
              <h2 className="text-sm font-bold" style={{ color: themeColor }}>
                {experience?.title}
              </h2>
              <h2 className="text-xs flex justify-between">
                {experience?.companyName}
                {experience?.companyName && experience?.city && ", "}
                {experience?.city}
                {experience?.city && experience?.state && ", "}
                {experience?.state}
                <span>
                  {experience?.startDate}
                  {experience?.startDate && (experience?.endDate || experience?.endDate === "") && " to "}
                  {experience?.startDate && experience?.endDate === "" ? "Present" : experience.endDate}
                </span>
              </h2>
              {experience?.workSummary && (
                <div
                  className="text-xs my-2 form-preview"
                  dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data?.education && data.education.length > 0 && (
        <div className="my-6">
          <h2 className="text-center font-bold text-sm mb-2" style={{ color: themeColor }}>
            Education
          </h2>
          <hr style={{ borderColor: themeColor }} />
          {data.education.map((education: any, index: number) => (
            <div key={index} className="my-5">
              <h2 className="text-sm font-bold" style={{ color: themeColor }}>
                {education.universityName}
              </h2>
              <h2 className="text-xs flex justify-between">
                {education?.degree}
                {education?.degree && education?.major && " in "}
                {education?.major}
                <span>
                  {education?.startDate}
                  {education?.startDate && (education?.endDate || education?.endDate === "") && " to "}
                  {education?.startDate && education?.endDate === "" ? "Present" : education.endDate}
                </span>
              </h2>
              {education?.description && (
                <p className="text-xs my-2 text-justify">{education?.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data?.skills && data.skills.length > 0 && (
        <div className="my-6">
          <h2 className="text-center font-bold text-sm mb-2" style={{ color: themeColor }}>
            Skills
          </h2>
          <hr style={{ borderColor: themeColor }} />
          <div className="my-4 space-y-3">
            {data.skills.map((skillCategory: any, index: number) => (
              <div key={index} className="text-xs">
                <span className="font-semibold" style={{ color: themeColor }}>
                  {skillCategory.category}:
                </span>{" "}
                <span className="text-gray-700">{skillCategory.skills?.join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Modern Template Preview
const ModernPreview = ({ data }: { data: ResumeData }) => {
  const socialLinks = data?.socialLinks || {};
  const hasAnySocialLink = Object.values(socialLinks).some((link) => link);
  const themeColor = data?.themeColor || themeColors[0];

  return (
    <div className="shadow-lg bg-white w-[210mm] min-h-[297mm] flex">
      {/* Sidebar */}
      <div className="w-1/3 p-6 text-white" style={{ backgroundColor: themeColor }}>
        <div className="mb-8">
          <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold">
              {data?.firstName?.[0]}
              {data?.lastName?.[0]}
            </span>
          </div>
          <h2 className="font-bold text-lg text-center">
            {data?.firstName} {data?.lastName}
          </h2>
          <p className="text-center text-sm opacity-90">{data?.jobTitle}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-sm mb-2 border-b border-white/30 pb-1">Contact</h3>
          <div className="space-y-1 text-xs">
            {data?.email && <p className="break-all">{data?.email}</p>}
            {data?.phone && <p>{data?.phone}</p>}
            {data?.address && <p>{data?.address}</p>}
          </div>
        </div>

        {hasAnySocialLink && (
          <div className="mb-6">
            <h3 className="font-bold text-sm mb-2 border-b border-white/30 pb-1">Links</h3>
            <div className="space-y-1 text-xs">
              {Object.entries(socialLinks).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <p key={platform} className="flex items-center gap-1">
                    {getSocialIcon(platform)}
                    {getPlatformLabel(platform)}
                  </p>
                );
              })}
            </div>
          </div>
        )}

        {data?.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-sm mb-2 border-b border-white/30 pb-1">Skills</h3>
            <div className="space-y-3">
              {data.skills.map((skillCategory: any, index: number) => (
                <div key={index}>
                  <p className="text-xs font-semibold mb-1">{skillCategory.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {skillCategory.skills?.map((skill: string, skillIndex: number) => (
                      <span
                        key={skillIndex}
                        className="text-[10px] bg-white/20 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8">
        {data?.summary && (
          <div className="mb-6">
            <h3 className="font-bold text-sm mb-2" style={{ color: themeColor }}>
              Profile
            </h3>
            <p className="text-xs text-gray-700 text-justify">{data?.summary}</p>
          </div>
        )}

        {data?.experience && data.experience.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-sm mb-3" style={{ color: themeColor }}>
              Experience
            </h3>
            {data.experience.map((experience: any, index: number) => (
              <div key={index} className="mb-4 relative pl-4 border-l-2" style={{ borderColor: themeColor }}>
                <h4 className="text-sm font-semibold">{experience?.title}</h4>
                <p className="text-xs text-gray-600">
                  {experience?.companyName} | {experience?.city}, {experience?.state}
                </p>
                <p className="text-xs text-gray-500 mb-1">
                  {experience?.startDate} -{" "}
                  {experience?.endDate === "" ? "Present" : experience?.endDate}
                </p>
                {experience?.workSummary && (
                  <div
                    className="text-xs text-gray-700 form-preview"
                    dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {data?.education && data.education.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-sm mb-3" style={{ color: themeColor }}>
              Education
            </h3>
            {data.education.map((education: any, index: number) => (
              <div key={index} className="mb-3 pl-4 border-l-2" style={{ borderColor: themeColor }}>
                <h4 className="text-sm font-semibold">{education?.universityName}</h4>
                <p className="text-xs text-gray-600">
                  {education?.degree} in {education?.major}
                </p>
                <p className="text-xs text-gray-500">
                  {education?.startDate} - {education?.endDate === "" ? "Present" : education?.endDate}
                </p>
                {education?.description && (
                  <p className="text-xs text-gray-700 mt-1">{education?.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Minimal Template Preview
const MinimalPreview = ({ data }: { data: ResumeData }) => {
  const socialLinks = data?.socialLinks || {};
  const hasAnySocialLink = Object.values(socialLinks).some((link) => link);
  const themeColor = data?.themeColor || themeColors[0];

  return (
    <div className="shadow-lg p-12 bg-white w-[210mm] min-h-[297mm]">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light tracking-wide" style={{ color: themeColor }}>
          {data?.firstName} {data?.lastName}
        </h1>
        <p className="text-sm text-gray-600 mt-1">{data?.jobTitle}</p>
        <div className="flex justify-center items-center gap-3 mt-2 text-xs text-gray-500">
          {data?.email && <span>{data?.email}</span>}
          {data?.email && data?.phone && <span>•</span>}
          {data?.phone && <span>{data?.phone}</span>}
          {data?.phone && data?.address && <span>•</span>}
          {data?.address && <span>{data?.address}</span>}
        </div>
        {hasAnySocialLink && (
          <div className="flex justify-center gap-3 mt-2">
            {Object.entries(socialLinks).map(([platform, url]) => {
              if (!url) return null;
              return (
                <span key={platform} className="text-xs" style={{ color: themeColor }}>
                  {getSocialIcon(platform)}
                  {getPlatformLabel(platform)}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary */}
      {data?.summary && (
        <div className="mb-8">
          <p className="text-xs text-gray-600 text-center leading-relaxed max-w-2xl mx-auto">
            {data?.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {data?.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: themeColor }}>
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((experience: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-medium">{experience?.title}</h3>
                  <span className="text-xs text-gray-500">
                    {experience?.startDate} - {experience?.endDate === "" ? "Present" : experience?.endDate}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {experience?.companyName}, {experience?.city}, {experience?.state}
                </p>
                {experience?.workSummary && (
                  <div
                    className="text-xs text-gray-600 mt-1 form-preview"
                    dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data?.education && data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: themeColor }}>
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((education: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-medium">{education?.universityName}</h3>
                  <span className="text-xs text-gray-500">
                    {education?.startDate} - {education?.endDate === "" ? "Present" : education?.endDate}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {education?.degree} in {education?.major}
                </p>
                {education?.description && (
                  <p className="text-xs text-gray-500 mt-1">{education?.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data?.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: themeColor }}>
            Skills
          </h2>
          <div className="space-y-3">
            {data.skills.map((skillCategory: any, index: number) => (
              <div key={index}>
                <span className="text-xs font-medium" style={{ color: themeColor }}>
                  {skillCategory.category}:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {skillCategory.skills?.map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className="text-xs px-2 py-0.5 rounded-full border"
                      style={{ borderColor: themeColor, color: themeColor }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TemplatePreview = ({ template, data = dummyResumeData, scale = 0.4 }: TemplatePreviewProps) => {
  const renderTemplate = () => {
    switch (template) {
      case "classic":
        return <ClassicPreview data={data} />;
      case "modern":
        return <ModernPreview data={data} />;
      case "minimal":
        return <MinimalPreview data={data} />;
      default:
        return <ClassicPreview data={data} />;
    }
  };

  return (
    <div
      className="origin-top-left"
      style={{
        transform: `scale(${scale})`,
        width: "210mm",
        height: "297mm",
      }}
    >
      {renderTemplate()}
    </div>
  );
};

export default TemplatePreview;
