import { useState } from 'react'
import type { Trends, YearOverYearPoint } from '@/../product/sections/leaderboards-trends/types'

const CHART_HEIGHT = 140

// ── Generic bar chart ─────────────────────────────────────────────────────────

interface BarChartProps {
  data: { label: string; value: number }[]
  barClass: string
  labelEvery?: number
}

function BarChart({ data, barClass, labelEvery = 1 }: BarChartProps) {
  const max = Math.max(...data.map(d => d.value), 1)

  return (
    <div className="space-y-2">
      <div className="relative" style={{ height: `${CHART_HEIGHT}px` }}>
        {[0, 50, 100].map(pct => (
          <div
            key={pct}
            className="absolute left-0 right-0 border-t border-stone-100 dark:border-stone-800"
            style={{ bottom: `${pct}%` }}
          />
        ))}
        <div className="absolute inset-0 flex items-end gap-px px-0.5">
          {data.map((d, i) => {
            const h = d.value === 0 ? 0 : Math.max((d.value / max) * 100, 2)
            return (
              <div key={i} title={`${d.label}: ${d.value}`} className="flex-1 flex items-end h-full cursor-default">
                <div
                  className={`w-full rounded-t-sm transition-opacity hover:opacity-70 ${barClass}`}
                  style={{ height: `${h}%` }}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex gap-px px-0.5">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center overflow-hidden">
            {i % labelEvery === 0 && (
              <span className="text-[9px] leading-none text-stone-400 dark:text-stone-500 truncate block">
                {d.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Stacked bar chart (trees by size) ─────────────────────────────────────────

interface StackedSegment {
  value: number
  color: string
}

interface StackedBarChartProps {
  data: { label: string; segments: StackedSegment[] }[]
}

function StackedBarChart({ data }: StackedBarChartProps) {
  const maxTotal = Math.max(...data.map(d => d.segments.reduce((s, seg) => s + seg.value, 0)), 1)

  return (
    <div className="space-y-2">
      <div className="relative" style={{ height: `${CHART_HEIGHT}px` }}>
        {[0, 50, 100].map(pct => (
          <div
            key={pct}
            className="absolute left-0 right-0 border-t border-stone-100 dark:border-stone-800"
            style={{ bottom: `${pct}%` }}
          />
        ))}
        <div className="absolute inset-0 flex items-end gap-px px-0.5">
          {data.map((d, i) => {
            const total = d.segments.reduce((s, seg) => s + seg.value, 0)
            const totalH = total === 0 ? 0 : Math.max((total / maxTotal) * 100, 2)
            return (
              <div
                key={i}
                title={`${d.label}: ${total}`}
                className="flex-1 flex items-end h-full cursor-default"
              >
                <div
                  className="w-full flex flex-col-reverse rounded-t-sm overflow-hidden"
                  style={{ height: `${totalH}%` }}
                >
                  {d.segments.map((seg, si) => (
                    <div
                      key={si}
                      className={seg.color}
                      style={{
                        height: total === 0 ? '0%' : `${(seg.value / total) * 100}%`,
                        minHeight: seg.value > 0 ? '1px' : '0',
                      }}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex gap-px px-0.5">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center overflow-hidden">
            <span className="text-[9px] leading-none text-stone-400 dark:text-stone-500 truncate block">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Year-over-year grouped chart ──────────────────────────────────────────────

function YearOverYearChart({ data }: { data: YearOverYearPoint[] }) {
  const max = Math.max(...data.map(d => Math.max(d.previousYear, d.currentYear)), 1)

  return (
    <div className="space-y-2">
      <div className="relative" style={{ height: `${CHART_HEIGHT}px` }}>
        {[0, 50, 100].map(pct => (
          <div
            key={pct}
            className="absolute left-0 right-0 border-t border-stone-100 dark:border-stone-800"
            style={{ bottom: `${pct}%` }}
          />
        ))}
        <div className="absolute inset-0 flex items-end gap-1 px-0.5">
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex items-end gap-px h-full">
              <div
                className="flex-1 bg-stone-200 dark:bg-stone-700 rounded-t-sm hover:opacity-70 transition-opacity"
                style={{ height: `${Math.max((d.previousYear / max) * 100, 1)}%` }}
                title={`Prior year (${d.month}): ${d.previousYear}`}
              />
              <div
                className="flex-1 bg-emerald-500 dark:bg-emerald-500 rounded-t-sm hover:opacity-70 transition-opacity"
                style={{ height: `${Math.max((d.currentYear / max) * 100, 1)}%` }}
                title={`Current year (${d.month}): ${d.currentYear}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-1 px-0.5">
        {data.map((d, i) => (
          <div key={i} className="flex-1 text-center overflow-hidden">
            <span className="text-[9px] leading-none text-stone-400 dark:text-stone-500 truncate block">
              {d.month}
            </span>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-4 pt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 bg-stone-200 dark:bg-stone-700 rounded-sm" />
          <span className="text-[10px] text-stone-400 dark:text-stone-500">Prior year</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 bg-emerald-500 rounded-sm" />
          <span className="text-[10px] text-stone-400 dark:text-stone-500">Current year</span>
        </div>
      </div>
    </div>
  )
}

// ── Chart selector + card wrapper ─────────────────────────────────────────────

type ChartType = 'patrolActivity' | 'violations' | 'treesBySize' | 'seasonal' | 'yearOverYear'

const CHART_OPTIONS: { value: ChartType; label: string }[] = [
  { value: 'patrolActivity', label: 'Patrol Activity' },
  { value: 'violations',     label: 'Violations' },
  { value: 'treesBySize',    label: 'Trees by Size' },
  { value: 'seasonal',       label: 'Seasonal' },
  { value: 'yearOverYear',   label: 'Year over Year' },
]

const CHART_META: Record<ChartType, { title: string; subtitle: string }> = {
  patrolActivity: { title: 'Patrol Activity',           subtitle: 'Weekly patrols across the organization' },
  violations:     { title: 'Violations by Month',       subtitle: 'Total violations recorded org-wide' },
  treesBySize:    { title: 'Trees Cleared by Size',     subtitle: 'Monthly trees cleared by diameter class' },
  seasonal:       { title: 'Seasonal Trail Usage',      subtitle: 'Patrol volume by calendar month' },
  yearOverYear:   { title: 'Year over Year',            subtitle: 'Current vs. prior year patrol volume' },
}

const TREES_SIZE_LEGEND = [
  { color: 'bg-emerald-200 dark:bg-emerald-800', label: '< 8"' },
  { color: 'bg-emerald-400 dark:bg-emerald-600', label: '8–15"' },
  { color: 'bg-emerald-600 dark:bg-emerald-500', label: '16–23"' },
  { color: 'bg-emerald-800 dark:bg-emerald-400', label: '24–36"' },
  { color: 'bg-stone-700 dark:bg-stone-300',     label: '> 36"' },
]

// ── TrendCharts ───────────────────────────────────────────────────────────────

export function TrendCharts({ trends }: { trends: Trends }) {
  const [activeChart, setActiveChart] = useState<ChartType>('patrolActivity')

  const patrolData = trends.patrolActivityByWeek.map(d => ({ label: d.label, value: d.count }))
  const violationData = trends.violationsByMonth.map(d => ({
    label: d.month,
    value: d.offLeashDog + d.campfire + d.nonDesignatedCamping + d.other,
  }))
  const seasonalData = trends.seasonalPatrolsByMonth.map(d => ({ label: d.month, value: d.patrols }))
  const treesSizeData = trends.treesBySizeByMonth.map(d => ({
    label: d.month,
    segments: [
      { value: d.under8in,         color: 'bg-emerald-200 dark:bg-emerald-800' },
      { value: d.eightTo15in,      color: 'bg-emerald-400 dark:bg-emerald-600' },
      { value: d.sixteenTo23in,    color: 'bg-emerald-600 dark:bg-emerald-500' },
      { value: d.twentyFourTo36in, color: 'bg-emerald-800 dark:bg-emerald-400' },
      { value: d.over36in,         color: 'bg-stone-700 dark:bg-stone-300' },
    ],
  }))

  const weeklyLabelEvery = Math.ceil(patrolData.length / 12)
  const meta = CHART_META[activeChart]

  return (
    <div className="space-y-4">

      {/* Chart selector pills */}
      <div className="flex flex-wrap gap-2">
        {CHART_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => setActiveChart(opt.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
              activeChart === opt.value
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-600 hover:text-stone-700 dark:hover:text-stone-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Active chart card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4">
        <div className="mb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {meta.title}
          </h3>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">{meta.subtitle}</p>
        </div>

        {activeChart === 'patrolActivity' && (
          <BarChart data={patrolData} barClass="bg-emerald-500 dark:bg-emerald-500" labelEvery={weeklyLabelEvery} />
        )}
        {activeChart === 'violations' && (
          <BarChart data={violationData} barClass="bg-amber-400 dark:bg-amber-500" />
        )}
        {activeChart === 'treesBySize' && (
          <>
            <StackedBarChart data={treesSizeData} />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3">
              {TREES_SIZE_LEGEND.map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
                  <span className="text-[10px] text-stone-400 dark:text-stone-500">{label}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {activeChart === 'seasonal' && (
          <BarChart data={seasonalData} barClass="bg-stone-400 dark:bg-stone-500" />
        )}
        {activeChart === 'yearOverYear' && (
          <YearOverYearChart data={trends.yearOverYear} />
        )}
      </div>
    </div>
  )
}
