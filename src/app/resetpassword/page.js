"use client";
import "@/styles/resetpassword.css"

import { useState, useRef, useEffect } from "react";

export default function ResetPassword() {

    const leftPanelRef = useRef(null);
    const neuralNetworkRef = useRef(null);
    const particlesRef = useRef(null);

    // AI 배경용 3D 큐브
    const createAICubes = () => {
        const leftPanel = leftPanelRef.current;
        if (!leftPanel) return;

        for (let i = 0; i < 8; i++) {
            const cube = document.createElement("div");
            cube.style.cssText = `
        position: absolute;
        width: 30px;
        height: 30px;
        background: rgba(59, 130, 246, 0.2);
        border: 1px solid rgba(99, 102, 241, 0.4);
        border-radius: 4px;
        z-index: 1;
        animation: float3d ${8 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 3}s;
        left: ${10 + Math.random() * 80}%;
        top: ${10 + Math.random() * 80}%;
        transform-style: preserve-3d;
      `;
            leftPanel.appendChild(cube);
        }

        // CSS 애니메이션 추가
        const style = document.createElement("style");
        style.textContent = `
      @keyframes float3d {
        0%, 100% { 
          transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          opacity: 0.3;
        }
        25% { 
          transform: translateY(-20px) rotateX(45deg) rotateY(45deg);
          opacity: 0.6;
        }
        50% { 
          transform: translateY(-10px) rotateX(90deg) rotateY(90deg);
          opacity: 0.8;
        }
        75% { 
          transform: translateY(-30px) rotateX(135deg) rotateY(135deg);
          opacity: 0.4;
        }
      }
    `;
        document.head.appendChild(style);
    };

    // 신경망 배경
    const createNeuralNetwork = () => {
        const container = neuralNetworkRef.current;
        if (!container) return;

        for (let i = 0; i < 25; i++) {
            const node = document.createElement("div");
            const types = ["node", "node medium", "node large"];
            node.className = types[Math.floor(Math.random() * types.length)];
            node.style.left = Math.random() * 100 + "%";
            node.style.top = Math.random() * 100 + "%";
            node.style.animationDelay = Math.random() * 3 + "s";
            container.appendChild(node);
        }

        for (let i = 0; i < 15; i++) {
            const connection = document.createElement("div");
            connection.className = "connection";

            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            const endX = Math.random() * 100;
            const endY = Math.random() * 100;

            const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

            connection.style.left = startX + "%";
            connection.style.top = startY + "%";
            connection.style.width = length + "%";
            connection.style.transform = `rotate(${angle}deg)`;
            connection.style.animationDelay = Math.random() * 4 + "s";

            container.appendChild(connection);
        }
    };

    // 파티클 배경
    const createParticles = () => {
        const container = particlesRef.current;
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDelay = Math.random() * 15 + "s";
            particle.style.animationDuration = 10 + Math.random() * 10 + "s";
            container.appendChild(particle);
        }
    };

    // 컴포넌트 렌더 후 실행
    useEffect(() => {
        createAICubes();
        createNeuralNetwork();
        createParticles();
    }, []);

    return (
        <>
            <div className="background-container">
                <div className="ai-visualization">
                    <div className="floating-particles" id="particles" ref={particlesRef}></div>
                </div>
            </div>

            <div className="main-content">
                <div className="reset-wrapper">
                    <a href="#" className="back-button"
                        onClick={() => window.location.href = "/"}
                    >
                        <span className="back-icon">←</span>
                        <span>로그인으로 돌아가기</span>
                    </a>

                    <div className="reset-header">
                        <div className="reset-icon">🔐</div>
                        <h1 className="reset-title">비밀번호 재설정</h1>
                        <p className="reset-subtitle">계정 보안을 위해 단계별로 진행해주세요</p>

                        {/* 테스트용 단계 이동 버튼들 */}
                        <div
                            style={{
                                display: "flex",
                                gap: "8px",
                                justifyContent: "center",
                                marginTop: "20px",
                                padding: "16px",
                                background: "#f8fafc",
                                borderRadius: "8px",
                                border: "1px solid #e2e8f0",
                            }}
                        >
                            <button
                                // onClick={() => goToStep(1)}
                                style={{
                                    padding: "6px 12px",
                                    fontSize: "11px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    background: "white",
                                    cursor: "pointer",
                                    color: "#374151",
                                }}
                            >
                                1단계
                            </button>
                            <button
                                // onClick={() => goToStep(2)}
                                style={{
                                    padding: "6px 12px",
                                    fontSize: "11px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    background: "white",
                                    cursor: "pointer",
                                    color: "#374151",
                                }}
                            >
                                2단계
                            </button>
                            <button
                                // onClick={() => goToStep(3)}
                                style={{
                                    padding: "6px 12px",
                                    fontSize: "11px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    background: "white",
                                    cursor: "pointer",
                                    color: "#374151",
                                }}
                            >
                                3단계
                            </button>
                            <button
                                // onClick={() => goToStep(4)}
                                style={{
                                    padding: "6px 12px",
                                    fontSize: "11px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    background: "white",
                                    cursor: "pointer",
                                    color: "#374151",
                                }}
                            >
                                완료
                            </button>
                            <span
                                style={{
                                    fontSize: "10px",
                                    color: "#6b7280",
                                    alignSelf: "center",
                                    marginLeft: "8px",
                                }}
                            >
                                ← 테스트용
                            </span>
                        </div>
                    </div>

                    <div className="step-indicator">
                        <div className="step-progress" id="stepProgress"></div>
                        <div className="step active" id="step1">
                            <div className="step-number">1</div>
                            <div className="step-text">계정 확인</div>
                        </div>
                        <div className="step" id="step2">
                            <div className="step-number">2</div>
                            <div className="step-text">인증 코드</div>
                        </div>
                        <div className="step" id="step3">
                            <div className="step-number">3</div>
                            <div className="step-text">새 비밀번호</div>
                        </div>
                    </div>

                    {/* Step 1: 계정 확인 */}
                    <div id="accountVerification" className="form-container">
                        <form id="accountForm">
                            <div className="form-group">
                                <label className="form-label" htmlFor="userId">사용자 ID 또는 이메일</label>
                                <input type="text" id="userId" className="form-input" placeholder="등록된 사용자 ID 또는 이메일을 입력하세요"
                                    value="test@email.com" readOnly />
                                <div className="input-help">가입 시 등록한 사용자 ID 또는 이메일 주소를 정확히 입력해주세요.</div>
                            </div>
                            <button type="submit" className="action-button" id="verifyAccountBtn">계정 확인</button>
                        </form>
                    </div>

                    {/* Step 2: 인증 코드  */}
                    <div id="codeVerification" className="form-container hidden">
                        <div className="verification-container">
                            <div className="verification-title">인증 코드를 입력해주세요</div>
                            <div id="sentMessage" className="input-help" style={{ marginBottom: "16px", textAlign: "center" }}>
                                <strong>이메일</strong>(test***@email.com)로 인증 코드를 발송했습니다.
                            </div>

                            <div className="verification-code-input">
                                <input type="text" className="code-digit" maxLength="1" id="code1" value="1" readOnly />
                                <input type="text" className="code-digit" maxLength="1" id="code2" value="2" readOnly />
                                <input type="text" className="code-digit" maxLength="1" id="code3" value="3" readOnly />
                                <input type="text" className="code-digit" maxLength="1" id="code4" value="4" readOnly />
                                <input type="text" className="code-digit" maxLength="1" id="code5" value="5" readOnly />
                                <input type="text" className="code-digit" maxLength="1" id="code6" value="6" readOnly />
                            </div>

                            <div className="resend-timer" id="resendTimer">인증 코드 재발송까지 <span id="countdown">180</span>초</div>
                            <button className="resend-button" id="resendBtn" disabled >인증 코드 재발송</button>
                        </div>

                        <button type="button" className="action-button" id="verifyCodeBtn">인증 코드 확인</button>
                    </div>

                    {/* Step 3: 새 비밀번호 설정 */}
                    <div id="passwordReset" className="form-container hidden">
                        <div className="password-requirements">
                            <div className="requirements-title">새 비밀번호 요구사항</div>
                            <div className="requirement-item" id="req-length">
                                <div className="requirement-check">✓</div>
                                <span>8자 이상</span>
                            </div>
                            <div className="requirement-item" id="req-upper">
                                <div className="requirement-check">✓</div>
                                <span>대문자 포함</span>
                            </div>
                            <div className="requirement-item" id="req-lower">
                                <div className="requirement-check">✓</div>
                                <span>소문자 포함</span>
                            </div>
                            <div className="requirement-item" id="req-number">
                                <div className="requirement-check">✓</div>
                                <span>숫자 포함</span>
                            </div>
                            <div className="requirement-item" id="req-special">
                                <div className="requirement-check">✓</div>
                                <span>특수문자 포함 (!@#$%^&*)</span>
                            </div>
                        </div>

                        <form id="passwordForm">
                            <div className="form-group">
                                <label className="form-label" htmlFor="newPassword">새 비밀번호</label>
                                <input type="password" id="newPassword" className="form-input" placeholder="새로운 비밀번호를 입력하세요"
                                    value="Test123!@#" readOnly />
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="confirmPassword">비밀번호 확인</label>
                                <input type="password" id="confirmPassword" className="form-input" placeholder="비밀번호를 다시 입력하세요"
                                    value="Test123!@#" readOnly />
                            </div>

                            <button type="submit" className="action-button" id="resetPasswordBtn">비밀번호 변경</button>
                        </form>
                    </div>

                    {/* Step 4: 완료 */}
                    <div id="resetComplete" className="form-container hidden">
                        <div className="success-message">
                            <div className="success-icon">✓</div>
                            <div className="success-title">비밀번호 변경 완료!</div>
                            <div className="success-description">
                                새로운 비밀번호로 성공적으로 변경되었습니다.<br />
                                이제 새 비밀번호로 로그인하실 수 있습니다.
                            </div>
                        </div>

                        <a href="#" className="login-link" >
                            <span>로그인 페이지로 이동</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>
            </div >
        </>
    );
}