"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
  once?: boolean;
};

function getInitial(dir: Direction, distance: number) {
  switch (dir) {
    case "up":    return { opacity: 0, y: distance };
    case "down":  return { opacity: 0, y: -distance };
    case "left":  return { opacity: 0, x: distance };
    case "right": return { opacity: 0, x: -distance };
    case "scale": return { opacity: 0, scale: 0.92 };
    case "none":  return { opacity: 0 };
  }
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  distance = 32,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      initial={getInitial(direction, distance)}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export function RevealStagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.15,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  return (
    <motion.div
      initial={{ scale: 1.08 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ overflow: "hidden" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        initial={{ y: `${speed * 100}%` }}
        whileInView={{ y: `${-speed * 100}%` }}
        viewport={{ once: false }}
        transition={{ duration: 1.5, ease: "linear" }}
      />
    </motion.div>
  );
}
