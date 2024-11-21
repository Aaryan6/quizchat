import apiService from "../apiService";

export const getSubjectWise = async ({
  userId,
  subjectId,
}: {
  userId: string | null;
  subjectId: number | null;
}) => {
  try {
    const params = {
      studentId: userId,
      subjectId: subjectId,
    };

    const response = await apiService.get(`/dashboard/subjectWise`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getStudentDashboard = async ({
  studentId,
  subjectId,
}: {
  studentId: string | null;
  subjectId: number | null;
}) => {
  try {
    const params = {
      studentId,
      subjectId,
    };

    const response = await apiService.get(`/dashboard/student`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getStudentTopics = async ({
  course,
  studentId,
  grade,
}: {
  studentId: string | null;
  course: string | null;
  grade: string | null;
}) => {
  try {
    const params = {
      studentId,
      course,
      grade,
    };

    const response = await apiService.get(`/dashboard/topic`, { params });

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getLanguageDashboard = async ({
  userId,
  lang,
}: {
  userId: string | null;
  lang: number | null;
}) => {
  try {
    const params = {
      userId,
      languageId: lang,
    };
    const response = await apiService.get(`/language-learning/leaderboard`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getStudentActivity = async ({
  studentId,
  subjectId,
}: {
  studentId: string | null;
  subjectId: number | null;
}) => {
  try {
    const params = {
      studentId,
      subjectId,
    };

    const response = await apiService.get(`/dashboard/activity`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
