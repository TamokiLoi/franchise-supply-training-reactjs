import { useState } from "react";

export const useApi = <T>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const call = async (fn: () => Promise<T>) => {
    try {
      setLoading(true);
      setError(null);
      return await fn();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { call, loading, error };
};
