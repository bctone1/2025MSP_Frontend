'use client';
import { useState, useEffect, useRef } from 'react';
import { formatDate, storage, formatFileSize, formatNumber, formatTimestamp } from '@/utill/utill';
import "@/styles/history.css"

export default function History({ onMenuClick }) {
    const [currentSort, setcurrentSort] = useState('newest');
    const [dateRange, setdateRange] = useState({
        start: null,
        end: null
    });
    const [searchQuery, setsearchQuery] = useState('');
    const [currentFilter, setcurrentFilter] = useState('all');

    const historyData = [
        {
            id: 'hist-001',
            title: 'React 컴포넌트 최적화 분석',
            type: 'analysis',
            timestamp: '2024-11-20T16:45:00Z',
            content: 'React 애플리케이션의 성능 병목점을 분석하고 최적화 방안을 제시했습니다.',
            agent: 'analyst-001',
            agentName: '분석 에이전트',
            project: 'proj-001',
            projectName: '파일분석하기',
            stats: {
                duration: '4분 32초',
                tokensUsed: 1847,
                cost: '$0.03',
                accuracy: 94.2
            },
            tags: ['React', '성능', '최적화', '분석'],
            status: 'completed'
        },
        {
            id: 'hist-002',
            title: '코드 리뷰 및 개선사항 제안',
            type: 'code-review',
            timestamp: '2024-11-20T15:30:00Z',
            content: 'JavaScript 코드의 품질을 검토하고 베스트 프랙티스에 따른 개선사항을 제안했습니다.',
            agent: 'coder-001',
            agentName: '코딩 에이전트',
            project: 'proj-002',
            projectName: '파일업로드 test',
            stats: {
                duration: '6분 15초',
                tokensUsed: 2341,
                cost: '$0.04',
                accuracy: 97.8
            },
            tags: ['JavaScript', '코드리뷰', '품질', '개선'],
            status: 'completed'
        },
        {
            id: 'hist-003',
            title: '시장 조사 보고서 작성',
            type: 'research',
            timestamp: '2024-11-20T14:20:00Z',
            content: 'AI 기술 시장의 최신 동향과 경쟁사 분석을 통한 종합 보고서를 작성했습니다.',
            agent: 'researcher-001',
            agentName: '리서치 에이전트',
            project: 'proj-003',
            projectName: '사업계획서 작성',
            stats: {
                duration: '12분 48초',
                tokensUsed: 4567,
                cost: '$0.08',
                accuracy: 91.5
            },
            tags: ['시장조사', '보고서', 'AI', '분석'],
            status: 'completed'
        },
        {
            id: 'hist-004',
            title: '데이터 시각화 차트 생성',
            type: 'visualization',
            timestamp: '2024-11-20T13:10:00Z',
            content: '매출 데이터를 기반으로 인터랙티브 차트와 대시보드를 생성했습니다.',
            agent: 'analyst-002',
            agentName: '분석 에이전트',
            project: 'proj-004',
            projectName: '데이터 시각화',
            stats: {
                duration: '8분 22초',
                tokensUsed: 3012,
                cost: '$0.05',
                accuracy: 96.1
            },
            tags: ['데이터', '시각화', '차트', '대시보드'],
            status: 'completed'
        },
        {
            id: 'hist-005',
            title: '문서 번역 및 교정',
            type: 'translation',
            timestamp: '2024-11-20T11:45:00Z',
            content: '기술 문서를 한국어에서 영어로 번역하고 자연스러운 표현으로 교정했습니다.',
            agent: 'writer-001',
            agentName: '글쓰기 에이전트',
            project: 'proj-005',
            projectName: '문서 번역',
            stats: {
                duration: '15분 31초',
                tokensUsed: 5234,
                cost: '$0.09',
                accuracy: 89.7
            },
            tags: ['번역', '교정', '문서', '영어'],
            status: 'completed'
        },
        {
            id: 'hist-006',
            title: '워크플로우 자동화 설정',
            type: 'automation',
            timestamp: '2024-11-20T10:30:00Z',
            content: '데이터 수집부터 분석까지의 전체 프로세스를 자동화하는 워크플로우를 구성했습니다.',
            agent: 'system',
            agentName: '시스템',
            project: 'proj-006',
            projectName: '자동화 프로젝트',
            stats: {
                duration: '3분 15초',
                tokensUsed: 892,
                cost: '$0.02',
                accuracy: 100
            },
            tags: ['워크플로우', '자동화', '프로세스'],
            status: 'running'
        }
    ]

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
                            <button className="type-toggle-btn active" data-type="all">
                                <span>💬</span>
                                <span>전체</span>
                            </button>
                            <button className="type-toggle-btn" data-type="agent">
                                <span>🤖</span>
                                <span>멀티에이전트</span>
                            </button>
                            <button className="type-toggle-btn" data-type="llm">
                                <span>🧠</span>
                                <span>단일 LLM</span>
                            </button>
                        </div>

                        <div className="project-selector">
                            <select className="project-dropdown" id="projectSelect">
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
                    {/* 멀티 에이전트 대화 예시 */}
                    <div className="history-item agent-conversation"
                    //  onclick="viewHistoryDetail('hist-001')"
                    >
                        <div className="history-actions">
                            <button className="history-action-btn"
                                // onclick="event.stopPropagation(); resumeConversation('hist-001')"
                                title="대화 이어가기">💬</button>
                            <button className="history-action-btn"
                                //  onclick="event.stopPropagation(); exportHistory('hist-001')" 
                                title="내보내기">📤</button>
                            <button className="history-action-btn"
                                // onclick="event.stopPropagation(); deleteHistory('hist-001')"
                                title="삭제">🗑️</button>
                        </div>

                        <div className="history-item-header">
                            <div>
                                <h3 className="history-item-title">Q4 매출 데이터 심화 분석</h3>
                                <div className="history-item-labels">
                                    <div className="conversation-type-label agent">🤖 멀티에이전트</div>
                                    <div className="project-label">📊 파일분석하기</div>
                                </div>
                            </div>
                            <div className="history-item-time">2시간 전</div>
                        </div>

                        <div className="history-item-content">
                            Q4 매출 데이터를 종합적으로 분석하여 트렌드 파악, 성장률 계산, 경쟁사 비교 분석을 수행했습니다. 리서치 에이전트가 외부 데이터를 수집하고, 분석 에이전트가 데이터 처리 및 인사이트 도출했습니다.
                        </div>

                        <div className="conversation-participants">
                            <div className="participants-label">참여 에이전트</div>
                            <div className="participants-list">
                                <div className="participant-tag agent">🔍 리서치 에이전트</div>
                                <div className="participant-tag agent">📊 분석 에이전트</div>
                                <div className="participant-tag agent">📈 시각화 에이전트</div>
                            </div>
                        </div>

                        <div className="history-item-meta">
                            <div className="history-stat">
                                <span>💰</span>
                                <span>$2.84</span>
                            </div>
                            <div className="history-stat">
                                <span>⚡</span>
                                <span>3,247 토큰</span>
                            </div>
                        </div>
                    </div>

                    {/* 단일 LLM 대화 예시 */}
                    <div className="history-item llm-conversation"
                    // onclick="viewHistoryDetail('hist-002')"
                    >
                        <div className="history-actions">
                            <button className="history-action-btn"
                                // onclick="event.stopPropagation(); resumeConversation('hist-002')"
                                title="대화 이어가기">💬</button>
                            <button className="history-action-btn"
                                // onclick="event.stopPropagation(); exportHistory('hist-002')"
                                title="내보내기">📤</button>
                            <button className="history-action-btn"
                                // onclick="event.stopPropagation(); deleteHistory('hist-002')"
                                title="삭제">🗑️</button>
                        </div>

                        <div className="history-item-header">
                            <div>
                                <h3 className="history-item-title">이미지 파일 메타데이터 추출</h3>
                                <div className="history-item-labels">
                                    <div className="conversation-type-label llm">🧠 단일 LLM</div>
                                    <div className="project-label">📁 파일업로드 test</div>
                                </div>
                            </div>
                            <div className="history-item-time">30분 전</div>
                        </div>

                        <div className="history-item-content">
                            업로드된 이미지 파일들의 메타데이터를 추출하고 분석하는 작업을 수행했습니다. EXIF 데이터, 파일 크기, 해상도, 촬영 정보 등을 체계적으로 정리했습니다.
                        </div>

                        <div className="conversation-participants">
                            <div className="participants-label">사용 모델</div>
                            <div className="participants-list">
                                <div className="participant-tag llm">🧠 Claude Sonnet</div>
                            </div>
                        </div>

                        <div className="history-item-meta">
                            <div className="history-stat">
                                <span>💰</span>
                                <span>$0.89</span>
                            </div>
                            <div className="history-stat">
                                <span>⚡</span>
                                <span>1,247 토큰</span>
                            </div>
                        </div>
                    </div>

                    {/* 더 많은 히스토리 아이템들... */}
                    <div className="history-item agent-conversation"
                    // onclick="viewHistoryDetail('hist-003')"
                    >
                        <div className="history-actions">
                            <button className="history-action-btn"
                                // onclick="event.stopPropagation(); resumeConversation('hist-003')" 
                                title="대화 이어가기">💬</button>
                            <button className="history-action-btn"
                                // onclick="event.stopPropagation(); exportHistory('hist-003')" 
                                title="내보내기">📤</button>
                            <button className="history-action-btn"
                                // onclick="event.stopPropagation(); deleteHistory('hist-003')" 
                                title="삭제">🗑️</button>
                        </div>

                        <div className="history-item-header">
                            <div>
                                <h3 className="history-item-title">사업계획서 초안 협업 작성</h3>
                                <div className="history-item-labels">
                                    <div className="conversation-type-label agent">🤖 멀티에이전트</div>
                                    <div className="project-label">📝 사업계획서 작성</div>
                                </div>
                            </div>
                            <div className="history-item-time">1시간 전</div>
                        </div>

                        <div className="history-item-content">
                            AI 기반 사업계획서 작성을 위한 협업 세션을 진행했습니다. 리서치 에이전트가 시장 조사 및 경쟁사 분석을 수행하고, 글쓰기 에이전트가 구조화된 문서 작성을 담당했습니다.
                        </div>

                        <div className="conversation-participants">
                            <div className="participants-label">참여 에이전트</div>
                            <div className="participants-list">
                                <div className="participant-tag agent">🔍 리서치 에이전트</div>
                                <div className="participant-tag agent">✍️ 글쓰기 에이전트</div>
                            </div>
                        </div>

                        <div className="history-item-meta">
                            <div className="history-stat">
                                <span>💰</span>
                                <span>$4.12</span>
                            </div>
                            <div className="history-stat">
                                <span>⚡</span>
                                <span>5,234 토큰</span>
                            </div>
                        </div>
                    </div>
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
            </div>

        </>
    );
}
function generateUsageData() {
    return [10, 15, 12, 18, 20, 16, 22, 25, 19, 24, 28, 26, 30, 27];
}
function generateCostData() {
    return [0.02, 0.03, 0.025, 0.04, 0.05, 0.035, 0.06, 0.07, 0.055, 0.08, 0.09, 0.075, 0.1, 0.085];
}
function generateAccuracyData() {
    return [88, 92, 90, 94, 96, 93, 97, 95, 91, 94, 98, 96, 99, 97];
}
// 정확도 차트
function RenderAccuracyChart() {
    const data = generateAccuracyData();
    const canvasRef = useRef(null);

    useEffect(() => {
        if (data && canvasRef.current) {
            drawSimpleChart('accuracy-canvas', data, '#8b5cf6');
        }
    }, [data]);

    if (!data) {
        return <div>차트를 로딩 중입니다...</div>;
    }

    return <canvas id='accuracy-canvas' ref={canvasRef} width="300" height="200" />;
}

// 비용 차트
function RenderCostChart() {
    const data = generateCostData();
    const canvasRef = useRef(null);

    useEffect(() => {
        if (data && canvasRef.current) {
            drawSimpleChart('cost-canvas', data, '#10b981');
        }
    }, [data]);

    if (!data) {
        return <div>차트를 로딩 중입니다...</div>;
    }

    return <canvas id='cost-canvas' ref={canvasRef} width="300" height="200" />;
}


// 사용량 차트
function RenderUsageChart() {
    const data = generateUsageData();
    // const data = useMemo(() => generateUsageData(), []);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (data && canvasRef.current) {
            drawSimpleChart('usage-canvas', data, '#3b82f6');
        }
    }, [data]);

    if (!data) {
        return <div>차트를 로딩 중입니다...</div>;
    }

    return <canvas id='usage-canvas' ref={canvasRef} width="300" height="200" />;
}

function drawSimpleChart(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;

    // 배경 클리어
    ctx.clearRect(0, 0, width, height);

    // 데이터 정규화
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;

    // 선 그리기
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((value, index) => {
        const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // 포인트 그리기
    ctx.fillStyle = color;
    data.forEach((value, index) => {
        const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((value - minValue) / range) * (height - 2 * padding);

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
    });
}


function renderHistory({ historyData, currentFilter, searchQuery, dateRange, currentSort, onMenuClick }) {
    const filteredHistory = getFilteredHistory({ historyData, currentFilter, searchQuery, dateRange, currentSort });
    // alert(filteredHistory.length);
    if (filteredHistory.length === 0) {
        return (
            <div className="history-timeline">
                <div style={{ textAlign: 'center', padding: '80px 40px' }}>
                    <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.5 }}>📈</div>
                    <h3 style={{ fontSize: '24px', color: 'var(--gray-800)', marginBottom: '12px' }}>
                        히스토리가 없습니다
                    </h3>
                    <p style={{ color: 'var(--gray-500)', marginBottom: '32px' }}>
                        AI 에이전트와 작업을 시작하면 히스토리가 기록됩니다.
                    </p>
                    <button className="action-btn"
                        onClick={() => onMenuClick('assistant')}
                    >
                        <span>💬</span>
                        <span>AI 어시스턴트 시작</span>
                    </button>
                </div>
            </div>

        );
    }

    return (
        <div className="history-timeline">
            {filteredHistory.map(item => createHistoryItem(item))}
        </div>
    );
}


function getFilteredHistory({ historyData, currentFilter, searchQuery, dateRange, currentSort }) {
    let filtered = [...historyData];

    // 타입 필터
    if (currentFilter !== 'all') {
        filtered = filtered.filter(item => item.type === currentFilter);
    }

    // 검색 필터
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query) ||
            item.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }

    // 날짜 범위 필터
    if (dateRange.start && dateRange.end) {
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        filtered = filtered.filter(item => {
            const itemDate = new Date(item.timestamp);
            return itemDate >= startDate && itemDate <= endDate;
        });
    }

    // 정렬
    filtered.sort((a, b) => {
        switch (currentSort) {
            case 'newest':
                return new Date(b.timestamp) - new Date(a.timestamp);
            case 'oldest':
                return new Date(a.timestamp) - new Date(b.timestamp);
            case 'duration':
                return parseDuration(b.stats.duration) - parseDuration(a.stats.duration);
            case 'cost':
                return parseFloat(b.stats.cost.substring(1)) - parseFloat(a.stats.cost.substring(1));
            default:
                return 0;
        }
    });

    return filtered;
}

function parseDuration(duration) {
    const parts = duration.split(' ');
    let totalSeconds = 0;

    for (let i = 0; i < parts.length; i += 2) {
        const value = parseInt(parts[i]);
        const unit = parts[i + 1];

        if (unit.includes('분')) {
            totalSeconds += value * 60;
        } else if (unit.includes('초')) {
            totalSeconds += value;
        }
    }

    return totalSeconds;
}

function getTypeInfo(type) {
    const types = {
        analysis: { icon: '📊', label: '분석' },
        'code-review': { icon: '💻', label: '코드 리뷰' },
        research: { icon: '🔍', label: '리서치' },
        visualization: { icon: '📈', label: '시각화' },
        translation: { icon: '🌐', label: '번역' },
        automation: { icon: '🔄', label: '자동화' },
        generation: { icon: '✨', label: '생성' },
        optimization: { icon: '⚡', label: '최적화' }
    };
    return types[type] || { icon: '📝', label: '작업' };
}
function getTagClass(tag) {
    const tagClasses = {
        'React': 'react',
        'JavaScript': 'ai',
        'AI': 'ai',
        '분석': 'analysis',
        '시각화': 'analysis',
        '번역': 'files',
        '워크플로우': 'analysis'
    };
    return tagClasses[tag] || 'ai';
}

function createHistoryItem(item) {
    const typeInfo = getTypeInfo(item.type);
    const formattedTime = formatTimestamp(item.timestamp);
    const tagsHtml = item.tags.map((tag, index) => (<span key={index} className={`tag ${getTagClass(tag)}`}>{tag}</span>));
    return (
        <div className={`history-item ${item.status}`} data-history-id={item.id} key={item.id}
        // onClick={viewHistoryDetail(item)}
        >
            <div className="history-item-header">
                <div>
                    <h3 className="history-item-title">{item.title}</h3>
                    <div className="history-item-type">
                        <span>{typeInfo.icon}</span>
                        <span>{typeInfo.label}</span>
                    </div>
                </div>
                <div className="history-item-time">{formattedTime}</div>
            </div>

            <div className="history-item-content">
                <p>{item.content}</p>
            </div>

            <div className="item-tags" style={{ marginbottom: "16px" }}>
                {tagsHtml}
            </div>

            <div className="history-item-meta">
                <div className="history-stat">
                    <span>🤖</span>
                    <span>{item.agentName}</span>
                </div>
                <div className="history-stat">
                    <span>📁</span>
                    <span>{item.projectName}</span>
                </div>
                <div className="history-stat">
                    <span>⏱️</span>
                    <span>{item.stats.duration}</span>
                </div>
                <div className="history-stat">
                    <span>🎯</span>
                    <span>{item.stats.accuracy}% 정확도</span>
                </div>
                <div className="history-stat">
                    <span>💰</span>
                    <span>{item.stats.cost}</span>
                </div>
                <div className="history-stat">
                    <span>⚡</span>
                    <span>{formatNumber(item.stats.tokensUsed)} 토큰</span>
                </div>
            </div>
        </div>
    );
}