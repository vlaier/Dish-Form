# HexOcean Dish Form

This project is a web form that allows the user to enter information about a dish, including its name, preparation time, type, and other attributes that are specific to the type of dish. The form is built using React and Redux-Form, and it uses Material UI components for the user interface.

## Node.js and NPM Versions

This project was developed using Node.js version 20.0.0 and NPM version 9.6.4.

## Time taken

The project took approximately 20 hours to complete.

## Setup

To set up the project, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install`.
3. Start the development server by running `npm run dev`.
4. Open your browser and navigate to `http://localhost:5173`.

## Usage

To use the form, follow these steps:

1. Enter the name of the dish in the "Dish name" field.
2. Enter the preparation time in the "Preparation time" field in the format "HH:MM:SS".
3. Select the type of dish from the dropdown menu.
4. Depending on the type of dish you selected, additional fields will appear. For a pizza, you will need to enter the number of slices and the diameter of the pizza. For a soup, you will need to select a spiciness scale. For a sandwich, you will need to enter the number of slices of bread.
5. When you have completed all the required fields, click the "Submit" button to submit the form. If any of the fields are invalid, error messages will be displayed.

## Dependencies

The project uses the following dependencies:

- React
- Redux-Form
- Material UI
- Vite

## Demo

You can see a live demo of the project at [https://dish-form-theta.vercel.app/](https://dish-form-theta.vercel.app/).

## Additional Features

In addition to the requirements of the task, the project also includes the following features:

- Form validation using Redux-Form's built-in validation functionality.
- Success message displayed in a snackbar when the form is successfully submitted.
- Error messages displayed for individual fields when there are validation errors.
- Clean and modern UI design using Material UI components.
- Responsive design for mobile and desktop devices.
