'use client';
import "@/adminStyle/dashboard.css";


import { useState } from 'react';

export default function Dashboard({ onMenuClick }) {
    const [showStatus, setShowStatus] = useState(false);

    return (
        <>
            <div className={`modal-overlay ${showStatus ? 'show' : ''}`}>
                <ShowSystemStatus setShowStatus={setShowStatus} />
            </div>

            <button className="mobile-menu-btn">☰</button>

            <div className="page-container">
                {/* 페이지 헤더 */}
                <div className="page-header">
                    <div>
                        <h1 className="page-title">관리자 대시보드</h1>
                        <p className="page-subtitle">플랫폼 전체 현황을 관리하세요</p>
                    </div>
                    <div className="page-actions">
                        <div className="badge badge-success">
                            <span>🟢</span>
                            <span>시스템 정상</span>
                        </div>
                        <button className="btn btn-secondary"
                        // onClick="refreshDashboard()"
                        >
                            🔄 새로고침
                        </button>
                        <button className="btn btn-primary"
                            onClick={() => setShowStatus(true)}
                        >
                            📊 시스템 상태
                        </button>
                    </div>
                </div>



                {/* 핵심 메트릭 */}
                <div className="metrics-section">
                    <div className="grid grid-auto" id="metrics-grid">
                        {/* 총 사용자 */}
                        <div className="metric-card" data-metric="users">
                            <div className="metric-header">
                                <div className="metric-icon users">👥</div>
                                <div className="metric-change positive">
                                    <span>↗</span>
                                    <span id="users-change">+24</span>
                                </div>
                            </div>
                            <div className="metric-value" id="total-users">1,247</div>
                            <div className="metric-label">전체 사용자</div>
                            <div className="metric-sub" id="active-users">활성 사용자: 892명</div>
                        </div>

                        {/* API 호출 */}
                        <div className="metric-card" data-metric="api-calls">
                            <div className="metric-header">
                                <div className="metric-icon api">⚡</div>
                                <div className="metric-change positive">
                                    <span>↗</span>
                                    <span id="api-change">+18%</span>
                                </div>
                            </div>
                            <div className="metric-value" id="api-calls">47.2K</div>
                            <div className="metric-label">오늘 API 호출</div>
                            <div className="metric-sub" id="success-rate">성공률: 99.2%</div>
                        </div>

                        {/* 월 수익 */}
                        <div className="metric-card" data-metric="revenue">
                            <div className="metric-header">
                                <div className="metric-icon revenue">💰</div>
                                <div className="metric-change positive">
                                    <span>↗</span>
                                    <span id="revenue-change">+32%</span>
                                </div>
                            </div>
                            <div className="metric-value" id="monthly-revenue">$12.8K</div>
                            <div className="metric-label">이번 달 수익</div>
                            <div className="metric-sub" id="revenue-target">목표 대비 128%</div>
                        </div>

                        {/* 활성 프로젝트 */}
                        <div className="metric-card" data-metric="projects">
                            <div className="metric-header">
                                <div className="metric-icon projects">📁</div>
                                <div className="metric-change positive">
                                    <span>↗</span>
                                    <span id="projects-change">+7</span>
                                </div>
                            </div>
                            <div className="metric-value" id="total-projects">356</div>
                            <div className="metric-label">총 프로젝트</div>
                            <div className="metric-sub" id="active-projects">활성: 189개</div>
                        </div>

                        {/* 시스템 성능 */}
                        <div className="metric-card" data-metric="performance">
                            <div className="metric-header">
                                <div className="metric-icon performance">📊</div>
                                <div className="metric-change negative">
                                    <span>↘</span>
                                    <span id="performance-change">-0.3%</span>
                                </div>
                            </div>
                            <div className="metric-value" id="system-performance">99.2%</div>
                            <div className="metric-label">시스템 성능</div>
                            <div className="metric-sub" id="avg-response">평균 응답: 1.2초</div>
                        </div>

                        {/* 오늘 신규 가입 */}
                        <div className="metric-card" data-metric="signups">
                            <div className="metric-header">
                                <div className="metric-icon signups">✨</div>
                                <div className="metric-change positive">
                                    <span>↗</span>
                                    <span id="signups-change">+15</span>
                                </div>
                            </div>
                            <div className="metric-value" id="daily-signups">43</div>
                            <div className="metric-label">오늘 신규 가입</div>
                            <div className="metric-sub" id="signup-trend">어제 대비 +53%</div>
                        </div>
                    </div>
                </div>

                {/* 차트 및 활동 섹션 */}
                <div className="dashboard-content">
                    <div className="content-row">
                        {/* API 사용량 차트 */}
                        <div className="chart-section">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">📈 API 사용량 트렌드</h3>
                                    <select className="chart-period" id="chart-period">
                                        <option value="today">오늘</option>
                                        <option value="week">7일</option>
                                        <option value="month">30일</option>
                                        <option value="quarter">3개월</option>
                                    </select>
                                </div>
                                <div className="chart-container" id="usage-chart">
                                    <div className="chart-placeholder">
                                        <div className="chart-demo">
                                            <div className="chart-bars">
                                                <div className="chart-bar" style={{ height: '60%' }}></div>
                                                <div className="chart-bar" style={{ height: '80%' }}></div>
                                                <div className="chart-bar" style={{ height: '45%' }}></div>
                                                <div className="chart-bar" style={{ height: '90%' }}></div>
                                                <div className="chart-bar" style={{ height: '70%' }}></div>
                                                <div className="chart-bar" style={{ height: '85%' }}></div>
                                                <div className="chart-bar" style={{ height: '95%' }}></div>
                                            </div>
                                        </div>
                                        <p>Chart.js 또는 다른 차트 라이브러리 연동 예정</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 실시간 활동 */}
                        <div className="activity-section">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">⚡ 실시간 활동</h3>
                                    <button className="btn btn-sm btn-secondary"
                                    // onClick="refreshActivity()"
                                    >
                                        🔄
                                    </button>
                                </div>
                                <div className="activity-feed" id="activity-feed">
                                    {/* 활동 아이템들이 JavaScript로 동적 생성됨 */}
                                    {<UpdateActivityFeed />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI 프로바이더 상태 */}
                    <div className="providers-section">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">🔗 AI 프로바이더 상태</h3>
                                <div className="provider-actions">
                                    <button className="btn btn-sm btn-secondary"
                                    // onClick="syncProviders()"
                                    >
                                        🔄 동기화
                                    </button>
                                    <div className="btn btn-sm btn-primary" onClick={() => onMenuClick('providers')}>
                                        ⚙️ 관리
                                    </div>
                                </div>
                            </div>
                            <div className="providers-grid" id="providers-grid">
                                {/* 프로바이더 카드들이 JavaScript로 동적 생성됨 */}
                                {<UpdateProvidersStatus />}
                            </div>
                        </div>
                    </div>

                    {/* 빠른 액션 */}
                    <div className="quick-actions-section">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">🚀 빠른 액션</h3>
                            </div>
                            <div className="quick-actions-grid">
                                <div className="quick-action-item" onClick={() => onMenuClick('users')}>
                                    <div className="quick-action-icon users">👥</div>
                                    <div className="quick-action-text">
                                        <div className="quick-action-title">사용자 관리</div>
                                        <div className="quick-action-desc">계정 및 권한 관리</div>
                                    </div>
                                </div>

                                <div className="quick-action-item" onClick={() => onMenuClick('providers')}>
                                    <div className="quick-action-icon providers">🔗</div>
                                    <div className="quick-action-text">
                                        <div className="quick-action-title">API 설정</div>
                                        <div className="quick-action-desc">프로바이더 연결 관리</div>
                                    </div>
                                </div>

                                <div className="quick-action-item" onClick={() => onMenuClick('analytics')}>
                                    <div className="quick-action-icon analytics">📈</div>
                                    <div className="quick-action-text">
                                        <div className="quick-action-title">분석 리포트</div>
                                        <div className="quick-action-desc">사용량 및 성능 분석</div>
                                    </div>
                                </div>

                                <div className="quick-action-item" onClick={() => onMenuClick('billing')}>
                                    <div className="quick-action-icon billing">💰</div>
                                    <div className="quick-action-text">
                                        <div className="quick-action-title">과금 관리</div>
                                        <div className="quick-action-desc">요금 및 결제 관리</div>
                                    </div>
                                </div>

                                <div className="quick-action-item" onClick={() => onMenuClick('logs')}>
                                    <div className="quick-action-icon logs">📋</div>
                                    <div className="quick-action-text">
                                        <div className="quick-action-title">시스템 로그</div>
                                        <div className="quick-action-desc">오류 및 활동 추적</div>
                                    </div>
                                </div>

                                <div className="quick-action-item" onClick={() => onMenuClick('settings')}>
                                    <div className="quick-action-icon settings">⚙️</div>
                                    <div className="quick-action-text">
                                        <div className="quick-action-title">시스템 설정</div>
                                        <div className="quick-action-desc">플랫폼 환경 설정</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

function UpdateActivityFeed() {
    const activities = [
        {
            icon: '👤',
            title: '신규 사용자 가입',
            description: 'john.doe@example.com',
            time: '방금 전',
            type: 'user'
        },
        {
            icon: '⚡',
            title: 'API 호출 급증',
            description: 'GPT-4 모델 사용량 +15%',
            time: '2분 전',
            type: 'api'
        },
        {
            icon: '💰',
            title: '결제 완료',
            description: 'Premium 플랜 업그레이드',
            time: '5분 전',
            type: 'billing'
        },
        {
            icon: '🔧',
            title: '시스템 최적화',
            description: '자동 스케일링 적용',
            time: '10분 전',
            type: 'system'
        },
        {
            icon: '📊',
            title: '리포트 생성',
            description: '월간 사용량 분석 완료',
            time: '15분 전',
            type: 'report'
        }
    ];

    return (
        <>
            {activities.map((activity, index) => (
                <div key={index} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>{activity.icon}</div>
                    <div className="activity-content">
                        <div className="activity-title">{activity.title}</div>
                        <div className="activity-description">{activity.description}</div>
                    </div>
                    <div className="activity-time">{activity.time}</div>
                </div>
            ))}
        </>
    );
}

function UpdateProvidersStatus() {
    const providers = [
        {
            name: 'OpenAI',
            logo: 'AI',
            status: 'active',
            requests: '23.4K',
            latency: '1.2s',
            cost: '$1,847',
            uptime: '99.9%'
        },
        {
            name: 'Anthropic',
            logo: 'CL',
            status: 'active',
            requests: '18.7K',
            latency: '1.5s',
            cost: '$1,239',
            uptime: '99.7%'
        },
        {
            name: 'Google',
            logo: 'GM',
            status: 'warning',
            requests: '12.1K',
            latency: '2.1s',
            cost: '$892',
            uptime: '98.5%'
        },
        {
            name: 'Cohere',
            logo: 'CO',
            status: 'active',
            requests: '5.2K',
            latency: '1.8s',
            cost: '$423',
            uptime: '99.2%'
        }
    ];
    return (<>

        {providers.map(provider => (
            <div key={provider.name} className={`dashboard-provider-card`}>
                <div className="provider-header">
                    <div className="provider-info">
                        <div className={`provider-logo ${provider.name.toLowerCase()}`}>{provider.logo}</div>
                        <div className="provider-details">
                            <h4>{provider.name}</h4>
                            <p>가동률: {provider.uptime}</p>
                        </div>
                    </div>
                    {/* <div className="provider-status">
                        <div className={`status-indicator ${provider.status}`}></div>
                    </div> */}
                </div>
                <div className="provider-metrics">
                    <div className="provider-metric">
                        <div className="provider-metric-value">{provider.requests}</div>
                        <div className="provider-metric-label">오늘 요청</div>
                    </div>
                    <div className="provider-metric">
                        <div className="provider-metric-value">{provider.latency}</div>
                        <div className="provider-metric-label">평균 응답</div>
                    </div>
                    <div className="provider-metric">
                        <div className="provider-metric-value">{provider.cost}</div>
                        <div className="provider-metric-label">오늘 비용</div>
                    </div>
                </div>
            </div>
        ))}

    </>);
}


function ShowSystemStatus({ setShowStatus }) {
    return (
        <div className="modal">
            <div className="modal-content">

                <div className="modal-header">
                    <h2>시스템 상태 모니터링</h2>
                    <button
                        className="modal-close"
                        onClick={() => setShowStatus(false)}
                    >×</button>
                </div>

                <div className="modal-body">
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🖥️</div>
                        <h4 style={{ marginBottom: '20px', color: '#1f2937' }}>시스템 상태</h4>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '16px',
                            marginBottom: '24px'
                        }}>
                            <div style={{ padding: '16px', background: '#dcfce7', borderRadius: '8px' }}>
                                <div style={{ fontWeight: 600, color: '#15803d' }}>CPU 사용률</div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: '#16a34a' }}>23%</div>
                            </div>
                            <div style={{ padding: '16px', background: '#dbeafe', borderRadius: '8px' }}>
                                <div style={{ fontWeight: 600, color: '#1d4ed8' }}>메모리 사용률</div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: '#2563eb' }}>67%</div>
                            </div>
                            <div style={{ padding: '16px', background: '#fef3c7', borderRadius: '8px' }}>
                                <div style={{ fontWeight: 600, color: '#a16207' }}>디스크 사용률</div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: '#ca8a04' }}>45%</div>
                            </div>
                            <div style={{ padding: '16px', background: '#f3e8ff', borderRadius: '8px' }}>
                                <div style={{ fontWeight: 600, color: '#7c2d12' }}>네트워크</div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: '#8b5cf6' }}>정상</div>
                            </div>
                        </div>

                        <div style={{
                            textAlign: 'left',
                            background: '#f9fafb',
                            padding: '16px',
                            borderRadius: '8px'
                        }}>
                            <div style={{ fontWeight: 600, marginBottom: '8px' }}>최근 이벤트</div>
                            <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>
                                • 15:30 - 자동 백업 완료<br />
                                • 14:45 - 보안 업데이트 적용<br />
                                • 13:20 - 모니터링 알림 정상<br />
                                • 12:00 - 일일 점검 완료
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    {/* 필요시 버튼 추가 */}
                </div>

            </div>
        </div>
    );
}
