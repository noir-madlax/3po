// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const App: React.FC = () => {
  const [xsightModalVisible, setXsightModalVisible] = useState<boolean>(false);
  const [curioModalVisible, setCurioModalVisible] = useState<boolean>(false);
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [contactFormStatus, setContactFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [demoFormStatus, setDemoFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const showModal = (modalSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    modalSetter(true);
    document.body.style.overflow = 'hidden';
  };

  const hideModal = (modalSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    modalSetter(false);
    document.body.style.overflow = '';
  };

  const showSuccessModal = () => {
    hideModal(setXsightModalVisible);
    hideModal(setCurioModalVisible);
    setSuccessModalVisible(true);
  };

  // 处理演示请求表单
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDemoFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      company: formData.get('company'),
      email: formData.get('email'),
      datetime: formData.get('datetime'),
      comments: formData.get('comments'),
      // 确定当前是哪个产品的演示请求
      product: xsightModalVisible ? 'Xsight' : 'Curio'
    };
    
    try {
      const response = await fetch('/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setDemoFormStatus('success');
        // 清空表单
        (e.target as HTMLFormElement).reset();
        // 显示成功模态框
        setTimeout(() => {
          setDemoFormStatus('idle');
          showSuccessModal();
        }, 1000);
      } else {
        setDemoFormStatus('error');
        setTimeout(() => setDemoFormStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('发送演示请求失败', error);
      setDemoFormStatus('error');
      setTimeout(() => setDemoFormStatus('idle'), 5000);
    }
  };

  // 处理联系表单提交
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setContactFormStatus('success');
        // 清空表单
        (e.target as HTMLFormElement).reset();
        // 2秒后重置状态
        setTimeout(() => setContactFormStatus('idle'), 5000);
      } else {
        setContactFormStatus('error');
        setTimeout(() => setContactFormStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('发送邮件失败', error);
      setContactFormStatus('error');
      setTimeout(() => setContactFormStatus('idle'), 5000);
    }
  };

  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor: Element) => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (href !== '#') {
          document.querySelector(href as string)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // 设置Intersection Observer来监测各个部分的可见性
    const sectionIds = ['hero', 'products', 'about', 'contact'];
    const observerOptions = {
      root: null, // 使用视口作为根
      rootMargin: '-100px', 
      threshold: 0.3, // 当30%的元素可见时触发
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          
          // 更新URL，但不触发页面刷新
          if (entry.target.id !== 'hero') {
            history.replaceState(null, '', `#${entry.target.id}`);
          } else {
            history.replaceState(null, '', window.location.pathname);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 对每个部分进行观察
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // 在页面加载时滚动到锚点位置（如果URL中有锚点）
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }

    return () => {
      // 清理观察器
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>3PO Lab: Turning Customer Insights into Decisions</title>
        <link rel="icon" type="image/svg+xml" href="/3po_logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css" />
        <script src="https://cdn.tailwindcss.com/3.4.16" />
        <script
          dangerouslySetInnerHTML={{
            __html: `tailwind.config={theme:{extend:{colors:{primary:'#6d28d9',secondary:'#8b5cf6'},borderRadius:{'none':'0px','sm':'4px',DEFAULT:'8px','md':'12px','lg':'16px','xl':'20px','2xl':'24px','3xl':'32px','full':'9999px','button':'8px'}}}}`
          }}
        />
      </Head>

      <style jsx global>{`
        :where([class^="ri-"])::before { content: "\\f3c2"; }
        body {
          font-family: 'Inter', sans-serif;
          background-color: #111827;
          color: #f3f4f6;
        }
        .card {
          background: rgba(31, 41, 55, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(109, 40, 217, 0.3);
        }
        .gradient-text {
          background: linear-gradient(90deg, #8b5cf6, #6d28d9);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .logo-text {
          font-family: 'Pacifico', cursive;
          color: #f3f4f6;
          font-size: 2.2rem;
          font-weight: 400;
        }
        /* 为数字3添加特殊样式，使其显示得更大 */
        .logo-text .number-3 {
          font-size: 1.3em; /* 设置为正常字体的1.3倍大小 */
          font-weight: 200; /* 设置字体粗细度为较细 */
          display: inline-block;
          vertical-align: baseline;
        }
        /* 导航菜单样式 */
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        .nav-link:after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #8b5cf6;
          transition: width 0.3s ease;
        }
        .nav-link.active {
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        .nav-link.active:after {
          width: 100%;
        }
        .nav-link:hover:after {
          width: 100%;
        }
        input:focus {
          outline: none;
        }
        @keyframes floating {
          0% { transform: translateY(0) rotate(var(--rotation)); }
          50% { transform: translateY(-10px) rotate(var(--rotation)); }
          100% { transform: translateY(0) rotate(var(--rotation)); }
        }
        .floating-emoji {
          animation: floating 2s ease-in-out infinite;
          animation-delay: var(--delay);
          transform-origin: center;
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden">
        {/* Navigation */}
        <nav className="relative z-10 px-6 py-4 flex justify-between items-center">
          <div className="h-10 flex items-center">
            <span className="logo-text"><span className="number-3">3</span>PO Lab</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#products" className={`nav-link ${activeSection === 'products' ? 'active' : ''}`}>Products</a>
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About Us</a>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="relative z-10 px-6 py-20 md:py-32 flex flex-col items-center justify-center text-center">
          <div className="relative">
            <div className="absolute -top-12 -left-4 md:-left-12 text-4xl md:text-5xl floating-emoji" style={{ '--rotation': '-15deg', '--delay': '0s' } as React.CSSProperties}>💬</div>
            <div className="absolute -top-8 right-0 md:right-4 text-4xl md:text-5xl floating-emoji" style={{ '--rotation': '15deg', '--delay': '0.5s' } as React.CSSProperties}>📣</div>
            <div className="absolute -bottom-8 left-8 md:left-16 text-4xl md:text-5xl floating-emoji" style={{ '--rotation': '0deg', '--delay': '1s' } as React.CSSProperties}>😍</div>
            <div className="absolute -bottom-12 right-8 md:right-16 text-4xl md:text-5xl floating-emoji" style={{ '--rotation': '10deg', '--delay': '1.5s' } as React.CSSProperties}>💙</div>
            <div className="absolute top-4 left-1/4 text-4xl md:text-5xl floating-emoji" style={{ '--rotation': '-10deg', '--delay': '2s' } as React.CSSProperties}>❤️</div>
            <div className="absolute -top-16 left-1/2 text-4xl md:text-5xl floating-emoji" style={{ '--rotation': '20deg', '--delay': '2.5s' } as React.CSSProperties}>👍🏾</div>
            <div className="absolute top-8 right-1/3 text-4xl md:text-5xl floating-emoji" style={{ '--rotation': '-5deg', '--delay': '3s' } as React.CSSProperties}>📊</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 relative z-10">
              <span className="gradient-text">Turning Customer Insights into Decisions</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl gradient-text max-w-3xl mb-12"></p>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12">
            At 3PO Lab, we develop AI-powered market research tools that make it easier and faster to gather, understand, and act on customer insights.
          </p>
        </section>

        {/* Products Section */}
        <section id="products" className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">Products</h2>
            <div className="grid md:grid-cols-2 gap-10">
              {/* Xsight Product Card */}
              <div className="card p-8 rounded-lg relative overflow-hidden group">
                <h3 className="text-2xl font-bold mb-4">
                  Xsight
                </h3>
                <p className="text-gray-300 mb-8">
                  A Voice of Customer (VoC) intelligence platform that extract actionable insights dynamically from large volumes of customer feedback across multiple sales and social media.
                </p>
                <button 
                  onClick={() => showModal(setXsightModalVisible)}
                  className="bg-primary text-white px-6 py-2 rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap"
                >
                  Ask for demo
                </button>
              </div>
              
              {/* Curio Product Card */}
              <div className="card p-8 rounded-lg relative overflow-hidden group">
                <h3 className="text-2xl font-bold mb-4">
                  Curio
                </h3>
                <p className="text-gray-300 mb-8">
                  An AI-driven survey tool that generates the right questions in real time, identifies and follow up high-value users, and summarizes insights from all surveys through interactive visuals.
                </p>
                <button 
                  onClick={() => showModal(setCurioModalVisible)}
                  className="bg-primary text-white px-6 py-2 rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap"
                >
                  Ask for demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="relative z-10 px-6 py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">About Us</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-16">
              We are a team affiliated with MIT. The intelligence behind our tools is grounded in the invisible philosophy of customer understanding, shaped by leading research from the MIT Sloan School of Management.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <div className="card p-6 rounded-lg text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                  <div className="w-full h-full" style={{ backgroundImage: `url('https://static.readdy.ai/image/7779cfed61de5aa6068d316a1875a0fd/55f386050884eb7bb6bf9e3d34642267.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                </div>
                <h3 className="text-xl font-bold mb-1">Chengfeng Mao</h3>
                <p className="text-primary text-sm mb-3">Co-founder & AI Scientist</p>
                <p className="text-gray-400 text-sm">MIT PhD candidate</p>
              </div>
              
              {/* Team Member 2 */}
              <div className="card p-6 rounded-lg text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                  <div className="w-full h-full" style={{ backgroundImage: `url('https://static.readdy.ai/image/7779cfed61de5aa6068d316a1875a0fd/9c93b9815fe3dae69c322929c1387815.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                </div>
                <h3 className="text-xl font-bold mb-1">Scarlett Lin</h3>
                <p className="text-primary text-sm mb-3">Co-founder & Marketer</p>
                <p className="text-gray-400 text-sm">MIT MBA candidate</p>
              </div>
              
              {/* Team Member 3 */}
              <div className="card p-6 rounded-lg text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                  <div className="w-full h-full" style={{ backgroundImage: `url('https://static.readdy.ai/image/7779cfed61de5aa6068d316a1875a0fd/d67d368e7befb3c2c290e09a5326e563.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                </div>
                <h3 className="text-xl font-bold mb-1">Rigel Zhang</h3>
                <p className="text-primary text-sm mb-3">Co-founder & Engineer</p>
              </div>
              
              {/* Team Member 4 */}
              <div className="card p-6 rounded-lg text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                  <div className="w-full h-full" style={{ backgroundImage: `url('https://static.readdy.ai/image/7779cfed61de5aa6068d316a1875a0fd/4976e9599146e9e65fc9d3fd4e705031.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                </div>
                <h3 className="text-xl font-bold mb-1">Prof. John Hauser</h3>
                <p className="text-primary text-sm mb-3">Advisor</p>
                <p className="text-gray-400 text-sm">MIT Sloan School of Management</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative z-10 px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-16 text-center">Get in Touch</h2>
            <div className="card p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
                  <p className="text-gray-300 mb-6">
                    Interested in our products? Have questions about how we can help your business? Reach out to us!
                  </p>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 flex items-center justify-center text-primary mr-3">
                      <i className="ri-map-pin-line text-xl"></i>
                    </div>
                    <span className="text-gray-300">Cambridge, Massachusetts</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 flex items-center justify-center text-primary mr-3">
                      <i className="ri-mail-line text-xl"></i>
                    </div>
                    <span className="text-gray-300">jieyun@mit.edu</span>
                  </div>
               </div>
                <div>
                  <form onSubmit={handleContactSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                      <input type="text" id="name" name="name" className="w-full bg-gray-800 border-none rounded p-3 text-white" placeholder="Your name" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <input type="email" id="email" name="email" className="w-full bg-gray-800 border-none rounded p-3 text-white" placeholder="Your email" required />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                      <textarea id="message" name="message" rows={4} className="w-full bg-gray-800 border-none rounded p-3 text-white" placeholder="Your message" required></textarea>
                    </div>
                    <button 
                      type="submit" 
                      className="bg-primary text-white px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap w-full relative overflow-hidden"
                      disabled={contactFormStatus === 'submitting'}
                    >
                      {contactFormStatus === 'submitting' && (
                        <span className="absolute inset-0 flex items-center justify-center bg-primary">
                          Sending...
                        </span>
                      )}
                      {contactFormStatus === 'success' && (
                        <span className="absolute inset-0 flex items-center justify-center bg-green-600">
                          Message Sent!
                        </span>
                      )}
                      {contactFormStatus === 'error' && (
                        <span className="absolute inset-0 flex items-center justify-center bg-red-600">
                          Error! Try Again
                        </span>
                      )}
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Request Modals */}
        {xsightModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg w-full max-w-xl mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Schedule Xsight Demo</h3>
                <button onClick={() => hideModal(setXsightModalVisible)} className="text-gray-400 hover:text-white">
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleFormSubmit} action="mailto:jieyun@mit.edu" method="POST" encType="text/plain">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input type="text" name="name" required className="w-full bg-gray-800 border-none rounded p-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                  <input type="text" name="company" required className="w-full bg-gray-800 border-none rounded p-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company Email</label>
                  <input type="email" name="email" required className="w-full bg-gray-800 border-none rounded p-3 text-white" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Date & Time</label>
                  <div className="relative">
                    <input type="datetime-local" name="datetime" required className="w-full bg-gray-800 border-none rounded p-3 text-white [color-scheme:dark] cursor-pointer" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Additional Comments (Optional)</label>
                  <textarea name="comments" rows={3} className="w-full bg-gray-800 border-none rounded p-3 text-white"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-primary text-white px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap relative overflow-hidden" disabled={demoFormStatus === 'submitting'}>
                    {demoFormStatus === 'submitting' && (
                      <span className="absolute inset-0 flex items-center justify-center bg-primary">
                        Sending...
                      </span>
                    )}
                    {demoFormStatus === 'success' && (
                      <span className="absolute inset-0 flex items-center justify-center bg-green-600">
                        Request Sent!
                      </span>
                    )}
                    {demoFormStatus === 'error' && (
                      <span className="absolute inset-0 flex items-center justify-center bg-red-600">
                        Error! Try Again
                      </span>
                    )}
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {curioModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg w-full max-w-xl mx-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Schedule Curio Demo</h3>
                <button onClick={() => hideModal(setCurioModalVisible)} className="text-gray-400 hover:text-white">
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
              <form className="space-y-4" onSubmit={handleFormSubmit} action="mailto:jieyun@mit.edu" method="POST" encType="text/plain">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input type="text" name="name" required className="w-full bg-gray-800 border-none rounded p-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                  <input type="text" name="company" required className="w-full bg-gray-800 border-none rounded p-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company Email</label>
                  <input type="email" name="email" required className="w-full bg-gray-800 border-none rounded p-3 text-white" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Date & Time</label>
                  <div className="relative">
                    <input type="datetime-local" name="datetime" required className="w-full bg-gray-800 border-none rounded p-3 text-white [color-scheme:dark] cursor-pointer" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Additional Comments (Optional)</label>
                  <textarea name="comments" rows={3} className="w-full bg-gray-800 border-none rounded p-3 text-white"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-primary text-white px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap relative overflow-hidden" disabled={demoFormStatus === 'submitting'}>
                    {demoFormStatus === 'submitting' && (
                      <span className="absolute inset-0 flex items-center justify-center bg-primary">
                        Sending...
                      </span>
                    )}
                    {demoFormStatus === 'success' && (
                      <span className="absolute inset-0 flex items-center justify-center bg-green-600">
                        Request Sent!
                      </span>
                    )}
                    {demoFormStatus === 'error' && (
                      <span className="absolute inset-0 flex items-center justify-center bg-red-600">
                        Error! Try Again
                      </span>
                    )}
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {successModalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md mx-4 text-center">
              <div className="mb-6">
                <i className="ri-checkbox-circle-line text-6xl text-green-500"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Request Submitted!</h3>
              <p className="text-gray-300 mb-6">Thank you for your interest. We'll contact you shortly to confirm your demo session.</p>
              <button onClick={() => hideModal(setSuccessModalVisible)} className="bg-primary text-white px-6 py-3 rounded-button hover:bg-opacity-90 transition-colors whitespace-nowrap w-full">Close</button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="relative z-10 px-6 py-8 bg-gray-900">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-500 text-sm">
              © 2025 3PO Lab. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App; 
