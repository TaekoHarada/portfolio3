import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = process.env.MY_EMAIL || "";

export interface EmailRequestBody {
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const { email, subject, message }: EmailRequestBody = await req.json();
    console.log("Email data received:", email, subject, message);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [myEmail],
      subject: subject,
      //   react: `Taeko Portfolio Contact form\n\n ${email}\n\n ${message}`,
      react: `Taeko Portfolio Contact: From:  ${email}  Message: ${message}`,
    });

    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
