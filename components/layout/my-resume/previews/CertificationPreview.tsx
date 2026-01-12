"use client";

import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";

const CertificationPreview = () => {
  const { formData } = useFormContext();
  const themeColor = formData?.themeColor || themeColors[0];

  if (!formData?.certifications || formData.certifications.length === 0) {
    return null;
  }

  return (
    <div className="my-6">
      <h2 className="text-center font-bold text-sm mb-2" style={{ color: themeColor }}>
        Certifications
      </h2>
      <hr style={{ borderColor: themeColor }} />
      <div className="my-5 space-y-4">
        {formData.certifications.map((cert: any, index: number) => (
          <div key={index}>
            <h3 className="text-sm font-bold" style={{ color: themeColor }}>
              {cert?.title}
            </h3>
            <p className="text-xs text-gray-600">{cert?.issuer}</p>
            <p className="text-xs text-gray-500">
              {cert?.issueDate}
              {cert?.expiryDate && ` - ${cert.expiryDate}`}
            </p>
            {cert?.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                View Credential
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationPreview;
