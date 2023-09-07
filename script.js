function saveCheckedData() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var data = [];

    checkboxes.forEach(function(checkbox) {
        var row = checkbox.parentNode.parentNode;
        var id = row.cells[1].textContent;
        var name = row.cells[2].textContent;
        var address = row.cells[3].textContent;
        var island = row.cells[4].textContent;

        data.push([id, name, address, island]);
    });

    // Authorize access to your Google Sheets
    gapi.load('client:auth2', function() {
        gapi.client.init({
            apiKey: 'AIzaSyBiCk-5rFMbToBunwIaSdDbL0Km44mDaVU',
            clientId: '912476462880-puf8e9l1tstk268e12e5u34eefn0b0du.apps.googleusercontent.com',
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            scope: 'https://www.googleapis.com/auth/spreadsheets'
        }).then(function() {
            gapi.auth2.getAuthInstance().signIn().then(function() {
                // Access the Google Sheets API
                var sheets = gapi.client.sheets.spreadsheets;
                var params = {
                    spreadsheetId: '10fR3nxXELGo1hhHmrKByjLg5qDoiitHmw2EWzkS-g6g',
                    range: 'Sheet1!A:D', // Update this with your specific range
                    valueInputOption: 'RAW',
                };
                var valueRangeBody = {
                    values: data
                };

                // Update the sheet
                sheets.values.append(params, valueRangeBody).then(function(response) {
                    alert('Data saved successfully!');
                }, function(reason) {
                    console.error('Error: ' + reason.result.error.message);
                });
            });
        });
    });
}

// Load Google API client library
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyBiCk-5rFMbToBunwIaSdDbL0Km44mDaVU',
        clientId: '912476462880-puf8e9l1tstk268e12e5u34eefn0b0du.apps.googleusercontent.com',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        scope: 'https://www.googleapis.com/auth/spreadsheets'
    }).then(function() {
        gapi.auth2.getAuthInstance().signIn();
    });
}
document.addEventListener('DOMContentLoaded', function() {
    const showEvenCheckbox = document.getElementById('showEven');

    // Load the checked state from local storage
    const isChecked = localStorage.getItem('showEven') === 'true';
    showEvenCheckbox.checked = isChecked;

    showEvenCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;

        // Save the checked state in local storage
        localStorage.setItem('showEven', isChecked);

        displayEvenNumbers(isChecked);
    });

    function displayEvenNumbers(shouldDisplay) {
        let output = '';

        for (let i = 2; i <= 100; i += 2) {
            output += `<label><input type="checkbox" ${shouldDisplay ? 'checked' : ''}>${i}</label> `;
        }

        document.getElementById('output').innerHTML = output;
    }

    // Initial display
    displayEvenNumbers(isChecked);
});
