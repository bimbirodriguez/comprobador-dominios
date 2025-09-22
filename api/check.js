import { request } from 'undici';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ result: "URL no especificada", class:"blocked" });

  try {
    const { statusCode } = await request(url, {
      method: 'GET',
      maxRedirections: 5,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    if (statusCode === 200) return res.json({ status: 200, result: "Disponible", class:"ok" });
    if (statusCode === 401) return res.json({ status: 401, result: "Disponible (requiere login)", class:"warn" });
    if (statusCode === 403) return res.json({ status: 403, result: "Bloqueado", class:"blocked" });

    return res.json({ status: statusCode, result: "Respondió con error", class:"warn" });

  } catch (err) {
    return res.json({ status: "-", result: "No responde / Bloqueado", class:"blocked" });
  }
}
