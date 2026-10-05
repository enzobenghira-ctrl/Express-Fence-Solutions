// Spec kit files offered on /trade/spec-kit and /thank-you-trade. Put each PDF in
// public/downloads/ and set its href (e.g. "/downloads/wpc-fencing-spec-sheet.pdf").
// Files with href: null show as {{TODO}} placeholders.

export interface DownloadFile {
  label: string;
  href: string | null;
}

export const SPEC_KIT_FILES: DownloadFile[] = [
  { label: "Product catalog", href: null },
  { label: "WPC fencing spec sheet", href: null },
  { label: "WPC decking spec sheet", href: null },
  { label: "WPC wall cladding spec sheet", href: null },
  { label: "WPC pergola spec sheet", href: null },
  { label: "Gate spec sheet", href: null },
  { label: "Installation guides", href: null },
];
