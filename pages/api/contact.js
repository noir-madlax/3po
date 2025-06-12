import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // 只接受POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  const { name, email, message } = req.body;

  // 创建一个测试用的SMTP传输器
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // 实际项目中应使用环境变量
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'zhangzic@gmail.com',
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 准备邮件内容
  const mailOptions = {
    from: `"Rigel Zhang" <zhangzic@gmail.com>`,
    to: 'jieyun@mit.edu', // 接收者邮箱
    subject: `3PO Lab网站的新消息 - 来自${name}`,
    text: `
      姓名: ${name}
      邮箱: ${email}
      
      消息:
      ${message}
    `,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6d28d9;">3PO Lab网站的新联系请求</h2>
        <p><strong>姓名:</strong> ${name}</p>
        <p><strong>邮箱:</strong> ${email}</p>
        <p><strong>消息:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 4px;">
          ${message.replace(/\n/g, '<br/>')}
        </div>
      </div>
    `
  };

  try {
    // 发送邮件
    // 注释掉实际发送行为，因为这需要有效的SMTP配置
    await transporter.sendMail(mailOptions);
    
    // 在控制台记录邮件内容（开发/测试用）
    console.log('邮件发送成功：', mailOptions.to);
    
    // 返回成功
    res.status(200).json({ success: true, message: '邮件发送成功' });
  } catch (error) {
    console.error('发送邮件失败', error);
    res.status(500).json({ error: '发送邮件失败', details: error.message });
  }
} 