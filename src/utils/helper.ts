import { Job, filterType } from "../types/jobs";

export const filterJobsHelper = (jobs: Job[], filters: filterType) => {
  return jobs.filter((job: Job) => {
    const {
      minExperience,
      companyName,
      location,
      remoteOnsite,
      role,
      minBasePay,
    } = filters;

    let match1 = true,
      match2 = true,
      match3 = true,
      match4 = true,
      match6 = true,
      match7 = true;

    if (minExperience && job.minExp < +minExperience) {
      match1 = false;
    }
    if (
      companyName &&
      !job.companyName.toLowerCase().includes(companyName.toLowerCase())
    ) {
      match2 = false;
    }
    if (
      location &&
      !job.location.toLowerCase().includes(location.toLowerCase())
    ) {
      match3 = false;
    }
    if (
      remoteOnsite &&
      remoteOnsite === "remote" &&
      job.location !== remoteOnsite
    ) {
      match4 = false;
    }
    if (role && !job.jobRole.toLowerCase().includes(role.toLowerCase())) {
      match6 = false;
    }
    if (minBasePay && Number(job.minJdSalary) < Number(minBasePay)) {
      match7 = false;
    }

    return match1 && match2 && match3 && match4 && match6 && match7;
  });
};
