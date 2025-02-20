import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

function useSelectedProject() {
  const [selectedProjectId, setProjectId] = useState(() => {
    const savedSelectedId = localStorage.getItem("selectedProjectId");
    return savedSelectedId !== null ? JSON.parse(savedSelectedId) : 0;
  });

  useEffect(() => {
    localStorage.setItem("selectedProjectId", JSON.stringify(selectedProjectId));
  }, [selectedProjectId]);

  const queryClient = useQueryClient(); // ✅ Use existing Query Client

  const queryResult = useQuery({
    queryKey: ["selectedProject", selectedProjectId],
    queryFn: async () => {
      const projects = queryClient.getQueryData(["projects"]); // ✅ Correctly access cached projects
      if (!projects) return null; // ✅ Prevent errors if projects are not available
      return projects.find((p) => p.id === selectedProjectId) || null;
    },
    enabled: !!selectedProjectId, // ✅ Ensure query only runs when selectedProjectId is valid
  });

  return { ...queryResult, selectedProjectId, setProjectId };
}

export default useSelectedProject;
