import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  StudentArray : any[] = [];
  currentStudentID = "";
  name: string ="";
  address: string ="";
  phone: string ="";
  
  constructor(private http: HttpClient ) 
  {
    this.getAllStudent();
  }
  getAllStudent() {
    this.http.get("http://localhost:5000/students")
    .subscribe((resultData: any)=>
    {
        // console.log(resultData);
        this.StudentArray = resultData;
    });
  }
  setUpdate(data: any) 
  {
   this.name = data.name;
   this.address = data.address;
   this.phone = data.phone;
   this.currentStudentID = data._id;
  
  }
  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone,
    };
    
    
    this.http.put(`http://localhost:5000/students/update/${this.currentStudentID}`,bodyData).subscribe((resultData: any)=>
    {
        // console.log(resultData);
        alert("Student Updateddd")
        this.getAllStudent();
      
    });
  }
  
  setDelete(data: any) {
    // console.log(`http://localhost:5000/students/delete/${data._id}`);
    this.http.delete(`http://localhost:5000/students/delete/${data._id}`).subscribe((resultData: any)=>
    {
        alert("Student Deletedddd")
        this.getAllStudent();   
    });
    }
    
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }       
  }
register(){
  let bodyData = {
    "name" : this.name,
    "address" : this.address,
    "phone" : this.phone, 
  };
  this.http.post("http://localhost:5000/students/create",bodyData).subscribe((resultData: any)=>
  {
      console.log(resultData);
      alert("Student Registered Successfully")
       //this.getAllEmployee();
      this.name = '';
      this.address = '';
      this.phone  = '';
      this.getAllStudent();
  });
}

}


