data_ingestion = DataIngestion()
    train_path, test_path = data_ingestion.initiate_data_ingestion(id=id)# Task 5 Web App Development

## Task Goals
* Build a machine learning web app to showcase project analysis and to host machine learning model. .

## Requirements
* pandas
* numpy
* plotly
* matplotlib
* seaborn
* scikit-learn
* notebook
* flask
* gunicorn

## Run
To run the project you need to install the dependencies using `pip install -r requirements.txt`
This is going to build the OmdenaKenyaRoadAccidents package in your local machine. 

There are 5 major components:
* DataIngestion class
* DataTransformation class
* ModelTrainer class
* train_pipeline function
* PredictPipeline class

These components are used to download the data from Google drive, apply preprocessing, add a machine learning model and then make predictions from the form input coming from the web app. 

The DataIngestion class `initiate_data_ingestion` method is used to download the data from Google drive. This method takes one argument `id` which is the file id of the data to be downloaded. The downloaded file is the split into a train and test data set, with the test data being 20% of the original dataset. 

#### example
```
id = sYHT1jdjdieiW?ejieX3
data_ingestion = DataIngestion()
train_path, test_path = data_ingestion.initiate_data_ingestion(id=id)
```
