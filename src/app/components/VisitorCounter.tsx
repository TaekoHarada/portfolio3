"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT_VISITOR}/visitor`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch visitor count");
        }

        const data = await response.json();
        setCount(data.count);
      } catch (err) {
        console.error("Error fetching visitor count:", err);
        setError("カウントの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
        <span>読み込み中...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-sm text-red-600">{error}</div>;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <svg
        className="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      <span className="text-gray-700">
        <span className="font-semibold text-gray-900">
          {count?.toLocaleString()} visitors
        </span>
      </span>
    </div>
  );
}
