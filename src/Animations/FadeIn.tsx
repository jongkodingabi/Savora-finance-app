"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Element = {
  children?: React.ReactNode;
};

export default function FadeInSection({ children }: Element) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: el,
          start: "top 80%", // saat elemen menyentuh 80% dari viewport
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <>
      <div ref={sectionRef}>{children}</div>
    </>
  );
}
