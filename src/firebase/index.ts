"use client";

import React from "react";

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // The actual Firebase initialization will be added here later.
  // For now, this placeholder provider simply renders its children.
  return children;
}
