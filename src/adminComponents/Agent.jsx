'use client';

import "@/adminStyle/agents.css";

import { useState, useEffect } from 'react';

export default function Agents() {

    const metrics = [
        {
            type: "default",
            icon: "🤖",
            iconClass: "agents-total",
            change: "+2 신규",
            changeClass: "positive",
            value: "6",
            label: "이 에이전트",
        },
        {
            type: "warning",
            icon: "⚡",
            iconClass: "agents-active",
            change: "66.7%",
            changeClass: "positive",
            value: "4",
            label: "활성 에이전트",
        },
        {
            type: "info",
            icon: "💬",
            iconClass: "agents-running",
            change: "+18%",
            changeClass: "positive",
            value: "1,247",
            label: "이 사용 횟수",
        },
        {
            type: "danger",
            icon: "⚠️",
            iconClass: "agents-errors",
            change: "점검 필요",
            changeClass: "negative",
            value: "2",
            label: "비활성 에이전트",
        },
    ];

    const [agents, setagents] = useState([
        {
            id: "research",
            type: "research",
            avatar: "🔍",
            name: "리서치 에이전트",
            model: "Claude-3 Haiku",
            status: "active", // active | inactive
            description: "웹 검색, 자료 조사, 시장 분석 등 다양한 정보 수집과 연구 업무를 담당합니다.",
            features: ["웹 검색", "데이터 수집", "시장 분석", "보고서 작성"],
            meta: {
                usage: "347",
                success: "98.2%",
                response: "4.2s",
                lastUsed: "2분 전",
            },
            prompt: "You are a research assistant specialized in information gathering and analysis. Help users find accurate information and provide comprehensive research reports."
        },
        {
            id: "coding",
            type: "coding",
            avatar: "💻",
            name: "코딩 에이전트",
            model: "Claude-3 Sonnet",
            status: "active",
            description: "프로그래밍, 코드 리뷰, 디버깅, 시스템 설계 등 모든 개발 관련 업무를 처리합니다.",
            features: ["코드 작성", "디버깅", "리팩토링", "아키텍처"],
            meta: {
                usage: "523",
                success: "97.8%",
                response: "3.8s",
                lastUsed: "5분 전",
            },
            prompt: "You are an expert software developer. Help users with coding, debugging, code review, and software architecture design."
        },
        {
            id: "analysis",
            type: "analysis",
            avatar: "📊",
            name: "분석 에이전트",
            model: "Claude-3 Sonnet",
            status: "active",
            description: "데이터 분석, 통계 처리, 인사이트 도출 등 분석 업무를 전문으로 합니다.",
            features: ["데이터 분석", "통계 처리", "시각화", "예측 모델"],
            meta: {
                usage: "233",
                success: "97.8%",
                response: "5.1s",
                lastUsed: "1시간 전",
            },
            prompt: "You are a data analyst expert. Help users analyze data, perform statistical analysis, and derive meaningful insights."
        },
        {
            id: "writing",
            type: "writing",
            avatar: "✏️",
            name: "작성 에이전트",
            model: "Claude-3 Haiku",
            status: "inactive",
            description: "문서 작성, 콘텐츠 제작, 법적 고지 등 텍스트 관련 업무를 담당합니다.",
            features: ["문서 작성", "콘텐츠 제작", "번역", "교정"],
            meta: {
                usage: "89",
                success: "94.3%",
                response: "2.7s",
                lastUsed: "2일 전",
            },
            prompt: "You are a professional writer. Help users create various types of content including documents, articles, and creative writing."
        },
        {
            id: "creative",
            type: "creative",
            avatar: "🎨",
            name: "창작 에이전트",
            model: "Claude-3 Opus",
            status: "active",
            description: "창의적 아이디어 발굴, 브레인스토밍, 디자인 기획 등 창작 업무를 담당합니다.",
            features: ["아이디어 발굴", "브레인스토밍", "기획", "스토리텔링"],
            meta: {
                usage: "156",
                success: "95.5%",
                response: "6.2s",
                lastUsed: "30분 전",
            },
            prompt: "You are a creative assistant. Help users with brainstorming, creative ideation, and innovative problem-solving."
        },
        {
            id: "translation",
            type: "translation",
            avatar: "🌍",
            name: "번역 에이전트",
            model: "Claude-3 Sonnet",
            status: "inactive",
            description: "다국어 번역, 현지화, 문화적 맥락 고려 등 언어 관련 업무를 전문으로 합니다.",
            features: ["다국어 번역", "현지화", "문화 적응", "언어 교정"],
            meta: {
                usage: "67",
                success: "97.2%",
                response: "3.5s",
                lastUsed: "1일 전",
            },
            prompt: "You are a professional translator. Help users translate text between languages while considering cultural context and nuances."
        },
    ]);

    const [onEdit, setonEdit] = useState(false);
    const [onDelete, setonDelete] = useState(false);
    const [selectedAgent, setselectedAgent] = useState();


    return (
        <>
            <div className="page-container">

                <div id="editModal" className="agent-modal" style={{ display: `${onEdit === true ? "block" : "none"}` }}>
                    <AgentEdit agents={agents} setonEdit={setonEdit} selectedAgent={selectedAgent} />
                </div>

                <div id="deleteModal" className="delete-modal" style={{ display: `${onDelete === true ? "block" : "none"}` }}>
                    <AgentDelete setagents={setagents} agents={agents} setonDelete={setonDelete} selectedAgent={selectedAgent} />
                </div>


                {/* 페이지 헤더 */}
                <div className="page-header">
                    <h1 className="page-title">에이전트 관리</h1>
                    <p className="page-subtitle">시스템에서 사용되는 에이전트들을 관리하고 설정할 수 있습니다.</p>
                </div>

                {/* 통계 카드 */}
                <div className="agent-metrics-grid">
                    {metrics.map((m, idx) => (
                        <div
                            key={idx}
                            className={`agent-metric-card ${m.type !== "default" ? m.type : ""}`}
                        >
                            <div className="metric-header">
                                <div className={`metric-icon ${m.iconClass}`}>{m.icon}</div>
                                <div className={`metric-change ${m.changeClass}`}>{m.change}</div>
                            </div>
                            <div className="metric-value">{m.value}</div>
                            <div className="metric-label">{m.label}</div>
                        </div>
                    ))}
                </div>

                {/* 에이전트 툴바 */}
                <div className="agents-toolbar">
                    <div className="toolbar-left">
                        <div className="search-box">
                            <input type="text" className="search-input" placeholder="에이전트 이름 또는 기능으로 검색..." id="searchInput" />
                            <span className="search-icon">🔍</span>
                        </div>

                        <div className="filter-group">
                            <select className="filter-select" id="statusFilter">
                                <option value="all">전체 상태</option>
                                <option value="활성">활성</option>
                                <option value="비활성">비활성</option>
                            </select>

                            <select className="filter-select" id="modelFilter">
                                <option value="all">전체 모델</option>
                                <option value="claude-3-haiku">Claude-3 Haiku</option>
                                <option value="claude-3-sonnet">Claude-3 Sonnet</option>
                                <option value="claude-3-opus">Claude-3 Opus</option>
                            </select>

                            <select className="filter-select" id="sortBy">
                                <option value="name">이름순</option>
                                <option value="usage">사용량순</option>
                                <option value="success">성공률순</option>
                                <option value="response">응답속도순</option>
                                <option value="recent">최근 업데이트순</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div className="view-toggle">
                            <button className="view-btn active" >⋮⋮⋮</button>
                            <button className="view-btn">☰</button>
                        </div>

                        <button className="btn-add" >
                            <span>➕</span>
                            새 에이전트 추가
                        </button>
                    </div>
                </div>

                {/* 에이전트 그리드 */}
                <div className="agents-grid">
                    {agents.map((agent) => (
                        <div key={agent.id} className={`agent-card ${agent.type}`}>
                            <div className="agent-card-header">
                                <div className="agent-info">
                                    <div className={`agent-avatar ${agent.type}`}>{agent.avatar}</div>
                                    <div className="agent-details">
                                        <div className="agent-name">{agent.name}</div>
                                        <div className="agent-model">{agent.model}</div>
                                    </div>
                                </div>
                                <div className="agent-status-indicator">
                                    <div className={`status-dot ${agent.status}`}></div>
                                    <div className="status-text">
                                        {agent.status === "active" ? "활성" : "비활성"}
                                    </div>
                                </div>
                            </div>

                            <div className="agent-description">{agent.description}</div>

                            <div className="agent-features">
                                {agent.features.map((f, idx) => (
                                    <span key={idx} className="feature-tag">
                                        {f}
                                    </span>
                                ))}
                            </div>

                            <div className="agent-meta">
                                <div className="meta-item">
                                    <span className="meta-label">사용 횟수</span>
                                    <span className="meta-value">{agent.meta.usage}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">성공률</span>
                                    <span className="meta-value">{agent.meta.success}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">평균 응답</span>
                                    <span className="meta-value">{agent.meta.response}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">마지막 사용</span>
                                    <span className="meta-value">{agent.meta.lastUsed}</span>
                                </div>
                            </div>

                            <div className="agent-actions">
                                <button
                                    className="action-btn view"
                                    // onClick={() => editAgent(agent.id)}
                                    onClick={() => { setonEdit(true), setselectedAgent(agent.id) }}
                                >
                                    ⚙️ 설정
                                </button>
                                <button
                                    className="action-btn view"
                                    onClick={() => viewLogs(agent.id)}
                                >
                                    📊 로그
                                </button>
                                <button
                                    className="action-btn delete"
                                    // onClick={() => setselectedAgent(agent.id, agent.name)}
                                    onClick={() => { setonDelete(true), setselectedAgent(agent.id) }}
                                >
                                    🗑️ 삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    );
}

function AgentDelete({ setagents, agents, setonDelete, selectedAgent }) {
    const items = agents.find((a) => a.id === selectedAgent) || { name: "" };

    // 삭제 핸들러
    const handleDelete = () => {
        // agents 배열에서 선택된 에이전트 제외
        const updatedAgents = agents.filter((a) => a.id !== selectedAgent);
        setagents(updatedAgents);    // 상태 갱신
        setonDelete(false);          // 모달 닫기
        // 필요시 서버 API 호출해서 DB에서도 삭제 가능
        // 예: await deleteAgentAPI(selectedAgent)
    };

    return (
        <>
            <div className="delete-modal-content">
                <div className="delete-icon">🗑️</div>
                <h2 className="delete-title">에이전트 삭제</h2>
                <p className="delete-message">정말로 다음 에이전트를 삭제하시겠습니까?</p>
                <div className="delete-agent-name" id="deleteAgentName">{items.name}</div>
                <p style={{ color: "var(--gray-500)", fontSize: "14px", marginBottom: "24px" }}>
                    ⚠️ 이 작업은 되돌릴 수 없으며, 해당 에이전트의 모든 설정과 히스토리가 삭제됩니다.
                </p>
                <div className="delete-actions">
                    <button
                        className="btn-cancel"
                        onClick={() => setonDelete(false)}
                    >
                        취소
                    </button>
                    <button
                        className="btn-delete"
                        onClick={handleDelete}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </>
    );
}

function AgentEdit({ agents, setonEdit, selectedAgent }) {
    const items = agents.find((a) => a.id === selectedAgent) || { name: "" };
    const [formData, setFormData] = useState(items);

    useEffect(() => {
        if (items) {
            setFormData(items);
        }
    }, [selectedAgent]);

    return (
        <>
            {selectedAgent && (
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 id="modalTitle">{items.name} 설정</h2>
                        <span className="close" onClick={() => setonEdit(false)}>
                            &times;
                        </span>
                    </div>
                    <form id="agentForm">
                        <div className="form-group">
                            <label className="form-label" htmlFor="agentName">
                                에이전트 이름
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="agentName"
                                placeholder="에이전트 이름을 입력하세요"
                                value={formData?.name || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="agentModel">
                                모델 선택
                            </label>
                            <select className="form-control" id="agentModel" value={formData?.model || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        model: e.target.value,
                                    }))
                                }
                            >
                                <option value="Claude-3 Haiku">Claude-3 Haiku</option>
                                <option value="Claude-3 Sonnet">Claude-3 Sonnet</option>
                                <option value="Claude-3 Opus">Claude-3 Opus</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="agentDescription">
                                설명
                            </label>
                            <textarea
                                className="form-control"
                                id="agentDescription"
                                rows="3"
                                placeholder="에이전트의 역할과 기능을 설명해주세요"
                                value={formData?.description || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="systemPrompt">
                                시스템 프롬프트
                            </label>
                            <textarea
                                className="form-control"
                                id="systemPrompt"
                                rows="5"
                                placeholder="에이전트의 동작을 정의하는 시스템 프롬프트를 입력하세요"
                                value={formData?.prompt || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        prompt: e.target.value,
                                    }))
                                }
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label className="form-label">활성화 상태</label>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <label className="toggle-switch">
                                    <input type="checkbox" id="agentActive"
                                        checked={formData?.status === "active"}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                status: e.target.checked ? "active" : "inactive",
                                            }))
                                        }
                                    />
                                    <span className="slider"></span>
                                </label>
                                <span>에이전트 활성화</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="maxTokens">
                                최대 토큰 수
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="maxTokens"
                                placeholder="4000"
                                defaultValue="4000"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="temperature">
                                온도 설정
                            </label>
                            <input
                                type="range"
                                className="form-control"
                                id="temperature"
                                min="0"
                                max="1"
                                step="0.1"
                                defaultValue="0.7"
                            />
                            <small style={{ color: "var(--gray-500)" }}>
                                현재 값: <span id="tempValue">0.7</span>
                            </small>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "flex-end",
                                marginTop: "24px",
                            }}
                        >
                            <button type="button" className="btn btn-outline" onClick={() => setonEdit(false)}>
                                취소
                            </button>
                            <button type="submit" className="btn btn-primary">
                                저장
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
