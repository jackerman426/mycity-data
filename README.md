# mycity-data
Location based historical and political POI's (Point Of Interest) research based on wikipedia and other sources

## Goal
The goal is to build an interactive map (web and mobile) where information about specific historical or political locations can be found by people so we can preserve the history of mankind!

## Description
We want to find a way to generate information about events or locations that has a historical or political significance and happended in a specific POI's around the world.
A POI can be a geographical area (continent, country, city, street, building, a certain set of coordinates).

An example of a POI can be:<br />
**title**: "The assination of the greek politician Grigoris Lambrakis"<br />
**date**: "27 May 1963"<br />
**location**: "Intersection between Venizelou and Ermou"<br />
**coordinates**: "40.6359791 22.9410614"<br />
**info**: "On May 22, 1963, Grigoris Lambrakis (Greek: Γρηγόρης Λαμπράκης; 3 April 1912 – 27 May 1963), a Greek politician, physician, track and field athlete, member of the faculty of the School of Medicine at the University of Athens and member of the Greek resistance to Axis rule during WWII shortly after he had delivered the keynote speech at an anti-war meeting in Thessaloniki, two far-right extremists, Emannouel Emannouilides and Spyros Gotzamanis, driving a three-wheeled vehicle, struck him with a club over the head in plain view of a large number of people and (allegedly) some police officers. He suffered brain injuries and died in the hospital five days later, on May 27. The two men were arrested because of the reaction of a by-stander (Manolis Hatziapostolou, nicknamed Tiger) who jumped on their vehicle and fought with them. A monument can be found too here"<br />
**relevant_links**: https://en.wikipedia.org/wiki/Grigoris_Lambrakis

## POI Generation
The generation of the POI's is the most challenging problem of this project. The idea is that this will be done by a community of users that want to contribute and register information about a POI that they know or have heard about. However for the mvp we need to automaticaly populate as much data as we possibly can, through different sources like wikipedia etc (still need to research additional sources). These data can be later reviewed and audited by users in order to check their validity and authenticity. As the community grows the POI's will become more accurate and valid. 


## Challenges
The main challenge of the project is how to ensure that the POI's and the information associated with them will be accurate valid and unbiased. <br />
One idea is to use a user-vote based method which will reflect the public opinion over a particular POI. There will be a web page where users can view all the available POI's, make edit proposals (wikipedia style) to the existing ones or register their own. If more than one POI exist for a particular set of coordinates then all of them will appear in the application anyway ordered by user votes (reddit style). A user of the application will be able to vote for the POI's.