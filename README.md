# Genovian Pears Consultation

Genovian Pears Consultation is a web application designed to guide users through a consultation process using a multi-step form. Built with React, Vite, and MUI, the application provides a streamlined user experience with a progress tracker, dynamic form validation, and intuitive navigation.

## Overview

I chose MUI over other component libraries primarily due to my familiarity with it, though I understand it has some limitations in terms of overall size and customization.

React Hook Form felt like the ideal choice for this exercise as it handles much of the state management out of the box, though `useState` would also have sufficed for this use case.

I added React Router to leverage URL parameters and to match the UX of a typical consultation, where users navigate to and from different routes.

For testing, I wrote tests for a few key components and a page. In a production codebase, test coverage would typically be higher based on business needs, and E2E tests would also be included. However, time constraints limited the scope of testing for this exercise.

I didn't implement `react-query` or a similar library in this instance because we are only making one API call at submission. However, I'd use this or similar to handle server state

## Installation

**Clone the repository**:

```bash
git clone https://github.com/your-username/genovian-pears-consultation.git
cd genovian-pears-consultation
npm install
```

## Get Started

To start the development server, run:

```bash
npm run dev
```

## Testing

To run all tests, use:

```bash
npm run test
```
