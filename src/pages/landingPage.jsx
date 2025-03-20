import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import logo from "../assets/logo.png"; // Ensure this path is correct

const LandingPage = () => {
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const bannerRef = useRef(null);
    const dotsRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const banner = bannerRef.current;
        if (!canvas || !banner) return;

        const ctx = canvas.getContext("2d");

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = banner.offsetWidth;
            canvas.height = banner.offsetHeight;
            createDots();
        };

        // Initialize dots with movement
        const arrayColors = ["#eee", "#545454", "#596d91", "#bb5a68", "#696541"];
        const createDots = () => {
            dotsRef.current = Array.from({ length: 50 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 5,
                color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
                vx: (Math.random() - 0.5) * 1, // Small random velocity
                vy: (Math.random() - 0.5) * 1,
            }));
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!ctx) return;

        let animationFrameId;

        // Function to draw and animate dots
        const drawDots = (mouse = null) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            dotsRef.current.forEach((dot) => {
                dot.x += dot.vx; // Update dot position
                dot.y += dot.vy;

                // Bounce off edges
                if (dot.x <= 0 || dot.x >= canvas.width) dot.vx *= -1;
                if (dot.y <= 0 || dot.y >= canvas.height) dot.vy *= -1;

                ctx.fillStyle = dot.color;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // If mouse is moving, draw connecting lines
            if (mouse) {
                dotsRef.current.forEach((dot) => {
                    const distance = Math.sqrt(
                        (mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2
                    );
                    if (distance < 150) {
                        ctx.strokeStyle = dot.color;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(dot.x, dot.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                });
            }
        };

        const handleMouseMove = (event) => {
            const banner = bannerRef.current;
            if (!banner) return;

            const mouse = {
                x: event.pageX - banner.getBoundingClientRect().left,
                y: event.pageY - banner.getBoundingClientRect().top,
            };

            drawDots(mouse);
        };

        const handleMouseOut = () => {
            drawDots();
        };

        // Animation loop
        const animate = () => {
            drawDots();
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Add event listeners
        bannerRef.current?.addEventListener("mousemove", handleMouseMove);
        bannerRef.current?.addEventListener("mouseout", handleMouseOut);

        return () => {
            cancelAnimationFrame(animationFrameId);
            bannerRef.current?.removeEventListener("mousemove", handleMouseMove);
            bannerRef.current?.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    const handleTryNow = () => {
        sessionStorage.setItem("access_granted", "true"); // Store flag in sessionStorage
        navigate("/app");
    };

    return (
        <div>
            <header>
                <figure>
                    <img id="logo" src={logo} alt="VELOX.AI Logo" />
                </figure>
            </header>

            <main>
                <div className="banner" ref={bannerRef}>
                    <div>
                        <h1 className="left">VELOX.AI</h1>
                        <h1 className="right">Fast. Smart. Accurate. Seamless</h1>
                    </div>
                    <h4>Accelerate your learning with quick, intelligent insights.</h4>
                    <button onClick={handleTryNow}>Try Now &#8599;</button>
                    <canvas ref={canvasRef} id="dotsCanvas"></canvas>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
