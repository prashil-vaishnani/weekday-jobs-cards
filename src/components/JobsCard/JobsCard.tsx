import { useEffect, useMemo, useRef, useState } from "react";
import { Job } from "../../types/jobs";
import "./JobsCard.css";

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState("auto");

  const toggleContent = () => {
    setShowFullDescription(!showFullDescription);
    setIsExpanded(!isExpanded);
  };
  const truncatedDescription = useMemo(() => {
    if (job.jobDetailsFromCompany.length > 150) {
      // Adjust character limit as needed
      return job.jobDetailsFromCompany.substring(0, 150) + "...";
    }
    return job.jobDetailsFromCompany;
  }, [job.jobDetailsFromCompany]);

  useEffect(() => {
    if (isExpanded && contentRef) {
      const actualHeight = contentRef.current?.scrollHeight;
      setContentHeight(actualHeight + "px"); // Set actual height
    } else {
      setContentHeight("8em"); // Reset to initial height
    }
  }, [isExpanded]);
  return (
    <div className="job-card">
      <div className="job-card_top">
        <div className="job-card_top_left">
          <img
            className="job-card_top_left_img"
            src={job.logoUrl}
            alt={`image-${job.companyName}`}
          />
        </div>
        <div className="job-card_top_right">
          <div className="companyName">{job.companyName}</div>
          <div className="jobRole">{job.jobRole}</div>
          <div className="location">{job.location}</div>
        </div>
      </div>
      <div className="salary">
        Estimated Salary: {job.minJdSalary || "NA"}-{job.maxJdSalary || "NA"}{" "}
        LPA
      </div>
      <div className="about_company">
        <h3>About Company :</h3>
        {/* </div>
      <div className="description"> */}
        <p>About us</p>
        {/* <p className="description_text">
          {showFullDescription
            ? job.jobDetailsFromCompany
            : truncatedDescription}
          {job.jobDetailsFromCompany.length > 150 && (
            <button
              className="decription_btn"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Show Less" : "Show More"}
            </button>
          )}
        </p> */}
        <div className="content">
          <div className="post">
            <div className="hideContent" style={{ height: contentHeight }}>
              <div className="post-text" ref={contentRef}>
                {showFullDescription
                  ? job.jobDetailsFromCompany
                  : truncatedDescription}
              </div>
            </div>
            <div className="showMore">
              <a onClick={toggleContent}>
                {isExpanded ? "Show less" : "Show more"}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="experience">
        <div> Minimum Experience :</div>
        <div>{job.minExp ? job.minExp + " years" : "NA"}</div>
      </div>
      <button>
        {" "}
        <span className="lighting">⚡</span> Easy Apply
      </button>
    </div>
  );
};

export default JobCard;
