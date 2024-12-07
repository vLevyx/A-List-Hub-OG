const datetimeInput = document.getElementById("datetime-input");
const resultsContainer = document.getElementById("results");
const copiedNotification = document.getElementById("copied-notification");

const formats = [
    { format: "F", description: "Full Date & Time" },
    { format: "f", description: "Short Date & Time" },
    { format: "D", description: "Long Date" },
    { format: "d", description: "Short Date" },
    { format: "t", description: "Short Time" },
    { format: "T", description: "Long Time" },
    { format: "R", description: "Relative Time" }
];

// Show "Copied" notification
function showCopiedNotification() {
    copiedNotification.classList.add("show");
    setTimeout(() => copiedNotification.classList.remove("show"), 2000);
}

// Validate the year to enforce 4-digit limit
function validateYear() {
    const value = datetimeInput.value;
    const dateParts = value.split("T")[0]; // Get the date part (YYYY-MM-DD)
    const [year, month, day] = dateParts.split("-");

    if (year.length > 4) {
        // Limit the year to 4 digits
        const truncatedYear = year.slice(0, 4);
        datetimeInput.value = `${truncatedYear}-${month}-${day}${value.slice(10)}`;
    }
}

// Update timestamps based on the input
function updateTimestamps() {
    validateYear(); // Validate year before processing
    const val = datetimeInput.value;
    resultsContainer.innerHTML = "";

    if (!val) return;

    const selectedDate = new Date(val);
    const unixTimestamp = Math.floor(selectedDate.getTime() / 1000);

    // Add standalone UNIX timestamp box
    const unixLine = document.createElement("div");
    unixLine.className = "timestamp-line";

    const unixCode = document.createElement("code");
    unixCode.textContent = unixTimestamp;
    unixCode.addEventListener("click", () => {
        navigator.clipboard.writeText(unixTimestamp).then(() => {
            showCopiedNotification();
        });
    });

    const unixPreview = document.createElement("span");
    unixPreview.className = "timestamp-preview";
    unixPreview.textContent = "Unix timestamp value";

    const unixCopyBtn = document.createElement("button");
    unixCopyBtn.className = "copy-btn";
    unixCopyBtn.textContent = "Copy";
    unixCopyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(unixTimestamp).then(() => {
            showCopiedNotification();
        });
    });

    unixLine.appendChild(unixCode);
    unixLine.appendChild(unixPreview);
    unixLine.appendChild(unixCopyBtn);
    resultsContainer.appendChild(unixLine);

    // Add other timestamp formats
    formats.forEach(f => {
        const line = document.createElement("div");
        line.className = "timestamp-line";

        const content = `<t:${unixTimestamp}:${f.format}>`;

        const code = document.createElement("code");
        code.textContent = content;

        code.addEventListener("click", () => {
            navigator.clipboard.writeText(content).then(() => {
                showCopiedNotification();
            });
        });

        const preview = document.createElement("span");
        preview.className = "timestamp-preview";

        switch (f.format) {
            case "F":
                preview.textContent = `${selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })} at ${selectedDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                })}`;
                break;
            case "f":
                preview.textContent = `${selectedDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })} at ${selectedDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                })}`;
                break;
            case "D":
                preview.textContent = `${selectedDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })}`;
                break;
            case "d":
                preview.textContent = `${selectedDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit"
                })}`;
                break;
            case "t":
                preview.textContent = `${selectedDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                })}`;
                break;
            case "T":
                preview.textContent = `${selectedDate.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                })}`;
                break;
            case "R":
                const now = new Date();
                const difference = Math.round((selectedDate - now) / 1000);
                preview.textContent =
                    difference > 0
                        ? `in ${Math.round(difference / 60 / 60 / 24)} days`
                        : `${Math.abs(
                              Math.round(difference / 60 / 60 / 24)
                          )} days ago`;
                break;
        }

        const fullContent = document.createElement("span");
        fullContent.appendChild(code);
        fullContent.appendChild(preview);

        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-btn";
        copyBtn.textContent = "Copy";
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(content).then(() => {
                showCopiedNotification();
            });
        });

        line.appendChild(fullContent);
        line.appendChild(copyBtn);
        resultsContainer.appendChild(line);
    });
}

// Set current date and time on page load
function setCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    datetimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    updateTimestamps();
}

// Add event listeners
document.addEventListener("DOMContentLoaded", setCurrentDateTime);
datetimeInput.addEventListener("input", updateTimestamps);
