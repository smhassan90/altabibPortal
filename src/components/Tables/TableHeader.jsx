"use client"

export function TableHeader({ columns, sortConfig, onSort }) {
  return (
    <thead className="bg-white border-b-2 border-border">
      <tr>
        {columns?.map((column) => (
          <th
            key={column.key}
            className={`px-6 py-3 text-left text-small 2xl:text-medium font-medium text-text tracking-wider ${
              column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
            }`}
            onClick={() => column.sortable && onSort(column.key)}
          >
            <div className="flex items-center space-x-1">
              <span>{column.label}</span>
              {column.sortable && (
                <span className="">
                  {sortConfig?.key === column.key ? (sortConfig.direction === "asc" ? "↑" : "↓") : "↕"}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  )
}