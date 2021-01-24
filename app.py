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

# Setting up the DATABSE to retrive data from the SQL Server

# Creating a search engine

engine = create_engine(f'postgresql+psycopg2://postgres:{postgresqlkey}@localhost:5432/worldwidedata')