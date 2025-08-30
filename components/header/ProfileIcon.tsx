"use client";

import { useAuthStore } from "store/auth";

const ProfileText = () => {
  const isAuthenticated = useAuthStore().isAuthenticated;

  return (
    <h6 className="hidden text-white md:block">
      {isAuthenticated ? "My Profile" : "Login"}
    </h6>
  );
};

export default ProfileText;
