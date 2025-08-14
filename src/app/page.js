"use client";
import "@/styles/login.css"

import axios from 'axios';


import { cn } from "@/lib/utils";



import { useState, useRef, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function LoginPage({ className }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();



    const handleLogin = async () => {
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
        // console.log(result);
        if (result?.error) {
            alert("회원정보가 없습니다.");
        } else {
            // 로그인 성공 후 세션 정보 가져오기
            const res = await fetch("/api/auth/session");
            const session = await res.json();

            if (session?.user?.role === "admin") {
                router.push("/home/admin");
            } else if (session?.user?.role === "user") {
                router.push("/home/user");
            }
        }
    };

    const handleGoogleLogin = () => {
        signIn("google", {
            callbackUrl: "/user",
        });
    };

    const handleKakaoLogin = () => {
        signIn("kakao", {
            callbackUrl: "/user",
        });

    };


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
                    <div className="neural-network" id="neuralNetwork" ref={neuralNetworkRef}></div>
                    <div className="floating-particles" id="particles" ref={particlesRef}></div>
                </div>
            </div>

            <div className="main-content">
                <div className="login-wrapper">
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
                        <div className="login-container">
                            <div className="login-header">
                                <h2 className="login-title">로그인</h2>
                                <p className="login-subtitle">MSP 고도화 시스템에 접속하려면 로그인이 필요합니다.</p>
                            </div>

                            <div className="social-login-section">
                                <div className="social-buttons">
                                    <button className="social-button kakao"
                                    // onClick="loginWithKakao()"
                                    >
                                        <div className="social-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 3c5.8 0 10.5 3.7 10.5 8.3 0 4.6-4.7 8.3-10.5 8.3-.6 0-1.2 0-1.8-.1L5.4 22l1.5-4.3C4.5 16.1 1.5 13.4 1.5 11.3 1.5 6.7 6.2 3 12 3z" />
                                            </svg>
                                        </div>
                                        Kakao
                                    </button>
                                    <button className="social-button google"
                                    // onClick="loginWithGoogle()"
                                    >
                                        <div className="social-icon">
                                            <svg width="18" height="18" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                        </div>
                                        Google
                                    </button>
                                </div>
                            </div>

                            <div className="divider">
                                <span>또는 계정으로 로그인</span>
                            </div>

                            {/* 사용자/관리자 선택 탭을 여기에 배치  */}
                            <div
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    margin: "0 0 25px 0",
                                    background: "#e2e8f0",
                                    borderRadius: "12px",
                                    padding: "6px",
                                    gap: "4px",
                                    border: "1px solid #cbd5e1",
                                }}
                            >
                                <button
                                    style={{
                                        flex: 1,
                                        padding: "14px 20px",
                                        border: "none",
                                        borderRadius: "8px",
                                        background: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        color: "#3b82f6",
                                        boxShadow: "0 2px 8px rgba(59, 130, 246, 0.2)",
                                        fontFamily: "'Segoe UI', sans-serif",
                                        transition: "all 0.3s ease",
                                    }}
                                    className="tab-user"
                                    onClick={() => window.location.href = "/user"}
                                >
                                    <span style={{ fontSize: "18px" }}>👤</span>
                                    <span>사용자</span>
                                </button>

                                <button
                                    style={{
                                        flex: 1,
                                        padding: "14px 20px",
                                        border: "none",
                                        borderRadius: "8px",
                                        background: "transparent",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        fontSize: "14px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        color: "#64748b",
                                        fontFamily: "'Segoe UI', sans-serif",
                                        transition: "all 0.3s ease",
                                    }}
                                    className="tab-admin"
                                    onClick={() => window.location.href = "/admin"}
                                >
                                    <span style={{ fontSize: "18px" }}>⚙️</span>
                                    <span>관리자</span>
                                </button>
                            </div>


                            <form id="loginForm">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="username">사용자 ID</label>
                                    <input type="text" id="username" className="form-input" placeholder="사용자 ID를 입력하세요" required />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="password">비밀번호</label>
                                    <input type="password" id="password" className="form-input" placeholder="비밀번호를 입력하세요" required />
                                </div>

                                <div className="form-row">
                                    <div className="checkbox-wrapper">
                                        <input type="checkbox" id="rememberMe" className="checkbox" />
                                        <label className="checkbox-label" htmlFor="rememberMe">로그인 상태 유지</label>
                                    </div>
                                    <a href="#" className="forgot-link"
                                        onClick={() => window.location.href = "/resetpassword"}
                                    >비밀번호 찾기</a>
                                </div>

                                <button type="submit" className="login-button" id="loginBtn">로그인</button>
                            </form>

                            <div className="register-section">
                                계정이 없으신가요?
                                <a href="#" className="register-link"
                                    onClick={() => window.location = "/register"}
                                >회원가입</a>
                            </div>

                            <div className="security-badge">
                                <div className="security-icon">🔒</div>
                                <span>SSL 암호화로 안전하게 보호됩니다</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
