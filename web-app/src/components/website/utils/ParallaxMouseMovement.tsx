// components/ParallaxMouseMovement.tsx
import { useEffect } from 'react';

export default function ParallaxMouseMovement() {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const elements = document.querySelectorAll('.parallax-mouse-movement');

            elements.forEach((element) => {
                const container = element as HTMLElement;
                const containerRect = container.getBoundingClientRect();
                const moveX = ((mouseX - containerRect.left) / containerRect.width - 0.5) * 10; // Adjust the multiplier for the parallax effect
                const moveY = ((mouseY - containerRect.top) / containerRect.height - 0.5) * 10; // Adjust the multiplier for the parallax effect

                container.style.backgroundPosition = `${50 - moveX}% ${50 - moveY}%`;
            });
        };

        // Add the mousemove event listener to the body
        document.body.addEventListener('mousemove', handleMouseMove);

        return () => {
            // Remove the event listener when the component unmounts
            document.body.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return null; // This component doesn't render anything to the DOM
}
