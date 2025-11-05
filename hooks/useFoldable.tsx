import { useEffect, useState } from "react";

export function useIsFolded() {
  const [folded, setFolded] = useState(false);

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      // Typical folded range for Galaxy Z Fold / Pixel Fold
      setFolded(width >= 600 && width <= 840);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return folded;
}
