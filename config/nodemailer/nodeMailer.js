import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const transpoter = nodemailer.createTransport({
    service:'gmail',
    host:'smpt.gmail.com',
    port:'587',
    secure:false,
    auth: {
        user: 'puse476@gmail.com',
        pass: 'rdfviwvmdsvodvtl',
      },
});

let renderTemplate = (data, relativepath) => {
 
    let mainHtml;
    ejs.renderFile(
      path.join(__dirname, '../views/mailer', relativepath),
      data,
      function (err, template) {
       
        if (err) {
          console.log('There is a problem with the template');
          return;
        } else {
          mainHtml = template;
        }
      }
    );
    return mainHtml;
  };

  export default {transpoter,renderTemplate}
