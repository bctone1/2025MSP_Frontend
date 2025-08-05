'use client';

import "@/adminStyle/history.css";

import { useState, useEffect, useMemo } from 'react';

export default function Historys() {

    const [currentView, setcurrentView] = useState('list');
    const [filters, setfilters] = useState({
        user: 'all',
        timerange: 'week',
        model: 'all',
        status: 'all',
        search: '',
        startDate: '',
        endDate: ''
    });
    const [sortBy, setsortBy] = useState('created');
    const [sortOrder, setsortOrder] = useState('desc');
    const selectedConversations = new Set();

    // 데이터
    const conversations = [
        {
            id: 'conv_001',
            userId: 'user_001',
            userName: '김지민',
            userEmail: 'jimin.kim@example.com',
            userAvatar: 'KJ',
            title: 'React 컴포넌트 최적화 방법',
            preview: 'React에서 성능을 향상시키기 위한 컴포넌트 최적화 방법에 대해 문의드립니다...',
            status: 'active',
            model: 'claude-3-opus',
            messageCount: 23,
            tokenCount: 15420,
            duration: '1시간 15분',
            created: '2024-06-26T09:15:00Z',
            updated: '2024-06-26T10:30:00Z',
            topics: ['React', '성능 최적화', '프론트엔드'],
            platform: 'web',
            sessionId: 'sess_001',
            cost: 4.25,
            satisfaction: 5
        },
        {
            id: 'conv_002',
            userId: 'user_002',
            userName: '박성호',
            userEmail: 'seongho.park@example.com',
            userAvatar: 'PS',
            title: 'AI 프로젝트 기획서 작성',
            preview: 'AI를 활용한 프로젝트의 기획서를 작성하는데 도움이 필요합니다...',
            status: 'completed',
            model: 'gpt-4',
            messageCount: 45,
            tokenCount: 28930,
            duration: '2시간 30분',
            created: '2024-06-25T14:20:00Z',
            updated: '2024-06-25T16:50:00Z',
            topics: ['AI', '기획', '프로젝트 관리'],
            platform: 'mobile',
            sessionId: 'sess_002',
            cost: 8.75,
            satisfaction: 4
        },
        {
            id: 'conv_003',
            userId: 'user_003',
            userName: '이수진',
            userEmail: 'sujin.lee@example.com',
            userAvatar: 'LS',
            title: '데이터베이스 설계 문의',
            preview: '대규모 데이터를 처리할 수 있는 데이터베이스 설계에 대해 조언을 구합니다...',
            status: 'archived',
            model: 'claude-3-sonnet',
            messageCount: 12,
            tokenCount: 8450,
            duration: '45분',
            created: '2024-06-24T11:30:00Z',
            updated: '2024-06-24T12:15:00Z',
            topics: ['데이터베이스', '설계', 'SQL'],
            platform: 'web',
            sessionId: 'sess_003',
            cost: 2.10,
            satisfaction: 4
        },
        {
            id: 'conv_004',
            userId: 'user_004',
            userName: '최민수',
            userEmail: 'minsu.choi@example.com',
            userAvatar: 'CM',
            title: '마케팅 전략 수립',
            preview: '신제품 출시를 위한 디지털 마케팅 전략을 수립하고 싶습니다...',
            status: 'active',
            model: 'gemini-pro',
            messageCount: 18,
            tokenCount: 12680,
            duration: '1시간 5분',
            created: '2024-06-26T08:45:00Z',
            updated: '2024-06-26T09:50:00Z',
            topics: ['마케팅', '전략', '브랜딩'],
            platform: 'desktop',
            sessionId: 'sess_004',
            cost: 3.45,
            satisfaction: 5
        },
        {
            id: 'conv_005',
            userId: 'user_005',
            userName: '정혜원',
            userEmail: 'hyewon.jung@example.com',
            userAvatar: 'JH',
            title: 'Python 자동화 스크립트',
            preview: '업무 자동화를 위한 Python 스크립트 작성 방법을 배우고 싶습니다...',
            status: 'completed',
            model: 'claude-3-haiku',
            messageCount: 31,
            tokenCount: 18920,
            duration: '1시간 40분',
            created: '2024-06-23T16:00:00Z',
            updated: '2024-06-23T17:40:00Z',
            topics: ['Python', '자동화', '스크립팅'],
            platform: 'web',
            sessionId: 'sess_005',
            cost: 1.85,
            satisfaction: 5
        }
    ];
    const users = [
        { id: 'user_001', name: '김지민', email: 'jimin.kim@example.com', type: 'premium' },
        { id: 'user_002', name: '박성호', email: 'seongho.park@example.com', type: 'trial' },
        { id: 'user_003', name: '이수진', email: 'sujin.lee@example.com', type: 'premium' },
        { id: 'user_004', name: '최민수', email: 'minsu.choi@example.com', type: 'premium' },
        { id: 'user_005', name: '정혜원', email: 'hyewon.jung@example.com', type: 'trial' }
    ];
    const models = [
        'claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku',
        'gpt-4', 'gpt-4-turbo', 'gemini-pro'
    ];
    const analytics = {};

    // 페이지네이션
    const currentPage = 1;
    const itemsPerPage = 20;

    // 업데이트 인터벌
    const updateInterval = null;

    const filteredConversations = getFilteredConversations({ conversations, filters, users, sortBy, sortOrder });



    const stats = calculateStats({ conversations });

    return (
        <>
            <div className="page-container">
                {/* 페이지 헤더  */}
                <div className="page-header">
                    <div className="header-top">
                        <div className="header-info">
                            <h1 className="page-title">히스토리 관리</h1>
                            <p className="page-subtitle">사용자들의 대화 이력을 모니터링하고 관리하세요</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" id="refresh-history">
                                🔄 새로고침
                            </button>
                            <button className="btn btn-secondary" id="export-history">
                                📤 내보내기
                            </button>
                            <button className="btn btn-secondary" id="bulk-actions">
                                📋 일괄 작업
                            </button>
                            <button className="btn btn-primary" id="privacy-settings">
                                🔒 개인정보 설정
                            </button>
                        </div>
                    </div>
                </div>

                {/* 히스토리 통계 */}
                <div className="history-stats">
                    <div className="stat-card">
                        <div className="stat-icon conversations-total">💬</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-conversations">{formatNumber(stats.totalConversations)}</div>
                            <div className="stat-label">총 대화 수</div>
                            <div className="stat-change positive">+234개 오늘</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon messages-total">📨</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-messages">{formatNumber(stats.totalMessages)}</div>
                            <div className="stat-label">총 메시지 수</div>
                            <div className="stat-change positive">+1.8K 오늘</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon active-users">👥</div>
                        <div className="stat-content">
                            <div className="stat-value" id="active-users-today">{formatNumber(stats.activeUsersToday)}</div>
                            <div className="stat-label">오늘 활성 사용자</div>
                            <div className="stat-change positive">+67명 증가</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon avg-session">⏱️</div>
                        <div className="stat-content">
                            <div className="stat-value" id="avg-session-duration">{stats.avgSessionDuration}</div>
                            <div className="stat-label">평균 세션 시간</div>
                            <div className="stat-change positive">+2.1분 증가</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon storage-used">💾</div>
                        <div className="stat-content">
                            <div className="stat-value" id="storage-used">{stats.storageUsed}</div>
                            <div className="stat-label">저장 공간 사용량</div>
                            <div className="stat-change neutral">전체 47.2GB 중</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon retention-rate">📈</div>
                        <div className="stat-content">
                            <div className="stat-value" id="retention-rate">{stats.retentionRate}</div>
                            <div className="stat-label">7일 재방문율</div>
                            <div className="stat-change positive">+3.2% 증가</div>
                        </div>
                    </div>
                </div>

                {/* 필터 및 검색 */}
                <div className="history-toolbar">
                    <div className="toolbar-left">
                        <div className="search-box">
                            <input type="text" id="history-search" placeholder="사용자명, 대화 내용 검색..." className="search-input" value={filters.search}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        search: e.target.value
                                    }))
                                }
                            />
                            <div className="search-icon">🔍</div>
                        </div>

                        <div className="filter-group">
                            <select id="user-filter" className="filter-select" value={filters.user}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        user: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 사용자</option>
                                <option value="active">활성 사용자</option>
                                <option value="inactive">비활성 사용자</option>
                                <option value="premium">프리미엄 사용자</option>
                                <option value="trial">체험 사용자</option>
                            </select>

                            <select id="timerange-filter" className="filter-select" value={filters.timerange}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        timerange: e.target.value
                                    }))
                                }
                            >
                                <option value="today">오늘</option>
                                <option value="week">이번 주</option>
                                <option value="month">이번 달</option>
                                <option value="quarter">3개월</option>
                                <option value="year">올해</option>
                                <option value="custom">사용자 정의</option>
                            </select>

                            <select id="model-filter" className="filter-select" value={filters.model}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        model: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 모델</option>
                                <option value="claude-3-opus">Claude 3 Opus</option>
                                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
                                <option value="claude-3-haiku">Claude 3 Haiku</option>
                                <option value="gpt-4">GPT-4</option>
                                <option value="gpt-4-turbo">GPT-4 Turbo</option>
                                <option value="gemini-pro">Gemini Pro</option>
                            </select>

                            <select id="status-filter" className="filter-select" value={filters.status}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        status: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 상태</option>
                                <option value="active">진행 중</option>
                                <option value="completed">완료</option>
                                <option value="archived">보관됨</option>
                                <option value="deleted">삭제됨</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div className="date-picker">
                            <input type="date" id="start-date" className="date-input" />
                            <span>~</span>
                            <input type="date" id="end-date" className="date-input" />
                        </div>

                        <div className="sort-controls">
                            <select id="sort-by" className="sort-select" value={sortBy}
                                onChange={(e) => setsortBy(e.target.value)}
                            >
                                <option value="created">생성일</option>
                                <option value="updated">수정일</option>
                                <option value="messages">메시지 수</option>
                                <option value="duration">대화 시간</option>
                                <option value="tokens">토큰 사용량</option>
                                <option value="user">사용자명</option>
                            </select>
                            <button className="sort-order-btn" id="sort-order" onClick={() => setsortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}>
                                <span id="sort-icon">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            </button>
                        </div>

                        <div className="view-toggle">
                            <button className={`view-btn ${currentView === 'list' ? 'active' : ''}`} onClick={() => setcurrentView('list')}>📋</button>
                            <button className={`view-btn ${currentView === 'timeline' ? 'active' : ''}`} onClick={() => setcurrentView('timeline')}>📅</button>
                            <button className={`view-btn ${currentView === 'analytics' ? 'active' : ''}`} onClick={() => setcurrentView('analytics')} >📊</button>
                        </div>
                    </div>
                </div>

                {/* 히스토리 컨텐츠 */}
                <div className="history-container">
                    {/* 리스트 뷰 */}
                    <div className={`history-list-view ${currentView === 'list' ? 'active' : ''}`} id="history-list">
                        <div className="conversations-list" id="conversations-list">
                            {/* 대화 목록이 여기에 동적으로 추가됩니다 */}
                            {<RenderListView filteredConversations={filteredConversations} users={users} />}
                        </div>
                    </div>

                    {/* 타임라인 뷰 */}
                    <div className={`history-timeline-view ${currentView === 'timeline' ? 'active' : ''}`} id="history-timeline">
                        <div className="timeline-container" id="timeline-container">
                            {/* 타임라인이 여기에 동적으로 추가됩니다 */}
                            {<RenderTimelineView filteredConversations={filteredConversations} />}
                        </div>
                    </div>

                    {/* 분석 뷰 */}
                    <div className={`history-analytics-view ${currentView === 'analytics' ? 'active' : ''}`} id="history-analytics">
                        <div className="analytics-grid">
                            <div className="analytics-card">
                                <h4>📈 대화 패턴 분석</h4>
                                <div className="chart-container" id="conversation-patterns">
                                    <div className="chart-placeholder">
                                        📊 시간대별 대화 패턴 차트
                                        <div className="pattern-chart">
                                            <div className="chart-bars">
                                                <div className="chart-bar" style={{ height: '20%' }}></div>
                                                <div className="chart-bar" style={{ height: '30%' }}></div>
                                                <div className="chart-bar" style={{ height: '60%' }}></div>
                                                <div className="chart-bar" style={{ height: '80%' }}></div>
                                                <div className="chart-bar" style={{ height: '95%' }}></div>
                                                <div className="chart-bar" style={{ height: '75%' }}></div>
                                                <div className="chart-bar" style={{ height: '40%' }}></div>
                                                <div className="chart-bar" style={{ height: '25%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="analytics-card">
                                <h4>🤖 모델 사용 분포</h4>
                                <div className="chart-container" id="model-usage">
                                    <div className="chart-placeholder">
                                        📊 AI 모델별 사용량 차트
                                        <div className="model-stats">
                                            <div className="model-item">
                                                <span className="model-name">Claude 3 Opus</span>
                                                <span className="model-percentage">34.2%</span>
                                            </div>
                                            <div className="model-item">
                                                <span className="model-name">GPT-4</span>
                                                <span className="model-percentage">28.7%</span>
                                            </div>
                                            <div className="model-item">
                                                <span className="model-name">Claude 3 Sonnet</span>
                                                <span className="model-percentage">21.3%</span>
                                            </div>
                                            <div className="model-item">
                                                <span className="model-name">Gemini Pro</span>
                                                <span className="model-percentage">15.8%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="analytics-card">
                                <h4>📱 플랫폼 사용 현황</h4>
                                <div className="chart-container" id="platform-usage">
                                    <div className="chart-placeholder">
                                        📊 플랫폼별 접속 현황
                                        <div className="platform-stats">
                                            <div className="platform-item">
                                                <span className="platform-icon">💻</span>
                                                <span className="platform-name">웹</span>
                                                <span className="platform-percentage">67%</span>
                                            </div>
                                            <div className="platform-item">
                                                <span className="platform-icon">📱</span>
                                                <span className="platform-name">모바일</span>
                                                <span className="platform-percentage">28%</span>
                                            </div>
                                            <div className="platform-item">
                                                <span className="platform-icon">🖥️</span>
                                                <span className="platform-name">데스크톱 앱</span>
                                                <span className="platform-percentage">5%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="analytics-card">
                                <h4>⏱️ 응답 시간 분석</h4>
                                <div className="chart-container" id="response-times">
                                    <div className="chart-placeholder">
                                        📊 AI 응답 시간 분포
                                        <div className="response-stats">
                                            <div className="response-item">
                                                <span className="response-label">P50</span>
                                                <span className="response-value">1.2초</span>
                                            </div>
                                            <div className="response-item">
                                                <span className="response-label">P90</span>
                                                <span className="response-value">3.4초</span>
                                            </div>
                                            <div className="response-item">
                                                <span className="response-label">P99</span>
                                                <span className="response-value">8.7초</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 대화 상세 패널 */}
                <div className="conversation-detail-panel" id="detail-panel" style={{ display: 'none' }}>
                    <div className="detail-header">
                        <h3>대화 상세 정보</h3>
                        <button className="close-panel-btn" id="close-detail">✕</button>
                    </div>
                    <div className="detail-content" id="detail-content">
                        {/* 상세 내용이 여기에 동적으로 로드됩니다 */}
                    </div>
                </div>

                {/* 개인정보 관리 섹션 */}
                <div className="privacy-section">
                    <div className="section-header">
                        <h3 className="section-title">
                            <div className="section-icon">🔒</div>
                            개인정보 보호 설정
                        </h3>
                        <div className="section-controls">
                            <button className="btn btn-secondary" id="anonymize-data">
                                🎭 데이터 익명화
                            </button>
                            <button className="btn btn-secondary" id="gdpr-export">
                                📋 GDPR 내보내기
                            </button>
                            <button className="btn btn-danger" id="bulk-delete">
                                🗑️ 일괄 삭제
                            </button>
                        </div>
                    </div>

                    <div className="privacy-grid">
                        <div className="privacy-card">
                            <h4>🕒 데이터 보존 정책</h4>
                            <div className="retention-settings">
                                <div className="setting-item">
                                    <label>기본 보존 기간</label>
                                    <select id="default-retention">
                                        <option value="30">30일</option>
                                        <option value="90">90일</option>
                                        <option value="180">180일</option>
                                        <option value="365">1년</option>
                                        <option value="unlimited">무제한</option>
                                    </select>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="auto-archive" readOnly />
                                        자동 아카이브 활성화
                                    </label>
                                    <p>30일 이상 비활성 대화를 자동으로 아카이브합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="user-deletion-rights" readOnly />
                                        사용자 삭제 권한 허용
                                    </label>
                                    <p>사용자가 직접 자신의 대화를 삭제할 수 있습니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className="privacy-card">
                            <h4>🎯 데이터 분석 설정</h4>
                            <div className="analytics-settings">
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="usage-analytics" readOnly />
                                        사용량 분석 수집
                                    </label>
                                    <p>서비스 개선을 위한 익명 사용량 데이터를 수집합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="performance-monitoring" />
                                        성능 모니터링
                                    </label>
                                    <p>응답 시간 및 시스템 성능 데이터를 수집합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>데이터 익명화 레벨</label>
                                    <select id="anonymization-level">
                                        <option value="none">없음</option>
                                        <option value="basic">기본</option>
                                        <option value="enhanced">강화</option>
                                        <option value="full">완전</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="privacy-card">
                            <h4>⚠️ 민감 정보 감지</h4>
                            <div className="detection-settings">
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="pii-detection" readOnly />
                                        개인식별정보 감지
                                    </label>
                                    <p>이름, 전화번호, 이메일 등 개인정보를 자동 감지합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="sensitive-content" readOnly />
                                        민감한 내용 필터링
                                    </label>
                                    <p>부적절하거나 민감한 내용을 자동으로 필터링합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>감지된 정보 처리 방식</label>
                                    <select id="pii-handling">
                                        <option value="mask">마스킹 처리</option>
                                        <option value="remove">완전 제거</option>
                                        <option value="flag">플래그 표시</option>
                                        <option value="encrypt">암호화</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="privacy-card">
                            <h4>📊 규정 준수 리포트</h4>
                            <div className="compliance-status">
                                <div className="compliance-item">
                                    <span className="compliance-label">GDPR 준수율</span>
                                    <span className="compliance-value success">98.5%</span>
                                </div>
                                <div className="compliance-item">
                                    <span className="compliance-label">데이터 처리 동의</span>
                                    <span className="compliance-value success">100%</span>
                                </div>
                                <div className="compliance-item">
                                    <span className="compliance-label">삭제 요청 처리</span>
                                    <span className="compliance-value warning">진행 중: 3건</span>
                                </div>
                                <div className="compliance-item">
                                    <span className="compliance-label">데이터 유출 사고</span>
                                    <span className="compliance-value success">0건</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

function calculateAverageSessionDuration({ conversations }) {
    const totalMinutes = conversations.reduce((sum, conv) => {
        return sum + parseDuration(conv.duration);
    }, 0);

    const avgMinutes = Math.round(totalMinutes / conversations.length);
    return `${avgMinutes}분`;
}

// 저장 공간 사용량 계산
function calculateStorageUsed({ conversations }) {
    const totalTokens = conversations.reduce((sum, conv) => sum + conv.tokenCount, 0);
    const estimatedGB = (totalTokens * 4) / (1024 * 1024 * 1024); // 대략적인 계산
    return `${estimatedGB.toFixed(1)}GB`;
}

// 재방문율 계산
function calculateRetentionRate() {
    // 더미 계산 - 실제로는 복잡한 로직 필요
    return '78.5%';
}

function calculateStats({ conversations }) {
    const today = new Date();
    const todayConversations = conversations.filter(conv => {
        const convDate = new Date(conv.created);
        return convDate.toDateString() === today.toDateString();
    });

    return {
        totalConversations: conversations.length,
        totalMessages: conversations.reduce((sum, conv) => sum + conv.messageCount, 0),
        activeUsersToday: new Set(todayConversations.map(conv => conv.userId)).size,
        avgSessionDuration: calculateAverageSessionDuration({ conversations }),
        storageUsed: calculateStorageUsed({ conversations }),
        retentionRate: calculateRetentionRate({ conversations })
    };
}

function RenderTimelineView({ filteredConversations }) {
    const groupedByDate = groupConversationsByDate(filteredConversations);

    return (
        <>
            {Object.keys(groupedByDate).sort().reverse().map((date) => (
                <div className="timeline-item" key={date}>
                    <div className="timeline-date">{formatDate(date)}</div>
                    <div className="timeline-content">
                        {groupedByDate[date].map((conv) => (
                            <div className="timeline-conversation" key={conv.id}>
                                <strong>{conv.userName}</strong> - {conv.title}
                                <br />
                                <small>{conv.model} • {conv.messageCount}개 메시지</small>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}


function groupConversationsByDate(conversations) {
    return conversations.reduce((groups, conv) => {
        const date = conv.created.split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(conv);
        return groups;
    }, {});
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}


function RenderListView({ filteredConversations, users }) {
    // const filteredConversations = getFilteredConversations({ conversations, filters, users, sortBy });
    return (
        <>
            {filteredConversations.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>대화가 없습니다</h3>
                    <p>선택한 조건에 맞는 대화가 없습니다.<br />필터를 조정하거나 다른 기간을 선택해보세요.</p>
                </div>
            )}

            {filteredConversations.map(conversation => (
                renderConversationCard({ conversation, users })
            ))}

        </>
    );
}

function renderConversationCard({ conversation, users }) {
    const user = users.find(u => u.id === conversation.userId);
    // const duration = formatDuration(conversation.duration);
    const duration = conversation.duration;
    const timeAgo = getTimeAgo(conversation.updated);

    return (
        <div className={`conversation-card status-${conversation.status}`} key={conversation.id}>
            <div className="conversation-header">
                <div className="conversation-user">
                    <div className="user-avatar">{conversation.userAvatar}</div>
                    <div className="user-info">
                        <div className="user-name">{conversation.userName}</div>
                        <div className="user-email">{conversation.userEmail}</div>
                    </div>
                </div>
                <div className="conversation-meta">
                    <div className="conversation-status">
                        <div className={`status-dot ${conversation.status}`}></div>
                        <span className={`status-text ${conversation.status}`}>{getStatusText(conversation.status)}</span>
                    </div>
                    <div className="conversation-time">${timeAgo}</div>
                </div>
            </div>

            <div className="conversation-stats">
                <div className="stat-item">
                    <div className="stat-value">{conversation.messageCount}</div>
                    <div className="stat-label">메시지</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">{formatNumber(conversation.tokenCount)}</div>
                    <div className="stat-label">토큰</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">{duration}</div>
                    <div className="stat-label">시간</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">${conversation.cost}</div>
                    <div className="stat-label">비용</div>
                </div>
            </div>

            <div className="conversation-preview">
                <div className="preview-title">{conversation.title}</div>
                <div className="preview-content">{conversation.preview}</div>
            </div>

            <div className="conversation-tags">
                <div className="model-tag">{conversation.model}</div>
                <div className="conversation-topics">
                    {conversation.topics.map(topic => (<span className="topic-tag" key={topic}>{topic}</span>))}
                </div>
            </div>

            <div className="conversation-actions">
                <button className="action-btn view"
                //onclick="HistoryManager.viewConversation('${conversation.id}')"
                >
                    👁️ 보기
                </button>
                <button className="action-btn archive"
                //onclick="HistoryManager.archiveConversation('${conversation.id}')"
                >
                    📦 보관
                </button>
                <button className="action-btn export"
                //onclick="HistoryManager.exportConversation('${conversation.id}')"
                >
                    📤 내보내기
                </button>
                <button className="action-btn delete"
                // onclick="HistoryManager.deleteConversation('${conversation.id}')"
                >
                    🗑️ 삭제
                </button>
            </div>
        </div>
    );
}


function getFilteredConversations({ conversations, filters, users, sortBy, sortOrder }) {
    let filtered = [...conversations];

    // 사용자 필터
    if (filters.user !== 'all') {
        const userType = filters.user;
        filtered = filtered.filter(conv => {
            const user = users.find(u => u.id === conv.userId);
            return user && user.type === userType;
        });
    }

    // 상태 필터
    if (filters.status !== 'all') {
        filtered = filtered.filter(conv => conv.status === filters.status);
    }

    // 모델 필터
    if (filters.model !== 'all') {
        filtered = filtered.filter(conv => conv.model === filters.model);
    }

    // 검색 필터
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(conv =>
            conv.title.toLowerCase().includes(searchTerm) ||
            conv.preview.toLowerCase().includes(searchTerm) ||
            conv.userName.toLowerCase().includes(searchTerm) ||
            conv.userEmail.toLowerCase().includes(searchTerm) ||
            conv.topics.some(topic => topic.toLowerCase().includes(searchTerm))
        );
    }

    // 날짜 필터
    if (filters.startDate && filters.endDate) {
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999);

        filtered = filtered.filter(conv => {
            const convDate = new Date(conv.created);
            return convDate >= startDate && convDate <= endDate;
        });
    }

    // 정렬
    filtered.sort((a, b) => {
        let aValue, bValue;

        switch (sortBy) {
            case 'updated':
                aValue = new Date(a.updated);
                bValue = new Date(b.updated);
                break;
            case 'messages':
                aValue = a.messageCount;
                bValue = b.messageCount;
                break;
            case 'duration':
                aValue = parseDuration(a.duration);
                bValue = parseDuration(b.duration);
                break;
            case 'tokens':
                aValue = a.tokenCount;
                bValue = b.tokenCount;
                break;
            case 'user':
                aValue = a.userName.toLowerCase();
                bValue = b.userName.toLowerCase();
                break;
            case 'created':
            default:
                aValue = new Date(a.created);
                bValue = new Date(b.created);
                break;
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    return filtered;
}

function parseDuration(duration) {
    // "1시간 15분" -> 75분으로 변환
    const match = duration.match(/(\d+)시간?\s*(\d+)?분?/);
    if (match) {
        const hours = parseInt(match[1]) || 0;
        const minutes = parseInt(match[2]) || 0;
        return hours * 60 + minutes;
    }
    return 0;
}

function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
        return `${diffDays}일 전`;
    } else if (diffHours > 0) {
        return `${diffHours}시간 전`;
    } else {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes}분 전`;
    }
}

function getStatusText(status) {
    const statusMap = {
        active: '진행중',
        completed: '완료',
        archived: '보관됨',
        deleted: '삭제됨'
    };
    return statusMap[status] || status;
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
