/* eslint-disable sonarjs/no-duplicate-string */
import nodemailer from 'nodemailer';

export const sendEmailModerationVerdict = async ({ email, entity, verdict, verdictMessage }) => {
  const transporter = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'nick.max.kovaly@gmail.com',
      pass: 'kqbggsufrjmocuhu',
    },
  });

  await transporter.sendMail({
    from: 'nick.max.kovaly@gmail.com',
    to: email,
    subject: 'Модерация Oggetto Цифровое ВДНХ',
    html: `
                <div>
                    <b>Здравствуйте ${email}.</b>
                </div>
                <div>
                    Ваш ${entity} проверил модератор, и вынес следующий вердикт <b>"${verdict}"</b>.
                    <div>
                        <i>${verdictMessage}</i>
                    </div>
                </div>
        `,
  });
};
