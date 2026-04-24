import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";
import { StatCard } from "../components/StatCard";
import { useTheme } from "@/context/ThemeContext";

export function Dashboard() {
  const { user } = useAuth();
  const [postCount, setPostCount] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    void (async () => {
      const res = await apiFetch("/posts");
      if (!res.ok) return;
      const data = (await res.json()) as { posts: unknown[] };
      setPostCount(data.posts.length);
    })();
  }, [user?.id]);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <section className={"rounded border border-neutral-600 p-4" + (theme==="light"? " bg-neutral-200 text-black" : " bg-neutral-900 text-white placeholder-white")}>
        <h2 className="mb-2 font-medium">Creator profile</h2>
        <div className="flex gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-700 text-lg">
            {user?.name?.charAt(0) ?? "?"}
          </div>
          <div>
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-neutral-400">{user?.email}</div>
            <p className={"mt-1 text-sm text-neutral-300" + (theme==="light"? " bg-neutral-200 text-neutral-600" : " bg-neutral-900 text-white placeholder-white")}>{user?.bio}</p>
          </div>
        </div>
      </section>
      <section className="grid gap-3 sm:grid-cols-2">
        <StatCard label="Your posts" value={postCount ?? "—"} style={{ marginBottom: 8 , backgroundColor: (theme==="light"? "white" : "grey")}}  />
        <StatCard label="Workspace" value="CreatorHub" style={{ marginBottom: 8,  backgroundColor: (theme==="light"? "white" : "grey") }} />
      </section>
    </div>
  );
}
