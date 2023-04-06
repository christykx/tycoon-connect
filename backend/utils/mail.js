// const nodemailer = require('nodemailer')

// exports.generateOTP = () => {
//     let otp = ''
//     for (let i = 0; i <= 3; i++) {
//         const randVal = Math.round(Math.random() * 9)
//         otp = otp + randVal
//     }
//     return otp;
// }

// exports.mailTransport = () => nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: "271f657e05acc9",
//         pass: "630d41268cc3f2"
//     }
// });


// exports.generateEmailTemplate = code => {
//     return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <style>
//     @media only screen and (max-width:620px){
//         h1{
//             font-size:20px;
//             padding:5px;
//         }
//     }
//     </style>
//     </head>
//     <body>
//     <div>
//     <div style="max-width:620px; margin:0 auto; font-family: sans-serif;color:"#272727;">
//     <h1 style="background:#f6f6f6;padding:10px;text-align:center;color:"#272727">Welcome 
//      to Tycoon Connect!</h1>
//     <p style="text-align:center">Please verify your Email to countinue.Do not share your otp with anyone.</p>
//     <p style="text-align:center">Your verification code is:
//     <span style="width:80px;margin:0 auto; font-weight:bold;
//     text-align:center;background:"#f6f6f6"; border-radius:5px;
//     font-size:25px">${code}</span ></p>
// </div>
// </div>
// </body>
// </html>
// `;
// };

