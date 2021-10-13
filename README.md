# React dnd Forms

## About
---
> React dnd Forms is a SPA for a visual, no-code form builder that uses drag and drop.

## Running locally
---
- `yarn install`
- `yarn start`
- `yarn server` (Sample json db)

## Tech Stack that must be used
---

- `React`
- `Redux`
- `Reselect`
- `Styled Components`
- `Atomic design`

## Layout
---
> The layout consists of a sidebar and a main section. The sidebar houses the navigation between form creation and validation as well as the different saved forms. The main section serves for either the form drag and drop target or for the validation form.

> A second sidebar is available only for the form list in a given date group when browsing all the forms.

## Features

### Create a form
---

` Route /crete `

> Creating a form includes a group of form elements in the sidebar and a group of layout structures (currently housing only table structure). The form can use elements such as: 
> - Input
> - Checkbox
> - File uploader
> - Text and Divider

### Validate a form
---

` Route /validate/:id `

> Validating a form consists of 5 elements:
> Preview section for vieweing the completed form.
> - Data for inputing an object sturctured form.
> - Errors output display.
> - Events output display.
> - Button to submit.

### Edit a form
---

` Route /edit/:id `

> Editing a given form should allow the user to edit/re-arrange the details and elements of a form

### Save a form
---
> Saving a form should send an API call with the form data.