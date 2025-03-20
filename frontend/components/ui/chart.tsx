"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Dynamically import ApexCharts with no SSR
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false })

interface ChartProps {
  type: "line" | "bar" | "donut" | "radar" | "pie" | "area"
  options: any
  series: any
  height?: number
  width?: string
}

export const Chart: React.FC<ChartProps> = ({ type, options, series, height = 300, width = "100%" }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Ensure chart resizes properly
    const handleResize = () => {
      if (chartRef.current && window.ApexCharts) {
        window.ApexCharts.exec(
          chartRef.current.id,
          "updateOptions",
          {
            chart: {
              width: chartRef.current.offsetWidth,
            },
          },
          false,
          true,
        )
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!mounted)
    return (
      <div
        ref={chartRef}
        style={{
          height: height,
          width: width,
          backgroundColor: "rgba(30, 41, 59, 0.4)",
          borderRadius: "0.375rem",
        }}
        className="flex items-center justify-center"
      >
        <span className="text-slate-400">Loading chart...</span>
      </div>
    )

  return (
    <div ref={chartRef} style={{ height: height, width: width }}>
      <ApexCharts
        type={type}
        options={{
          ...options,
          chart: {
            ...options.chart,
            height: height,
            width: "100%",
            background: "transparent",
            toolbar: {
              show: false,
            },
          },
          theme: {
            mode: "dark",
          },
          tooltip: {
            theme: "dark",
            ...options.tooltip,
          },
          grid: {
            borderColor: "rgba(255, 255, 255, 0.1)",
            ...options.grid,
          },
          colors: options.colors || ["#af2018", "#64748b", "#0ea5e9"],
        }}
        series={series}
        height={height}
        width="100%"
      />
    </div>
  )
}

export const ChartContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="rounded-md border border-slate-800 bg-slate-900 text-white p-4">{children}</div>
}

export const ChartTooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>Tooltip Content</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const ChartTooltipContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <TooltipContent>{children}</TooltipContent>
}

export const ChartLegend: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex flex-wrap gap-4 mt-4">{children}</div>
}

export const ChartLegendContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="flex items-center gap-2">{children}</div>
}

export const ChartStyle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <style>{children}</style>
}

