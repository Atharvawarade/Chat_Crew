import requests
from bs4 import BeautifulSoup
import json
import os

# Function to get the HTML content of a page
def get_html(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
        return None

# Function to parse the main page and collect all links
def get_links_from_main_page(base_url, html):
    soup = BeautifulSoup(html, 'html.parser')
    links = []
    for a_tag in soup.find_all('a', href=True):
        href = a_tag['href']
        if href.startswith('/'):
            href = base_url + href
        if href.startswith(base_url):
            links.append(href)
    return list(set(links))

# Function to parse an individual page
def parse_page(url):
    html = get_html(url)
    if not html:
        return {}

    soup = BeautifulSoup(html, 'html.parser')
    page_data = {}

    # Extract title, headings, and content as an example
    page_data['url'] = url
    page_data['title'] = soup.title.string if soup.title else "No Title"

    # Extract headings
    headings = {
        'h1': [h.get_text(strip=True) for h in soup.find_all('h1')],
        'h2': [h.get_text(strip=True) for h in soup.find_all('h2')],
        'h3': [h.get_text(strip=True) for h in soup.find_all('h3')]
    }
    page_data['headings'] = headings

    # Extract paragraphs
    page_data['content'] = [p.get_text(strip=True) for p in soup.find_all('p')]

    return page_data

# Function to implement the pipeline
def rag_pipeline(base_url, output_file):
    html = get_html(base_url)
    if not html:
        print("Failed to fetch the main page.")
        return

    # Get all links from the main page
    links = get_links_from_main_page(base_url, html)

    # Parse each page and collect data
    all_data = []
    for link in links:
        print(f"Processing {link}...")
        page_data = parse_page(link)
        if page_data:
            all_data.append(page_data)

    # Save data to JSON file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=4)

    print(f"Data saved to {output_file}")

if __name__ == "__main__":
    BASE_URL = "https://hteapp.hte.rajasthan.gov.in/courses/"
    OUTPUT_FILE = "courses_data.json"

    # Ensure output directory exists only if there's a directory in the path
    output_dir = os.path.dirname(OUTPUT_FILE)
    if output_dir:  # Check if directory part exists
        os.makedirs(output_dir, exist_ok=True)

    rag_pipeline(BASE_URL, OUTPUT_FILE)

