import connectDatabase from "@/lib/dbConnect";
import formModel from "@/lib/form.model";
import { NextRequest, NextResponse } from "next/server";
import { sendAdminNotification, sendUserConfirmation } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    await connectDatabase("portfolio", process.env.MONGODB_URI);
    const data = await req.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Please fill in all fields" },
        { status: 400 }
      );
    }

    // Save to database
    const newForm = new formModel({
      name,
      email,
      subject,
      message,
    });
    await newForm.save();

    // Send emails with better error handling
    try {
      const [adminMailResult, userMailResult] = await Promise.all([
        sendAdminNotification(data),
        sendUserConfirmation(data),
      ]);

      return NextResponse.json({
        message: "Form submitted and emails sent successfully",
        adminMail: adminMailResult.messageId,
        userMail: userMailResult.messageId,
      });
    } catch (emailError) {
      return NextResponse.json(
        {
          message: "Form saved but email sending failed",
          error: emailError,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error submitting form",
        error: error,
      },
      { status: 500 }
    );
  }
}
