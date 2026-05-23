import { redirect } from "next/navigation";

export default function ScanRedirect({ params }: { params: { token: string } }) {
  // Tokens scanned directly by phone link arrive here.
  // We send to the partner scan page; the partner will paste/scan the token themselves
  // in the authenticated context. Optionally pre-fill via query param.
  redirect(`/partner/scan?token=${encodeURIComponent(params.token)}`);
}
