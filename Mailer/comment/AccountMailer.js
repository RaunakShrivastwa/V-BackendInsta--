import nodemailer from "../../config/nodemailer/nodeMailer.js";

export default class AccountMailer{

    sendMail = (user)=>{
        
        let htmlString= nodemailer.renderTemplate({Comment:user},'/main/mainTemplate.ejs')
        nodemailer.transpoter.sendMail({
            from:'javaprogramming58@gmail.com',
            to: user.email,
            subject: 'Verify Your Identity',
            html:`
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">

            <div style="width: 80%; margin: 50px auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
              <h2 style="text-align: center; margin-bottom: 20px;">Welcome to Our Social Media Platform!</h2>
          
              <p style="text-align: center; margin-bottom: 20px;">Register now and connect with friends!</p>
          
              <div style="text-align: center; margin-bottom: 20px;">
              <span>
              <span style="padding:3px;border-radius:50%;background-color:cyan;width:50px;height:50px">Save<span style="color:red">Life</span></span>
            </span>
              </div>
          
              <p style="text-align: center;">Your One-Time Password (OTP) for verification:</p>
              <div style="text-align: center; font-size: 24px; margin-bottom: 20px;">${user.OTP}</div> <!-- Replace this with the actual OTP generated dynamically -->
          
              <p style="text-align: center;">Please use this OTP to complete your registration process.</p>
          
              <p style="text-align: center;">Didn't register? Ignore this message.</p>
          
              <p style="text-align: center; margin-top: 20px;">Thank you,<br>Your Social Media Team</p>
            </div>
          
          </body>
            
            `
        },
        (err,info)=>{
            if(err){
                console.log("there is error with sending mail",err);
                return;
            }
            console.log("message send !!!",info);
            return;
        }
        )
    }
}