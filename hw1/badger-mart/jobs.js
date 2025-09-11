function submitApplication(e) {
  e.preventDefault(); // You can ignore this; prevents the default form submission!

  // TODO: Alert the user of the job that they applied for!
  const jobs = document.getElementsByName("job");
  let jobSelected = false;
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].checked) {
      alert(`Thank you applied to be a ${jobs[i].value}!`);
      jobSelected = true;
      break;
    }
  }
  if (!jobSelected) {
    alert("Please select a job!");
  }
}
