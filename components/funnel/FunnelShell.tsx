import type { ReactNode } from "react";
import FunnelHeader from "@/components/funnel/FunnelHeader";
import FunnelFooter from "@/components/funnel/FunnelFooter";

/**
 * Chrome for landing, application and thank-you pages: logo only, no nav menu,
 * no top bar, no sticky bar — nothing competes with the page's one action.
 */
export default function FunnelShell({ children }: { children: ReactNode }) {
  return (
    <>
      <FunnelHeader />
      {children}
      <FunnelFooter />
    </>
  );
}
