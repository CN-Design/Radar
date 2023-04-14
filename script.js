const services = document.querySelectorAll("[id^=service]");

services.forEach(service => {
  service.addEventListener('click', (event) => {
    event.preventDefault();
    clear_visualization()
    const dataUrl = `${service.getAttribute('data-url')}.json`;
    fetch(dataUrl)
      .then(response => response.json())
      .then(data => {
        radar_visualization({
          // radar chart options here
          svg_id: "radar",
          width: 1450,
          height: 1000,
          colors: {
            background: "#ffffff",
            grid: "#000000",
            inactive: "#ddd"
          },
          title: "",
          quadrants: [
            {name: "Services / Solutions \n (revenue distribution)"},
            {name: "Industries"+ "\n" + "(Service / Solution distribution)"},
            {name: "Human (Employee Utilization)"},
            {name: "Technologies Utilization"}
          ],
          rings: [
            {name: "Fresher", name_lower: "Qtr4", color: "#DB5461", bg_color: "#DB5461"},
            {name: "Junior", name_lower: "Qtr3", color: "#3D5467", bg_color: "#3D5467"},
            {name: "Mid-level", name_lower: "Qtr2", color: "#788BFF", bg_color: "#788BFF"},//294e51
            {name: "Senior", name_lower: "Qtr1", color: "#000000", bg_color: "#788BFF"}
          ],
          print_layout: true,
          entries: data
        });
      })
      .catch(error => {
        console.error('Error loading data:', error);
      });
  });
});


function clear_visualization() {
  const chartContainer = document.getElementById("radar");
  while (chartContainer.firstChild) {
    chartContainer.removeChild(chartContainer.firstChild);
  }
}