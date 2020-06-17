import { nodemailer } from 'nodemailer';

const sendEmail = async (name, subject, email, message) => {

    // Note to self:- Do not push code with SMTP config, put them in enviroment variable//
    let transporter = nodemailer.createTransport({
        host: '',//transporter host name
        port: 587,//transporter port
        secure: false, //true for port 465, false for other ports
        auth: {
            user: 'transporterAccount.email', // transporter email
            pass: 'transporterAccount.pass', // transporter account password
          },
        //this is just for testing on localhost //
          tls: {
            rejectUnAuthorized: false
          }
    })
    // send mail with transporter//
    let mail = await transporter.sendMail({
        from: '"Research Collective Contact" <transporterAccount.email>', 
        to: 'social@researchcollective.io', // can put multiple accounts//
        subject: 'Research Colletive Contact Request',
        text: '', //plain text body//
        html: '' //object from user's response 
    })
    // Message sent//
    console.log("Message sent: %s", mail.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mail));
}
//for catching errors//
sendEmail().catch(console.error);

export default sendEmail