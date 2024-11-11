import { auth } from "@/auth";
import { getDictionary } from "@/app/dictionaries";
import PublicHeader from "./PublicHeader";

import { Locale } from "../../../i18n.config";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
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
