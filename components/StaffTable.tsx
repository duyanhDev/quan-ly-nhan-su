"use client";

import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import StaffModal from "./StaffModal";
import { deleteStaff } from "@/app/actions/staff";
import { Staff } from "@/types/staff";

interface StaffTableProps {
    data: Staff[];
}

export default function StaffTable({ data }: StaffTableProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Staff | null>(null);

    const handleAdd = () => {
        setEditing(null);
        setModalOpen(true);
    };

    const handleEdit = (staff: Staff) => {
        setEditing(staff);
        setModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Xóa nhân viên này?")) {
            await deleteStaff(id);
        }
    };

    const columns: TableColumn<Staff>[] = [
        { name: "Họ tên", selector: (row) => row.name, sortable: true },
        { name: "Email", selector: (row) => row.email, sortable: true },
        { name: "Tuổi", selector: (row) => row.age, sortable: true },
        {
            name: "Thao tác",
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(row)}
                        className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-600 hover:bg-blue-100"
                    >
                        Sửa
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="rounded bg-red-50 px-2 py-1 text-xs text-red-600 hover:bg-red-100"
                    >
                        Xóa
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="mx-auto max-w-5xl p-8">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Quản lý nhân sự</h1>
                <button
                    onClick={handleAdd}
                    className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-zinc-800"
                >
                    + Thêm nhân viên
                </button>
            </div>

            <DataTable columns={columns} data={data} pagination highlightOnHover pointerOnHover />

            <StaffModal open={modalOpen} onClose={() => setModalOpen(false)} initialData={editing} />
        </div>
    );
}