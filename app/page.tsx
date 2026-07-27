
import { getStaffList } from "@/app/actions/staff"
import StaffTable from "@/components/StaffTable";
export default async function Home() {
  const staff = await getStaffList();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <StaffTable data={staff} />
    </div>
  );
}
