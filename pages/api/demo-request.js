import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '方法不允许' });
  }

  const { name, company, email, datetime, comments, product } = req.body;

  // 创建SMTP传输器
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'zhangzic@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
  });

  // 准备邮件内容
  const mailOptions = {
    from: `"Rigel Zhang" <zhangzic@gmail.com>`,
    to: 'jieyun@mit.edu',
    subject: `3PO Lab - ${product}演示请求 - 来自${name}`,
    text: `
      产品: ${product}
      姓名: ${name}
      公司: ${company}
      邮箱: ${email}
      首选日期和时间: ${datetime}
      
      附加评论:
      ${comments || '无'}
    `,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6d28d9;">3PO Lab - ${product}演示请求</h2>
        <p><strong>产品:</strong> ${product}</p>
        <p><strong>姓名:</strong> ${name}</p>
        <p><strong>公司:</strong> ${company}</p>
        <p><strong>邮箱:</strong> ${email}</p>
        <p><strong>首选日期和时间:</strong> ${datetime}</p>
        <p><strong>附加评论:</strong></p>
        <div style="background: #f9fafb; padding: 15px; border-radius: 4px;">
          ${comments ? comments.replace(/\n/g, '<br/>') : '无'}
        </div>
      </div>
    `
  };

  try {
    // 发送邮件
    await transporter.sendMail(mailOptions);
    
    console.log('演示请求邮件发送成功：', mailOptions.to);
    
    res.status(200).json({ success: true, message: '演示请求已发送' });
  } catch (error) {
    console.error('发送邮件失败', error);
    res.status(500).json({ error: '发送邮件失败', details: error.message });
  }
} 