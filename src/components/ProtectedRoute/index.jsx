"use client";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";

const ProtectedRoute = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();
  const pathname = usePathname();
  const noAuthRequired = ["/auth/login", "/auth/signup"];

  useEffect(() => {
    setMounted(true)
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!user && !noAuthRequired.includes(pathname)) {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    }
  }, [user, router, pathname, mounted]);


  if (!mounted || (loading && !noAuthRequired.includes(pathname))) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner color="#036666" size={100} />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
