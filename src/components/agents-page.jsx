'use client';
import { useState, useEffect } from 'react';
import { modalheader } from '@/utill/utill';

export default function AgentsPage() {

    const [Agents, setAgents] = useState([
        {
            id: 'agent-001',
            name: '리서치 에이전트',
            type: 'researcher',
            avatar: '🔍',
            description: '웹 검색, 논문 분석, 데이터 수집을 전문으로 하는 에이전트입니다.',
            status: 'active',
            model: 'claude-3.5-sonnet',
            capabilities: ['웹 검색', '논문 분석', '데이터 수집', '정보 요약'],
            stats: {
                tasksCompleted: 156,
                successRate: 94.2
            },
            settings: {
                maxTokens: 4000,
                temperature: 0.3,
                searchDepth: 'deep'
            },
            createdAt: '2024-11-01T10:00:00Z',
            lastActive: '2024-11-20T15:30:00Z'
        },
        {
            id: 'agent-002',
            name: '코딩 에이전트',
            type: 'coder',
            avatar: '💻',
            description: '코드 생성, 리뷰, 디버깅, 테스트를 담당하는 개발 전문 에이전트입니다.',
            status: 'active',
            model: 'claude-3.5-sonnet',
            capabilities: ['코드 생성', '코드 리뷰', '디버깅', '테스트 작성', '최적화'],
            stats: {
                tasksCompleted: 89,
                successRate: 97.8
            },
            settings: {
                maxTokens: 8000,
                temperature: 0.1,
                codeStyle: 'clean'
            },
            createdAt: '2024-11-03T14:00:00Z',
            lastActive: '2024-11-20T16:45:00Z'
        },
        {
            id: 'agent-003',
            name: '분석 에이전트',
            type: 'analyst',
            avatar: '📊',
            description: '데이터 분석, 시각화, 인사이트 도출을 전문으로 하는 에이전트입니다.',
            status: 'active',
            model: 'gpt-4',
            capabilities: ['데이터 분석', '시각화', '통계 분석', '보고서 작성'],
            stats: {
                tasksCompleted: 67,
                successRate: 92.5
            },
            settings: {
                maxTokens: 6000,
                temperature: 0.2,
                chartType: 'interactive'
            },
            createdAt: '2024-11-05T09:30:00Z',
            lastActive: '2024-11-20T14:20:00Z'
        },
        {
            id: 'agent-004',
            name: '글쓰기 에이전트',
            type: 'writer',
            avatar: '✍️',
            description: '창의적 글쓰기, 문서 작성, 콘텐츠 제작을 담당하는 에이전트입니다.',
            status: 'inactive',
            model: 'claude-3-haiku',
            capabilities: ['창의적 글쓰기', '문서 작성', '번역', '편집'],
            stats: {
                tasksCompleted: 234,
                successRate: 89.7
            },
            settings: {
                maxTokens: 5000,
                temperature: 0.7,
                writingStyle: 'creative'
            },
            createdAt: '2024-10-28T11:15:00Z',
            lastActive: '2024-11-18T10:30:00Z'
        }

    ])


    const [statusFilter, setStatusFilter] = useState('all');

    const filteredAgent = Agents.filter((A) => {
        const matchesStatus = statusFilter === 'all' || A.status === statusFilter;
        return matchesStatus;
    });

    const [newAgent, setnewAgnet] = useState(false);


    return (
        <div className="app-container">
            <div className="container">

                <div className="header">
                    <div className="header-title">
                        <div>
                            <h1 className="page-title">AI Agent 관리</h1>
                            <p className="page-subtitle">AI 에이전트를 생성하고 관리하세요</p>
                        </div>
                        <div className="header-controls">
                            <div className="status-badge status-active">
                                <span>🤖</span>
                                <span id="active-agents-count">3개 에이전트 활성</span>
                            </div>
                            <button
                                className="action-btn"
                                onClick={() => setnewAgnet(true)}
                            // onClick="AgentManager.createNewAgent()"
                            >
                                <span>➕</span>
                                <span>새 에이전트</span>
                            </button>
                        </div>
                    </div>
                </div>


                <div className={`modal-overlay ${newAgent ? 'active' : ''}`}>
                    <NewAgentform setnewAgnet={setnewAgnet} />
                </div>
                {/* {newAgent && (<NewAgentform setnewAgnet={setnewAgnet} />)} */}

                <div className="search-section">
                    <div className="search-filter-top">
                        <div className="search-box">
                            <span className="search-icon">🔍</span>
                            <input type="text" placeholder="에이전트 검색..." className="search-input" />
                        </div>

                        <div className="filter-buttons">
                            <button
                                className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
                                data-filter="all"
                                onClick={() => setStatusFilter("all")}
                            >
                                전체
                            </button>
                            <button
                                className={`filter-btn ${statusFilter === "active" ? "active" : ""}`}
                                data-filter="active"
                                onClick={() => setStatusFilter("active")}
                            >
                                활성
                            </button>
                            <button
                                className={`filter-btn ${statusFilter === "inactive" ? "active" : ""}`}
                                data-filter="inactive"
                                onClick={() => setStatusFilter("inactive")}
                            >
                                비활성
                            </button>
                        </div>
                    </div>
                </div>

                <div className="content-grid" id="agents-grid">

                    {filteredAgent.map((agent) => (
                        <AgentCard
                            key={agent.id}
                            agent={agent}
                        // onToggle={(id) => console.log("toggle", id)} // 또는 실제 기능
                        // onOpenSettings={(id) => console.log("settings", id)}
                        // onShowMenu={(id) => console.log("menu", id)}
                        />
                    ))}

                </div>




            </div>
        </div>
    );
}

function NewAgentform({ setnewAgnet }) {
    return (
        <>
            {/* <div className="modal-overlay active"> */}
            <div className="modal">
                {modalheader({ headerTitle: "새 AI 에이전트 생성", setModalClose: setnewAgnet })}

                <div className="modal-body">

                    <form id="new-agent-form">
                        <div className="form-group">
                            <label className="form-label">에이전트 이름</label>
                            <input type="text" className="form-input" name="name" required placeholder="예: 번역 에이전트" />
                        </div>

                        <div className="form-group">
                            <label className="form-label">에이전트 타입</label>
                            <select className="form-input form-select" name="type" required>
                                <option value="">타입 선택</option>
                                <option value="researcher">리서치 전문가</option>
                                <option value="coder">개발 전문가</option>
                                <option value="analyst">분석 전문가</option>
                                <option value="writer">글쓰기 전문가</option>
                                <option value="translator">번역 전문가</option>
                                <option value="assistant">일반 어시스턴트</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">설명</label>
                            <textarea className="form-input form-textarea" name="description" required placeholder="이 에이전트가 수행할 작업을 설명해주세요."></textarea>
                        </div>

                        <div className="form-group">
                            <label className="form-label">사용할 모델</label>
                            <select className="form-input form-select" name="model" required>
                                <option value="claude-3.5-sonnet">Claude 3.5 Sonnet (추천)</option>
                                <option value="claude-3-haiku">Claude 3 Haiku (빠름)</option>
                                <option value="gpt-4">GPT-4</option>
                                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                            </select>
                        </div>
                    </form>

                </div>


                <div className="modal-footer">
                    <button type="button" className="secondary-btn" onClick={() => setnewAgnet(false)}>취소</button>
                    <button type="button" className="primary-btn"
                    // onClick="ProjectManager.saveNewProject()"
                    >생성</button>
                </div>


            </div>
            {/* </div> */}

        </>
    );
}

function AgentCard({ agent }) {
    const statusClass = agent.status === 'active' ? 'status-active-pill' : 'status-paused';
    const statusText = agent.status === 'active' ? '활성' : '비활성';

    const getTypeLabel = (type) => {
        switch (type) {
            case 'researcher': return '리서치 전문가';
            case 'coder': return '개발 전문가';
            case 'analyst': return '분석 전문가';
            case 'writer': return '글쓰기 전문가';
            default: return '기타';
        }
    };

    const [onEdit, setonEdit] = useState(false);

    return (
        <>
            <div className={`agent-card ${agent.status}`} data-agent-id={agent.id}>
                <div className="agent-header">
                    <div className={`status-pill ${statusClass}`}>{statusText}</div>
                    <button className="item-menu-btn" onClick={() => onShowMenu(agent.id)}>⋯</button>
                </div>

                <div className={`agent-avatar ${agent.type}`}>
                    {agent.avatar}
                </div>

                <h3 className="agent-title">{agent.name}</h3>
                <p className="agent-type">{getTypeLabel(agent.type)}</p>
                <p className="agent-description">{agent.description}</p>

                <div className="agent-stats">
                    <div className="agent-stat">
                        <div className="agent-stat-value">{agent.stats.tasksCompleted}</div>
                        <div className="agent-stat-label">완료된 작업</div>
                    </div>
                    <div className="agent-stat">
                        <div className="agent-stat-value">{agent.stats.successRate}%</div>
                        <div className="agent-stat-label">성공률</div>
                    </div>
                </div>

                <div className="agent-capabilities">
                    <div className="capability-list">
                        {agent.capabilities.map((cap, idx) => (
                            <span className="capability-tag" key={idx}>{cap}</span>
                        ))}
                    </div>
                </div>

                <div className="agent-controls">
                    <button className={`agent-toggle ${agent.status}`} onClick={() => onToggle(agent.id)}>
                        <span>{agent.status === 'active' ? '⏸️' : '▶️'}</span>
                        <span>{agent.status === 'active' ? '일시정지' : '활성화'}</span>
                    </button>
                    <button className="agent-settings"
                        onClick={() => setonEdit(true)}
                    >⚙️</button>
                </div>
            </div>

            <div className={`modal-overlay ${onEdit ? 'active' : ''}`}>
                <OpenAgentSettings agent={agent} setonEdit={setonEdit} />
            </div>
            {/* {onEdit && (<OpenAgentSettings agent={agent} setonEdit={setonEdit} />)} */}

        </>
    );
}

function OpenAgentSettings({ agent, setonEdit }) {
    const [formData, setFormData] = useState(agent);
    return (
        // <div className="modal-overlay active">
        <div className="modal">
            {modalheader({ headerTitle: `${agent.name} 설정`, setModalClose: setonEdit })}


            <div className="modal-body">
                <form id="agent-settings-form">
                    <div className="form-group">
                        <label className="form-label">에이전트 이름</label>
                        <input type="text" className="form-input" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">설명</label>
                        <textarea className="form-input form-textarea" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">모델</label>
                        <select className="form-input form-select" name="model" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })}>
                            <option value="claude-3.5-sonnet" >Claude 3.5 Sonnet</option>
                            <option value="claude-3-haiku" >Claude 3 Haiku</option>
                            <option value="gpt-4">GPT-4</option>
                            <option value="gpt-3.5-turbo" >GPT-3.5 Turbo</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">최대 토큰 수</label>
                        <input type="number" className="form-input" name="maxTokens" value={formData.settings.maxTokens} min="100" max="32000"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    settings: {
                                        ...formData.settings,
                                        maxTokens: Number(e.target.value) // 숫자 변환도 권장
                                    }
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Temperature (창의성)</label>
                        <input type="range" className="form-input" name="temperature" value={formData.settings.temperature} min="0" max="1" step="0.1"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    settings: {
                                        ...formData.settings,
                                        temperature: Number(e.target.value) // 숫자 변환도 권장
                                    }
                                })
                            }
                        />
                        <small style={{ color: "var(--gray-500)" }}>현재 값: {formData.settings.temperature}</small>
                    </div>
                </form>
            </div>

            <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setonEdit(false)}>취소</button>
                <button type="button" className="primary-btn"
                // onClick="AgentManager.saveAgentSettings('${agentId}')"
                >저장</button>
            </div>
        </div>
        // </div>
    );
}
