"use client"

import { useState, useEffect } from "react"
import { DollarSign, Repeat, TrendingDown, Activity, Shield, Layers } from "lucide-react"

export default function DefiFlowDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  useEffect(() => {
    // Just to handle component mounting
  }, [])

  const handleNodeHover = (node: string) => {
    setActiveNode(node)
  }

  const handleNodeLeave = () => {
    setActiveNode(null)
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

  // Reduced particles for better performance
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 10,
  }))

  // Modern node component with optimized animations
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

    return (
      <div
        className="absolute cursor-pointer transition-transform duration-300 hover:scale-105"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
        onMouseEnter={() => handleNodeHover(id)}
        onMouseLeave={handleNodeLeave}
        onClick={() => handleNodeClick(id)}
      >
        <div
          className={`w-full h-full rounded-2xl border-2 backdrop-blur-xl transition-all duration-300 relative overflow-hidden
            ${active ? `${colors.primary} ${colors.border} shadow-xl` : `bg-slate-900/60 border-slate-700/50`}`}
          style={{
            boxShadow: active ? `0 0 20px ${colors.accent}40` : "none",
          }}
        >
          {/* Gradient overlay for modern look */}
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.secondary} opacity-20`} />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative transition-all duration-300
                ${active ? colors.secondary : "bg-slate-800"}`}
            >
              <Icon className={`h-6 w-6 transition-colors duration-300 ${active ? "text-white" : "text-slate-400"}`} />
            </div>

            <span
              className={`text-sm font-mono font-bold text-center transition-colors duration-300 ${active ? colors.accent : "text-slate-500"}`}
            >
              {title}
            </span>

            {subtitle && (
              <span
                className={`text-xs font-mono text-center mt-1 transition-colors duration-300 ${active ? colors.accent : "text-slate-600"}`}
              >
                {subtitle}
              </span>
            )}

            {/* Modern accent line */}
            <div
              className={`h-0.5 w-12 mt-2 rounded-full transition-all duration-300 ${active ? colors.secondary : "bg-slate-700"}`}
            />
          </div>
        </div>
      </div>
    )
  }

  // Connection arrow component
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

    return (
      <>
        <div
          className={`absolute h-0.5 transition-colors duration-300 ${
            active ? "bg-cyan-400 shadow-glow" : "bg-slate-700"
          }`}
          style={{
            width: `${distance}px`,
            left: `${start.x}px`,
            top: `${start.y}px`,
            transformOrigin: "left center",
            transform: `rotate(${angle}deg)`,
          }}
        >
          {/* Arrow head */}
          <div
            className={`absolute right-0 w-2 h-2 transition-colors duration-300 ${
              active ? "border-cyan-400" : "border-slate-700"
            }`}
            style={{
              borderTop: "1px solid",
              borderRight: "1px solid",
              transform: "rotate(45deg)",
              right: "0px",
              top: "-2px",
            }}
          />
        </div>

        {label && (
          <div
            className={`absolute px-2 py-1 rounded-md text-xs font-mono transition-colors duration-300 ${
              active ? "bg-cyan-900/80 text-cyan-200" : "bg-slate-800/80 text-slate-400"
            }`}
            style={{
              left: `${midX - 20}px`,
              top: `${midY - 12}px`,
            }}
          >
            {label}
          </div>
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
        primary: "bg-gradient-to-br from-cyan-900/90 to-slate-900/90",
        secondary: "bg-gradient-to-br from-cyan-500 to-blue-600",
        accent: "text-cyan-300",
        border: "border-cyan-400/50",
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
        primary: "bg-gradient-to-br from-emerald-900/90 to-slate-900/90",
        secondary: "bg-gradient-to-br from-emerald-500 to-teal-600",
        accent: "text-emerald-300",
        border: "border-emerald-400/50",
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
        primary: "bg-gradient-to-br from-purple-900/90 to-slate-900/90",
        secondary: "bg-gradient-to-br from-purple-500 to-indigo-600",
        accent: "text-purple-300",
        border: "border-purple-400/50",
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
        primary: "bg-gradient-to-r from-teal-900/90 to-slate-900/90",
        secondary: "bg-gradient-to-br from-teal-500 to-emerald-600",
        accent: "text-teal-300",
        border: "border-teal-400/50",
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
        primary: "bg-gradient-to-br from-amber-900/90 to-slate-900/90",
        secondary: "bg-gradient-to-br from-amber-500 to-orange-600",
        accent: "text-amber-300",
        border: "border-amber-400/50",
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

  // Feature boxes with consistent styling
  const FeatureBox = ({
    position,
    icon: Icon,
    title,
    items,
    color,
  }: {
    position: { top: number; left: number }
    icon: any
    title: string
    items?: string[]
    color: string
  }) => (
    <div
      className="absolute p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 transition-all duration-300 hover:border-slate-600/70 shadow-lg"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: "220px",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-sm font-mono font-bold text-slate-200">{title}</h3>
      </div>

      {items && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, i) => (
            <div key={i} className="px-3 py-1 rounded-lg bg-slate-800/80 text-xs font-medium text-slate-300">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="w-full h-[700px] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative p-6 overflow-hidden rounded-2xl border border-slate-800 shadow-2xl">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.05),transparent_50%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/5"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}

      {/* Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
        <h2 className="text-xl font-bold text-slate-200 mb-1">DeFi Protocol Flow</h2>
        <p className="text-sm text-slate-400">Interactive visualization of protocol components</p>
      </div>

      {/* Render all connections */}
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

      {/* Feature boxes with consistent positioning */}
      <FeatureBox
        position={{ top: 320, left: 100 }}
        icon={DollarSign}
        title="Borrow USDC"
        items={["Loop", "Leverage", "Yield"]}
        color="bg-gradient-to-br from-indigo-500 to-purple-600"
      />

      <FeatureBox
        position={{ top: 500, left: 100 }}
        icon={Repeat}
        title="Rebalancing"
        items={["Loan", "Delta", "Time"]}
        color="bg-gradient-to-br from-teal-500 to-cyan-600"
      />

      <FeatureBox
        position={{ top: 320, left: 580 }}
        icon={TrendingDown}
        title="Hedge with Shorts"
        items={["SOL", "BTC", "ETH"]}
        color="bg-gradient-to-br from-emerald-500 to-teal-600"
      />

      {/* Modal for node details */}
      {selectedNode && (
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedNode(null)}
        >
          <div
            className="bg-slate-900/95 border border-slate-700 rounded-2xl p-6 max-w-md w-full mx-4 backdrop-blur-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-slate-200 mb-4">
              {selectedNode === "user" && "User"}
              {selectedNode === "usdc-vault" && "USDC Vault"}
              {selectedNode === "jupiter-swap" && "Jupiter Swap"}
              {selectedNode === "jlp" && "JLP as Collateral"}
              {selectedNode === "drift-delegator" && "Drift Delegator"}
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
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
            </p>
            <button
              className="bg-slate-800 text-slate-200 px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors duration-300"
              onClick={() => setSelectedNode(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
