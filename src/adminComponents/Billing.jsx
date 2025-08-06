'use client';

import "@/adminStyle/billing.css";

import { useState, useEffect, useMemo } from 'react';

export default function Billing() {
    const [pagestatus, setpagestatus] = useState('invoices');

    const currentTab = 'invoices';
    const [filters, setfilters] = useState({
        invoices: {
            search: '',
            status: 'all',
            period: 'month'
        },
        subscriptions: {
            search: '',
            status: 'all',
            plan: 'all'
        },
        transactions: {
            search: '',
            type: 'all',
            method: 'all'
        }
    });

    const invoices = [
        {
            id: 'INV-2024-001',
            userId: 'user_123',
            userName: '김철수',
            userEmail: 'kim@example.com',
            amount: 29.00,
            plan: 'PRO',
            issueDate: '2024-06-01',
            dueDate: '2024-06-15',
            status: 'paid',
            paymentMethod: 'card'
        },
        {
            id: 'INV-2024-002',
            userId: 'user_456',
            userName: '이영희',
            userEmail: 'lee@example.com',
            amount: 99.00,
            plan: 'ENTERPRISE',
            issueDate: '2024-06-03',
            dueDate: '2024-06-18',
            status: 'pending',
            paymentMethod: 'bank'
        },
        {
            id: 'INV-2024-003',
            userId: 'user_789',
            userName: '박민수',
            userEmail: 'park@example.com',
            amount: 29.00,
            plan: 'PRO',
            issueDate: '2024-05-15',
            dueDate: '2024-05-30',
            status: 'overdue',
            paymentMethod: 'card'
        },
        {
            id: 'INV-2024-004',
            userId: 'user_101',
            userName: '최수정',
            userEmail: 'choi@example.com',
            amount: 299.00,
            plan: 'CUSTOM',
            issueDate: '2024-06-05',
            dueDate: '2024-06-20',
            status: 'paid',
            paymentMethod: 'paypal'
        },
        {
            id: 'INV-2024-005',
            userId: 'user_202',
            userName: '정현우',
            userEmail: 'jung@example.com',
            amount: 99.00,
            plan: 'ENTERPRISE',
            issueDate: '2024-06-07',
            dueDate: '2024-06-22',
            status: 'cancelled',
            paymentMethod: 'card'
        }
    ];




    const subscriptions = [
        {
            id: 'sub_001',
            userId: 'user_123',
            userName: '김철수',
            userEmail: 'kim@example.com',
            plan: 'PRO',
            status: 'active',
            startDate: '2024-01-15',
            nextBilling: '2024-07-15',
            amount: 29.00,
            usage: {
                apiCalls: 15420,
                limit: 50000
            }
        },
        {
            id: 'sub_002',
            userId: 'user_456',
            userName: '이영희',
            userEmail: 'lee@example.com',
            plan: 'ENTERPRISE',
            status: 'active',
            startDate: '2024-03-01',
            nextBilling: '2024-07-01',
            amount: 99.00,
            usage: {
                apiCalls: 89250,
                limit: 200000
            }
        },
        {
            id: 'sub_003',
            userId: 'user_789',
            userName: '박민수',
            userEmail: 'park@example.com',
            plan: 'PRO',
            status: 'cancelled',
            startDate: '2024-02-10',
            endDate: '2024-06-10',
            amount: 29.00,
            usage: {
                apiCalls: 0,
                limit: 50000
            }
        },
        {
            id: 'sub_004',
            userId: 'user_303',
            userName: '송지영',
            userEmail: 'song@example.com',
            plan: 'FREE',
            status: 'trial',
            startDate: '2024-06-20',
            nextBilling: '2024-07-20',
            amount: 0,
            usage: {
                apiCalls: 2450,
                limit: 10000
            }
        },
        {
            id: 'sub_005',
            userId: 'user_404',
            userName: '한동현',
            userEmail: 'han@example.com',
            plan: 'CUSTOM',
            status: 'active',
            startDate: '2024-04-01',
            nextBilling: '2024-07-01',
            amount: 299.00,
            usage: {
                apiCalls: 145600,
                limit: 500000
            }
        }
    ];

    const transactions = [
        {
            id: 'txn_001',
            userId: 'user_123',
            userName: '김철수',
            type: 'payment',
            amount: 29.00,
            method: 'card',
            status: 'success',
            timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5분 전
            description: 'PRO 플랜 월 구독료'
        },
        {
            id: 'txn_002',
            userId: 'user_456',
            userName: '이영희',
            type: 'payment',
            amount: 99.00,
            method: 'bank',
            status: 'processing',
            timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30분 전
            description: 'ENTERPRISE 플랜 월 구독료'
        },
        {
            id: 'txn_003',
            userId: 'user_789',
            userName: '박민수',
            type: 'refund',
            amount: -29.00,
            method: 'card',
            status: 'success',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
            description: 'PRO 플랜 구독 취소 환불'
        },
        {
            id: 'txn_004',
            userId: 'user_101',
            userName: '최수정',
            type: 'payment',
            amount: 299.00,
            method: 'paypal',
            status: 'success',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6시간 전
            description: 'CUSTOM 플랜 월 구독료'
        },
        {
            id: 'txn_005',
            userId: 'user_505',
            userName: '강민석',
            type: 'chargeback',
            amount: -99.00,
            method: 'card',
            status: 'failed',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12시간 전
            description: 'ENTERPRISE 플랜 지불거절'
        }
    ];

    const plans = [
        {
            id: 'free',
            name: 'FREE',
            description: '개인 개발자를 위한 무료 플랜',
            price: 0,
            currency: 'USD',
            period: 'month',
            features: [
                '월 10,000 API 호출',
                '기본 AI 모델 액세스',
                '커뮤니티 지원',
                '기본 분석 도구'
            ],
            limits: {
                apiCalls: 10000,
                models: ['gpt-3.5-turbo'],
                support: 'community'
            },
            subscribers: 842,
            featured: false,
            active: true
        },
        {
            id: 'pro',
            name: 'PRO',
            description: '전문가와 소규모 팀을 위한 플랜',
            price: 29,
            currency: 'USD',
            period: 'month',
            features: [
                '월 50,000 API 호출',
                '모든 AI 모델 액세스',
                '이메일 지원',
                '고급 분석 도구',
                'API 키 관리',
                '사용량 알림'
            ],
            limits: {
                apiCalls: 50000,
                models: ['gpt-4', 'gpt-3.5-turbo', 'claude-3'],
                support: 'email'
            },
            subscribers: 298,
            featured: true,
            active: true
        },
        {
            id: 'enterprise',
            name: 'ENTERPRISE',
            description: '대기업을 위한 고급 플랜',
            price: 99,
            currency: 'USD',
            period: 'month',
            features: [
                '월 200,000 API 호출',
                '모든 AI 모델 + 프리미엄',
                '24/7 전화 지원',
                '실시간 분석 대시보드',
                '팀 관리 도구',
                'SLA 보장',
                '커스텀 통합'
            ],
            limits: {
                apiCalls: 200000,
                models: ['gpt-4', 'claude-3-opus', 'gemini-pro'],
                support: 'phone'
            },
            subscribers: 87,
            featured: false,
            active: true
        },
        {
            id: 'custom',
            name: 'CUSTOM',
            description: '맞춤형 엔터프라이즈 솔루션',
            price: null,
            currency: 'USD',
            period: 'month',
            features: [
                '무제한 API 호출',
                '모든 AI 모델 + 베타 액세스',
                '전담 고객 성공 매니저',
                '맞춤형 분석 도구',
                '온프레미스 배포 옵션',
                '맞춤형 SLA',
                '우선 기술 지원'
            ],
            limits: {
                apiCalls: 'unlimited',
                models: 'all',
                support: 'dedicated'
            },
            subscribers: 20,
            featured: false,
            active: true
        }
    ];
    const [reportType, setreportType] = useState('revenue');



    return (
        <>
            <div className="page-container">
                {/* 페이지 헤더  */}
                <div className="page-header">
                    <div className="header-top">
                        <div className="header-info">
                            <h1 className="page-title">과금 관리</h1>
                            <p className="page-subtitle">사용자 요금제와 결제 내역을 관리하세요</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" id="export-billing">
                                📊 청구서 내보내기
                            </button>
                            <button className="btn btn-primary" id="create-invoice">
                                ➕ 청구서 생성
                            </button>
                        </div>
                    </div>
                </div>

                {/* 과금 통계 */}
                <div className="billing-stats">
                    <div className="stat-card revenue">
                        <div className="stat-icon revenue">💰</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-revenue">$47,832</div>
                            <div className="stat-label">이번 달 수익</div>
                            <div className="stat-change positive">+24% 증가</div>
                        </div>
                    </div>

                    <div className="stat-card subscription">
                        <div className="stat-icon subscription">📋</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-subscriptions">1,247</div>
                            <div className="stat-label">활성 구독</div>
                            <div className="stat-change positive">+87 신규</div>
                        </div>
                    </div>

                    <div className="stat-card arpu">
                        <div className="stat-icon arpu">📈</div>
                        <div className="stat-content">
                            <div className="stat-value" id="arpu">$38.36</div>
                            <div className="stat-label">사용자당 평균 수익</div>
                            <div className="stat-change positive">+5.2% 증가</div>
                        </div>
                    </div>

                    <div className="stat-card churn">
                        <div className="stat-icon churn">📉</div>
                        <div className="stat-content">
                            <div className="stat-value" id="churn-rate">2.4%</div>
                            <div className="stat-label">이탈률</div>
                            <div className="stat-change negative">-0.8% 개선</div>
                        </div>
                    </div>

                    <div className="stat-card outstanding">
                        <div className="stat-icon outstanding">⏰</div>
                        <div className="stat-content">
                            <div className="stat-value" id="outstanding-amount">$8,432</div>
                            <div className="stat-label">미납 금액</div>
                            <div className="stat-change warning">23건 미납</div>
                        </div>
                    </div>
                </div>

                {/* 메인 대시보드 */}
                <div className="billing-dashboard">
                    <div className="dashboard-main">
                        {/* 수익 차트 */}
                        <div className="chart-section">
                            <div className="section-header">
                                <h3 className="section-title">
                                    <div className="section-icon revenue">💰</div>
                                    수익 트렌드
                                </h3>
                                <div className="chart-controls">
                                    <select id="revenue-period" className="filter-select">
                                        <option value="week">7일</option>
                                        <option value="month">30일</option>
                                        <option value="quarter">3개월</option>
                                        <option value="year">1년</option>
                                    </select>
                                </div>
                            </div>
                            <div className="chart-container" id="revenue-chart">
                                <div className="chart-placeholder">
                                    💹 수익 차트 (Chart.js 연동 예정)
                                    <div className="chart-demo">
                                        <div className="chart-bars revenue">
                                            <div className="chart-bar" style={{ height: '45%' }}></div>
                                            <div className="chart-bar" style={{ height: '60%' }}></div>
                                            <div className="chart-bar" style={{ height: '55%' }}></div>
                                            <div className="chart-bar" style={{ height: '45%' }}></div>
                                            <div className="chart-bar" style={{ height: '80%' }}></div>
                                            <div className="chart-bar" style={{ height: '90%' }}></div>
                                            <div className="chart-bar" style={{ height: '95%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 구독 현황 */}
                        <div className="subscription-overview">
                            <div className="section-header">
                                <h3 className="section-title">
                                    <div className="section-icon subscription">📋</div>
                                    구독 현황
                                </h3>
                                <button className="btn btn-secondary" id="manage-plans">
                                    ⚙️ 요금제 관리
                                </button>
                            </div>

                            <div className="plan-distribution">
                                <div className="plan-item">
                                    <div className="plan-info">
                                        <div className="plan-name">FREE</div>
                                        <div className="plan-price">$0/월</div>
                                    </div>
                                    <div className="plan-stats">
                                        <div className="plan-users">842명</div>
                                        <div className="plan-percentage">67.5%</div>
                                    </div>
                                    <div className="plan-bar">
                                        <div className="plan-fill" style={{ width: '67.5%' }}></div>
                                    </div>
                                </div>

                                <div className="plan-item">
                                    <div className="plan-info">
                                        <div className="plan-name">PRO</div>
                                        <div className="plan-price">$29/월</div>
                                    </div>
                                    <div className="plan-stats">
                                        <div className="plan-users">298명</div>
                                        <div className="plan-percentage">23.9%</div>
                                    </div>
                                    <div className="plan-bar">
                                        <div className="plan-fill" style={{ width: '23.9%' }}></div>
                                    </div>
                                </div>

                                <div className="plan-item">
                                    <div className="plan-info">
                                        <div className="plan-name">ENTERPRISE</div>
                                        <div className="plan-price">$99/월</div>
                                    </div>
                                    <div className="plan-stats">
                                        <div className="plan-users">87명</div>
                                        <div className="plan-percentage">7.0%</div>
                                    </div>
                                    <div className="plan-bar">
                                        <div className="plan-fill" style={{ width: '6.9%' }}></div>
                                    </div>
                                </div>

                                <div className="plan-item">
                                    <div className="plan-info">
                                        <div className="plan-name">CUSTOM</div>
                                        <div className="plan-price">협의</div>
                                    </div>
                                    <div className="plan-stats">
                                        <div className="plan-users">20명</div>
                                        <div className="plan-percentage">1.6%</div>
                                    </div>
                                    <div className="plan-bar">
                                        <div className="plan-fill" style={{ width: '1.6%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 사이드바 정보 */}
                    <div className="dashboard-sidebar">
                        {/* 최근 거래 */}
                        <div className="sidebar-section">
                            <div className="section-header">
                                <h4 className="section-title">최근 거래</h4>
                                <button className="refresh-btn" id="refresh-transactions">🔄</button>
                            </div>
                            <div className="transactions-list" id="recent-transactions">
                                {/* 거래 내역이 여기에 동적으로 추가됩니다 */}
                                {<RenderRecentTransactions transactions={transactions} />}
                            </div>
                        </div>

                        {/* 미납 알림 */}
                        <div className="sidebar-section">
                            <div className="section-header">
                                <h4 className="section-title">⚠️ 미납 알림</h4>
                                <span className="notification-count">23</span>
                            </div>
                            <div className="overdue-list" id="overdue-payments">
                                {/* 미납 내역이 여기에 동적으로 추가됩니다 */}
                                {<RenderOverduePayments invoices={invoices} />}
                            </div>
                        </div>

                        {/* 결제 방법 */}
                        <div className="sidebar-section">
                            <div className="section-header">
                                <h4 className="section-title">결제 방법</h4>
                            </div>
                            <div className="payment-methods">
                                <div className="payment-method">
                                    <div className="payment-icon">💳</div>
                                    <div className="payment-info">
                                        <div className="payment-name">신용카드</div>
                                        <div className="payment-count">892명 (71.5%)</div>
                                    </div>
                                </div>
                                <div className="payment-method">
                                    <div className="payment-icon">🏦</div>
                                    <div className="payment-info">
                                        <div className="payment-name">계좌이체</div>
                                        <div className="payment-count">245명 (19.6%)</div>
                                    </div>
                                </div>
                                <div className="payment-method">
                                    <div className="payment-icon">💰</div>
                                    <div className="payment-info">
                                        <div className="payment-name">전자결제</div>
                                        <div className="payment-count">110명 (8.9%)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 세부 관리 탭 */}
                <div className="billing-tabs">
                    <div className="tab-navigation">
                        <button className={`tab-btn ${pagestatus === 'invoices' ? 'active' : ''}`} onClick={() => setpagestatus('invoices')}>📄 청구서</button>
                        <button className={`tab-btn ${pagestatus === 'subscriptions' ? 'active' : ''}`} onClick={() => setpagestatus('subscriptions')}>🔔 구독 관리</button>
                        <button className={`tab-btn ${pagestatus === 'transactions' ? 'active' : ''}`} onClick={() => setpagestatus('transactions')}>💳 거래 내역</button>
                        <button className={`tab-btn ${pagestatus === 'plans' ? 'active' : ''}`} onClick={() => setpagestatus('plans')}>📋 요금제</button>
                        <button className={`tab-btn ${pagestatus === 'reports' ? 'active' : ''}`} onClick={() => setpagestatus('reports')}>📊 재무 보고서</button>
                    </div>

                    <div className="tab-content">
                        {/* 청구서 탭 */}
                        <div className={`tab-pane ${pagestatus === 'invoices' ? 'active' : ''}`} id="invoices-tab">
                            <div className="invoices-section">
                                <div className="invoices-toolbar">
                                    <div className="toolbar-left">
                                        <div className="search-box">
                                            <input type="text" id="invoice-search" placeholder="청구서 검색..."
                                                className="search-input"
                                                onChange={(e) => setfilters(prev => ({
                                                    ...prev,
                                                    invoices: {
                                                        ...prev.invoices,
                                                        search: e.target.value
                                                    }
                                                }))}
                                            />
                                            <div className="search-icon">🔍</div>
                                        </div>
                                        <div className="filter-group">
                                            <select id="invoice-status" className="filter-select" value={filters.invoices.status}
                                                onChange={(e) => setfilters(prev => ({
                                                    ...prev,
                                                    invoices: {
                                                        ...prev.invoices,
                                                        status: e.target.value
                                                    }
                                                }))}
                                            >
                                                <option value="all">모든 상태</option>
                                                <option value="paid">결제 완료</option>
                                                <option value="pending">결제 대기</option>
                                                <option value="overdue">연체</option>
                                                <option value="cancelled">취소</option>
                                            </select>
                                            <select id="invoice-period" className="filter-select" value={filters.invoices.period}
                                                onChange={(e) => setfilters(prev => ({
                                                    ...prev,
                                                    invoices: {
                                                        ...prev.invoices,
                                                        period: e.target.value
                                                    }
                                                }))}
                                            >
                                                <option value="month">이번 달</option>
                                                <option value="quarter">최근 3개월</option>
                                                <option value="year">올해</option>
                                                <option value="all">전체</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="toolbar-right">
                                        <button className="btn btn-secondary" id="bulk-send">📧 일괄 발송</button>
                                    </div>
                                </div>

                                <div className="invoices-table-container">
                                    <table className="invoices-table">
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" id="select-all-invoices" /></th>
                                                <th>청구서 번호</th>
                                                <th>고객</th>
                                                <th>금액</th>
                                                <th>발행일</th>
                                                <th>만료일</th>
                                                <th>상태</th>
                                                <th>액션</th>
                                            </tr>
                                        </thead>
                                        <tbody id="invoices-tbody">
                                            {/* 청구서 데이터가 여기에 동적으로 추가됩니다 */}
                                            {<RenderInvoices filters={filters} invoices={invoices} />}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 구독 관리 탭 */}
                        <div className={`tab-pane ${pagestatus === 'subscriptions' ? 'active' : ''}`} id="subscriptions-tab">
                            <div className="subscriptions-section">
                                <div className="subscriptions-toolbar">
                                    <div className="toolbar-left">
                                        <div className="search-box">
                                            <input type="text" id="subscription-search" placeholder="구독 검색..."
                                                className="search-input"
                                                onChange={(e) => setfilters(prev => ({
                                                    ...prev,
                                                    subscriptions: {
                                                        ...prev.subscriptions,
                                                        search: e.target.value
                                                    }
                                                }))}
                                            />
                                            <div className="search-icon">🔍</div>
                                        </div>
                                        <div className="filter-group">
                                            <select id="subscription-status" className="filter-select" value={filters.subscriptions.status}
                                                onChange={(e) => setfilters(prev => ({
                                                    ...prev,
                                                    subscriptions: {
                                                        ...prev.subscriptions,
                                                        status: e.target.value
                                                    }
                                                }))}
                                            >
                                                <option value="all">모든 상태</option>
                                                <option value="active">활성</option>
                                                <option value="cancelled">취소</option>
                                                <option value="expired">만료</option>
                                                <option value="trial">체험</option>
                                            </select>
                                            <select id="subscription-plan" className="filter-select" value={filters.subscriptions.plan}
                                                onChange={(e) => setfilters(prev => ({
                                                    ...prev,
                                                    subscriptions: {
                                                        ...prev.subscriptions,
                                                        plan: e.target.value
                                                    }
                                                }))}
                                            >
                                                <option value="all">모든 요금제</option>
                                                <option value="free">FREE</option>
                                                <option value="pro">PRO</option>
                                                <option value="enterprise">ENTERPRISE</option>
                                                <option value="custom">CUSTOM</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="subscriptions-grid" id="subscriptions-grid">
                                    {/* 구독 카드들이 여기에 동적으로 추가됩니다 */}
                                    {<RenderSubscriptions filters={filters} subscriptions={subscriptions} />}
                                </div>
                            </div>
                        </div>

                        {/* 거래 내역 탭 */}
                        <div className={`tab-pane ${pagestatus === 'transactions' ? 'active' : ''}`}>
                            <div className="transactions-section">
                                <div className="transactions-toolbar">
                                    <div className="toolbar-left">
                                        <div className="search-box">
                                            <input type="text" id="transaction-search" placeholder="거래 검색..."
                                                className="search-input"
                                                onChange={(e) => setfilters(prev => ({
                                                    ...prev,
                                                    transactions: {
                                                        ...prev.transactions,
                                                        search: e.target.value
                                                    }
                                                }))}
                                            />
                                            <div className="search-icon">🔍</div>
                                        </div>
                                        <div className="filter-group">
                                            <select id="transaction-type" className="filter-select" value={filters.transactions.type}
                                                onChange={(e) => setfilters(prev => ({
                                                    ...prev,
                                                    transactions: {
                                                        ...prev.transactions,
                                                        type: e.target.value
                                                    }
                                                }))}
                                            >
                                                <option value="all">모든 유형</option>
                                                <option value="payment">결제</option>
                                                <option value="refund">환불</option>
                                                <option value="chargeback">지불거절</option>
                                            </select>
                                            <select id="transaction-method" className="filter-select" value={filters.transactions.method}
                                                onChange={(e) => setfilters(prev => ({
                                                    ...prev,
                                                    transactions: {
                                                        ...prev.transactions,
                                                        method: e.target.value
                                                    }
                                                }))}
                                            >
                                                <option value="all">모든 결제수단</option>
                                                <option value="card">신용카드</option>
                                                <option value="bank">계좌이체</option>
                                                <option value="paypal">페이팔</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="toolbar-right">
                                        <button className="btn btn-secondary" id="export-transactions">📊 내보내기</button>
                                    </div>
                                </div>

                                <div className="transactions-table-container">
                                    <table className="transactions-table">
                                        <thead>
                                            <tr>
                                                <th>거래 ID</th>
                                                <th>고객</th>
                                                <th>유형</th>
                                                <th>금액</th>
                                                <th>결제수단</th>
                                                <th>상태</th>
                                                <th>일시</th>
                                                <th>액션</th>
                                            </tr>
                                        </thead>
                                        <tbody id="transactions-tbody">
                                            {/* 거래 데이터가 여기에 동적으로 추가됩니다 */}
                                            {<RenderTransactions filters={filters} transactions={transactions} />}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 요금제 탭 */}
                        <div className={`tab-pane ${pagestatus === 'plans' ? 'active' : ''}`}>
                            <div className="plans-section">
                                <div className="plans-toolbar">
                                    <div className="toolbar-left">
                                        <h3>요금제 관리</h3>
                                    </div>
                                    <div className="toolbar-right">
                                        <button className="btn btn-primary" id="add-plan">➕ 요금제 추가</button>
                                    </div>
                                </div>

                                <div className="plans-grid" id="plans-grid">
                                    {/* 요금제 카드들이 여기에 동적으로 추가됩니다 */}
                                    {<RenderPlans plans={plans} />}
                                </div>
                            </div>
                        </div>

                        {/* 재무 보고서 탭 */}
                        <div className={`tab-pane ${pagestatus === 'reports' ? 'active' : ''}`}>
                            <div className="reports-section">
                                <div className="reports-toolbar">
                                    <div className="toolbar-left">
                                        <h3>재무 보고서</h3>
                                    </div>
                                    <div className="toolbar-right">
                                        <select id="report-type" className="filter-select" value={reportType}
                                            onChange={(e) => setreportType(e.target.value)}
                                        >
                                            <option value="revenue">수익 보고서</option>
                                            <option value="subscription">구독 보고서</option>
                                            <option value="churn">이탈 분석</option>
                                            <option value="forecast">수익 예측</option>
                                        </select>
                                        <button className="btn btn-secondary" id="generate-report">📊 보고서 생성</button>
                                    </div>
                                </div>

                                <div className="reports-content" id="reports-content">
                                    {/* 보고서 내용이 여기에 동적으로 추가됩니다 */}
                                    {<RenderReports reportType={reportType} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

function getFilteredData({ data, filters, type }) {
    // const filters = filters[type];

    // 검색 필터
    if (filters.search) {
        data = data.filter(item => {
            const searchFields = type === 'invoices' ?
                [item.id, item.userName, item.userEmail] :
                type === 'subscriptions' ?
                    [item.userName, item.userEmail, item.plan] :
                    [item.id, item.userName, item.description];

            return searchFields.some(field =>
                field.toLowerCase().includes(filters.search)
            );
        });
    }

    // 상태 필터
    if (filters.status && filters.status !== 'all') {
        data = data.filter(item => item.status === filters.status);
    }

    // 타입별 추가 필터
    if (type === 'subscriptions' && filters.plan && filters.plan !== 'all') {
        data = data.filter(item => item.plan.toLowerCase() === filters.plan);
    }

    if (type === 'transactions') {
        if (filters.type && filters.type !== 'all') {
            data = data.filter(item => item.type === filters.type);
        }
        if (filters.method && filters.method !== 'all') {
            data = data.filter(item => item.method === filters.method);
        }
    }
    return data;
}

function RenderReports({ reportType }) {
    return (
        <>
            <div className="report-summary">
                <div className="summary-card">
                    <div className="summary-value">$47,832</div>
                    <div className="summary-label">이번 달 총 수익</div>
                </div>
                <div className="summary-card">
                    <div className="summary-value">1,247</div>
                    <div className="summary-label">활성 구독자</div>
                </div>
                <div className="summary-card">
                    <div className="summary-value">$38.36</div>
                    <div className="summary-label">ARPU</div>
                </div>
                <div className="summary-card">
                    <div className="summary-value">2.4%</div>
                    <div className="summary-label">이탈률</div>
                </div>
            </div>

            <div className="report-chart">
                <h4>{getReportTitle(reportType)}</h4>
                <div className="chart-placeholder">
                    📊 {reportType} 보고서 차트 (Chart.js 연동 예정)
                </div>
            </div>

            <div className="report-table">
                <h4>상세 데이터</h4>
                <p>상세 보고서 테이블이 여기에 표시됩니다.</p>
            </div>
        </>
    );
}

function getReportTitle(type) {
    const titleMap = {
        revenue: '수익 보고서',
        subscription: '구독 보고서',
        churn: '이탈 분석',
        forecast: '수익 예측'
    };
    return titleMap[type] || '보고서';
}

function RenderPlans({ plans }) {
    return (
        <>
            {plans.map((plan) => (
                <div className={`plan-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
                    <div className="plan-header">
                        <div className="plan-name">{plan.name}</div>
                        <div className="plan-subscribers">{plan.subscribers}명 구독 중</div>
                    </div>

                    <div className="plan-price">
                        <span className="plan-currency">$</span>
                        <span className="plan-amount">{plan.price || '협의'}</span>
                        {plan.price ? (<span className="plan-period">/{plan.period}</span>) : ''}
                    </div>

                    <div className="plan-description">{plan.description}</div>

                    <div className="plan-features">
                        <ul>
                            {plan.features.map(feature => (<li key={feature}>{feature}</li>))}
                        </ul>
                    </div>

                    <div className="plan-info">
                        <div className="info-item">
                            <div className="info-value">{plan.limits.apiCalls === 'unlimited' ? '무제한' : formatNumber(plan.limits.apiCalls)}</div>
                            <div className="info-label">API 호출</div>
                        </div>
                        <div className="info-item">
                            <div className="info-value">{Array.isArray(plan.limits.models) ? plan.limits.models.length : '전체'}</div>
                            <div className="info-label">AI 모델</div>
                        </div>
                    </div>

                    <div className="plan-actions">
                        <button className="action-btn secondary" data-action="edit" data-id="${plan.id}">편집</button>
                        <button className={`action-btn ${plan.active ? 'secondary' : 'primary'}`}
                            data-action="toggle" data-id="${plan.id}">
                            {plan.active ? '비활성화' : '활성화'}
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}

function RenderTransactions({ filters, transactions }) {
    const filteredTransactions = getFilteredData({ 'data': transactions, 'filters': filters.transactions, 'type': 'transactions' });
    return (
        <>
            {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                    <td>
                        <div className="transaction-id">{transaction.id}</div>
                    </td>
                    <td>
                        <div className="customer-info">
                            <div className="customer-name">{transaction.userName}</div>
                        </div>
                    </td>
                    <td>
                        <span className={`transaction-type ${transaction.type}`}>{getTransactionTypeText(transaction.type)}</span>
                    </td>
                    <td className={`amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
                        {transaction.amount < 0 ? '-' : ''}{Math.abs(transaction.amount)}
                    </td>
                    <td>{getPaymentMethodText(transaction.method)}</td>
                    <td><span className={`status-badge ${transaction.status}`}>{getStatusText(transaction.status)}</span></td>
                    <td>{formatDateTime(transaction.timestamp)}</td>
                    <td>
                        <div className="table-actions">
                            <button className="table-action-btn" data-action="view" data-id="${transaction.id}" title="상세보기">👁️</button>
                            <button className="table-action-btn" data-action="receipt" data-id="${transaction.id}" title="영수증">📄</button>
                            {transaction.type === 'payment' && transaction.status === 'success' ?
                                (<button className="table-action-btn" data-action="refund" data-id="${transaction.id}" title="환불">↩️</button>) : ''
                            }
                        </div>
                    </td>
                </tr>
            ))}

        </>
    );
}

function getTransactionTypeText(type) {
    const typeMap = {
        payment: '결제',
        refund: '환불',
        chargeback: '지불거절'
    };
    return typeMap[type] || type;
}
function getPaymentMethodText(method) {
    const methodMap = {
        card: '신용카드',
        bank: '계좌이체',
        paypal: '페이팔'
    };
    return methodMap[method] || method;
}
function formatDateTime(date) {
    return new Date(date).toLocaleString('ko-KR');
}


function RenderSubscriptions({ filters, subscriptions }) {
    const filteredSubscriptions = getFilteredData({ 'data': subscriptions, 'filters': filters.subscriptions, 'type': 'subscriptions' });
    return (
        <>
            {filteredSubscriptions.map((subscription, index) => (
                <div className={`subscription-card ${subscription.status}`} key={index}>
                    <div className="subscription-header">
                        <div className="subscription-user">{subscription.userName}</div>
                        <span className={`status-badge ${subscription.status}`}>{getStatusText(subscription.status)}</span>
                    </div>

                    <div className="subscription-plan">{subscription.plan} 플랜</div>

                    <div className="subscription-info">
                        <div className="info-item">
                            <div className="info-value">{subscription.amount}</div>
                            <div className="info-label">월 요금</div>
                        </div>
                        <div className="info-item">
                            <div className="info-value">{formatNumber(subscription.usage.apiCalls)}</div>
                            <div className="info-label">API 사용량</div>
                        </div>
                    </div>

                    <div className="usage-progress">
                        <div className="usage-bar">
                            <div className="usage-fill" style={{ width: `${(subscription.usage.apiCalls / subscription.usage.limit) * 100}%` }}></div>
                        </div>
                        <div className="usage-text">
                            {formatNumber(subscription.usage.apiCalls)} / {formatNumber(subscription.usage.limit)} 사용
                        </div>
                    </div>

                    <div className="subscription-dates">
                        <div className="date-item">
                            <span className="date-label">시작일:</span>
                            <span className="date-value">{formatDate(subscription.startDate)}</span>
                        </div>
                        {subscription.nextBilling ? (
                            <div className="date-item">
                                <span className="date-label">다음 결제:</span>
                                <span className="date-value">{formatDate(subscription.nextBilling)}</span>
                            </div>
                        ) : ''}
                    </div>

                    <div className="subscription-actions">
                        <button className="action-btn secondary" data-action="view" data-id="${subscription.id}">상세보기</button>
                        {subscription.status === 'active' ?
                            (<button className="action-btn secondary" data-action="cancel" data-id="${subscription.id}">구독취소</button>) :
                            (<button className="action-btn primary" data-action="reactivate" data-id="${subscription.id}">재활성화</button>)
                        }
                    </div>
                </div>
            ))}

        </>
    );
}

function RenderInvoices({ filters, invoices }) {
    const filteredInvoices = getFilteredData({ 'data': invoices, 'filters': filters.invoices, 'type': 'invoices' });

    return (
        <>
            {filteredInvoices.map((invoice) => (
                <tr key={invoice.id}>
                    <td><input type="checkbox" className="invoice-checkbox" /></td>
                    <td>
                        <div className="invoice-number">{invoice.id}</div>
                    </td>
                    <td>
                        <div className="customer-info">
                            <div className="customer-name">{invoice.userName}</div>
                            <div className="customer-email">{invoice.userEmail}</div>
                        </div>
                    </td>
                    <td className="amount">{invoice.amount}</td>
                    <td>{formatDate(invoice.issueDate)}</td>
                    <td>{formatDate(invoice.dueDate)}</td>
                    <td><span className={`status-badge ${invoice.status}`}>{getStatusText(invoice.status)}</span></td>
                    <td>
                        <div className="table-actions">
                            <button className="table-action-btn" data-action="view" data-id="${invoice.id}" title="보기">👁️</button>
                            <button className="table-action-btn" data-action="send" data-id="${invoice.id}" title="발송">📧</button>
                            <button className="table-action-btn" data-action="download" data-id="${invoice.id}" title="다운로드">⬇️</button>
                            <button className="table-action-btn" data-action="delete" data-id="${invoice.id}" title="삭제">🗑️</button>
                        </div>
                    </td>
                </tr>
            ))}

        </>
    );
}
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function RenderOverduePayments({ invoices }) {
    const overdueInvoices = invoices
        .filter(invoice => invoice.status === 'overdue')
        .slice(0, 5);

    return (
        <>
            {overdueInvoices.map((invoice) => {
                const daysPastDue = Math.floor((new Date() - new Date(invoice.dueDate)) / (1000 * 60 * 60 * 24));
                return (
                    <div className="overdue-item" key={invoice.userName}>
                        <div className="overdue-info">
                            <div className="overdue-user">{invoice.userName}</div>
                            <div className="overdue-days">{daysPastDue}일 연체</div>
                        </div>
                        <div className="overdue-amount">{invoice.amount}</div>
                    </div>
                );
            })}
        </>
    );
}


function RenderRecentTransactions({ transactions }) {
    const recentTransactions = transactions
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5);
    return (
        <>
            {recentTransactions.map((transaction) => (
                <div className="transaction-item" key={transaction.userName}>
                    <div className="transaction-info">
                        <div className="transaction-user">{transaction.userName}</div>
                        <div className="transaction-plan">{transaction.description}</div>
                        <div className="transaction-time">{formatRelativeTime(transaction.timestamp)}</div>
                    </div>
                    <div className="transaction-amount">{Math.abs(transaction.amount)}</div>
                </div>
            ))}
        </>
    );
}

function getStatusText(status) {
    const statusMap = {
        paid: '결제완료',
        pending: '결제대기',
        overdue: '연체',
        cancelled: '취소',
        active: '활성',
        expired: '만료',
        trial: '체험',
        success: '성공',
        failed: '실패',
        processing: '처리중'
    };
    return statusMap[status] || status;
}

function formatRelativeTime(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('ko-KR');
}