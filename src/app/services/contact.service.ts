import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:9090/api/v1/contacts';

export interface Contact {
  contactId: number;
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  getAllContacts(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(baseURL);
  }

  getContactById(contactId: number): Observable<Contact> {
    return this.httpClient.get<Contact>(`${baseURL}/${contactId}`);
  }

  addNewContact(contact :Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(baseURL, contact);
  }

  updateContact(contactId: number, contact :Contact): Observable<Contact> {
    return this.httpClient.put<Contact>(baseURL, contact);
  }

  deleteContact(contactId: number): Observable<Contact> {
    return this.httpClient.delete<Contact>(`${baseURL}/${contactId}`);
  }

  updateContactStatus(contactId: number, status: string): Observable<any> {
    return this.httpClient.post(`${baseURL}/${contactId}/status/${status}`,null);
  }

}
