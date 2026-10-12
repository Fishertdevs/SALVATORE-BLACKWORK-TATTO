import { Router, type IRouter } from "express";
import {
  GenerateTattooPreviewBody,
  GenerateTattooPreviewResponse,
} from "@workspace/api-zod";
import { generateTattooPreview } from "@workspace/integrations-gemini-ai/tattoo-preview";

const router: IRouter = Router();
const requestsByIp = new Map<string, number[]>();
const RATE_LIMIT = 4;
const RATE_WINDOW_MS = 60 * 60 * 1000;

router.post("/reservations/tattoo-preview", async (req, res): Promise<void> => {
  const parsed = GenerateTattooPreviewBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Revisa las imágenes y la zona del cuerpo." });
    return;
  }

  const now = Date.now();
  const clientKey = req.ip ?? "unknown";
  const recentRequests = (requestsByIp.get(clientKey) ?? []).filter(
    (timestamp) => now - timestamp < RATE_WINDOW_MS,
  );
  if (recentRequests.length >= RATE_LIMIT) {
    res.status(429).json({
      error: "Has alcanzado el límite temporal de previsualizaciones. Inténtalo más tarde.",
    });
    return;
  }
  recentRequests.push(now);
  requestsByIp.set(clientKey, recentRequests);

  try {
    const preview = await generateTattooPreview(parsed.data);
    const response = GenerateTattooPreviewResponse.parse({
      ...preview,
      disclaimer:
        "Previsualización aproximada generada con IA; el resultado final se definirá en la consulta.",
    });
    res.json(response);
  } catch (error) {
    req.log.error({ error }, "Tattoo preview generation failed");
    res.status(503).json({
      error:
        "La previsualización con IA no está disponible ahora. La solicitud de consulta por WhatsApp sigue disponible.",
    });
  }
});

export default router;
