// Function to update the chart based on user selection
function updateChartone(selectedSample, data) {
	// Find the selected sample data
	const selectedData = data.samples.find(sample => sample.id === selectedSample);
	
	// Get the top 10 OTUs
	const top10SampleValues = selectedData.sample_values.slice(0, 10).reverse();
	const top10OtuIds = selectedData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
	const top10OtuLabels = selectedData.otu_labels.slice(0, 10).reverse();

	// Create the trace for the bar chart
	const trace = {
		x: top10SampleValues,
		y: top10OtuIds,
		text: top10OtuLabels,
		type: "bar",
		orientation: "h"
	};

	// Create the layout for the bar chart
	const layout = {
		title: `Top 10 OTUs for Sample ${selectedSample}`,
		xaxis: { title: "Sample Values" },
		yaxis: { title: "OTU IDs" }
	};

	// Plot the bar chart
	console.log("testing bar plot")
	Plotly.newPlot("bar", [trace], layout);
}

// Function to initialize the visualization
function init() {
    // Load data from samples.json
    d3.json("samples.json").then(data => {
		// Get reference to the dropdown
		const dropdown = d3.select("#selDataset");

		// Get sample IDs from the data
		const sampleIds = data.names;

		// Populate dropdown options
		sampleIds.forEach(sampleId => {
		dropdown.append("option").text(sampleId).attr("value", sampleId);
		});

		// Initialize the chart with the first sample
		updateChartone(sampleIds[0], data);
	}).catch(error => {
		console.error("Error fetching data:", error);
	});
}

console.log("test")
// Initialize the visualization
init();
  
// Function to handle dropdown change
function optionChanged(selectedSample) {
  // Load data from samples.json
  d3.json("samples.json").then(data => {
    updateChart(selectedSample, data);
  }).catch(error => {
    console.error("Error fetching data:", error);
  });
}

// Function to create the bubble chart
function createBubbleChart(selectedSample, data) {
    // Find the selected sample data
    const selectedData = data.samples.find(sample => sample.id === selectedSample);
    
    // Define bubble chart data
    const bubbleTrace = {
		x: selectedData.otu_ids,
		y: selectedData.sample_values,
		text: selectedData.otu_labels,
		mode: "markers",
		marker: {
			size: selectedData.sample_values,
			color: selectedData.otu_ids,
			colorscale: "Earth"
		}
    };
    
    // Define bubble chart layout
    const bubbleLayout = {
		title: `Bubble Chart for Sample ${selectedSample}`,
		xaxis: { title: "OTU IDs" },
		yaxis: { title: "Sample Values" }
    };
    
    // Plot the bubble chart
    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
}
  
// Initialize the visualization
init();
  
// Function to handle dropdown change for bubble chart
function optionChanged(selectedSample) {
	// Load data from samples.json
	d3.json("samples.json").then(data => {
		updateChart(selectedSample, data);
		createBubbleChart(selectedSample, data);
	}).catch(error => {
		console.error("Error fetching data:", error);
	});
}

  // Function to display sample metadata
function displaySampleMetadata(selectedSample, data) {
    // Find the selected sample's metadata
    const selectedMetadata = data.metadata.find(metadata => metadata.id.toString() === selectedSample);
  
    // Get the sample metadata panel element
    const metadataPanel = d3.select("#sample-metadata");
  
    // Clear the previous content
    metadataPanel.html("");
  
    // Loop through each key-value pair in the metadata and append to the panel
    Object.entries(selectedMetadata).forEach(([key, value]) => {
      	metadataPanel.append("p").text(`${key}: ${value}`);
    });
}
  
// Function to update the chart based on user selection
function updateChart(selectedSample, data) {
// Your existing code to update the chart...
}
  
// Function to create the bubble chart
function createBubbleChart(selectedSample, data) {
	// Find the selected sample data
	const selectedData = data.samples.find(sample => sample.id === selectedSample);

	// Define bubble chart data
	const bubbleTrace = {
		x: selectedData.otu_ids,
		y: selectedData.sample_values,
		text: selectedData.otu_labels,
		mode: "markers",
		marker: {
		size: selectedData.sample_values,
		color: selectedData.otu_ids,
		colorscale: "Earth"
		}
	};

	// Define bubble chart layout
	const bubbleLayout = {
		title: `Bubble Chart for Sample ${selectedSample}`,
		xaxis: { title: "OTU IDs" },
		yaxis: { title: "Sample Values" }
	};

	// Plot the bubble chart
	Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
}

// Initialize the visualization
init();
  
// Function to handle dropdown change
function optionChanged(selectedSample) {
	// Load data from samples.json
	d3.json("samples.json").then(data => {
		updateChart(selectedSample, data);
		createBubbleChart(selectedSample, data);
		displaySampleMetadata(selectedSample, data);
	}).catch(error => {
		console.error("Error fetching data:", error);
	});
}
  