'use client';
import { useState, useEffect, useRef } from 'react';
import "@/styles/history.css"

export default function History({ onMenuClick }) {


    const historyData = [
        {
            id: "hist-001",
            type: "agent",
            title: "Q4 매출 데이터 심화 분석",
            labels: [
                { type: "agent", icon: "🤖", text: "멀티에이전트" },
                { type: "project", icon: "📊", text: "파일분석하기" }
            ],
            time: "2시간 전",
            content:
                "Q4 매출 데이터를 종합적으로 분석하여 트렌드 파악, 성장률 계산, 경쟁사 비교 분석을 수행했습니다. 리서치 에이전트가 외부 데이터를 수집하고, 분석 에이전트가 데이터 처리 및 인사이트 도출했습니다.",
            participantsLabel: "참여 에이전트",
            participants: [
                { type: "agent", icon: "🔍", name: "리서치 에이전트" },
                { type: "agent", icon: "📊", name: "분석 에이전트" },
                { type: "agent", icon: "📈", name: "시각화 에이전트" }
            ],
            stats: [
                { icon: "💰", value: "$2.84" },
                { icon: "⚡", value: "3,247 토큰" }
            ]
        },
        {
            id: "hist-002",
            type: "llm",
            title: "이미지 파일 메타데이터 추출",
            labels: [
                { type: "llm", icon: "🧠", text: "단일 LLM" },
                { type: "project", icon: "📁", text: "파일업로드 test" }
            ],
            time: "30분 전",
            content:
                "업로드된 이미지 파일들의 메타데이터를 추출하고 분석하는 작업을 수행했습니다. EXIF 데이터, 파일 크기, 해상도, 촬영 정보 등을 체계적으로 정리했습니다.",
            participantsLabel: "사용 모델",
            participants: [{ type: "llm", icon: "🧠", name: "Claude Sonnet" }],
            stats: [
                { icon: "💰", value: "$0.89" },
                { icon: "⚡", value: "1,247 토큰" }
            ]
        },
        {
            id: "hist-003",
            type: "agent",
            title: "사업계획서 초안 협업 작성",
            labels: [
                { type: "agent", icon: "🤖", text: "멀티에이전트" },
                { type: "project", icon: "📝", text: "사업계획서 작성" }
            ],
            time: "1시간 전",
            content:
                "AI 기반 사업계획서 작성을 위한 협업 세션을 진행했습니다. 리서치 에이전트가 시장 조사 및 경쟁사 분석을 수행하고, 글쓰기 에이전트가 구조화된 문서 작성을 담당했습니다.",
            participantsLabel: "참여 에이전트",
            participants: [
                { type: "agent", icon: "🔍", name: "리서치 에이전트" },
                { type: "agent", icon: "✍️", name: "글쓰기 에이전트" }
            ],
            stats: [
                { icon: "💰", value: "$4.12" },
                { icon: "⚡", value: "5,234 토큰" }
            ]
        }
    ]

    const [currentFilters, setcurrentFilters] = useState({
        project: 'all',
        type: 'all',
        startDate: null,
        endDate: null,
        search: '',
        sort: 'newest'
    });

    const filteredHistoryData = historyData.filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(currentFilters.search.toLowerCase());
        const matchesType = currentFilters.type === 'all' || p.type === currentFilters.type;
        const matchesProject = currentFilters.project === 'all' || p.project === currentFilters.project;

        return matchesSearch && matchesType && matchesProject;
    });







    return (
        <>
            <div className="history_container">
                <div className="header">
                    <div className="header-title">
                        <div>
                            <h1 className="page-title">히스토리</h1>
                            <p className="page-subtitle">프로젝트별 AI 작업 기록 및 분석</p>
                        </div>
                        <div className="header-controls">
                            <button className="primary-btn"
                            // onclick="exportAllHistory()"
                            >
                                <span>📥</span>
                                <span>전체 내보내기</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 통계 대시보드 */}
                <div className="history-stats">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>📊</div>
                        <div className="stat-content">
                            <div className="stat-value">156</div>
                            <div className="stat-label">총 대화 세션</div>
                            <div className="stat-trend positive">↗ +23% 이번 주</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: "linear-gradient(135deg, #9333ea, #7c3aed)" }}>🤖</div>
                        <div className="stat-content">
                            <div className="stat-value">94</div>
                            <div className="stat-label">멀티 에이전트</div>
                            <div className="stat-trend positive">↗ 60.3% 비율</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)" }}>🧠</div>
                        <div className="stat-content">
                            <div className="stat-value">62</div>
                            <div className="stat-label">단일 LLM</div>
                            <div className="stat-trend negative">↘ 39.7% 비율</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: "linear-gradient(135deg, #16a34a, #059669)" }}>💰</div>
                        <div className="stat-content">
                            <div className="stat-value">$247.80</div>
                            <div className="stat-label">총 비용</div>
                            <div className="stat-trend positive">↗ 평균 $1.59/세션</div>
                        </div>
                    </div>
                </div>

                {/* 스마트 필터 시스템 */}
                <div className="smart-filters">
                    <div className="filter-header">
                        <h3 className="filter-title">스마트 필터</h3>
                        <button className="clear-all-btn"
                        // onclick="clearAllFilters()"
                        >
                            🗑️ 필터 초기화
                        </button>
                    </div>

                    <div className="main-filter-row">
                        <div className="search-box">
                            <span className="search-icon">🔍</span>
                            <input type="text" placeholder="대화 내용, 프로젝트, 에이전트 검색..." className="search-input" id="historySearch" />
                        </div>

                        <div className="conversation-type-toggle">
                            <button
                                className={`type-toggle-btn ${currentFilters.type === "all" ? "active" : ""}`}
                                data-type="all"
                                onClick={(e) => {
                                    const typeValue = e.currentTarget.dataset.type;
                                    setcurrentFilters((prev) => ({
                                        ...prev,
                                        type: typeValue
                                    }));
                                }}
                            >
                                <span>💬</span>
                                <span>전체</span>
                            </button>
                            <button className={`type-toggle-btn ${currentFilters.type === "agent" ? "active" : ""}`}
                                data-type="agent"
                                onClick={(e) => {
                                    const typeValue = e.currentTarget.dataset.type;
                                    setcurrentFilters((prev) => ({
                                        ...prev,
                                        type: typeValue
                                    }));
                                }}
                            >
                                <span>🤖</span>
                                <span>멀티에이전트</span>
                            </button>
                            <button className={`type-toggle-btn ${currentFilters.type === "llm" ? "active" : ""}`}
                                data-type="llm"
                                onClick={(e) => {
                                    const typeValue = e.currentTarget.dataset.type;
                                    setcurrentFilters((prev) => ({
                                        ...prev,
                                        type: typeValue
                                    }));
                                }}
                            >
                                <span>🧠</span>
                                <span>단일 LLM</span>
                            </button>
                        </div>

                        <div className="project-selector">
                            <select className="project-dropdown" id="projectSelect" value={filteredHistoryData.project}
                                onChange={(e) =>
                                    setcurrentFilters((prev) => ({
                                        ...prev,
                                        project: e.target.value
                                    }))
                                }
                            >
                                <option value="all">📋 모든 프로젝트</option>
                                <option value="파일분석하기">📊 파일분석하기 (67건)</option>
                                <option value="파일업로드 test">📁 파일업로드 test (32건)</option>
                                <option value="사업계획서 작성">📝 사업계획서 작성 (18건)</option>
                                <option value="데이터 시각화">📈 데이터 시각화 (15건)</option>
                                <option value="문서 요약">📄 문서 요약 (12건)</option>
                                <option value="코드 리뷰">💻 코드 리뷰 (8건)</option>
                                <option value="기타">⚡ 기타 (4건)</option>
                            </select>
                        </div>
                    </div>

                    <div className="compact-filters">
                        <div className="date-range">
                            <span>📅</span>
                            <input type="date" className="date-input" id="startDate" />
                            <span>~</span>
                            <input type="date" className="date-input" id="endDate" />
                        </div>

                        <select className="sort-select" id="sortSelect">
                            <option value="newest">📅 최신순</option>
                            <option value="oldest">📅 오래된순</option>
                            <option value="project">📁 프로젝트별</option>
                            <option value="cost">💰 비용순</option>
                            <option value="tokens">⚡ 토큰순</option>
                        </select>
                    </div>

                    <div className="active-filters" id="activeFilters">
                        <div className="active-filters-label">활성 필터</div>
                        <div className="active-filter-tags" id="activeFilterTags">
                            {/* 활성 필터들이 여기에 동적으로 표시됩니다 */}
                        </div>
                    </div>
                </div>

                {/* 히스토리 목록 */}
                <div className="history-timeline" id="historyTimeline">
                    {filteredHistoryData.map((item) => (
                        <div
                            key={item.id}
                            className={`history-item ${item.type === "agent" ? "agent-conversation" : "llm-conversation"
                                }`}
                        >
                            <div className="history-actions">
                                <button
                                    className="history-action-btn"
                                    title="대화 이어가기"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Resume", item.id);
                                    }}
                                >
                                    💬
                                </button>
                                <button
                                    className="history-action-btn"
                                    title="내보내기"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Export", item.id);
                                    }}
                                >
                                    📤
                                </button>
                                <button
                                    className="history-action-btn"
                                    title="삭제"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Delete", item.id);
                                    }}
                                >
                                    🗑️
                                </button>
                            </div>

                            <div className="history-item-header">
                                <div>
                                    <h3 className="history-item-title">{item.title}</h3>
                                    <div className="history-item-labels">
                                        {item.labels.map((label, idx) => (
                                            <div
                                                key={idx}
                                                className={
                                                    label.type === "agent"
                                                        ? "conversation-type-label agent"
                                                        : label.type === "llm"
                                                            ? "conversation-type-label llm"
                                                            : "project-label"
                                                }
                                            >
                                                {label.icon} {label.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="history-item-time">{item.time}</div>
                            </div>

                            <div className="history-item-content">{item.content}</div>

                            <div className="conversation-participants">
                                <div className="participants-label">{item.participantsLabel}</div>
                                <div className="participants-list">
                                    {item.participants.map((p, idx) => (
                                        <div
                                            key={idx}
                                            className={
                                                p.type === "agent"
                                                    ? "participant-tag agent"
                                                    : "participant-tag llm"
                                            }
                                        >
                                            {p.icon} {p.name}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="history-item-meta">
                                {item.stats.map((stat, idx) => (
                                    <div key={idx} className="history-stat">
                                        <span>{stat.icon}</span>
                                        <span>{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 페이지네이션 */}
                <div className="pagination">
                    <button className="pagination-btn"
                    // onclick="goToPage(1)"
                    >« 이전</button>
                    <button className="pagination-btn active"
                    // onclick="goToPage(1)"
                    >1</button>
                    <button className="pagination-btn"
                    // onclick="goToPage(2)"
                    >2</button>
                    <button className="pagination-btn"
                    // onclick="goToPage(3)"
                    >3</button>
                    <button className="pagination-btn"
                    // onclick="goToPage(4)"
                    >4</button>
                    <button className="pagination-btn"
                    // onclick="goToPage(5)"
                    >5</button>
                    <button className="pagination-btn"
                    // onclick="goToPage(6)"
                    >다음 »</button>
                </div>
            </div >

        </>
    );
}

