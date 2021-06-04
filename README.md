# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Lin, Yuanhui   | 321352|
| Zhou, Runke    | 322308|
| Di, Yao        | 255619|

[Technical Setup](#technical-setup) • [Intended Usage](#intended-usage) • [Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Technical Setup
There are two ways to view our visualization. 
* Github host: You could explore our visualization through the following [link](https://com-480-data-visualization.github.io/data-visualization-project-2021-vizzz)
* Local host: You could also setup our visualization on your localhost and create your own viz accordingly. 

### Setup local host
1. Clone the whole repo to your desired directory. A guide to install git could be found [Here](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
```
Path-to-Your-Directory> git clone https://github.com/com-480-data-visualization/data-visualization-project-2021-vizzz.git
```
3. Setup the http server at the root folder of your local directory. A guide to install http server could be found [Here](https://www.npmjs.com/package/http-server)
```
Path-to-Your-Directory\data-visualization-project-2021-vizzz> http-server 
```
3. Open your browser and put the address of your http server (`http://localhost:8080/` as default)

## Intended Usage

The topic of our visualization project is to explore movies from Disney. The current scenes have been designed as following
* The audience will check our visualization through the standard Disney title sequence. The main page of the visualization will conclude the most popular movies from Disney, their issue timeline. The user click will trigger the theme song of the corresponding movie. 
* The second scene is designed to be an interactive page about the main characters. The audience will be allowed to choose their favorite character from a given list. The chosen character will be colored and a visualization page of the most popular characters will appear. 
* The third scene will be a film ranking with the criteria including a budget, box office, and IMDb rating.
* The fourth scene will present the directors and/or producers. It will enable the audience to find movies that fit their taste. This scene is inspired by the Beatles’ visualization project shown during the course. 

The target audience persona is
* 25-50 years old adults, searching for a movie to watch but have limited time to make the decision. The audiences demand a quick visualization tool to explore the top movies from Disney and select the next movie to watch with data-driven decision-making. 
* 8-30 years old Disney fans, who had watched movies featured by Disney and enjoyed at least one of the movies. The audiences have the time and passion to explore more information about the movies including the main characters. They would like to have a visual overview of all Disney movies and the visualization tool should be a good index for further research. 

A user-guide demostration could be found with the following link [Screencast](https://youtu.be/xNzMJp3-AZU)

## Milestone 1 
(23rd April, 5pm)

**10% of the final grade**


### Dataset

The datasets we would like to explore are from Kaggle, we found three datasets related to Disney movies, including:
* [Walt Disney Movies - Soaibuzzaman](https://www.kaggle.com/sooaaib/walt-disney-movies?select=disney_movies.csv)
* [Walt Disney Movies - Diksha Bhati](https://www.kaggle.com/dikshabhati2002/walt-disney-movies)
* [Disney Movies and Films Dataset - Sameer Patel](https://www.kaggle.com/therealsampat/disney-movies-dataset)

The three datasets have similar attributes but different data tuples. These datasets are generally clean, we did not observe out-of-range numerical values or digital gibberish in-text attributes. However, the three datasets contain redundant contents, and around ¼ of the tuples do not have complete information, which requires additional data cleaning. 

The data cleaning process consists of:
* Exploration of each dataset:

Firstly, we made an exploration of each dataset. In each dataset, we first explore the number of movies in the dataset. To drop repeated data in the dataset, we choose two features, the movie name, and release date, to identify the number of movies. As some Disney movies have identical names released on different dates, we choose to identify these movies as different ones as they may be remade.
* Selection of needed features:

As original datasets contain a large number of features, we only select the features we need. Thus for each dataset, we select features such as title, release date, budget, box office, IMDb score, and so on.

### Problematic

The topic of our visualization project is to explore movies from Disney. The current scenes have been designed as following
* The audience will check our visualization through the standard Disney title sequence. The main page of the visualization will conclude the most popular movies from Disney, their issue timeline. The user click will trigger the theme song of the corresponding movie. 
* The second scene is designed to be an interactive page about the main characters. The audience will be allowed to choose their favorite character from a given list. The chosen character will be colored and a visualization page of the most popular characters will appear. 
* The third scene will be a film ranking with the criteria including a budget, box office, and IMDb rating.
* The fourth scene will present the directors and/or producers. It will enable the audience to find movies that fit their taste. This scene is inspired by the Beatles’ visualization project shown during the course. 

The target audience persona is
* 25-50 years old adults, searching for a movie to watch but have limited time to make the decision. The audiences demand a quick visualization tool to explore the top movies from Disney and select the next movie to watch with data-driven decision-making. 
* 8-30 years old Disney fans, who had watched movies featured by Disney and enjoyed at least one of the movies. The audiences have the time and passion to explore more information about the movies including the main characters. They would like to have a visual overview of all Disney movies and the visualization tool should be a good index for further research. 



### Exploratory Data Analysis

#### Pre-processing of the data set you chose

  In order to get as much information as we can, we choose to merge the three datasets and get a final dataset to be used in this project. To merge datasets, we drop duplicate data according to the movie title and release date. The final dataset is organized according to the release date. Then we drop all data that has null values excluded Directed by, Produced by, Music By, and Distributed by for data visualization purposes.  Then we reset the index and get the final dataset.
 
#### Show some basic statistics and get insights about the data

  According to our final dataset, we analyze the data from five aspects. 
* Analysis of running time:

  Through analyzing the running time of Disney movies. We find that the shortest Disney movie is Roving Mars and the longest Disney movie is Pirates of the Caribbean: At World's End. We also analyze the running time distribution of Disney movies.
  
* Analysis of Budget and Box Office:

  Through analyzing the budget and box office of Disney movies, we find the Disney movie with the least and most budget and box office. What’s more, we make a plot of the budget and box office of each movie in a time sequence. Through this plot, we can observe an obvious increase in box office concerning time.
  
* From a historical aspect:

  Within the 80-year history of Disney movies, we want to have a better understanding of the timeline of Disney movies. Thus we draw the graph which describes how many movies are released each year. According to the graph, we can find that most Disney movies were released after the 1990s. 
  
* Analysis of Ratings:

  One of the most important features of movies is the ratings. In our final dataset, we have three ratings for a movie, IMDb, Metascore, and rotten_tomatoes. We also derive the distribution of these three kinds of ratings for all Disney movies.
  
* Analysis of People:

Another important statistic about movies is people interacting in a movie. People interacting in a movie include directors, producers, musicians, and distributors. Through this analysis, we can have a better understanding of who took part in more Disney movies.

### Related work

We found the following project which has been done with the same dataset. The visualization in this project only focus on the ratings, release date and profit of the movies.
* [Data Visualization for Disney Movies](https://public.tableau.com/profile/maliha.momtaz#!/vizhome/DisneyMovies_16147213546350/DisneyMovies)

We did not find any interactive visualization website including all the features we planned to implement in our scenes. We will try to make the visualization more interesting, more informative and smoother in terms of interaction. To achieve the goals, different kinds of interactions will be implenmented. The inspiration of these implements comes from the examples we see from Data Visualization class. For example, the top movie ranking part is inspired by the Beatles case shown. We will also have a section where user can pick his or her favored Disney character, this is inspired by the red wine case shown.

Apart from the project which uses the same database as we do, we also found the following visualization projects with a similar topic. 
* [Disney Movies by Year and Type - Nicole](https://public.tableau.com/profile/nicole1574#!/vizhome/DisneyMovies2/Dashboard1)
* [Disney Films Visualization - Bushra Nadeem](https://public.tableau.com/profile/b.humanadeem#!/vizhome/DisneyFilms_15931097490060/DisneyFilms)

## Milestone 2
(7th May, 5pm)

The report for Milestone 2 could be found with the following link: [Report Milestone 2](https://github.com/com-480-data-visualization/data-visualization-project-2021-vizzz/blob/master/Report/Report%20Milestone%202.pdf)

The skeleton code could be found in the `web` folder: [Skeleton Code](https://github.com/com-480-data-visualization/data-visualization-project-2021-vizzz/tree/master/web)

## Milestone 3
(4th June, 5pm)

The screencast video for Milestone 3 could be found with the following link: [Screencast Milestone 3](https://youtu.be/xNzMJp3-AZU)

The process book for Milestone 3 could be found with the following link: [Process Book Milestone 3](https://github.com/com-480-data-visualization/data-visualization-project-2021-vizzz/blob/master/Report/Report%20Milestone%202.pdf)

## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

