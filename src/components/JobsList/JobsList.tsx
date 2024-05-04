import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import JobCard from "../JobsCard/JobsCard";
import { requestOptions } from "../../services/Jobs.services";
import { Job } from "../../types/jobs";
import TopFillter from "../TopFillter/TopFillter";
import { dispatch } from "../../redux/store";
import {
  getJobsListLoading,
  getJobsListSuccess,
  setTotalJobsCount,
} from "../../redux/slice/JobsSlice";
import "./JobsList.css";

const JobsList = () => {
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noJobs, setNoJobs] = useState<boolean>(false);
  const jobsContainerRef = useRef<HTMLDivElement>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchJobsList = useCallback(() => {
    const body = JSON.stringify({
      limit: 12,
      offset: (currentPage - 1) * 10,
    });
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
      ...requestOptions,
      body,
    })
      .then((response) => response.json())
      .then((result) => {
        setJobsList((prevJobs) => [...prevJobs, ...result.jdList]);
        setTotalCount(result.totalCount);
        dispatch(getJobsListSuccess(result.jdList));
        dispatch(setTotalJobsCount(result.totalCount));
        setIsLoadingMore(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoadingMore(false));
  }, [currentPage]);

  useEffect(() => {
    // initial fetch Jobs List
    dispatch(getJobsListLoading());
    fetchJobsList();
  }, [currentPage]);

  // handle fast scroll to bottom of the page
  const debouncedHandleScroll = useMemo(() => {
    let timeout: unknown = null;

    const handleScroll = () => {
      if (jobsList.length === totalCount) {
        setNoJobs(true);
        return;
      }
      if (isLoadingMore) return;
      if (jobsContainerRef.current) {
        const { scrollHeight, scrollTop, clientHeight } =
          jobsContainerRef.current;
        if (scrollHeight - scrollTop - clientHeight < 50) {
          setCurrentPage((prevPage) => prevPage + 1);
          setIsLoadingMore(true);
        }
      }
    };

    return () => {
      if (timeout) {
        clearTimeout(timeout as number);
      }
      timeout = setTimeout(() => {
        handleScroll();
      }, 500);
    };
  }, [jobsList, totalCount, isLoadingMore, jobsContainerRef]);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, [debouncedHandleScroll]);

  return (
    <>
      <TopFillter />
      <div ref={jobsContainerRef} className="jobs-container">
        {jobsList?.map((job) => {
          return <JobCard job={job} key={job.jdUid} />;
        })}
        {isLoadingMore && <p>Loading More Jobs...</p>}
        {noJobs && <p>no more jobs available</p>}
      </div>
    </>
  );
};

export default JobsList;
