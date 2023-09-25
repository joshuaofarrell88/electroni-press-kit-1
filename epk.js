let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let clickedDateString = ""; // Define clickedDateString here

const day = document.querySelector(".calendar-dates");
 
const currdate = document
    .querySelector(".calendar-current-date");
 
const prenexIcons = document
    .querySelectorAll(".calendar-navigation span");
 
// Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const eventData = {
  "2023-09-25": "Event 1 details go here...",
  "2023-10-21": "Charleville Brewery, 1-4",
  "2023-09-26": "skldfjlzs",
  "2023-09-27": "skldfjlzs",
  "2023-09-28": "skldfjlzs",
  "2023-09-24": "kdjf"
  // Add more dates and information as needed
};

// Function to generate the calendar
const manipulate = () => {
 
    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();
 
    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();
 
    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();
 
    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();
 
    // Variable to store the generated calendar HTML
    let lit = "";
 
    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        lit +=
            `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }
 
    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
 
        // Check if the current date is today
        let isToday = i === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? "active"
            : "";
            const currentDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            if (eventData.hasOwnProperty(currentDate)) {
              if (isToday === "active") {
                  lit += `<li class="current-and-busy-date" data-date="${currentDate}">${i}</li>`;
              } else {
                  lit += `<li class="busy-date" data-date="${currentDate}">${i}</li>`;
              }
          } else {
              lit += `<li class="${isToday}" data-date="${currentDate}">${i}</li>`;
          }
    }
    
    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`
    }
    
    // Update the text of the current date element
    // with the formatted current month and year
    currdate.innerText = `${months[month]} ${year}`;
 
    // update the HTML of the dates element
    // with the generated calendar
    day.innerHTML = lit;
}
 
manipulate();
 
// Attach a click event listener to each icon
prenexIcons.forEach(icon => {
 
    // When an icon is clicked
    icon.addEventListener("click", () => {
 
        // Check if the icon is "calendar-prev"
        // or "calendar-next"
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;
 
        // Check if the month is out of range
        if (month < 0 || month > 11) {
 
            // Set the date to the first day of the
            // month with the new year
            date = new Date(year, month, new Date().getDate());
 
            // Set the year to the new year
            year = date.getFullYear();
 
            // Set the month to the new month
            month = date.getMonth();
        }
 
        else {
 
            // Set the date to the current date
            date = new Date();
        }
 
        // Call the manipulate function to
        // update the calendar display
        manipulate();
    });
});

// Add an event listener for the calendar dates
day.addEventListener("click", (e) => {
  const clickedDate = e.target.innerText;
  clickedDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(clickedDate).padStart(2, '0')}`;
  
  if (eventData.hasOwnProperty(clickedDateString)) {
    const eventDetails = eventData[clickedDateString];
    const eventDetailsContainer = document.getElementById("event-details");

    // Display the event details in the information container
    document.getElementById("event-date").innerHTML  = clickedDateString;
    document.getElementById("event-details").innerHTML  = eventDetails;
  } else {
    // Clear the information container if no information is available
    document.getElementById("event-date").innerHTML = clickedDateString;
    document.getElementById("event-details").innerHTML = `Nothing Here`;
  }
});
