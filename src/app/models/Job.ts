// export interface Job {
//     jobId(jobId: any, selectedJob: Job): unknown;

//     jobTitle: string;

//     companyName: string;

//     experience: string;

//     skills: string[];

//     jobPositions: number;

//     jobType: string;

//     qualification: string;

//     postedDate: Date;

//     endDate: Date;

//     location: string;

//     description: string;

//     positionCount: number;

//   }
export interface Job {
  jobId(jobId: any, selectedJob: Job): unknown;
  jobTitle: string;
  companyName: string;
  experience: string;
  skills: string[];
  jobPositions: number;
  jobType: string;
  qualification: string;
  postedDate: Date;
  endDate: Date;
  location: string;
  description: string;
  positionCount: number;
}