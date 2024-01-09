import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AppComponentBase } from '@shared/app-component-base';
import { EmployeeDto } from '@shared/service-proxies/employee/Employee-dto';
import { EmployeeServiceProxy } from '@shared/service-proxies/employee/employee-service-proxy';

@Component({
  selector: 'app-resources-humans',
  templateUrl: './resources-humans.component.html',
  styleUrls: ['./resources-humans.component.css']
})
export class ResourcesHumansComponent extends AppComponentBase implements OnInit {
  firstStep: FormGroup;
  secondStep: FormGroup;
  displayedColumns: string[] = ['name', 'surname', 'email', 'actions'];
  dataSource: MatTableDataSource<EmployeeDto>;
  
  constructor(inector: Injector,
              private _employeeService: EmployeeServiceProxy) {
    super(inector);
  }

  ngOnInit(): void {
    this.getAllResources();
  }
  
  getAllResources() {
    this._employeeService.getListByDepartamentId("ee514acb-773d-4af3-6006-08dc11112346").subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data.items.map(item => ({
          name: item.name,
          surname: item.surname,
          email: item.email
        })));
      }
    )
  }
} 
