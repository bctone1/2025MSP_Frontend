'use client';

import { useState } from 'react';
import "@/styles/monitoring.css"

export default function Monitoring({ onMenuClick }) {

    const statsData = [
        {
            icon: "✅",
            bg: "linear-gradient(135deg, var(--success-green), #059669)",
            title: "완료된 작업",
            value: 247,
            label: "오늘 총 32개",
        },
        {
            icon: "⏳",
            bg: "linear-gradient(135deg, var(--warning-orange), #D97706)",
            title: "진행 중",
            value: 12,
            label: "실시간 모니터링",
        },
        {
            icon: "❌",
            bg: "linear-gradient(135deg, var(--danger-red), #B91C1C)",
            title: "오류 발생",
            value: 3,
            label: "지난 24시간",
        },
        {
            icon: "📊",
            bg: "linear-gradient(135deg, var(--primary-blue), var(--primary-purple))",
            title: "활성 에이전트",
            value: 8,
            label: "총 12개 중",
        },
    ];

    const activityData = [
        {
            day: "오늘 - 2025년 8월 11일",
            activities: [
                {
                    type: "success",
                    icon: "✅",
                    iconBg: "var(--success-light)",
                    iconColor: "var(--success-green)",
                    title: "React 컴포넌트 생성 완료",
                    description:
                        "사용자 대시보드용 새로운 차트 컴포넌트를 성공적으로 생성했습니다. TypeScript 지원 및 반응형 디자인이 적용되었습니다.",
                    time: "🕐 2분 전",
                    agent: "💻 코딩 에이전트",
                    extra: "• 프로젝트: AI 챗봇 개발",
                },
                {
                    type: "info",
                    icon: "ℹ️",
                    iconBg: "rgba(59, 130, 246, 0.1)",
                    iconColor: "var(--secondary-blue)",
                    title: "LLM 훈련 Step 15,000 완료",
                    description:
                        "모델 훈련이 순조롭게 진행되고 있습니다. 현재 loss: 0.245, accuracy: 94.2%를 기록했습니다.",
                    time: "🕐 5분 전",
                    agent: "🚀 트레이너 에이전트",
                    extra: "• GPU 사용률: 85%",
                },
                {
                    type: "warning",
                    icon: "📤",
                    iconBg: "var(--warning-light)",
                    iconColor: "var(--warning-orange)",
                    title: "신규 지식파일 업로드",
                    description:
                        "새로운 기술 문서 15개가 지식베이스에 추가되었습니다. 인덱싱이 진행 중입니다.",
                    time: "🕐 10분 전",
                    agent: "📚 지식베이스",
                    extra: "• 파일 크기: 2.3MB",
                },
                {
                    type: "success",
                    icon: "📊",
                    iconBg: "rgba(139, 92, 246, 0.1)",
                    iconColor: "var(--secondary-purple)",
                    title: "데이터 분석 보고서 생성",
                    description:
                        "월간 사용자 행동 분석이 완료되었습니다. 주요 인사이트 7개와 개선 제안 3개가 포함되어 있습니다.",
                    time: "🕐 15분 전",
                    agent: "📊 분석 에이전트",
                    extra: "• 데이터 포인트: 12,847개",
                },
                {
                    type: "success",
                    icon: "✨",
                    iconBg: "var(--success-light)",
                    iconColor: "var(--success-green)",
                    title: "API 응답 시간 최적화 완료",
                    description:
                        "데이터베이스 쿼리 최적화를 통해 평균 응답 시간을 35% 단축했습니다.",
                    time: "🕐 20분 전",
                    agent: "⚙️ 시스템",
                    extra: "• 이전: 1.8s → 현재: 1.2s",
                },
                {
                    type: "info",
                    icon: "🔄",
                    iconBg: "rgba(59, 130, 246, 0.1)",
                    iconColor: "var(--secondary-blue)",
                    title: "자동 백업 실행됨",
                    description:
                        "정기 데이터 백업이 성공적으로 완료되었습니다. 모든 프로젝트 파일과 설정이 안전하게 저장되었습니다.",
                    time: "🕐 1시간 전",
                    agent: "💾 백업 시스템",
                    extra: "• 백업 크기: 847MB",
                },
            ],
        },
        {
            day: "어제 - 2025년 8월 10일",
            activities: [
                {
                    type: "success",
                    icon: "🎯",
                    iconBg: "var(--success-light)",
                    iconColor: "var(--success-green)",
                    title: "새 프로젝트 생성",
                    description:
                        '"추천 시스템 구축" 프로젝트가 생성되었습니다. 초기 설정과 환경 구성이 완료되었습니다.',
                    time: "🕐 18시간 전",
                    agent: "👤 김개발자",
                    extra: "• 템플릿: ML 프로젝트",
                },
                {
                    type: "error",
                    icon: "❌",
                    iconBg: "var(--danger-light)",
                    iconColor: "var(--danger-red)",
                    title: "API 호출 실패",
                    description:
                        "OpenAI API 연결에 일시적인 문제가 발생했습니다. 자동 재시도를 통해 복구되었습니다.",
                    time: "🕐 22시간 전",
                    agent: "🔗 API 관리자",
                    extra: "• 오류 코드: 503",
                },
            ],
        },
    ];

    return (
        <>

            <div className="nav-buttons">
                <button className="close-btn" title="대시보드로 돌아가기"
                    onClick={() => onMenuClick("dashboard")}
                >
                    ✕
                </button>
            </div>

            <div className="monitoring_container">
                <div className="monitoring_header">
                    <div className="header-left">
                        <h1>활동 모니터링</h1>
                        <p>모든 AI 에이전트와 시스템 활동을 추적하고 관리하세요</p>
                    </div>
                    <div className="filter-controls">
                        <select className="filter-select" id="agentFilter">
                            <option value="all">모든 에이전트</option>
                            <option value="coding">코딩 에이전트</option>
                            <option value="analysis">분석 에이전트</option>
                            <option value="content">콘텐츠 에이전트</option>
                            <option value="research">리서치 에이전트</option>
                            <option value="system">시스템</option>
                        </select>
                        <select className="filter-select" id="periodFilter">
                            <option value="today">오늘</option>
                            <option value="week">이번 주</option>
                            <option value="month">이번 달</option>
                            <option value="all">전체 기간</option>
                        </select>
                    </div>
                </div>

                {/* 통계 카드  */}
                <div className="stats-grid">
                    {statsData.map((stat, index) => (
                        <div className="monitoring_stat-card" key={index}>
                            <div className="stat-header">
                                <div
                                    className="monitoring_stat-icon"
                                    style={{ background: stat.bg }}
                                >
                                    {stat.icon}
                                </div>
                                <span
                                    style={{
                                        fontWeight: 600,
                                        color: "var(--gray-700)",
                                    }}
                                >
                                    {stat.title}
                                </span>
                            </div>
                            <div className="monitoring_stat-value">{stat.value}</div>
                            <div className="monitoring_stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* 활동 타임라인 */}
                <div className="activity-timeline">
                    <div className="timeline-header">
                        <h2 className="timeline-title">활동 타임라인</h2>
                        <div className="timeline-filters">
                            <button className="filter-btn active" data-type="all">전체</button>
                            <button className="filter-btn" data-type="success">성공</button>
                            <button className="filter-btn" data-type="info">정보</button>
                            <button className="filter-btn" data-type="warning">경고</button>
                            <button className="filter-btn" data-type="error">오류</button>
                        </div>
                    </div>

                    <div className="activity-list">
                        {activityData.map((group, gIdx) => (
                            <div key={gIdx}>
                                {/* 날짜 구분 */}
                                <div className="day-separator">
                                    <span className="day-label">{group.day}</span>
                                </div>

                                {/* 해당 날짜의 활동들 */}
                                {group.activities.map((act, idx) => (
                                    <div className={`activity-item ${act.type}`} key={idx}>
                                        <div
                                            className="activity-icon"
                                            style={{
                                                background: act.iconBg,
                                                color: act.iconColor,
                                            }}
                                        >
                                            {act.icon}
                                        </div>
                                        <div className="activity-content">
                                            <div className="activity-title">{act.title}</div>
                                            <div className="activity-description">{act.description}</div>
                                            <div className="activity-meta">
                                                <div className="activity-time">{act.time}</div>
                                                <div className="activity-agent">{act.agent}</div>
                                                <span>{act.extra}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="load-more">
                        <button className="load-more-btn">더 많은 활동 보기</button>
                    </div>
                </div>
            </div>

        </>
    );
}