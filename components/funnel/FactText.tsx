import { SHOW_TODOS, isTodo, type Fact } from "@/lib/facts";

/**
 * Renders a confirmed fact as plain text. An unconfirmed one shows as a loud {{TODO}}
 * badge on previews and renders nothing in production.
 */
export default function FactText({ value }: { value: Fact | null | undefined }) {
  if (value === null || value === undefined || isTodo(value)) {
    if (!SHOW_TODOS) return null;
    return <span className="efs-todo">{`{{TODO${isTodo(value) ? `: ${value.todo}` : ""}}}`}</span>;
  }
  return <>{value}</>;
}

/** A free-standing {{TODO}} note (not tied to a fact). Previews only. */
export function TodoNote({ children }: { children: string }) {
  if (!SHOW_TODOS) return null;
  return <span className="efs-todo">{`{{TODO: ${children}}}`}</span>;
}
