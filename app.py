import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from sqlalchemy import create_engine

from flask import Response,json

from flask import Flask, jsonify

from flask_cors import CORS, cross_origin

from flask import Flask, render_template

from entrancekey import postgresqlkey

# Setting up the DATABSE to retrive data from the SQL Server

# Creating a search engine
engine = create_engine(f'postgresql+psycopg2://postgres:{postgresqlkey}@localhost:5432/industry_review')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table

results3 = engine.execute("SELECT * FROM compileddata").fetchall()

compiled_data = []


for l in results3:
    d = {"country":l[0],"country_code":l[1],"_year":l[2],"population":l[3],"gdp_current_usd":l[4],"total_cancer_cases":l[5],"total_cancer_deaths":l[6],"total_obesity_numbers":l[7],"birth_rate":l[8],"death_rate":l[9],"life_expectency":l[10],"dtp_immunisation":l[11],"measles_immunisation":l[12], "land_area_ha":l[13], 
    "agri_land_pct":l[14],"forest_area_pct":l[15],"cereal_yield_kg_ha":l[16],"cash_crop_yield_kg_ha":l[17],"employment_agri_pct":l[18], "livestock_production_100_index":l[19],"atm_per_100000":l[20], "borrowers_from_banks":l[21], "broad_money_growth_pct":l[22],"listed_domestic_companies":l[23],
    "foreign_investment_gdp":l[24],"inflation_pct":l[25],"stocks_traded_pct_gdp":l[26], "total_reserves":l[27], "pm2_5_air_pollution":l[28], "access_to_electricity_pct":l[29],"renewable_electricity_pct":l[30], "urban_population_pct":l[31],"electricity_consumption_kwh":l[32]}
    compiled_data.append(d)


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/healthsector")
def healthcare():
    return render_template("healthsector.html")

@app.route("/agriculturesector")
def agriculture():
    return render_template("agriculturesector.html")

@app.route("/financesector")
def finance():
    return render_template("financesector.html")

@app.route("/environment")
def environment():
    return render_template("environment.html")


@app.route("/compileddata", methods=["GET"])
def compiledData():
    """List all available api routes."""
    
    return (json.dumps(compiled_data))


if __name__ == '__main__':
    app.run(debug=True)



