import ChildrenBody from "@/components/ChildrenBody";
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <ChildrenBody>{children}</ChildrenBody>
    </div>
  );
}