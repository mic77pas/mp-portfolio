import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = false,
  baseOpacity = 0,
  baseRotation = 0,
  blurStrength = 4,
  containerClassName = '',
  rotationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef?.current || window;

    // Animate all direct child elements
    el.children && Array.from(el.children).forEach((child, i) => {
      gsap.fromTo(child, 
        { opacity: baseOpacity, rotate: baseRotation, filter: enableBlur ? `blur(${blurStrength}px)` : 'none' },
        {
          opacity: 1,
          rotate: 0,
          filter: 'blur(0px)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: child,
            scroller,
            start: 'top bottom',
            end: rotationEnd,
            scrub: true
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, blurStrength]);

  return <div ref={containerRef} className={containerClassName}>{children}</div>;
};

export default ScrollReveal;
