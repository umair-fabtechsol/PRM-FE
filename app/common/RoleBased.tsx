// components/RoleBased.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { getUserRole } from '@/app/utils/auth';

export default function RoleBased({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(getUserRole());
  }, []);

  if (!role || !allowedRoles.includes(role)) return null;

  return <>{children}</>;
}
