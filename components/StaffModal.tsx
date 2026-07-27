"use client";

import { createStaff, updateStaff } from "@/app/actions/staff";
import { Staff } from "@/types/staff";

interface StaffModalProps {
    open: boolean;
    onClose: () => void;
    initialData?: Staff | null;
}

export default function StaffModal({ open, onClose, initialData }: StaffModalProps) {
    if (!open) return null;

    const action = initialData
        ? updateStaff.bind(null, initialData.id)
        : createStaff;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">
                    {initialData ? "Sửa nhân viên" : "Thêm nhân viên "}
                </h2>

                <form
                    action={async (formData) => {
                        await action(formData);
                        onClose();
                    }}
                    className="flex flex-col gap-3"
                >
                    <input
                        name="name"
                        defaultValue={initialData?.name}
                        placeholder="Họ tên"
                        required
                        className="rounded border px-3 py-2 text-sm"
                    />
                    <input
                        name="email"
                        type="email"
                        defaultValue={initialData?.email}
                        placeholder="Email"
                        required
                        className="rounded border px-3 py-2 text-sm"
                    />
                    <input
                        name="age"
                        type="number"
                        defaultValue={initialData?.age}
                        placeholder="Tuổi"
                        required
                        className="rounded border px-3 py-2 text-sm"
                    />
                    {!initialData && (
                        <input
                            name="avatarUrl"
                            placeholder="URL ảnh đại diện (tạm thời, chưa có upload)"
                            className="rounded border px-3 py-2 text-sm"
                        />
                    )}

                    <div className="mt-2 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded border px-4 py-2 text-sm hover:bg-zinc-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-zinc-800"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}