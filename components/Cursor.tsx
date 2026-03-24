"use client"
import { motion, useReducedMotion } from 'framer-motion'
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react'

const Cursor = () => {
    const shouldReduceMotion = useReducedMotion();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isKeyboard, setIsKeyboard] = useState(false);
    const [isHoveringLink, setIsHoveringLink] = useState(false);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
            setIsKeyboard(false); // mouse is active; show cursor
        };

        // Hide custom cursor during keyboard navigation
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab') setIsKeyboard(true);
        };

        // Expand cursor on interactive elements
        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = !!target.closest('a, button, [role="button"], input, textarea, select');
            setIsHoveringLink(isInteractive);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    if (shouldReduceMotion) return null;
    if (isKeyboard) return null;

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full bg-rose-500 pointer-events-none z-9999 mix-blend-difference hidden md:block"
                style={{ x: mouseX, y: mouseY, translateX: 8, translateY: 8 }}
                animate={{ width: isHoveringLink ? 24 : 16, height: isHoveringLink ? 24 : 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                aria-hidden="true"
            />
            <motion.div
                className="fixed top-0 left-0 rounded-full border border-rose-500 pointer-events-none z-9998 hidden md:block"
                style={{ x: cursorX, y: cursorY }}
                animate={{ width: isHoveringLink ? 44 : 32, height: isHoveringLink ? 44 : 32, opacity: isHoveringLink ? 0.6 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                aria-hidden="true"
            />
        </>
    );
}

export default Cursor