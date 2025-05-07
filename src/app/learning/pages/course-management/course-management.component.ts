import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Course} from '../../model/course.entity';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {CourseService} from '../../services/course.service';
import {CourseCreateAndEditComponent} from '../../components/course-create-and-edit/course-create-and-edit.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-course-management',
  imports: [
    CourseCreateAndEditComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatSortHeader,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatRowDef,
    NgClass,
    MatIcon,
    MatPaginator,
    MatRow
  ],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit, AfterViewInit {
  protected courseData!: Course;
  protected columnsToDisplay: string[] = ['id', 'title', 'description', 'actions' ];
  @ViewChild(MatPaginator, { static : false}) protected paginator!: MatPaginator;
  @ViewChild(MatSort) protected sort!: MatSort;
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;
  private courseService: CourseService = inject(CourseService);

  constructor() {
    this.editMode = false;
    this.courseData = new Course({});
    this.dataSource = new MatTableDataSource();
    console.log(this.courseData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    this.getAllCourses();
  }

  protected onEditItem(item: Course) {
    this.editMode = true;
    this.courseData = item;
  }

  protected onDeleteItem(item: Course) {
    this.deleteCourse(item.id);
  }

  protected onCancelRequested() {
    this.resetEditState();
    this.getAllCourses();
  }
  protected onCourseAddRequested(item: Course) {
    this.courseData = item;
    this.updateCourse();
    this.resetEditState();
  }

  protected onCourseUpdateRequested(item: Course) {
    this.courseData = item;
    this.updateCourse();
    this.resetEditState();
  }

  private resetEditState(): void {
    this.courseData = new Course({});
    this.editMode = false;
  }

  private getAllCourses() {
    this.courseService.getAll().subscribe((response: Array<Course>) => { this.dataSource.data = response; });
  }

  private createCourse() {
    this.courseService.create(this.courseData).subscribe((response: Course) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }

  private updateCourse() {
    let courseToUpdate = this.courseData;
    this.courseService.update(courseToUpdate.id, courseToUpdate).subscribe((response: Course) => {
      let index = this.dataSource.data.findIndex((course: Course) => course.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  private deleteCourse(id: number) {
    this.courseService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((course: Course) => course.id !== id);
    });
  }
}
