'use client';
import { useState, useEffect } from 'react';
import { formatDate, formatNumber, modalheader } from '@/utill/utill';

export default function ApikeysPage() {

    const providers = {
        'openai': {
            name: 'OpenAI',
            icon: '🤖',
            color: '#10B981',
            models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'gpt-4-vision-preview'],
            website: 'https://platform.openai.com/api-keys',
            testEndpoint: 'https://api.openai.com/v1/models'
        },
        'anthropic': {
            name: 'Anthropic',
            icon: '🧠',
            color: '#8B5CF6',
            models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
            website: 'https://console.anthropic.com/account/keys',
            testEndpoint: 'https://api.anthropic.com/v1/messages'
        },
        'google': {
            name: 'Google AI',
            icon: '🔍',
            color: '#3B82F6',
            models: ['gemini-pro', 'gemini-pro-vision', 'gemini-ultra'],
            website: 'https://makersuite.google.com/app/apikey',
            testEndpoint: 'https://generativelanguage.googleapis.com/v1/models'
        },
        'cohere': {
            name: 'Cohere',
            icon: '⚡',
            color: '#F59E0B',
            models: ['command', 'command-light', 'command-nightly'],
            website: 'https://dashboard.cohere.ai/api-keys',
            testEndpoint: 'https://api.cohere.ai/v1/models'
        },
        'huggingface': {
            name: 'Hugging Face',
            icon: '🤗',
            color: '#EF4444',
            models: ['custom-models'],
            website: 'https://huggingface.co/settings/tokens',
            testEndpoint: 'https://api-inference.huggingface.co/models'
        }
    }

    const apiKeys = [
        {
            id: 'key_001',
            name: 'OpenAI Production',
            provider: 'openai',
            keyPreview: 'sk-...4a2f',
            status: 'active',
            usage: {
                current: 15420,
                limit: 50000,
                percentage: 30.84
            },
            cost: {
                thisMonth: 67.45,
                lastMonth: 52.30
            },
            lastUsed: '2024-06-24T16:30:00Z',
            created: '2024-06-01T10:00:00Z',
            models: ['gpt-4', 'gpt-3.5-turbo'],
            notes: '프로덕션 환경용 메인 키'
        },
        {
            id: 'key_002',
            name: 'Claude Research',
            provider: 'anthropic',
            keyPreview: 'sk-ant-...8b9c',
            status: 'active',
            usage: {
                current: 8750,
                limit: 25000,
                percentage: 35.0
            },
            cost: {
                thisMonth: 23.80,
                lastMonth: 18.95
            },
            lastUsed: '2024-06-24T14:20:00Z',
            created: '2024-06-10T15:30:00Z',
            models: ['claude-3-sonnet', 'claude-3-haiku'],
            notes: '연구 및 실험용'
        },
        {
            id: 'key_003',
            name: 'Google Gemini Test',
            provider: 'google',
            keyPreview: 'AIza...Xy1z',
            status: 'inactive',
            usage: {
                current: 2100,
                limit: 10000,
                percentage: 21.0
            },
            cost: {
                thisMonth: 5.20,
                lastMonth: 12.40
            },
            lastUsed: '2024-06-20T09:45:00Z',
            created: '2024-06-15T12:00:00Z',
            models: ['gemini-pro'],
            notes: '테스트 목적으로 생성'
        },
        {
            id: 'key_004',
            name: 'Cohere Development',
            provider: 'cohere',
            keyPreview: 'co-...9d8e',
            status: 'warning',
            usage: {
                current: 4500,
                limit: 5000,
                percentage: 90.0
            },
            cost: {
                thisMonth: 15.60,
                lastMonth: 8.75
            },
            lastUsed: '2024-06-24T11:15:00Z',
            created: '2024-06-05T14:20:00Z',
            models: ['command'],
            notes: '개발 환경용 - 한도 초과 주의'
        }
    ]

    const [newKey, setnewKey] = useState(false);

    return (
        <div className="app-container">
            <div className="container">

                <div className="header">
                    <div className="header-title">
                        <div>
                            <h1 className="page-title">API 키 관리</h1>
                            <p className="page-subtitle">AI 서비스 API 키를 안전하게 관리하세요</p>
                        </div>
                        <div className="header-controls">
                            <div className="security-badge">
                                <span>🔒</span>
                                <span>256-bit 암호화</span>
                            </div>
                            <button className="primary-btn" id="add-api-key-btn"
                                onClick={() => setnewKey(true)}>
                                <span>+</span>
                                <span>새 API 키</span>
                            </button>
                        </div>
                    </div>
                </div>

                {newKey && (
                    <NewApiform setnewKey={setnewKey} providers={providers} />
                )}

                <div className="api-keys-toolbar">
                    <div className="toolbar-left">
                        <div className="search-container">
                            <div className="search-input-wrapper">
                                <input type="text"
                                    className="search-input"
                                    placeholder="API 키 검색..."
                                    id="api-key-search" />
                                <div className="search-icon">🔍</div>
                            </div>
                        </div>

                        <div className="filter-group">
                            <select className="filter-select" id="provider-filter">
                                <option value="all">모든 제공업체</option>
                                {Object.entries(providers).map(([key, provider]) =>
                                    (<option key={key} value={key}>{provider.icon} {provider.name}</option>)
                                )}
                            </select>

                            <select className="filter-select" id="status-filter">
                                <option value="all">모든 상태</option>
                                <option value="active">활성</option>
                                <option value="inactive">비활성</option>
                                <option value="warning">경고</option>
                                <option value="error">오류</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <button className="tool-btn" id="test-all-keys" title="모든 키 테스트">
                            <span>🧪</span>
                            <span>전체 테스트</span>
                        </button>
                        <button className="tool-btn" id="export-keys" title="키 목록 내보내기">
                            <span>📥</span>
                            <span>내보내기</span>
                        </button>
                        <button className="tool-btn" id="import-keys" title="키 목록 가져오기">
                            <span>📤</span>
                            <span>가져오기</span>
                        </button>
                    </div>
                </div>

                <div className="api-keys-stats">
                    <div className="stat-card">
                        <div
                            className="stat-icon"
                            style={{
                                background: 'linear-gradient(135deg, #10B981, #059669)',
                            }}
                        >
                            🔑
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{apiKeys.length}</div>
                            <div className="stat-label">총 API 키</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div
                            className="stat-icon"
                            style={{ background: "linear-gradient(135deg, #3B82F6, #1D4ED8)" }}
                        >
                            ✅
                        </div>
                        <div className="stat-content">
                            <div className="stat-value">{apiKeys.filter(k => k.status === 'active').length}</div>
                            <div className="stat-label">활성 키</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}>⚠️</div>
                        <div className="stat-content">
                            <div className="stat-value">{apiKeys.filter(k => k.status === 'warning').length}</div>
                            <div className="stat-label">경고 상태</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: "linear-gradient(135deg, #8B5CF6, #7C3AED)" }}>💰</div>
                        <div className="stat-content">
                            <div className="stat-value">${apiKeys.reduce((sum, k) => sum + k.cost.thisMonth, 0).toFixed(2)}</div>
                            <div className="stat-label">이번 달 비용</div>
                        </div>
                    </div>
                </div>

                <div className="providers-section">
                    <h3 className="section-title">
                        <span>🔗</span>
                        <span>지원 AI 제공업체</span>
                    </h3>
                    <div className="providers-grid">
                        {Object.entries(providers).map(([key, provider]) => (
                            <div className="provider-card" data-provider={key} key={key}>
                                <div className="provider-header">
                                    <div
                                        className="provider-icon"
                                        style={{ backgroundColor: provider.color }}
                                    >{provider.icon}</div>
                                    <div className="provider-info">
                                        <div className="provider-name">{provider.name}</div>
                                        <div className="provider-count">{apiKeys.filter(k => k.provider === key).length}개 키</div>
                                    </div>
                                </div>
                                <div className="provider-models">
                                    {provider.models.slice(0, 3).map(model => (<span key={model} className="model-tag">{model}</span>))}
                                    {provider.models.length > 3 ? (<span className="model-more">+{provider.models.length - 3}</span>) : ''}
                                </div>
                                <div className="provider-actions">
                                    <button
                                        className="provider-btn"
                                    // onClick={addApiKey(key)}
                                    >키 추가</button>
                                    <button
                                        className="provider-btn secondary"
                                        onClick={() => window.open(provider.website, '_blank')}
                                    >사이트</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="api-keys-container" id="api-keys-container">
                    {/* API 키 목록이 여기에 렌더링됩니다 */}
                    <RenderApiKeys apiKeys={apiKeys} providers={providers} />
                </div>




            </div>
        </div>
    );
}

function RenderApiKeys({ apiKeys, providers }) {
    return (
        <>
            {apiKeys.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">🔑</div>
                    <h3>API 키가 없습니다</h3>
                    <p>새 API 키를 추가하여 AI 서비스를 연결하세요.</p>
                    <button className="primary-btn" onClick={() => ApiKeyManager.addApiKey()}>
                        첫 번째 API 키 추가
                    </button>
                </div>
            ) : (
                <div className="api-keys-grid">
                    {apiKeys.map((apiKey, index) => (
                        <div key={index}>
                            {/* <renderApiKeyCard apikey={apiKey}/> */}
                            {renderApiKeyCard({ apiKey, providers })}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

function renderApiKeyCard({ apiKey, providers }) {
    const provider = providers[apiKey.provider];
    const statusInfo = getStatusInfo(apiKey.status);
    const [onEdit, setonEdit] = useState(false);

    return (
        <>
            <div className={`api-key-card ${apiKey.status}`} data-key-id={apiKey.id}>
                <div className="api-key-header">
                    <div className="api-key-provider">
                        <div
                            className="provider-icon"
                            style={{ backgroundColor: provider.color }}
                        >{provider.icon}</div>
                        <div className="provider-info">
                            <div className="provider-name">{provider.name}</div>
                            <div className="api-key-name">{apiKey.name}</div>
                        </div>
                    </div>
                    <div className="api-key-status">
                        <div className={`status-indicator status-${apiKey.status}`} title={statusInfo.description}>
                            {statusInfo.icon}
                        </div>
                        <div className="api-key-menu">
                            <button className="menu-btn"
                            // onClick="ApiKeyManager.showKeyMenu('${apiKey.id}')"
                            >⋮</button>
                        </div>
                    </div>
                </div>

                <div className="api-key-preview">
                    <span className="key-label">API 키:</span>
                    <span className="key-value">{apiKey.keyPreview}</span>
                    <button className="copy-btn"
                        //  onClick="ApiKeyManager.copyKey('${apiKey.id}')"
                        title="클립보드에 복사">📋</button>
                </div>

                <div className="api-key-usage">
                    <div className="usage-header">
                        <span>사용량</span>
                        <span>{apiKey.usage.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="usage-bar">
                        <div
                            className="usage-fill"
                            style={{
                                width: `${apiKey.usage.percentage}%`,
                                backgroundColor: getUsageColor(apiKey.usage.percentage)
                            }}
                        ></div>
                    </div>
                    <div className="usage-details">
                        {formatNumber(apiKey.usage.current)} / {formatNumber(apiKey.usage.limit)} 토큰
                    </div>
                </div>

                <div className="api-key-stats">
                    <div className="stat-item">
                        <div className="stat-label">이번 달 비용</div>
                        <div className="stat-value cost">${apiKey.cost.thisMonth}</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-label">마지막 사용</div>
                        <div className="stat-value">{formatDate(apiKey.lastUsed, 'MM/DD HH:mm')}</div>
                    </div>
                </div>

                <div className="api-key-models">
                    {apiKey.models.map(model => (<span key={model} className="model-tag">${model}</span>))}
                </div>

                <div className="api-key-actions">
                    <button className="action-btn test"
                        //  onClick="ApiKeyManager.testApiKey('${apiKey.id}')"
                        title="연결 테스트">
                        🧪 테스트
                    </button>
                    <button className="action-btn edit"
                        onClick={() => setonEdit(true)}
                        title="편집">
                        ✏️ 편집
                    </button>
                    <button className="action-btn ${apiKey.status === 'active' ? 'disable' : 'enable'}"
                        // onClick="ApiKeyManager.toggleApiKey('${apiKey.id}')"
                        title="${apiKey.status === 'active' ? '비활성화' : '활성화'}">
                        {apiKey.status === 'active' ? '⏸️ 비활성화' : '▶️ 활성화'}
                    </button>
                </div>

                {apiKey.notes ? (
                    <div className="api-key-notes">
                        <div className="notes-icon">📝</div>
                        <div className="notes-text">{apiKey.notes}</div>
                    </div>
                ) : ''}
            </div>

            {onEdit && (
                <EditApiKey setonEdit={setonEdit} apiKey={apiKey} providers={providers} />
            )}
        </>
    );
}

function EditApiKey({ setonEdit, apiKey, providers }) {
    const [formData, setFormData] = useState(apiKey);
    return (
        <>
            <div className="modal-overlay active">
                <div className="modal">
                    {modalheader({ headerTitle: "API 키 편집", setModalClose: setonEdit })}

                    <div className="modal-body">
                        <form id="edit-api-key-form" className="api-key-form">
                            <div className="form-group">
                                <label htmlFor="edit-key-name">키 이름 *</label>
                                <input
                                    type="text"
                                    id="edit-key-name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-key-notes">메모</label>
                                <textarea id="edit-key-notes" name="notes" rows="3" value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-key-status">상태</label>
                                <select id="edit-key-status" name="status" value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="active">활성</option>
                                    <option value="inactive">비활성</option>
                                </select>
                            </div>

                            <div className="api-key-info">
                                <div className="info-item">
                                    <span className="info-label">제공업체:</span>
                                    <span className="info-value">{providers[apiKey.provider].name}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">생성일:</span>
                                    <span className="info-value">{formatDate(apiKey.created, 'YYYY-MM-DD HH:mm')}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">마지막 사용:</span>
                                    <span className="info-value">{apiKey.lastUsed ? formatDate(apiKey.lastUsed, 'YYYY-MM-DD HH:mm') : '사용 안함'}</span>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="secondary-btn"
                            onClick={() => setnewKey(false)}
                        >취소</button>
                        <button type="button" className="primary-btn"
                        //  onClick="ApiKeyManager.saveApiKey()"
                        >저장</button>
                    </div>


                </div>
            </div>
        </>
    );

}

function getUsageColor(percentage) {
    if (percentage >= 90) return '#EF4444';
    if (percentage >= 70) return '#F59E0B';
    if (percentage >= 50) return '#3B82F6';
    return '#10B981';
}

function getStatusInfo(status) {
    const statusMap = {
        active: { icon: '✅', description: '정상 작동' },
        inactive: { icon: '⏸️', description: '비활성화됨' },
        warning: { icon: '⚠️', description: '주의 필요' },
        error: { icon: '❌', description: '오류 발생' }
    };
    return statusMap[status] || statusMap.inactive;
}

function NewApiform({ setnewKey, providers }) {
    const [formData, setFormData] = useState([]);
    return (
        <>
            <div className="modal-overlay active">
                <div className="modal">
                    {modalheader({ headerTitle: "새 API 키 추가", setModalClose: setnewKey })}

                    <div className="modal-body">
                        <form id="add-api-key-form" className="api-key-form">
                            <div className="form-group">
                                <label htmlFor="key-provider">AI 제공업체 *</label>
                                <select id="key-provider" name="provider" required>
                                    <option value="">제공업체 선택</option>
                                    {Object.entries(providers).map(([key, p]) => (
                                        <option key={key} value={key}>{p.icon} {p.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="key-name">키 이름 *</label>
                                <input type="text" id="key-name" name="name" required placeholder="예: Production API Key" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="api-key-value">API 키 *</label>
                                <div className="key-input-wrapper">
                                    <input type="password" id="api-key-value" name="apiKey" required placeholder="API 키를 입력하세요" />
                                    <button type="button" className="toggle-visibility"
                                    // onClick="ApiKeyManager.toggleKeyVisibility('api-key-value')"
                                    >👁️</button>
                                </div>
                                <div className="input-help">키는 암호화되어 안전하게 저장됩니다</div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="key-notes">메모 (선택사항)</label>
                                <textarea id="key-notes" name="notes" placeholder="이 API 키에 대한 설명을 입력하세요" rows="3"></textarea>
                            </div>

                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        id="test-on-save"
                                        name="testOnSave"
                                        checked={formData.testOnSave}
                                        onChange={(e) => setFormData({ ...formData, testOnSave: e.target.checked })}
                                    />
                                    저장 후 연결 테스트 실행
                                </label>
                            </div>

                            <div className="security-notice">
                                <div className="notice-icon">🔒</div>
                                <div className="notice-text">
                                    <strong>보안 정보:</strong> API 키는 AES-256 암호화로 보호되며, 브라우저 로컬 스토리지에만 저장됩니다. 서버로 전송되지 않습니다.
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="secondary-btn"
                            onClick={() => setnewKey(false)}
                        >취소</button>
                        <button type="button" className="primary-btn"
                        //  onClick="ApiKeyManager.saveApiKey()"
                        >저장</button>
                    </div>


                </div>
            </div>
        </>
    );
}

