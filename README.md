Project keywords: JavaScript, React, Open API, GraphQL, Bootstrap 5, JSON

The purpose of this program is to produce useful traffic and environmental information in clear language for the user to read. Data is retrieved from the open APIs provided by Digitraffic in accordance with the user's search criteria.

The program currently searches for rail traffic data, road traffic data, and marine traffic and marine environment data. You can read more about the APIs that the program uses here: https://www.digitraffic.fi/

Example image of the start view. Clicking on the checkbox invokes a new react component that shows the user an input field, a dropdown menu, and other components that allow the user to set search criteria for the information being searched for. The checkboxes use Bootstrap 5 stacked style

![alt text](src/images/startview.png)

Specifications

Data is retrieved from the API interface using API endpoints and a JavaScript fetch method.
Then the retrieved data is converted to Json format and looped in a forEach loop. Finally, the information is displayed inside the html li elements as clear text.

Each line of retrieved data is displayed in its own li element and the elements are created inside the forEach loop with the javaScript createElement method.

All search criteria entered by the user are passed as parameters to the api endpoint. for example, the function of the program, where railway information can be searched based on the station, is implemented with the html-select element, where the javaScript function saves the station selected by the user and sends the station as a parameter.

GraphQL API queries are available for rail traffic and user can write queries themselves. queries are written to the textarea element and stored in a state variable. GraphQL API queries are implemented with the Apollo client.

Weather camera images are retrieved from weathercam.digitraffic.fi/(id) The images of the camera to be displayed are selected from the html selection component and the selected image is displayed in the html img element. The URLs of the camera images are stored in variables and the selected component has an onChange event handler function that performs the search and display of the user's desired image.

The image of each weather camera can be changed by pressing the "change camera" button.
There are 3 different angles for each camera.

Readability of the response text

The text is mostly readable. However, some extra characters from the answers have been removed to improve the user experience using the JavaScript replace method.
the replace method is executed automatically in the forEach loop.
Sample images of the information searched and received using the search criteria

An example view where the user has searched for valid train passenger bulletins and the departure and arrival times and route of train 45 on 30.8.24

![alt text](src/images/dataoftrain-1.png)

An example image from which the information of the water area called Kipsi has been retrieved. the information displayed is, for example, the water temperature, coordinates and the direction of the wind wave. A Google Maps image of the water area can be displayed by clicking on the checkbox. the map image gets the necessary coordinates from the API

The user can also search for the desired water area using the input field.

The API search works with the siteNumber value, so the "show site numbers" button searches and displays the names of the water areas and the "siteNumber" values ​​to the user, making it easy for the user to select the desired water area. 

![alt text](src/images/seaExample.png)

Example picture where the user has retrieved all Finnish road work notices from the API.
The div element where the traffic announcements are displayed has a max-width value that prevents the div element from growing too large if there are a lot of active traffic announcements. the scroll bar makes it easier to browse notifications.

![alt text](src/images/roadAnnounc.png)

example image where a user writes a query to Digitraffic's rail traffic GrapQL API. The survey searches for the first 5 trains with a speed of more than 30 km/h

![alt text](src/images/graphqlQuery.png)

An example picture where the user has selected a road camera from the html select component

![alt text](src/images/weatherCam.png)

Example image when the user has clicked the "change camera" button and the camera image has changed.

![alt text](src/images/weatherCamChange.png)


