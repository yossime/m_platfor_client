import ProtectedRoute from "@/utils/ProtectedRoute";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProtectedRoute>
        {children}
      </ProtectedRoute>

    </>
  )
}