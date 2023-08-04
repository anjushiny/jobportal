import { Component, OnInit } from '@angular/core';
import { JobsdetailsService } from '../jobsdetails.service';
import { Location } from '@angular/common';
import { HighlightPipePipe } from '../highlight-pipe.pipe';
import { Job } from '../models/Job';
import { FilterPipe } from '../filter.pipe';
import { NgToastService } from 'ng-angular-popup';

interface HighlightedText {
  text: string;
  highlight: boolean;

}


@Component({
  selector: 'app-jobssection',
  templateUrl: './jobssection.component.html',
  providers: [HighlightPipePipe,FilterPipe],
  styleUrls: ['./jobssection.component.scss']
})
export class JobssectionComponent implements OnInit {
  jobsList: any[] = [];
  itemsPerPage: number = 9; 
  currentPage: number = 1; 
  totalPages: number = 0; 
  pages: number[] = []; 
  displayedJobsList: any[] = [];
  selectedJob: any = {};
 

  
  showEditFormFlag: boolean = false;
 
  selectedResultIndex: number | null = null;

  searchQuery: string;

  searchResults: any[] | null = [];

  searchText: string = '';

  filteredJobs: Job[] = [];

  jobs: any;

  recentSearches: any;
  dialogService: any;
  Delete: any;


  constructor(private jobsint:JobsdetailsService , private location: Location, private toast: NgToastService,) { 
    this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
    this.generatePageNumbers();
    this.searchQuery = '';
    this.searchResults = [];
    this.filteredJobs = this.jobs;
    
  }
  updateDisplayedJobs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedJobsList = this.jobsList.slice(startIndex, endIndex);
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
      this.generatePageNumbers(); 
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


      if(this.selectedJob && this.selectedJob.jobId){
        this.selectedJob= this.jobsList.find(job =>job.jobId ===this.selectedJob.jobId);


        this.selectedJob.postedDate = new Date(this.selectedJob.postedDate);
        this.selectedJob.endDate = new Date(this.selectedJob.endDate);
      }
    });
  }
  

  showEditForm(job: any) {
    this.selectedJob = { ...job }; // Create a copy of the selected job to avoid modifying the original data directly
    this.showEditFormFlag = true;
  }
 
  hideEditForm(): void {
    this.showEditFormFlag = false;
  }

  cancelEditForm(): void {
    this.showEditFormFlag = false;

  }


  onSubmit() {
    this.jobsint.editmethod(this.selectedJob.jobId, this.selectedJob).subscribe(
      (response) => {
  
        this.toast.success({detail:"updated successfully", duration: 3000});
        console.log('Job updated successfully:', response);
  
        this.hideEditForm(); // Hide the edit form after successful update
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    );
  }


delete(jobId:number){
  // if (confirm('Are you sure you want to delete this job?')){
  this.jobsint.deletemethod(jobId).subscribe(
    (response) =>{
      // alert("Job updated successfully");
      this.toast.success({detail:"deleted successfully", duration: 3000});
      console.log('Job del successfully:', response);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    (error) => {
      alert("An error occurred while deleting the job."); // Show an error message if deletion fails.
      console.error(error); // Log the error to the console if needed for debugging purposes.
    }
    
  )
}

search() {

  this.searchResults = this.jobsList.filter(job => {

    return job.jobTitle.toLowerCase().includes(this.searchText.toLowerCase());

  });

  if (this.searchText && !this.recentSearches.includes(this.searchText)) {

    this.recentSearches.unshift(this.searchText);

  }

  this.searchText = '';

}


selectResult() {

  if (this.searchResults && this.searchResults.length > 0) {

    const selectedResult = this.searchResults[0];

   this.searchQuery = '';

    this.searchResults = null;

  }

}

clearSearch() {

  this.searchText = ''; // Clear the search text

  this.filteredJobs = this.jobs; // Reset the filtered jobs to show all jobs

  console.log('Clear search clicked');

}

onEnterPressed(event: any) {

  event.preventDefault();

  // Implement your logic when the enter key is pressed

  console.log('Enter key pressed');

  this.search(); // Call the search method on enter key press

}

highlightSearchText(text: string): string {

  if (!this.searchText || !text) {

    return text;

  }


  const searchRegex = new RegExp(this.searchText, 'gi');

  return text.replace(searchRegex, match => `<span class="highlight">${match}</span>`);

}


highlightText(text: string): HighlightedText[] {

  const highlightedText: HighlightedText[] = [];

  if (this.searchText && text) {

    const parts = text.split(new RegExp(`(${this.searchText})`, 'gi'));

  parts.forEach(part => {

      if (part.toLowerCase() === this.searchText.toLowerCase()) {

        highlightedText.push({ text: part, highlight: true });

      } else {

        highlightedText.push({ text: part, highlight: false });

      }

    });

  } else {

    highlightedText.push({ text: text, highlight: false });

  }



  return highlightedText;

}

}



