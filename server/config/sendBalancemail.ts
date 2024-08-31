import formData from "form-data";
import Mailgun from "mailgun.js";
import { IBalance } from "./interface";
const API_KEY = process.env.NODEMON_PRIVATE_API || "";
const DOMAIN = process.env.NODEMON_DOMAIN || "";
const sendBalancemail = async (
  mobilenumber: string,
  withdraw: number,
  balance: IBalance
) => {
  const mailgun = new Mailgun(formData);
  const client = mailgun.client({ username: "api", key: API_KEY });
  const messageData = {
    from: "CrunchCave <balance@crunchcave.com>",
    to: "contact@crunchcave.com",
    subject: "Withdraw",
    html: `<p>Mobile Number: ${mobilenumber}</p>
   <p>Profile url: crunchcave.com/profile/${balance.user}</p>
    <p>balance: ${balance.balance}</p>
    <p>Withdraw: ${withdraw}</p>
            `,
  };

  client.messages
    .create(DOMAIN, messageData)
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.error(err);
    });
};

export default sendBalancemail;
