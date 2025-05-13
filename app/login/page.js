"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CustomLoader from "../loader/CustomLoader";

export default function RedirectToLogniPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return <CustomLoader />;
}
