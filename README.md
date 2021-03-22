# contact-mgmt (Contact Management App)

The application is used to maintain the contact information with below functionality
 - List contacts
 - Add a contact
 - Edit contact
 - Remove contact

## Getting Started

## Service API's
* Start service from https://github.com/sandiprthombare/contact-service

## Run contact-mgmt app
* Set up angular cli with commands **Install angular cli npm install - g @angular/cli**
* go to project directory
* Run command **npm install** this will install all required packages
* Apply command to run project on dev server **ng serve --open

* Application data is handled with contact-service based upon in-memory H2 database hence when an application runs the first time it will contain zero contact. Users can add new contacts with the "Add New Contact" button.

* Edit and Remove functionality available after contact creation.

* Application will handle below functionalility
   - List contacts
   - Add a contact
   - Edit contact
   - Remove contact

* Each contact will be having below fields
   - First name
   - Last name
   - Email
   - Phone number
   - Status

## Build
* Run **ng build** to build the project. The build artifacts will be stored in the dist/ directory. Use the **-prod** flag for a production build.
