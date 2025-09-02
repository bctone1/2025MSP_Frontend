'use client';
import { useState, useEffect } from 'react';

export default function McpPage() {
    const [availableTools, setAvailableTools] = useState([]);
    const [logs, setLogs] = useState([]);

    const getToolName = (cap) => {
        const toolNames = {
            'read_files': '파일 읽기',
            'write_files': '파일 쓰기',
            'list_directory': '디렉토리 목록',
            'query': 'DB 쿼리',
            'insert': '데이터 삽입',
            'update': '데이터 수정',
            'delete': '데이터 삭제',
            'search': '웹 검색',
            'scrape': '웹 스크래핑',
            'fetch_url': 'URL 가져오기',
            'http_request': 'HTTP 요청',
            'webhook': '웹훅',
            'oauth': 'OAuth 인증',
            'send_email': '이메일 발송',
            'read_email': '이메일 읽기',
            'search_email': '이메일 검색',
            'execute_python': 'Python 실행',
            'execute_javascript': 'JavaScript 실행',
            'execute_shell': 'Shell 명령',
            'send_message': '메시지 발송',
            'read_messages': '메시지 읽기',
            'manage_channels': '채널 관리'
        };
        return toolNames[cap] || cap;
    };

    const getToolDescription = (cap) => {
        const descriptions = {
            'read_files': '파일 내용을 읽어옵니다',
            'write_files': '파일에 내용을 씁니다',
            'list_directory': '디렉토리의 파일 목록을 가져옵니다',
            'query': '데이터베이스에서 데이터를 조회합니다',
            'search': '웹에서 정보를 검색합니다',
            'send_email': '이메일을 발송합니다',
            'execute_python': 'Python 코드를 실행합니다'
        };
        return descriptions[cap] || `${cap} 기능을 제공합니다`;
    };

    const getToolIcon = (cap) => {
        const icons = {
            'read_files': '📖',
            'write_files': '✏️',
            'list_directory': '📁',
            'query': '🔍',
            'search': '🌐',
            'send_email': '📧',
            'execute_python': '🐍',
            'send_message': '💬'
        };
        return icons[cap] || '🛠️';
    };






    const [metrics, setMetrics] = useState({
        totalRequests: 180,
        successfulRequests: 0,
        failedRequests: 0,
        averageResponseTime: 0,
        uptimePercentage: 100
    });

    const [securitySettings, setSecuritySettings] = useState({
        requireAuthentication: true,
        encryptConnections: true,
        allowUnsafeOperations: false,
        maxConcurrentConnections: 10,
        connectionTimeout: 10000
    });

    const [activeTab, setActiveTab] = useState('servers');

    const connectionStatus = {
        'disconnected': { label: '연결 끊김', icon: '⭕', color: '#6B7280' },
        'connecting': { label: '연결 중', icon: '🔄', color: '#F59E0B' },
        'connected': { label: '연결됨', icon: '✅', color: '#10B981' },
        'error': { label: '오류', icon: '❌', color: '#EF4444' },
        'reconnecting': { label: '재연결 중', icon: '🔄', color: '#8B5CF6' }
    }

    const [serverTypes] = useState({
        'filesystem': {
            name: '파일시스템',
            icon: '📁',
            color: '#3B82F6',
            description: '로컬 파일시스템에 접근',
            capabilities: ['read_files', 'write_files', 'list_directory'],
            defaultConfig: {
                rootPath: '',
                allowedExtensions: ['.txt', '.md', '.json', '.py', '.js'],
                maxFileSize: 10485760 // 10MB
            }
        },
        'database': {
            name: '데이터베이스',
            icon: '🗄️',
            color: '#10B981',
            description: '데이터베이스 연결 및 쿼리',
            capabilities: ['query', 'insert', 'update', 'delete'],
            defaultConfig: {
                host: 'localhost',
                port: 5432,
                database: '',
                username: '',
                password: '',
                ssl: false
            }
        },
        'web_search': {
            name: '웹 검색',
            icon: '🌐',
            color: '#8B5CF6',
            description: '웹 검색 및 스크래핑',
            capabilities: ['search', 'scrape', 'fetch_url'],
            defaultConfig: {
                searchEngine: 'google',
                maxResults: 10,
                enableJavaScript: false,
                timeout: 30000
            }
        },
        'api_client': {
            name: 'API 클라이언트',
            icon: '🔌',
            color: '#F59E0B',
            description: '외부 API 호출',
            capabilities: ['http_request', 'webhook', 'oauth'],
            defaultConfig: {
                baseUrl: '',
                headers: {},
                authentication: 'none',
                timeout: 30000
            }
        },
        'email': {
            name: '이메일',
            icon: '📧',
            color: '#EF4444',
            description: '이메일 송수신',
            capabilities: ['send_email', 'read_email', 'search_email'],
            defaultConfig: {
                provider: 'smtp',
                host: '',
                port: 587,
                username: '',
                password: '',
                encryption: 'tls'
            }
        },
        'calendar': {
            name: '캘린더',
            icon: '📅',
            color: '#EC4899',
            description: '캘린더 일정 관리',
            capabilities: ['create_event', 'read_events', 'update_event', 'delete_event'],
            defaultConfig: {
                provider: 'google',
                calendarId: 'primary',
                timezone: 'Asia/Seoul'
            }
        },
        'code_execution': {
            name: '코드 실행',
            icon: '💻',
            color: '#6366F1',
            description: '코드 실행 환경',
            capabilities: ['execute_python', 'execute_javascript', 'execute_shell'],
            defaultConfig: {
                runtime: 'python3',
                timeout: 60000,
                memoryLimit: 512,
                networkAccess: false
            }
        },
        'slack': {
            name: 'Slack',
            icon: '💬',
            color: '#4A154B',
            description: 'Slack 메시지 및 채널 관리',
            capabilities: ['send_message', 'read_messages', 'manage_channels'],
            defaultConfig: {
                botToken: '',
                signingSecret: '',
                defaultChannel: '#general'
            }
        }
    });





    const [mcpServers] = useState([
        {
            id: 'mcp_001',
            name: '로컬 파일시스템',
            type: 'filesystem',
            status: 'connected',
            config: {
                rootPath: '/workspace',
                allowedExtensions: ['.txt', '.md', '.json', '.py', '.js'],
                maxFileSize: 10485760
            },
            url: 'mcp://localhost:8001/filesystem',
            version: '1.0.0',
            lastConnected: '2024-06-24T16:45:00Z',
            uptime: 99.8,
            requestCount: 1247,
            errorCount: 3,
            avgResponseTime: 45,
            capabilities: ['read_files', 'write_files', 'list_directory'],
            security: {
                authenticated: true,
                encrypted: true,
                permissions: ['read', 'write']
            }
        },
        {
            id: 'mcp_002',
            name: 'PostgreSQL 데이터베이스',
            type: 'database',
            status: 'connected',
            config: {
                host: 'localhost',
                port: 5432,
                database: 'ai_platform',
                username: 'ai_user',
                ssl: true
            },
            url: 'mcp://localhost:8002/database',
            version: '2.1.0',
            lastConnected: '2024-06-24T16:30:00Z',
            uptime: 99.9,
            requestCount: 856,
            errorCount: 1,
            avgResponseTime: 120,
            capabilities: ['query', 'insert', 'update', 'delete'],
            security: {
                authenticated: true,
                encrypted: true,
                permissions: ['read', 'write']
            }
        },
        {
            id: 'mcp_003',
            name: '웹 검색 엔진',
            type: 'web_search',
            status: 'connecting',
            config: {
                searchEngine: 'google',
                maxResults: 10,
                enableJavaScript: false,
                timeout: 30000
            },
            url: 'mcp://api.search.com:8003/search',
            version: '1.5.2',
            lastConnected: '2024-06-24T15:20:00Z',
            uptime: 98.5,
            requestCount: 2341,
            errorCount: 12,
            avgResponseTime: 1850,
            capabilities: ['search', 'scrape', 'fetch_url'],
            security: {
                authenticated: true,
                encrypted: true,
                permissions: ['read']
            }
        },
        {
            id: 'mcp_004',
            name: 'Slack 통합',
            type: 'slack',
            status: 'error',
            config: {
                botToken: 'xoxb-***',
                signingSecret: '***',
                defaultChannel: '#ai-assistant'
            },
            url: 'mcp://hooks.slack.com:8004/slack',
            version: '3.0.1',
            lastConnected: '2024-06-24T14:10:00Z',
            uptime: 95.2,
            requestCount: 432,
            errorCount: 23,
            avgResponseTime: 750,
            capabilities: ['send_message', 'read_messages', 'manage_channels'],
            security: {
                authenticated: false,
                encrypted: true,
                permissions: []
            },
            error: 'Authentication failed: Invalid bot token'
        },
        {
            id: 'mcp_005',
            name: 'Python 코드 실행기',
            type: 'code_execution',
            status: 'disconnected',
            config: {
                runtime: 'python3',
                timeout: 60000,
                memoryLimit: 512,
                networkAccess: false
            },
            url: 'mcp://localhost:8005/python',
            version: '1.2.0',
            lastConnected: '2024-06-24T12:00:00Z',
            uptime: 0,
            requestCount: 0,
            errorCount: 0,
            avgResponseTime: 0,
            capabilities: ['execute_python', 'install_packages'],
            security: {
                authenticated: true,
                encrypted: true,
                permissions: ['execute']
            }
        }
    ]);



    useEffect(() => {
        const tools = [];
        mcpServers
            .filter(server => server.status === 'connected')
            .forEach(server => {
                // const serverType = serverTypes[server.type];

                server.capabilities.forEach(capability => {
                    tools.push({
                        id: `${server.id}_${capability}`,
                        name: getToolName(capability),
                        description: getToolDescription(capability),
                        icon: getToolIcon(capability),
                        serverId: server.id,
                        serverName: server.name,
                        capability: capability,
                        available: true,
                    });
                });
            });

        setAvailableTools(tools);
    }, [mcpServers, serverTypes]);




    return (

        <div className="container">

            <div className="header">
                <div className="header-title">
                    <div>
                        <h1 className="page-title">MCP 관리</h1>
                        <p className="page-subtitle">Model Context Protocol 서버 연결 및 도구 관리</p>
                    </div>
                    <div className="header-controls">
                        <div className="mcp-status">
                            <div className="status-indicator">
                                <span className="status-dot active"></span>
                                <span>2개 연결 활성</span>
                            </div>
                        </div>
                        <button className="primary-btn" id="add-mcp-server-btn">
                            <span>+</span>
                            <span>서버 추가</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mcp-dashboard">
                <div className="dashboard-stats">
                    <StatCard icon="🔌" gradient="#3B82F6, #1D4ED8" label="총 서버" value={mcpServers.length} />
                    <StatCard icon="✅" gradient="#10B981, #059669" label="연결됨" value={mcpServers.filter(s => s.status === 'connected').length} />
                    <StatCard icon="🛠️" gradient="#8B5CF6, #7C3AED" label="사용 가능한 도구" value={availableTools.length} />
                    <StatCard icon="📊" gradient="#F59E0B, #D97706" label="총 요청" value={metrics.totalRequests.toLocaleString()} />
                </div>

                <div className="mcp-tabs">
                    <div className="tab-navigation">
                        {['servers', 'tools', 'monitoring', 'security', 'logs'].map(tab => (
                            <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                                {tab === 'servers' && '서버 관리'}
                                {tab === 'tools' && '도구 목록'}
                                {tab === 'monitoring' && '모니터링'}
                                {tab === 'security' && '보안 설정'}
                                {tab === 'logs' && '로그'}
                            </button>
                        ))}
                    </div>

                    <div className="tab-content">
                        {activeTab === 'servers' && <ServersTab servers={mcpServers} serverTypes={serverTypes} connectionStatus={connectionStatus} />}
                        {activeTab === 'tools' && <ToolsTab tools={availableTools} />}
                        {activeTab === 'monitoring' && <MonitoringTab metrics={metrics} servers={mcpServers} serverTypes={serverTypes} connectionStatus={connectionStatus} />}
                        {activeTab === 'security' && <SecurityTab securitySettings={securitySettings} setSecuritySettings={setSecuritySettings} />}
                        {activeTab === 'logs' && <LogsTab logs={logs} />}
                    </div>
                </div>
            </div>




        </div>

    );
}
function renderToolsGrid(tools) {
    return (
        <>
            {tools.map((tool) => (
                <div className="tool-card" data-tool-id={tool.id} key={tool.id}>
                    <div className="tool-header">
                        <div className="tool-icon">{tool.icon}</div>
                        <div className={`tool-status ${tool.available ? 'available' : 'unavailable'}`}>
                            {tool.available ? '✅' : '❌'}
                        </div>
                    </div>
                    <div className="tool-info">
                        <div className="tool-name">{tool.name}</div>
                        <div className="tool-description">{tool.description}</div>
                        <div className="tool-server">서버: {tool.serverName}</div>
                    </div>
                    <div className="tool-actions">
                        <button
                            className="action-btn"
                            onClick={() => MCPManager.testTool(tool.id)}
                            title="테스트"
                        >
                            🧪
                        </button>
                        <button
                            className="action-btn"
                            onClick={() => MCPManager.viewToolDocs(tool.id)}
                            title="문서"
                        >
                            📖
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}



function StatCard({ icon, gradient, label, value }) {
    return (
        <div className="stat-card">
            <div className="stat-icon" style={{ background: `linear-gradient(135deg, ${gradient})` }}>{icon}</div>
            <div className="stat-content">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
            </div>
        </div>
    );
}

function ServersTab({ servers, serverTypes, connectionStatus }) {
    return (
        <div className="tab-pane active" id="servers-tab">
            <div className="servers-section">
                <div className="section-header">
                    <h3>MCP 서버 목록</h3>
                    <div className="section-controls">
                        <div className="filter-group">
                            <select className="filter-select" id="server-type-filter">
                                <option value="all">모든 유형</option>
                                {Object.entries(serverTypes).map(([key, type]) => (
                                    <option key={key} value={key}>
                                        {type.icon} {type.name}
                                    </option>
                                ))}
                            </select>
                            <select className="filter-select" id="server-status-filter">
                                <option value="all">모든 상태</option>
                                {Object.entries(connectionStatus).map(([key, status]) => (
                                    <option key={key} value={key}>
                                        {status.icon} {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="tool-btn"
                        // onclick="MCPManager.refreshAllConnections()"
                        >
                            🔄 새로고침</button>
                    </div>
                </div>
                <div className="servers-grid" id="servers-grid">
                    {renderServerCards({ servers, serverTypes, connectionStatus })}
                </div>
            </div>
        </div>
    );
}

function ToolsTab({ tools }) {
    // console.log(tools);
    return (
        <div className="tab-pane active" id="tools-tab">
            <div className="tools-section">
                <div className="section-header">
                    <h3>사용 가능한 도구</h3>
                    <div className="section-controls">
                        <input type="text" className="search-input" placeholder="도구 검색..." id="tools-search" />
                        <button
                            className="tool-btn"
                        // onclick="MCPManager.refreshTools()"
                        >🔄 새로고침</button>
                    </div>
                </div>
                <div className="tools-grid" id="tools-grid">
                    {renderToolsGrid(tools)}
                </div>
            </div>
        </div>
    );
}

function MonitoringTab({ metrics, servers, serverTypes, connectionStatus }) {
    return (
        <div className="tab-pane active" id="monitoring-tab">
            <div className="monitoring-section">
                <div className="metrics-overview">
                    <h3>성능 지표</h3>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div className="metric-header">
                                <h4>요청 성공률</h4>
                                <span className="metric-trend positive">↗ +2.1%</span>
                            </div>
                            <div className="metric-value">{((metrics.successfulRequests / metrics.totalRequests) * 100).toFixed(1)}%</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-header">
                                <h4>평균 응답 시간</h4>
                                <span className="metric-trend negative">↘ -15ms</span>
                            </div>
                            <div className="metric-value">{metrics.averageResponseTime}ms</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-header">
                                <h4>가동률</h4>
                                <span className="metric-trend positive">↗ +0.1%</span>
                            </div>
                            <div className="metric-value">{metrics.uptimePercentage}%</div>
                        </div>
                    </div>
                </div>
                <div className="server-health" id="server-health">
                    {renderServerHealth({ servers, serverTypes, connectionStatus })}
                </div>
            </div>
        </div>
    );
}

function renderServerHealth({ servers, serverTypes, connectionStatus }) {

    return (
        <>
            <div className="health-overview">
                <h4>서버 상태 모니터링</h4>
                <div className="health-grid">
                    {servers.map(server => {
                        const serverType = serverTypes[server.type];
                        const healthScore = calculateHealthScore(server);

                        return (
                            <div className="health-card" key={server.id}>
                                <div className="health-header">
                                    <div className="server-info">
                                        <span
                                            className="server-icon"
                                            style={{ color: serverType.color }}
                                        >
                                            {serverType.icon}
                                        </span>
                                        <span className="server-name">{server.name}</span>
                                    </div>
                                    <div className={`health-score ${getHealthClass(healthScore)}`}>
                                        {healthScore}%
                                    </div>
                                </div>
                                <div className="health-metrics">
                                    <div className="health-metric">
                                        <span className="metric-label">가동률</span>
                                        <div className="metric-bar">
                                            <div
                                                className="metric-fill"
                                                style={{ width: `${server.uptime}%` }}
                                            ></div>
                                        </div>
                                        <span className="metric-value">{server.uptime}%</span>
                                    </div>
                                    <div className="health-metric">
                                        <span className="metric-label">응답시간</span>
                                        <div className="metric-bar">
                                            <div
                                                className="metric-fill"
                                                style={{
                                                    width: `${Math.max(0, 100 - server.avgResponseTime / 20)}%`
                                                }}
                                            ></div>
                                        </div>
                                        <span className="metric-value">{server.avgResponseTime}ms</span>
                                    </div>
                                    <div className="health-metric">
                                        <span className="metric-label">성공률</span>
                                        <div className="metric-bar">
                                            <div
                                                className="metric-fill"
                                                style={{
                                                    width: `${((server.requestCount - server.errorCount) / server.requestCount) *
                                                        100 || 0
                                                        }%`
                                                }}
                                            ></div>
                                        </div>
                                        <span className="metric-value">
                                            {(
                                                ((server.requestCount - server.errorCount) / server.requestCount) *
                                                100 || 0
                                            ).toFixed(1)}
                                            %
                                        </span>
                                    </div>
                                </div>
                            </div>

                        );
                    })}
                </div>
            </div>
        </>
    );
}

function getHealthClass(score) {
    if (score >= 90) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 50) return 'warning';
    return 'critical';
}


function calculateHealthScore(server) {
    if (server.status !== 'connected') return 0;

    const uptimeScore = server.uptime;
    const responseScore = Math.max(0, 100 - (server.avgResponseTime / 20));
    const errorScore = Math.max(0, 100 - (server.errorCount / server.requestCount * 100));

    return Math.round((uptimeScore + responseScore + errorScore) / 3);
}

function SecurityTab({ securitySettings, setSecuritySettings }) {

    const handleChange = (e) => {
        const { id, checked, value, type } = e.target;
        alert(id);
        // setSecuritySettings(prev => ({
        //     ...prev,
        //     [id]: type === 'checkbox' ? checked : parseInt(value)
        // }));
    };

    return (
        <div className="tab-pane active" id="security-tab">
            <div className="security-section">
                <h3>보안 설정</h3>
                <div className="security-options">
                    <div className="security-group">
                        <h4>연결 보안</h4>
                        <div className="security-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={securitySettings.requireAuthentication ? 'checked' : ''}
                                    id="require-auth"
                                    onChange={handleChange}
                                />
                                인증 필수
                            </label>
                            <p>모든 MCP 연결에 인증을 요구합니다.</p>
                        </div>
                        <div className="security-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={securitySettings.encryptConnections ? 'checked' : ''}
                                    id="encrypt-connections"
                                    onChange={handleChange}
                                />
                                연결 암호화
                            </label>
                            <p>모든 MCP 통신을 암호화합니다.</p>
                        </div>
                    </div>
                    <div className="security-group">
                        <h4>실행 권한</h4>
                        <div className="security-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={securitySettings.allowUnsafeOperations ? 'checked' : ''}
                                    id="allow-unsafe"
                                    onChange={handleChange}
                                />
                                위험한 작업 허용
                            </label>
                            <p>파일 삭제, 시스템 명령 등 위험할 수 있는 작업을 허용합니다.</p>
                        </div>
                    </div>
                    <div className="security-group">
                        <h4>연결 제한</h4>
                        <div className="security-item">
                            <label htmlFor="max-connections">최대 동시 연결 수</label>
                            <input
                                type="number"
                                id="max-connections"
                                value={securitySettings.maxConcurrentConnections}
                                min="1"
                                max="100"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="security-item">
                            <label htmlFor="connection-timeout">연결 타임아웃 (ms)</label>
                            <input
                                type="number"
                                id="connection-timeout"
                                value={securitySettings.connectionTimeout}
                                min="1000"
                                max="300000"
                                step="1000"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="security-actions">
                    <button
                        className="primary-btn"
                    // onclick={saveSecuritySettings()}
                    >
                        설정 저장
                    </button>
                    <button
                        className="secondary-btn"
                    // onclick={resetSecuritySettings()}
                    >
                        기본값 복원
                    </button>
                </div>
            </div>
        </div>
    );
}

function LogsTab({ logs }) {
    return (
        <div className="tab-pane active" id="logs-tab">
            <div className="logs-section">
                <div className="section-header">
                    <h3>MCP 로그</h3>
                    <div className="section-controls">
                        <select className="filter-select" id="log-level-filter">
                            <option value="all">모든 레벨</option>
                            <option value="info">정보</option>
                            <option value="warning">경고</option>
                            <option value="error">오류</option>
                            <option value="debug">디버그</option>
                        </select>
                        <button
                            className="tool-btn"
                        // onclick="MCPManager.clearLogs()"
                        >
                            🗑️ 로그 지우기
                        </button>

                        <button
                            className="tool-btn"
                        // onclick="MCPManager.exportLogs()"
                        >
                            📥 내보내기
                        </button>
                    </div>
                </div>
                <div className="logs-container" id="logs-container">
                    {renderLogs(logs)}
                </div>
            </div>
        </div>
    );
}

function renderLogs(logs) {
    if (logs.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h3>로그가 없습니다</h3>
                <p>MCP 활동이 시작되면 로그가 표시됩니다.</p>
            </div>
        );
    }

    // return logs.slice(-100).reverse().map(log =>
    //     <div className="log-entry log-${log.level}">
    //         <div className="log-time">${MetaLLM.utils.formatDate(log.timestamp, 'HH:mm:ss')}</div>
    //         <div className="log-level">${log.level.toUpperCase()}</div>
    //         <div className="log-server">${log.server || 'SYSTEM'}</div>
    //         <div className="log-message">${log.message}</div>
    //         ${log.details ? `<div className="log-details">${JSON.stringify(log.details, null, 2)}</div>` : ''}
    //     </div>
    // );
}





function renderServerCards({ servers, serverTypes, connectionStatus }) {
    return (
        <>
            {servers.map((server) => {
                const serverType = serverTypes[server.type];
                const status = connectionStatus[server.status];

                return (
                    <div className={`server-card ${server.status}`} data-server-id={server.id} key={server.id}>
                        <div className="server-header">
                            <div
                                className="server-icon"
                                style={{
                                    backgroundColor: `${serverType.color}20`,
                                    color: serverType.color,
                                }}
                            >
                                {serverType.icon}
                            </div>
                            <div className="server-status">
                                <div
                                    className={`status-indicator status-${server.status}`}
                                    title={status.label}
                                >
                                    {status.icon}
                                </div>
                                <div className="server-menu">
                                    <button
                                        className="menu-btn"
                                        onClick={() => MCPManager.showServerMenu(server.id)}
                                    >
                                        ⋮
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="server-info">
                            <div className="server-name">{server.name}</div>
                            <div className="server-type">{serverType.name}</div>
                            <div className="server-url">{server.url}</div>
                            <div className="server-version">v{server.version}</div>
                        </div>

                        {server.status === 'connected' && (
                            <div className="server-metrics">
                                <div className="metric-item">
                                    <span className="metric-label">가동률</span>
                                    <span className="metric-value">{server.uptime}%</span>
                                </div>
                                <div className="metric-item">
                                    <span className="metric-label">요청</span>
                                    <span className="metric-value">{server.requestCount}</span>
                                </div>
                                <div className="metric-item">
                                    <span className="metric-label">응답시간</span>
                                    <span className="metric-value">{server.avgResponseTime}ms</span>
                                </div>
                            </div>
                        )}

                        {server.status === 'error' && (
                            <div className="server-error">
                                <div className="error-icon">⚠️</div>
                                <div className="error-message">{server.error}</div>
                            </div>
                        )}

                        <div className="server-capabilities">
                            {server.capabilities.slice(0, 3).map((cap, index) => (
                                <span className="capability-tag" key={index}>{cap}</span>
                            ))}
                            {server.capabilities.length > 3 && (
                                <span className="capability-more">
                                    +{server.capabilities.length - 3}
                                </span>
                            )}
                        </div>

                        <div className="server-actions">
                            {server.status === 'connected' ? (
                                <button
                                    className="action-btn"
                                    onClick={() => MCPManager.disconnectServer(server.id)}
                                    title="연결 해제"
                                >
                                    🔌
                                </button>
                            ) : (
                                <button
                                    className="action-btn"
                                    onClick={() => MCPManager.connectServer(server.id)}
                                    title="연결"
                                >
                                    🔗
                                </button>
                            )}
                            <button
                                className="action-btn"
                                onClick={() => MCPManager.testServer(server.id)}
                                title="테스트"
                            >
                                🧪
                            </button>
                            <button
                                className="action-btn"
                                onClick={() => MCPManager.editServer(server.id)}
                                title="편집"
                            >
                                ⚙️
                            </button>
                            <button
                                className="action-btn"
                                onClick={() => MCPManager.deleteServer(server.id)}
                                title="삭제"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                );
            })}
        </>
    );
}