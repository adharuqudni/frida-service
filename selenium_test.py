from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time

# Define the desired capabilities
desired_cap = webdriver.ChromeOptions()
desired_cap.add_argument("--start-maximized")  # Open browser in maximized mode
desired_cap.add_argument("--disable-infobars")  # Disable info bars
desired_cap.add_argument("--disable-popup-blocking")  # Disable pop-up blocking
desired_cap.add_argument("--enable-javascript")  # Ensure JavaScript is enabled
desired_cap.add_argument("--allow-running-insecure-content")  # Allow insecure content
desired_cap.add_argument("--allow-cookie-setting")  # Allow cookies


custom_user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
desired_cap.add_argument(f"user-agent={custom_user_agent}")




# URL for BrowserStack (replace with your own if using another remote WebDriver)
browserstack_url = "http://10.255.2.3:4444"

# Set up WebDriver to connect to BrowserStack
driver = webdriver.Remote(
    command_executor=browserstack_url,
    options=desired_cap
)

# Open a website to test (e.g., Google)
driver.get("https://www.traveloka.com/en-sg/flight/fulltwosearch?ap=JKTA.DPS&dt=14-1-2025.16-1-2025&ps=1.0.0&sc=ECONOMY")

# Print the title of the page
print("Page Title is:", driver.title)

# Print the HTML source of the page
html_source = driver.page_source
print("\nPage HTML Source:")
print(html_source)

# Optional: Interact with the page (e.g., perform a Google search)

# Wait for the page to load and results to appear
time.sleep(15)

# Print cookies after interacting with the page
cookies = driver.get_cookies()
print("\nCookies:")
for cookie in cookies:
    print(cookie)

time.sleep(15)


# Close the browser
driver.quit()
