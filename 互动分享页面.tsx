// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';

const App: React.FC = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(128);
  const [showSharePanel, setShowSharePanel] = useState<boolean>(false);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };
  
  const handleShare = () => {
    setShowSharePanel(!showSharePanel);
  };
  
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-10">
        <button className="w-10 h-10 flex items-center justify-center text-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
          <i className="fas fa-arrow-left text-lg"></i>
        </button>
        <h1 className="text-lg font-medium">分享</h1>
        <button 
          onClick={handleShare}
          className="w-10 h-10 flex items-center justify-center text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
        >
          <i className="fas fa-share-alt text-lg"></i>
        </button>
      </header>

      {/* 主要内容区 */}
      <main className="flex-1 pt-20 pb-20 px-4 md:px-6 max-w-3xl mx-auto w-full">
        <article className="bg-white rounded-lg shadow-sm p-5">
          <h1 className="text-2xl font-bold mb-4">如何在繁忙的工作中保持高效率和良好的工作生活平衡</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span className="mr-4">作者：张明</span>
            <span>{formatDate(new Date())}</span>
          </div>
          
          <div className="prose max-w-none text-gray-800 leading-relaxed">
            <p className="mb-4">在当今快节奏的社会中，我们经常面临工作压力大、任务繁重的情况。如何在保证工作质量的同时，还能拥有健康的生活方式，成为了许多职场人士关注的话题。</p>
            
            <p className="mb-4">首先，合理规划时间是提高效率的关键。使用番茄工作法或其他时间管理技巧，将工作分解成小块，集中精力完成每一个任务。在工作 25 分钟后，给自己 5 分钟的休息时间，这样不仅能保持专注，还能避免长时间工作带来的疲劳。</p>
            
            <p className="mb-4">其次，学会设定优先级。不是所有任务都同等重要，我们需要区分紧急且重要、重要但不紧急、紧急但不重要以及既不紧急也不重要的任务。优先处理紧急且重要的事项，合理安排重要但不紧急的任务，尽量减少或委托他人处理紧急但不重要的事情，避免把时间浪费在既不紧急也不重要的活动上。</p>
            
            <p className="mb-4">第三，善用工具和技术。现在有很多效率工具和应用可以帮助我们更好地管理任务、记录想法、协作沟通。选择适合自己的工具，并坚持使用，能够大大提高工作效率。</p>
            
            <p className="mb-4">第四，保持健康的生活习惯。充足的睡眠、均衡的饮食和适当的运动对保持良好的工作状态至关重要。尝试每天保证 7-8 小时的睡眠，定期锻炼身体，避免长时间久坐，这些都能帮助提高工作效率和生活质量。</p>
            
            <p className="mb-4">第五，学会说"不"。我们的时间和精力是有限的，不要害怕拒绝那些会分散注意力或者超出自己能力范围的请求。明确自己的边界，才能更好地专注于重要的事情。</p>
            
            <p className="mb-4">最后，定期反思和调整。每周或每月花一些时间回顾自己的工作和生活状态，思考哪些方面做得好，哪些地方需要改进，然后制定相应的调整计划。</p>
            
            <p>记住，工作效率和生活平衡不是一成不变的，而是需要我们不断探索和调整的过程。希望以上建议能对大家有所帮助，祝愿每个人都能在忙碌的工作中找到属于自己的平衡点。</p>
          </div>
        </article>
      </main>

      {/* 底部功能区 */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-100 flex items-center justify-between px-6 z-10">
        <button 
          onClick={handleLike}
          className="flex items-center text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
        >
          <i className={`${liked ? 'fas fa-heart text-red-500' : 'far fa-heart'} text-xl mr-2`}></i>
          <span>{likeCount}</span>
        </button>
        
        <button className="flex items-center text-gray-700 cursor-pointer !rounded-button whitespace-nowrap">
          <i className="far fa-comment text-xl mr-2"></i>
          <span>42</span>
        </button>
      </footer>

      {/* 分享面板 */}
      {showSharePanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-20">
          <div className="bg-white w-full rounded-t-xl p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">分享到</h3>
              <button 
                onClick={handleShare}
                className="text-gray-500 cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="flex flex-col items-center cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center mb-2">
                  <i className="fab fa-weixin text-white text-2xl"></i>
                </div>
                <span className="text-sm">微信</span>
              </div>
              
              <div className="flex flex-col items-center cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-blue-400 flex items-center justify-center mb-2">
                  <i className="fab fa-qq text-white text-2xl"></i>
                </div>
                <span className="text-sm">QQ</span>
              </div>
              
              <div className="flex flex-col items-center cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center mb-2">
                  <i className="fab fa-weibo text-white text-2xl"></i>
                </div>
                <span className="text-sm">微博</span>
              </div>
              
              <div className="flex flex-col items-center cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                  <i className="fas fa-link text-white text-2xl"></i>
                </div>
                <span className="text-sm">复制链接</span>
              </div>
            </div>
            
            <button 
              onClick={handleShare}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium cursor-pointer !rounded-button whitespace-nowrap"
            >
              取消
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;

