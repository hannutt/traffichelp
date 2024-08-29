The purpose of this program is to produce useful traffic information in clear language for the user to read.
Traffic data is retrieved from the open API interfaces provided by Digitraffic according to the user's search criteria.

For now, the program only searches for rail traffic data, but options for road traffic, sea traffic, etc. are coming to the program later.
You can read more about the APIs that the program uses here: https://www.digitraffic.fi/

Example image of the start page, where the railway traffic data search has been selected to be used

![alt text](traffic.png)

How does this work?

Data is retrieved from the API interface using API endpoints and a JavaScript search method.
Then the retrieved data is converted to Json format and displayed inside html li elements.

An example image that has been searched for trains departing from Helsinki railway station, their numbers and information on whether they have been canceled or not.

![alt text](traffic2.png)



All search criteria entered by the user are passed as parameters to the api endpoint. for example, the function of the program, where railway information can be searched based on the station, is implemented with the html-select element, where the javaScript function saves the station selected by the user and sends the station as a parameter.

