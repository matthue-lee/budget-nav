import random
import json
from datetime import datetime, timedelta

# Categories for the transactions
categories = ["Groceries", "Rent", "Transportation", "Entertainment", "Utilities", "Subscriptions", "Dining"]

# Descriptions for the transactions
descriptions = {
    "Groceries": ["Grocery Store - Walmart", "Grocery Store - Costco", "Grocery Store - Trader Joe's", "Grocery Store - Safeway"],
    "Rent": ["Rent Payment", "Monthly Rent"],
    "Transportation": ["Gas Station", "Taxi Ride", "Public Transport - Bus", "Public Transport - Train", "Uber Ride"],
    "Entertainment": ["Movie Theater", "Streaming Service - Netflix", "Streaming Service - Hulu", "Streaming Service - Spotify"],
    "Utilities": ["Electricity Bill", "Water Bill", "Internet Bill", "Phone Bill"],
    "Subscriptions": ["Netflix Subscription", "Spotify Subscription", "Hulu Subscription", "Gym Membership"],
    "Dining": ["Restaurant - Olive Garden", "Fast Food - McDonald's", "Coffee Shop - Starbucks", "Dinner - Chili's"]
}

# Generate a random amount for a category
def generate_amount(category):
    if category == "Rent":
        return (1000)
    elif category == "Groceries":
        return round(random.uniform(50, 200), 2)
    elif category == "Transportation":
        return round(random.uniform(10, 100), 2)
    elif category == "Entertainment" or category == "Dining":
        return round(random.uniform(10, 80), 2)
    elif category == "Utilities":
        return round(random.uniform(50, 150), 2)
    elif category == "Subscriptions":
        return round(random.uniform(5, 20), 2)

# Function to generate a transaction record
def generate_transaction(date):
    category = random.choice(categories)
    description = random.choice(descriptions[category])
    amount = -generate_amount(category)
    return {
        "date": date.strftime("%Y-%m-%d"),
        "description": description,
        "amount": amount,
        "category": category
    }

# Function to generate a list of transactions for a given time period
def generate_transactions(start_date, num_days, num_transactions):
    transactions = []
    for _ in range(num_transactions):
        random_days = random.randint(0, num_days)
        transaction_date = start_date + timedelta(days=random_days)
        transactions.append(generate_transaction(transaction_date))
    return transactions

# Generating 300 transactions over the last 6 months
start_date = datetime.now() - timedelta(days=180)
transactions = generate_transactions(start_date, 180, 300)

# Save to a JSON file
with open("transactions.json", "w") as f:
    json.dump(transactions, f, indent=2)

print("300 transactions saved to 'transactions.json'")
