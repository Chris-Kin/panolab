const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  port: 465,
  secureConnection: true,
  auth: {
    user: 'ymy19891012@163.com',
    pass: '',
  },
});

exports.sendMail = async (ctx, next) => {
  const { recipient, cc, theme, mailContentHTML } = ctx.request.body;
  const mailOptions = {
    from: 'ymy19891012@163.com',
    to: recipient,
    cc,
    subject: theme,
    html: mailContentHTML,
  };
  const sent = await transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return false;
    }
    return true;
  });

  // eslint-disable-next-line
  ctx.body = {
    status: sent ? 0 : -1,
    data: '',
  };
  next();
};
