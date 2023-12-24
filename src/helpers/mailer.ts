import bcryptjs, { hash } from "bcryptjs";
import nodemailer from "nodemailer";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, id, subject, html }: any) => {
    try {
        //create hashed token
        const hashedToken = await bcryptjs.hash(id.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(id, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(id, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.APP_USER,
                pass: process.env.APP_PASS,
            },
        });

        let mailOptions;
        if (emailType === "VERIFY" || emailType === "RESET") {
            mailOptions = {
                from: process.env.APP_USER,
                to: email,
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                html: `<p>Click <a href="${process.env.DOMAIN}/
                    verifyemail?token=${hashedToken}">here</a> to ${
                    emailType === "VERIFY" ? "Verify your email" : "Reset your password"
                }
                    or copy and paste the link below in your browser. <br> ${
                        process.env.DOMAIN
                    }/verifyemail?token=${hashedToken}
                    </p>`,
            };
        } else {
            mailOptions = {
                from: process.env.APP_USER,
                to: email,
                subject: subject,
                html: html,
            };
        }
        console.log(mailOptions);

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
