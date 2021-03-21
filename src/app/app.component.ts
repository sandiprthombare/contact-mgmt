import { AfterViewInit, Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from './services/contact.service';
import { FormGroup } from '@angular/forms';



export interface Contact {
  contactId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  status: string;
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['contactId', 'firstName', 'lastName', 'email', 'phoneNo', 'status', 'action'];
  dataSource: MatTableDataSource<Contact>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)  sort!: MatSort;

  public contacts!: Contact[];
  public contact!: Contact;

  constructor(public dialog: MatDialog, public contactService: ContactService) {
    this.dataSource = new MatTableDataSource(this.contacts);
  }
  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe(res => {
      this.contacts = res;
      this.dataSource = new MatTableDataSource(this.contacts);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteContact(contactId :number){
    this.contactService.deleteContact(contactId).subscribe(res => {
      alert('Contact deleted successfully.');
      this.contactService.getAllContacts().subscribe(res => {
        this.contacts = res;
        this.dataSource = new MatTableDataSource(this.contacts);
      });
    }, error => { alert('Error while deleting contact Details'+error.message); });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(contactId: number): void {
    this.contact = { contactId: 0,firstName: "", lastName: "", email: "", phoneNo: "", status: "Active"};
    if (contactId != 0) {
      this.contact = this.contacts.filter(contact => contact.contactId == contactId)[0];
    }
    const dialogRef = this.dialog.open(AddUpdateDialog, {
      width: '300px',
      data: this.contact
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.contactId == 0) {
          this.contactService.addNewContact(result).subscribe(res => {
            alert('Contact added successfully.');
            this.contactService.getAllContacts().subscribe(res => {
              this.contacts = res;
              this.dataSource = new MatTableDataSource(this.contacts);
            });
          }, error => { alert('Error while adding contact Details'); });
        } else {
          this.contactService.updateContact(result.contactId, result).subscribe(res => {
            alert('Contact Updated successfully.');
            this.contactService.getAllContacts().subscribe(res => {
              this.contacts = res;
              this.dataSource = new MatTableDataSource(this.contacts);
            });
          }, error => { alert('Error while updating contact Details'); });
        }
      }
    });
  }
}

@Component({
  selector: 'add-update-dialog',
  templateUrl: 'add-update-dialog.html',
})
export class AddUpdateDialog {
  contactForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public contact: Contact) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

