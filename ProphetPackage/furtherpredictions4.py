# Importing the relevant dependencies
import psycopg2
from sqlalchemy import create_engine
from entrancekey import postgresqlkey
import matplotlib.pyplot as plt
import pandas as pd

# Creating a search engine
engine = create_engine(f'postgresql+psycopg2://postgres:{postgresqlkey}@localhost:5432/industry_review')
connection = engine.connect()

# Viewing the Tables in the travel_vic_db Database
from sqlalchemy import MetaData
meta_data = MetaData()
meta_data.reflect(engine)

db_tables_list = []

# For loops to visualise the table
for table in meta_data.tables.values():
    db_tables_list.append(table.name)
    print(table.name)

    
compiled_data = pd.read_sql('SELECT * FROM compileddata', connection)
compiled_data

countries_raw = ["Australia","Singapore","South Korea","Thailand","United States of America","Indonesia","Japan","Philippines","Canada","Malaysia","New Zealand","Brunei","China","Mexico","Thailand",
"Chile","South Korea","Vietnam","Australia","Peru","Singapore","Japan","United States of America","Russia","Indonesia","China","Philippines","Peru","Vietnam","Papua New Guinea","Chile","Malaysia","New Zealand",
"Thailand","Mexico","Brunei","South Korea","Peru"]


countries_list = list(dict.fromkeys(countries_raw))



    # Chose the country for further training of the data
chosencountry = compiled_data[compiled_data['country']=='Australia']
chosencountry

# Choosing the column for further analyses
chosen_column = chosencountry['birth_rate'].tolist()
chosen_column

# The years need to be reformatted
year = []

for i in range(6,10):
    year.append(f'19{i}0-01-01')
    for j in range(0,10):
        year.append(f'19{i}{j}-01-01')
year = list(dict.fromkeys(year))
year

    # Adding the additional years until 2020
for i in range(0,2):
    year.append(f'20{i}0-01-01')
    for j in range(0,10):
        year.append(f'20{i}{j}-01-01')

year.append(f'2020-01-01')

year1 = list(dict.fromkeys(year))
year1

final_train = pd.DataFrame({
    'ds':year1,
    'y':chosen_column
})

final_train.plot()
plt.show()

# Importing the prophet dependency
from fbprophet import Prophet

# Creating a variable for the prediction algorithm
model = Prophet()

# Creating a forecast variable
forecast = model.fit(final_train)

# Creating a new list to test and predict from 1960-1999
pred = []

for i in range(6,10):
    pred.append(f'19{i}0-01-01')
    for j in range(0,10):
        pred.append(f'19{i}{j}-01-01')

pred = list(dict.fromkeys(pred))
pred

# Adding to that list from 2000-2020
for i in range(0,3):
    pred.append(f'20{i}0-01-01')
    for j in range(0,10):
        pred.append(f'20{i}{j}-01-01')
pred.append(f'2030-01-01')

pred1 = list(dict.fromkeys(pred))
pred1

    # The New list will be converted to a dataframe
future = pd.DataFrame(pred1)
future

# Renaming the colum to 'ds' as required for the module
future.columns = ['ds']

# Converting the column to date time format
future['ds'] = pd.to_datetime(future['ds'])
prediction = model.predict(future)
prediction1 = prediction.drop(columns=['trend','trend_lower',	'trend_upper',	'additive_terms',	'additive_terms_lower',	'additive_terms_upper',	'yearly',	'yearly_lower',	'yearly_upper',	'multiplicative_terms',	'multiplicative_terms_lower','multiplicative_terms_upper'])
prediction1.to_csv(f'E:/My Documents/Professional Development/Monash University Data Analytics Boot Camp/GitHubRepo/final-project/ProphetPackage/total_cancer_cases/Bruneitotal_cancer_cases.csv')
prediction1

# Comparing the predicted and test
model.plot(prediction)
plt.show()
print(countries_list)
        