export default function handler(req, res) {
  if (req.method === "POST") {
    const { password } = req.body;

    if (password === process.env.MASTER_PASSWORD) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Falsches Passwort" });
    }
  } else {
    // Nur POST-Anfragen zulassen
    res.status(405).json({ success: false, message: "Methode nicht erlaubt" });
  }
}
