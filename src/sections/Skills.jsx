import React, { useEffect, useRef, useState } from 'react'
import { FaJava, FaReact, FaNodeJs, FaGitAlt, FaGithub } from "react-icons/fa";
import { FaJenkins } from "react-icons/fa6";
import { RiTailwindCssLine } from "react-icons/ri";
import { SiFastapi, SiMongodb } from "react-icons/si";
import { motion, useMotionValue } from 'framer-motion';

const Skills = () => {
  const skills = [
    {icon: <FaJava />, name: "Java"},
    {icon: <FaReact />, name: "React"},
    {icon: <RiTailwindCssLine />, name: "FastAPI"},
    {icon: <FaJenkins />, name: "Jenkins"},
    {icon: <FaNodeJs />, name: "Node.js"},
    {icon: <SiMongodb />, name: "MongoDB"},
    {icon: <FaGitAlt />, name: "Git"},
    {icon: <FaGithub />, name: "GitHub"},
  ]

  // const repeated = [...skills, ...skills];
  const repeated = [...skills, ...skills, ...skills];

  const [active, setActive] = useState(false);
  const[dir, setDir] = useState(-1);
  const [exit, setExit] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
    }, 
    {threshold: [0.1]}
  )

  io.observe(el);
  return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };

    window.addEventListener('wheel', onWheel, {passive: true});
    window.addEventListener('touchstart', onTouchStart, {passive: true});
    window.addEventListener('touchmove', onTouchMove, {passive: true});
    // return () => {
    // }
  }, [active]);

  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = x.get() + SPEED * dir * dt;
      const loop = trackRef.current?.scrollWidth/3 || 0;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }
      x.set(next);
      id = requestAnimationFrame(tick);
    }
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x]);

  return (
    <section id='skills' ref={sectionRef} className='h-1/2 w-full pb-3 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden'>
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-0 w-50 h-75 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-15 blur-[150px] animate-pulse delay-300' />
        <div className='absolute bottom-1/4 right-0 w-50 h-75 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500' />
      </div>

      <motion.h2 className='text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10'
        initial={{opacity: 0, y: -30}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.8, delay: 0.1}}
      >My Skills</motion.h2>

      <motion.p className='mt-2 mb-8 text-white/90 text-base sm:text-lg z-10'
        initial={{opacity: -10, y: -30}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, delay: 0.1}}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      <div className='relative w-full overflow-hidden'>
        <motion.div 
          ref={trackRef} 
          style={{x, whiteSpace: "nowrap", willChange: "transform"}}
          className='flex gap-10 text-6xl text-[#1cd8d2]'
        >
          {repeated.map((s, i) => (
            <div key={i} className='flex flex-col items-center gap-2 min-w-30 py-4'
              aria-label={s.name}
              title={s.name}
            >
              <span className='hover:scale-125 transition-transform duration-300'>
                {s.icon}
              </span>
              <p className='text-sm'>
                {s.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
