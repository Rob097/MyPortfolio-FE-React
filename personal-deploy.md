https://dev.to/devsmitra/the-complete-guide-to-micro-frontend-with-reactjs-for-2022-36b2

DEPLOY FROM ROOT FOLDER:
To deploy microfrontends to firebase: \
firebase deploy --only hosting \
or \
firebase deploy --only hosting:[host|auth|context|dashboard]

To deploy application to vercel: \
vercel \
or \
vercel --prod

IMPORTANT FOR APPLICATION DEPLOYMENT: \
If there was a change in the common library, first of all we need to update the version in the package.json, build, copy package.json in dist folder and inside dist folder run "npm publish". \
Then if we are pointing to our local common library in application package.json we need to change it from ""common-lib": "file:../../shared/common/dist"" to ""@rob097/common-lib": "^1.0.13""
Also we need to change the imports from "common-lib/assets/..." to "@rob097/common-lib/assets/...".
Then we need to update the version in the package.json of the microfrontend that uses the common library and run "npm install" to update the common library. \
Finally we can deploy the microfrontend.


# MyPortfolio

## Project Overview:
We are developing an innovative web application that allows users to create personalized portfolios using stories instead of the traditional list-based approach. The application consists of a Java-based microservices backend hosted in Docker containers and a microfrontend-based frontend using React and Next.js. The main goal of the web application is to enable users to share their personal and professional journeys by narrating stories that highlight their experiences, projects, education, and skills that led them to achieve their goals.

### User Stories:
- As a user, I want to create a main story that introduces myself, my background, and my generalities.
- As a user, I want to add information about my education and create stories about each educational experience.
- As a user, I want to add information about my professional and personal experiences and create stories for each experience.
- As a user, I want to showcase the skills I have acquired over the years and link them to specific educational and experiential instances in my profile.
- As a user, I want to add projects that I have worked on or created in the past and write stories about each project's development and impact.

### Diary:
Every story created by a user becomes a part of their personalized diary.\
Each story should have a title, date, description, and a list of associated educational experiences, professional experiences, projects ans skills.


## Frontend Requirements:
We need the design of the visible-to-the-public pages (not dashboard).
These pages are designed to showcase the user's stories and present them in an engaging and visually appealing manner. \
Specifically, we need the design of the following pages:

### Homepage:
Create an eye-catching landing page that introduces the concept of storytelling portfolios. \
Incorporate a visually captivating hero section that encourages users to explore and learn more about the platform. \
Design clear and intuitive call-to-action elements for users to sign up and get started.

### User Profile Page:
Design a compelling user profile page that serves as the central hub for the user's stories.\
Present the user's main story in an aesthetically pleasing format.\
Showcase clean and attractive cards that link to the user's diary, educational experiences, professional and personal experiences, and projects respective pages.

### Education and Experience Page:
Create a single page for educational experiences and professional/personal experiences.\
Design this page to display relevant details about each experience along with the associated stories.\
Consider using a timeline or similar visual elements to depict the chronological order of experiences and stories.

### Project Showcase Page:
Create a visually appealing page to display the user's projects and the stories associated with each project.\
Consider incorporating interactive elements or carousels to showcase project images and details.

### Diary Display:
Design the user's diary page with a focus on presenting all the stories in a chronological and organized manner.\
Use distinct visual cues to differentiate each story and allow for easy navigation through the diary.


## Design Guidelines:
### Color Scheme and Branding:
Establish a cohesive color scheme and branding that aligns with the application's vision and enhances the storytelling experience.\
Consider using colors that evoke emotions and resonate with the theme of personal growth and journey.

### Typography and Layout:
Choose typography that enhances readability and complements the overall design.\
Design layouts that guide the user's focus to the most important elements on each page.


## Some notes:
1) A key entity of this application are also the skills.\
However, create a single page dedicated to the skills seems excessive. Therefore, we would like to manage skills as tags linked to stories, projects, educations and experiences.\
Each page of displayed stories should have a dedicated section for searching and filtering by skills and name, allowing users to easily find stories of interest.

2) We started developing the front-end in NextJs using the UI MUI (Material UI).
3) Some points to consider:
    - Utilize a modern and minimalist design approach to keep the focus on storytelling and user experiences;
    - Prioritize user accessibility and readability in the design choices;
    - Use a color scheme that doesn't overwhelm the user and is easy on the eyes;
    - Promote the use of whitespace and clean design to avoid clutter and create a seamless user experience;

\
Please feel free to reach out for any clarifications or additional information.



<!-- ## Frontend Requirements old:
### Homepage:
A visually appealing landing page introducing the concept of storytelling portfolios and encouraging users to sign up.\
A clear call-to-action for users to create their own portfolio.\

### User Registration and Authentication:
An intuitive and secure registration and login process for new and returning users.

### Main Story Creation:
A user-friendly interface to create the main story, allowing the user to input generalities and an introduction about themselves.\
Ability to save and edit the main story.\

### Education and Experience Management:
Dedicated sections for users to add and manage their educational experiences and professional/personal experiences.\
Options to create stories for each educational and experiential instance.\

### Skills Showcase:
A dedicated area to list and showcase the skills acquired by the user.\
Ability to link skills to relevant educational and experiential entries.\

### Project Showcase:
An interactive section to add and display projects the user has worked on or created.\
Ability to write stories about each project.\

### Diary Display:
An aesthetically pleasing diary layout showcasing all the stories created by the user in chronological order.\
Each story should be visually distinct, highlighting its title, date, and description.\

### Responsive Design:
Ensure the web application is fully responsive and works seamlessly on various devices, including desktops, tablets, and mobile phones.\ -->