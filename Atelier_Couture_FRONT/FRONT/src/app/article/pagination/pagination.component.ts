import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  @Input() currentPage?:number;
  @Input() itemsPerPage: number = 4;
  @Input() pagination!:FormGroup;
  @Output() pageChange = new EventEmitter<number>();
  constructor(private formBuilder:FormBuilder){
    
  }
  ngOnInit(): void {
    this.pagination = this.formBuilder.group({
      
    });
  }

  // onChangePage(page: number) {
  //   this.currentPage = page; 
  // }
 

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

}
