'use client';

import "@/adminStyle/logs.css";

import { useState, useEffect, useRef } from 'react';

export default function Logs() {
    const [logs, setlogs] = useState([
        {
            id: 'log_001',
            timestamp: '2024-08-11T10:30:25.123Z',
            level: 'error',
            service: 'api',
            message: 'Database connection timeout: Unable to connect to PostgreSQL server',
            details: {
                error: 'ETIMEDOUT',
                host: 'db-primary.internal',
                port: 5432,
                duration: '5000ms',
                stack: 'Error: Connection timeout\n    at Connection.connect (/app/db/connection.js:45:12)'
            },
            userId: 'user_12345',
            ip: '192.168.1.100',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            requestId: 'req_abc123',
            sessionId: 'sess_xyz789'
        },
        {
            id: 'log_002',
            timestamp: '2024-08-11T10:29:45.876Z',
            level: 'warning',
            service: 'auth',
            message: 'Rate limit exceeded for IP 203.0.113.45',
            details: {
                ip: '203.0.113.45',
                endpoint: '/api/auth/login',
                requestCount: 105,
                timeWindow: '1 minute',
                action: 'blocked'
            },
            userId: null,
            ip: '203.0.113.45',
            userAgent: 'curl/7.68.0',
            requestId: 'req_def456',
            sessionId: null
        },
        {
            id: 'log_003',
            timestamp: '2024-08-11T10:29:15.234Z',
            level: 'info',
            service: 'ai',
            message: 'AI model inference completed successfully',
            details: {
                model: 'claude-3-opus',
                tokens: 1250,
                processingTime: '2.3s',
                userId: 'user_67890',
                cost: 0.025
            },
            userId: 'user_67890',
            ip: '10.0.1.55',
            userAgent: 'MetaLLM-Client/1.0',
            requestId: 'req_ghi789',
            sessionId: 'sess_abc123'
        },
        {
            id: 'log_004',
            timestamp: '2024-08-11T10:28:50.567Z',
            level: 'debug',
            service: 'cache',
            message: 'Cache hit for key: user_profiles:12345',
            details: {
                key: 'user_profiles:12345',
                ttl: 3600,
                size: '2.4KB',
                hitRate: 0.87
            },
            userId: 'user_12345',
            ip: '10.0.1.33',
            userAgent: 'MetaLLM-Client/1.0',
            requestId: 'req_jkl012',
            sessionId: 'sess_def456'
        },
        {
            id: 'log_005',
            timestamp: '2024-08-11T10:28:30.890Z',
            level: 'error',
            service: 'cdn',
            message: 'Failed to deliver static asset: file not found',
            details: {
                path: '/assets/images/logo-v2.png',
                statusCode: 404,
                referer: 'https://app.metallm.ai/dashboard',
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
            },
            userId: 'user_54321',
            ip: '172.16.0.25',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            requestId: 'req_mno345',
            sessionId: 'sess_ghi789'
        }
    ]);

    const [filters, setfilters] = useState({
        level: 'all',
        service: 'all',
        timerange: '24h',
        search: '',
        startDate: '',
        endDate: ''
    });

    const [currentPage, setcurrentPage] = useState(1);
    const [settings, setsettings] = useState({
        autoRefresh: false,
        followLogs: false,
        paused: false,
        logsPerPage: 100,
        refreshInterval: 5000
    });

    // const [totalLogs, settotalLogs] = useState(0);
    const [filteredLogs, setFilteredLogs] = useState([]);

    useEffect(() => {
        const result = getFilteredLogs({ filters, logs, currentPage, settings });
        setFilteredLogs(result);
        // settotalLogs(result.length);
    }, [filters, logs, currentPage, settings]);
    // console.log(filteredLogs);
    // console.log(filteredLogs.length);

    return (
        <>
            <div className="page-container">
                {/* 페이지 헤더 */}
                <div className="page-header">
                    <div className="header-top">
                        <div className="header-info">
                            <h1 className="page-title">시스템 로그</h1>
                            <p className="page-subtitle">시스템 상태를 모니터링하고 로그를 분석하세요</p>
                        </div>
                        <div className="header-actions">
                            <div className="system-status">
                                <div className="status-indicator" id="system-status">
                                    <div className="status-dot active"></div>
                                    <span className="status-text">시스템 정상</span>
                                </div>
                            </div>
                            <button className="btn btn-secondary" id="refresh-logs">
                                🔄 새로고침
                            </button>
                            <button className="btn btn-secondary" id="export-logs">
                                📤 내보내기
                            </button>
                            <button className="btn btn-secondary" id="clear-logs">
                                🗑️ 로그 정리
                            </button>
                            <button className="btn btn-primary" id="log-settings">
                                ⚙️ 로그 설정
                            </button>
                        </div>
                    </div>
                </div>

                {/* 시스템 상태 개요 */}
                <div className="system-overview">
                    <div className="overview-card">
                        <div className="overview-icon system-health">🟢</div>
                        <div className="overview-content">
                            <div className="overview-value" id="system-health">정상</div>
                            <div className="overview-label">시스템 상태</div>
                            <div className="overview-detail">모든 서비스 정상 운영 중</div>
                        </div>
                    </div>

                    <div className="overview-card">
                        <div className="overview-icon uptime">⏱️</div>
                        <div className="overview-content">
                            <div className="overview-value" id="system-uptime">99.95%</div>
                            <div className="overview-label">시스템 가동률</div>
                            <div className="overview-detail">지난 30일 평균</div>
                        </div>
                    </div>

                    <div className="overview-card">
                        <div className="overview-icon error-rate">⚠️</div>
                        <div className="overview-content">
                            <div className="overview-value" id="error-rate">0.05%</div>
                            <div className="overview-label">오류율</div>
                            <div className="overview-detail">지난 24시간</div>
                        </div>
                    </div>

                    <div className="overview-card">
                        <div className="overview-icon response-time">⚡</div>
                        <div className="overview-content">
                            <div className="overview-value" id="avg-response-time">245ms</div>
                            <div className="overview-label">평균 응답시간</div>
                            <div className="overview-detail">지난 1시간</div>
                        </div>
                    </div>

                    <div className="overview-card">
                        <div className="overview-icon active-users">👥</div>
                        <div className="overview-content">
                            <div className="overview-value" id="concurrent-users">1,247</div>
                            <div className="overview-label">동시 접속자</div>
                            <div className="overview-detail">현재 온라인</div>
                        </div>
                    </div>

                    <div className="overview-card">
                        <div className="overview-icon log-volume">📊</div>
                        <div className="overview-content">
                            <div className="overview-value" id="log-volume">28.4K</div>
                            <div className="overview-label">오늘 로그 수</div>
                            <div className="overview-detail">전일 대비 +12%</div>
                        </div>
                    </div>
                </div>

                {/* 로그 필터 및 검색 */}
                <div className="logs-toolbar">
                    <div className="toolbar-left">
                        <div className="search-box">
                            <input type="text" id="log-search" placeholder="로그 메시지, IP, 사용자 검색..." className="search-input" />
                            <div className="search-icon">🔍</div>
                        </div>

                        <div className="filter-group">
                            <select id="level-filter" className="filter-select" value={filters.level}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        level: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 레벨</option>
                                <option value="error">오류</option>
                                <option value="warning">경고</option>
                                <option value="info">정보</option>
                                <option value="debug">디버그</option>
                            </select>

                            <select id="service-filter" className="filter-select" value={filters.service}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        service: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 서비스</option>
                                <option value="api">API 서버</option>
                                <option value="auth">인증 서비스</option>
                                <option value="ai">AI 엔진</option>
                                <option value="database">데이터베이스</option>
                                <option value="cache">캐시 서버</option>
                                <option value="cdn">CDN</option>
                                <option value="monitoring">모니터링</option>
                            </select>

                            <select id="timerange-filter" className="filter-select" value={filters.timerange}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        timerange: e.target.value
                                    }))
                                }
                            >
                                <option value="1h">최근 1시간</option>
                                <option value="6h">최근 6시간</option>
                                <option value="24h">최근 24시간</option>
                                <option value="7d">최근 7일</option>
                                <option value="30d">최근 30일</option>
                                <option value="custom">사용자 정의</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div
                            className="date-picker"
                            id="custom-date-picker"
                            style={{ display: filters.timerange === "custom" ? "block" : "none" }}
                        >
                            <input type="datetime-local" id="start-datetime" className="datetime-input" value={filters.startDate}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        startDate: e.target.value
                                    }))
                                }
                            />
                            <span>~</span>
                            <input type="datetime-local" id="end-datetime" className="datetime-input" value={filters.endDate}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        endDate: e.target.value
                                    }))
                                }
                            />
                        </div>

                        <div className="log-controls">
                            <button className="control-btn" id="auto-refresh" title="자동 새로고침">
                                <span className="control-icon">🔄</span>
                                <span className="control-text">자동</span>
                            </button>
                            <button className="control-btn" id="follow-logs" title="실시간 팔로우">
                                <span className="control-icon">📡</span>
                                <span className="control-text">실시간</span>
                            </button>
                            <button className="control-btn" id="pause-logs" title="일시정지">
                                <span className="control-icon">⏸️</span>
                                <span className="control-text">정지</span>
                            </button>
                        </div>

                        <div className="view-options">
                            <select id="logs-per-page" className="page-size-select">
                                <option value="50">50개씩</option>
                                <option value="100">100개씩</option>
                                <option value="200">200개씩</option>
                                <option value="500">500개씩</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 로그 컨텐츠 */}
                <div className="logs-container">
                    {/* 로그 헤더 */}
                    <div className="logs-header">
                        <div className="log-column timestamp">시간</div>
                        <div className="log-column level">레벨</div>
                        <div className="log-column service">서비스</div>
                        <div className="log-column message">메시지</div>
                        <div className="log-column actions">작업</div>
                    </div>

                    {/* 로그 목록 */}
                    <div className="logs-list" id="logs-list">
                        {/* 로그 항목들이 여기에 동적으로 추가됩니다 */}
                        {<RenderLogs filteredLogs={filteredLogs} />}
                    </div>

                    {/* 로그 로딩 */}
                    <div className="logs-loading" id="logs-loading" style={{ display: "none" }}>
                        <div className="loading-spinner"></div>
                        <span>로그를 불러오는 중...</span>
                    </div>

                    {/* 로그 더 보기 */}
                    <div className="logs-pagination">
                        <button className="btn btn-secondary" id="load-more-logs">
                            더 많은 로그 보기
                        </button>
                        <div className="pagination-info">
                            <span id="logs-count">{filteredLogs.length}개 로그 표시 중</span>
                        </div>
                    </div>
                </div>

                {/* 로그 상세 패널 */}
                <div className="log-detail-panel" id="log-detail-panel" style={{ display: "none" }}>
                    <div className="detail-header">
                        <h3>로그 상세 정보</h3>
                        <button className="close-panel-btn" id="close-log-detail">✕</button>
                    </div>
                    <div className="detail-content" id="log-detail-content">
                        {/* 상세 내용이 여기에 동적으로 로드됩니다 */}
                    </div>
                </div>

                {/* 시스템 메트릭 섹션 */}
                <div className="metrics-section">
                    <div className="section-header">
                        <h3 className="section-title">
                            <div className="section-icon">📊</div>
                            시스템 메트릭
                        </h3>
                        <div className="section-controls">
                            <select id="metric-timerange" className="filter-select">
                                <option value="1h">최근 1시간</option>
                                <option value="6h">최근 6시간</option>
                                <option value="24h">최근 24시간</option>
                                <option value="7d">최근 7일</option>
                            </select>
                            <button className="btn btn-secondary" id="refresh-metrics">
                                🔄 새로고침
                            </button>
                        </div>
                    </div>

                    <div className="metrics-grid">
                        <div className="metric-card">
                            <h4>📈 요청 처리량</h4>
                            <div className="metric-chart" id="request-volume-chart">
                                <div className="chart-placeholder">
                                    📊 시간당 요청 수 차트
                                    <div className="demo-chart">
                                        <div className="chart-bars">
                                            <div className="chart-bar" style={{ height: "60%" }}></div>
                                            <div className="chart-bar" style={{ height: "80%" }}></div>
                                            <div className="chart-bar" style={{ height: "45%" }}></div>
                                            <div className="chart-bar" style={{ height: "90%" }}></div>
                                            <div className="chart-bar" style={{ height: "70%" }}></div>
                                            <div className="chart-bar" style={{ height: "86%" }}></div>
                                            <div className="chart-bar" style={{ height: "95%" }}></div>
                                            <div className="chart-bar" style={{ height: "75%" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="metric-card">
                            <h4>⚠️ 오류 발생률</h4>
                            <div className="metric-chart" id="error-rate-chart">
                                <div className="chart-placeholder">
                                    📊 시간별 오류율 차트
                                    <div className="error-stats">
                                        <div className="error-item">
                                            <span className="error-level error">오류</span>
                                            <span className="error-count">12</span>
                                        </div>
                                        <div className="error-item">
                                            <span className="error-level warning">경고</span>
                                            <span className="error-count">47</span>
                                        </div>
                                        <div className="error-item">
                                            <span className="error-level info">정보</span>
                                            <span className="error-count">2,341</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="metric-card">
                            <h4>⚡ 응답 시간</h4>
                            <div className="metric-chart" id="response-time-chart">
                                <div className="chart-placeholder">
                                    📊 응답 시간 분포 차트
                                    <div className="response-stats">
                                        <div className="response-item">
                                            <span className="response-label">P50</span>
                                            <span className="response-value">180ms</span>
                                        </div>
                                        <div className="response-item">
                                            <span className="response-label">P90</span>
                                            <span className="response-value">450ms</span>
                                        </div>
                                        <div className="response-item">
                                            <span className="response-label">P99</span>
                                            <span className="response-value">1.2s</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="metric-card">
                            <h4>🖥️ 시스템 리소스</h4>
                            <div className="metric-chart" id="system-resources-chart">
                                <div className="chart-placeholder">
                                    📊 CPU/메모리 사용률
                                    <div className="resource-stats">
                                        <div className="resource-item">
                                            <span className="resource-label">CPU</span>
                                            <div className="resource-bar">
                                                <div className="resource-fill" style={{ width: "65%" }}></div>
                                            </div>
                                            <span className="resource-value">65%</span>
                                        </div>
                                        <div className="resource-item">
                                            <span className="resource-label">메모리</span>
                                            <div className="resource-bar">
                                                <div className="resource-fill" style={{ width: "78%" }}></div>
                                            </div>
                                            <span className="resource-value">78%</span>
                                        </div>
                                        <div className="resource-item">
                                            <span className="resource-label">디스크</span>
                                            <div className="resource-bar">
                                                <div className="resource-fill" style={{ width: "42%" }}></div>
                                            </div>
                                            <span className="resource-value">42%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 알림 및 경고 섹션 */}
                <div className="alerts-section">
                    <div className="section-header">
                        <h3 className="section-title">
                            <div className="section-icon">🚨</div>
                            알림 및 경고
                        </h3>
                        <div className="section-controls">
                            <button className="btn btn-secondary" id="manage-alerts">
                                ⚙️ 알림 설정
                            </button>
                            <button className="btn btn-primary" id="create-alert">
                                + 새 알림 규칙
                            </button>
                        </div>
                    </div>

                    <div className="alerts-grid">
                        <div className="alert-card warning">
                            <div className="alert-header">
                                <div className="alert-icon">⚠️</div>
                                <div className="alert-title">높은 메모리 사용률</div>
                                <div className="alert-time">5분 전</div>
                            </div>
                            <div className="alert-message">
                                메모리 사용률이 80%를 초과했습니다. 시스템 성능에 영향을 줄 수 있습니다.
                            </div>
                            <div className="alert-actions">
                                <button className="alert-btn primary">조치하기</button>
                                <button className="alert-btn secondary">무시</button>
                            </div>
                        </div>

                        <div className="alert-card error">
                            <div className="alert-header">
                                <div className="alert-icon">🔥</div>
                                <div className="alert-title">API 응답 오류 증가</div>
                                <div className="alert-time">12분 전</div>
                            </div>
                            <div className="alert-message">
                                지난 15분간 API 오류율이 5%를 초과했습니다. 긴급 점검이 필요합니다.
                            </div>
                            <div className="alert-actions">
                                <button className="alert-btn primary">점검하기</button>
                                <button className="alert-btn secondary">무시</button>
                            </div>
                        </div>

                        <div className="alert-card info">
                            <div className="alert-header">
                                <div className="alert-icon">ℹ️</div>
                                <div className="alert-title">정기 백업 완료</div>
                                <div className="alert-time">1시간 전</div>
                            </div>
                            <div className="alert-message">
                                일일 정기 백업이 성공적으로 완료되었습니다.
                            </div>
                            <div className="alert-actions">
                                <button className="alert-btn secondary">확인</button>
                            </div>
                        </div>

                        <div className="alert-card success">
                            <div className="alert-header">
                                <div className="alert-icon">✅</div>
                                <div className="alert-title">시스템 업데이트 완료</div>
                                <div className="alert-time">3시간 전</div>
                            </div>
                            <div className="alert-message">
                                보안 패치 업데이트가 성공적으로 적용되었습니다.
                            </div>
                            <div className="alert-actions">
                                <button className="alert-btn secondary">확인</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 로그 설정 섹션 */}
                <div className="log-settings-section">
                    <div className="section-header">
                        <h3 className="section-title">
                            <div className="section-icon">⚙️</div>
                            로그 관리 설정
                        </h3>
                    </div>

                    <div className="settings-grid">
                        <div className="setting-card">
                            <h4>📝 로그 보존 정책</h4>
                            <div className="setting-options">
                                <div className="setting-item">
                                    <label>기본 보존 기간</label>
                                    <select id="log-retention">
                                        <option value="7">7일</option>
                                        <option value="30">30일</option>
                                        <option value="90">90일</option>
                                        <option value="365">1년</option>
                                    </select>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="auto-cleanup" />
                                        자동 정리 활성화
                                    </label>
                                    <p>설정된 기간이 지난 로그를 자동으로 삭제합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>압축 보관</label>
                                    <select id="compression-policy">
                                        <option value="none">압축 안함</option>
                                        <option value="7days">7일 후 압축</option>
                                        <option value="30days">30일 후 압축</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="setting-card">
                            <h4>🔔 알림 설정</h4>
                            <div className="setting-options">
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="error-alerts" />
                                        오류 알림
                                    </label>
                                    <p>시스템 오류 발생시 즉시 알림을 받습니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="performance-alerts" />
                                        성능 알림
                                    </label>
                                    <p>시스템 성능 저하시 알림을 받습니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>임계값 설정</label>
                                    <div className="threshold-settings">
                                        <div className="threshold-item">
                                            <span>오류율</span>
                                            <input type="number" value="5" min="1" max="100" readOnly />
                                            <span>%</span>
                                        </div>
                                        <div className="threshold-item">
                                            <span>응답시간</span>
                                            <input type="number" value="1000" min="100" max="10000" readOnly />
                                            <span>ms</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="setting-card">
                            <h4>📊 모니터링 설정</h4>
                            <div className="setting-options">
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="detailed-logging" />
                                        상세 로깅
                                    </label>
                                    <p>더 자세한 디버그 정보를 기록합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="user-activity-log" />
                                        사용자 활동 로그
                                    </label>
                                    <p>사용자의 활동을 추적하여 기록합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>로그 레벨</label>
                                    <select id="default-log-level">
                                        <option value="debug">DEBUG</option>
                                        <option value="info">INFO</option>
                                        <option value="warning">WARNING</option>
                                        <option value="error">ERROR</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="setting-card">
                            <h4>🔒 보안 설정</h4>
                            <div className="setting-options">
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="security-logging" />
                                        보안 이벤트 로깅
                                    </label>
                                    <p>로그인 시도, 권한 변경 등을 기록합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="ip-tracking" />
                                        IP 주소 추적
                                    </label>
                                    <p>요청의 IP 주소를 기록합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="sensitive-data-mask" />
                                        민감 데이터 마스킹
                                    </label>
                                    <p>로그에서 민감한 정보를 자동으로 마스킹합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

function getFilteredLogs({ filters, logs, currentPage, settings }) {
    let filtered = [...logs];

    // 레벨 필터
    if (filters.level !== 'all') {
        filtered = filtered.filter(log => log.level === filters.level);
    }

    // 서비스 필터
    if (filters.service !== 'all') {
        filtered = filtered.filter(log => log.service === filters.service);
    }

    // 검색 필터
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(log =>
            log.message.toLowerCase().includes(searchTerm) ||
            log.service.toLowerCase().includes(searchTerm) ||
            (log.userId && log.userId.toLowerCase().includes(searchTerm)) ||
            (log.ip && log.ip.includes(searchTerm))
        );
    }

    // 시간 필터
    if (filters.timerange !== 'custom') {
        const now = new Date();
        let startTime;

        switch (filters.timerange) {
            case '1h':
                startTime = new Date(now.getTime() - 60 * 60 * 1000);
                break;
            case '6h':
                startTime = new Date(now.getTime() - 6 * 60 * 60 * 1000);
                break;
            case '24h':
                startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                break;
            case '7d':
                startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '30d':
                startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
        }

        if (startTime) {
            filtered = filtered.filter(log => new Date(log.timestamp) >= startTime);
        }
    } else if (filters.startDate && filters.endDate) {
        const startTime = new Date(filters.startDate);
        const endTime = new Date(filters.endDate);

        filtered = filtered.filter(log => {
            const logTime = new Date(log.timestamp);
            return logTime >= startTime && logTime <= endTime;
        });
    }

    // 정렬 (최신순)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // 페이지네이션
    const startIndex = (currentPage - 1) * settings.logsPerPage;
    const endIndex = startIndex + settings.logsPerPage;

    // settotalLogs(filtered.length);
    // totalLogs = filtered.length;
    return filtered.slice(startIndex, endIndex);
}

function RenderLogs({ filteredLogs }) {
    return (
        <>
            {filteredLogs.length === 0 && (
                RenderEmptyLogs()
            )}
            {filteredLogs.map((log) => (
                renderLogEntry(log)
            ))}
        </>
    );
}

function RenderEmptyLogs() {
    return (
        <div className="empty-logs">
            <div className="empty-icon">📭</div>
            <h3>로그가 없습니다</h3>
            <p>선택한 조건에 맞는 로그가 없습니다.<br />필터를 조정하거나 다른 시간 범위를 선택해보세요.</p>
        </div>
    );
}

function renderLogEntry(log) {
    const timestamp = formatTimestamp(log.timestamp);
    const timeAgo = getTimeAgo(log.timestamp);
    return (
        <div className={`log-entry level-${log.level}`} key={log.id}>
            <div className="log-timestamp" title={timestamp}>{timeAgo}</div>
            <div className={`log-level ${log.level}`}>{log.level}</div>
            <div className="log-service">{log.service}</div>
            <div className="log-message">{log.message}</div>
            <div className="log-actions">
                <button className="log-action-btn view"
                // onclick="LogManager.viewLogDetail('${log.id}')"
                >
                    👁️
                </button>
                <button className="log-action-btn copy"
                // onclick="LogManager.copyLogMessage('${log.id}')"
                >
                    📋
                </button>
            </div>
        </div>
    );
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
    });
}

function getTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffSeconds < 60) {
        return `${diffSeconds}초 전`;
    } else if (diffMinutes < 60) {
        return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
        return `${diffHours}시간 전`;
    } else {
        return date.toLocaleDateString('ko-KR');
    }
}