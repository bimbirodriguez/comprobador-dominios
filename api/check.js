export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ result: "URL no especificada", class:"blocked" });
  }

  try {
    const response = await fetch(url, { method: "GET" });

    if (response.status === 200) {
      return res.json({ status: 200, result: "Disponible", class:"ok" });
    } else if (response.status === 401) {
      return res.json({ status: 401, result: "Disponible (requiere login)", class:"warn" });
    } else if (response.status === 403) {
      return res.json({ status: 403, result: "Bloqueado", class:"blocked" });
    } else {
      return res.json({ status: response.status, result: "Respondió con error", class:"warn" });
    }

  } catch (err) {
    return res.json({ status: "-", result: "No responde", class:"blocked" });
  }
}
