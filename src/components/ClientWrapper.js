import { Providers } from "@/redux/provider";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppProvider from "@/provider/AppProvider";
import { Toaster } from "react-hot-toast";

export default function ClientWrapper({ children }) {
  return (
    <Providers>
      <ProtectedRoute>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </ProtectedRoute>
    </Providers>
  );
}