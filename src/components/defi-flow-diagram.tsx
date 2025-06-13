"use client"

import { useState, useEffect } from "react"
import { DollarSign, Repeat, TrendingDown, Activity, Shield, Layers } from "lucide-react"
import { motion, AnimatePresence, useTransform, useSpring } from "framer-motion"

export default function DefiFlowDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  // Spring configuration for smooth animations
  const springConfig = { stiffness: 100, damping: 15, mass: 0.5 }
  const fastSpringConfig = { stiffness: 300, damping: 25, mass: 0.5 }

  const handleNodeHover = (node: string) => {
    setActiveNode(node)
    setIsHovering(true)
  }

  const handleNodeLeave = () => {
    setActiveNode(null)
    setIsHovering(false)
  }

  const handleNodeClick = (node: string) => {
    setSelectedNode(node === selectedNode ? null : node)
  }

  const isActive = (node: string) => activeNode === node
  const isConnected = (node: string) => {
    if (!activeNode) return false

    const connections: Record<string, string[]> = {
      user: ["usdc-vault"],
      "usdc-vault": ["user", "jupiter-swap", "jlp", "drift-delegator"],
      "jupiter-swap": ["usdc-vault"],
      jlp: ["usdc-vault", "drift-delegator"],
      "drift-delegator": ["usdc-vault", "jlp"],
    }

    return connections[activeNode]?.includes(node) || connections[node]?.includes(activeNode)
  }

  // Animated particles with Framer Motion
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  // Modern node component with Framer Motion animations
  const NodeComponent = ({
    id,
    position,
    size,
    icon: Icon,
    title,
    subtitle,
    colors,
  }: {
    id: string
    position: { top: number; left: number }
    size: { width: number; height: number }
    icon: any
    title: string
    subtitle?: string
    colors: { primary: string; secondary: string; accent: string; border: string }
  }) => {
    const active = isActive(id) || isConnected(id)

    // Spring-animated scale for hover effect
    const scale = useSpring(1, springConfig)

    // Spring-animated shadow for active state
    const shadowOpacity = useSpring(0, fastSpringConfig)
    const shadowBlur = useSpring(0, fastSpringConfig)

    useEffect(() => {
      if (active) {
        shadowOpacity.set(0.4)
        shadowBlur.set(20)
      } else {
        shadowOpacity.set(0)
        shadowBlur.set(0)
      }
    }, [active, shadowOpacity, shadowBlur])

    return (
      <motion.div
        className="absolute cursor-pointer"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          scale,
        }}
        onMouseEnter={() => {
          handleNodeHover(id)
          scale.set(1.05)
        }}
        onMouseLeave={() => {
          handleNodeLeave()
          scale.set(1)
        }}
        onClick={() => handleNodeClick(id)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`w-full h-full rounded-2xl border-2 backdrop-blur-sm relative overflow-hidden
            ${active ? `${colors.primary} ${colors.border}` : `bg-white/90 border-gray-200`}`}
          style={{
            boxShadow: useTransform(
              [shadowOpacity, shadowBlur],
              ([opacity, blur]) => `0 0 ${blur}px rgba(${getColorRgb(colors.accent)}, ${opacity})`,
            ),
          }}
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay:
              id === "user" ? 0 : id === "usdc-vault" ? 0.1 : id === "jupiter-swap" ? 0.2 : id === "jlp" ? 0.3 : 0.4,
          }}
        >
          {/* Gradient overlay with animated opacity - always visible */}
          <motion.div
            className={`absolute inset-0 rounded-2xl opacity-100`}
            animate={{ opacity: active ? 1 : 0.5 }}
            transition={{ type: "spring", ...springConfig }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.secondary} opacity-20`} />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
            <motion.div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative
                ${active ? colors.secondary : "bg-gray-100"}`}
              animate={{
                backgroundColor: active ? getColorFromClass(colors.secondary) : "#f3f4f6",
                scale: active ? 1.05 : 1,
              }}
              transition={{ type: "spring", ...springConfig }}
            >
              <motion.div
                animate={{
                  color: active ? "#ffffff" : "#4b5563",
                  rotate: active ? [0, -10, 10, -5, 5, 0] : 0,
                  scale: active ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  color: { type: "spring", ...springConfig },
                  rotate: { type: "spring", stiffness: 300, damping: 10, duration: 0.5 },
                  scale: { type: "spring", stiffness: 300, damping: 10, duration: 0.5 },
                }}
              >
                <Icon className="h-6 w-6" />
              </motion.div>
            </motion.div>

            <motion.span
              className="text-sm font-mono font-bold text-center w-full"
              animate={{
                color: active ? getColorFromClass(colors.accent) : "#374151",
              }}
              transition={{ type: "spring", ...springConfig }}
            >
              {title}
            </motion.span>

            {subtitle && (
              <motion.span
                className="text-xs font-mono text-center mt-1 w-full"
                animate={{
                  color: active ? getColorFromClass(colors.accent) : "#6b7280",
                }}
                transition={{ type: "spring", ...springConfig }}
              >
                {subtitle}
              </motion.span>
            )}

            {/* Modern accent line with animation */}
            <motion.div
              className="h-0.5 w-12 mt-2 rounded-full"
              animate={{
                backgroundColor: active ? getColorFromClass(colors.secondary) : "#d1d5db",
                width: active ? "48px" : "32px",
              }}
              transition={{ type: "spring", ...springConfig }}
            />
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Helper function to extract RGB values from Tailwind color classes
  function getColorRgb(colorClass: string) {
    // This is a simplified mapping - in a real app you might want to use a more robust solution
    const colorMap: Record<string, string> = {
      "text-cyan-600": "8, 145, 178",
      "text-emerald-600": "5, 150, 105",
      "text-purple-600": "147, 51, 234",
      "text-teal-600": "13, 148, 136",
      "text-amber-600": "217, 119, 6",
    }

    return colorMap[colorClass] || "79, 70, 229" // Default to indigo
  }

  // Helper function to extract color from Tailwind class
  function getColorFromClass(colorClass: string) {
    // This is a simplified mapping for light theme
    if (colorClass.includes("cyan")) return "#0891b2"
    if (colorClass.includes("emerald")) return "#059669"
    if (colorClass.includes("purple")) return "#9333ea"
    if (colorClass.includes("teal")) return "#0d9488"
    if (colorClass.includes("amber")) return "#d97706"
    if (colorClass.includes("gray-100")) return "#f3f4f6"
    return "#4f46e5" // Default to indigo
  }

  // Connection arrow component with Framer Motion
  const ConnectionArrow = ({
    start,
    end,
    active,
    label,
  }: {
    start: { x: number; y: number }
    end: { x: number; y: number }
    active: boolean
    label?: string
  }) => {
    // Calculate the angle for the arrow
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI)
    const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))

    // Calculate midpoint for the label
    const midX = (start.x + end.x) / 2
    const midY = (start.y + end.y) / 2

    // Spring-animated properties
    const lineOpacity = useSpring(0.6, springConfig)
    const lineColor = useSpring(0, springConfig)
    const lineWidth = useSpring(1, springConfig)
    const glowOpacity = useSpring(0, springConfig)

    useEffect(() => {
      if (active) {
        lineOpacity.set(1)
        lineColor.set(1)
        lineWidth.set(2)
        glowOpacity.set(0.6)
      } else {
        lineOpacity.set(0.6)
        lineColor.set(0)
        lineWidth.set(1)
        glowOpacity.set(0)
      }
    }, [active, lineOpacity, lineColor, lineWidth, glowOpacity])

    return (
      <>
        <motion.div
          className="absolute"
          style={{
            height: useTransform(lineWidth, (width) => `${width}px`),
            width: `${distance}px`,
            left: `${start.x}px`,
            top: `${start.y}px`,
            transformOrigin: "left center",
            transform: `rotate(${angle}deg)`,
            backgroundColor: useTransform(lineColor, (color) => (color === 1 ? "#0891b2" : "#94a3b8")),
            opacity: lineOpacity,
            boxShadow: useTransform(glowOpacity, (glow) => `0 0 8px rgba(8, 145, 178, ${glow})`),
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 15,
            delay: 0.2,
          }}
        >
          {/* Arrow head with animation */}
          <motion.div
            className="absolute right-0"
            style={{
              width: "6px",
              height: "6px",
              borderTop: useTransform(
                lineColor,
                (color) => `${lineWidth.get()}px solid ${color === 1 ? "#0891b2" : "#94a3b8"}`,
              ),
              borderRight: useTransform(
                lineColor,
                (color) => `${lineWidth.get()}px solid ${color === 1 ? "#0891b2" : "#94a3b8"}`,
              ),
              transform: "rotate(45deg)",
              right: "-1px",
              top: "-3px",
            }}
          />
        </motion.div>

        {label && (
          <motion.div
            className="absolute px-2 py-1 rounded-md text-xs font-mono text-center"
            style={{
              left: `${midX - 20}px`,
              top: `${midY - 12}px`,
              backgroundColor: "#f3f4f6",
              color: "#374151",
            }}
            initial={{ opacity: 1, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.3,
            }}
            whileHover={{ scale: 1.05 }}
          >
            {label}
          </motion.div>
        )}
      </>
    )
  }

  // Define node positions in a more structured grid layout
  const nodeConfigs = [
    {
      id: "user",
      position: { top: 100, left: 100 },
      size: { width: 140, height: 140 },
      icon: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      title: "USER",
      colors: {
        primary: "bg-gradient-to-br from-cyan-50 to-white",
        secondary: "bg-gradient-to-br from-cyan-500 to-blue-600",
        accent: "text-cyan-600",
        border: "border-cyan-200",
      },
    },
    {
      id: "usdc-vault",
      position: { top: 100, left: 340 },
      size: { width: 160, height: 140 },
      icon: Shield,
      title: "USDC",
      subtitle: "VAULT",
      colors: {
        primary: "bg-gradient-to-br from-emerald-50 to-white",
        secondary: "bg-gradient-to-br from-emerald-500 to-teal-600",
        accent: "text-emerald-600",
        border: "border-emerald-200",
      },
    },
    {
      id: "jupiter-swap",
      position: { top: 100, left: 600 },
      size: { width: 160, height: 140 },
      icon: Repeat,
      title: "JUPITER",
      subtitle: "SWAP",
      colors: {
        primary: "bg-gradient-to-br from-purple-50 to-white",
        secondary: "bg-gradient-to-br from-purple-500 to-indigo-600",
        accent: "text-purple-600",
        border: "border-purple-200",
      },
    },
    {
      id: "jlp",
      position: { top: 320, left: 340 },
      size: { width: 160, height: 140 },
      icon: Layers,
      title: "JLP",
      subtitle: "COLLATERAL",
      colors: {
        primary: "bg-gradient-to-r from-teal-50 to-white",
        secondary: "bg-gradient-to-br from-teal-500 to-emerald-600",
        accent: "text-teal-600",
        border: "border-teal-200",
      },
    },
    {
      id: "drift-delegator",
      position: { top: 540, left: 340 },
      size: { width: 160, height: 140 },
      icon: Activity,
      title: "DRIFT",
      subtitle: "DELEGATOR",
      colors: {
        primary: "bg-gradient-to-br from-amber-50 to-white",
        secondary: "bg-gradient-to-br from-amber-500 to-orange-600",
        accent: "text-amber-600",
        border: "border-amber-200",
      },
    },
  ]

  // Define connections between nodes
  const connections = [
    { from: "user", to: "usdc-vault", label: "Deposit" },
    { from: "usdc-vault", to: "jupiter-swap", label: "Swap" },
    { from: "usdc-vault", to: "jlp", label: "Provide" },
    { from: "jlp", to: "drift-delegator", label: "Collateral" },
  ]

  // Calculate connection coordinates
  const getNodeCenter = (nodeId: string) => {
    const node = nodeConfigs.find((n) => n.id === nodeId)
    if (!node) return { x: 0, y: 0 }

    return {
      x: node.position.left + node.size.width / 2,
      y: node.position.top + node.size.height / 2,
    }
  }

  // Feature boxes with Framer Motion animations
  const FeatureBox = ({
    position,
    icon: Icon,
    title,
    items,
    color,
    delay,
  }: {
    position: { top: number; left: number }
    icon: any
    title: string
    items?: string[]
    color: string
    delay: number
  }) => (
    <motion.div
      className="absolute p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: "220px",
      }}
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: delay,
      }}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(209, 213, 219, 0.8)",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-center gap-3 mb-3 justify-center">
        <motion.div
          className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shadow-md`}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isHovering ? [0, -10, 10, -5, 5, 0] : 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              repeat: isHovering ? 0 : 0,
              repeatType: "loop",
              repeatDelay: 5,
            }}
          >
            <Icon className="h-5 w-5 text-white" />
          </motion.div>
        </motion.div>
        <h3 className="text-sm font-mono font-bold text-gray-800">{title}</h3>
      </div>

      {items && (
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="px-3 py-1 rounded-lg bg-gray-100 text-xs font-medium text-gray-700"
              initial={{ opacity: 1, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: delay + 0.1 + i * 0.1,
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(243, 244, 246, 1)",
                color: "#374151",
              }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )

  return (
    <div className="w-full h-[700px] bg-gradient-to-br from-gray-50 via-white to-blue-50 relative p-6 overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
      {/* Subtle background effects */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(8,145,178,0.05),transparent_50%)]"
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(79,70,229,0.05),transparent_50%)]"
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background particles with Framer Motion */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-900/5"
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: 0.3,
          }}
          animate={{
            x: [
              `${particle.x}%`,
              `${(particle.x + Math.random() * 10 - 5) % 100}%`,
              `${(particle.x + Math.random() * 10 - 5) % 100}%`,
              `${particle.x}%`,
            ],
            y: [
              `${particle.y}%`,
              `${(particle.y + Math.random() * 10 - 5) % 100}%`,
              `${(particle.y + Math.random() * 10 - 5) % 100}%`,
              `${particle.y}%`,
            ],
            opacity: [0.3, 0.5, 0.5, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}

      {/* Title with animation */}
      <motion.div
        className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 1, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          delay: 0.1,
        }}
      >
        <motion.h2
          className="text-xl font-bold text-gray-800 mb-1"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            repeatDelay: 5,
          }}
        >
          DeFi Protocol Flow
        </motion.h2>
        <p className="text-sm text-gray-600">Interactive visualization of protocol components</p>
      </motion.div>

      {/* Render all connections with staggered animations */}
      {connections.map((connection, index) => {
        const start = getNodeCenter(connection.from)
        const end = getNodeCenter(connection.to)
        const active =
          (isActive(connection.from) && isConnected(connection.to)) ||
          (isActive(connection.to) && isConnected(connection.from))

        return <ConnectionArrow key={index} start={start} end={end} active={active} label={connection.label} />
      })}

      {/* Render all nodes */}
      {nodeConfigs.map((config) => (
        <NodeComponent key={config.id} {...config} />
      ))}

      {/* Feature boxes with staggered animations */}
      <FeatureBox
        position={{ top: 320, left: 100 }}
        icon={DollarSign}
        title="Borrow USDC"
        items={["Loop", "Leverage", "Yield"]}
        color="bg-gradient-to-br from-indigo-500 to-purple-600"
        delay={0.5}
      />

      <FeatureBox
        position={{ top: 500, left: 100 }}
        icon={Repeat}
        title="Rebalancing"
        items={["Loan", "Delta", "Time"]}
        color="bg-gradient-to-br from-teal-500 to-cyan-600"
        delay={0.6}
      />

      <FeatureBox
        position={{ top: 320, left: 580 }}
        icon={TrendingDown}
        title="Hedge with Shorts"
        items={["SOL", "BTC", "ETH"]}
        color="bg-gradient-to-br from-emerald-500 to-teal-600"
        delay={0.7}
      />

      {/* Modal for node details with Framer Motion */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              className="bg-white border border-gray-200 rounded-2xl p-6 max-w-md w-full mx-4 backdrop-blur-sm shadow-xl"
              initial={{ opacity: 1, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 1, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.h3
                className="text-xl font-bold text-gray-800 mb-4 text-center"
                initial={{ opacity: 1, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
              >
                {selectedNode === "user" && "User"}
                {selectedNode === "usdc-vault" && "USDC Vault"}
                {selectedNode === "jupiter-swap" && "Jupiter Swap"}
                {selectedNode === "jlp" && "JLP as Collateral"}
                {selectedNode === "drift-delegator" && "Drift Delegator"}
              </motion.h3>
              <motion.p
                className="text-gray-700 mb-6 leading-relaxed text-center"
                initial={{ opacity: 1, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
              >
                {selectedNode === "user" &&
                  "Users connect their wallets to interact with the DeFi protocol and manage their positions."}
                {selectedNode === "usdc-vault" &&
                  "The USDC Vault stores user deposits, manages liquidity, and enables leveraged positions through automated strategies."}
                {selectedNode === "jupiter-swap" &&
                  "Jupiter Swap provides optimized token swapping with minimal slippage across Solana's liquidity sources."}
                {selectedNode === "jlp" &&
                  "Jupiter Liquidity Provider tokens represent shares in the liquidity pool and serve as collateral for borrowing."}
                {selectedNode === "drift-delegator" &&
                  "The Drift Delegator manages trading positions, executes strategies, and handles risk management automatically."}
              </motion.p>
              <div className="flex justify-center">
                <motion.button
                  className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                  onClick={() => setSelectedNode(null)}
                  whileHover={{ scale: 1.05, backgroundColor: "#e5e7eb" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 1, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.3 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
