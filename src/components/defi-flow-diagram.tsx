"use client"

import { useState } from "react"
import { DollarSign, Repeat, TrendingDown, Activity, Shield, Layers, HelpCircle, X } from "lucide-react"

export default function DefiFlowDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [showInfoOverlay, setShowInfoOverlay] = useState(false)

  const handleNodeHover = (node: string) => {
    setActiveNode(node)
  }

  const handleNodeLeave = () => {
    setActiveNode(null)
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

  // Node component without animations
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
    const [hovered, setHovered] = useState(false)

    return (
      <div
        className="absolute transition-all duration-300 ease-out"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
        onMouseEnter={() => {
          setHovered(true)
          handleNodeHover(id)
        }}
        onMouseLeave={() => {
          setHovered(false)
          handleNodeLeave()
        }}
      >
        <div
          className={`w-full h-full rounded-2xl border-2 backdrop-blur-sm relative overflow-hidden transition-all duration-300
            ${active ? `${colors.primary} ${colors.border}` : `bg-white/90 border-gray-200`}`}
          style={{
            boxShadow: active
              ? "0 0 14px rgba(8, 145, 178, 0.35)"
              : hovered
                ? "0 0 8px rgba(8, 145, 178, 0.15)"
                : "0 0 0 rgba(0,0,0,0)",
          }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{ opacity: active ? 0.8 : hovered ? 0.35 : 0.15 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.secondary} opacity-20`} />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative transition-all duration-300 ${
                active ? colors.secondary : "bg-gray-100"
              }`}
            >
              <Icon className={`h-6 w-6 transition-colors duration-300 ${active ? "text-white" : "text-gray-600"}`} />
            </div>

            <span
              className={`text-sm font-mono font-bold text-center w-full transition-colors duration-300 ${
                active ? colors.accent : "text-gray-700"
              }`}
            >
              {title}
            </span>

            {subtitle && (
              <span
                className={`text-xs font-mono text-center mt-1 w-full transition-colors duration-300 ${
                  active ? colors.accent : "text-gray-500"
                }`}
              >
                {subtitle}
              </span>
            )}

            {/* Accent line */}
            <div
              className={`h-0.5 mt-2 rounded-full transition-all duration-300 ${
                active ? `${colors.secondary.replace("bg-gradient-to-br", "bg-gradient-to-r")} w-12` : "bg-gray-300 w-8"
              }`}
            />
          </div>
        </div>
      </div>
    )
  }

  // Static connection arrow component
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
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI)
    const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2))
    const midX = (start.x + end.x) / 2
    const midY = (start.y + end.y) / 2

    return (
      <>
        <div
          className={`absolute transition-all duration-300 ${active ? "opacity-100" : "opacity-60"}`}
          style={{
            height: active ? "2px" : "1px",
            width: `${distance}px`,
            left: `${start.x}px`,
            top: `${start.y}px`,
            transformOrigin: "left center",
            transform: `rotate(${angle}deg)`,
            backgroundColor: active ? "#0891b2" : "#94a3b8",
            boxShadow: active ? "0 0 8px rgba(8, 145, 178, 0.6)" : undefined,
          }}
        >
          {/* Arrow head */}
          <div
            className="absolute right-0"
            style={{
              width: "6px",
              height: "6px",
              borderTop: `${active ? "2px" : "1px"} solid ${active ? "#0891b2" : "#94a3b8"}`,
              borderRight: `${active ? "2px" : "1px"} solid ${active ? "#0891b2" : "#94a3b8"}`,
              transform: "rotate(45deg)",
              right: "-1px",
              top: "-3px",
            }}
          />
        </div>

        {label && (
          <div
            className="absolute px-2 py-1 rounded-md text-xs font-mono text-center bg-gray-100 text-gray-700"
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

  // Define node positions
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

  // Static feature boxes
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
      className="absolute p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: "220px",
      }}
    >
      <div className="flex items-center gap-3 mb-3 justify-center">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shadow-md`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-sm font-mono font-bold text-gray-800">{title}</h3>
      </div>

      {items && (
        <div className="mt-3 flex flex-wrap gap-2 justify-center">
          {items.map((item, i) => (
            <div
              key={i}
              className="px-3 py-1 rounded-lg bg-gray-100 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // Information overlay component
  const InfoOverlay = () => (
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={() => setShowInfoOverlay(false)}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">DeFi Protocol Components</h2>
          <button
            onClick={() => setShowInfoOverlay(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-5 h-5 text-white"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-cyan-700">User</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Users connect their wallets to interact with the DeFi protocol and manage their positions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-emerald-700">USDC Vault</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              The USDC Vault stores user deposits, manages liquidity, and enables leveraged positions through automated
              strategies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Repeat className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-purple-700">Jupiter Swap</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Jupiter Swap provides optimized token swapping with minimal slippage across Solana&apos;s liquidity
              sources.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-teal-700">JLP as Collateral</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Jupiter Liquidity Provider tokens represent shares in the liquidity pool and serve as collateral for
              borrowing.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-amber-700">Drift Delegator</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              The Drift Delegator manages trading positions, executes strategies, and handles risk management
              automatically.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowInfoOverlay(false)}
            className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full h-[700px] bg-gradient-to-br from-gray-50 via-white to-blue-50 relative p-6 overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
      {/* Static background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(8,145,178,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(79,70,229,0.05),transparent_50%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-1">DeFi Protocol Flow</h2>
        <p className="text-sm text-gray-600">Interactive visualization of protocol components</p>
      </div>

      {/* Question mark icon - keeping the animation */}
      <button
        onClick={() => setShowInfoOverlay(true)}
        className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
        title="View component information"
      >
        <HelpCircle className="h-6 w-6 text-gray-600" />
      </button>

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

      {/* Feature boxes */}
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

      {/* Information overlay */}
      {showInfoOverlay && <InfoOverlay />}
    </div>
  )
}
