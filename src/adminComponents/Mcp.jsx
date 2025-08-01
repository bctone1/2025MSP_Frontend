'use client';

import "@/adminStyle/mcp.css";

import { useState, useEffect, useMemo } from 'react';

export default function Agents() {

    const servers = useMemo(() => ([
        {
            id: 'server_001',
            name: '📁 파일시스템 서버',
            type: 'filesystem',
            protocol: 'stdio',
            url: 'file:///usr/local/bin/mcp-filesystem',
            status: 'connected',
            description: '로컬 파일 시스템 접근 및 관리',
            version: '1.2.3',
            created: '2024-06-10T09:00:00Z',
            lastActive: '2024-06-26T15:30:00Z',
            config: {
                timeout: 30,
                maxRetries: 3,
                autoReconnect: true,
                allowedPaths: ['/home/user/documents', '/tmp'],
                permissions: ['read', 'write', 'list']
            },
            metrics: {
                requests: 15420,
                errors: 12,
                avgLatency: 89,
                uptime: 99.2,
                tools: 8
            },
            tools: [
                { name: 'list_files', description: '디렉토리 파일 목록 조회' },
                { name: 'read_file', description: '파일 내용 읽기' },
                { name: 'write_file', description: '파일 내용 쓰기' },
                { name: 'create_directory', description: '디렉토리 생성' },
                { name: 'delete_file', description: '파일 삭제' },
                { name: 'move_file', description: '파일 이동' },
                { name: 'get_file_info', description: '파일 정보 조회' },
                { name: 'search_files', description: '파일 검색' }
            ]
        },
        {
            id: 'server_002',
            name: '🗄️ 데이터베이스 서버',
            type: 'database',
            protocol: 'http',
            url: 'http://localhost:3001/mcp',
            status: 'connected',
            description: 'PostgreSQL 데이터베이스 연결',
            version: '2.1.0',
            created: '2024-06-15T11:30:00Z',
            lastActive: '2024-06-26T15:32:00Z',
            config: {
                timeout: 45,
                maxRetries: 5,
                autoReconnect: true,
                database: 'production_db',
                maxConnections: 10
            },
            metrics: {
                requests: 8934,
                errors: 5,
                avgLatency: 145,
                uptime: 98.7,
                tools: 12
            },
            tools: [
                { name: 'execute_query', description: 'SQL 쿼리 실행' },
                { name: 'get_schema', description: '데이터베이스 스키마 조회' },
                { name: 'create_table', description: '테이블 생성' },
                { name: 'insert_data', description: '데이터 삽입' },
                { name: 'update_data', description: '데이터 업데이트' },
                { name: 'delete_data', description: '데이터 삭제' },
                { name: 'backup_table', description: '테이블 백업' },
                { name: 'restore_table', description: '테이블 복원' },
                { name: 'analyze_performance', description: '성능 분석' },
                { name: 'get_table_stats', description: '테이블 통계' },
                { name: 'optimize_query', description: '쿼리 최적화' },
                { name: 'monitor_connections', description: '연결 모니터링' }
            ]
        },
        {
            id: 'server_003',
            name: '🌐 웹 검색 서버',
            type: 'api',
            protocol: 'websocket',
            url: 'ws://localhost:8080/mcp',
            status: 'connecting',
            description: '외부 API 및 웹 검색 서비스',
            version: '1.5.2',
            created: '2024-06-18T14:20:00Z',
            lastActive: '2024-06-26T15:25:00Z',
            config: {
                timeout: 60,
                maxRetries: 3,
                autoReconnect: true,
                apiKeys: ['search_api', 'translation_api'],
                rateLimit: 1000
            },
            metrics: {
                requests: 23567,
                errors: 45,
                avgLatency: 234,
                uptime: 97.3,
                tools: 6
            },
            tools: [
                { name: 'web_search', description: '웹 검색 수행' },
                { name: 'fetch_url', description: 'URL 내용 가져오기' },
                { name: 'translate_text', description: '텍스트 번역' },
                { name: 'analyze_sentiment', description: '감정 분석' },
                { name: 'extract_keywords', description: '키워드 추출' },
                { name: 'summarize_text', description: '텍스트 요약' }
            ]
        },
        {
            id: 'server_004',
            name: '🛠️ 도구 서버',
            type: 'tool',
            protocol: 'sse',
            url: 'http://localhost:4000/events',
            status: 'connected',
            description: '다양한 유틸리티 도구 제공',
            version: '3.0.1',
            created: '2024-06-20T16:45:00Z',
            lastActive: '2024-06-26T15:33:00Z',
            config: {
                timeout: 30,
                maxRetries: 2,
                autoReconnect: true,
                allowedCommands: ['convert', 'compress', 'validate'],
                maxFileSize: '100MB'
            },
            metrics: {
                requests: 5678,
                errors: 8,
                avgLatency: 156,
                uptime: 99.8,
                tools: 15
            },
            tools: [
                { name: 'convert_image', description: '이미지 포맷 변환' },
                { name: 'compress_file', description: '파일 압축' },
                { name: 'extract_archive', description: '압축 파일 해제' },
                { name: 'validate_json', description: 'JSON 유효성 검사' },
                { name: 'format_code', description: '코드 포맷팅' },
                { name: 'generate_qr', description: 'QR 코드 생성' },
                { name: 'pdf_to_text', description: 'PDF 텍스트 추출' },
                { name: 'image_resize', description: '이미지 크기 조정' },
                { name: 'hash_file', description: '파일 해시 생성' },
                { name: 'encrypt_data', description: '데이터 암호화' },
                { name: 'decrypt_data', description: '데이터 복호화' },
                { name: 'validate_email', description: '이메일 유효성 검사' },
                { name: 'generate_uuid', description: 'UUID 생성' },
                { name: 'parse_csv', description: 'CSV 파싱' },
                { name: 'xml_to_json', description: 'XML to JSON 변환' }
            ]
        },
        {
            id: 'server_005',
            name: '📊 분석 서버',
            type: 'custom',
            protocol: 'stdio',
            url: '/opt/analytics/mcp-server',
            status: 'error',
            description: '데이터 분석 및 처리 전용 서버',
            version: '1.8.4',
            created: '2024-06-22T10:15:00Z',
            lastActive: '2024-06-26T14:45:00Z',
            config: {
                timeout: 120,
                maxRetries: 5,
                autoReconnect: false,
                dataPath: '/data/analytics',
                cacheSize: '1GB'
            },
            metrics: {
                requests: 2340,
                errors: 156,
                avgLatency: 890,
                uptime: 87.5,
                tools: 9
            },
            tools: [
                { name: 'analyze_data', description: '데이터 분석 수행' },
                { name: 'create_chart', description: '차트 생성' },
                { name: 'statistical_summary', description: '통계 요약' },
                { name: 'correlation_analysis', description: '상관관계 분석' },
                { name: 'regression_analysis', description: '회귀 분석' },
                { name: 'clustering', description: '클러스터링' },
                { name: 'anomaly_detection', description: '이상치 탐지' },
                { name: 'time_series_analysis', description: '시계열 분석' },
                { name: 'export_report', description: '보고서 내보내기' }
            ]
        },
        {
            id: 'server_006',
            name: '🔐 보안 서버',
            type: 'custom',
            protocol: 'http',
            url: 'https://security.local:8443/mcp',
            status: 'disconnected',
            description: '보안 및 인증 관련 서비스',
            version: '2.3.1',
            created: '2024-06-25T08:30:00Z',
            lastActive: '2024-06-26T13:15:00Z',
            config: {
                timeout: 30,
                maxRetries: 3,
                autoReconnect: true,
                sslEnabled: true,
                certPath: '/etc/ssl/certs/mcp.crt'
            },
            metrics: {
                requests: 890,
                errors: 23,
                avgLatency: 67,
                uptime: 95.2,
                tools: 7
            },
            tools: [
                { name: 'authenticate_user', description: '사용자 인증' },
                { name: 'generate_token', description: '토큰 생성' },
                { name: 'validate_certificate', description: '인증서 검증' },
                { name: 'encrypt_password', description: '패스워드 암호화' },
                { name: 'audit_log', description: '감사 로그' },
                { name: 'scan_vulnerabilities', description: '취약점 스캔' },
                { name: 'firewall_config', description: '방화벽 설정' }
            ]
        }
    ]), []);

    const [tools, setTools] = useState([]);

    useEffect(() => {
        if (!servers || servers.length === 0) return;

        const mergedTools = servers.flatMap(server =>
            server.tools.map(tool => ({
                ...tool,
                serverId: server.id,
                serverName: server.name,
                serverType: server.type,
                status: server.status === 'connected' ? 'available' : 'unavailable',
            }))
        );

        setTools(mergedTools);
    }, [servers]);

    const [currentFilters, setcurrentFilters] = useState({
        status: 'all',
        type: 'all',
        protocol: 'all',
        search: ''
    });
    const [sortBy, setsortBy] = useState('name');
    const [sortOrder, setsortOrder] = useState('asc');
    const [currentView, setcurrentView] = useState('grid');
    const detailPanelOpen = false;
    const selectedServer = null;
    const monitoringInterval = null;
    const [serverFilter, setserverFilter] = useState('all');



    const filteredServers = servers.filter(server => {
        const matchesSearch = !currentFilters.search ||
            server.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            server.description.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            server.url.toLowerCase().includes(currentFilters.search.toLowerCase());

        const matchesStatus = currentFilters.status === 'all' || server.status === currentFilters.status;
        const matchesType = currentFilters.type === 'all' || server.type === currentFilters.type;
        const matchesProtocol = currentFilters.protocol === 'all' || server.protocol === currentFilters.protocol;

        return matchesSearch && matchesStatus && matchesType && matchesProtocol;

    }).sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (sortBy === 'created') {
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
                            <h1 className="page-title">MCP 관리</h1>
                            <p className="page-subtitle">Model Context Protocol 서버를 모니터링하고 관리하세요</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" id="refresh-servers">
                                🔄 새로고침
                            </button>
                            <button className="btn btn-secondary" id="server-logs">
                                📋 로그 보기
                            </button>
                            <button className="btn btn-primary" id="add-server">
                                ➕ 서버 추가
                            </button>
                        </div>
                    </div>
                </div>

                {/* MCP 서버 통계 */}
                <div className="mcp-stats">
                    <div className="stat-card">
                        <div className="stat-icon servers-total">🖥️</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-servers">24</div>
                            <div className="stat-label">총 MCP 서버</div>
                            <div className="stat-change positive">+3개 이번 주</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon servers-connected">✅</div>
                        <div className="stat-content">
                            <div className="stat-value" id="connected-servers">18</div>
                            <div className="stat-label">연결된 서버</div>
                            <div className="stat-change positive">75% 연결률</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon servers-tools">🛠️</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-tools">156</div>
                            <div className="stat-label">사용 가능한 도구</div>
                            <div className="stat-change positive">평균 6.5개/서버</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon servers-requests">📊</div>
                        <div className="stat-content">
                            <div className="stat-value" id="daily-requests">47.2K</div>
                            <div className="stat-label">오늘 요청 수</div>
                            <div className="stat-change positive">+18% 증가</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon servers-latency">⚡</div>
                        <div className="stat-content">
                            <div className="stat-value" id="avg-latency">127ms</div>
                            <div className="stat-label">평균 응답시간</div>
                            <div className="stat-change positive">-12ms 개선</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon servers-errors">⚠️</div>
                        <div className="stat-content">
                            <div className="stat-value" id="error-rate">0.3%</div>
                            <div className="stat-label">오류율</div>
                            <div className="stat-change positive">-0.1% 감소</div>
                        </div>
                    </div>
                </div>

                {/* MCP 서버 필터 및 검색 */}
                <div className="mcp-toolbar">
                    <div className="toolbar-left">
                        <div className="search-box">
                            <input type="text" id="server-search" placeholder="서버 검색..." className="search-input" value={currentFilters.search}
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
                                <option value="connected">연결됨</option>
                                <option value="disconnected">연결 끊김</option>
                                <option value="connecting">연결 중</option>
                                <option value="error">오류</option>
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
                                <option value="filesystem">파일시스템</option>
                                <option value="database">데이터베이스</option>
                                <option value="api">API 서버</option>
                                <option value="tool">도구 서버</option>
                                <option value="custom">커스텀</option>
                            </select>

                            <select id="protocol-filter" className="filter-select" value={currentFilters.protocol}
                                onChange={(e) =>
                                    setcurrentFilters((prev) => ({
                                        ...prev,
                                        protocol: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 프로토콜</option>
                                <option value="stdio">STDIO</option>
                                <option value="sse">Server-Sent Events</option>
                                <option value="websocket">WebSocket</option>
                                <option value="http">HTTP</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div className="sort-controls">
                            <select id="sort-by" className="sort-select" value={sortBy}
                                onChange={(e) => setsortBy(e.target.value)}>
                                <option value="name">이름</option>
                                <option value="status">상태</option>
                                <option value="requests">요청 수</option>
                                <option value="latency">응답시간</option>
                                <option value="uptime">가동시간</option>
                                <option value="created">생성일</option>
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

                {/* MCP 서버 목록 */}
                <div className="servers-container">
                    {/* 그리드 뷰 */}
                    <div className="servers-grid-view active" id="servers-grid">
                        {/* 서버 카드들이 여기에 동적으로 추가됩니다 */}
                        {<RenderGridView filteredServers={filteredServers} />}
                    </div>

                    {/* 리스트 뷰 */}
                    <div className="servers-list-view" id="servers-list">
                        <div className="table-container">
                            <table className="servers-table">
                                <thead>
                                    <tr>
                                        <th>서버</th>
                                        <th>유형</th>
                                        <th>프로토콜</th>
                                        <th>상태</th>
                                        <th>도구 수</th>
                                        <th>요청 수</th>
                                        <th>응답시간</th>
                                        <th>가동시간</th>
                                        <th>마지막 활동</th>
                                        <th>액션</th>
                                    </tr>
                                </thead>
                                <tbody id="servers-tbody">
                                    {/* 서버 데이터가 여기에 동적으로 추가됩니다 */}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>

                {/* 서버 상세 패널 */}
                <div className="server-detail-panel" id="detail-panel" style={{ display: 'none' }}>
                    <div className="detail-header">
                        <h3>MCP 서버 상세 정보</h3>
                        <button className="close-panel-btn" id="close-detail">✕</button>
                    </div>
                    <div className="detail-content" id="detail-content">
                        {/* 상세 내용이 여기에 동적으로 로드됩니다 */}
                    </div>
                </div>

                {/* 도구 관리 섹션 */}
                <div className="tools-section">
                    <div className="section-header">
                        <h3 className="section-title">
                            <div className="section-icon">🛠️</div>
                            사용 가능한 도구
                        </h3>
                        <div className="section-controls">
                            <select id="tools-server-filter" className="filter-select" value={serverFilter}
                                onChange={(e) => setserverFilter(e.target.value)}
                            >
                                <option value="all">모든 서버</option>
                                {servers.map(server => (<option key={server.id} value={server.id}>{server.name}</option>))}
                            </select>


                            <button className="btn btn-secondary" id="refresh-tools">
                                🔄 도구 새로고침
                            </button>
                        </div>
                    </div>

                    <div className="tools-grid" id="tools-grid">
                        {/* 도구 카드들이 여기에 동적으로 추가됩니다 */}
                        {<RenderTools serverFilter={serverFilter} tools={tools} />}
                    </div>
                </div>

                {/* 실시간 모니터링 섹션 */}
                <div className="monitoring-section">
                    <div className="section-header">
                        <h3 className="section-title">
                            <div className="section-icon">📊</div>
                            실시간 모니터링
                        </h3>
                        <div className="section-controls">
                            <select id="monitoring-period" className="filter-select">
                                <option value="1h">1시간</option>
                                <option value="6h">6시간</option>
                                <option value="24h">24시간</option>
                                <option value="7d">7일</option>
                            </select>
                            <button className="btn btn-secondary" id="export-metrics">
                                📤 메트릭 내보내기
                            </button>
                        </div>
                    </div>

                    <div className="monitoring-grid">
                        <div className="monitoring-card">
                            <h4>📈 요청 패턴</h4>
                            <div className="chart-container" id="requests-chart">
                                <div className="chart-placeholder">
                                    📊 실시간 요청 패턴 차트
                                    <div className="mini-chart">
                                        <div className="chart-bars">
                                            <div className="chart-bar" style={{ height: '30%' }}></div>
                                            <div className="chart-bar" style={{ height: '60%' }}></div>
                                            <div className="chart-bar" style={{ height: '45%' }}></div>
                                            <div className="chart-bar" style={{ height: '80%' }}></div>
                                            <div className="chart-bar" style={{ height: '70%' }}></div>
                                            <div className="chart-bar" style={{ height: '90%' }}></div>
                                            <div className="chart-bar" style={{ height: '65%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="monitoring-card">
                            <h4>⚡ 응답시간 분포</h4>
                            <div className="chart-container" id="latency-chart">
                                <div className="chart-placeholder">
                                    📊 응답시간 분포 차트
                                    <div className="latency-stats">
                                        <div className="latency-item">
                                            <span className="latency-label">P50</span>
                                            <span className="latency-value">89ms</span>
                                        </div>
                                        <div className="latency-item">
                                            <span className="latency-label">P95</span>
                                            <span className="latency-value">234ms</span>
                                        </div>
                                        <div className="latency-item">
                                            <span className="latency-label">P99</span>
                                            <span className="latency-value">456ms</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="monitoring-card">
                            <h4>🚨 오류 현황</h4>
                            <div className="chart-container" id="errors-chart">
                                <div className="chart-placeholder">
                                    📊 오류 현황 차트
                                    <div className="error-stats">
                                        <div className="error-item">
                                            <span className="error-type">연결 오류</span>
                                            <span className="error-count">3</span>
                                        </div>
                                        <div className="error-item">
                                            <span className="error-type">타임아웃</span>
                                            <span className="error-count">7</span>
                                        </div>
                                        <div className="error-item">
                                            <span className="error-type">프로토콜 오류</span>
                                            <span className="error-count">2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="monitoring-card">
                            <h4>🔄 서버 상태 요약</h4>
                            <div className="status-summary">
                                <div className="status-item">
                                    <div className="status-dot connected"></div>
                                    <span className="status-label">연결됨</span>
                                    <span className="status-count" id="summary-connected">18</span>
                                </div>
                                <div className="status-item">
                                    <div className="status-dot disconnected"></div>
                                    <span className="status-label">연결 끊김</span>
                                    <span className="status-count" id="summary-disconnected">4</span>
                                </div>
                                <div className="status-item">
                                    <div className="status-dot connecting"></div>
                                    <span className="status-label">연결 중</span>
                                    <span className="status-count" id="summary-connecting">2</span>
                                </div>
                                <div className="status-item">
                                    <div className="status-dot error"></div>
                                    <span className="status-label">오류</span>
                                    <span className="status-count" id="summary-error">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 설정 및 로그 섹션 */}
                <div className="admin-section">
                    <div className="section-header">
                        <h3 className="section-title">
                            <div className="section-icon">⚙️</div>
                            설정 및 로그
                        </h3>
                        <div className="section-controls">
                            <button className="btn btn-secondary" id="export-config">
                                📤 설정 내보내기
                            </button>
                            <button className="btn btn-secondary" id="import-config">
                                📥 설정 가져오기
                            </button>
                        </div>
                    </div>

                    <div className="admin-grid">
                        <div className="admin-card">
                            <h4>⚙️ 글로벌 설정</h4>
                            <div className="setting-group">
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="auto-reconnect" defaultChecked />
                                        자동 재연결 활성화
                                    </label>
                                    <p>연결이 끊어진 서버에 자동으로 재연결을 시도합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>
                                        <input type="checkbox" id="health-check" defaultChecked />
                                        주기적 상태 확인
                                    </label>
                                    <p>서버 상태를 주기적으로 확인하여 모니터링합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>연결 타임아웃 (초)</label>
                                    <input type="number" id="connection-timeout" value="30" min="5" max="300" readOnly />
                                    <p>서버 연결 시 최대 대기 시간을 설정합니다.</p>
                                </div>
                                <div className="setting-item">
                                    <label>최대 재시도 횟수</label>
                                    <input type="number" id="max-retries" value="3" min="0" max="10" readOnly />
                                    <p>연결 실패 시 최대 재시도 횟수를 설정합니다.</p>
                                </div>
                            </div>
                        </div>

                        <div className="admin-card">
                            <h4>📋 시스템 로그</h4>
                            <div className="log-container" id="system-logs">
                                <div className="log-entry">
                                    <span className="log-time">14:32:15</span>
                                    <span className="log-level info">INFO</span>
                                    <span className="log-server">filesystem-01</span>
                                    <span className="log-message">서버 연결 성공</span>
                                </div>
                                <div className="log-entry">
                                    <span className="log-time">14:31:42</span>
                                    <span className="log-level warning">WARN</span>
                                    <span className="log-server">database-02</span>
                                    <span className="log-message">높은 응답 시간 감지 (1.2s)</span>
                                </div>
                                <div className="log-entry">
                                    <span className="log-time">14:30:18</span>
                                    <span className="log-level error">ERROR</span>
                                    <span className="log-server">api-server-03</span>
                                    <span className="log-message">연결 타임아웃 발생</span>
                                </div>
                                <div className="log-entry">
                                    <span className="log-time">14:29:33</span>
                                    <span className="log-level info">INFO</span>
                                    <span className="log-server">tool-server-01</span>
                                    <span className="log-message">새로운 도구 등록: file_analyzer</span>
                                </div>
                                <div className="log-entry">
                                    <span className="log-time">14:28:07</span>
                                    <span className="log-level debug">DEBUG</span>
                                    <span className="log-server">websocket-01</span>
                                    <span className="log-message">WebSocket 연결 핸드셰이크 완료</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function RenderGridView({ filteredServers }) {
    return (
        <>
            {filteredServers.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">🖥️</div>
                    <h3>MCP 서버가 없습니다</h3>
                    <p>필터 조건을 변경하거나 새로운 서버를 추가해보세요.</p>
                </div>
            )}

            {filteredServers.map(server => (
                <div className={`server-card status-${server.status}`} key={server.id}>
                    <div className="server-card-header">
                        <div className="server-info">
                            <div className={`server-icon type-${server.type}`}>
                                {getTypeIcon(server.type)}
                            </div>
                            <div className="server-details">
                                <div className="server-name">{server.name}</div>
                                <div className="server-url">{server.url}</div>
                            </div>
                        </div>
                        <div className="server-status-indicator">
                            <div className={`status-dot ${server.status}`}></div>
                            <div className={`status-text ${server.status}`}>{getStatusText(server.status)}</div>
                        </div>
                    </div>

                    <div className="server-meta">
                        <div className="meta-item">
                            <span className="meta-label">요청 수</span>
                            <span className="meta-value">{formatNumber(server.metrics.requests)}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">도구 수</span>
                            <span className="meta-value">{server.metrics.tools}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">응답시간</span>
                            <span className="meta-value">{server.metrics.avgLatency}ms</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">가동률</span>
                            <span className="meta-value">{server.metrics.uptime}%</span>
                        </div>
                    </div>

                    <div className="server-config">
                        <div className="config-item">
                            <span className="config-label">프로토콜</span>
                            <span className="config-value">
                                <span className="protocol-tag">{server.protocol.toUpperCase()}</span>
                            </span>
                        </div>
                        <div className="config-item">
                            <span className="config-label">유형</span>
                            <span className="config-value">
                                <span className="type-tag">{getTypeText(server.type)}</span>
                            </span>
                        </div>
                        <div className="config-item">
                            <span className="config-label">버전</span>
                            <span className="config-value">{server.version}</span>
                        </div>
                        <div className="config-item">
                            <span className="config-label">마지막 활동</span>
                            <span className="config-value">{formatDate(server.lastActive)}</span>
                        </div>
                    </div>

                    <div className="server-actions">
                        <button className="action-btn view"
                        // onclick="mcpManager.showServerDetail('${server.id}')"
                        >
                            👁️ 보기
                        </button>
                        <button className={`action-btn ${server.status === 'connected' ? 'disconnect' : 'connect'}`}
                        // onclick="mcpManager.toggleServer('${server.id}')"
                        >
                            {server.status === 'connected' ? '🔌 연결해제' : '🔗 연결'}
                        </button>
                        <button className="action-btn delete"
                        // onclick="mcpManager.deleteServer('${server.id}')"
                        >
                            🗑️ 삭제
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}
function RenderTools({ serverFilter, tools }) {
    const selectedServer = serverFilter === 'all' ? null : serverFilter;

    const filteredTools = selectedServer
        ? tools.filter(tool => tool.serverId === selectedServer)
        : tools;

    return (
        <>
            {filteredTools.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">🛠️</div>
                    <h3>사용 가능한 도구가 없습니다</h3>
                    <p>연결된 MCP 서버에서 제공하는 도구가 없습니다.</p>
                </div>
            )}

            {filteredTools.map((tool) => (
                <div className="tool-card" key={`${tool.serverId}-${tool.name}`}>
                    <div className="tool-header">
                        <div className="tool-icon">🛠️</div>
                        <div className={`tool-status ${tool.status}`}>
                            {tool.status === 'available' ? '사용가능' : '사용불가'}
                        </div>
                    </div>
                    <div className="tool-name">{tool.name}</div>
                    <div className="tool-description">{tool.description}</div>
                    <div className="tool-server">{tool.serverName}</div>
                </div>
            ))}
        </>
    );
}


function getTypeIcon(type) {
    const icons = {
        filesystem: '📁',
        database: '🗄️',
        api: '🌐',
        tool: '🛠️',
        custom: '⚙️'
    };
    return icons[type] || '❓';
}

function getTypeText(type) {
    const texts = {
        filesystem: '파일시스템',
        database: '데이터베이스',
        api: 'API 서버',
        tool: '도구 서버',
        custom: '커스텀'
    };
    return texts[type] || '알 수 없음';
}

function getStatusText(status) {
    const texts = {
        connected: '연결됨',
        disconnected: '연결 끊김',
        connecting: '연결 중',
        error: '오류'
    };
    return texts[status] || '알 수 없음';
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleString('ko-KR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}