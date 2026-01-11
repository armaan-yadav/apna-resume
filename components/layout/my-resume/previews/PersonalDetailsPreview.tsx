import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";
import { Linkedin, Twitter, Globe, Code2, Github, Instagram } from "lucide-react";

function PersonalDetailsPreview() {
  const { formData } = useFormContext();
  
  const socialLinks = formData?.socialLinks || {};
  const hasAnySocialLink = Object.values(socialLinks).some(link => link);

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
  
  return (
    <div>
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: formData?.themeColor || themeColors[0],
        }}
      >
        {formData?.firstName} {formData?.lastName}
      </h2>

      <h2 className="text-center text-sm font-medium">
        {formData?.jobTitle}
      </h2>

      <h2
        className="text-center font-normal text-xs"
        style={{
          color: formData?.themeColor || themeColors[0],
        }}
      >
        {formData?.address}
      </h2>

      <div className="flex justify-between">
        <h2
          className="font-normal text-xs"
          style={{
            color: formData?.themeColor || themeColors[0],
          }}
        >
          {formData?.phone}
        </h2>

        <h2
          className="font-normal text-xs"
          style={{
            color: formData?.themeColor || themeColors[0],
          }}
        >
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
                style={{
                  color: formData?.themeColor || themeColors[0],
                }}
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
        style={{
          borderColor: formData?.themeColor || themeColors[0],
        }}
      />
    </div>
  );
}

export default PersonalDetailsPreview;
