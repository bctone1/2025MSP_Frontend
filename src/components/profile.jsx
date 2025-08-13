'use client';
import { useState, useEffect, useRef } from 'react';
import "@/styles/profile.css"

export default function Profile({ onMenuClick }) {
    return (
        <>
            <div className="profile_container" id="main-container">
                <div className="header">
                    <div className="header-title">
                        <div>
                            <h1 className="page-title">프로필</h1>
                            <p className="page-subtitle">내 정보 및 계정 설정을 관리하세요</p>
                        </div>
                    </div>
                </div>

                <div className="profile-container">
                    {/* 프로필 정보 섹션 */}
                    <div className="section-card">
                        <div className="section-header">
                            <h3 className="section-title">
                                <div className="section-icon" style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>👤</div>
                                프로필 정보
                            </h3>
                            <button className="profile-primary-btn" >저장</button>
                        </div>

                        <div className="profile-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">이름</label>
                                    <input type="text" className="form-input" id="profile-name" value="사용자" placeholder="이름을 입력하세요" readOnly />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">이메일</label>
                                    <input type="email" className="form-input" id="profile-email" value="user@bctone.kr" placeholder="이메일을 입력하세요" readOnly />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">소속 조직</label>
                                    <input type="text" className="form-input" id="profile-company" value="BCTONE" placeholder="소속 조직을 입력하세요" readOnly />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">권한</label>
                                    <select className="form-select" id="profile-role">
                                        <option value="관리자">관리자</option>
                                        <option value="사용자">사용자</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 비밀번호 변경 섹션 */}
                    <div className="section-card">
                        <div className="section-header">
                            <h3 className="section-title">
                                <div className="section-icon" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>🔒</div>
                                비밀번호 변경
                            </h3>
                            <button className="profile-primary-btn" >비밀번호 변경</button>
                        </div>

                        <div className="password-form">
                            <div className="form-group">
                                <label className="form-label">현재 비밀번호</label>
                                <div className="password-input-group">
                                    <input type="password" className="form-input" id="current-password" placeholder="현재 비밀번호를 입력하세요" />
                                    <button type="button" className="password-toggle" aria-label="비밀번호 보기">👁️</button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">새 비밀번호</label>
                                <div className="password-input-group">
                                    <input type="password" className="form-input" id="new-password" placeholder="새 비밀번호를 입력하세요" />
                                    <button type="button" className="password-toggle" aria-label="비밀번호 보기">👁️</button>
                                </div>
                                <p className="form-help">8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.</p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">새 비밀번호 확인</label>
                                <div className="password-input-group">
                                    <input type="password" className="form-input" id="confirm-password" placeholder="새 비밀번호를 다시 입력하세요" />
                                    <button type="button" className="password-toggle" aria-label="비밀번호 보기">👁️</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 알림 설정 섹션 */}
                    <div className="section-card">
                        <div className="section-header">
                            <h3 className="section-title">
                                <div className="section-icon" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>🔔</div>
                                알림 설정
                            </h3>
                        </div>

                        <div className="notification-settings">
                            <div className="notification-item">
                                <div className="notification-info">
                                    <div className="notification-title">작업 완료 알림</div>
                                    <div className="notification-desc">AI 작업이 완료되면 알림을 받습니다</div>
                                </div>
                                <div className="toggle-switch active" >
                                    <div className="toggle-slider"></div>
                                </div>
                            </div>

                            <div className="notification-item">
                                <div className="notification-info">
                                    <div className="notification-title">플랫폼 업데이트 알림</div>
                                    <div className="notification-desc">새 기능, 버그 수정 등 플랫폼 변경사항을 알려드립니다</div>
                                </div>
                                <div className="toggle-switch" >
                                    <div className="toggle-slider"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 계정 관리 섹션 */}
                    <div className="section-card">
                        <div className="section-header">
                            <h3 className="section-title">
                                <div className="section-icon" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>⚠️</div>
                                계정 관리
                            </h3>
                        </div>

                        <div className="account-actions">
                            <div className="action-item">
                                <div className="action-info">
                                    <div className="action-title">데이터 내보내기</div>
                                    <div className="action-desc">내 프로젝트와 설정 데이터를 다운로드합니다</div>
                                </div>
                                <button className="profile-secondary-btn" >내보내기</button>
                            </div>

                            <div className="action-item">
                                <div className="action-info">
                                    <div className="action-title">계정 삭제</div>
                                    <div className="action-desc">계정과 모든 데이터를 영구적으로 삭제합니다</div>
                                </div>
                                <button className="profile-danger-btn" >계정 삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}