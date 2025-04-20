'use client";';
import { useEffect, useRef } from "react";

type Props = {
  totalRows: number;
  selectedCount: number;
  onToggle: () => void;
};

export default function TableHeaderCheckbox({
  totalRows,
  selectedCount,
  onToggle,
}: Props) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const allSelected = selectedCount === totalRows;
  const someSelected = selectedCount > 0 && selectedCount < totalRows;

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      className="w-5 h-5 accent-blue-600 rounded"
      checked={allSelected && totalRows > 0}
      onChange={onToggle}
      disabled={totalRows === 0}
    />
  );
}
