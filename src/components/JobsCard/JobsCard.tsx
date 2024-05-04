import { useMemo, useState } from "react";
import { Job } from "../../types/jobs";

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription = useMemo(() => {
    if (job.jobDetailsFromCompany.length > 150) {
      // Adjust character limit as needed
      return job.jobDetailsFromCompany.substring(0, 150) + "...";
    }
    return job.jobDetailsFromCompany;
  }, [job.jobDetailsFromCompany]);

  return (
    <div className="job-card">
      <h2>{job.companyName}</h2>
      <p className="company">
        {job.companyName} - {job.location}
      </p>
      <p className="description">
        {showFullDescription ? job.jobDetailsFromCompany : truncatedDescription}
        {job.jobDetailsFromCompany.length > 150 && (
          <button onClick={() => setShowFullDescription(!showFullDescription)}>
            {showFullDescription ? "Show Less" : "Show More"}
          </button>
        )}
      </p>
      <p className="experience">Experience: {job.maxExp}</p>
      <a href={job.jdLink} className="apply-button">
        Apply Now
      </a>
    </div>
  );
};

export default JobCard;
