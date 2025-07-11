'use client';

import React from 'react';

export default function Dashboard() {
  return (
    <div className="app-container">
      <div className="container">

        <div className="header">
          <div className="header-title">
            <div>
              <h1 className="page-title">대시보드</h1>
              <p className="page-subtitle">전체 현황을 한눈에 확인하세요</p>
            </div>

            <div className="header-controls">
              <div className="status-badge status-active">
                <span>⚡</span>
                <span>2개 API 활성</span>
              </div>
              <div className="status-badge status-pro">✨ PRO</div>
            </div>
          </div>
        </div>






        <div className="dashboard-grid">
          <MetricCard
            icon="⚡"
            color="blue"
            change="+12%"
            value="1,824"
            label="API 토큰 사용량"
            sub="3.6% 사용 중"
          />
          <MetricCard
            icon="📁"
            color="purple"
            change="+3"
            value="5"
            label="활성 프로젝트"
            sub="3개 진행중"
          />
          <MetricCard
            icon="🤖"
            color="emerald"
            change="+2"
            value="12"
            label="AI 에이전트"
            sub="8개 활성화"
          />
          <MetricCard
            icon="💰"
            color="orange"
            change="+15%"
            value="$23.47"
            label="이번 달 비용"
            sub="예상 월말: $87.50"
          />
        </div>

        <div className="content-grid">
          <SectionCard
            title="최근 프로젝트"
            icon="📁"
            gradient="linear-gradient(135deg, #3b82f6, #8b5cf6)"
            actionText="전체 보기 →"
            actionPage="projects"
            items={[
              {
                title: '파일분석하기',
                subtitle: '9/12 작업 • claude-3-haiku',
                status: '진행중',
                statusClass: 'status-active-pill',
                dot: 'dot-green',
              },
              {
                title: '파일업로드 test',
                subtitle: '4/8 작업 • claude-3-sonnet',
                status: '진행중',
                statusClass: 'status-active-pill',
                dot: 'dot-green',
              },
              {
                title: '사업계획서 작성',
                subtitle: '3/15 작업 • gpt-4',
                status: '계획중',
                statusClass: 'status-planning',
                dot: 'dot-red',
              },
            ]}
          />

          <SectionCard
            title="활성 AI 에이전트"
            icon="🤖"
            gradient="linear-gradient(135deg, #10b981, #059669)"
            actionText="관리 →"
            actionPage="agents"
            items={[
              {
                title: '🔍 리서치 에이전트',
                subtitle: '웹 검색 및 데이터 수집',
                status: '활성',
                statusClass: 'status-connected',
                dot: 'dot-green',
              },
              {
                title: '💻 코딩 에이전트',
                subtitle: '코드 생성 및 최적화',
                status: '활성',
                statusClass: 'status-connected',
                dot: 'dot-green',
              },
              {
                title: '📊 분석 에이전트',
                subtitle: '데이터 분석 및 시각화',
                status: '활성',
                statusClass: 'status-connected',
                dot: 'dot-green',
              },
            ]}
          />

          <SectionCard
            title="워크플로우 현황"
            icon="🔀"
            gradient="linear-gradient(135deg, #8b5cf6, #7c3aed)"
            actionText="디자이너 →"
            actionPage="workflow"
            items={[
              {
                title: '📊 데이터 분석 플로우',
                subtitle: '수집 → 분석 → 시각화 (3단계)',
                status: '실행중',
                statusClass: 'status-active-pill',
                dot: 'dot-green',
              },
              {
                title: '📝 콘텐츠 생성 플로우',
                subtitle: '리서치 → 작성 → 검토 (3단계)',
                status: '실행중',
                statusClass: 'status-active-pill',
                dot: 'dot-green',
              },
            ]}
          />

          <SectionCard
            title="MCP 연결 현황"
            icon="🔌"
            gradient="linear-gradient(135deg, #f59e0b, #d97706)"
            actionText="관리 →"
            actionPage="mcp"
            items={[
              {
                title: '📁 파일시스템 서버',
                subtitle: '로컬 파일 접근 및 관리',
                status: '연결됨',
                statusClass: 'status-connected',
                dot: 'dot-green',
              },
              {
                title: '🗄️ 데이터베이스 서버',
                subtitle: 'PostgreSQL 연결',
                status: '연결됨',
                statusClass: 'status-connected',
                dot: 'dot-green',
              },
              {
                title: '🌐 웹 검색 서버',
                subtitle: '외부 검색 API',
                status: '연결 중',
                statusClass: 'status-reconnecting',
                dot: 'dot-yellow',
              },
            ]}
          />
        </div>
      </div>
    </div>

  );
}

// 간단한 재사용 컴포넌트들
function MetricCard({ icon, color, change, value, label, sub }) {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <div className={`metric-icon ${color}`}>{icon}</div>
        <div className="change-indicator change-up">
          <span>↗</span>
          <span>{change}</span>
        </div>
      </div>
      <div className="metric-value">{value}</div>
      <div className="metric-label">{label}</div>
      <div className="metric-sub positive">{sub}</div>
    </div>
  );
}

function SectionCard({ title, icon, gradient, actionText, actionPage, items }) {
  return (
    <div className="section-card">
      <div className="section-header">
        <h3 className="section-title">
          <div className="section-icon" style={{ background: gradient }}>{icon}</div>
          {title}
        </h3>
        <button className="section-action" onClick={() => navigateToPage(actionPage)}>
          {actionText}
        </button>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="list-item"
          onClick={() => navigateToPage(actionPage)}
        >
          <div className={`connection-dot ${item.dot}`}></div>
          <div className="list-content">
            <div className="list-title">{item.title}</div>
            <div className="list-subtitle">{item.subtitle}</div>
          </div>
          <div className={`status-pill ${item.statusClass}`}>{item.status}</div>
        </div>
      ))}
    </div>
  );
}

// 임시 페이지 전환 함수
function navigateToPage(pageId) {
  const event = new CustomEvent('navigate', { detail: pageId });
  window.dispatchEvent(event);
}
