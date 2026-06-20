import { redirect } from "next/navigation";

const redirectTargets = {
  line: "https://lin.ee/Xa9aeab",
  "business-card": "/business-card",
} as const;

type RedirectTarget = keyof typeof redirectTargets;

type RedirectPageProps = {
  searchParams: Promise<{
    target?: string | string[];
  }>;
};

function getRedirectUrl(target: string | string[] | undefined) {
  const redirectTarget = Array.isArray(target) ? target[0] : target;

  if (redirectTarget && redirectTarget in redirectTargets) {
    return redirectTargets[redirectTarget as RedirectTarget];
  }

  return "/";
}

export default async function RedirectPage({
  searchParams,
}: RedirectPageProps) {
  const { target } = await searchParams;

  redirect(getRedirectUrl(target));
}
