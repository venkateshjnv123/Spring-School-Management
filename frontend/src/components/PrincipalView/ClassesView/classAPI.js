import axios from "axios";

export const fetchSeatAllocation = async (classId, token) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/class/${classId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const fetchStudents = async (token) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/student`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchUnseatedStudents = async (token) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/student/getNotSeatedStudents/false`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const postSeatAllocation = async (classId, payload, token) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/class/postSeating/${classId}`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};

export const deleteSeatAllocation = async (seatingId, studentId, token) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_URL}/class/${seatingId}/student/${studentId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response;
};
