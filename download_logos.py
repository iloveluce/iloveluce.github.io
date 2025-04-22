import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin

companies = [
    {
        'name': 'flex',
        'url': 'https://www.flex.one',
        'logo_selector': 'img[alt*="Flex"][alt*="logo"]'
    },
    {
        'name': 'avantstay',
        'url': 'https://www.avantstay.com',
        'logo_selector': 'img[alt*="AvantStay"][alt*="logo"]'
    },
    {
        'name': 'keep',
        'url': 'https://www.trykeep.com',
        'logo_selector': 'img[alt*="Keep"][alt*="logo"]'
    },
    {
        'name': 'ryze',
        'url': 'https://www.ryzesuperfoods.com',
        'logo_selector': 'img[alt*="Ryze"][alt*="logo"]'
    },
    {
        'name': 'steward',
        'url': 'https://usesteward.com',
        'logo_selector': 'img[alt*="Steward"][alt*="logo"]'
    },
    {
        'name': 'sydecar',
        'url': 'https://www.sydecar.io',
        'logo_selector': 'img[alt*="Sydecar"][alt*="logo"]'
    },
    {
        'name': 'finix',
        'url': 'https://finix.com',
        'logo_selector': 'img[alt*="Finix"][alt*="logo"]'
    }
]

def download_logo(company):
    try:
        # Create directory if it doesn't exist
        os.makedirs('img/portfolio', exist_ok=True)
        
        # Get the webpage
        response = requests.get(company['url'])
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the logo
        logo = soup.select_one(company['logo_selector'])
        if not logo:
            # Try to find any image that might be a logo
            logo = soup.select_one('img[src*="logo"]')
        
        if logo and 'src' in logo.attrs:
            # Get the absolute URL of the logo
            logo_url = urljoin(company['url'], logo['src'])
            
            # Download the logo
            logo_response = requests.get(logo_url)
            if logo_response.status_code == 200:
                # Save the logo
                with open(f'img/portfolio/{company["name"]}.png', 'wb') as f:
                    f.write(logo_response.content)
                print(f"Downloaded logo for {company['name']}")
            else:
                print(f"Failed to download logo for {company['name']}: HTTP {logo_response.status_code}")
        else:
            print(f"Could not find logo for {company['name']}")
    except Exception as e:
        print(f"Error downloading logo for {company['name']}: {str(e)}")

# Download logos for all companies
for company in companies:
    download_logo(company) 