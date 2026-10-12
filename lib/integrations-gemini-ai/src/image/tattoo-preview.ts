import { GoogleGenAI, Modality } from "@google/genai";

type SupportedImageMime = "image/jpeg" | "image/png" | "image/webp";

export async function generateTattooPreview(input: {
  bodyPhotoBase64: string;
  bodyPhotoMimeType: SupportedImageMime;
  referencePhotoBase64: string;
  referencePhotoMimeType: SupportedImageMime;
  placement: string;
}): Promise<{ previewBase64: string; mimeType: string }> {
  const apiKey = process.env.AI_INTEGRATIONS_GEMINI_API_KEY;
  const baseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;
  if (!apiKey || !baseUrl) {
    throw new Error("Gemini AI integration is unavailable for this account.");
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: { apiVersion: "", baseUrl },
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: [
              "Create one realistic, approximate tattoo placement preview by editing the first image.",
              "The first image is the customer's body-area photo. The second image is the tattoo design reference.",
              `Apply the reference design to this exact placement: ${input.placement}.`,
              "Keep the person's body, pose, skin tone, lighting, background, and framing unchanged.",
              "Adapt the tattoo to the skin's curvature, perspective, scale, and lighting. Do not add other tattoos, text, or objects.",
              "Do not redesign the reference beyond what is necessary to fit the body. Return only the edited image.",
            ].join(" "),
          },
          {
            inlineData: {
              mimeType: input.bodyPhotoMimeType,
              data: input.bodyPhotoBase64,
            },
          },
          {
            inlineData: {
              mimeType: input.referencePhotoMimeType,
              data: input.referencePhotoBase64,
            },
          },
        ],
      },
    ],
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  const imagePart = response.candidates?.[0]?.content?.parts?.find(
    (part) => part.inlineData?.data,
  );
  if (!imagePart?.inlineData?.data) {
    throw new Error("Gemini did not return a tattoo preview image.");
  }

  return {
    previewBase64: imagePart.inlineData.data,
    mimeType: imagePart.inlineData.mimeType || "image/png",
  };
}
