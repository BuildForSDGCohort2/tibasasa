# Write cloud functions here

import requests
import pandas as pd
from bs4 import BeautifulSoup

def scraper():

    # Providing a user agent to the request
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0',
    }

    url = 'http://kmpdc.go.ke/Registers/practitioners.php'
    response = requests.get(url, headers=headers)

    # Parse the HTML
    soup = BeautifulSoup(response.content,"html.parser")


    doctor_table = soup.find_all("table")


    # Dictionary to store the data
    doctor_data = {}

    for table in doctor_table:

        table = doctor_table[0]
        table_data = [[cell.text for cell in row.find_all(["th","td"])]
                                for row in table.find_all("tr")]
        df = pd.DataFrame(table_data)
        df.columns = df.iloc[0,:]
        df.drop(index=0,inplace=True)

        doctor_data[table] = df
        # print(df)

        print(doctor_data)

