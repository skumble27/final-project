# final-project

## Sector Forecast

**Sumukh Kumble**



**Introduction**

The objective of this project is to apply the principles and techniques of machine learning to train and create algorithms with the capacity to make accurate predictions based on historical data from various countries. In essence, this project seeks to implement this technology across a variety of sectors, namely, Healthcare, Agriculture, Economics and the Environment to determine what can be expected within a ten year window from 2020 onwards. By testing the algorithm across a variety of sectors and datasets, this project aims to validate if machine learning can be utilised to provide users with scope of what could possibly expected and with a degree of mathematical confidence.

**Data Extraction, Transformation and Loading (ETL)**

For this project, data was extracted from several databases, which include the following:

1. [Our World in Data](https://ourworldindata.org/) 
2. [The World Bank](https://data.worldbank.org/)
3. [Food and Agricultural Organisation of the United Nations](http://www.fao.org/home/en/)

The counties that were selected for this project are members of the Asia-Pacific Economic Cooperation. Data pertaining to Healthcare, Agriculture, Economics and Environment, for each nation, were extracted from the above mentioned sources, cleaned using the Python Pandas Module and exported into file formats and uploaded into the SQL Databases. 

In order to create the interactive maps, geojson polygons were extracted from this [link](https://geojson-maps.ash.ms/) and projected onto the HTML website using the Leaflet JavaScript Module.   Users can click on a country and obtain data that provides historical information as well as a ten year forecast, which in turn, was developed using Machine Learning algorithms as will be discussed in detail below.

![Leaflet Map](https://raw.githubusercontent.com/skumble27/final-project/main/images/LeafletGeojson.gif)

*Figure 1: Interactive Map using Leaflet JavaScript*

**Applying Machine Learning Algorithms for ETL Datasets**

Initially, the objective was to apply machine learning in real-time using the Tensorflow Javascript module within the browser. Taking this into consideration, users could click on the country whereby the Tensorflow would study all the datasets relating to that country and provide a chart that shows historical data followed by a ten year forecast along with the accuracy of the predictive module. Unfortunately, this did not result in a very accurate prediction, especially for time series based datasets. Therefore, as an alternative, a new package was utilised, known as [Facebook Prophet](https://facebook.github.io/prophet/), which is a Python based Machine Learning module and has the  capacity to train and develop far more accurate predictions based on time series datasets as well as handling major issues such as erratic and noisy data. However, in terms of logistics, a series of codes needed to be developed in order for the module to be trained across a variety of datasets and parameters in a semi-automatic process. As such, a python script was developed wherein a list of all the countries were created, along with a list of all the parameters within in each sector and iterated in a *for loop* through the algorithm in which to automatically export the results of the training and test data in a CSV format, which in turn was loaded into the repository for subsequent app development. 

**Development of the Web Dashboard**



