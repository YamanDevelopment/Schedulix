import json
from datetime import datetime, timedelta

def parse_time(time_str):
    return datetime.strptime(time_str, "%I:%M%p")

def is_time_in_range(start, end, check):
    return start <= check < end

def get_available_times(busy_times, start_time, end_time, interval):
    available_times = []
    current_time = start_time
    while current_time < end_time:
        is_available = all(not is_time_in_range(parse_time(bt[0]), parse_time(bt[1]), current_time) for bt in busy_times)
        if is_available:
            available_times.append(current_time.strftime("%I:%M%p"))
        current_time += timedelta(minutes=interval)
    return available_times

def update_room_availability(json_file_path, availability_file_path, output_file_path):
    # Load the existing JSON data
    with open(json_file_path, 'r') as f:
        room_data = json.load(f)

    # Parse the availability file
    current_room = None
    current_day = None
    availability = {}

    with open(availability_file_path, 'r') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            if line.startswith("Boca Raton"):
                current_room = line.split()[-1]
                availability[current_room] = {}
            elif line in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]:
                current_day = line
                if current_day not in availability[current_room]:
                    availability[current_room][current_day] = []
            elif " - " in line:
                if current_room is None or current_day is None:
                    print(f"Warning: Encountered time slot without room or day context: {line}")
                    continue
                start, end = line.split(" - ")
                availability[current_room][current_day].append((start, end))

    # Update the JSON data with availability information
    for room, schedule in availability.items():
        if room in room_data:
            room_data[room]["Availability"] = {}
            for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]:
                busy_times = schedule.get(day, [])
                start_of_day = parse_time("8:00AM")
                end_of_day = parse_time("10:00PM")
                print(availability["room"])
                available_times = get_available_times(busy_times, start_of_day, end_of_day, 30)
                room_data[room]["Availability"][day] = available_times

    # Write the updated data back to a JSON file
    with open(output_file_path, 'w') as f:
        json.dump(room_data, f, indent=2)

    print(f"Updated JSON file has been created at {output_file_path}")

# Usage
json_file_path = 'room_data.json'  # Replace with your JSON file path
availability_file_path = 'OrganizedFAURoomInfoFall2024.txt'  # Replace with your availability file path
output_file_path = 'updated_room_data.json'  # Replace with your desired output file path

update_room_availability("C:/Users/mtsguest/Schedulix/room_data.json", "C:/Users/mtsguest/Schedulix/OrganizedFAURoomInfoFall2024.txt", "C:/Users/mtsguest/Schedulix/updated_room_data.json")
