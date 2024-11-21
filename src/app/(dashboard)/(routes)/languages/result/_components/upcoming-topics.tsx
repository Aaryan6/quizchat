"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCardIcon } from "../../_utils";
import Link from "next/link";

export default function UpcomingTopics({
  topics,
  langId,
}: {
  topics: any[];
  langId: string;
}) {
  if (!topics?.length) return null;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h3 className="text-xl font-semibold text-[#517B7B] mb-4">
        Upcoming topics curated for you
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/languages/learn?lang=${langId}&topic=${topic.id}&level=${topic.level_id}&cards=1-5`}
          >
            <Card
              className="bg-[#F5F9FF] rounded-2xl hover:shadow-lg transition-shadow"
              style={{
                boxShadow: "0px 0px 8px 0px #0053F429",
              }}
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#517B7B]">
                  <span className="mr-2">{getCardIcon(topic.name)}</span>
                  {topic.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#A3A3A3]">
                  {topic.languages_db?.length || 0} flash cards
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
