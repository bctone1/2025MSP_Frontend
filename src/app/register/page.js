"use client";
import "@/styles/register.css"

import { useState, useRef, useEffect } from "react";

export default function RegisterPage() {

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

    const [loginMethod, setloginMethod] = useState("user");


    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAgreed: false,
        marketingAgreed: false
    });


    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

    const handleCheckUserEmail = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // 이메일 형식 체크
        if (!emailRegex.test(register.email)) {
            alert("유효한 이메일 형식이 아닙니다.");
            return; // 서버 호출 중단
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/TEST/MSPCheckEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: register.email,
                secretCode : "0000"
            }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            alert(data.response);
            setIsUsernameAvailable(data.result)
        }
    }

    return (
        <>
            <div className="background-container">
                <div className="ai-visualization">
                    <div className="neural-network" id="neuralNetwork" ref={neuralNetworkRef}></div>
                    <div className="floating-particles" id="particles" ref={particlesRef}></div>
                </div>
            </div>

            <div className="main-content">
                <div className="register-wrapper">
                    <div className="left-panel" ref={leftPanelRef}>
                        <div className="company-branding">
                            <div className="company-logo">MSP</div>
                            <h1 className="company-title">META LLM MSP</h1>
                            <p className="company-subtitle">AI 통합 관리 플랫폼 AI 오케스트레이션 솔루션</p>

                            <div className="ai-features">
                                <div className="ai-feature">
                                    <div className="feature-icon">📄</div>
                                    <span>멀티모달 RAG 문서처리</span>
                                </div>
                                <div className="ai-feature">
                                    <div className="feature-icon">🤖</div>
                                    <span>AI 에이전트 활용</span>
                                </div>
                                <div className="ai-feature">
                                    <div className="feature-icon">🔗</div>
                                    <span>MCP 연동 서비스</span>
                                </div>
                                <div className="ai-feature">
                                    <div className="feature-icon">💬</div>
                                    <span>통합 인터페이스 (다중 LLM)</span>
                                </div>
                                <div className="ai-feature">
                                    <div className="feature-icon">👥</div>
                                    <span>회원 및 사용량 관리</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="right-panel">
                        <div className="register-container">
                            <div className="register-header">
                                <h2 className="register-title">회원가입</h2>
                                <p className="register-subtitle" id="subtitleText">MSP 고도화 시스템 사용자 계정을 생성합니다.</p>
                            </div>

                            {/* 사용자/관리자 선택 탭 */}
                            <div className="user-type-tabs">
                                <button className={`tab-button ${loginMethod === "user" ? "active" : ""}`} id="userTab"
                                    onClick={() => setloginMethod("user")}
                                >
                                    <span>👤</span>
                                    <span>사용자</span>
                                </button>
                                <button className={`tab-button ${loginMethod === "admin" ? "active" : ""}`} id="adminTab"
                                    onClick={() => setloginMethod("admin")}
                                >
                                    <span>⚙️</span>
                                    <span>관리자</span>
                                </button>
                            </div>

                            {/* 관리자 신청 안내 */}
                            {loginMethod === "admin" && (
                                <div className="admin-notice show" id="adminNotice">
                                    ⚠️ 관리자 계정은 승인이 필요합니다. 신청 후 기존 관리자의 승인을 받아야 계정이 활성화됩니다.
                                </div>
                            )}



                            {/* 기본 정보 */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="firstName">성</label>
                                    <input type="text" id="firstName" className="form-input" placeholder="성" value={register.firstName}
                                        onChange={(e) =>
                                            setRegister((pre) => ({
                                                ...pre,
                                                firstName: e.target.value
                                            }))
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="lastName">이름</label>
                                    <input type="text" id="lastName" className="form-input" placeholder="이름" value={register.lastName}
                                        onChange={(e) =>
                                            setRegister((pre) => ({
                                                ...pre,
                                                lastName: e.target.value
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="email">이메일</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <input type="email" id="email" className="form-input" placeholder="example@company.com" value={register.email}
                                        onChange={(e) =>
                                            setRegister((pre) => ({
                                                ...pre,
                                                email: e.target.value
                                            }))
                                        }
                                    />
                                    <button type="button" id="verifyCodeBtn" className="verification-btn"
                                        onClick={handleCheckUserEmail}
                                    >중복 확인</button>
                                </div>
                            </div>

                            <div className="form-group" id="verificationGroup"
                                style={{ display: `${isUsernameAvailable === true ? "" : "none"}` }}
                            >
                                <label className="form-label" htmlFor="verificationCode">인증번호</label>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <input type="text" id="verificationCode" className="form-input" placeholder="6자리 인증번호 입력" maxLength="6" style={{ flex: "1" }} />
                                    <button type="button" id="verifyCodeBtn" className="verification-btn">인증확인</button>
                                </div>
                                <div id="verificationTimer" className="verification-timer"
                                //  style={{ display: "none" }}
                                >
                                    남은 시간: <span id="timerText">03:00</span>
                                </div>
                            </div>


                            {/* <div className="form-group">
                                <label className="form-label" htmlFor="username">사용자 ID</label>
                                <input type="text" id="username" className="form-input" placeholder="사용자 ID (4자 이상)" value={register.id}
                                    onChange={(e) =>
                                        setRegister((pre) => ({
                                            ...pre,
                                            id: e.target.value
                                        }))
                                    }
                                />
                            </div> */}

                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password">비밀번호</label>
                                    <input type="password" id="password" className="form-input" placeholder="비밀번호 (8자 이상)" value={register.password}
                                        onChange={(e) =>
                                            setRegister((pre) => ({
                                                ...pre,
                                                password: e.target.value
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="confirmPassword">비밀번호 확인</label>
                                    <input type="password" id="confirmPassword" className="form-input" placeholder="비밀번호 확인" value={register.confirmPassword}
                                        onChange={(e) =>
                                            setRegister((pre) => ({
                                                ...pre,
                                                confirmPassword: e.target.value
                                            }))
                                        }
                                    />
                                </div>
                            </div>



                            {/* 관리자 전용 필드 */}
                            <div id="adminFields" style={{ display: `${loginMethod === "admin" ? "block" : "none"}` }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="adminReason">관리자 신청 사유</label>
                                    <textarea id="adminReason" className="form-input" rows="3" placeholder="관리자 권한이 필요한 사유를 간단히 작성해주세요."></textarea>
                                </div>
                            </div>

                            {/* 약관 동의 */}
                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="termsAgree" className="checkbox"
                                    checked={register.termsAgreed}
                                    onChange={(e) =>
                                        setRegister((pre) => ({
                                            ...pre,
                                            termsAgreed: e.target.checked
                                        }))
                                    }
                                />
                                <label className="checkbox-label" htmlFor="termsAgree">
                                    <strong>이용약관</strong> 및 <strong>개인정보처리방침</strong>에 동의합니다. (필수)
                                </label>
                            </div>

                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="marketingAgree" className="checkbox"
                                    checked={register.marketingAgreed}
                                    onChange={(e) =>
                                        setRegister((pre) => ({
                                            ...pre,
                                            marketingAgreed: e.target.checked
                                        }))
                                    }
                                />
                                <label className="checkbox-label" htmlFor="marketingAgree">
                                    마케팅 정보 수신에 동의합니다. (선택)
                                </label>
                            </div>

                            <button type="submit" className="register-button" id="registerBtn">회원가입</button>


                            <div className="login-section">
                                이미 계정이 있으신가요?
                                <a href="#" className="login-link"
                                    onClick={() => window.location = "/"}
                                >
                                    로그인
                                </a>
                            </div>


                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}