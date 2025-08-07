'use client';

import "@/adminStyle/analytics.css";

import { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function Analytics() {

    const errorAnalysis = [
        {
            time: new Date(Date.now() - 10 * 60 * 1000),
            type: '429 Rate Limit',
            user: 'kim@company.com',
            model: 'gpt-4',
            provider: 'OpenAI',
            message: 'Rate limit exceeded',
            frequency: 15,
            status: 'resolved'
        },
        {
            time: new Date(Date.now() - 25 * 60 * 1000),
            type: '500 Server Error',
            user: 'park@startup.co.kr',
            model: 'claude-3-opus',
            provider: 'Anthropic',
            message: 'Internal server error',
            frequency: 3,
            status: 'investigating'
        },
        {
            time: new Date(Date.now() - 45 * 60 * 1000),
            type: '401 Unauthorized',
            user: 'lee@tech.io',
            model: 'gemini-pro',
            provider: 'Google',
            message: 'Invalid API key',
            frequency: 8,
            status: 'resolved'
        }
    ];

    const modelUsage = [
        {
            model: 'gpt-4',
            provider: 'OpenAI',
            calls: 850000,
            tokens: 340000000,
            avgCost: 0.045,
            users: 324,
            avgResponseTime: 2.1,
            successRate: 98.9
        },
        {
            model: 'claude-3-opus',
            provider: 'Anthropic',
            calls: 520000,
            tokens: 195000000,
            avgCost: 0.038,
            users: 278,
            avgResponseTime: 1.8,
            successRate: 99.2
        },
        {
            model: 'gpt-3.5-turbo',
            provider: 'OpenAI',
            calls: 680000,
            tokens: 285000000,
            avgCost: 0.012,
            users: 456,
            avgResponseTime: 0.9,
            successRate: 99.5
        }
    ];

    const topUsers = [
        {
            rank: 1,
            name: '김철수',
            email: 'kim@company.com',
            calls: 45000,
            tokens: 18500000,
            cost: 2840.50,
            model: 'gpt-4',
            lastActivity: new Date(Date.now() - 2 * 60 * 1000),
            status: 'active'
        },
        {
            rank: 2,
            name: '박영희',
            email: 'park@startup.co.kr',
            calls: 38200,
            tokens: 14200000,
            cost: 2156.30,
            model: 'claude-3-opus',
            lastActivity: new Date(Date.now() - 5 * 60 * 1000),
            status: 'active'
        },
        {
            rank: 3,
            name: '이민수',
            email: 'lee@tech.io',
            calls: 32100,
            tokens: 12800000,
            cost: 1890.75,
            model: 'gpt-3.5-turbo',
            lastActivity: new Date(Date.now() - 15 * 60 * 1000),
            status: 'active'
        },
        {
            rank: 4,
            name: '정수진',
            email: 'jung@ai-lab.com',
            calls: 28900,
            tokens: 11200000,
            cost: 1675.20,
            model: 'claude-3-sonnet',
            lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
            status: 'active'
        },
        {
            rank: 5,
            name: '최동훈',
            email: 'choi@dev.kr',
            calls: 25400,
            tokens: 9800000,
            cost: 1423.60,
            model: 'gemini-pro',
            lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000),
            status: 'inactive'
        }
    ];

    return (
        <>
            <div className="page-container">
                {/* 페이지 헤더 */}
                <div className="page-header">
                    <div className="header-top">
                        <div className="header-info">
                            <h1 className="page-title">사용량 분석</h1>
                            <p className="page-subtitle">플랫폼 사용량을 상세히 분석하고 모니터링하세요</p>
                        </div>
                        <div className="header-actions">
                            <select id="time-range" className="filter-select">
                                <option value="today">오늘</option>
                                <option value="week">7일</option>
                                <option value="month">30일</option>
                                <option value="quarter">3개월</option>
                            </select>
                            <button id="refresh-data" className="btn btn-secondary">🔄 데이터 새로고침</button>
                            <button id="export-report" className="btn btn-primary">📊 리포트 내보내기</button>
                        </div>
                    </div>
                </div>

                {/* 핵심 통계 카드들 */}
                <div className="analytics-stats">
                    <div className="stat-card api-calls">
                        <div className="stat-icon">⚡</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-api-calls">2.4M</div>
                            <div className="stat-label">총 API 호출</div>
                            <div className="stat-change positive" id="api-calls-change">+18.5% vs 지난주</div>
                        </div>
                    </div>

                    <div className="stat-card tokens">
                        <div className="stat-icon">🔤</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-tokens">847M</div>
                            <div className="stat-label">토큰 사용량</div>
                            <div className="stat-change positive" id="tokens-change">+22.3% vs 지난주</div>
                        </div>
                    </div>

                    <div className="stat-card cost">
                        <div className="stat-icon">💰</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-cost">$12,847</div>
                            <div className="stat-label">총 사용 비용</div>
                            <div className="stat-change positive" id="cost-change">+15.2% vs 지난주</div>
                        </div>
                    </div>

                    <div className="stat-card users">
                        <div className="stat-icon">👥</div>
                        <div className="stat-content">
                            <div className="stat-value" id="active-users">1,247</div>
                            <div className="stat-label">활성 사용자</div>
                            <div className="stat-change positive" id="users-change">+24 vs 지난주</div>
                        </div>
                    </div>

                    <div className="stat-card response-time">
                        <div className="stat-icon">⏱️</div>
                        <div className="stat-content">
                            <div className="stat-value" id="avg-response-time">1.24s</div>
                            <div className="stat-label">평균 응답시간</div>
                            <div className="stat-change negative" id="response-time-change">-12.1% vs 지난주</div>
                        </div>
                    </div>

                    <div className="stat-card error-rate">
                        <div className="stat-icon">⚠️</div>
                        <div className="stat-content">
                            <div className="stat-value" id="error-rate">0.8%</div>
                            <div className="stat-label">오류율</div>
                            <div className="stat-change negative" id="error-rate-change">-37.5% vs 지난주</div>
                        </div>
                    </div>
                </div>

                {/* 차트 섹션 */}
                <div className="charts-section">
                    {/* API 사용량 트렌드 */}
                    <div className="chart-container">
                        <div className="chart-header">
                            <h3 className="chart-title">
                                <span className="chart-icon">📈</span>
                                API 사용량 트렌드
                            </h3>
                            <div className="chart-tabs">
                                <button className="chart-tab active" data-chart="calls">호출</button>
                                <button className="chart-tab" data-chart="tokens">토큰</button>
                                <button className="chart-tab" data-chart="cost">비용</button>
                            </div>
                        </div>
                        <div className="chart-content">
                            {<RenderUsageChart currentChart="calls" />}
                        </div>
                    </div>

                    {/* 프로바이더별 사용량 */}
                    <div className="chart-container">
                        <div className="chart-header">
                            <h3 className="chart-title">
                                <span className="chart-icon">🔗</span>
                                프로바이더별 사용량
                            </h3>
                            <select id="provider-metric" className="filter-select">
                                <option value="calls">API 호출 수</option>
                                <option value="tokens">토큰 사용량</option>
                                <option value="cost">비용</option>
                            </select>
                        </div>
                        <div className="chart-content">
                            <canvas id="provider-breakdown-chart"></canvas>
                            {<RenderProviderChart />}
                        </div>
                    </div>

                    {/* 사용자 활동 분석 */}
                    <div className="chart-container">
                        <div className="chart-header">
                            <h3 className="chart-title">
                                <span className="chart-icon">👥</span>
                                사용자 활동 분석
                            </h3>
                            <div className="view-toggles">
                                <button className="toggle-btn active" data-view="hourly">시간별</button>
                                <button className="toggle-btn" data-view="daily">일별</button>
                                <button className="toggle-btn" data-view="weekly">주별</button>
                            </div>
                        </div>
                        <div className="chart-content">
                            <canvas id="user-activity-chart"></canvas>
                        </div>
                    </div>

                    {/* 성능 모니터링 */}
                    <div className="chart-container">
                        <div className="chart-header">
                            <h3 className="chart-title">
                                <span className="chart-icon">⚡</span>
                                성능 모니터링
                            </h3>
                            <div className="performance-toggles">
                                <label className="toggle-checkbox">
                                    <input type="checkbox" id="show-latency" />
                                    <span>응답시간</span>
                                </label>
                                <label className="toggle-checkbox">
                                    <input type="checkbox" id="show-throughput" />
                                    <span>처리량</span>
                                </label>
                                <label className="toggle-checkbox">
                                    <input type="checkbox" id="show-errors" />
                                    <span>오류</span>
                                </label>
                            </div>
                        </div>
                        <div className="chart-content">
                            <canvas id="performance-chart"></canvas>
                        </div>
                    </div>
                </div>

                {/* 실시간 모니터링 */}
                <div className="realtime-monitoring">
                    <div className="monitoring-header">
                        <h3 className="monitoring-title">
                            <span className="monitoring-icon">⚡</span>
                            실시간 모니터링
                        </h3>
                        <div className="monitoring-controls">
                            <button id="pause-monitoring" className="btn btn-secondary">⏸️ 일시정지</button>
                            <button id="full-screen" className="btn btn-secondary">🔍 전체화면</button>
                        </div>
                    </div>
                    <div className="monitoring-grid">
                        <div className="monitoring-card">
                            <div className="monitoring-label">실시간 API 호출</div>
                            <div className="monitoring-value" id="realtime-api-calls">247</div>
                            <div className="monitoring-unit">calls/min</div>
                        </div>
                        <div className="monitoring-card">
                            <div className="monitoring-label">활성 연결</div>
                            <div className="monitoring-value" id="active-connections">89</div>
                            <div className="monitoring-unit">connections</div>
                        </div>
                        <div className="monitoring-card">
                            <div className="monitoring-label">평균 응답시간</div>
                            <div className="monitoring-value" id="realtime-response-time">1.24s</div>
                            <div className="monitoring-unit">seconds</div>
                        </div>
                        <div className="monitoring-card">
                            <div className="monitoring-label">실시간 오류율</div>
                            <div className="monitoring-value" id="realtime-error-rate">0.8%</div>
                            <div className="monitoring-unit">error rate</div>
                        </div>
                    </div>
                </div>

                {/* 데이터 테이블 섹션 */}
                <div className="tables-section">
                    {/* 상위 사용자 */}
                    <div className="table-container">
                        <div className="table-header">
                            <h3 className="table-title">
                                <span className="table-icon">👑</span>
                                상위 사용자 (Top 10)
                            </h3>
                            <div className="table-controls">
                                <input type="text" id="user-search" className="search-input" placeholder="사용자 검색..." />
                                <button id="export-users" className="btn btn-secondary">📊 내보내기</button>
                            </div>
                        </div>
                        <div className="table-content">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>순위</th>
                                        <th>사용자</th>
                                        <th>API 호출</th>
                                        <th>토큰 사용</th>
                                        <th>비용</th>
                                        <th>주요 모델</th>
                                        <th>마지막 활동</th>
                                        <th>상태</th>
                                    </tr>
                                </thead>
                                <tbody id="top-users-tbody">
                                    {/* JavaScript에서 동적으로 채워짐 */}
                                    {<RenderTopUsersTable topUsers={topUsers} />}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 모델별 사용량 */}
                    <div className="table-container">
                        <div className="table-header">
                            <h3 className="table-title">
                                <span className="table-icon">🤖</span>
                                모델별 사용량
                            </h3>
                            <div className="table-controls">
                                <select id="model-sort" className="filter-select">
                                    <option value="calls">API 호출 순</option>
                                    <option value="tokens">토큰 사용량 순</option>
                                    <option value="cost">비용 순</option>
                                    <option value="users">사용자 수 순</option>
                                </select>
                            </div>
                        </div>
                        <div className="table-content">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>모델</th>
                                        <th>프로바이더</th>
                                        <th>API 호출</th>
                                        <th>토큰 사용</th>
                                        <th>평균 비용</th>
                                        <th>사용자 수</th>
                                        <th>평균 응답시간</th>
                                        <th>성공률</th>
                                    </tr>
                                </thead>
                                <tbody id="model-usage-tbody">
                                    {/* JavaScript에서 동적으로 채워짐 */}
                                    {<RenderModelUsageTable modelUsage={modelUsage} />}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 오류 분석 */}
                    <div className="table-container">
                        <div className="table-header">
                            <h3 className="table-title">
                                <span className="table-icon">⚠️</span>
                                오류 분석
                            </h3>
                            <div className="table-controls">
                                <select id="error-filter" className="filter-select">
                                    <option value="all">모든 오류</option>
                                    <option value="4xx">4xx 오류</option>
                                    <option value="5xx">5xx 오류</option>
                                    <option value="timeout">타임아웃</option>
                                    <option value="rate-limit">Rate Limit</option>
                                </select>
                            </div>
                        </div>
                        <div className="table-content">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>시간</th>
                                        <th>오류 유형</th>
                                        <th>사용자</th>
                                        <th>모델</th>
                                        <th>프로바이더</th>
                                        <th>오류 메시지</th>
                                        <th>빈도</th>
                                        <th>상태</th>
                                    </tr>
                                </thead>
                                <tbody id="error-analysis-tbody">
                                    {/* JavaScript에서 동적으로 채워짐 */}
                                    {<RenderErrorAnalysisTable errorAnalysis={errorAnalysis} />}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


function RenderUsageChart({ currentChart = 'calls' }) {
    const [data, setData] = useState(null);
    const canvasRef = useRef(null);
    const chartInstance = useRef(null);

    // 가상의 데이터 생성 함수
    const generateUsageData = () => {
        const days = 7;
        const data = [];

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            data.push({
                date: date.toISOString().split('T')[0],
                calls: Math.floor(Math.random() * 50000) + 300000,
                tokens: Math.floor(Math.random() * 20000000) + 100000000,
                cost: Math.floor(Math.random() * 2000) + 1500,
                previousCalls: Math.floor(Math.random() * 45000) + 280000,
                previousTokens: Math.floor(Math.random() * 18000000) + 90000000,
                previousCost: Math.floor(Math.random() * 1800) + 1300
            });
        }

        return data;
    };

    useEffect(() => {
        setData(generateUsageData());
    }, []);

    useEffect(() => {
        if (!data || !canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');

        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d =>
                    new Date(d.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
                ),
                datasets: [
                    {
                        label: '현재 기간',
                        data: data.map(d => {
                            switch (currentChart) {
                                case 'tokens': return d.tokens;
                                case 'cost': return d.cost;
                                default: return d.calls;
                            }
                        }),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: '이전 기간',
                        data: data.map(d => {
                            switch (currentChart) {
                                case 'tokens': return d.previousTokens;
                                case 'cost': return d.previousCost;
                                default: return d.previousCalls;
                            }
                        }),
                        borderColor: '#94a3b8',
                        backgroundColor: 'rgba(148, 163, 184, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(229, 231, 235, 0.5)'
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, currentChart]);

    if (!data) {
        return <div>차트를 로딩 중입니다...</div>;
    }

    return (

        <canvas ref={canvasRef} />

    );
}



function RenderErrorAnalysisTable({ errorAnalysis }) {
    return (
        <>
            {errorAnalysis.map((error) => (
                <tr key={error.time}>
                    <td data-label="시간">{formatRelativeTime(error.time)}</td>
                    <td data-label="오류 유형">
                        <div className="error-type">{error.type}</div>
                    </td>
                    <td data-label="사용자">{error.user}</td>
                    <td data-label="모델" className="model-name">{error.model}</td>
                    <td data-label="프로바이더">
                        <span className="provider-badge">{error.provider}</span>
                    </td>
                    <td data-label="오류 메시지">
                        <div className="error-message">{error.message}</div>
                    </td>
                    <td data-label="빈도" className={`metric-value ${getFrequencyClass(error.frequency)}`}>{error.frequency}</td>
                    <td data-label="상태">
                        <span className={`status-badge ${error.status}`}>{getStatusText(error.status)}</span>
                    </td>
                </tr>
            ))}
        </>
    );
}

function RenderModelUsageTable({ modelUsage }) {
    return (
        <>
            {modelUsage.map((model) => (
                <tr key={model.model}>
                    <td data-label="모델">
                        <span className="model-name">{model.model}</span>
                    </td>
                    <td data-label="프로바이더">
                        <span className="provider-badge">{model.provider}</span>
                    </td>
                    <td data-label="API 호출" className="metric-value">{formatNumber(model.calls)}</td>
                    <td data-label="토큰 사용" className="metric-value">{formatNumber(model.tokens)}</td>
                    <td data-label="평균 비용" className="metric-value">{model.avgCost.toFixed(3)}</td>
                    <td data-label="사용자 수" className="metric-value">{model.users}</td>
                    <td data-label="평균 응답시간" className="metric-value">{model.avgResponseTime}s</td>
                    <td data-label="성공률" className={`metric-value ${getSuccessRateClass(model.successRate)}`}>{model.successRate}%</td>
                </tr>
            ))}
        </>
    );
}

function RenderTopUsersTable({ topUsers }) {
    return (
        <>
            {topUsers.map((user) => (
                <tr key={user.rank}>
                    <td data-label="순위">{user.rank}</td>
                    <td data-label="사용자">
                        <div className="user-info">
                            <div className="user-avatar">{user.name.charAt(0)}</div>
                            <div className="user-details">
                                <div className="user-name">{user.name}</div>
                                <div className="user-email">{user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td data-label="API 호출" className="metric-value">{formatNumber(user.calls)}</td>
                    <td data-label="토큰 사용" className="metric-value">{formatNumber(user.tokens)}</td>
                    <td data-label="비용" className="metric-value">{user.cost.toFixed(2)}</td>
                    <td data-label="주요 모델">
                        <span className="model-name">{user.model}</span>
                    </td>
                    <td data-label="마지막 활동">{formatRelativeTime(user.lastActivity)}</td>
                    <td data-label="상태">
                        <span className={`status-badge ${user.status}`}>{user.status === 'active' ? '활성' : '비활성'}</span>
                    </td>
                </tr>
            ))}
        </>
    );
}
function getStatusText(status) {
    const statusMap = {
        resolved: '해결됨',
        investigating: '조사중',
        monitoring: '모니터링'
    };
    return statusMap[status] || status;
}

function getFrequencyClass(frequency) {
    if (frequency >= 10) return 'high';
    if (frequency >= 5) return 'medium';
    return 'low';
}

function getSuccessRateClass(rate) {
    if (rate >= 99) return 'high';
    if (rate >= 95) return 'medium';
    return 'low';
}

function formatRelativeTime(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
}

function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}