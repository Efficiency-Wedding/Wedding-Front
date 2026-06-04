import { createFileRoute } from "@tanstack/react-router";
import Home from "@/components/sections/home";

export const Route = createFileRoute("/")({
  component: Home,
});
