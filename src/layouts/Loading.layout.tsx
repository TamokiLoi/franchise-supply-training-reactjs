import { useLoadingStore } from "@/stores";

export default function Loading() {
  const loading = useLoadingStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-600" />
    </div>
  );
}
