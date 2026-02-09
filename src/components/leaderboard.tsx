import React from "react";
import Image from "next/image";
import "./leaderboard.css";
import ClipLoader from "react-spinners/ClipLoader";

const GlobalLeaderboard = ({
  leaderboardData,
  studentData,
  avatar,
  loading,
}: {
  leaderboardData: any;
  studentData: any;
  avatar: string;
  loading: boolean;
}) => {
  return (
    <div
      className={`lg:mt-auto lg:mb-auto lg:ml-0 lg:mr-0 xs:m-auto lg:w-[357px] xs:w-[343px] md:w-[704px] xs:h-auto lg:h-[480px] gap-0 lg:rounded-[16px] xs:rounded-[12px] border border-[#EBF3FF] shadow-[0px_0px_8px_0px_#0053F429]`}
    >
      <div className="text-xl font-semibold leading-[24.2px] text-center text-[#5B8989] mt-5 mb-6">
        Global Leaderboard
      </div>
      {loading && (
        <div className="flex flex-row justify-center mt-44 mb-44">
          <ClipLoader
            color={"#C4C3C1"}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loading"
          />
        </div>
      )}
      {!loading && (
        <div className="scroll-container">
          {leaderboardData &&
            leaderboardData.topTenStudentList &&
            leaderboardData.topTenStudentList.map(
              (entry: any, index: number) => {
                const studentMeta = leaderboardData.studentMeta[entry.userid];
                return (
                  <div
                    key={index}
                    className={`grid-container text-[14px] font-medium leading-[16.94px] text-left text-[#6C9D9D] p-2 pr-4 ${
                      index % 2 === 0 ? "bg-[#F2F4FD]" : "bg-white"
                    } ${
                      studentData?.studentId == entry.userid
                        ? "current-user-highlight"
                        : ""
                    }`}
                  >
                    <div className="mt-auto mb-auto">
                      {["1", "2", "3"].includes(entry.rank) ? (
                        <Image
                          src={`/images/icons/rank${
                            studentData?.studentId == entry.userid
                              ? "_current_"
                              : "_"
                          }${entry.rank}.svg`}
                          alt={entry.rank}
                          height={20}
                          width={20}
                          className={"h-[20px] w-[20px]"}
                        />
                      ) : (
                        <span className="ml-1">{entry.rank}</span>
                      )}
                    </div>
                    <span className="flex flex-row">
                      <Image
                        src={
                          studentMeta?.studentId == studentData?.studentId
                            ? avatar || "/images/default-profile.png"
                            : studentMeta?.pic || "/images/default-profile.png"
                        }
                        alt="pic"
                        height={20}
                        width={20}
                        className="mr-2 mt-auto mb-auto"
                      />
                      <div className="truncate mt-auto mb-auto">
                        {studentMeta?.studentName}
                      </div>
                    </span>
                    <div className="m-auto w-[20px]">
                      {" "}
                      <Image
                        src={
                          studentMeta?.countryName
                            ? `/images/countries/${studentMeta?.countryName}.png`
                            : "/images/countries/default_flag_globe.svg"
                        }
                        alt="country"
                        height={20}
                        width={20}
                        className="mt-auto mb-auto"
                      />
                    </div>
                    <div className="mt-auto mb-auto mr-2 text-right">
                      {entry.count}
                    </div>
                  </div>
                );
              }
            )}
        </div>
      )}
    </div>
  );
};

export default GlobalLeaderboard;
