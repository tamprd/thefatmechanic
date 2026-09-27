// Vercel serverless function: POST /api/contact  ->  emails Adam via Resend.
// Needs env vars in Vercel (Settings > Environment Variables):
//   RESEND_API_KEY   re_xxx from resend.com
//   CONTACT_TO       adam@thefatmechanic.com.au
//   CONTACT_FROM     The Fat Mechanic Website <website@thefatmechanic.com.au>
//                    (domain must be verified in Resend)

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const TOPICS = ["Collab or sponsorship", "Media", "Merch", "Events", "Just saying g'day"];

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let body = req.body || {};
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }

  // Honeypot: bots fill this, humans never see it. Pretend success.
  if (body._gotcha) return res.status(200).json({ ok: true });

  const name = String(body.name || "").trim().slice(0, 120);
  const email = String(body.email || "").trim().slice(0, 200);
  const topic = TOPICS.includes(body.topic) ? body.topic : "Website enquiry";
  const message = String(body.message || "").trim().slice(0, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: "Name, a valid email and a message are required." });
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    console.error("Contact form: missing env vars");
    return res.status(500).json({ ok: false, error: "Form not configured." });
  }

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">New message from thefatmechanic.com.au</h2>
      <p style="margin:0 0 4px"><strong>Topic:</strong> ${esc(topic)}</p>
      <p style="margin:0 0 4px"><strong>Name:</strong> ${esc(name)}</p>
      <p style="margin:0 0 16px"><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <div style="padding:14px 16px;background:#f3f3ef;border-left:4px solid #CBFF40;white-space:pre-wrap">${esc(message)}</div>
      <p style="margin:16px 0 0;color:#666;font-size:13px">Hit reply to answer ${esc(name)} directly.</p>
    </div>`;
  const text = `Topic: ${topic}\nName: ${name}\nEmail: ${email}\n\n${message}`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: CONTACT_TO.split(",").map(s => s.trim()),
        reply_to: email,
        subject: `[${topic}] ${name} via thefatmechanic.com.au`,
        html,
        text
      })
    });
    if (!r.ok) {
      console.error("Resend error", r.status, await r.text());
      return res.status(502).json({ ok: false, error: "Send failed." });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Resend request failed", e);
    return res.status(502).json({ ok: false, error: "Send failed." });
  }
};
