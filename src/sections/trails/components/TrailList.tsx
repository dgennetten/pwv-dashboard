import { useState, useMemo } from 'react'
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  AlertTriangle,
  Leaf,
  SlidersHorizontal,
} from 'lucide-react'
import type { Trail, Difficulty } from '@/../product/sections/trail-health/types'

type SortKey = 'efficiencyScore' | 'patrolCount'
type SortDir = 'asc' | 'desc'

const AREAS = [
  'Lower Poudre Canyon',
  'Upper Poudre Canyon',
  'Big Thompson/Estes Park',
  'Pingree Park',
]

const DIFFICULTIES: Difficulty[] = ['easy', 'moderate', 'hard']

// ── Efficiency score badge ───────────────────────────────────────────────────

function EfficiencyBadge({ score }: { score: number }) {
  const color =
    score >= 75
      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'
      : score >= 50
      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
      : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold tabular-nums ${color}`}>
      {score}
    </span>
  )
}

// ── Difficulty label ─────────────────────────────────────────────────────────

function DifficultyLabel({ difficulty }: { difficulty: Difficulty }) {
  const styles: Record<Difficulty, string> = {
    easy: 'text-emerald-600 dark:text-emerald-400',
    moderate: 'text-amber-600 dark:text-amber-400',
    hard: 'text-red-500 dark:text-red-400',
  }
  return (
    <span className={`text-xs font-medium capitalize ${styles[difficulty]}`}>
      {difficulty}
    </span>
  )
}

// ── Sortable column header ───────────────────────────────────────────────────

interface SortButtonProps {
  sortKey: SortKey
  currentKey: SortKey
  currentDir: SortDir
  onSort: (key: SortKey) => void
  children: React.ReactNode
}

function SortButton({ sortKey, currentKey, currentDir, onSort, children }: SortButtonProps) {
  const active = sortKey === currentKey
  return (
    <button
      onClick={() => onSort(sortKey)}
      className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
        active
          ? 'text-stone-800 dark:text-stone-200'
          : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'
      }`}
    >
      {children}
      {active ? (
        currentDir === 'desc' ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronUp className="w-3 h-3" />
        )
      ) : (
        <ChevronsUpDown className="w-3 h-3 opacity-40" />
      )}
    </button>
  )
}

// ── Toggle filter button ─────────────────────────────────────────────────────

interface ToggleFilterProps {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  activeClass: string
}

function ToggleFilter({ active, onClick, icon, label, activeClass }: ToggleFilterProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg font-medium border transition-colors ${
        active
          ? activeClass
          : 'bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

// ── Main TrailList ───────────────────────────────────────────────────────────

interface TrailListProps {
  trails: Trail[]
  onSelectTrail?: (id: string) => void
}

export function TrailList({ trails, onSelectTrail }: TrailListProps) {
  const [filterArea, setFilterArea] = useState<string>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all')
  const [filterWilderness, setFilterWilderness] = useState(false)
  const [filterUnderPatrolled, setFilterUnderPatrolled] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('efficiencyScore')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(prev => (prev === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const filtered = useMemo(() => {
    let result = [...trails]
    if (filterArea !== 'all') result = result.filter(t => t.area === filterArea)
    if (filterDifficulty !== 'all') result = result.filter(t => t.difficulty === filterDifficulty)
    if (filterWilderness) result = result.filter(t => t.wilderness)
    if (filterUnderPatrolled) result = result.filter(t => t.underPatrolled)
    result.sort((a, b) => {
      const diff = a[sortKey] - b[sortKey]
      return sortDir === 'desc' ? -diff : diff
    })
    return result
  }, [trails, filterArea, filterDifficulty, filterWilderness, filterUnderPatrolled, sortKey, sortDir])

  const underPatrolledCount = trails.filter(t => t.underPatrolled).length

  return (
    <div className="min-h-full bg-stone-50 dark:bg-stone-950 p-4 md:p-6 lg:p-8">

      {/* Page header */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">Trail Health</h2>
          {underPatrolledCount > 0 && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-full">
              <AlertTriangle className="w-3 h-3" />
              {underPatrolledCount} under-patrolled
            </span>
          )}
        </div>
        <p className="text-sm text-stone-400 dark:text-stone-500 mt-0.5">
          {filtered.length === trails.length
            ? `${trails.length} trails`
            : `${filtered.length} of ${trails.length} trails`}
        </p>
      </div>

      {/* Filter bar */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-3 py-2.5 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500 shrink-0" />

          {/* Area */}
          <select
            value={filterArea}
            onChange={e => setFilterArea(e.target.value)}
            className="text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-700 dark:text-stone-300 outline-none focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
          >
            <option value="all">All Areas</option>
            {AREAS.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          {/* Difficulty pills */}
          <div className="flex gap-1">
            {(['all', ...DIFFICULTIES] as const).map(d => (
              <button
                key={d}
                onClick={() => setFilterDifficulty(d)}
                className={`px-2.5 py-1 text-xs rounded-lg capitalize font-medium transition-colors ${
                  filterDifficulty === d
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-sm'
                    : 'bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700'
                }`}
              >
                {d === 'all' ? 'All' : d}
              </button>
            ))}
          </div>

          <div className="w-px h-4 bg-stone-200 dark:bg-stone-700 mx-0.5 hidden sm:block" />

          {/* Wilderness toggle */}
          <ToggleFilter
            active={filterWilderness}
            onClick={() => setFilterWilderness(p => !p)}
            icon={<Leaf className="w-3 h-3" />}
            label="Wilderness"
            activeClass="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700"
          />

          {/* Under-patrolled toggle */}
          <ToggleFilter
            active={filterUnderPatrolled}
            onClick={() => setFilterUnderPatrolled(p => !p)}
            icon={<AlertTriangle className="w-3 h-3" />}
            label="Under-patrolled"
            activeClass="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700"
          />
        </div>
      </div>

      {/* Trail table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 dark:border-stone-800">
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Trail
                  </span>
                </th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Area
                  </span>
                </th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    Difficulty
                  </span>
                </th>
                <th className="px-4 py-3 text-right">
                  <SortButton sortKey="patrolCount" currentKey={sortKey} currentDir={sortDir} onSort={handleSort}>
                    Patrols
                  </SortButton>
                </th>
                <th className="px-4 py-3 text-right hidden md:table-cell">
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                    / mo
                  </span>
                </th>
                <th className="px-4 py-3 text-right">
                  <SortButton sortKey="efficiencyScore" currentKey={sortKey} currentDir={sortDir} onSort={handleSort}>
                    Score
                  </SortButton>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {filtered.map(trail => (
                <tr
                  key={trail.id}
                  onClick={() => onSelectTrail?.(trail.id)}
                  className={`cursor-pointer transition-colors group ${
                    trail.underPatrolled
                      ? 'hover:bg-amber-50/60 dark:hover:bg-amber-900/10'
                      : 'hover:bg-stone-50 dark:hover:bg-stone-800/60'
                  }`}
                >
                  {/* Trail name */}
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-medium text-stone-900 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                            {trail.name}
                          </span>
                          {trail.wilderness && (
                            <span className="inline-flex shrink-0" title="Wilderness">
                              <Leaf className="w-3 h-3 text-emerald-500 dark:text-emerald-400" aria-hidden />
                            </span>
                          )}
                          {trail.underPatrolled && (
                            <span className="inline-flex shrink-0" title="Under-patrolled">
                              <AlertTriangle className="w-3 h-3 text-amber-500 dark:text-amber-400" aria-hidden />
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                          #{trail.trailNumber} · {trail.lengthMiles} mi
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Area */}
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-stone-500 dark:text-stone-400">{trail.area}</span>
                  </td>

                  {/* Difficulty */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <DifficultyLabel difficulty={trail.difficulty} />
                  </td>

                  {/* Patrol count */}
                  <td className="px-4 py-3 text-right">
                    <span className="font-semibold tabular-nums text-stone-800 dark:text-stone-200">
                      {trail.patrolCount}
                    </span>
                  </td>

                  {/* Frequency */}
                  <td className="px-4 py-3 text-right hidden md:table-cell">
                    <span className="text-xs tabular-nums text-stone-400 dark:text-stone-500">
                      {trail.patrolFrequency.toFixed(1)}
                    </span>
                  </td>

                  {/* Score */}
                  <td className="px-4 py-3 text-right">
                    <EfficiencyBadge score={trail.efficiencyScore} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-sm text-stone-400 dark:text-stone-500">No trails match the current filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-4 text-xs text-stone-400 dark:text-stone-500">
        <span className="flex items-center gap-1">
          <Leaf className="w-3 h-3 text-emerald-500" /> Wilderness designated
        </span>
        <span className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-amber-500" /> Needs more coverage
        </span>
        <span className="flex items-center gap-1">
          Score:
          <span className="font-semibold text-emerald-600">75+</span> good ·
          <span className="font-semibold text-amber-600">50–74</span> fair ·
          <span className="font-semibold text-red-500">&lt;50</span> low
        </span>
      </div>
    </div>
  )
}
