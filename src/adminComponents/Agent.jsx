'use client';

import "@/adminStyle/agents.css";

import { useState } from 'react';

export default function Agents() {
    const agents = [
        {
            id: 'agent_001',
            name: '📚 학습 도우미',
            description: '학습 계획 수립 및 진도 관리를 도와주는 AI 에이전트',
            owner: {
                name: '김지수',
                email: 'kim.jisu@example.com',
                plan: 'premium'
            },
            type: 'chat',
            model: 'gpt-4',
            status: 'active',
            created: '2024-06-15T09:00:00Z',
            lastActive: '2024-06-26T14:30:00Z',
            stats: {
                conversations: 847,
                tokens: 234567,
                cost: 23.45,
                uptime: 98.5
            },
            config: {
                temperature: 0.7,
                maxTokens: 2048,
                systemPrompt: '당신은 친근하고 도움이 되는 학습 도우미입니다.',
                functions: ['web_search', 'calendar', 'note_taking']
            }
        },
        {
            id: 'agent_002',
            name: '💼 비즈니스 분석가',
            description: '데이터 분석 및 비즈니스 인사이트 제공',
            owner: {
                name: '박민호',
                email: 'park.minho@company.com',
                plan: 'enterprise'
            },
            type: 'analysis',
            model: 'claude-3',
            status: 'running',
            created: '2024-06-10T11:30:00Z',
            lastActive: '2024-06-26T15:45:00Z',
            stats: {
                conversations: 1245,
                tokens: 567890,
                cost: 67.89,
                uptime: 99.2
            },
            config: {
                temperature: 0.3,
                maxTokens: 4096,
                systemPrompt: '비즈니스 데이터를 분석하고 실용적인 인사이트를 제공합니다.',
                functions: ['data_analysis', 'chart_generation', 'report_creation']
            }
        },
        {
            id: 'agent_003',
            name: '🎨 크리에이티브 도우미',
            description: '창작 활동을 지원하는 AI 에이전트',
            owner: {
                name: '이영희',
                email: 'lee.younghee@creative.com',
                plan: 'pro'
            },
            type: 'creative',
            model: 'gemini',
            status: 'active',
            created: '2024-06-20T16:15:00Z',
            lastActive: '2024-06-26T12:20:00Z',
            stats: {
                conversations: 523,
                tokens: 345678,
                cost: 34.56,
                uptime: 97.8
            },
            config: {
                temperature: 0.9,
                maxTokens: 3072,
                systemPrompt: '창의적이고 영감을 주는 아이디어를 제공합니다.',
                functions: ['image_generation', 'story_writing', 'brainstorming']
            }
        },
        {
            id: 'agent_004',
            name: '💻 코딩 어시스턴트',
            description: '프로그래밍 및 개발 지원',
            owner: {
                name: '최개발',
                email: 'choi.dev@techcorp.com',
                plan: 'enterprise'
            },
            type: 'code',
            model: 'gpt-4',
            status: 'running',
            created: '2024-06-05T08:45:00Z',
            lastActive: '2024-06-26T16:10:00Z',
            stats: {
                conversations: 2156,
                tokens: 892345,
                cost: 123.45,
                uptime: 99.8
            },
            config: {
                temperature: 0.1,
                maxTokens: 8192,
                systemPrompt: '정확하고 효율적인 코드 작성을 도와드립니다.',
                functions: ['code_execution', 'debug_analysis', 'documentation']
            }
        },
        {
            id: 'agent_005',
            name: '📋 작업 관리자',
            description: '일정 관리 및 업무 효율성 향상',
            owner: {
                name: '정효율',
                email: 'jung.efficiency@biz.com',
                plan: 'standard'
            },
            type: 'task',
            model: 'claude-3',
            status: 'paused',
            created: '2024-06-12T13:20:00Z',
            lastActive: '2024-06-25T09:30:00Z',
            stats: {
                conversations: 678,
                tokens: 234567,
                cost: 28.90,
                uptime: 95.3
            },
            config: {
                temperature: 0.5,
                maxTokens: 2048,
                systemPrompt: '체계적이고 효율적인 업무 관리를 지원합니다.',
                functions: ['task_scheduling', 'reminder', 'productivity_tracking']
            }
        },
        {
            id: 'agent_006',
            name: '🔍 리서치 전문가',
            description: '정보 수집 및 연구 지원',
            owner: {
                name: '윤리서치',
                email: 'yoon.research@academia.edu',
                plan: 'premium'
            },
            type: 'analysis',
            model: 'gpt-4',
            status: 'error',
            created: '2024-06-18T10:00:00Z',
            lastActive: '2024-06-26T08:15:00Z',
            stats: {
                conversations: 345,
                tokens: 456789,
                cost: 45.67,
                uptime: 87.2
            },
            config: {
                temperature: 0.4,
                maxTokens: 4096,
                systemPrompt: '정확하고 신뢰할 수 있는 정보를 제공합니다.',
                functions: ['web_research', 'fact_checking', 'citation_management']
            }
        }
    ];

    const totalAgents = agents.length;
    const activeAgents = agents.filter(a => a.status === 'active' || a.status === 'running').length;
    const runningAgents = agents.filter(a => a.status === 'running').length;
    const totalConversations = agents.reduce((sum, a) => sum + a.stats.conversations, 0);
    const totalCost = agents.reduce((sum, a) => sum + a.stats.cost, 0);
    const errorAgents = agents.filter(a => a.status === 'error').length;



    const [currentFilters, setcurrentFilters] = useState({
        status: 'all',
        type: 'all',
        model: 'all',
        user: 'all',
        search: ''
    });
    const [sortBy, setsortBy] = useState('created');
    const [sortOrder, setsortOrder] = useState('desc');
    const [currentView, setcurrentView] = useState('grid');
    const detailPanelOpen = false;
    const selectedAgent = null;

    const filteredAgents = agents.filter(agent => {
        const matchesSearch = !currentFilters.search ||
            agent.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            agent.description.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            agent.owner.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            agent.owner.email.toLowerCase().includes(currentFilters.search.toLowerCase());

        const matchesStatus = currentFilters.status === 'all' || agent.status === currentFilters.status;
        const matchesType = currentFilters.type === 'all' || agent.type === currentFilters.type;
        const matchesModel = currentFilters.model === 'all' || agent.model === currentFilters.model;
        const matchesPlan = currentFilters.user === 'all' || agent.owner.plan === currentFilters.user;

        return matchesSearch && matchesStatus && matchesType && matchesModel && matchesPlan;

    }).sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (sortBy === 'created' || sortBy === 'lastActive') {
            valA = new Date(valA);
            valB = new Date(valB);
        }

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;

    });





    return (
        <>
            <div className="page-container">
                {/* 페이지 헤더  */}
                <div className="page-header">
                    <div className="header-top">
                        <div className="header-info">
                            <h1 className="page-title">에이전트 관리</h1>
                            <p className="page-subtitle">사용자가 생성한 AI 에이전트를 모니터링하고 관리하세요</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" id="refresh-agents">
                                🔄 새로고침
                            </button>
                            <button className="btn btn-secondary" id="export-data">
                                📤 데이터 내보내기
                            </button>
                            <button className="btn btn-primary" id="agent-analytics">
                                📊 분석 보기
                            </button>
                        </div>
                    </div>
                </div>

                {/* 에이전트 통계 */}
                <div className="agent-stats">
                    <div className="stat-card">
                        <div className="stat-icon agents-total">🤖</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-agents">{totalAgents}</div>
                            <div className="stat-label">총 에이전트</div>
                            <div className="stat-change positive">+127개 이번 주</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon agents-active">⚡</div>
                        <div className="stat-content">
                            <div className="stat-value" id="active-agents">{activeAgents}</div>
                            <div className="stat-label">활성 에이전트</div>
                            <div className="stat-change positive">52.4% 가동률</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon agents-running">🔥</div>
                        <div className="stat-content">
                            <div className="stat-value" id="running-agents">{runningAgents}</div>
                            <div className="stat-label">실행 중</div>
                            <div className="stat-change positive">실시간</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon agents-usage">💬</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-conversations">{totalConversations}</div>
                            <div className="stat-label">오늘 대화</div>
                            <div className="stat-change positive">+24% 증가</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon agents-cost">💰</div>
                        <div className="stat-content">
                            <div className="stat-value" id="agents-cost">${totalCost.toFixed(2)}</div>
                            <div className="stat-label">오늘 사용 비용</div>
                            <div className="stat-change neutral">평균 $2.07/에이전트</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon agents-errors">⚠️</div>
                        <div className="stat-content">
                            <div className="stat-value" id="error-agents">{errorAgents}</div>
                            <div className="stat-label">오류 상태</div>
                            <div className="stat-change negative">0.8% 오류율</div>
                        </div>
                    </div>
                </div>

                {/* 에이전트 필터 및 검색 */}
                <div className="agents-toolbar">
                    <div className="toolbar-left">
                        <div className="search-box">
                            <input type="text" id="agent-search" placeholder="에이전트 검색..." className="search-input" value={currentFilters.search}
                                onChange={(e) =>
                                    setcurrentFilters((prev) => ({
                                        ...prev,
                                        search: e.target.value
                                    }))
                                }
                            />
                            <div className="search-icon">🔍</div>
                        </div>

                        <div className="filter-group">
                            <select id="status-filter" className="filter-select" value={currentFilters.status}
                                onChange={(e) =>
                                    setcurrentFilters((prev) => ({
                                        ...prev,
                                        status: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 상태</option>
                                <option value="active">활성</option>
                                <option value="inactive">비활성</option>
                                <option value="running">실행중</option>
                                <option value="error">오류</option>
                                <option value="paused">일시정지</option>
                            </select>

                            <select id="type-filter" className="filter-select" value={currentFilters.type}
                                onChange={(e) =>
                                    setcurrentFilters((prev) => ({
                                        ...prev,
                                        type: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 유형</option>
                                <option value="chat">대화형</option>
                                <option value="task">작업형</option>
                                <option value="analysis">분석형</option>
                                <option value="creative">창작형</option>
                                <option value="code">코딩형</option>
                            </select>

                            <select id="model-filter" className="filter-select" value={currentFilters.model}
                                onChange={(e) =>
                                    setcurrentFilters((prev) => ({
                                        ...prev,
                                        model: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 모델</option>
                                <option value="gpt-4">GPT-4</option>
                                <option value="claude-3">Claude-3</option>
                                <option value="gemini">Gemini</option>
                                <option value="custom">커스텀</option>
                            </select>

                            <select id="user-filter" className="filter-select" value={currentFilters.user}
                                onChange={(e) =>
                                    setcurrentFilters((prev) => ({
                                        ...prev,
                                        user: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 사용자</option>
                                <option value="premium">프리미엄</option>
                                <option value="standard">스탠다드</option>
                                <option value="free">무료</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div className="sort-controls">
                            <select id="sort-by" className="sort-select" value={sortBy}
                                onChange={(e) => setsortBy(e.target.value)}
                            >
                                <option value="created">생성일</option>
                                <option value="name">이름</option>
                                <option value="usage">사용량</option>
                                <option value="cost">비용</option>
                                <option value="conversations">대화 수</option>
                                <option value="lastActive">마지막 활동</option>
                            </select>
                            <button className="sort-order-btn" id="sort-order"
                                onClick={() => setsortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}>
                                <span id="sort-icon">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            </button>

                        </div>

                        <div className="view-toggle">
                            <button className="view-btn active" data-view="grid">⊞</button>
                            <button className="view-btn" data-view="list">📋</button>
                        </div>
                    </div>
                </div>

                {/* 에이전트 목록 */}
                <div className="agents-container">
                    {/* 그리드 뷰 */}
                    <div className="agents-grid-view active" id="agents-grid">
                        {/* 에이전트 카드들이 여기에 동적으로 추가됩니다 */}
                        {<RenderGridView filteredAgents={filteredAgents} />}
                    </div>

                    {/* 리스트 뷰 */}
                    <div className="agents-list-view" id="agents-list">
                        <div className="table-container">
                            <table className="agents-table">
                                <thead>
                                    <tr>
                                        <th>에이전트</th>
                                        <th>소유자</th>
                                        <th>유형</th>
                                        <th>모델</th>
                                        <th>상태</th>
                                        <th>대화 수</th>
                                        <th>토큰 사용</th>
                                        <th>비용</th>
                                        <th>마지막 활동</th>
                                        <th>액션</th>
                                    </tr>
                                </thead>
                                <tbody id="agents-tbody">
                                    {/* 에이전트 데이터가 여기에 동적으로 추가됩니다 */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 에이전트 상세 패널 */}
                <div className="agent-detail-panel" id="detail-panel" style={{ display: 'none' }}>
                    <div className="detail-header">
                        <h3>에이전트 상세 정보</h3>
                        <button className="close-panel-btn" id="close-detail">✕</button>
                    </div>
                    <div className="detail-content" id="detail-content">
                        {/* 상세 내용이 여기에 동적으로 로드됩니다 */}
                    </div>
                </div>
            </div >

        </>
    );
}

function RenderGridView({ filteredAgents }) {
    return (
        <>
            {!filteredAgents && (
                <div className="empty-state">
                    <div className="empty-icon">🤖</div>
                    <h3>에이전트가 없습니다</h3>
                    <p>필터 조건을 변경하거나 새로운 에이전트 생성을 기다려보세요.</p>
                </div>
            )}

            {filteredAgents.map(agent => (
                <div className={`agent-card status-${agent.status}`} key={agent.id}>
                    <div className="agent-card-header">
                        <div className="agent-info">
                            <div className={`agent-avatar type-${agent.type}`}>
                                {getTypeIcon(agent.type)}
                            </div>
                            <div className="agent-details">
                                <div className="agent-name">{agent.name}</div>
                                <div className="agent-owner">{agent.owner.name}</div>
                            </div>
                        </div>
                        <div className="agent-status-indicator">
                            <div className={`status-dot ${agent.status}`}></div>
                            <div className={`status-text ${agent.status}`}>{getStatusText(agent.status)}</div>
                        </div>
                    </div>

                    <div className="agent-meta">
                        <div className="meta-item">
                            <span className="meta-label">대화 수</span>
                            <span className="meta-value">{formatNumber(agent.stats.conversations)}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">토큰 사용</span>
                            <span className="meta-value">{formatNumber(agent.stats.tokens)}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">비용</span>
                            <span className="meta-value">${agent.stats.cost}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">가동률</span>
                            <span className="meta-value">{agent.stats.uptime}%</span>
                        </div>
                    </div>

                    <div className="agent-config">
                        <div className="config-item">
                            <span className="config-label">모델</span>
                            <span className="config-value">
                                <span className="model-tag">{agent.model}</span>
                            </span>
                        </div>
                        <div className="config-item">
                            <span className="config-label">마지막 활동</span>
                            <span className="config-value">{formatDate(agent.lastActive)}</span>
                        </div>
                    </div>

                    <div className="agent-actions">
                        <button className="action-btn view"
                        // onclick="agentManager.showAgentDetail('${agent.id}')"
                        >
                            👁️ 보기
                        </button>
                        <button className="action-btn pause"
                        // onclick="agentManager.toggleAgent('${agent.id}')"
                        >
                            {agent.status === 'running' ? '⏸️ 정지' : '▶️ 시작'}
                        </button>
                        <button className="action-btn delete"
                        // onclick="agentManager.deleteAgent('${agent.id}')"
                        >
                            🗑️ 삭제
                        </button>
                    </div>
                </div>
            ))}

        </>
    );
}

function getStatusText(status) {
    const texts = {
        active: '활성',
        inactive: '비활성',
        running: '실행중',
        paused: '일시정지',
        error: '오류'
    };
    return texts[status] || '알 수 없음';
}

function getTypeIcon(type) {
    const icons = {
        chat: '💬',
        task: '📋',
        analysis: '📊',
        creative: '🎨',
        code: '💻'
    };
    return icons[type] || '🤖';
}

function formatNumber(num) {
    return new Intl.NumberFormat('ko-KR').format(num);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
        return '방금 전';
    } else if (diffHours < 24) {
        return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
        return `${diffDays}일 전`;
    } else {
        return date.toLocaleDateString('ko-KR');
    }
}