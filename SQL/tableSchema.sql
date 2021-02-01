CREATE TABLE agriculture (
	country VARCHAR,
	country_code VARCHAR,
	_year REAL,
	population REAL,
	gdp_current_usd REAL,
	land_area_ha REAL,
	agri_land_pct REAL,
	forest_area_pct REAL,
	cereal_yield_kg_ha REAL,
	cash_crop_yield_kg_ha REAL,
	employment_agri_pct REAL,
	livestock_production_100_index REAL	
)

SELECT * FROM agriculture

CREATE TABLE environment (
	country VARCHAR,
	country_code VARCHAR,
	_year REAL,
	population REAL,
	gdp_current_usd REAL,
	pm2_5_air_pollution REAL,
	access_to_electricity_pct REAL,
	renewable_electricity_pct REAL,
	urban_population_pct REAL,
	electricity_consumption_kwh REAL
)

SELECT * FROM environment

CREATE TABLE finance (
	country VARCHAR,
	country_code VARCHAR,
	_year REAL,
	population REAL,
	gdp_current_usd REAL,
	atm_per_100000 REAL,
	borrowers_from_banks REAL,
	broad_money_growth_pct REAL,
	listed_domestic_companies REAL,
	foreign_investment_gdp REAL,
	inflation_pct REAL,
	stocks_traded_pct_gdp REAL,
	total_reserves REAL

)

SELECT * FROM finance

CREATE TABLE health (
	country VARCHAR,
	country_code VARCHAR,
	_year VARCHAR,
	population REAL,
	gdp_current_usd REAL,
	total_cancer_cases REAL,
	total_cancer_deaths REAL,
	total_obesity_numbers REAL,
	birth_rate REAL,
	death_rate REAL,
	life_expectency REAL,
	dtp_immunisation REAL,
	measles_immunisation REAL
)

SELECT * FROM health

CREATE TABLE scitech (
	country VARCHAR,
	country_code VARCHAR,
	_year REAL,
	high_tech_export REAL,
	patent_applications REAL,
	science_publications REAL,
	technology_grants_current_usd REAL
)

SELECT * FROM scitech