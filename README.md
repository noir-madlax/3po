# 简单互动分享页面

这是一个基于Next.js和Tailwind CSS的简单互动分享页面。

## 本地开发

确保你已安装Node.js和npm，然后按照以下步骤操作：

1. 安装依赖：

```bash
npm install
```

2. 运行开发服务器：

```bash
npm run dev
```

3. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看页面。

## 部署到Vercel

1. 创建Vercel账号（如果没有）：[https://vercel.com/signup](https://vercel.com/signup)

2. 安装Vercel CLI：

```bash
npm install -g vercel
```

3. 登录Vercel：

```bash
vercel login
```

4. 部署项目：

```bash
vercel
```

或者，你可以直接通过Vercel仪表板导入GitHub仓库进行部署。

## 项目结构

- `components/`: 包含页面组件
- `pages/`: Next.js页面
- `styles/`: 样式文件
- `public/`: 静态资源

## 技术栈

- Next.js
- React
- TypeScript
- Tailwind CSS 