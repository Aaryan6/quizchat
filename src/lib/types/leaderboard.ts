export interface LeaderboardResponse {
  msg: string;
  leaderboard: {
    topTenStudentList: {
      user_id: string;
      totalPoints: string;
      rank: string;
    }[];
  };
}
