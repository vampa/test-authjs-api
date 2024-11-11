import { auth } from "@/auth";
import { getDictionary } from "@/app/dictionaries";

import PublicHeader from "./PublicHeader";
import { Locale } from "../../../i18n.config";

interface Params {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Home({ params }: Params) {
  const { lang } = await params;

  const session = await auth();
  const dict = await getDictionary(lang);

  return (
    <div className="l-public">
      <PublicHeader session={session} />
      <div className="home">
        <div className="page">{dict.home.welcome}</div>
      </div>
    </div>
  );
}
