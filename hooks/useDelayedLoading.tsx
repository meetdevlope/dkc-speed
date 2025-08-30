import { useEffect, useState } from "react";

const useDelayedLoading = (loading: boolean, delayInSeconds = 0.6) => {
  const [isDelayedLoading, setIsDelayedLoading] = useState(loading);

  useEffect(() => {
    let timeoutId;
    if (loading) {
      timeoutId = setTimeout(() => {
        setIsDelayedLoading(true);
      }, 0);
    } else {
      timeoutId = setTimeout(() => {
        setIsDelayedLoading(false);
      }, delayInSeconds * 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [loading, delayInSeconds]);

  return isDelayedLoading;
};

export default useDelayedLoading;
