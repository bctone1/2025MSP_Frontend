'use client';

import { useState } from 'react';
import { formatNumber } from '@/utill/utill';


export default function Dashboard({ onMenuClick }) {

  const metrics = {
    tokenUsage: {
      key: "tokenUsage",
      icon: "⚡",
      color: "blue",
      change: "+12%",
      value: "1,824",
      label: "API 토큰 사용량",
      sub: "3.6% 사용 중",
      current: 1824,
      previous: 1628,
      limit: 50000,
      trend: 'up',
    },
    activeProjects: {
      key: "activeProjects",
      icon: "📁",
      color: "purple",
      change: "+3",
      value: "5",
      label: "활성 프로젝트",
      sub: "3개 진행중",
      current: 5,
      previous: 4,
      running: 3,
      trend: 'up'
    },
    agents: {
      key: "agents",
      icon: "🤖",
      color: "emerald",
      change: "+2",
      value: "12",
      label: "AI 에이전트",
      sub: "8개 활성화",
      total: 12,
      active: 8,
      inactive: 4,
      trend: 'up'
    },
    monthlyCost: {
      key: "monthlyCost",
      icon: "💰",
      color: "orange",
      change: "+15%",
      value: "$23.47",
      label: "이번 달 비용",
      sub: "예상 월말: $87.50",
      current: 23.47,
      previous: 20.41,
      projected: 87.50,
      currency: 'USD',
      trend: 'up'
    }
  }

  const metricInfo = {
    'tokenUsage': {
      title: 'API 토큰 사용량',
      description: '이번 달 API 호출에 사용된 토큰 수입니다.',
      details: [
        `현재 사용량: ${formatNumber(metrics.tokenUsage.current)} 토큰`,
        `월 한도: ${formatNumber(metrics.tokenUsage.limit)} 토큰`,
        `사용률: ${(metrics.tokenUsage.current / metrics.tokenUsage.limit * 100).toFixed(1)}%`,
        `전월 대비: +${((metrics.tokenUsage.current - metrics.tokenUsage.previous) / metrics.tokenUsage.previous * 100).toFixed(1)}%`
      ]
    },
    'activeProjects': {
      title: '활성 프로젝트',
      description: '현재 진행 중이거나 관리되고 있는 프로젝트 수입니다.',
      details: [
        `전체 프로젝트: ${metrics.activeProjects.current}개`,
        `진행 중: ${metrics.activeProjects.running}개`,
        `계획 중: ${metrics.activeProjects.current - metrics.activeProjects.running}개`,
        `신규 생성: +${metrics.activeProjects.current - metrics.activeProjects.previous}개`
      ]
    },
    'agents': {
      title: '평균 응답 시간',
      description: 'AI 에이전트의 평균 응답 속도입니다.',
      details: [
        `전체 에이전트: ${metrics.agents.value}개`,
        `진행 중: ${metrics.agents.active}개`,
        // `계획 중: ${metrics.agents.current - metrics.agents.active}개`,
        // `신규 생성: +${metrics.agents.current - metrics.agents.previous}개`
      ]
    },
    'monthlyCost': {
      title: '이번 달 비용',
      description: 'API 사용에 따른 누적 비용입니다.',
      details: [
        `현재 비용: $${metrics.monthlyCost.current}`,
        `예상 월말 비용: $${metrics.monthlyCost.projected}`,
        `전월 대비: +${((metrics.monthlyCost.current - metrics.monthlyCost.previous) / metrics.monthlyCost.previous * 100).toFixed(1)}%`,
        `일 평균: $${(metrics.monthlyCost.current / new Date().getDate()).toFixed(2)}`
      ]
    }
  }

  const sectionCards = [
    {
      title: "최근 프로젝트",
      icon: "📁",
      gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      actionText: "전체 보기",
      actionPage: "projects",
      items: [
        {
          title: "파일분석하기",
          subtitle: "9/12 작업 • claude-3-haiku",
          status: "진행중",
          statusClass: "status-active-pill",
          dot: "dot-green",
        },
        {
          title: "파일업로드 test",
          subtitle: "4/8 작업 • claude-3-sonnet",
          status: "진행중",
          statusClass: "status-active-pill",
          dot: "dot-green",
        },
        {
          title: "사업계획서 작성",
          subtitle: "3/15 작업 • gpt-4",
          status: "계획중",
          statusClass: "status-planning",
          dot: "dot-red",
        },
      ],
    },
    // {
    //   title: "활성 AI 에이전트",
    //   icon: "🤖",
    //   gradient: "linear-gradient(135deg, #10b981, #059669)",
    //   actionText: "관리",
    //   actionPage: "agents",
    //   items: [
    //     {
    //       title: "🔍 리서치 에이전트",
    //       subtitle: "웹 검색 및 데이터 수집",
    //       status: "활성",
    //       statusClass: "status-connected",
    //       dot: "dot-green",
    //     },
    //     {
    //       title: "💻 코딩 에이전트",
    //       subtitle: "코드 생성 및 최적화",
    //       status: "활성",
    //       statusClass: "status-connected",
    //       dot: "dot-green",
    //     },
    //     {
    //       title: "📊 분석 에이전트",
    //       subtitle: "데이터 분석 및 시각화",
    //       status: "활성",
    //       statusClass: "status-connected",
    //       dot: "dot-green",
    //     },
    //   ],
    // },
    // {
    //   title: "워크플로우 현황",
    //   icon: "🔀",
    //   gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    //   actionText: "디자이너 →",
    //   actionPage: "workflow",
    //   items: [
    //     {
    //       title: "📊 데이터 분석 플로우",
    //       subtitle: "수집 → 분석 → 시각화 (3단계)",
    //       status: "실행중",
    //       statusClass: "status-active-pill",
    //       dot: "dot-green",
    //     },
    //     {
    //       title: "📝 콘텐츠 생성 플로우",
    //       subtitle: "리서치 → 작성 → 검토 (3단계)",
    //       status: "실행중",
    //       statusClass: "status-active-pill",
    //       dot: "dot-green",
    //     },
    //   ],
    // },
    // {
    //   title: "MCP 연결 현황",
    //   icon: "🔌",
    //   gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    //   actionText: "관리 →",
    //   actionPage: "mcp",
    //   items: [
    //     {
    //       title: "📁 파일시스템 서버",
    //       subtitle: "로컬 파일 접근 및 관리",
    //       status: "연결됨",
    //       statusClass: "status-connected",
    //       dot: "dot-green",
    //     },
    //     {
    //       title: "🗄️ 데이터베이스 서버",
    //       subtitle: "PostgreSQL 연결",
    //       status: "연결됨",
    //       statusClass: "status-connected",
    //       dot: "dot-green",
    //     },
    //     {
    //       title: "🌐 웹 검색 서버",
    //       subtitle: "외부 검색 API",
    //       status: "연결 중",
    //       statusClass: "status-reconnecting",
    //       dot: "dot-yellow",
    //     },
    //   ],
    // },
  ]

  const activities = [
    {
      icon: "✅",
      bg: "var(--success-light)",
      color: "var(--success-green)",
      title: "React 컴포넌트 생성 완료",
      desc: "💻 코딩 에이전트 • 2분 전",
    },
    {
      icon: "ℹ️",
      bg: "rgba(59, 130, 246, 0.1)",
      color: "var(--secondary-blue)",
      title: "LLM 훈련 Step 15,000 완료",
      desc: "🚀 트레이너 에이전트 • 5분 전",
    },
    {
      icon: "📤",
      bg: "var(--warning-light)",
      color: "var(--warning-orange)",
      title: "신규 지식파일 업로드",
      desc: "📚 지식베이스 • 10분 전",
    },
    {
      icon: "📊",
      bg: "rgba(139, 92, 246, 0.1)",
      color: "var(--secondary-purple)",
      title: "데이터 분석 보고서 생성",
      desc: "📊 분석 에이전트 • 15분 전",
    },
    {
      icon: "✨",
      bg: "var(--success-light)",
      color: "var(--success-green)",
      title: "API 응답 시간 최적화 완료",
      desc: "⚙️ 시스템 • 20분 전",
    },
    {
      icon: "🔄",
      bg: "rgba(59, 130, 246, 0.1)",
      color: "var(--secondary-blue)",
      title: "자동 백업 실행됨",
      desc: "💾 백업 시스템 • 1시간 전",
    },
  ]



  return (
    <div className="app-container">
      <div className="container">

        <div className="header">
          <div className="header-title">
            <div>
              <h1 className="page-title">대시보드</h1>
              <p className="page-subtitle">전체 시스템 현황을 확인하세요</p>
            </div>

            <div className="status-badge" style={{ marginBottom: "0", cursor: "pointer" }}>
              <span>🔑</span>
              API 키 3개 등록됨
            </div>

            {/* <div className="header-controls">
              <div className="status-badge status-active">
                <span>⚡</span>
                <span>2개 API 활성</span>
              </div>
              <div className="status-badge status-pro">✨ PRO</div>
            </div> */}

          </div>
        </div>




        <div className="dashboard-grid">
          {Object.values(metrics).map((metric, index) => (
            <MetricCard
              key={index}
              metric={metric}
              metricInfo={metricInfo}
            // icon={metric.icon}
            // color={metric.color}
            // change={metric.change}
            // value={metric.value}
            // label={metric.label}
            // sub={metric.sub}
            />
          ))}
        </div>


        <div className="dashboard_content-grid">
          {sectionCards.map((card, index) => (
            <SectionCard
              key={index}
              title={card.title}
              icon={card.icon}
              gradient={card.gradient}
              actionText={card.actionText}
              actionPage={card.actionPage}
              items={card.items}
              onMenuClick={onMenuClick}
            />
          ))}
        </div>


        <div className="section-card">
          {/* 헤더 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                fontSize: "var(--text-xl)",
                fontWeight: 700,
                color: "var(--gray-800)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, var(--warning-orange), #D97706)",
                }}
              >
                📈
              </div>
              최근 활동
            </div>
            <div className="section-action"
              onClick={() => onMenuClick("monitoring")}
            >전체 보기</div>
          </div>

          {/* 활동 리스트 */}
          <div className="activity-list">
            {activities.map((item, idx) => (
              <div className="activity-item" key={idx}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    flexShrink: 0,
                    background: item.bg,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 600,
                      color: "var(--gray-800)",
                      marginBottom: "2px",
                      fontSize: "var(--text-sm)",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: "var(--text-xs)",
                      color: "var(--gray-500)",
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



      </div>
    </div>

  );
}

function MetricCard({ metric, metricInfo }) {
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    // console.log("클릭");
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="metric-card" onClick={handleCardClick}>
        <div className="metric-header">
          <div className={`metric-icon ${metric.color}`}>{metric.icon}</div>
          <div className="change-indicator change-up">
            <span>↗</span>
            <span>{metric.change}</span>
          </div>
        </div>
        <div className="metric-value">{metric.value}</div>
        <div className="metric-label">{metric.label}</div>
        <div className="metric-sub positive">{metric.sub}</div>
      </div>


      <div className={`modal-overlay ${showModal ? 'active' : ''}`}>
        <ShowMetricDetail handleClose={handleClose} metric={metric} metricInfo={metricInfo} />
      </div>

      {/* {showModal && (<ShowMetricDetail handleClose={handleClose} metric={metric} metricInfo={metricInfo} />)} */}

    </>
  );
}


function SectionCard({ title, icon, gradient, actionText, actionPage, items, onMenuClick }) {
  return (
    <div className="section-card">
      <div className="section-header">
        <h3 className="section-title">
          <div className="section-icon" style={{ background: gradient }}>{icon}</div>
          {title}
        </h3>
        <button
          className="section-action"
          onClick={() => onMenuClick(actionPage)}
        >
          {actionText}
        </button>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="list-item"
          onClick={() => onMenuClick(actionPage)}
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
// function navigateToPage(pageId) {
//   const event = new CustomEvent('navigate', { detail: pageId });
//   window.dispatchEvent(event);
// }

function ShowMetricDetail({ handleClose, metric, metricInfo }) {
  const info = metricInfo[metric.key];
  if (!info) return;

  return (
    // <div className="modal-overlay active">
    <div className="modal">

      <div className="modal-header">
        <h3 className="modal-title">{info.title}</h3>
        <button
          className="modal-close"
          onClick={handleClose}
        >
          ×
        </button>
      </div>

      <div className="modal-body">
        <div className="metric-detail">
          <p className="metric-description">{info.description}</p>
          <ul className="metric-details">
            {info.details.map((item, index) => {
              return <li key={index}> {item}</li>;
            })}

          </ul>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="primary-btn"
          onClick={handleClose}
        // onclick="MetaLLM.closeModal(closest('.modal-overlay'))"
        >
          확인
        </button>
      </div>
    </div>
    // </div>
  );
}