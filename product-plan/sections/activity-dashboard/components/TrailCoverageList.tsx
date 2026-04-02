import { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown, AlertTriangle, TreePine } from 'lucide-react'
import type { TrailCoverageRow, TrailCoverageSortKey } from '../types'

interface TrailCoverageListProps {
  data: TrailCoverageRow[]
  onTrailSelect?: (trailId: number) => void
  onSortChange?: (key: TrailCoverageSortKey, direction: 'asc' | 'desc') => void
}

type SortDir = 'asc' | 'desc'

interface SortState {
  key: TrailCoverageSortKey
  dir: SortDir
}

function SortIcon({ col, sort }: { col: TrailCoverageSortKey; sort: SortState }) {
  if (sort.key !== col) return <ChevronsUpDown className="w-3 h-3 text-stone-300 dark:text-stone-600" strokeWidth={2} />
  return sort.dir === 'asc'
    ? <ChevronUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
    : <ChevronDown className="w-3 h-3 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
}

export function TrailCoverageList({ data, onTrailSelect, onSortChange }: TrailCoverageListProps) {
  const [sort, setSort] = useState<SortState>({ key: 'patrols', dir: 'desc' })

  const handleSort = (key: TrailCoverageSortKey) => {
    const newDir: SortDir = sort.key === key && sort.dir === 'desc' ? 'asc' : 'desc'
    setSort({ key, dir: newDir })
    onSortChange?.(key, newDir)
  }

  const sorted = [...data].sort((a, b) => {
    let aVal: string | number
    let bVal: string | number
    switch (sort.key) {
      case 'trailName':   aVal = a.trailName; bVal = b.trailName; break
      case 'patrols':     aVal = a.patrols; bVal = b.patrols; break
      case 'hikersContacted': aVal = a.hikersContacted; bVal = b.hikersContacted; break
      case 'area':        aVal = a.area; bVal = b.area; break
    }
    const cmp = typeof aVal === 'string'
      ? aVal.localeCompare(bVal as string)
      : (aVal as number) - (bVal as number)
    return sort.dir === 'asc' ? cmp : -cmp
  })

  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-xs min-w-[400px]">
        <thead>
          <tr className="border-b border-stone-200 dark:border-stone-700">
            {/* Trail Name */}
            <th className="text-left pb-2 px-1">
              <button
                onClick={() => handleSort('trailName')}
                className="flex items-center gap-1 text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 uppercase tracking-wider font-semibold"
              >
                Trail <SortIcon col="trailName" sort={sort} />
              </button>
            </th>
            {/* Area */}
            <th className="text-left pb-2 px-1 hidden sm:table-cell">
              <button
                onClick={() => handleSort('area')}
                className="flex items-center gap-1 text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 uppercase tracking-wider font-semibold"
              >
                Area <SortIcon col="area" sort={sort} />
              </button>
            </th>
            {/* Patrols */}
            <th className="text-right pb-2 px-1">
              <button
                onClick={() => handleSort('patrols')}
                className="flex items-center gap-1 ml-auto text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 uppercase tracking-wider font-semibold"
              >
                Patrols <SortIcon col="patrols" sort={sort} />
              </button>
            </th>
            {/* Hikers */}
            <th className="text-right pb-2 px-1 hidden md:table-cell">
              <button
                onClick={() => handleSort('hikersContacted')}
                className="flex items-center gap-1 ml-auto text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 uppercase tracking-wider font-semibold"
              >
                Hikers <SortIcon col="hikersContacted" sort={sort} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
          {sorted.map(trail => (
            <tr
              key={trail.trailId}
              onClick={() => onTrailSelect?.(trail.trailId)}
              className={`cursor-pointer transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/50 ${
                trail.patrols === 0 ? 'opacity-60' : ''
              }`}
            >
              {/* Trail name + badges */}
              <td className="py-2 px-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  {trail.patrols === 0 && (
                    <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" strokeWidth={2} />
                  )}
                  <span className="font-medium text-stone-800 dark:text-stone-200 truncate">{trail.trailName}</span>
                  {trail.inWilderness && (
                    <span className="shrink-0 inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[9px] font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      <TreePine className="w-2.5 h-2.5" strokeWidth={2} />
                      WLD
                    </span>
                  )}
                </div>
                <div className="text-stone-400 dark:text-stone-500 mt-0.5">#{trail.trailNumber} · {trail.lengthMiles} mi</div>
              </td>
              {/* Area */}
              <td className="py-2 px-1 text-stone-500 dark:text-stone-400 hidden sm:table-cell">
                <span className="truncate block max-w-[120px]" title={trail.area}>{trail.area}</span>
              </td>
              {/* Patrols */}
              <td className="py-2 px-1 text-right">
                <span className={`font-semibold tabular-nums ${trail.patrols > 0 ? 'text-stone-800 dark:text-stone-200' : 'text-stone-400 dark:text-stone-600'}`}>
                  {trail.patrols}
                </span>
              </td>
              {/* Hikers */}
              <td className="py-2 px-1 text-right hidden md:table-cell">
                <span className="tabular-nums text-stone-600 dark:text-stone-400">{trail.hikersContacted}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
