'use client';

import React from 'react';

export default function Sidebar({ onMenuClick, currentPage }) {
  const handleClick = (e) => {
    const item = e.currentTarget;
    const page = item.getAttribute('data-page');
    onMenuClick(page);
  };

  return (
    <>

      <div className="sidebar-header">
        <a href="index.html" className="sidebar-logo">
          <div className="sidebar-logo-icon">⚡</div>
          <div className="sidebar-logo-text">
            <h1>META LLM MSP</h1>
            <p>관리자 패널</p>
          </div>
        </a>
      </div>

      <nav className="nav-menu">
        <div className="nav-section">
          <div className="nav-section-title">핵심 관리</div>

          {[
            { page: 'dashboard', icon: '📊', title: '관리자 대시보드' },
            { page: 'users', icon: '👥', title: '사용자 관리' },
            { page: 'providers', icon: '🔗', title: 'AI 프로바이더' },
            { page: 'knowledge', icon: '📚', title: '지식베이스 관리' },
            { page: 'agents', icon: '🤖', title: '에이전트 관리' },
            { page: 'mcp', icon: '🔀', title: 'MCP 관리' },
            { page: 'history', icon: '📋', title: '히스토리 관리' },
            { page: 'billing', icon: '💰', title: '과금 관리' },
            { page: 'analytics', icon: '📈', title: '사용량 분석' },
          ].map(({ page, icon, title }) => (
            <div
              key={page}
              className={`nav-item ${currentPage === page ? 'active' : ''}`}
              data-page={page}
              onClick={handleClick}
            >
              <div className="nav-icon">{icon}</div>
              <div className="nav-text">{title}</div>
            </div>
          ))}
        </div>

        <div className="nav-section">
          <div className="nav-section-title">운영 관리</div>

          {[
            { page: 'logs', icon: '📋', title: '시스템 로그' },
            { page: 'settings', icon: '⚙️', title: '시스템 설정' },
          ].map(({ page, icon, title }) => (
            <div
              key={page}
              className={`nav-item ${currentPage === page ? 'active' : ''}`}
              data-page={page}
              onClick={handleClick}
            >
              <div className="nav-icon">{icon}</div>
              <div className="nav-text">{title}</div>
            </div>
          ))}
        </div>
      </nav>

    </>
  );
}
