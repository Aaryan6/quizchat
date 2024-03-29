import DetailsDialog from "@/components/details-dialog";
import HistoryCard from "@/components/history-card";
import InitialAssessmentCard from "@/components/initial-assessment-card";
import InitialAssessmentDialog from "@/components/initial-assessment-dialog";
import QuizMeCard from "@/components/quiz";

const Home = async () => {
  return (
    <div className="p-12 max-w-6xl mx-auto">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-semibold tracking-tight">
          Dashboard
        </h2>
        <DetailsDialog />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <InitialAssessmentCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-1">
        <QuizMeCard />
      </div>
      <InitialAssessmentDialog />
    </div>
  );
};

export default Home;
