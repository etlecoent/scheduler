import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getElementError, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const {getByText} = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const {container, debug} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const days = getAllByTestId(container, "day");

    const correctDay = days.find((day) => queryByText(day, "Monday"));
    
    expect(getByText(correctDay, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));
    
    expect(getByText(appointment, /are you sure wou would like to delete?/i)).toBeInTheDocument();
    
    fireEvent.click(getByText(appointment, "Confirm")); 

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    await waitForElement(() => getByAltText(appointment, "Add"));
    
    const days = getAllByTestId(container, "day");

    const correctDay = days.find((day) => queryByText(day, "Monday"));

    expect(getByText(correctDay, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Edit"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Archie Cohen after edit"}
    });

    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Archie Cohen after edit"));

    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

    const days = getAllByTestId(container, "day");

    const correctDay = days.find((day) => queryByText(day, "Monday"));
    
    expect(getByText(correctDay, "1 spot remaining")).toBeInTheDocument();
  });

  // it("shows the save error when failing to save an appointment", async () => {

  // });

  // it("shows the delete error when failing to delete an existing appointment", async () => {

  // });

})