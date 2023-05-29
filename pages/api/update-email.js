import { createTransport } from "nodemailer";

export default async function updateEmail(req, res) {
  if (req.method !== "POST") {
    return res.staus(405).end();
  }

  const { newEmail, email, user } = req.body;

  try {
    // Send email using Nodemailer
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "jatinanjana51@gmail.com",
        pass: "socqywxcpsmtwvrn",
      },
    });

    const mailOptions = {
      from: "jatinanjana51@gmail.com",
      to: email,
      subject: "Your Email Updated",
      text: `Your Email-Id has been changed`,
      html: `
      <center>
       <div style="margin-top: 10%; font-family: DM Mono;">
      <img src="https://thearabicmoallema.com/wp-content/uploads/2022/04/grid4-31-1.png" style="width: 15%; height: 10%">
      <hr style="width: 30%;">  <h2>Welcome to Arabic Moallema</h2>
      <p>
          Hello user,
          Here is your new Email id as a ${user} for Arabic Moallema:
          <br/>
          <hr style="width: 30%;">
          <label style="font-size: 20px;">Previous Email: ${email}</label>
          <br/>
          <label style="font-size: 20px;">New Email: ${newEmail}</label>

          <hr style="width: 30%;">
          <p>If any issues, please connect with info@thearabicmoallema.com</p>
      </p>

  </div>
  <center>`, // html body
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending email" });
  }
}
