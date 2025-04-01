Project keywords: JavaScript, React, Open data APIs, GraphQL, Bootstrap 5, Material-UI, JSON

The purpose of this program is to produce useful traffic and environmental information in clear language for the user to read. Data is retrieved from the open APIs provided by Digitraffic in accordance with the user's search criteria.

The program currently searches for rail traffic data, road traffic data, bus traffic data, marine traffic and marine environment data. You can read more about the APIs that the program uses here: https://www.digitraffic.fi/
The app uses the Journey API to retrieve bus traffic information: https://wiki.itsfactory.fi/index.php/Journeys_API

Example image of the start view. Clicking on the checkbox invokes a new react component that shows the user an input field, a dropdown menu, and other components that allow the user to set search criteria for the information being searched for. The checkboxes use Bootstrap 5 stacked style. The logo at the top was created with the freelogodesing.org logo creation tool. The logo image has a 12% radius at the corner.

![alt text](src/images/startview.png)

SPECIFICATIONS

Data is retrieved from the API interface using API endpoints and a JavaScript fetch method.
Then the retrieved data is converted to Json format and looped in a forEach loop. Finally, the information is displayed inside the html li elements as clear text.

Each line of retrieved data is displayed in its own li element and the elements are created inside the forEach loop with the javaScript createElement method.

All search criteria entered by the user are passed as parameters to the api endpoint. for example, the function of the program, where railway information can be searched based on the station, is implemented with the html-select element, where the javaScript function saves the station selected by the user and sends the station as a parameter.

API-KEY SECURITY; The APIs used by this application are all open APIs, and the access credentials are the same for all users. So there is no need to hide them in environment variables, for example.

UI components; The application mostly uses Bootstrap 5 and Material-Ui (MUI) components.


READABILITY OF THE RESPONSE TEXT

The text is mostly readable. However, some extra characters from the answers have been removed to improve the user experience using the JavaScript replace method. the replace method is executed automatically in the forEach loop.

DATA SEARCH FROM TRAINS

User can search for any VR train information using train number and date.

An example view where the user has searched for valid train passenger bulletins and the departure and arrival times and route of train 45 on 22.3.25. The date is selected from the MUI DatePicker component and the train number is entered in the input field. The API call requires a date in the format YYYY-DD-MM. The selected date is formatted in the required format, using the format method of the DayJS library. The user can also send train information to the email address of their choice by clicking on the blue envelope icon. The email feature is made with the SMTP express library.

The user will see a confirmation that the email has been sent. The confirmation will include the text "Email sent!" and a success icon. The confirmation message is automatically deleted after 5 seconds using the JavaScript setTimeout method.

![alt text](src/images/dataoftrain-1.png)

SEARCH TRAIN STATION INFORMATION

The user can select the desired station from the html selector component. This feature displays the trains that stop at the selected stations, the scheduled arrival/departure time of the trains, and the actual arrival or departure time. The planned track used by the train when arriving at the station is also displayed.

Example image where the user has selected Seinäjoki station.

![alt text](src/images/skStation.png)

ROUTE GUIDE FOR TRAINS

The user can search for routes by entering the departure station, destination station and travel date. The application searches information using these criteria and displays a list of trains matching the criteria to the user. The result shows the user the departure time, departure date and departure track. The route guide input fields use MUI autocomplete fields.

Example views of the route guide and results where the user has searched for trains from Helsinki to Tampere on the date 24.3.25.

![alt text](src/images/routes.png)

![alt text](src/images/routelist.png)

RAILWAY PASSENGER INFORMATION

The user can search for passenger information by station. The station is selected from the HTML select component. Each selection has a value attribute containing the station abbreviation, which is stored in a state variable and sent to the JavaScript function performing the search using the onChange event handler when the user has selected the desired station.

Example image where the user has selected Helsinki Station and retrieved active passenger information. Passenger information is displayed in an li element, where every other row uses the CSS color code #f2f2f2 and the  line-height is 1.8.

![alt text](src/images/passengerInfo.png)

The user can also search for passenger information based on the train number. This option will only show notifications related to the train number. Example image from which the user has retrieved passenger information regarding train number 12. The result shows the train number, details and start and end dates when the notification is valid.

![alt text](src/images/bynumber.png)


Passenger information is displayed in English by default. However, the API also has passenger information in Finnish and Swedish. The user can change the language by sliding the Bootstrap 5 Switch component. Sliding to the right will show 2 checkboxes, FI and SV, which the user can use to change the language. After clicking the checkbox, a Bootstrap button will appear with the Finnish or Swedish flag, depending on the user's selection. The flag icons are from Flaticon.com and are 24 pixels in size.

![alt text](src/images/langopt.png)

SEA / WATER AREA DATA

the user can search for information about water bodies and also display the location of the water body on Google Maps. The Google Maps feature is embedded in the application using this library: https://www.npmjs.com/package/@react-google-maps/api

An example image from which the information of the water area called Kipsi has been retrieved. the information displayed is, for example, the water temperature, coordinates and the direction of the wind wave. A Google Maps image of the water area can be displayed by clicking on the checkbox. the map image gets the necessary coordinates from the API.
When you click the Convert text to speech checkbox, the application converts the retrieved data into speech using the SpeecSynthesis API. Finally, the application plays the result through the device speakers.


![alt text](src/images/seaExample.png)

The user can also search for the desired water area using the input field.
The API search works with the siteNumber value, so the "show site numbers" button searches and displays the names of the water areas and the "siteNumber" values ​​to the user, making it easy for the user to select the desired water area. 

The water area site numbers are clickable. Each site number has a Click event listener that automatically adds the site number to the input field used in the water area search upon click. The contents of the input field are passed as a parameter to the API endpoint that performs the data retrieval.

Sample image of the list of available water areas.

![alt text](src/images/sites.png)

SHOW MARINE WARNINGS

The application uses the Finnish Transport Agency's POOKI service to search for marine warnings. This feature usually returns a lot of data, so a dedicated CSS stylesheet has been created for the HTML element where the data is displayed. It has a maximum width of 400 px, a maximum height of 200 px, and the element has a scroll bar to make it easier to view the data.

![alt text](src/images/marineWarnings.png)

BUS SERVICE INFORMATION

The user can search for information about the city of Tampere's bus services. So far, the feature allows you to search for routes by bus number and search terms. In the example image below, the user has searched for all buses that stop in the Ratina district.

![alt text](src/images/busdata.png)

VIEWING WEATHER CAMERAS

Weather camera images are retrieved from weathercam.digitraffic.fi/(id) The images of the camera to be displayed are selected from the html selection component and the selected image is displayed in the html img element. The URLs of the camera images are stored in variables and the selected component has an onChange event handler function that performs the search and display of the user's desired image. The image of each weather camera can be changed by pressing the "change camera" button. There are 3 different angles for each camera.

An example picture where the user has selected a road camera from the html select component. The application displays weather camera images in 500 x 300 size by default. The user can increase or decrease the size of the image using the + and - buttons. Each click changes the size by 10. Reset button restores default values.

The user can also zoom in on the weather camera image using the HTML slider component. The slider component has a minimum value of 1, a maximum value of 3, and a step between values ​​of 0.1. The slider component changes the CSS value of the img element's transformation scale. The value is stored in the State variable and passed to the img element's style property.

By selecting the "Switch automatically every 60 seconds" checkbox, the user can automate the camera switching. The timing is implemented using the setInterval method. The user can adjust the contrast of the weather camera image using the contrast + and contrast - buttons. One click changes the CSS contrast property of the img element by + or -10%.


![alt text](src/images/weatherCam.png)

ROAD TRAFFIC DATA

The user can search for various road traffic information, such as ongoing road works and active road traffic alerts.

Example image where the user has searched for all ongoing roadworks in Finland and opened one of the roadworks in the Google Maps map view. Each roadwork has a Bootstrap 5 style button, which the user can click to open the roadwork location in the Google Maps view. The latitude/longitude coordinates of the roadwork are stored in React State variables after the button is clicked and sent as parameters to the Maps component implementing the map view.

![alt text](src/images/roadAnnouc.png)

GRAPHQL QUERIES

GraphQL API queries are available for rail traffic and user can write queries themselves. queries are written to the textarea element and stored in a state variable. GraphQL API queries are implemented with the Apollo client.

Example image where a user writes a query to Digitraffic's rail traffic GrapQL API. The survey searches for the first 5 trains with a speed of more than 30 km/h

![alt text](src/images/graphqlQuery.png)




