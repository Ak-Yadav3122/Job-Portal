import { setAllJobs } from "@/redux/jobSlice";
import { jobAPI } from "@/utiles/constant";
import axiosInstance from '@/utils/axiosConfig';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchedQuery } = useSelector((store) => store.job);
  
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axiosInstance.get(`${jobAPI}/get?keyword=${searchedQuery}`);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchAllJobs();
  }, [searchedQuery, dispatch, navigate]);
};

export default useGetAllJobs;
