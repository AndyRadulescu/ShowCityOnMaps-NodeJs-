# ShowCityOnMops-NodeJs-

This is an application that uses NodeJs as the backend framework. I also used Sequelize ORM for this project.
There are 3 tables in the database: continents, countries, cities.
Relations: continents countries (1:M)
           countries  cities  (1:M)
           
The requests are made at: localhost:3000/api

On the Ui, there are 3 dropdowns (select boxes). The first one represents the Continens, the second one represents the Countries and 
the third represents the city.

In order to what is selected in the countinent, the countries have to be updated, and also the cities, same goes for countries.

This "update" is done by an ajax request to the host (localhost:3000).

To render the map, google maps api has been used. I needed "axios" to translate the name of the city (ex: Paris) into actual cordinates
that maps can understand.

The map automatically updates when a city is selected.
