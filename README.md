# ***Skill Match***

Skill Match is a web application where users can search for and offer various services such as plumbing, coding, carpentry, and more. The platform allows service providers to list their services, modify descriptions, and specify their location, making it easier for users to find the right professional near them. The app also incorporates user authentication using **Auth0** for secure access.

## **Current Features**

- **Service Search:** Users can search for services based on categories (e.g., plumbing, coding, carpentry) and location.
- **Profile Management:** Service providers can modify their descriptions, update the services they offer, and specify their location.
- **Authentication:** **Auth0** is used for secure login and registration.
- **Booking Requests:**
   - Users can request bookings with service providers, specifying the required service and a proposed charge.
   - Providers can accept or decline booking requests.
- **Local Development:**
  - **Backend:** Run the local server using `npm run dev` in the backend directory.
  - **Frontend:** Run the local frontend using `npm run dev` in the frontend directory.

## **Deployment**

- **Frontend:** Deployed on [Netlify](https://www.netlify.com/).
- **Backend:** Deployed on [Render](https://render.com/).

## **Future Enhancements**

1. **Manage Availability:**
   - Service providers will be able to set their off days when they cannot take bookings.

2. **Payment Gateway Integration:**
   - Secure payment options will be integrated to facilitate payments for services.

3. **Date-Based Search:**
   - Users will be able to search for available services based on specific dates.

## **Local Setup**

### **Prerequisites**

- Node.js installed on your system.
- Access to the **Auth0** configuration for authentication setup.

### **Steps to Run Locally**

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd skill-match
   ```
   
 2. **Backend Setup:**
      - Navigate to the backend directory:
        ```
        cd backend
        ```
      - Install dependencies:
        ```
        npm install
        
       - Start the backend server:
        ```
        npm run dev
        ```
 3. **Frontend Setup:**
      - Navigate to the frontend directory:
        ```
        cd frontend
        ```
      - Install dependencies:
        ```
        npm install
        ```
       - Start the frontend server:
        ```
        npm run dev
        ```
  4. **Access the Application:**

        - Frontend: Visit http://localhost:5173 (or the port specified in your setup).

        - Backend: Visit http://localhost:5123 (or the port specified in your setup).
    
## **Contributing**

  Contributions are welcome! If you'd like to add new features or report issues, please open a pull request or create an issue in the repository.

  
## **License**

  This project is licensed under the MIT License.
