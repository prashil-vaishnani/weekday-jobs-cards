export interface Job {
  companyName: string;
  jdLink: string;
  jdUid: string;
  jobDetailsFromCompany: string;
  jobRole: string;
  location: string;
  logoUrl: string;
  maxExp: number;
  maxJdSalary: number;
  minExp: number;
  minJdSalary: null;
  salaryCurrencyCode: string;
}

export interface JobsResponseType extends Response {
  result: {
    jdList: Job[];
    totalCount: number;
  };
}

export interface IJobsInitialState {
  jobsList: Job[];
  totalCount: number;
  loading: boolean;
  errors: string | string[];
}
