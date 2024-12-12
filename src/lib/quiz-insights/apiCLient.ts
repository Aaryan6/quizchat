import apiService from "../apiService";

interface Props {
  mentorId: any;
  userId: number;
  page: any;
  quizId?: any;
}

interface Params {
  studentId: any;
  limit: any;
  page: any;
  mentorId: any;
  quizId?: any;
}

export const getAccuracyScores = async (mentorId: any, userId: any) => {
  try {
    const response = await apiService.get(
      `/insights/accuracy/scores?studentId=${userId}&mentorId=${mentorId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getQuizDetails = async (
  mentorId: any,
  userId: any,
  page: any,
  quizId: any = null
) => {
  try {
    const params: Params = {
      studentId: userId,
      limit: 10,
      page: page,
      mentorId: mentorId,
    };

    if (quizId !== null) {
      params.quizId = quizId;
    }
    const response = await apiService.get(`/insights/quiz`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
