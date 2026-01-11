"use client";

import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import { Linkedin, Twitter, Globe, Code2, Github, Instagram } from "lucide-react";

const ClassicTemplate = () => {
  const { formData } = useFormContext();
  const socialLinks = formData?.socialLinks || {};
  const hasAnySocialLink = Object.values(socialLinks).some((link) => link);

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

  const themeColor = formData?.themeColor || themeColors[0];

  const order: string[] = formData?.sectionOrder || ["summary", "experience", "education", "skills"];

  const renderSection = (key: string) => {
    switch (key) {
      case "summary":
        return (
          formData?.summary && (
            <p className="text-xs text-justify">{formData?.summary}</p>
          )
        );
      case "experience":
        return (
          formData?.experience?.length > 0 && (
            <div className="my-6">
              <h2
                className="text-center font-bold text-sm mb-2"
                style={{ color: themeColor }}
              >
                Professional Experience
              </h2>
              <hr style={{ borderColor: themeColor }} />
              {formData?.experience?.map((experience: any, index: number) => (
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
                      {experience?.startDate &&
                        (experience?.endDate || experience?.endDate === "") &&
                        " to "}
                      {experience?.startDate && experience?.endDate === ""
                        ? "Present"
                        : experience.endDate}
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
          )
        );
      case "education":
        return (
          formData?.education?.length > 0 && (
            <div className="my-6">
              <h2
                className="text-center font-bold text-sm mb-2"
                style={{ color: themeColor }}
              >
                Education
              </h2>
              <hr style={{ borderColor: themeColor }} />
              {formData?.education.map((education: any, index: number) => (
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
                      {education?.startDate &&
                        (education?.endDate || education?.endDate === "") &&
                        " to "}
                      {education?.startDate && education?.endDate === ""
                        ? "Present"
                        : education.endDate}
                    </span>
                  </h2>
                  {education?.description && (
                    <p className="text-xs my-2 text-justify">
                      {education?.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )
        );
      case "skills":
        return (
          formData?.skills?.length > 0 && (
            <div className="my-6">
              <h2
                className="text-center font-bold text-sm mb-2"
                style={{ color: themeColor }}
              >
                Skills
              </h2>
              <hr style={{ borderColor: themeColor }} />
              <div className="my-4 space-y-3">
                {formData?.skills.map((skillCategory: any, index: number) => {
                  if (skillCategory.category && skillCategory.skills) {
                    return (
                      <div key={index} className="text-xs">
                        <span className="font-semibold" style={{ color: themeColor }}>
                          {skillCategory.category}:
                        </span>{" "}
                        <span className="text-gray-700">
                          {skillCategory.skills?.join(", ")}
                        </span>
                      </div>
                    );
                  } else if (skillCategory.name) {
                    return (
                      <span key={index} className="text-xs text-gray-700">
                        {skillCategory.name}{index < formData.skills.length - 1 ? ", " : ""}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="shadow-lg p-14 border-t-[20px] bg-white w-[210mm] min-h-[297mm] print:shadow-none"
      style={{ borderColor: themeColor }}
    >
      {/* Personal Details */}
      <div>
        <h2
          className="font-bold text-xl text-center"
          style={{ color: themeColor }}
        >
          {formData?.firstName} {formData?.lastName}
        </h2>
        <h2 className="text-center text-sm font-medium">{formData?.jobTitle}</h2>
        <h2
          className="text-center font-normal text-xs"
          style={{ color: themeColor }}
        >
          {formData?.address}
        </h2>
        <div className="flex justify-between">
          <h2 className="font-normal text-xs" style={{ color: themeColor }}>
            {formData?.phone}
          </h2>
          <h2 className="font-normal text-xs" style={{ color: themeColor }}>
            {formData?.email}
          </h2>
        </div>
        {hasAnySocialLink && (
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {Object.entries(socialLinks).map(([platform, url]: [string, any]) => {
              if (!url) return null;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium hover:underline"
                  style={{ color: themeColor }}
                  title={getPlatformLabel(platform)}
                >
                  {getSocialIcon(platform)}
                  {getPlatformLabel(platform)}
                </a>
              );
            })}
          </div>
        )}
        <hr
          className="border-[1.5px] my-2 mb-5"
          style={{ borderColor: themeColor }}
        />
      </div>

      {order.map((key) => (
        <div key={key}>{renderSection(key)}</div>
      ))}
    </div>
  );
};

export default ClassicTemplate;
