'use client';
import "@/adminStyle/settings.css";

import { useState } from 'react';

export default function Settings() {

    const [pageStatus, setpageStatus] = useState('general');

    return (
        <>
            <div className="page-container">
                {/* 페이지 헤더 */}
                <div className="page-header">
                    <div className="header-top">
                        <div className="header-info">
                            <h1 className="page-title">시스템 설정</h1>
                            <p className="page-subtitle">플랫폼의 전체 설정을 관리하고 구성하세요</p>
                        </div>
                        <div className="header-actions">
                            <div className="config-status">
                                <div className="status-indicator" id="config-status">
                                    <div className="status-dot active"></div>
                                    <span className="status-text">설정 동기화됨</span>
                                </div>
                            </div>
                            <button className="btn btn-secondary" id="export-config">
                                📤 설정 내보내기
                            </button>
                            <button className="btn btn-secondary" id="import-config">
                                📥 설정 가져오기
                            </button>
                            <button className="btn btn-secondary" id="reset-config">
                                🔄 기본값 복원
                            </button>
                            <button className="btn btn-primary" id="save-all-settings">
                                💾 모든 설정 저장
                            </button>
                        </div>
                    </div>
                </div>

                {/* 설정 네비게이션 탭 */}
                <div className="settings-navigation">
                    <div className="settings-tabs">
                        <div
                            className={`settings-tab ${pageStatus === "general" ? "active" : ""}`} data-tab="general"
                            onClick={() => setpageStatus('general')}
                        >
                            <div className="tab-icon">⚙️</div>
                            <div className="tab-text">
                                <div className="tab-title">일반 설정</div>
                                <div className="tab-desc">기본 시스템 구성</div>
                            </div>
                        </div>

                        <div
                            className={`settings-tab ${pageStatus === "security" ? "active" : ""}`} data-tab="security"
                            onClick={() => setpageStatus('security')}
                        >
                            <div className="tab-icon">🔒</div>
                            <div className="tab-text">
                                <div className="tab-title">보안 설정</div>
                                <div className="tab-desc">인증 및 보안</div>
                            </div>
                        </div>

                        <div
                            className={`settings-tab ${pageStatus === "performance" ? "active" : ""}`} data-tab="performance"
                            onClick={() => setpageStatus('performance')}
                        >
                            <div className="tab-icon">⚡</div>
                            <div className="tab-text">
                                <div className="tab-title">성능 설정</div>
                                <div className="tab-desc">캐시 및 최적화</div>
                            </div>
                        </div>

                        <div
                            className={`settings-tab ${pageStatus === "email" ? "active" : ""}`} data-tab="email"
                            onClick={() => setpageStatus('email')}
                        >
                            <div className="tab-icon">📧</div>
                            <div className="tab-text">
                                <div className="tab-title">이메일 설정</div>
                                <div className="tab-desc">SMTP 및 알림</div>
                            </div>
                        </div>

                        <div
                            className={`settings-tab ${pageStatus === "storage" ? "active" : ""}`} data-tab="storage"
                            onClick={() => setpageStatus('storage')}
                        >
                            <div className="tab-icon">💾</div>
                            <div className="tab-text">
                                <div className="tab-title">스토리지 설정</div>
                                <div className="tab-desc">파일 및 데이터</div>
                            </div>
                        </div>

                        <div
                            className={`settings-tab ${pageStatus === "api" ? "active" : ""}`} data-tab="api"
                            onClick={() => setpageStatus('api')}
                        >
                            <div className="tab-icon">🔌</div>
                            <div className="tab-text">
                                <div className="tab-title">API 설정</div>
                                <div className="tab-desc">외부 연동</div>
                            </div>
                        </div>

                        <div
                            className={`settings-tab ${pageStatus === "advanced" ? "active" : ""}`} data-tab="advanced"
                            onClick={() => setpageStatus('advanced')}
                        >
                            <div className="tab-icon">🔧</div>
                            <div className="tab-text">
                                <div className="tab-title">고급 설정</div>
                                <div className="tab-desc">개발자 옵션</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 설정 컨텐츠 */}
                <div className="settings-content">
                    {/* 일반 설정 탭 */}
                    <div className={`settings-panel ${pageStatus === "general" ? "active" : ""}`} id="general-panel">
                        <div className="panel-header">
                            <h3 className="panel-title">
                                <span className="panel-icon">⚙️</span>
                                일반 설정
                            </h3>
                            <p className="panel-description">시스템의 기본 구성과 동작을 설정합니다.</p>
                        </div>

                        <div className="settings-sections">
                            {/* 기본 정보 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">📝 기본 정보</h4>
                                    <p className="section-description">플랫폼의 기본 정보를 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="platform-name">플랫폼 이름</label>
                                            <input type="text" id="platform-name" value="META LLM MSP"
                                                placeholder="플랫폼 이름을 입력하세요" readOnly />
                                            <small className="form-help">사용자에게 표시되는 플랫폼의 공식 이름입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="platform-version">버전</label>
                                            <input type="text" id="platform-version" value="1.0.0"
                                                placeholder="예: 1.0.0" readOnly />
                                            <small className="form-help">현재 플랫폼의 버전 번호입니다.</small>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="platform-description">플랫폼 설명</label>
                                        <textarea
                                            id="platform-description"
                                            rows="3"
                                            placeholder="플랫폼에 대한 설명을 입력하세요"
                                            defaultValue="AI 통합 관리 플랫폼으로 멀티 LLM을 효율적으로 관리하고 운영할 수 있습니다."
                                        />
                                        <small className="form-help">플랫폼의 목적과 기능에 대한 간단한 설명입니다.</small>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="admin-email">관리자 이메일</label>
                                            <input type="email" id="admin-email" value="admin@metallm.ai"
                                                placeholder="admin@example.com" readOnly />
                                            <small className="form-help">시스템 알림을 받을 관리자 이메일 주소입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="support-email">지원 이메일</label>
                                            <input type="email" id="support-email" value="support@metallm.ai"
                                                placeholder="support@example.com" readOnly />
                                            <small className="form-help">사용자 지원을 위한 이메일 주소입니다.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 지역화 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">🌍 지역화 설정</h4>
                                    <p className="section-description">언어, 시간대 및 지역 설정을 구성합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="default-language">기본 언어</label>
                                            <select id="default-language">
                                                <option value="ko">한국어</option>
                                                <option value="en">English</option>
                                                <option value="ja">日本語</option>
                                                <option value="zh">中文</option>
                                            </select>
                                            <small className="form-help">플랫폼의 기본 표시 언어입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="timezone">시간대</label>
                                            <select id="timezone">
                                                <option value="Asia/Seoul">Asia/Seoul (UTC+9)</option>
                                                <option value="UTC">UTC (UTC+0)</option>
                                                <option value="America/New_York">America/New_York (UTC-5)</option>
                                                <option value="Europe/London">Europe/London (UTC+0)</option>
                                                <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                                            </select>
                                            <small className="form-help">모든 시간 표시에 사용할 기본 시간대입니다.</small>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="date-format">날짜 형식</label>
                                            <select id="date-format">
                                                <option value="YYYY-MM-DD">YYYY-MM-DD (2024-06-26)</option>
                                                <option value="MM/DD/YYYY">MM/DD/YYYY (06/26/2024)</option>
                                                <option value="DD/MM/YYYY">DD/MM/YYYY (26/06/2024)</option>
                                                <option value="DD.MM.YYYY">DD.MM.YYYY (26.06.2024)</option>
                                            </select>
                                            <small className="form-help">날짜 표시 형식을 선택합니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="currency">통화</label>
                                            <select id="currency">
                                                <option value="KRW">KRW (₩)</option>
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                                <option value="JPY">JPY (¥)</option>
                                            </select>
                                            <small className="form-help">과금 및 결제에 사용할 기본 통화입니다.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 사용자 설정 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">👥 사용자 설정</h4>
                                    <p className="section-description">사용자 등록 및 관리 정책을 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="allow-registration" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">사용자 등록 허용</span>
                                                    <span className="toggle-desc">새로운 사용자의 회원가입을 허용합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="email-verification" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">이메일 인증 필수</span>
                                                    <span className="toggle-desc">회원가입 시 이메일 인증을 필수로 합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="admin-approval" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">관리자 승인 필요</span>
                                                    <span className="toggle-desc">새 사용자는 관리자 승인 후 활성화됩니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="default-user-role">기본 사용자 역할</label>
                                            <select id="default-user-role">
                                                <option value="user">일반 사용자</option>
                                                <option value="member">멤버</option>
                                                <option value="pro">프로 사용자</option>
                                            </select>
                                            <small className="form-help">신규 사용자에게 부여할 기본 역할입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="session-timeout">세션 타임아웃 (분)</label>
                                            <input type="number" id="session-timeout" value="60" min="5" max="1440" readOnly />
                                            <small className="form-help">사용자 세션이 만료되는 시간(분)입니다.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel-footer">
                            <div className="save-status" id="general-save-status"></div>
                            <button className="btn btn-primary" id="save-general-settings">
                                💾 일반 설정 저장
                            </button>
                        </div>
                    </div>

                    {/* 보안 설정 탭 */}
                    <div className={`settings-panel ${pageStatus === "security" ? "active" : ""}`} id="security-panel">
                        <div className="panel-header">
                            <h3 className="panel-title">
                                <span className="panel-icon">🔒</span>
                                보안 설정
                            </h3>
                            <p className="panel-description">시스템의 보안 정책과 인증 방식을 설정합니다.</p>
                        </div>

                        <div className="settings-sections">
                            {/* 인증 설정 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">🔐 인증 설정</h4>
                                    <p className="section-description">사용자 인증 방식과 보안 정책을 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="require-2fa" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">2단계 인증 필수</span>
                                                    <span className="toggle-desc">모든 사용자에게 2FA 설정을 필수로 요구합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="force-password-change" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">주기적 비밀번호 변경</span>
                                                    <span className="toggle-desc">사용자에게 주기적인 비밀번호 변경을 요구합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-sso" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">SSO 인증 활성화</span>
                                                    <span className="toggle-desc">Google, Microsoft 등의 SSO 로그인을
                                                        허용합니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="password-min-length">최소 비밀번호 길이</label>
                                            <input type="number" id="password-min-length" value="8" min="6" max="32" readOnly />
                                            <small className="form-help">사용자 비밀번호의 최소 길이입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="login-attempts">로그인 시도 제한</label>
                                            <input type="number" id="login-attempts" value="5" min="3" max="10" readOnly />
                                            <small className="form-help">계정 잠금 전 허용되는 로그인 실패 횟수입니다.</small>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password-requirements">비밀번호 요구사항</label>
                                        <div className="checkbox-group">
                                            <label className="checkbox-item">
                                                <input type="checkbox" id="require-uppercase" readOnly />
                                                <span>대문자 포함</span>
                                            </label>
                                            <label className="checkbox-item">
                                                <input type="checkbox" id="require-lowercase" readOnly />
                                                <span>소문자 포함</span>
                                            </label>
                                            <label className="checkbox-item">
                                                <input type="checkbox" id="require-numbers" readOnly />
                                                <span>숫자 포함</span>
                                            </label>
                                            <label className="checkbox-item">
                                                <input type="checkbox" id="require-symbols" readOnly />
                                                <span>특수문자 포함</span>
                                            </label>
                                        </div>
                                        <small className="form-help">비밀번호에 포함되어야 하는 문자 유형을 선택합니다.</small>
                                    </div>
                                </div>
                            </div>

                            {/* API 보안 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">🔌 API 보안</h4>
                                    <p className="section-description">API 접근 제어 및 보안 정책을 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-rate-limiting" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">API 속도 제한</span>
                                                    <span className="toggle-desc">API 요청 속도를 제한하여 남용을 방지합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="require-api-authentication" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">API 인증 필수</span>
                                                    <span className="toggle-desc">모든 API 요청에 인증을 요구합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="log-api-requests" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">API 요청 로깅</span>
                                                    <span className="toggle-desc">모든 API 요청을 로그에 기록합니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="rate-limit-requests">시간당 요청 제한</label>
                                            <input type="number" id="rate-limit-requests" value="1000" min="100"
                                                max="10000" readOnly />
                                            <small className="form-help">사용자당 시간당 허용되는 API 요청 수입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="api-key-expiry">API 키 만료 기간 (일)</label>
                                            <input type="number" id="api-key-expiry" value="365" min="30" max="3650" readOnly />
                                            <small className="form-help">API 키의 기본 만료 기간입니다.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 보안 모니터링 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">👁️ 보안 모니터링</h4>
                                    <p className="section-description">보안 이벤트 감지 및 알림 설정을 구성합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="detect-suspicious-activity" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">의심스러운 활동 감지</span>
                                                    <span className="toggle-desc">비정상적인 로그인 패턴을 자동으로 감지합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="alert-multiple-failures" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">연속 실패 알림</span>
                                                    <span className="toggle-desc">연속된 로그인 실패 시 관리자에게 알립니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="track-ip-changes" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">IP 변경 추적</span>
                                                    <span className="toggle-desc">사용자의 IP 주소 변경을 추적하고 기록합니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel-footer">
                            <div className="save-status" id="security-save-status"></div>
                            <button className="btn btn-primary" id="save-security-settings">
                                💾 보안 설정 저장
                            </button>
                        </div>
                    </div>

                    {/* 성능 설정 탭 */}
                    <div className={`settings-panel ${pageStatus === "performance" ? "active" : ""}`} id="performance-panel">
                        <div className="panel-header">
                            <h3 className="panel-title">
                                <span className="panel-icon">⚡</span>
                                성능 설정
                            </h3>
                            <p className="panel-description">시스템 성능 최적화를 위한 캐시 및 리소스 설정을 관리합니다.</p>
                        </div>

                        <div className="settings-sections">
                            {/* 캐시 설정 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">🚀 캐시 설정</h4>
                                    <p className="section-description">응답 속도 향상을 위한 캐시 정책을 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-redis-cache" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">Redis 캐시 활성화</span>
                                                    <span className="toggle-desc">고성능 인메모리 캐시를 사용합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-cdn" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">CDN 활성화</span>
                                                    <span className="toggle-desc">정적 자원을 CDN을 통해 배포합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-gzip" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">Gzip 압축</span>
                                                    <span className="toggle-desc">응답 데이터를 압축하여 전송 속도를 향상시킵니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="cache-ttl">기본 캐시 TTL (초)</label>
                                            <input type="number" id="cache-ttl" value="3600" min="60" max="86400" readOnly />
                                            <small className="form-help">캐시된 데이터의 기본 생존 시간입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="max-cache-size">최대 캐시 크기 (MB)</label>
                                            <input type="number" id="max-cache-size" value="1024" min="128" max="8192" readOnly />
                                            <small className="form-help">캐시에 할당할 최대 메모리 크기입니다.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 데이터베이스 최적화 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">🗄️ 데이터베이스 최적화</h4>
                                    <p className="section-description">데이터베이스 성능 최적화 설정을 관리합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-query-cache" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">쿼리 캐시</span>
                                                    <span className="toggle-desc">자주 사용되는 데이터베이스 쿼리 결과를 캐시합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-connection-pooling" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">연결 풀링</span>
                                                    <span className="toggle-desc">데이터베이스 연결을 재사용하여 성능을 향상시킵니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-read-replicas" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">읽기 전용 복제본 사용</span>
                                                    <span className="toggle-desc">읽기 쿼리를 별도의 복제본으로 분산합니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="max-connections">최대 DB 연결 수</label>
                                            <input type="number" id="max-connections" value="100" min="10" max="1000" readOnly />
                                            <small className="form-help">데이터베이스 연결 풀의 최대 크기입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="query-timeout">쿼리 타임아웃 (초)</label>
                                            <input type="number" id="query-timeout" value="30" min="5" max="300" readOnly />
                                            <small className="form-help">데이터베이스 쿼리의 최대 실행 시간입니다.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel-footer">
                            <div className="save-status" id="performance-save-status"></div>
                            <button className="btn btn-primary" id="save-performance-settings">
                                💾 성능 설정 저장
                            </button>
                        </div>
                    </div>

                    {/* 이메일 설정 탭 */}
                    <div className={`settings-panel ${pageStatus === "email" ? "active" : ""}`} id="email-panel">
                        <div className="panel-header">
                            <h3 className="panel-title">
                                <span className="panel-icon">📧</span>
                                이메일 설정
                            </h3>
                            <p className="panel-description">SMTP 서버 설정과 이메일 알림을 구성합니다.</p>
                        </div>

                        <div className="settings-sections">
                            {/* SMTP 설정 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">📨 SMTP 서버 설정</h4>
                                    <p className="section-description">이메일 발송을 위한 SMTP 서버를 구성합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="smtp-host">SMTP 호스트</label>
                                            <input type="text" id="smtp-host" value="smtp.gmail.com"
                                                placeholder="smtp.example.com" readOnly />
                                            <small className="form-help">SMTP 서버의 호스트 주소입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="smtp-port">SMTP 포트</label>
                                            <input type="number" id="smtp-port" value="587" min="25" max="65535" readOnly />
                                            <small className="form-help">SMTP 서버의 포트 번호입니다.</small>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="smtp-username">사용자명</label>
                                            <input type="text" id="smtp-username" placeholder="username@example.com" readOnly />
                                            <small className="form-help">SMTP 인증에 사용할 사용자명입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="smtp-password">비밀번호</label>
                                            <input type="password" id="smtp-password" placeholder="••••••••" readOnly />
                                            <small className="form-help">SMTP 인증에 사용할 비밀번호입니다.</small>
                                        </div>
                                    </div>

                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="smtp-tls" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">TLS/SSL 암호화</span>
                                                    <span className="toggle-desc">보안 연결을 위해 TLS/SSL을 사용합니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="from-email">발신자 이메일</label>
                                        <input type="email" id="from-email" value="noreply@metallm.ai"
                                            placeholder="noreply@example.com" readOnly />
                                        <small className="form-help">이메일 발송 시 사용할 발신자 주소입니다.</small>
                                    </div>

                                    <div className="form-actions">
                                        <button className="btn btn-secondary" id="test-smtp">
                                            ✉️ 테스트 이메일 발송
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 이메일 알림 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">🔔 이메일 알림</h4>
                                    <p className="section-description">시스템 이벤트에 대한 이메일 알림을 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="notify-user-registration" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">사용자 등록 알림</span>
                                                    <span className="toggle-desc">새 사용자 등록 시 관리자에게 알림을 보냅니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="notify-system-errors" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">시스템 오류 알림</span>
                                                    <span className="toggle-desc">시스템 오류 발생 시 즉시 알림을 보냅니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="notify-security-events" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">보안 이벤트 알림</span>
                                                    <span className="toggle-desc">의심스러운 활동 감지 시 알림을 보냅니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="notify-resource-usage" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">리소스 사용량 알림</span>
                                                    <span className="toggle-desc">리소스 사용량이 임계값을 초과할 때 알림을 보냅니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel-footer">
                            <div className="save-status" id="email-save-status"></div>
                            <button className="btn btn-primary" id="save-email-settings">
                                💾 이메일 설정 저장
                            </button>
                        </div>
                    </div>

                    {/* 스토리지 설정 탭 */}
                    <div className={`settings-panel ${pageStatus === "storage" ? "active" : ""}`} id="storage-panel">
                        <div className="panel-header">
                            <h3 className="panel-title">
                                <span className="panel-icon">💾</span>
                                스토리지 설정
                            </h3>
                            <p className="panel-description">파일 저장소와 데이터 관리 정책을 설정합니다.</p>
                        </div>

                        <div className="settings-sections">
                            {/* 파일 스토리지 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">📁 파일 스토리지</h4>
                                    <p className="section-description">파일 업로드 및 저장 정책을 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="storage-provider">스토리지 제공업체</label>
                                            <select id="storage-provider">
                                                <option value="local">로컬 스토리지</option>
                                                <option value="aws-s3">Amazon S3</option>
                                                <option value="google-cloud">Google Cloud Storage</option>
                                                <option value="azure-blob">Azure Blob Storage</option>
                                            </select>
                                            <small className="form-help">파일 저장에 사용할 스토리지 제공업체입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="max-file-size">최대 파일 크기 (MB)</label>
                                            <input type="number" id="max-file-size" value="100" min="1" max="1000" readOnly />
                                            <small className="form-help">업로드 가능한 파일의 최대 크기입니다.</small>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="allowed-file-types">허용된 파일 형식</label>
                                        <input type="text" id="allowed-file-types"
                                            value="pdf,doc,docx,txt,md,csv,xlsx,jpg,jpeg,png,gif"
                                            placeholder="pdf,doc,txt,jpg,png" readOnly />
                                        <small className="form-help">업로드를 허용할 파일 확장자를 쉼표로 구분하여 입력합니다.</small>
                                    </div>

                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="virus-scan" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">바이러스 검사</span>
                                                    <span className="toggle-desc">업로드된 파일에 대해 바이러스 검사를 수행합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="auto-backup" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">자동 백업</span>
                                                    <span className="toggle-desc">파일을 자동으로 백업 스토리지에 복사합니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 데이터 보존 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">🗂️ 데이터 보존</h4>
                                    <p className="section-description">데이터 보존 기간과 정리 정책을 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="user-data-retention">사용자 데이터 보존 (일)</label>
                                            <input type="number" id="user-data-retention" value="2555" min="30"
                                                max="3650" readOnly />
                                            <small className="form-help">사용자 데이터를 보존할 기간(일)입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="log-retention">로그 보존 (일)</label>
                                            <input type="number" id="log-retention" value="90" min="7" max="365" readOnly />
                                            <small className="form-help">시스템 로그를 보존할 기간(일)입니다.</small>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="session-data-retention">세션 데이터 보존 (일)</label>
                                            <input type="number" id="session-data-retention" value="30" min="1"
                                                max="365" readOnly />
                                            <small className="form-help">세션 데이터를 보존할 기간(일)입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="temp-file-retention">임시 파일 보존 (시간)</label>
                                            <input type="number" id="temp-file-retention" value="24" min="1" max="168" readOnly />
                                            <small className="form-help">임시 파일을 보존할 기간(시간)입니다.</small>
                                        </div>
                                    </div>

                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="auto-cleanup" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">자동 정리</span>
                                                    <span className="toggle-desc">보존 기간이 지난 데이터를 자동으로 삭제합니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel-footer">
                            <div className="save-status" id="storage-save-status"></div>
                            <button className="btn btn-primary" id="save-storage-settings">
                                💾 스토리지 설정 저장
                            </button>
                        </div>
                    </div>

                    {/* API 설정 탭 */}
                    <div className={`settings-panel ${pageStatus === "api" ? "active" : ""}`} id="api-panel">
                        <div className="panel-header">
                            <h3 className="panel-title">
                                <span className="panel-icon">🔌</span>
                                API 설정
                            </h3>
                            <p className="panel-description">외부 API 연동과 웹훅 설정을 관리합니다.</p>
                        </div>

                        <div className="settings-sections">
                            {/* 외부 API 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">🌐 외부 API 연동</h4>
                                    <p className="section-description">외부 서비스와의 API 연동을 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="api-service-item">
                                        <div className="service-header">
                                            <div className="service-info">
                                                <h5>OpenAI API</h5>
                                                <p>GPT 모델 사용을 위한 OpenAI API 설정</p>
                                            </div>
                                            <div className="service-status">
                                                <label className="toggle-label">
                                                    <input type="checkbox" id="enable-openai" readOnly />
                                                    <span className="toggle-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="service-config">
                                            <div className="form-group">
                                                <label htmlFor="openai-api-key">API 키</label>
                                                <input type="password" id="openai-api-key" placeholder="sk-..." readOnly />
                                                <small className="form-help">OpenAI API 키를 입력하세요.</small>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <label htmlFor="openai-org-id">조직 ID (선택사항)</label>
                                                    <input type="text" id="openai-org-id" placeholder="org-..." readOnly />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="openai-timeout">타임아웃 (초)</label>
                                                    <input type="number" id="openai-timeout" value="30" min="5"
                                                        max="300" readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="api-service-item">
                                        <div className="service-header">
                                            <div className="service-info">
                                                <h5>Anthropic API</h5>
                                                <p>Claude 모델 사용을 위한 Anthropic API 설정</p>
                                            </div>
                                            <div className="service-status">
                                                <label className="toggle-label">
                                                    <input type="checkbox" id="enable-anthropic" readOnly />
                                                    <span className="toggle-switch"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="service-config">
                                            <div className="form-group">
                                                <label htmlFor="anthropic-api-key">API 키</label>
                                                <input type="password" id="anthropic-api-key" placeholder="sk-ant-..." readOnly />
                                                <small className="form-help">Anthropic API 키를 입력하세요.</small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="anthropic-timeout">타임아웃 (초)</label>
                                                <input type="number" id="anthropic-timeout" value="60" min="5"
                                                    max="300" readOnly />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 웹훅 설정 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">🪝 웹훅 설정</h4>
                                    <p className="section-description">시스템 이벤트에 대한 웹훅을 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-webhooks" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">웹훅 활성화</span>
                                                    <span className="toggle-desc">시스템 이벤트 발생 시 외부 URL로 알림을 보냅니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="webhook-list" id="webhook-list">
                                        <div className="webhook-item">
                                            <div className="webhook-header">
                                                <h5>사용자 등록 웹훅</h5>
                                                <button className="btn btn-small btn-danger"
                                                // onClick="SettingsManager.removeWebhook(this)"
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                            <div className="webhook-config">
                                                <div className="form-group">
                                                    <label>웹훅 URL</label>
                                                    <input type="url"
                                                        value="https://api.example.com/webhooks/user-registered"
                                                        placeholder="https://api.example.com/webhook" readOnly />
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group">
                                                        <label>이벤트</label>
                                                        <select>
                                                            <option value="user.registered">사용자 등록</option>
                                                            <option value="user.login">사용자 로그인</option>
                                                            <option value="api.request">API 요청</option>
                                                            <option value="system.error">시스템 오류</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>상태</label>
                                                        <select>
                                                            <option value="active" >활성</option>
                                                            <option value="inactive">비활성</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-actions">
                                        <button className="btn btn-secondary" id="add-webhook">
                                            + 웹훅 추가
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel-footer">
                            <div className="save-status" id="api-save-status"></div>
                            <button className="btn btn-primary" id="save-api-settings">
                                💾 API 설정 저장
                            </button>
                        </div>
                    </div>

                    {/* 고급 설정 탭 */}
                    <div className={`settings-panel ${pageStatus === "advanced" ? "active" : ""}`} id="advanced-panel">
                        <div className="panel-header">
                            <h3 className="panel-title">
                                <span className="panel-icon">🔧</span>
                                고급 설정
                            </h3>
                            <p className="panel-description">개발자를 위한 고급 시스템 설정과 실험적 기능을 관리합니다.</p>
                        </div>

                        <div className="settings-sections">
                            {/* 개발자 옵션 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">🛠️ 개발자 옵션</h4>
                                    <p className="section-description">개발 및 디버깅을 위한 고급 옵션을 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-debug-mode" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">디버그 모드</span>
                                                    <span className="toggle-desc">상세한 로그와 디버그 정보를 활성화합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-api-logging" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">API 로깅</span>
                                                    <span className="toggle-desc">모든 API 요청과 응답을 로그에 기록합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-performance-monitoring" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">성능 모니터링</span>
                                                    <span className="toggle-desc">시스템 성능 메트릭을 수집하고 분석합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-maintenance-mode" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">유지보수 모드</span>
                                                    <span className="toggle-desc">플랫폼을 유지보수 모드로 전환합니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="log-level">로그 레벨</label>
                                            <select id="log-level">
                                                <option value="debug">Debug</option>
                                                <option value="info" >Info</option>
                                                <option value="warn">Warning</option>
                                                <option value="error">Error</option>
                                            </select>
                                            <small className="form-help">시스템 로그의 상세 수준을 설정합니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="max-log-size">최대 로그 파일 크기 (MB)</label>
                                            <input type="number" id="max-log-size" value="100" min="10" max="1000" readOnly />
                                            <small className="form-help">로그 파일의 최대 크기를 설정합니다.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 실험적 기능 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">🧪 실험적 기능</h4>
                                    <p className="section-description">베타 테스트 중인 실험적 기능을 활성화합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-group toggle-group">
                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-ai-assistant" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">AI 관리 어시스턴트</span>
                                                    <span className="toggle-desc">시스템 관리를 도와주는 AI 어시스턴트를 활성화합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-auto-scaling" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">자동 스케일링</span>
                                                    <span className="toggle-desc">트래픽에 따라 리소스를 자동으로 조정합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-predictive-analytics" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">예측 분석</span>
                                                    <span className="toggle-desc">사용자 행동과 시스템 성능을 예측합니다.</span>
                                                </span>
                                            </label>
                                        </div>

                                        <div className="toggle-item">
                                            <label className="toggle-label">
                                                <input type="checkbox" id="enable-advanced-caching" readOnly />
                                                <span className="toggle-switch"></span>
                                                <span className="toggle-text">
                                                    <span className="toggle-title">고급 캐싱</span>
                                                    <span className="toggle-desc">AI 기반 스마트 캐싱 전략을 사용합니다.</span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 시스템 제한 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">⚠️ 시스템 제한</h4>
                                    <p className="section-description">시스템 리소스 사용량에 대한 제한을 설정합니다.</p>
                                </div>

                                <div className="settings-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="max-concurrent-users">최대 동시 사용자</label>
                                            <input type="number" id="max-concurrent-users" value="1000" min="10"
                                                max="10000" readOnly />
                                            <small className="form-help">동시에 접속 가능한 최대 사용자 수입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="max-api-requests-per-minute">분당 최대 API 요청</label>
                                            <input type="number" id="max-api-requests-per-minute" value="60" min="10"
                                                max="1000" readOnly />
                                            <small className="form-help">사용자당 분당 최대 API 요청 수입니다.</small>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="max-file-uploads-per-day">일일 최대 파일 업로드</label>
                                            <input type="number" id="max-file-uploads-per-day" value="100" min="1"
                                                max="1000" readOnly />
                                            <small className="form-help">사용자당 하루 최대 파일 업로드 수입니다.</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="max-storage-per-user">사용자당 최대 스토리지 (GB)</label>
                                            <input type="number" id="max-storage-per-user" value="5" min="1" max="100" readOnly />
                                            <small className="form-help">사용자당 할당 가능한 최대 스토리지 용량입니다.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 시스템 정보 섹션 */}
                            <div className="settings-section">
                                <div className="section-header">
                                    <h4 className="section-title">📋 시스템 정보</h4>
                                    <p className="section-description">현재 시스템 상태와 정보를 확인합니다.</p>
                                </div>

                                <div className="system-info">
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">플랫폼 버전</span>
                                            <span className="info-value">v1.0.0</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">데이터베이스 버전</span>
                                            <span className="info-value">PostgreSQL 14.2</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">서버 OS</span>
                                            <span className="info-value">Ubuntu 22.04 LTS</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">실행 시간</span>
                                            <span className="info-value">15일 8시간 32분</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">메모리 사용량</span>
                                            <span className="info-value">4.2GB / 16GB</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">디스크 사용량</span>
                                            <span className="info-value">45GB / 500GB</span>
                                        </div>
                                    </div>

                                    <div className="system-actions">
                                        <button className="btn btn-secondary" id="check-updates">
                                            🔄 업데이트 확인
                                        </button>
                                        <button className="btn btn-secondary" id="backup-system">
                                            💾 시스템 백업
                                        </button>
                                        <button className="btn btn-secondary" id="clear-cache">
                                            🗑️ 캐시 정리
                                        </button>
                                        <button className="btn btn-danger" id="restart-system">
                                            🔄 시스템 재시작
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="panel-footer">
                            <div className="save-status" id="advanced-save-status"></div>
                            <button className="btn btn-primary" id="save-advanced-settings">
                                💾 고급 설정 저장
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}