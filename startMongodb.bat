@echo off
if not exist data md data
mongod --dbpath="data" --port 27018
