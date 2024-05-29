/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            type: 'input',
            name: 'URL',
            message: 'Enter the URL you want to convert to a QR code:'
        }
    ])
    .then((answers) => {
        const url = answers.URL;
        let qr_img = qr.image(url, { type: 'png' });
        qr_img.pipe(fs.createWriteStream('qr.png'));

        fs.writeFile('qr.txt', url, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('URL saved to qr.txt');
        });

    })
    .catch((error) => {
        if (error.isTtyError) {
            alert("Prompt couldn't be rendered in the current environment");
        } else {
            alert("An error occurred");
        }
    });