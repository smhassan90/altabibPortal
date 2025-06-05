"use client";
import { useState, useMemo } from "react";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { TablePagination } from "./TablePagination";
import DataLoader from "@/utils/loader/DataLoader";

export function DynamicTable({
  data,
  columns,
  initialItemsPerPage = 10,
  className = "",
  expandedRow,
  setExpandedRow,
  fetchAppointment,
  control,
  register,
  errors,
  loader,
  mode,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filtered;
  }, [data, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData?.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math?.ceil(sortedData?.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden mt-ratio2 ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData?.map((row, index) => (
              <>
                <TableRow
                  key={row}
                  data={row}
                  columns={columns}
                  index={index}
                  isExpanded={expandedRow === row.id}
                  setExpandedRow={setExpandedRow}
                  fetchAppointment={fetchAppointment}
                  control={control}
                  register={register}
                  errors={errors}
                  mode={mode}
                />
              </>
            ))}
          </tbody>
        </table>
      </div>

      {loader ? (
        <DataLoader/>
      ) : paginatedData?.length === 0 && (
        <div className="text-center py-8 text-gray-500">No data found</div>
      )}

      {sortedData?.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  );
}
