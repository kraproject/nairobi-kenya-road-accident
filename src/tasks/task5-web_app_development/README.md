# Task 5 Web App Development

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

The DataIngestion class `initiate_data_ingestion` method is used to download the data from Google drive. This method takes one argument `id` which is the file id of the data to be downloaded. The downloaded file is the split into a train and test data set, with the test data being 20% of the original dataset. The datasets are stored in the artifacts directory. 

#### data ingestion example
```
from OmdenaKenyaRoadAccidents.components.data_ingestion import DataIngestion

id = sYHT1jdjdieiW?ejieX3
data_ingestion = DataIngestion()
train_path, test_path = data_ingestion.initiate_data_ingestion(id=id)
```

The DataTransformation class has the method `initiate_data_transformation` which takes the path to the train and test data as arguments. This method uses `scikit-learn` SelectKBest class to select the top features and then uses `scikit-learn` OneHotEnconder preprocessor to transform the features variable and LabelEncoder to transform the target variable. It returns a numpy array of the train and test data. Both preprocessor objects are stored in the artifacts directory. 

#### data transfornation example
```
from OmdenaKenyaRoadAccidents.components.data_transformation import DataTransformation

data_transformer = DataTransformation()
train_array, test_array = data_transformer.initiate_data_transformation(train_path, test_path)
```

The ModelTrainer class like the others has an `initiate_model_trainer` method which takes a train_arr argument which is a numpy array of the train data, a test_arr which is a numpy array of the test data and an optional model argument which is the model that will be used to train the data. If no model is given it selects the best out of a `scikit-learn` LogisticRegression model, a RandomForestClassifier model an SVC model, the best model is selected based on their `roc_auc_score` since the data is an imbalanced data. The method returns the following `scikit-learn` metrics -roc_auc_score, recall_score, precision_score, accuracy_score and confusion_matrix

#### model trainer example
```
from OmdenaKenyaRoadAccidents.components.model_trainer import ModelTrainer

model_trainer = ModelTrainer()
auc_score, _,_,_,_ = model_trainer.initiate_model_trainer(train_array, test_array) 

```

OR

```
from OmdenaKenyaRoadAccidents.components.model_trainer import ModelTrainer
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(class_weight="balanced")
model_trainer = ModelTrainer()
auc_score, _,_,_,_ = model_trainer.initiate_model_trainer(train_array, test_array, model=model)

```
