import { useEffect, useRef, useState } from "react";
import JobCard from "../JobsCard/JobsCard";
import { requestOptions } from "../../services/Jobs.services";
import { Job } from "../../types/jobs";
import TopFillter from "../TopFillter/TopFillter";
import { dispatch } from "../../redux/store";
import {
  getJobsListSuccess,
  setTotalJobsCount,
} from "../../redux/slice/JobsSlice";

const JobsList = () => {
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noJobs, setNoJobs] = useState<boolean>(false);
  const jobsContainerRef = useRef<HTMLDivElement>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const body = JSON.stringify({
      limit: 10,
      offset: (currentPage - 1) * 10,
    });
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
      ...requestOptions,
      body,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setJobsList((prev) => [...prev, ...result.jdList]);
        setTotalCount(result.totalCount);
        dispatch(getJobsListSuccess(result.jdList));
        dispatch(setTotalJobsCount(result.totalCount));
      })
      .catch((error) => console.error(error));
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (jobsList.length > 0 && jobsList.length === totalCount) {
      setNoJobs(true);
    } else if (!isLoadingMore && jobsContainerRef.current) {
      const { scrollHeight, scrollTop, clientHeight } =
        jobsContainerRef.current;
      if (scrollHeight - scrollTop - clientHeight < 50) {
        setCurrentPage((prevPage) => prevPage + 1);
        setIsLoadingMore(true);
      }
    }
  };

  return (
    <>
      <TopFillter />
      <div ref={jobsContainerRef} className="jobs-container">
        {jobsList?.map((job) => {
          return <JobCard job={job} />;
        })}
        {isLoadingMore && <p>Loading More Jobs...</p>}
        {noJobs && <p>no more jobs available</p>}
      </div>
    </>
  );
};

export default JobsList;
