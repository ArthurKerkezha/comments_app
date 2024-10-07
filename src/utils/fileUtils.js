export const createAndDownloadJsonFile = (data, filename) => {
  const jsonData = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const downloadLink = document.createElement("a");

  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};
