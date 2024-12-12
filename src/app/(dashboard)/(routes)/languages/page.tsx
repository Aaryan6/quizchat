import { redirect } from "next/navigation";
import {
  getLanguageIdByName,
  getLanguageLevels,
  getTotalQuestionsCount,
} from "@/actions/language.actions";
import LanguageDashboard from "./components/language-dashboard";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { lang: string };
}) {
  if (!searchParams.lang) {
    redirect("/student-dashboard");
  }

  const [levels, langInfo, totalQuestions] = await Promise.all([
    getLanguageLevels(),
    getLanguageIdByName(searchParams.lang),
    getTotalQuestionsCount(),
  ]);

  if (!levels || !langInfo) {
    redirect("/student-dashboard");
  }

  return (
    <LanguageDashboard
      levels={levels}
      lang={searchParams.lang}
      langId={langInfo.id}
      totalQuestions={totalQuestions}
    />
  );
}
