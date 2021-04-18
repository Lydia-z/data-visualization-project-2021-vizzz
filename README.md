# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Lin, Yuanhui   | |
| Zhou, Runke    | 322308|
| Di, Yao        | 255619|

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (23rd April, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

> Find a dataset (or multiple) that you will explore. Assess the quality of the data it contains and how much preprocessing / data-cleaning it will require before tackling visualization. We recommend using a standard dataset as this course is not about scraping nor data processing.
>
> Hint: some good pointers for finding quality publicly available datasets ([Google dataset search](https://datasetsearch.research.google.com/), [Kaggle](https://www.kaggle.com/datasets), [OpenSwissData](https://opendata.swiss/en/), [SNAP](https://snap.stanford.edu/data/) and [FiveThirtyEight](https://data.fivethirtyeight.com/)), you could use also the DataSets proposed by the ENAC (see the Announcements section on Zulip).

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

> Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience.

The topic of our visualization project is to explore movies from Disney. The current scenes have been designed as following
* The audience will check our visualization through the standard Disney title sequence. The main page of the visualization will conclude the most popular movies from Disney, their issue timeline. The user click will trigger the theme song of the corresponding movie. 
* The second scene is designed to be an interactive page about the main characters. The audience will be allowed to choose their favorite character from a given list. The chosen character will be colored and a visualization page of the most popular characters will appear. 
* The third scene will be a film ranking with the criteria including a budget, box office, and IMDb rating.
* The fourth scene will present the directors and/or producers. It will enable the audience to find movies that fit their taste. This scene is inspired by the Beatles’ visualization project shown during the course. 

The target audience persona is
* 25-50 years old adults, searching for a movie to watch but have limited time to make the decision. The audiences demand a quick visualization tool to explore the top movies from Disney and select the next movie to watch with data-driven decision-making. 
* 8-30 years old Disney fans, who had watched movies featured by Disney and enjoyed at least one of the movies. The audiences have the time and passion to explore more information about the movies including the main characters. They would like to have a visual overview of all Disney movies and the visualization tool should be a good index for further research. 



### Exploratory Data Analysis
> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

#### Pre-processing of the data set you chose

  In order to get as much information as we can, we choose to merge the three datasets and get a final dataset to be used in this project. To merge datasets, we drop duplicate data according to the movie title and release date. The final dataset is organized according to the release date. Then we drop all data that has null values excluded Directed by, Produced by, Music By, and Distributed by for data visualization purposes.  Then we reset the index and get the final dataset.
 
#### Show some basic statistics and get insights about the data

  According to our final dataset, we analyze the data from five aspects. 
##### * Analysis of running time:

  Through analyzing the running time of Disney movies. We find that the shortest Disney movie is Roving Mars and the longest Disney movie is Pirates of the Caribbean: At World's End. We also analyze the running time distribution of Disney movies.
  
##### * Analysis of Budget and Box Office:

  Through analyzing the budget and box office of Disney movies, we find the Disney movie with the least and most budget and box office. What’s more, we make a plot of the budget and box office of each movie in a time sequence. Through this plot, we can observe an obvious increase in box office concerning time.
  
##### * From a historical aspect:

  Within the 80-year history of Disney movies, we want to have a better understanding of the timeline of Disney movies. Thus we draw the graph which describes how many movies are released each year. According to the graph, we can find that most Disney movies were released after the 1990s. 
  
##### * Analysis of Ratings:

  One of the most important features of movies is the ratings. In our final dataset, we have three ratings for a movie, IMDb, Metascore, and rotten_tomatoes. We also derive the distribution of these three kinds of ratings for all Disney movies.
  
##### * Analysis of People:

Another important statistic about movies is people interacting in a movie. People interacting in a movie include directors, producers, musicians, and distributors. Through this analysis, we can have a better understanding of who took part in more Disney movies.

### Related work


> - What others have already done with the data?
> - Why is your approach original?
> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
> - In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

#### What others have already done with the data?
We found the following project which has been done with the same dataset.
* [Data Visualization for Disney Movies](https://public.tableau.com/profile/maliha.momtaz#!/vizhome/DisneyMovies_16147213546350/DisneyMovies)


#### Why is your approach original?
We did not find any interactive visualization website including all the features we planned to implement in our scenes. 

#### What source of inspiration do you take?
The top movie ranking part is inspired by the Beatles case shown in the class 
The interactive part is inspired by the red wine case shown in the class

#### Visualizations that you found on other websites or magazines?
We found the following visualization project which could be done with a similar topic. 
* [Data Visualization for Gender Inequality in Disney Films](https://www.aberdeen.com/featured/blog-data-visualization-disney-intent/)
* [Disney Movies 1937-2016 Gross Income](https://www.kaggle.com/discussion/225933)
* [Disney Movies by Year and Type - Nicole](https://public.tableau.com/profile/nicole1574#!/vizhome/DisneyMovies2/Dashboard1)
* [Disney Films Visualization - Bushra Nadeem](https://public.tableau.com/profile/b.humanadeem#!/vizhome/DisneyFilms_15931097490060/DisneyFilms)

## Milestone 2 (7th May, 5pm)

**10% of the final grade**


## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

