const form = document.getElementById('trip-form');
const tripItems = document.getElementById('trip-items');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const destination = document.getElementById('destination').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;

  if (!destination || !startDate || !endDate) {
    alert('Please fill out all fields.');
    return;
  }

  const li = document.createElement('li');
  li.textContent = `📍 ${destination} (From ${startDate} to ${endDate})`;

  tripItems.appendChild(li);

  // Clear form after submission
  form.reset();
});
 