'use client';
import "@/adminStyle/providers.css";
import "@/adminStyle/common.css";


import { useState } from 'react';

export default function Providers() {
    const providers = [
        {
            id: 'openai',
            name: 'OpenAI',
            type: 'llm',
            status: 'active',
            region: 'us',
            endpoint: 'https://api.openai.com/v1',
            apiKey: 'sk-...',
            models: ['gpt-4', 'gpt-3.5-turbo', 'gpt-4-vision-preview', 'dall-e-3'],
            todayCalls: 15420,
            successRate: 99.2,
            avgLatency: 1.2,
            todayCost: 284.50,
            monthCost: 8920.30,
            lastCheck: new Date(Date.now() - 5 * 60 * 1000), // 5분 전
            features: ['chat', 'completion', 'embedding', 'image-generation'],
            limits: {
                rateLimit: '3000/min',
                dailyLimit: '100000',
                monthlyLimit: '1000000'
            }
        },
        {
            id: 'anthropic',
            name: 'Anthropic',
            type: 'llm',
            status: 'active',
            region: 'us',
            endpoint: 'https://api.anthropic.com/v1',
            apiKey: 'sk-ant-...',
            models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
            todayCalls: 8920,
            successRate: 98.8,
            avgLatency: 1.5,
            todayCost: 156.20,
            monthCost: 4680.90,
            lastCheck: new Date(Date.now() - 2 * 60 * 1000), // 2분 전
            features: ['chat', 'completion'],
            limits: {
                rateLimit: '2000/min',
                dailyLimit: '50000',
                monthlyLimit: '500000'
            }
        },
        {
            id: 'google',
            name: 'Google Gemini',
            type: 'llm',
            status: 'active',
            region: 'us',
            endpoint: 'https://generativelanguage.googleapis.com/v1',
            apiKey: 'AIza...',
            models: ['gemini-pro', 'gemini-pro-vision', 'gemini-ultra'],
            todayCalls: 6540,
            successRate: 97.5,
            avgLatency: 1.8,
            todayCost: 98.60,
            monthCost: 2958.00,
            lastCheck: new Date(Date.now() - 1 * 60 * 1000), // 1분 전
            features: ['chat', 'completion', 'vision'],
            limits: {
                rateLimit: '1000/min',
                dailyLimit: '30000',
                monthlyLimit: '300000'
            }
        },
        {
            id: 'cohere',
            name: 'Cohere',
            type: 'llm',
            status: 'testing',
            region: 'us',
            endpoint: 'https://api.cohere.ai/v1',
            apiKey: 'co-...',
            models: ['command', 'command-light', 'embed-english-v3.0'],
            todayCalls: 1240,
            successRate: 96.8,
            avgLatency: 2.1,
            todayCost: 24.80,
            monthCost: 744.00,
            lastCheck: new Date(Date.now() - 15 * 60 * 1000), // 15분 전
            features: ['chat', 'completion', 'embedding'],
            limits: {
                rateLimit: '500/min',
                dailyLimit: '10000',
                monthlyLimit: '100000'
            }
        },
        {
            id: 'huggingface',
            name: 'Hugging Face',
            type: 'llm',
            status: 'active',
            region: 'eu',
            endpoint: 'https://api-inference.huggingface.co',
            apiKey: 'hf_...',
            models: ['llama-2-70b', 'code-llama-34b', 'mistral-7b-instruct'],
            todayCalls: 3680,
            successRate: 94.2,
            avgLatency: 3.2,
            todayCost: 52.40,
            monthCost: 1572.00,
            lastCheck: new Date(Date.now() - 8 * 60 * 1000), // 8분 전
            features: ['chat', 'completion', 'code-generation'],
            limits: {
                rateLimit: '1000/hour',
                dailyLimit: '20000',
                monthlyLimit: '200000'
            }
        },
        {
            id: 'replicate',
            name: 'Replicate',
            type: 'image',
            status: 'active',
            region: 'us',
            endpoint: 'https://api.replicate.com/v1',
            apiKey: 'r8_...',
            models: ['stable-diffusion-xl', 'llama-2-70b-chat', 'whisper'],
            todayCalls: 2150,
            successRate: 92.5,
            avgLatency: 8.5,
            todayCost: 78.90,
            monthCost: 2367.00,
            lastCheck: new Date(Date.now() - 3 * 60 * 1000), // 3분 전
            features: ['image-generation', 'image-editing', 'audio-transcription'],
            limits: {
                rateLimit: '100/min',
                dailyLimit: '5000',
                monthlyLimit: '50000'
            }
        },
        {
            id: 'stability',
            name: 'Stability AI',
            type: 'image',
            status: 'inactive',
            region: 'us',
            endpoint: 'https://api.stability.ai/v1',
            apiKey: 'sk-...',
            models: ['stable-diffusion-xl-1024-v1-0', 'stable-diffusion-v1-6'],
            todayCalls: 0,
            successRate: 0,
            avgLatency: 0,
            todayCost: 0,
            monthCost: 0,
            lastCheck: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2시간 전
            features: ['image-generation', 'image-editing'],
            limits: {
                rateLimit: '150/min',
                dailyLimit: '10000',
                monthlyLimit: '100000'
            }
        },
        {
            id: 'elevenlabs',
            name: 'ElevenLabs',
            type: 'speech',
            status: 'error',
            region: 'us',
            endpoint: 'https://api.elevenlabs.io/v1',
            apiKey: 'el_...',
            models: ['eleven_multilingual_v2', 'eleven_turbo_v2'],
            todayCalls: 0,
            successRate: 0,
            avgLatency: 0,
            todayCost: 0,
            monthCost: 156.30,
            lastCheck: new Date(Date.now() - 30 * 60 * 1000), // 30분 전
            features: ['text-to-speech', 'voice-cloning'],
            limits: {
                rateLimit: '200/min',
                dailyLimit: '50000',
                monthlyLimit: '500000'
            },
            error: 'API key expired or invalid'
        }
    ];

    const totalProviders = providers.length;
    const activeProviders = providers.filter(p => p.status === 'active').length;
    const totalCalls = providers.reduce((sum, p) => sum + p.todayCalls, 0);
    const totalCost = providers.reduce((sum, p) => sum + p.monthCost, 0);

    const [filters, setfilters] = useState({
        search: '',
        status: 'all',
        type: 'all',
        region: 'all'
    });

    const [sortBy, setsortBy] = useState('name');
    const [sortOrder, setsortOrder] = useState('asc');
    const [viewMode, setviewMode] = useState('grid');

    const filteredProviders = providers.filter(provider => {
        const matchesSearch = !filters.search ||
            provider.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            provider.models.some(model => model.toLowerCase().includes(filters.search.toLowerCase()));

        const matchesStatus = filters.status === 'all' || provider.status === filters.status;
        const matchesType = filters.type === 'all' || provider.type === filters.type;
        const matchesRegion = filters.region === 'all' || provider.region === filters.region;

        return matchesSearch && matchesStatus && matchesType && matchesRegion;
    }).sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();


        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });



    // console.log(filteredProviders);
    const handleSortOrderToggle = () => {
        setsortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };





    return (
        <>
            <div className="page-container">
                {/* 페이지 헤더  */}
                <div className="page-header">
                    <div className="header-top">
                        <div className="header-info">
                            <h1 className="page-title">AI 프로바이더 관리</h1>
                            <p className="page-subtitle">AI 모델 제공업체와 API 키를 통합 관리하세요</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn btn-secondary" id="sync-all-providers">
                                🔄 전체 동기화
                            </button>
                            <button className="btn btn-primary" id="add-provider">
                                ➕ 프로바이더 추가
                            </button>
                        </div>
                    </div>
                </div>

                {/* 프로바이더 통계 */}
                <div className="provider-stats">
                    <div className="provider-stat-card">
                        <div className="stat-icon providers-total">🔗</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-providers">{totalProviders}</div>
                            <div className="stat-label">총 프로바이더</div>
                            <div className="stat-change positive">+2개 추가</div>
                        </div>
                    </div>

                    <div className="provider-stat-card">
                        <div className="stat-icon providers-active">⚡</div>
                        <div className="stat-content">
                            <div className="stat-value" id="active-providers">{activeProviders}</div>
                            <div className="stat-label">활성 프로바이더</div>
                            <div className="stat-change positive">75% 가동률</div>
                        </div>
                    </div>

                    <div className="provider-stat-card">
                        <div className="stat-icon api-calls">📊</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-api-calls">{formatNumber(totalCalls)}</div>
                            <div className="stat-label">오늘 API 호출</div>
                            <div className="stat-change positive">+18% 증가</div>
                        </div>
                    </div>

                    <div className="provider-stat-card">
                        <div className="stat-icon api-cost">💰</div>
                        <div className="stat-content">
                            <div className="stat-value" id="total-cost">${totalCost.toFixed(2)}</div>
                            <div className="stat-label">이번 달 비용</div>
                            <div className="stat-change positive">예산 내 운영</div>
                        </div>
                    </div>
                </div>

                {/* 프로바이더 필터 및 검색 */}
                <div className="providers-toolbar">
                    <div className="toolbar-left">
                        <div className="search-box">
                            <input type="text" id="provider-search" placeholder="프로바이더 검색..." className="search-input" value={filters.search}
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
                            <select id="status-filter" className="filter-select" value={filters.status}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        status: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 상태</option>
                                <option value="active">활성</option>
                                <option value="inactive">비활성</option>
                                <option value="error">오류</option>
                                <option value="testing">테스트</option>
                            </select>

                            <select id="type-filter" className="filter-select" value={filters.type}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        type: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 유형</option>
                                <option value="llm">LLM</option>
                                <option value="image">이미지</option>
                                <option value="embedding">임베딩</option>
                                <option value="speech">음성</option>
                            </select>

                            <select id="region-filter" className="filter-select" value={filters.region}
                                onChange={(e) =>
                                    setfilters((prev) => ({
                                        ...prev,
                                        region: e.target.value
                                    }))
                                }
                            >
                                <option value="all">모든 지역</option>
                                <option value="us">미국</option>
                                <option value="eu">유럽</option>
                                <option value="asia">아시아</option>
                            </select>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div className="sort-controls">
                            <select id="sort-by" className="sort-select" value={sortBy}
                                onChange={(e) => setsortBy(e.target.value)}
                            >
                                <option value="name">이름</option>
                                <option value="status">상태</option>
                                <option value="cost">비용</option>
                                <option value="calls">호출 수</option>
                                <option value="latency">응답시간</option>
                            </select>
                            <button className="sort-order-btn" onClick={handleSortOrderToggle}>
                                <span id="sort-icon">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                            </button>
                        </div>

                        <div className="view-toggle">
                            <button className="view-btn active" data-view="grid">⊞</button>
                            <button className="view-btn" data-view="list">📋</button>
                        </div>
                    </div>
                </div>

                {/* 프로바이더 목록 */}
                <div className="providers-container">
                    {/* 그리드 뷰 */}
                    <div className="providers-grid-view active" id="providers-grid">
                        {/* 프로바이더 카드들이 여기에 동적으로 추가됩니다 */}
                        {<RenderProvidersGrid filteredProviders={filteredProviders} />}
                    </div>

                    {/* 리스트 뷰 */}
                    <div className="providers-list-view" id="providers-list">
                        <div className="table-container">
                            <table className="providers-table">
                                <thead>
                                    <tr>
                                        <th>프로바이더</th>
                                        <th>유형</th>
                                        <th>상태</th>
                                        <th>모델 수</th>
                                        <th>오늘 호출</th>
                                        <th>평균 응답시간</th>
                                        <th>성공률</th>
                                        <th>비용</th>
                                        <th>마지막 확인</th>
                                        <th>액션</th>
                                    </tr>
                                </thead>
                                <tbody id="providers-tbody">
                                    {/* 프로바이더 데이터가 여기에 동적으로 추가됩니다 */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 프로바이더 설정 패널 */}
                <div className="provider-settings-panel" id="settings-panel" style={{ display: 'none' }}>
                    <div className="settings-header">
                        <h3>프로바이더 설정</h3>
                        <button className="close-panel-btn" id="close-settings">✕</button>
                    </div>
                    <div className="settings-content" id="settings-content">
                        {/* 설정 내용이 여기에 동적으로 로드됩니다 */}
                    </div>
                </div>
            </div >

        </>
    );
}

function RenderProvidersGrid({ filteredProviders }) {
    return (
        <>
            {filteredProviders.length == 0 && (
                <div className="empty-state">
                    <div className="empty-icon">🔗</div>
                    <h3>프로바이더가 없습니다</h3>
                    <p>새 프로바이더를 추가하여 시작하세요.</p>
                    <button className="btn btn-primary"
                        onClick={() => { alert("준비중입니다."); }}
                    // onClick="providerManager.showAddProviderModal()"
                    >
                        프로바이더 추가
                    </button>
                </div>
            )}

            {filteredProviders.map(provider => (
                <div className={`provider-card ${provider.status}`} data-provider-id={provider.id} key={provider.id}>
                    <div className="provider-header">
                        <div className="provider-info">
                            <div className={`provider-logo ${provider.id}`}>
                                {getProviderIcon(provider.id)}
                            </div>
                            <div className="provider-details">
                                <div className="provider-name">{provider.name}</div>
                                <div className="provider-type">{getTypeText(provider.type)}</div>
                                <div className="provider-status">
                                    <div className={`porvider-status-indicator ${provider.status}`}></div>
                                    <span className={`status-text ${provider.status}`}>{getStatusText(provider.status)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="provider-menu">
                            <button className="menu-btn">⋮</button>
                        </div>
                    </div>

                    <div className="provider-metrics">
                        <div className="metric-item">
                            <div className="metric-value">{formatNumber(provider.todayCalls)}</div>
                            <div className="metric-label">오늘 호출</div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-value">{provider.avgLatency}초</div>
                            <div className="metric-label">응답시간</div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-value">{provider.successRate}%</div>
                            <div className="metric-label">성공률</div>
                        </div>
                        <div className="metric-item">
                            <div className="metric-value">{provider.todayCost.toFixed(0)}</div>
                            <div className="metric-label">오늘 비용</div>
                        </div>
                    </div>

                    <div className="provider-models">
                        {provider.models.slice(0, 3).map(model =>
                            (<span className="model-tag" key={model}>{model}</span>)
                        )}
                        {provider.models.length > 3 ?
                            (<span className="model-more">+{provider.models.length - 3}</span>) : ''
                        }
                    </div>

                    <div className="provider-actions">
                        <button className="action-btn test" data-action="test" data-provider-id={`${provider.id}`}>
                            🧪 테스트
                        </button>
                        <button className="action-btn configure" data-action="configure" data-provider-id={`${provider.id}`}>
                            ⚙️ 설정
                        </button>
                        <button className={`action-btn toggle ${provider.status === 'active' ? '' : 'inactive'}`}
                            data-action="toggle" data-provider-id={`${provider.id}`}>
                            {provider.status === 'active' ? '⏸️ 비활성화' : '▶️ 활성화'}
                        </button>
                    </div>

                    {provider.error ? (
                        <div className="provider-error">
                            <div className="error-icon">⚠️</div>
                            <div className="error-message">{provider.error}</div>
                        </div>
                    ) : ''}
                </div>
            ))}
        </>
    );
}

function getProviderIcon(providerId) {
    const icons = {
        openai: 'AI',
        anthropic: 'CL',
        google: 'GM',
        cohere: 'CO',
        huggingface: '🤗',
        replicate: 'RP',
        stability: 'ST',
        elevenlabs: '11'
    };
    return icons[providerId] || 'AI';
}

function getTypeText(type) {
    const types = {
        llm: 'LLM',
        image: '이미지',
        embedding: '임베딩',
        speech: '음성'
    };
    return types[type] || type;
}

function getStatusText(status) {
    const statuses = {
        active: '활성',
        inactive: '비활성',
        error: '오류',
        testing: '테스트중'
    };
    return statuses[status] || status;
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}