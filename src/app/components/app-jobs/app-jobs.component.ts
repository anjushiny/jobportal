import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppliedJobsService } from 'src/app/applied-jobs.service';
import { JobsdetailsService } from 'src/app/jobsdetails.service';
import { HighlightPipePipe } from 'src/app/highlight-pipe.pipe';
@Component({
  selector: 'app-app-jobs',
  templateUrl: './app-jobs.component.html',
  providers: [HighlightPipePipe],
  styleUrls: ['./app-jobs.component.scss']
})
export class AppJobsComponent implements OnInit {
  jobsList: any[] = [];
  itemsPerPage: number = 12; 
  currentPage: number = 1; 
  totalPages: number = 0; 
  pages: number[] = []; 
  searchQuery: string;

  searchResults: any[] | null = [];

  selectedResultIndex: number | null = null;

  displayedJobsList: any[] = [];
  currentJobForUpload: any = null;
  isUploadingResume: boolean = false; 
  showUploadPopupFlag: boolean = false;

  constructor(private jobsint:JobsdetailsService, private appliedJobsService: AppliedJobsService, private http: HttpClient) { 
    this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
    this.generatePageNumbers();
    this.searchQuery = '';

    this.searchResults = [];
  }
  updateDisplayedJobs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedJobsList = this.jobsList.slice(startIndex, endIndex);

  

  }
  toggleDetails(item: any) {
    item.showDetails = !item.showDetails;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
      window.scrollTo(0, 0);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
      window.scrollTo(0, 0);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedJobs();
      // this.generatePageNumbers(); 
    }
  }
 
  generatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  
  istrue = false
  ngOnInit(): void {
    this.jobsint.getmethod().subscribe(data => {
      this.jobsList = data;
      
      this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
      this.generatePageNumbers();
      this.updateDisplayedJobs();

      
    });
  }

  
  apply(item: any) {
    const endpoint = 'https://localhost:7058/api/Applied/ApplyForJob';
  
    this.http.post(endpoint, { jobsObj: item }).subscribe(
      response => {
        console.log('Applied for the job:', response);
        alert("Job applied success")
      
         item.applied=true
  
        
       
      }
    );

       }
 

      //  showUploadPopup() {
      //   this.showUploadPopupFlag = true;
      // }
    
      // cancelUploadPopup() {
      //   this.showUploadPopupFlag = false;
      // }
    
      // saveUploadedResume(file: File) {
      //   // Handle the uploaded file here
      //   console.log(file);
      //   this.showUploadPopupFlag = false;
      // } this is already in comment only
      

      // saveResume(fileInput: any) {

      //   const file: File = fileInput.files[0];

      //   this.jobsint.uploadResume(file).subscribe(

      //     response => {

      //       // Handle success response

      //       console.log('Resume uploaded successfully:', response);

      //       alert("Resemue uploaded sucessfully")

      //     },

       

      //   );

      // }
       // Variable to store the job for which resume is being uploaded

  showUploadPopup(job: any) {
    this.currentJobForUpload = job; // Set the current job for upload
    this.showUploadPopupFlag = true;
  }

  cancelUploadPopup() {
    this.showUploadPopupFlag = false;
  }

  saveResume(fileInput: any) {
    const file: File = fileInput.files[0];

    this.isUploadingResume = true; // Set the flag to indicate that resume is being uploaded

    this.jobsint.uploadResume(file).subscribe(
      response => {
        // Handle success response
        console.log('Resume uploaded successfully:', response);
        alert("Resume uploaded successfully");
        this.isUploadingResume = false; // Reset the flag once the resume is uploaded
        this.showUploadPopupFlag = false; // Close the upload popup
        if (this.currentJobForUpload) {
          this.currentJobForUpload.applied = true; // Mark the job as applied after successful upload
        }
      },
      error => {
        // Handle error response
        console.error('Error uploading resume:', error);
        alert("Error uploading resume");
        this.isUploadingResume = false; // Reset the flag in case of error
      }
    );
  }
      search() {

        this.searchResults = this.jobsList.filter(job => {
      
          return job.jobTitle.toLowerCase().includes(this.searchQuery.toLowerCase());
      
        });
      
      
      
      
        // Sort the search results based on the JobTitle property
      
        this.searchResults.sort((a, b) => {
      
          const titleA = a.jobTitle.toLowerCase();
      
          const titleB = b.jobTitle.toLowerCase();
      
          if (titleA < titleB) return -1;
      
          if (titleA > titleB) return 1;
      
          return 0;
      
        });
      
      }
      
      
      
      
      navigateResults(direction: 'up' | 'down') {
      
        if (this.searchResults) {
      
          if (direction === 'up') {
      
            if (this.selectedResultIndex === null || this.selectedResultIndex === 0) {
      
              this.selectedResultIndex = this.searchResults.length - 1;
      
            } else {
      
              this.selectedResultIndex--;
      
            }
      
          } else if (direction === 'down') {
      
            if (this.selectedResultIndex === null || this.selectedResultIndex === this.searchResults.length - 1) {
      
              this.selectedResultIndex = 0;
      
            } else {
      
              this.selectedResultIndex++;
      
            }
      
          }
      
        }
      
      }
      
      get selectedIndex() {
      
        return this.selectedResultIndex !== null ? this.selectedResultIndex : -1;
      
      }
      
      
      
      
      selectResult() {
      
        if (this.searchResults && this.searchResults.length > 0) {
      
          const selectedResult = this.searchResults[0]; // Assuming the first result is selected
      
          // Do something with the selected result, e.g., display details, navigate to a page, etc.
      
          // ...
      
          // Close the search or perform any other desired actions
      
      
      
      
      
          this.searchQuery = '';
      
          this.searchResults = null;
      
        }
      
      }
      
      
      
      
      removeResult(result: any): void {
      
        if (this.searchResults && this.searchResults.length > 0) {
      
          const index = this.searchResults.indexOf(result);
      
          if (index !== -1) {
      
            this.searchResults.splice(index, 1);
      
          }
      
        }
      
      }
      
      clearSearch() {
      
        this.searchQuery = ''; // Clear the search query
      
        this.searchResults = null; // Reset the search results
      
      }

    }
