import { isTodo, type Fact } from "@/lib/facts";

/** Renders a confirmed fact as plain text, or an unconfirmed one as a loud {{TODO}} badge. */
export default function FactText({ value }: { value: Fact | null | undefined }) {
  if (value === null || value === undefined) return <span className="efs-todo">{"{{TODO}}"}</span>;
  if (isTodo(value)) return <span className="efs-todo">{`{{TODO: ${value.todo}}}`}</span>;
  return <>{value}</>;
}
