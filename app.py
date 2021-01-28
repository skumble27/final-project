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
results = engine.execute("SELECT * FROM agriculture").fetchall()
results1 = engine.execute("SELECT * FROM environment").fetchall()
results2 = engine.execute("SELECT * FROM finance").fetchall()
results3 = engine.execute("SELECT * FROM health").fetchall()
results4 = engine.execute("SELECT * FROM scitech").fetchall()

agriculture = []
environment = []
finance = []
health = []
scitech = []

for i in results:
    a = {"country":i[0],"country_code":i[1],"_year":i[2],"population":i[3],"gdp_current_usd":i[4],"land_area_ha":i[5],"agri_land_pct":i[6],"forest_area_pct":i[7],"cereal_yield_kg_ha":i[8],"cash_crop_yield_kg_ha":i[9],"employment_agri_pct":i[10],"livestock_production_100_index":i[11]}
    agriculture.append(a)

for j in results1:
    b = {"country":j[0],"country_code":j[1],"_year":j[2],"population":j[3],"gdp_current_usd":j[4],"pm2_5_air_pollution":j[5],"access_to_electricity_pct":j[6],"renewable_electricity_pct":j[7],"urban_population_pct":j[8],"electricity_consumption_kwh":j[9]}
    environment.append(b)

for k in results2:
    c = {"country":k[0],"country_code":k[1],"_year":k[2],"population":k[3],"gdp_current_usd":k[4],"atm_per_100000":k[5],"borrowers_from_banks":k[6],"broad_money_growth_pct":k[7],"listed_domestic_companies":k[8],"foreign_investment_gdp":k[9],"inflation_pct":k[10],"stocks_traded_pct_gdp":k[11],"total_reserves":k[12]}
    finance.append(c)

for l in results3:
    d = {"country":l[0],"country_code":l[1],"_year":l[2],"population":l[3],"gdp_current_usd":l[4],"total_cancer_cases":l[5],"total_cancer_deaths":l[6],"total_obesity_numbers":l[7],"birth_rate":l[8],"death_rate":l[9],"life_expectency":l[10],"dtp_immunisation":l[11],"measles_immunisation":l[12]}
    health.append(d)

for m in results4:
    e = {"country":m[0],"country_code":m[1],"_year":m[2],"high_tech_export":m[3],"patent_applications":m[4],"science_publications":m[5],"technology_grants_current_usd":m[6]}
    scitech.append(e)

print(e)

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

@app.route("/agriculture", methods=["GET"])
def agriData():
    """List all available api routes."""
    
    return (json.dumps(agriculture))

@app.route("/environment", methods=["GET"])
def envirData():
    """List all available api routes."""
    
    return (json.dumps(environment))

@app.route("/finance", methods=["GET"])
def finData():
    """List all available api routes."""
    
    return (json.dumps(finance))

@app.route("/health", methods=["GET"])
def healthData():
    """List all available api routes."""
    
    return (json.dumps(health))

@app.route("/scitech", methods=["GET"])
def scitechData():
    """List all available api routes."""
    
    return (json.dumps(scitech))

if __name__ == '__main__':
    app.run(debug=True)



